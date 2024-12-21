export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 路由分发
    if (pathname === '/' && request.method === 'GET') {
      // 首页：显示登录表单 or 管理面板
      return handleHomePage(request, env);
    } else if (pathname === '/login' && request.method === 'POST') {
      // 管理员登录
      return handleLogin(request, env);
    } else if (pathname === '/create' && request.method === 'POST') {
      // 创建讨论区(管理员)
      return handleCreateCommentArea(request, env);
    } else if (pathname.startsWith('/area/') && request.method === 'GET') {
      // 访问某个讨论区 or 获取评论 JSON
      if (pathname.endsWith('/comments')) {
        return handleGetComments(request, env);
      } else {
        // 讨论区页面
        return handleCommentAreaPage(request, env);
      }
    } else if (pathname.startsWith('/area/') && request.method === 'POST') {
      // 评论或举报
      if (pathname.endsWith('/comment')) {
        return handlePostComment(request, env);
      }
      if (pathname.match(/^\/area\/[^/]+\/comment\/\d+\/report$/)) {
        return handleReportComment(request, env);
      }
    }

    // 匹配删除/隐藏/删除讨论区等操作
    if (pathname.startsWith('/admin/') && request.method === 'POST') {
      // /admin/area/<area_key>/delete
      // /admin/area/<area_key>/toggleHide
      const matchDeleteArea = pathname.match(/^\/admin\/area\/([^/]+)\/delete$/);
      if (matchDeleteArea) {
        return handleDeleteArea(matchDeleteArea[1], request, env);
      }
      const matchHideArea = pathname.match(/^\/admin\/area\/([^/]+)\/toggleHide$/);
      if (matchHideArea) {
        return handleToggleHideArea(matchHideArea[1], request, env);
      }
      // /admin/reports/resolve/<id>
      const matchResolveReport = pathname.match(/^\/admin\/reports\/resolve\/(\d+)$/);
      if (matchResolveReport) {
        return handleResolveReport(parseInt(matchResolveReport[1], 10), request, env);
      }
    }

    // 获取更详尽的管理员信息，如讨论区列表、举报列表
    if (pathname === '/admin/extendedInfo' && request.method === 'GET') {
      return handleAdminExtendedInfo(request, env);
    }

    return new Response("Not Found", { status: 404 });
  }
};

/** 解析 cookie 工具函数 */
function parseCookie(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [name, ...rest] = part.trim().split('=');
    cookies[name] = rest.join('=');
  }
  return cookies;
}

/** 转义HTML，避免XSS */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"');
}

/** 简易 Markdown 转 HTML，示例仅演示，如需更完整可用第三方库 */
function parseMarkdown(md) {
  if (!md) return '';
  let html = escapeHtml(md);
  // **粗体**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // *斜体*
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // `代码`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // 换行 => <br>
  html = html.replace(/\n/g, '<br/>');
  return html;
}

