export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 路由分发
    if (pathname === '/' && request.method === 'GET') {
      // 首页：显示登录表单或管理员面板
      return handleHomePage(request, env);
    } else if (pathname === '/login' && request.method === 'POST') {
      // 处理登录 (返回 JSON，而非跳转新页面)
      return handleLogin(request, env);
    } else if (pathname === '/create' && request.method === 'POST') {
      // 管理员创建新的评论区
      return handleCreateCommentArea(request, env);
    } else if (pathname.startsWith('/area/') && request.method === 'GET') {
      // 读取评论区页面或获取评论数据
      if (pathname.endsWith('/comments')) {
        // 获取某个评论区的所有评论 JSON
        return handleGetComments(request, env);
      } else {
        // 展示评论区页面
        return handleCommentAreaPage(request, env);
      }
    } else if (pathname.startsWith('/area/') && request.method === 'POST') {
      // 给某个评论区发布评论 or 删除评论
      if (pathname.endsWith('/comment')) {
        // 发表新评论
        return handlePostComment(request, env);
      }
      if (pathname.match(/^\/area\/[^/]+\/comment\/\d+\/delete$/)) {
        // 删除评论
        return handleDeleteComment(request, env);
      }
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

/** 主页：如果未登录，则显示登录表单；已登录则显示管理员面板 */
async function handleHomePage(request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  const authed = (cookie.auth === "1");

  // 如果只想获取已创建评论区列表（局部刷新）
  const url = new URL(request.url);
  if (url.searchParams.get('_getAreaList') === '1' && authed) {
    const results = await env.DB.prepare("SELECT id, name, area_key FROM comment_areas").all();
    const areas = results.results || [];
    let listHtml = '<ul>';
    if (areas.length === 0) {
      listHtml += '<li>暂无讨论区</li>';
    } else {
      for (const a of areas) {
        listHtml += `<li><strong>${escapeHtml(a.name)}</strong> - <a href="/area/${encodeURIComponent(a.area_key)}" target="_blank">查看</a></li>`;
      }
    }
    listHtml += '</ul>';
    return new Response(listHtml, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }

  // 否则返回整页
  const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <title>评论系统 - 首页</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* 全局暗色模式，仅使用黑白灰 */
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        background: #121212; 
        color: #fff;
        font-family: sans-serif; 
        max-width: 600px; 
        margin: 50px auto; 
        padding: 20px;
      }
      h1, h2, h3 {
        margin-bottom: 20px;
        color: #f0f0f0;
      }
      ul { list-style-type: none; padding-left: 0; }
      li { margin-bottom: 10px; }

      a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      a:hover {
        color: #fff; 
      }

      .hidden { display: none; }

      /* 登录及创建区表单 */
      .form-group {
        display: flex; 
        flex-direction: column;
        margin-bottom: 20px;
      }
      .form-group input {
        background: #1e1e1e;
        border: 1px solid #444;
        padding: 10px;
        color: #fff;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .form-group input::placeholder {
        color: #888;
      }
      .form-group button {
        background: #333; 
        color: #fff; 
        border: none; 
        padding: 10px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s ease;
      }
      .form-group button:hover {
        background: #444; 
        transform: scale(1.02);
      }

      /* 自定义通知横幅 */
      .notification-bar {
        position: fixed;
        bottom: 0; 
        left: 0; 
        width: 100%;
        background: #2a2a2a;
        color: #fff;
        padding: 10px 20px;
        display: flex; 
        align-items: center; 
        justify-content: space-between;
        font-size: 14px;
        box-shadow: 0 -2px 4px rgba(0,0,0,0.5);
        z-index: 9999;
      }
      .notification-bar .close-btn {
        cursor: pointer;
        margin-left: 20px;
        font-weight: bold;
      }
      .notification-bar.hidden {
        display: none;
      }

      /* 响应式设计 */
      @media (max-width: 600px) {
        body {
          margin: 20px auto; 
          padding: 10px;
        }
      }
    </style>
  </head>
  <body>
    <h1>评论系统</h1>

    <!-- 登录部分（管理员） -->
    <div id="loginSection" class="${authed ? 'hidden' : ''}">
      <h2>管理员登录</h2>
      <div class="form-group">
        <input type="password" id="passwordInput" placeholder="请输入密码" required />
        <button id="loginBtn">登录</button>
      </div>
    </div>

    <!-- 管理面板（仅管理员可见） -->
    <div id="adminSection" class="${!authed ? 'hidden' : ''}">
      <h2>讨论区管理面板</h2>
      <div id="areaList">加载中...</div>

      <hr style="border: none; border-bottom: 1px solid #333; margin: 30px 0;" />
      <h3>创建新的讨论区</h3>
      <div class="form-group">
        <input type="text" id="areaName" placeholder="讨论区名称" required />
        <input type="text" id="areaKey" placeholder="讨论区唯一标识(英文或数字)" required />
        <button id="createAreaBtn">创建</button>
      </div>
    </div>

    <!-- 底部自定义通知 -->
    <div id="notificationBar" class="notification-bar hidden">
      <span id="notificationText"></span>
      <span id="closeNotification" class="close-btn">×</span>
    </div>

    <script>
      const authed = ${authed ? 'true' : 'false'};
      const notificationBar = document.getElementById('notificationBar');
      const notificationText = document.getElementById('notificationText');
      const closeNotification = document.getElementById('closeNotification');

      // 关闭通知条
      closeNotification.addEventListener('click', () => {
        notificationBar.classList.add('hidden');
      });

      // 显示通知条函数
      function showNotification(message) {
        notificationText.textContent = message;
        notificationBar.classList.remove('hidden');
      }

      if (authed) {
        // 已登录：加载已有的讨论区列表
        fetchAreaList();
      }

      // =========== 登录 =============
      const loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
          const pwInput = document.getElementById('passwordInput');
          const password = pwInput.value.trim();
          if (!password) {
            showNotification('请输入密码');
            return;
          }
          // 发起 POST /login (JSON)
          const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
          });
          const data = await res.json();
          if (!data.success) {
            // 密码错误
            showNotification(data.message || '密码错误');
            pwInput.value = '';
          } else {
            // 登录成功，刷新页面
            location.reload();
          }
        });
      }

      // =========== 创建新讨论区 =============
      const createAreaBtn = document.getElementById('createAreaBtn');
      if (createAreaBtn) {
        createAreaBtn.addEventListener('click', async () => {
          const areaName = document.getElementById('areaName').value.trim();
          const areaKey = document.getElementById('areaKey').value.trim();
          if (!areaName || !areaKey) {
            showNotification('请填写讨论区名称和唯一标识');
            return;
          }
          const formData = new FormData();
          formData.append('area_name', areaName);
          formData.append('area_key', areaKey);

          const res = await fetch('/create', { method: 'POST', body: formData });
          if (res.ok) {
            showNotification('创建成功');
            // 刷新列表
            document.getElementById('areaName').value = '';
            document.getElementById('areaKey').value = '';
            await fetchAreaList();
          } else {
            showNotification('创建失败：' + (await res.text()));
          }
        });
      }

      // =========== 加载讨论区列表 (仅管理员时) ============
      async function fetchAreaList() {
        const areaListDiv = document.getElementById('areaList');
        areaListDiv.textContent = '加载中...';
        try {
          const res = await fetch('/?_getAreaList=1');
          const html = await res.text();
          areaListDiv.innerHTML = html;
        } catch (err) {
          areaListDiv.textContent = '加载失败：' + err.message;
        }
      }
    </script>
  </body>
  </html>
  `;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html;charset=UTF-8" }
  });
}

/** 处理登录：接收 JSON 请求，返回 JSON 响应 */
async function handleLogin(request, env) {
  try {
    const data = await request.json();
    const password = data.password;

    if (password === env.ADMIN_PASS) {
      // 密码正确，设置 Cookie
      const headers = new Headers();
      headers.append('Set-Cookie', 'auth=1; HttpOnly; Path=/; Max-Age=3600');
      headers.append('Content-Type', 'application/json;charset=UTF-8');

      return new Response(JSON.stringify({
        success: true,
        message: '登录成功'
      }), {
        status: 200,
        headers
      });
    } else {
      // 密码错误
      return new Response(JSON.stringify({
        success: false,
        message: '密码错误，请重试'
      }), {
        status: 200, // 返回200方便前端处理
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      message: '请求异常：' + err.message
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }
}

/** 管理员创建新的评论区 */
async function handleCreateCommentArea(request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  const authed = (cookie.auth === "1");
  if (!authed) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const areaName = formData.get("area_name");
  const areaKey = formData.get("area_key");

  if (!areaName || !areaKey) {
    return new Response("参数不完整", { status: 400 });
  }

  // 插入到 comment_areas 表中
  await env.DB.prepare("INSERT INTO comment_areas (name, area_key) VALUES (?, ?)")
    .bind(areaName, areaKey)
    .run();

  return new Response("OK", { status: 200 });
}

/** 展示单个评论区页面（访客也可以进入，阅读 & 评论） */
async function handleCommentAreaPage(request, env) {
  const url = new URL(request.url);
  const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\//, ''));

  // 查询该评论区
  const area = await env.DB.prepare("SELECT * FROM comment_areas WHERE area_key = ?")
    .bind(areaKey)
    .first();

  if (!area) {
    return new Response("讨论区不存在", { status: 404 });
  }

  const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>${escapeHtml(area.name)}</title>
    <style>
      body {
        background: #121212; 
        color: #fff; 
        font-family: sans-serif;
        max-width: 800px; 
        margin: 50px auto; 
        padding: 20px;
      }
      h1 {
        font-size: 20px; 
        margin-bottom: 20px; 
        color: #f0f0f0;
      }
      .navbar a { 
        color: #ccc; 
        text-decoration: none; 
        margin-right: 10px; 
      }
      a:hover { color: #fff; }
      .hint { color: #aaa; font-size: 14px; margin-bottom: 10px; }
      .comment-section { margin-top: 20px; }
      .comment-form { margin-bottom: 20px; }
      .comment-form textarea {
        width: 100%; 
        height: 80px; 
        font-size: 14px; 
        padding: 8px; 
        margin-bottom: 10px; 
        background: #1e1e1e;
        color: #fff;
        border: 1px solid #444;
        resize: vertical;
      }
      button {
        background: #333;
        color: #fff;
        border: none;
        padding: 8px 12px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 3px;
        transition: background 0.3s ease, transform 0.2s ease;
      }
      button:hover {
        background: #444;
        transform: scale(1.02);
      }
      .comment-list p {
        margin: 10px 0; 
        padding: 8px; 
        background: #1e1e1e; 
        border-radius: 4px;
      }
      .comment-list p span { 
        color: #999; 
        margin-left: 8px; 
        font-size: 12px; 
      }
      .cf-challenge { margin-bottom: 10px; }

      /* 通用通知 */
      .notification-bar {
        position: fixed;
        bottom: 0; left: 0; width: 100%;
        background: #2a2a2a; color: #fff; padding: 10px 20px;
        display: flex; align-items: center; justify-content: space-between;
        font-size: 14px;
        box-shadow: 0 -2px 4px rgba(0,0,0,0.5);
        z-index: 9999;
      }
      .notification-bar.hidden { display: none; }
      .notification-bar .close-btn {
        cursor: pointer;
        font-weight: bold;
        margin-left: 20px;
      }

      @media (max-width: 600px) {
        body { margin: 20px auto; padding: 10px; }
      }
    </style>
  </head>
  <body>
    <div class="navbar">
      <a href="/">返回首页</a>
    </div>
    <h1>讨论区：${escapeHtml(area.name)}</h1>
    <div class="hint">欢迎在此讨论，查看已有评论或发布新评论</div>

    <div class="comment-section">
      <div class="comment-form">
        <h2>发布评论</h2>
        <form id="commentForm">
          <textarea name="content" placeholder="请输入评论内容" required></textarea>
          <div class="cf-challenge" data-sitekey="${env.TURNSTILE_SITEKEY || ''}" data-theme="auto"></div>
          <button type="submit">提交评论</button>
        </form>
      </div>
      <h2>评论列表</h2>
      <div id="comments" class="comment-list">加载中...</div>
    </div>

    <!-- 通知条 -->
    <div id="notificationBar" class="notification-bar hidden">
      <span id="notificationText"></span>
      <span id="closeNotification" class="close-btn">×</span>
    </div>

    <script>
      const notificationBar = document.getElementById('notificationBar');
      const notificationText = document.getElementById('notificationText');
      const closeNotification = document.getElementById('closeNotification');
      closeNotification.addEventListener('click', () => {
        notificationBar.classList.add('hidden');
      });
      function showNotification(msg) {
        notificationText.textContent = msg;
        notificationBar.classList.remove('hidden');
      }

      async function loadComments() {
        const res = await fetch(location.pathname + '/comments');
        if (!res.ok) {
          document.getElementById('comments').textContent = '评论加载失败';
          return;
        }
        const comments = await res.json();
        const div = document.getElementById('comments');
        div.innerHTML = '';
        if (comments.length === 0) {
          div.textContent = '暂无评论';
          return;
        }
        comments.forEach((c) => {
          const p = document.createElement('p');
          p.textContent = c.content;
          const timeSpan = document.createElement('span');
          timeSpan.textContent = ' ' + (c.created_at || '');
          p.appendChild(timeSpan);
          div.appendChild(p);
        });
      }

      document.getElementById('commentForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        // Turnstile 的 token
        const token = document.querySelector('[name="cf-turnstile-response"]')?.value;
        formData.append('cf-turnstile-response', token || '');
        
        const response = await fetch(location.pathname + '/comment', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          await loadComments(); 
          form.reset();
        } else {
          const error = await response.text();
          showNotification('评论提交失败：' + error);
        }
      });

      loadComments();
    </script>

    <!-- Cloudflare Turnstile JS (若不需要可去掉) -->
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  </body>
  </html>
  `;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html;charset=UTF-8" }
  });
}