/** 首页：未登录 => 显示登录；已登录 => 管理面板(显示更详尽信息) */
async function handleHomePage(request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  const authed = (cookie.auth === "1");
  const url = new URL(request.url);

  // 如果只是想获取管理员的讨论区列表、举报列表等 JSON
  if (url.searchParams.get('_extendedInfo') === '1' && authed) {
    return handleAdminExtendedInfo(request, env);
  }

  // 否则返回整页HTML
  const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <title>评论系统 - 首页</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        background: #121212; color: #fff; font-family: sans-serif; 
        max-width: 800px; margin: 40px auto; padding: 20px;
      }
      h1 { margin-bottom: 20px; }
      a { color: #bbb; text-decoration: none; }
      a:hover { color: #fff; }
      ul { list-style: none; padding: 0; }
      li { margin-bottom: 10px; }

      .hidden { display: none; }

      .form-group {
        display: flex; flex-direction: column; margin-bottom: 20px;
      }
      .form-group input {
        background: #1e1e1e; border: 1px solid #444; padding: 10px; color: #fff; font-size: 14px; margin-bottom: 10px;
      }
      .form-group button {
        background: #333; color: #fff; border: none; padding: 10px; font-size: 14px; cursor: pointer;
        transition: background 0.3s ease, transform 0.2s ease;
      }
      .form-group button:hover {
        background: #444; transform: scale(1.02);
      }

      hr { border: none; border-bottom: 1px solid #333; margin: 20px 0; }

      .notification-bar {
        position: fixed; bottom: 0; left: 0; width: 100%; background: #2a2a2a; color: #fff; padding: 10px 20px;
        display: flex; align-items: center; justify-content: space-between; font-size: 14px; z-index: 9999;
      }
      .notification-bar.hidden { display: none; }
      .close-btn { cursor: pointer; margin-left: 20px; font-weight: bold; }
      .admin-section { margin-top: 30px; }

      .table-like { width: 100%; border-collapse: collapse; }
      .table-like th, .table-like td { border: 1px solid #444; padding: 8px; }
      .table-like th { background: #1e1e1e; }

      @media (max-width: 600px) {
        body { margin: 20px auto; padding: 10px; }
      }
    </style>
  </head>
  <body>
    <h1>评论系统</h1>
    <!-- 通知栏 -->
    <div id="notificationBar" class="notification-bar hidden">
      <span id="notificationText"></span>
      <span id="closeNotification" class="close-btn">×</span>
    </div>

    <div id="loginSection" class="${authed ? 'hidden' : ''}">
      <h2>管理员登录</h2>
      <div class="form-group">
        <input type="password" id="passwordInput" placeholder="请输入密码" />
        <button id="loginBtn">登录</button>
      </div>
    </div>

    <div id="adminSection" class="admin-section ${!authed ? 'hidden' : ''}">
      <h2>讨论区管理面板</h2>
      <div>
        <h3>已有讨论区列表</h3>
        <div id="areaList">加载中...</div>
      </div>

      <hr />
      <h3>创建新的讨论区</h3>
      <div class="form-group">
        <input type="text" id="areaName" placeholder="名称" />
        <input type="text" id="areaKey" placeholder="唯一标识" />
        <textarea id="areaIntro" placeholder="简介(可选)"
                  style="background:#1e1e1e;color:#fff;border:1px solid #444;height:60px;font-size:14px;margin-bottom:10px;"></textarea>
        <button id="createAreaBtn">创建</button>
      </div>

      <hr />
      <h3>举报管理</h3>
      <div id="reportList">加载中...</div>
    </div>

    <script>
      const authed = ${authed ? 'true' : 'false'};
      const notificationBar = document.getElementById('notificationBar');
      const notificationText = document.getElementById('notificationText');
      const closeNotification = document.getElementById('closeNotification');
      closeNotification.addEventListener('click', () => notificationBar.classList.add('hidden'));
      function showNotification(msg) {
        notificationText.textContent = msg;
        notificationBar.classList.remove('hidden');
      }

      if (authed) {
        // 加载管理信息
        fetchExtendedInfo();
      }

      // 登录按钮
      const loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
          const pw = document.getElementById('passwordInput').value.trim();
          if (!pw) {
            showNotification('请输入密码');
            return;
          }
          const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pw })
          });
          const data = await res.json();
          if (!data.success) {
            showNotification(data.message || '密码错误');
          } else {
            location.reload();
          }
        });
      }

      // 创建讨论区
      const createAreaBtn = document.getElementById('createAreaBtn');
      if (createAreaBtn) {
        createAreaBtn.addEventListener('click', async () => {
          const areaName = document.getElementById('areaName').value.trim();
          const areaKey = document.getElementById('areaKey').value.trim();
          const areaIntro = document.getElementById('areaIntro').value.trim();
          if (!areaName || !areaKey) {
            showNotification('名称和唯一标识必填');
            return;
          }
          const formData = new FormData();
          formData.append('area_name', areaName);
          formData.append('area_key', areaKey);
          formData.append('intro', areaIntro);
          const res = await fetch('/create', { method: 'POST', body: formData });
          if (res.ok) {
            showNotification('创建成功');
            // 清空
            document.getElementById('areaName').value = '';
            document.getElementById('areaKey').value = '';
            document.getElementById('areaIntro').value = '';
            await fetchExtendedInfo(); // 刷新
          } else {
            showNotification('创建失败：' + (await res.text()));
          }
        });
      }

      async function fetchExtendedInfo() {
        // 获取管理端的详细信息
        const res = await fetch('/?_extendedInfo=1');
        if (!res.ok) {
          document.getElementById('areaList').textContent = '加载失败';
          document.getElementById('reportList').textContent = '加载失败';
          return;
        }
        const data = await res.json();
        renderAreaList(data.areas);
        renderReportList(data.reports);
      }

      // 渲染讨论区列表（已修复多行字符串写法）
      function renderAreaList(areas) {
        const div = document.getElementById('areaList');
        if (areas.length === 0) {
          div.textContent = '暂无讨论区';
          return;
        }

        let html = \`
          <table class="table-like">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Key</th>
                <th>Hidden</th>
                <th>Intro</th>
                <th>Comments</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
        \`;

        areas.forEach(a => {
          html += \`
            <tr>
              <td>\${a.id}</td>
              <td>\${a.name}</td>
              <td>\${a.area_key}</td>
              <td>\${a.hidden ? '是' : '否'}</td>
              <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                \${a.intro || ''}
              </td>
              <td>\${a.comment_count}</td>
              <td>
                <a href="/area/\${encodeURIComponent(a.area_key)}" target="_blank">查看</a>
                <button onclick="toggleHideArea('\${encodeURIComponent(a.area_key)}')">
                  \${a.hidden ? '取消隐藏' : '隐藏'}
                </button>
                <button onclick="deleteArea('\${encodeURIComponent(a.area_key)}')">删除</button>
              </td>
            </tr>
          \`;
        });

        html += \`
            </tbody>
          </table>
        \`;
        div.innerHTML = html;
      }

      // 渲染举报列表
      function renderReportList(reports) {
        const div = document.getElementById('reportList');
        if (reports.length === 0) {
          div.textContent = '暂无举报';
          return;
        }
        let html = \`
          <table class="table-like">
            <thead>
              <tr>
                <th>ID</th>
                <th>Comment ID</th>
                <th>Content</th>
                <th>Reason</th>
                <th>CreatedAt</th>
                <th>Resolved</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
        \`;
        reports.forEach(r => {
          html += \`
            <tr>
              <td>\${r.id}</td>
              <td>\${r.comment_id}</td>
              <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                \${r.comment_content}
              </td>
              <td>\${r.reason}</td>
              <td>\${r.created_at}</td>
              <td>\${r.resolved ? '是' : '否'}</td>
              <td>
                \${r.resolved ? '' : \`<button onclick="resolveReport(\${r.id})">标记已处理</button>\`}
              </td>
            </tr>
          \`;
        });
        html += \`
            </tbody>
          </table>
        \`;
        div.innerHTML = html;
      }

      // 切换隐藏
      async function toggleHideArea(areaKey) {
        const res = await fetch('/admin/area/' + areaKey + '/toggleHide', { method: 'POST' });
        if (res.ok) {
          showNotification('操作成功');
          await fetchExtendedInfo();
        } else {
          showNotification('操作失败：' + (await res.text()));
        }
      }

      // 删除讨论区
      async function deleteArea(areaKey) {
        if (!confirm('确认删除该讨论区？此操作不可恢复')) return;
        const res = await fetch('/admin/area/' + areaKey + '/delete', { method: 'POST' });
        if (res.ok) {
          showNotification('删除成功');
          await fetchExtendedInfo();
        } else {
          showNotification('删除失败：' + (await res.text()));
        }
      }

      // 处理举报
      async function resolveReport(reportId) {
        const res = await fetch('/admin/reports/resolve/' + reportId, { method: 'POST' });
        if (res.ok) {
          showNotification('已标记为处理');
          await fetchExtendedInfo();
        } else {
          showNotification('操作失败：' + (await res.text()));
        }
      }
    </script>
  </body>
  </html>
  `;
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}

/** 返回管理员的「更详尽信息」(讨论区列表 + 举报列表) JSON */
async function handleAdminExtendedInfo(request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  const authed = (cookie.auth === "1");
  if (!authed) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 查询讨论区列表(包含评论数)
  const areasRes = await env.DB.prepare(`
    SELECT 
      a.id, 
      a.name, 
      a.area_key,
      a.intro,
      a.hidden,
      (SELECT COUNT(*) FROM comments c WHERE c.area_key = a.area_key) as comment_count
    FROM comment_areas a
    ORDER BY a.id DESC
  `).all();
  const areas = areasRes.results || [];

  // 查询举报列表(关联评论信息)
  const reportsRes = await env.DB.prepare(`
    SELECT 
      r.id,
      r.comment_id,
      r.reason,
      r.created_at,
      r.resolved,
      c.content as comment_content
    FROM reports r
    LEFT JOIN comments c on c.id = r.comment_id
    ORDER BY r.id DESC
  `).all();
  const reports = reportsRes.results || [];

  return new Response(JSON.stringify({ areas, reports }), {
    status: 200,
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  });
}

/** 管理员登录 */
async function handleLogin(request, env) {
  try {
    const data = await request.json();
    const password = data.password || '';

    if (password === env.ADMIN_PASS) {
      // 密码正确 => 设置Cookie
      const headers = new Headers();
      headers.append('Set-Cookie', 'auth=1; HttpOnly; Path=/; Max-Age=3600');
      headers.append('Content-Type', 'application/json;charset=UTF-8');

      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    } else {
      return new Response(JSON.stringify({ success: false, message: '密码错误' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }
}

/** 管理员创建新的讨论区 */
async function handleCreateCommentArea(request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const name = formData.get('area_name') || '';
  const key = formData.get('area_key') || '';
  const intro = formData.get('intro') || '';

  if (!name || !key) {
    return new Response("名称或key为空", { status: 400 });
  }

  await env.DB.prepare(`
    INSERT INTO comment_areas (name, area_key, intro) VALUES (?, ?, ?)
  `).bind(name, key, intro).run();

  return new Response("OK", { status: 200 });
}

/** 展示单个讨论区页面（访客可见，若已隐藏则403） */
async function handleCommentAreaPage(request, env) {
  const url = new URL(request.url);
  const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\//, ''));

  const area = await env.DB.prepare(`
    SELECT * FROM comment_areas WHERE area_key = ?
  `).bind(areaKey).first();

  if (!area) {
    return new Response("讨论区不存在", { status: 404 });
  }
  if (area.hidden === 1) {
    // 如果讨论区已被隐藏，则访客不可访问
    return new Response("讨论区不可用", { status: 403 });
  }

  // 显示讨论区页面
  const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <title>${escapeHtml(area.name)}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <style>
      body {
        background: #121212; color: #fff; font-family: sans-serif;
        max-width: 800px; margin: 40px auto; padding: 20px;
      }
      a { color: #bbb; text-decoration: none; }
      a:hover { color: #fff; }
      .hint { color: #aaa; margin-bottom: 10px; }
      .comment-list { margin-top: 20px; }
      .comment-item { margin-bottom: 15px; padding: 10px; background: #1e1e1e; border-radius: 4px; }
      .reply-item { margin-left: 20px; }
      .reply-btn, .report-btn {
        margin-left: 10px; color: #999; cursor: pointer; font-size: 12px; text-decoration: underline;
      }
      .reply-box { margin-top: 5px; }

      .markdown-content { font-size: 14px; color: #ccc; }

      .form-group textarea {
        background: #1e1e1e; color: #fff; border: 1px solid #444; padding: 8px; width: 100%; height: 60px;
        resize: vertical; margin-bottom: 10px; font-size: 14px;
      }
      button {
        background: #333; color: #fff; border: none; padding: 8px 12px; cursor: pointer; border-radius: 3px;
        transition: background 0.3s ease, transform 0.2s ease;
      }
      button:hover {
        background: #444; transform: scale(1.02);
      }

      .notification-bar {
        position: fixed; bottom: 0; left: 0; width: 100%; background: #2a2a2a; color: #fff; padding: 10px 20px;
        display: flex; align-items: center; justify-content: space-between; font-size: 14px; z-index: 9999;
      }
      .notification-bar.hidden { display: none; }
      .close-btn { cursor: pointer; margin-left: 20px; font-weight: bold; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(area.name)}</h1>
    <div class="hint">${escapeHtml(area.intro || '')}</div>

    <div class="form-group">
      <textarea id="newComment" placeholder="Markdown语法可用，支持回复"></textarea>
      <input type="hidden" id="parentId" value="0" />
      <button id="submitBtn">提交评论</button>
      <div class="cf-challenge" data-sitekey="${env.TURNSTILE_SITEKEY || ''}" data-theme="auto"></div>
    </div>

    <div class="comment-list" id="commentList">加载中...</div>

    <!-- 通知栏 -->
    <div id="notificationBar" class="notification-bar hidden">
      <span id="notificationText"></span>
      <span id="closeNotification" class="close-btn">×</span>
    </div>

    <script>
      const notificationBar = document.getElementById('notificationBar');
      const notificationText = document.getElementById('notificationText');
      const closeNotification = document.getElementById('closeNotification');
      closeNotification.addEventListener('click', () => notificationBar.classList.add('hidden'));
      function showNotification(msg) {
        notificationText.textContent = msg;
        notificationBar.classList.remove('hidden');
      }

      async function loadComments() {
        const res = await fetch(location.pathname + '/comments');
        if (!res.ok) {
          document.getElementById('commentList').textContent = '评论加载失败';
          return;
        }
        const comments = await res.json();
        renderComments(comments);
      }

      // 将平面评论数据组装成树形结构
      function buildCommentTree(list) {
        const map = {};
        list.forEach(c => { map[c.id] = { ...c, replies: [] }; });
        const roots = [];
        list.forEach(c => {
          if (c.parent_id && c.parent_id !== 0) {
            map[c.parent_id]?.replies.push(map[c.id]);
          } else {
            roots.push(map[c.id]);
          }
        });
        return roots;
      }

      // 渲染评论树
      function renderComments(comments) {
        const listEl = document.getElementById('commentList');
        listEl.innerHTML = '';
        if (comments.length === 0) {
          listEl.textContent = '暂无评论';
          return;
        }
        const tree = buildCommentTree(comments);
        tree.forEach(comment => {
          listEl.appendChild(renderCommentItem(comment));
        });
      }

      function renderCommentItem(comment) {
        const div = document.createElement('div');
        div.className = 'comment-item' + (comment.parent_id ? ' reply-item' : '');
        div.innerHTML = \`
          <div class="markdown-content">\${comment.html_content}</div>
          <small style="color:#777;">\${comment.created_at || ''}</small>
          <span class="reply-btn" onclick="startReply(\${comment.id})">回复</span>
          <span class="report-btn" onclick="reportComment(\${comment.id})">举报</span>
        \`;

        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(r => {
            div.appendChild(renderCommentItem(r));
          });
        }
        return div;
      }

      // 启动回复
      window.startReply = (commentId) => {
        document.getElementById('parentId').value = commentId;
        document.getElementById('newComment').focus();
      }

      // 提交评论
      document.getElementById('submitBtn').addEventListener('click', async () => {
        const content = document.getElementById('newComment').value.trim();
        const parentId = document.getElementById('parentId').value || '0';
        if (!content) {
          showNotification('评论内容不能为空');
          return;
        }
        // Turnstile token
        const token = document.querySelector('[name="cf-turnstile-response"]')?.value || '';
        const formData = new FormData();
        formData.append('content', content);
        formData.append('parent_id', parentId);
        formData.append('cf-turnstile-response', token);

        const res = await fetch(location.pathname + '/comment', { method: 'POST', body: formData });
        if (res.ok) {
          document.getElementById('newComment').value = '';
          document.getElementById('parentId').value = '0';
          await loadComments();
        } else {
          showNotification('评论提交失败：' + (await res.text()));
        }
      });

      // 举报评论
      window.reportComment = async (commentId) => {
        const reason = prompt('请输入举报理由：');
        if (!reason) return;
        const formData = new FormData();
        formData.append('reason', reason);
        const res = await fetch(location.pathname + '/comment/' + commentId + '/report', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          showNotification('举报成功');
        } else {
          showNotification('举报失败：' + (await res.text()));
        }
      }

      loadComments();
    </script>
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  </body>
  </html>
  `;
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}

/** 获取评论列表 (JSON) */
async function handleGetComments(request, env) {
  const url = new URL(request.url);
  const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\/|\/comments$/g, ''));

  // 检查讨论区是否隐藏
  const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
  if (!area) return new Response(JSON.stringify([]), { status: 200 });
  if (area.hidden === 1) {
    // 已隐藏 => 访客视角下, 可视为无评论
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const res = await env.DB.prepare(`
    SELECT id, content, parent_id, created_at 
    FROM comments
    WHERE area_key = ?
    ORDER BY id ASC
  `).bind(areaKey).all();
  const list = res.results || [];

  // 给每条评论加上一个 html_content 字段(渲染Markdown)
  list.forEach(c => {
    c.html_content = parseMarkdown(c.content);
  });

  return new Response(JSON.stringify(list), {
    status: 200,
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  });
}

/** 发表评论(支持回复 + markdown) */
async function handlePostComment(request, env) {
  const url = new URL(request.url);
  const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\/|\/comment$/g, ''));

  const formData = await request.formData();
  const content = formData.get('content') || '';
  const parentId = parseInt(formData.get('parent_id') || '0', 10);
  const token = formData.get('cf-turnstile-response');

  if (!content) {
    return new Response("缺少评论内容", { status: 400 });
  }

  // Turnstile
  if (env.TURNSTILE_SECRET_KEY) {
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const params = new URLSearchParams();
    params.append('secret', env.TURNSTILE_SECRET_KEY);
    params.append('response', token || '');
    const verifyRes = await fetch(verifyUrl, { method: 'POST', body: params, headers: { "Content-Type":"application/x-www-form-urlencoded" } });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response("Turnstile验证失败", { status: 403 });
    }
  }

  // 检查是否隐藏
  const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
  if (!area) {
    return new Response("讨论区不存在", { status: 404 });
  }
  if (area.hidden === 1) {
    return new Response("该讨论区不可用", { status: 403 });
  }

  // 插入数据库
  await env.DB.prepare(`
    INSERT INTO comments (area_key, content, parent_id) VALUES (?, ?, ?)
  `).bind(areaKey, content, parentId).run();

  return new Response("OK", { status: 200 });
}

/** 举报评论 */
async function handleReportComment(request, env) {
  const match = request.url.match(/\/comment\/(\d+)\/report$/);
  if (!match) {
    return new Response("Invalid", { status: 400 });
  }
  const commentId = parseInt(match[1], 10);
  const formData = await request.formData();
  const reason = formData.get('reason') || '';

  if (!reason) {
    return new Response("缺少举报理由", { status: 400 });
  }

  // 检查评论是否存在
  const comment = await env.DB.prepare("SELECT id FROM comments WHERE id=?").bind(commentId).first();
  if (!comment) {
    return new Response("该评论不存在", { status: 404 });
  }

  // 写入reports
  await env.DB.prepare("INSERT INTO reports (comment_id, reason) VALUES (?, ?)").bind(commentId, reason).run();
  return new Response("OK", { status: 200 });
}
/** 删除讨论区 (管理员) */
async function handleDeleteArea(areaKeyEncoded, request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
    return new Response("Unauthorized", { status: 401 });
  }
  const areaKey = decodeURIComponent(areaKeyEncoded);

  // 先检查是否存在
  const area = await env.DB.prepare("SELECT id FROM comment_areas WHERE area_key=?").bind(areaKey).first();
  if (!area) {
    return new Response("讨论区不存在", { status: 404 });
  }

  // 删除操作：先删comments，再删自己
  await env.DB.prepare("DELETE FROM comments WHERE area_key=?").bind(areaKey).run();
  await env.DB.prepare("DELETE FROM comment_areas WHERE area_key=?").bind(areaKey).run();
  return new Response("OK", { status: 200 });
}

/** 切换隐藏状态 (管理员) */
async function handleToggleHideArea(areaKeyEncoded, request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
    return new Response("Unauthorized", { status: 401 });
  }
  const areaKey = decodeURIComponent(areaKeyEncoded);

  const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
  if (!area) {
    return new Response("讨论区不存在", { status: 404 });
  }
  const newHidden = area.hidden === 1 ? 0 : 1;
  await env.DB.prepare("UPDATE comment_areas SET hidden=? WHERE area_key=?").bind(newHidden, areaKey).run();
  return new Response("OK", { status: 200 });
}

/** 处理举报 -> 标记已处理 */
async function handleResolveReport(reportId, request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
    return new Response("Unauthorized", { status: 401 });
  }
  // 查询是否存在
  const rep = await env.DB.prepare("SELECT id FROM reports WHERE id=?").bind(reportId).first();
  if (!rep) {
    return new Response("该举报不存在", { status: 404 });
  }
  await env.DB.prepare("UPDATE reports SET resolved=1 WHERE id=?").bind(reportId).run();
  return new Response("OK", { status: 200 });
}