/** 获取某个评论区的所有评论数据(JSON) */
async function handleGetComments(request, env) {
  const url = new URL(request.url);
  const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\/|\/comments$/g, ''));
  const results = await env.DB
    .prepare("SELECT id, content, created_at FROM comments WHERE area_key = ? ORDER BY id DESC")
    .bind(areaKey)
    .all();
  const comments = results.results || [];
  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  });
}

/** 在某个评论区发布新的评论 */
async function handlePostComment(request, env) {
  const url = new URL(request.url);
  const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\/|\/comment$/g, ''));
  const formData = await request.formData();
  const content = formData.get('content');
  const token = formData.get('cf-turnstile-response');

  if (!content) {
    return new Response("缺少评论内容", { status: 400 });
  }

  // Turnstile 验证（若不需要，可删除此段）
  if (env.TURNSTILE_SECRET_KEY) {
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const params = new URLSearchParams();
    params.append('secret', env.TURNSTILE_SECRET_KEY);
    params.append('response', token || '');

    const verifyRes = await fetch(verifyUrl, {
      method: 'POST',
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response("Turnstile verification failed: " + JSON.stringify(verifyData), { status: 403 });
    }
  }

  await env.DB.prepare("INSERT INTO comments (area_key, content) VALUES (?, ?)")
    .bind(areaKey, content)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  });
}

/** 删除评论（管理员可自定义是否对访客开放） */
async function handleDeleteComment(request, env) {
  const url = new URL(request.url);
  // /area/xxx/comment/123/delete
  const match = url.pathname.match(/^\/area\/([^/]+)\/comment\/(\d+)\/delete$/);
  if (!match) return new Response("Not Found", { status: 404 });

  const areaKey = decodeURIComponent(match[1]);
  const commentId = parseInt(match[2], 10);

  // 检查是否存在
  const comment = await env.DB
    .prepare("SELECT id FROM comments WHERE id=? AND area_key=?")
    .bind(commentId, areaKey)
    .first();
  if (!comment) return showDeleteErrorPage();

  // 删除
  const delRes = await env.DB.prepare("DELETE FROM comments WHERE id=?")
    .bind(commentId)
    .run();

  if (delRes.success !== true) return showDeleteErrorPage();

  // 返回评论区页面
  return Response.redirect(`/area/${encodeURIComponent(areaKey)}`, 303);
}

/** 删除失败页面 */
function showDeleteErrorPage() {
  const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <title>无法删除</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <style>
      body {
        background: #121212; 
        color: #fff; 
        font-family: sans-serif;
        max-width: 400px; 
        margin: 50px auto; 
        padding: 20px;
        text-align: center;
      }
      a {
        color: #ccc; 
        text-decoration: none;
      }
      a:hover { color: #fff; }
      h1 { margin-bottom: 20px; }
    </style>
  </head>
  <body>
    <h1>无法删除</h1>
    <p>该评论不存在或已无法删除。</p>
    <p><a href="javascript:history.back()">返回</a></p>
  </body>
  </html>`;
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}

/** 转义HTML工具 (防止XSS) */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
