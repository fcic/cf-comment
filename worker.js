const i18n = {
  'zh-CN': {
    'home_title': '评论系统 - 首页',
    'login_title': '管理员登录',
    'password_placeholder': '请输入密码',
    'login_btn': '登录',
    'admin_panel_title': '讨论区管理面板',
    'area_list_title': '已有讨论区列表',
    'create_area_title': '创建新的讨论区',
    'area_name_placeholder': '名称',
    'area_key_placeholder': '唯一标识',
    'area_intro_placeholder': '简介(可选)',
    'create_btn': '创建',
    'report_management_title': '举报管理',
    'loading': '加载中...',
    'no_areas': '暂无讨论区',
    'area_id': 'ID',
    'area_name': '名称',
    'area_key': 'Key',
    'area_hidden': '隐藏',
    'area_intro': '简介',
    'area_comments': '评论',
    'area_action': '操作',
    'view': '查看',
    'hide': '隐藏',
    'unhide': '取消隐藏',
    'delete': '删除',
    'no_reports': '暂无举报',
    'report_id': 'ID',
    'report_comment_id': '评论ID',
    'report_content': '内容',
    'report_reason': '理由',
    'report_created_at': '创建时间',
    'report_resolved': '已处理',
    'resolve_report': '标记已处理',
    'toggle_hide_comment': '隐藏/恢复',
    'delete_confirm': '确认删除该讨论区？此操作不可恢复',
    'notification_input_password': '请输入密码',
    'notification_login_failed': '密码错误',
    'notification_create_success': '创建成功',
    'notification_create_failed': '创建失败',
    'notification_delete_success': '删除成功',
    'notification_delete_failed': '删除失败',
    'notification_toggle_success': '操作成功',
    'notification_toggle_failed': '操作失败',
    'notification_report_success': '举报成功',
    'notification_report_failed': '举报失败',
    'notification_report_resolved': '已标记为处理',
    'notification_comment_hidden_toggle': '评论隐藏状态已切换',
    'notification_comment_submit_failed': '评论提交失败',
    'notification_missing_input': '名称和唯一标识必填',
    'notification_report_missing_reason': '缺少举报理由',
    'notification_comment_missing_content': '评论内容不能为空',
    'notification_unauthorized': '未授权',
    'notification_not_found': '未找到',
    'comment_title': '评论区',
    'comment_placeholder': 'Markdown语法可用，支持回复',
    'submit_comment_btn': '提交评论',
    'no_comments': '暂无评论',
    'reply_btn': '回复',
    'report_comment': '举报',
    'comment_hidden': '此评论已被隐藏',
    'view_comment': '查看',
    'collapse_comment': '收起',
     'language': '语言',
    'theme': '主题',
    'light': '浅色',
    'dark': '深色'
  },
  'en': {
    'home_title': 'Comment System - Home',
    'login_title': 'Admin Login',
    'password_placeholder': 'Enter password',
    'login_btn': 'Login',
    'admin_panel_title': 'Comment Area Management',
    'area_list_title': 'Existing Comment Areas',
    'create_area_title': 'Create New Comment Area',
    'area_name_placeholder': 'Name',
    'area_key_placeholder': 'Unique Key',
    'area_intro_placeholder': 'Introduction (optional)',
    'create_btn': 'Create',
    'report_management_title': 'Report Management',
    'loading': 'Loading...',
    'no_areas': 'No comment areas yet',
    'area_id': 'ID',
    'area_name': 'Name',
    'area_key': 'Key',
    'area_hidden': 'Hidden',
    'area_intro': 'Intro',
    'area_comments': 'Comments',
    'area_action': 'Actions',
    'view': 'View',
    'hide': 'Hide',
    'unhide': 'Unhide',
    'delete': 'Delete',
    'no_reports': 'No reports yet',
    'report_id': 'ID',
    'report_comment_id': 'Comment ID',
    'report_content': 'Content',
    'report_reason': 'Reason',
    'report_created_at': 'Created At',
    'report_resolved': 'Resolved',
    'resolve_report': 'Mark as Resolved',
    'toggle_hide_comment': 'Hide/Restore',
    'delete_confirm': 'Confirm delete this comment area? This action cannot be undone',
    'notification_input_password': 'Please enter password',
    'notification_login_failed': 'Incorrect password',
    'notification_create_success': 'Created successfully',
    'notification_create_failed': 'Failed to create',
    'notification_delete_success': 'Deleted successfully',
    'notification_delete_failed': 'Failed to delete',
    'notification_toggle_success': 'Operation successful',
    'notification_toggle_failed': 'Operation failed',
    'notification_report_success': 'Reported successfully',
    'notification_report_failed': 'Failed to report',
    'notification_report_resolved': 'Marked as resolved',
    'notification_comment_hidden_toggle': 'Comment hidden state toggled',
    'notification_comment_submit_failed': 'Failed to submit comment',
    'notification_missing_input': 'Name and key are required',
    'notification_report_missing_reason': 'Missing report reason',
    'notification_comment_missing_content': 'Comment content cannot be empty',
    'notification_unauthorized': 'Unauthorized',
    'notification_not_found': 'Not Found',
    'comment_title': 'Comment Area',
    'comment_placeholder': 'Markdown is supported, reply available',
    'submit_comment_btn': 'Submit Comment',
    'no_comments': 'No comments yet',
    'reply_btn': 'Reply',
    'report_comment': 'Report',
    'comment_hidden': 'This comment has been hidden',
    'view_comment': 'View',
    'collapse_comment': 'Collapse',
    'language': 'Language',
    'theme': 'Theme',
    'light': 'Light',
    'dark': 'Dark'
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
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** 使用 Marked.js 解析 Markdown */
function parseMarkdown(md) {
    if (!md) return '';
    return  marked ? marked.parse(md, { breaks: true }) : md;
}

// 获取语言
async function getLanguage(request) {
    const cookie = parseCookie(request.headers.get("Cookie") || "");
     if (cookie.lang) {
        return cookie.lang;
     }
    // 从 Accept-Language 头中获取语言偏好
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        const languages = acceptLanguage.split(',').map(lang => lang.trim().split(';')[0]);
        if (languages.some(lang => lang.startsWith('zh'))) {
            return 'zh-CN';
        }
    }
    return 'en'; // 默认英文
}

// 获取主题
async function getTheme(request) {
    const cookie = parseCookie(request.headers.get("Cookie") || "");
    return cookie.theme || 'dark';
}

/** 设置主题/语言的 cookie */
function setCookie(name, value, res) {
    res.headers.append('Set-Cookie', `${name}=${value}; Path=/; SameSite=Lax; Max-Age=3600`);
}

/**  显示通知栏 */
function showNotification(msg) {
  const notificationHtml = `
    <div id="notificationBar" class="notification-bar">
      <span id="notificationText">${msg}</span>
      <span id="closeNotification" class="close-btn">×</span>
    </div>
  `;
  return notificationHtml;
}

let marked = null; // 使用全局变量存储 marked，避免重复加载

function responseWithCors(body, init = {}) {
    const headers = init.headers || {};
    headers['Access-Control-Allow-Origin'] = '*';
     headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    return new Response(body, { ...init, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 初始化语言
    const lang = await getLanguage(request);
    // 初始化主题
    const theme = await getTheme(request);

    // 路由分发
    if (pathname === '/' && request.method === 'GET') {
      // 首页：显示登录表单 or 管理面板
      const response =  await handleHomePage(request, env, lang, theme);
      return responseWithCors(await response.text(), {headers: response.headers});
      }  else if (pathname === '/login' && request.method === 'POST') {
        const response =  await handleLogin(request, env);
         return responseWithCors(await response.text(), {headers: response.headers});
       }  else if (pathname === '/create' && request.method === 'POST') {
        const response =  await handleCreateCommentArea(request, env);
         return responseWithCors(await response.text(), {headers: response.headers});
       } else if (pathname.startsWith('/area/') && request.method === 'GET') {
        // 访问某个讨论区 or 获取评论 JSON
       if (pathname.endsWith('/comments')) {
          const response =   await handleGetComments(request, env);
             return responseWithCors(await response.text(), {headers: response.headers});
       }  else {
        // 讨论区页面
         const response =  await handleCommentAreaPage(request, env, lang, theme);
            return responseWithCors(await response.text(), {headers: response.headers});
       }
    }  else if (pathname.startsWith('/area/') && request.method === 'POST') {
       // 评论 or 举报
       if (pathname.endsWith('/comment')) {
           const response = await handlePostComment(request, env);
           return responseWithCors(await response.text(), {headers: response.headers});
        }
        if (pathname.match(/^\/area\/[^/]+\/comment\/\d+\/report$/)) {
            const response =  await handleReportComment(request, env);
          return responseWithCors(await response.text(), {headers: response.headers});
        }
    }
     // 管理端操作
    if (pathname.startsWith('/admin/') && request.method === 'POST') {
         const matchDeleteArea = pathname.match(/^\/admin\/area\/([^/]+)\/delete$/);
          if (matchDeleteArea) {
             const response =  await handleDeleteArea(matchDeleteArea[1], request, env);
              return responseWithCors(await response.text(), {headers: response.headers});
       }
       const matchHideArea = pathname.match(/^\/admin\/area\/([^/]+)\/toggleHide$/);
          if (matchHideArea) {
             const response = await handleToggleHideArea(matchHideArea[1], request, env);
             return responseWithCors(await response.text(), {headers: response.headers});
        }
      const matchResolveReport = pathname.match(/^\/admin\/reports\/resolve\/(\d+)$/);
          if (matchResolveReport) {
             const response =   await handleResolveReport(parseInt(matchResolveReport[1], 10), request, env);
              return responseWithCors(await response.text(), {headers: response.headers});
       }
      const matchToggleHideComment = pathname.match(/^\/admin\/comment\/(\d+)\/toggleHide$/);
          if (matchToggleHideComment) {
              const commentId = parseInt(matchToggleHideComment[1], 10);
            const response =  await handleToggleHideComment(commentId, request, env);
             return responseWithCors(await response.text(), {headers: response.headers});
         }
    }
   // 获取更详尽的管理员信息，如讨论区列表、举报列表
    if (pathname === '/admin/extendedInfo' && request.method === 'GET') {
        const response =  await handleAdminExtendedInfo(request, env);
         return responseWithCors(await response.text(), {headers: response.headers});
    }
    // 处理语言切换
   if (pathname === '/setLang' && request.method === 'POST') {
       const response =   await handleSetLang(request, env);
         return responseWithCors(await response.text(), {headers: response.headers});
    }
    // 处理主题切换
     if(pathname === '/setTheme' && request.method === 'POST') {
        const response =   await handleSetTheme(request, env);
         return responseWithCors(await response.text(), {headers: response.headers});
     }
    // 新增：处理嵌入页面的路由
    if (pathname.startsWith('/embed/area/') && request.method === 'GET') {
      const areaKey = decodeURIComponent(pathname.replace(/^\/embed\/area\//, ''));
        const response = await handleEmbedCommentArea(areaKey, request, env, lang, theme);
      return responseWithCors(await response.text(), {headers: response.headers});
    }
    
     if (request.method === 'OPTIONS') {
            // 处理预检请求
            return new Response(null, {
              status: 204,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
              },
            });
          }

    return new Response("Not Found", { status: 404 });
  }
};

// 新增：处理嵌入评论区的函数
// 新增：处理嵌入评论区的函数
async function handleEmbedCommentArea(areaKey, request, env, lang, theme) {
  const t = i18n[lang];
  const area = await env.DB.prepare(`
    SELECT * FROM comment_areas WHERE area_key = ?
  `).bind(areaKey).first();

  if (!area || area.hidden === 1) {
    return new Response("Comment area not available", { status: 404 });
  }

  const html = `
    <div class="form-group">
      <textarea id="newComment" placeholder="${t.comment_placeholder}"></textarea>
      <input type="hidden" id="parentId" value="0" />
      <button id="submitBtn">${t.submit_comment_btn}</button>
        <div class="cf-challenge" data-sitekey="${env.TURNSTILE_SITEKEY || ''}" data-theme="${theme}"></div>
    </div>
    <div class="comment-list" id="commentList">${t.loading}</div>

    <!-- 通知栏 -->
    <div id="notificationBar" class="notification-bar hidden">
      <span id="notificationText"></span>
      <span id="closeNotification" class="close-btn">×</span>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js"></script>
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
        const commentList =  document.getElementById('commentList');
        commentList.textContent = '${t.loading}';
        try{
        const res = await fetch('/area/${areaKey}/comments');
          if (!res.ok) {
              commentList.textContent = '${t.notification_not_found} : ' + res.status;
            return;
         }
        const comments = await res.json();
          renderComments(comments);
        }catch(e){
            console.error("load comments failed",e)
             commentList.textContent = '评论加载失败，请查看控制台';
        }
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

      // 判断是否登录管理员
      const authed = document.cookie.includes('auth=1');

      // 渲染评论树
      function renderComments(comments) {
          const listEl = document.getElementById('commentList');
          listEl.innerHTML = '';
          if (comments.length === 0) {
              listEl.textContent = '${t.no_comments}';
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
        // 如果评论被隐藏
          if (comment.hidden === 1) {
           // 管理员可直接查看原文，普通用户默认折叠
            if (authed) {
              // 管理员视角: 可看到原文 + 「隐藏/恢复」操作
              div.innerHTML = \`
                  <div class="markdown-content markdown-body" style="border-left:2px solid #444; padding-left:8px;">
                     [${t.comment_hidden}，${t.admin_panel_title}]<br/>
                    \${comment.html_content}
              </div>
                  <small style="color:#777;">\${comment.created_at || ''}</small>
              <span class="reply-btn" data-comment-id="\${comment.id}">${t.reply_btn}</span>
                  <span class="report-btn" onclick="reportComment(\${comment.id})">${t.report_comment}</span>
              <button onclick="toggleHideComment(\${comment.id})">
                    ${t.unhide}
              </button>
              \`;
            } else {
               // 普通用户: 仅显示「此评论已被隐藏」，点击「查看」再展开
              div.innerHTML = \`
                  <div class="hidden-comment-placeholder">
                  ${t.comment_hidden}
                 <span class="show-btn" onclick="toggleHiddenContent(this, \${comment.id})">${t.view_comment}</span>
                  </div>
              <div class="hidden-content" style="display:none;">
                      <div class="markdown-content markdown-body">\${comment.html_content}</div>
                <small style="color:#777;">\${comment.created_at || ''}</small>
                  <span class="reply-btn" data-comment-id="\${comment.id}">${t.reply_btn}</span>
                 <span class="report-btn" onclick="reportComment(\${comment.id})">${t.report_comment}</span>
                </div>
              \`;
            }
          } else {
            // 未隐藏
            div.innerHTML = \`
                <div class="markdown-content markdown-body">\${comment.html_content}</div>
                 <small style="color:#777;">\${comment.created_at || ''}</small>
                  <span class="reply-btn" data-comment-id="\${comment.id}">${t.reply_btn}</span>
              <span class="report-btn" onclick="reportComment(\${comment.id})">${t.report_comment}</span>
                   \${authed ? \`<button onclick="toggleHideComment(\${comment.id})">${t.hide}</button>\` : ''}
            \`;
        }

          // 若有子回复
        if (comment.replies && comment.replies.length > 0) {
              comment.replies.forEach(r => {
              div.appendChild(renderCommentItem(r));
            });
          }
         return div;
      }

      // 前端切换「已隐藏」评论的显示/折叠
          window.toggleHiddenContent = (trigger, commentId) => {
            const wrapper = trigger.closest('.hidden-comment-placeholder').nextElementSibling;
        if (!wrapper) return;
              const isHidden = (wrapper.style.display === 'none');
             wrapper.style.display = isHidden ? 'block' : 'none';
             trigger.textContent = isHidden ? '${t.collapse_comment}' : '${t.view_comment}';
          };

          // 切换单条评论隐藏(仅管理员)
        window.toggleHideComment = async (commentId) => {
          const res = await fetch('/admin/comment/' + commentId + '/toggleHide', { method: 'POST' });
          if (res.ok) {
              showNotification('${t.notification_comment_hidden_toggle}');
              await loadComments();
          } else {
              showNotification('${t.notification_toggle_failed}：' + (await res.text()));
          }
        }

        // 启动回复
        document.addEventListener('click', e => {
              if (e.target && e.target.classList.contains('reply-btn')) {
                 const commentId = e.target.dataset.commentId;
                 document.getElementById('parentId').value = commentId;
               document.getElementById('newComment').focus();
             }
        });

          // 提交评论
      document.getElementById('submitBtn').addEventListener('click', async () => {
          const content = document.getElementById('newComment').value.trim();
          const parentId = document.getElementById('parentId').value || '0';
         if (!content) {
               showNotification('${t.notification_comment_missing_content}');
               return;
           }
        // Turnstile token
        const token = document.querySelector('[name="cf-turnstile-response"]')?.value || '';
           const formData = new FormData();
           formData.append('content', content);
           formData.append('parent_id', parentId);
           formData.append('cf-turnstile-response', token);

          const res = await fetch('/area/${areaKey}/comment', { method: 'POST', body: formData });
          if (res.ok) {
            document.getElementById('newComment').value = '';
             document.getElementById('parentId').value = '0';
             await loadComments();
          } else {
              showNotification('${t.notification_comment_submit_failed}：' + (await res.text()));
            }
      });

      // 举报评论
          window.reportComment = async (commentId) => {
          const reason = prompt('${t.report_comment}:');
            if (!reason) return;
           const formData = new FormData();
           formData.append('reason', reason);
           const res = await fetch('/area/${areaKey}/comment/' + commentId + '/report', {
             method: 'POST',
               body: formData
             });
             if (res.ok) {
              showNotification('${t.notification_report_success}');
            } else {
                 showNotification('${t.notification_report_failed}：' + (await res.text()));
            }
        }

     loadComments();
    </script>
  `;

  return responseWithCors(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}

/** 首页：未登录 => 显示登录；已登录 => 管理面板(显示更详尽信息) */
async function handleHomePage(request, env, lang, theme) {
    const cookie = parseCookie(request.headers.get("Cookie") || "");
    const authed = (cookie.auth === "1");
    const url = new URL(request.url);
    const t = i18n[lang];

    // 如果只是想获取管理员的讨论区列表、举报列表等 JSON
    if (url.searchParams.get('_extendedInfo') === '1' && authed) {
        return handleAdminExtendedInfo(request, env);
    }
    
      const html = `
      <!DOCTYPE html>
      <html lang="${lang}" data-theme="${theme}">
      <head>
        <meta charset="UTF-8">
        <title>${t.home_title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css">
         <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js"></script>
        <style>
            body {
                background: var(--bg-color); color: var(--text-color); font-family: sans-serif;
                max-width: 800px; margin: 40px auto; padding: 20px;
            }
            h1 { margin-bottom: 20px; }
            a { color: var(--link-color); text-decoration: none; }
            a:hover { color: var(--link-hover-color); }
            ul { list-style: none; padding: 0; }
            li { margin-bottom: 10px; }

            .hidden { display: none; }

            .form-group {
                display: flex; flex-direction: column; margin-bottom: 20px;
            }
            .form-group input {
                background: var(--input-bg-color); border: 1px solid var(--border-color); padding: 10px; color: var(--text-color); font-size: 14px; margin-bottom: 10px;
            }
            .form-group button {
                background: var(--button-bg-color); color: var(--button-text-color); border: none; padding: 10px; font-size: 14px; cursor: pointer;
                transition: background 0.3s ease, transform 0.2s ease;
            }
            .form-group button:hover {
                background: var(--button-hover-color); transform: scale(1.02);
            }

            hr { border: none; border-bottom: 1px solid var(--border-color); margin: 20px 0; }

            .notification-bar {
                position: fixed; bottom: 0; left: 0; width: 100%; background: var(--notification-bg-color); color: var(--notification-text-color); padding: 10px 20px;
                display: flex; align-items: center; justify-content: space-between; font-size: 14px; z-index: 9999;
            }
            .notification-bar.hidden { display: none; }
            .close-btn { cursor: pointer; margin-left: 20px; font-weight: bold; }
            .admin-section { margin-top: 30px; }

            .table-like { width: 100%; border-collapse: collapse; }
            .table-like th, .table-like td { border: none; padding: 8px; text-align: left;} /*  去除表格边框 */
            .table-like th { background: var(--table-header-bg-color); }

            @media (max-width: 600px) {
            body { margin: 20px auto; padding: 10px; }
            }
            
             /* 深浅色主题 */
          :root {
              --bg-color: #121212;
              --text-color: #fff;
              --link-color: #bbb;
              --link-hover-color: #fff;
              --input-bg-color: #1e1e1e;
              --border-color: #444;
              --button-bg-color: #333;
              --button-text-color: #fff;
              --button-hover-color: #444;
              --notification-bg-color: #2a2a2a;
                --notification-text-color: #fff;
              --table-header-bg-color: #1e1e1e;

          }
            
          [data-theme="light"] {
                --bg-color: #f9f9f9;
                --text-color: #333;
                --link-color: #555;
              --link-hover-color: #000;
              --input-bg-color: #eee;
                --border-color: #ccc;
              --button-bg-color: #ddd;
                --button-text-color: #333;
                --button-hover-color: #eee;
                --notification-bg-color: #f0f0f0;
                --notification-text-color: #333;
                 --table-header-bg-color: #eee;
            }
            .top-actions {
                margin-bottom: 20px;
                display: flex;
                justify-content: flex-end;
             }
            .top-actions button {
                background: var(--button-bg-color); color: var(--button-text-color); border: none; padding: 8px 12px; cursor: pointer; border-radius: 3px;
                transition: background 0.3s ease, transform 0.2s ease;
                margin-left: 10px;
            }

            .top-actions button:hover {
                background: var(--button-hover-color); transform: scale(1.02);
            }
        </style>
      </head>
      <body>
       <div class="top-actions">
            <button id="toggleTheme">${theme === 'light' ? t.dark : t.light}</button>
             <button id="toggleLang">${lang === 'zh-CN' ? 'EN' : '中文'}</button>
         </div>
        <h1>${t.home_title}</h1>
        <!-- 通知栏 -->
        <div id="notificationBar" class="notification-bar hidden">
          <span id="notificationText"></span>
          <span id="closeNotification" class="close-btn">×</span>
        </div>

        <div id="loginSection" class="${authed ? 'hidden' : ''}">
          <h2>${t.login_title}</h2>
          <div class="form-group">
            <input type="password" id="passwordInput" placeholder="${t.password_placeholder}" />
            <button id="loginBtn">${t.login_btn}</button>
          </div>
        </div>

        <div id="adminSection" class="admin-section ${!authed ? 'hidden' : ''}">
          <h2>${t.admin_panel_title}</h2>
          <div>
            <h3>${t.area_list_title}</h3>
            <div id="areaList">${t.loading}</div>
          </div>

          <hr />
          <h3>${t.create_area_title}</h3>
          <div class="form-group">
            <input type="text" id="areaName" placeholder="${t.area_name_placeholder}" />
            <input type="text" id="areaKey" placeholder="${t.area_key_placeholder}" />
            <textarea id="areaIntro" placeholder="${t.area_intro_placeholder}"
                      style="background:var(--input-bg-color);color:var(--text-color);border:1px solid var(--border-color);height:60px;font-size:14px;margin-bottom:10px;"></textarea>
            <button id="createAreaBtn">${t.create_btn}</button>
          </div>

          <hr />
          <h3>${t.report_management_title}</h3>
          <div id="reportList">${t.loading}</div>
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
                    showNotification('${t.notification_input_password}');
                    return;
                }
                const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: pw })
                });
                const data = await res.json();
                if (!data.success) {
                    showNotification(data.message || '${t.notification_login_failed}');
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
                    showNotification('${t.notification_missing_input}');
                    return;
                }
                const formData = new FormData();
                formData.append('area_name', areaName);
                formData.append('area_key', areaKey);
                formData.append('intro', areaIntro);
                const res = await fetch('/create', { method: 'POST', body: formData });
                if (res.ok) {
                    showNotification('${t.notification_create_success}');
                  // 清空
                  document.getElementById('areaName').value = '';
                  document.getElementById('areaKey').value = '';
                  document.getElementById('areaIntro').value = '';
                  await fetchExtendedInfo(); // 刷新
                } else {
                    showNotification('${t.notification_create_failed}：' + (await res.text()));
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
  
        // 渲染讨论区列表
      function renderAreaList(areas) {
        const div = document.getElementById('areaList');
        if (areas.length === 0) {
          div.textContent = '${t.no_areas}';
          return;
        }
  
        let html = \`
          <table class="table-like">
            <thead>
              <tr>
                <th>${t.area_id}</th>
                <th>${t.area_name}</th>
                <th>${t.area_key}</th>
                <th>${t.area_hidden}</th>
                <th>${t.area_intro}</th>
                <th>${t.area_comments}</th>
                <th>${t.area_action}</th>
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
              <td>\${a.hidden ? '${t.hide}' : '${t.unhide}'}</td>
              <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                \${a.intro || ''}
              </td>
              <td>\${a.comment_count}</td>
              <td>
                <a href="/area/\${encodeURIComponent(a.area_key)}" target="_blank">${t.view}</a>
                <button onclick="toggleHideArea('\${encodeURIComponent(a.area_key)}')">
                  \${a.hidden ? '${t.unhide}' : '${t.hide}'}
                </button>
                <button onclick="deleteArea('\${encodeURIComponent(a.area_key)}')">${t.delete}</button>
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
              div.textContent = '${t.no_reports}';
              return;
            }
            let html = \`
            <table class="table-like">
            <thead>
                <tr>
                <th>${t.report_id}</th>
                <th>${t.report_comment_id}</th>
                <th>${t.report_content}</th>
                <th>${t.report_reason}</th>
                <th>${t.report_created_at}</th>
                <th>${t.report_resolved}</th>
                <th>${t.area_action}</th>
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
              \${r.comment_content || ''}
              </td>
            <td>\${r.reason}</td>
            <td>\${r.created_at}</td>
            <td>\${r.resolved ? '${t.hide}' : '${t.unhide}'}</td>
            <td>
              \${r.resolved ? '' : \`<button onclick="resolveReport(\${r.id})">${t.resolve_report}</button>\`}
              <button onclick="toggleHideComment(\${r.comment_id})">${t.toggle_hide_comment}</button>
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
      
      // 切换讨论区隐藏
      async function toggleHideArea(areaKey) {
          const res = await fetch('/admin/area/' + areaKey + '/toggleHide', { method: 'POST' });
          if (res.ok) {
              showNotification('${t.notification_toggle_success}');
              await fetchExtendedInfo();
          } else {
              showNotification('${t.notification_toggle_failed}：' + (await res.text()));
          }
      }
  
      // 切换单条评论隐藏
      async function toggleHideComment(commentId) {
          const res = await fetch('/admin/comment/' + commentId + '/toggleHide', { method: 'POST' });
          if (res.ok) {
              showNotification('${t.notification_comment_hidden_toggle}');
              await fetchExtendedInfo();
          } else {
              showNotification('${t.notification_toggle_failed}：' + (await res.text()));
           }
      }
      
      // 删除讨论区
      async function deleteArea(areaKey) {
        if (!confirm('${t.delete_confirm}')) return;
            const res = await fetch('/admin/area/' + areaKey + '/delete', { method: 'POST' });
            if (res.ok) {
                showNotification('${t.notification_delete_success}');
              await fetchExtendedInfo();
          } else {
               showNotification('${t.notification_delete_failed}：' + (await res.text()));
            }
      }
        
      // 处理举报
      async function resolveReport(reportId) {
          const res = await fetch('/admin/reports/resolve/' + reportId, { method: 'POST' });
          if (res.ok) {
              showNotification('${t.notification_report_resolved}');
              await fetchExtendedInfo();
          } else {
              showNotification('${t.notification_toggle_failed}：' + (await res.text()));
          }
      }
       
     // 切换主题
     const toggleThemeBtn = document.getElementById('toggleTheme');
    toggleThemeBtn.addEventListener('click', async () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
           const res = await fetch('/setTheme', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ theme: newTheme }) });
       if (res.ok) {
           document.documentElement.setAttribute('data-theme', newTheme);
          toggleThemeBtn.textContent = newTheme === 'light' ? '${t.dark}' : '${t.light}';
       } else {
           showNotification('${t.notification_toggle_failed}：' + (await res.text()));
       }
    });

    // 切换语言
    const toggleLangBtn = document.getElementById('toggleLang');
    toggleLangBtn.addEventListener('click', async () => {
         const currentLang = document.documentElement.lang || 'zh-CN';
         const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
       const res = await fetch('/setLang', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang: newLang }) });
        if(res.ok){
            document.documentElement.lang = newLang;
            toggleLangBtn.textContent = newLang === 'zh-CN' ? 'EN' : '中文';
              location.reload();
        }  else {
            showNotification('${t.notification_toggle_failed}：' + (await res.text()));
        }
    });
    </script>
   
      </body>
      </html>
      `;
    return responseWithCors(html, {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
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

return responseWithCors(JSON.stringify({ areas, reports }), {
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
     const res = new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
    setCookie('auth', '1', res);
    return res;
} else {
    return responseWithCors(JSON.stringify({ success: false, message: '密码错误' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
}
} catch (err) {
return responseWithCors(JSON.stringify({ success: false, message: err.message }), {
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
return responseWithCors("名称或key为空", { status: 400 });
}

await env.DB.prepare(`
INSERT INTO comment_areas (name, area_key, intro) VALUES (?, ?, ?)
`).bind(name, key, intro).run();

return responseWithCors("OK", { status: 200 });
}

/** 展示单个讨论区页面（访客可见，若已隐藏则403） */
async function handleCommentAreaPage(request, env, lang, theme) {
const url = new URL(request.url);
const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\//, ''));
const t = i18n[lang];
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
<html lang="${lang}" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(area.name)}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js"></script>
  <style>
      body {
          background: var(--bg-color); color: var(--text-color); font-family: sans-serif;
            max-width: 800px; margin: 40px auto; padding: 20px;
      }
        a { color: var(--link-color); text-decoration: none; }
        a:hover { color: var(--link-hover-color); }
       .hint { color: var(--hint-color); margin-bottom: 10px; }
        .comment-list { margin-top: 20px; }
        .comment-item { margin-bottom: 15px; padding: 10px; background: var(--comment-bg-color); border-radius: 4px; }
      .reply-item { margin-left: 20px; }
        .reply-btn, .report-btn {
           margin-left: 10px; color: #999; cursor: pointer; font-size: 12px; text-decoration: underline;
         }
      .reply-box { margin-top: 5px; }
       .markdown-content { font-size: 14px; color: var(--comment-text-color); }

      .form-group textarea {
            background: var(--input-bg-color); color: var(--text-color); border: 1px solid var(--border-color); padding: 8px; width: 100%; height: 60px;
            resize: vertical; margin-bottom: 10px; font-size: 14px;
         }
       button {
        background: var(--button-bg-color); color: var(--button-text-color); border: none; padding: 8px 12px; cursor: pointer; border-radius: 3px;
        transition: background 0.3s ease, transform 0.2s ease;
       }
      button:hover {
          background: var(--button-hover-color); transform: scale(1.02);
     }
    .notification-bar {
        position: fixed; bottom: 0; left: 0; width: 100%; background: var(--notification-bg-color); color: var(--notification-text-color); padding: 10px 20px;
          display: flex; align-items: center; justify-content: space-between; font-size: 14px; z-index: 9999;
        }
        .notification-bar.hidden { display: none; }
        .close-btn { cursor: pointer; margin-left: 20px; font-weight: bold; }

        /* 隐藏评论时，仅显示占位/按钮 */
        .hidden-comment-placeholder {
         font-style: italic;
         color: #888;
        }
        .show-btn {
            color: var(--link-color);
            margin-left: 8px;
            text-decoration: underline;
            cursor: pointer;
        }
         /* 深浅色主题 */
        :root {
            --bg-color: #121212;
            --text-color: #fff;
            --link-color: #bbb;
            --link-hover-color: #fff;
            --input-bg-color: #1e1e1e;
            --border-color: #444;
            --button-bg-color: #333;
            --button-text-color: #fff;
            --button-hover-color: #444;
            --notification-bg-color: #2a2a2a;
            --notification-text-color: #fff;
            --comment-bg-color: #1e1e1e;
             --comment-text-color:#ccc;
              --hint-color:#aaa;

        }

        [data-theme="light"] {
             --bg-color: #f9f9f9;
            --text-color: #333;
            --link-color: #555;
          --link-hover-color: #000;
            --input-bg-color: #eee;
            --border-color: #ccc;
            --button-bg-color: #ddd;
            --button-text-color: #333;
            --button-hover-color: #eee;
            --notification-bg-color: #f0f0f0;
            --notification-text-color: #333;
             --comment-bg-color: #eee;
           --comment-text-color:#555;
            --hint-color:#777;
       }
       .top-actions {
           margin-bottom: 20px;
           display: flex;
           justify-content: flex-end;
        }
        .top-actions button {
            background: var(--button-bg-color); color: var(--button-text-color); border: none; padding: 8px 12px; cursor: pointer; border-radius: 3px;
            transition: background 0.3s ease, transform 0.2s ease;
            margin-left: 10px;
        }

        .top-actions button:hover {
            background: var(--button-hover-color); transform: scale(1.02);
        }
  </style>
</head>
<body>
  <div class="top-actions">
        <button id="toggleTheme">${theme === 'light' ? t.dark : t.light}</button>
        <button id="toggleLang">${lang === 'zh-CN' ? 'EN' : '中文'}</button>
    </div>
  <h1>${escapeHtml(area.name)}</h1>
  <div class="hint">${escapeHtml(area.intro || '')}</div>

    <div class="form-group">
     <textarea id="newComment" placeholder="${t.comment_placeholder}"></textarea>
     <input type="hidden" id="parentId" value="0" />
       <button id="submitBtn">${t.submit_comment_btn}</button>
        <div class="cf-challenge" data-sitekey="${env.TURNSTILE_SITEKEY || ''}" data-theme="auto"></div>
   </div>

    <div class="comment-list" id="commentList">${t.loading}</div>

<!-- 通知栏 -->
  <div id="notificationBar" class="notification-bar hidden">
   <span id="notificationText"></span>
    <span id="closeNotification" class="close-btn">×</span>
 </div>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js"></script>
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
      const commentList =  document.getElementById('commentList');
      commentList.textContent = '${t.loading}';
    const res = await fetch(location.pathname + '/comments');
    if (!res.ok) {
          commentList.textContent = '${t.notification_not_found}';
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

// 判断是否登录管理员
  const authed = document.cookie.includes('auth=1');

    // 渲染评论树
 function renderComments(comments) {
    const listEl = document.getElementById('commentList');
    listEl.innerHTML = '';
    if (comments.length === 0) {
        listEl.textContent = '${t.no_comments}';
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
  // 如果评论被隐藏
    if (comment.hidden === 1) {
     // 管理员可直接查看原文，普通用户默认折叠
      if (authed) {
        // 管理员视角: 可看到原文 + 「隐藏/恢复」操作
        div.innerHTML = \`
            <div class="markdown-content markdown-body" style="border-left:2px solid #444; padding-left:8px;">
               [${t.comment_hidden}，${t.admin_panel_title}]<br/>
              \${comment.html_content}
        </div>
            <small style="color:#777;">\${comment.created_at || ''}</small>
        <span class="reply-btn" data-comment-id="\${comment.id}">${t.reply_btn}</span>
            <span class="report-btn" onclick="reportComment(\${comment.id})">${t.report_comment}</span>
        <button onclick="toggleHideComment(\${comment.id})">
              ${t.unhide}
        </button>
        \`;
      } else {
         // 普通用户: 仅显示「此评论已被隐藏」，点击「查看」再展开
        div.innerHTML = \`
            <div class="hidden-comment-placeholder">
            ${t.comment_hidden}
           <span class="show-btn" onclick="toggleHiddenContent(this, \${comment.id})">${t.view_comment}</span>
            </div>
        <div class="hidden-content" style="display:none;">
                <div class="markdown-content markdown-body">\${comment.html_content}</div>
          <small style="color:#777;">\${comment.created_at || ''}</small>
            <span class="reply-btn" data-comment-id="\${comment.id}">${t.reply_btn}</span>
           <span class="report-btn" onclick="reportComment(\${comment.id})">${t.report_comment}</span>
          </div>
        \`;
      }
    } else {
      // 未隐藏
      div.innerHTML = \`
          <div class="markdown-content markdown-body">\${comment.html_content}</div>
           <small style="color:#777;">\${comment.created_at || ''}</small>
            <span class="reply-btn" data-comment-id="\${comment.id}">${t.reply_btn}</span>
        <span class="report-btn" onclick="reportComment(\${comment.id})">${t.report_comment}</span>
             \${authed ? \`<button onclick="toggleHideComment(\${comment.id})">${t.hide}</button>\` : ''}
      \`;
  }

    // 若有子回复
  if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach(r => {
        div.appendChild(renderCommentItem(r));
      });
    }
   return div;
}

// 前端切换「已隐藏」评论的显示/折叠
    window.toggleHiddenContent = (trigger, commentId) => {
      const wrapper = trigger.closest('.hidden-comment-placeholder').nextElementSibling;
  if (!wrapper) return;
        const isHidden = (wrapper.style.display === 'none');
       wrapper.style.display = isHidden ? 'block' : 'none';
       trigger.textContent = isHidden ? '${t.collapse_comment}' : '${t.view_comment}';
    };

    // 切换单条评论隐藏(仅管理员)
  window.toggleHideComment = async (commentId) => {
    const res = await fetch('/admin/comment/' + commentId + '/toggleHide', { method: 'POST' });
    if (res.ok) {
        showNotification('${t.notification_comment_hidden_toggle}');
        await loadComments();
    } else {
        showNotification('${t.notification_toggle_failed}：' + (await res.text()));
    }
  }

  // 启动回复
  document.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('reply-btn')) {
           const commentId = e.target.dataset.commentId;
           document.getElementById('parentId').value = commentId;
         document.getElementById('newComment').focus();
       }
  });

    // 提交评论
document.getElementById('submitBtn').addEventListener('click', async () => {
    const content = document.getElementById('newComment').value.trim();
    const parentId = document.getElementById('parentId').value || '0';
   if (!content) {
         showNotification('${t.notification_comment_missing_content}');
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
        showNotification('${t.notification_comment_submit_failed}：' + (await res.text()));
      }
});

// 举报评论
    window.reportComment = async (commentId) => {
    const reason = prompt('${t.report_comment}:');
      if (!reason) return;
     const formData = new FormData();
     formData.append('reason', reason);
     const res = await fetch(location.pathname + '/comment/' + commentId + '/report', {
       method: 'POST',
         body: formData
       });
       if (res.ok) {
        showNotification('${t.notification_report_success}');
      } else {
           showNotification('${t.notification_report_failed}：' + (await res.text()));
      }
  }
     // 切换主题
    const toggleThemeBtn = document.getElementById('toggleTheme');
    toggleThemeBtn.addEventListener('click', async () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
         const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
         const res = await fetch('/setTheme', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ theme: newTheme }) });
          if (res.ok) {
             document.documentElement.setAttribute('data-theme', newTheme);
             toggleThemeBtn.textContent = newTheme === 'light' ? '${t.dark}' : '${t.light}';
          } else {
            showNotification('${t.notification_toggle_failed}：' + (await res.text()));
          }
     });

     // 切换语言
    const toggleLangBtn = document.getElementById('toggleLang');
   toggleLangBtn.addEventListener('click', async () => {
        const currentLang = document.documentElement.lang || 'zh-CN';
       const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
         const res = await fetch('/setLang', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang: newLang }) });
        if(res.ok){
            document.documentElement.lang = newLang;
           toggleLangBtn.textContent = newLang === 'zh-CN' ? 'EN' : '中文';
             location.reload();
         } else {
           showNotification('${t.notification_toggle_failed}：' + (await res.text()));
       }
  });
   // 初始化评论框焦点
  document.getElementById('newComment').focus();
loadComments();
</script>
</body>
</html>
`;
return responseWithCors(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" }
  });
}

/** 获取评论列表 (JSON) */
async function handleGetComments(request, env) {
const url = new URL(request.url);
const areaKey = decodeURIComponent(url.pathname.replace(/^\/area\/|\/comments$/g, ''));

// 检查讨论区是否隐藏
const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
if (!area) return responseWithCors(JSON.stringify([]), { status: 200 });
if (area.hidden === 1) {
// 已隐藏 => 访客视角下, 可视为无评论
return responseWithCors(JSON.stringify([]), { status: 200 });
}

const res = await env.DB.prepare(`
SELECT id, content, parent_id, created_at, hidden
FROM comments
WHERE area_key = ?
ORDER BY id ASC
`).bind(areaKey).all();
const list = res.results || [];

// 给每条评论加上一个 html_content 字段(渲染Markdown)
list.forEach(c => {
c.html_content = parseMarkdown(c.content);
});

return responseWithCors(JSON.stringify(list), {
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
return responseWithCors("缺少评论内容", { status: 400 });
}

// Turnstile
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
  return responseWithCors("Turnstile验证失败", { status: 403 });
}
}

// 检查是否隐藏
const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
if (!area) {
return responseWithCors("讨论区不存在", { status: 404 });
}
if (area.hidden === 1) {
return responseWithCors("该讨论区不可用", { status: 403 });
}

// 插入数据库 (默认 hidden=0)
await env.DB.prepare(`
INSERT INTO comments (area_key, content, parent_id, hidden) VALUES (?, ?, ?, 0)
`).bind(areaKey, content, parentId).run();

return responseWithCors("OK", { status: 200 });
}

/** 举报评论 */
async function handleReportComment(request, env) {
const match = request.url.match(/\/comment\/(\d+)\/report$/);
if (!match) {
return responseWithCors("Invalid", { status: 400 });
}
const commentId = parseInt(match[1], 10);
const formData = await request.formData();
const reason = formData.get('reason') || '';

if (!reason) {
return responseWithCors("缺少举报理由", { status: 400 });
}

// 检查评论是否存在
const comment = await env.DB.prepare("SELECT id FROM comments WHERE id=?").bind(commentId).first();
if (!comment) {
return responseWithCors("该评论不存在", { status: 404 });
}

// 写入reports
await env.DB.prepare("INSERT INTO reports (comment_id, reason) VALUES (?, ?)").bind(commentId, reason).run();
return responseWithCors("OK", { status: 200 });
}

/** 删除讨论区 (管理员) */
async function handleDeleteArea(areaKeyEncoded, request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
  return responseWithCors("Unauthorized", { status: 401 });
  }
  const areaKey = decodeURIComponent(areaKeyEncoded);
  
  // 先检查是否存在
  const area = await env.DB.prepare("SELECT id FROM comment_areas WHERE area_key=?").bind(areaKey).first();
  if (!area) {
  return responseWithCors("讨论区不存在", { status: 404 });
  }
  
  // 删除操作：先删comments，再删自己
  await env.DB.prepare("DELETE FROM comments WHERE area_key=?").bind(areaKey).run();
  await env.DB.prepare("DELETE FROM comment_areas WHERE area_key=?").bind(areaKey).run();
  return responseWithCors("OK", { status: 200 });
  }
  
  /** 切换讨论区隐藏状态 (管理员) */
  async function handleToggleHideArea(areaKeyEncoded, request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
  return responseWithCors("Unauthorized", { status: 401 });
  }
  const areaKey = decodeURIComponent(areaKeyEncoded);
  
  const area = await env.DB.prepare("SELECT hidden FROM comment_areas WHERE area_key=?").bind(areaKey).first();
  if (!area) {
  return responseWithCors("讨论区不存在", { status: 404 });
  }
  const newHidden = area.hidden === 1 ? 0 : 1;
  await env.DB.prepare("UPDATE comment_areas SET hidden=? WHERE area_key=?").bind(newHidden, areaKey).run();
  return responseWithCors("OK", { status: 200 });
  }
  
  /** 切换单条评论隐藏状态 (管理员) */
  async function handleToggleHideComment(commentId, request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
  return responseWithCors("Unauthorized", { status: 401 });
  }
  // 查询是否存在
  const comment = await env.DB.prepare("SELECT hidden FROM comments WHERE id=?").bind(commentId).first();
  if (!comment) {
  return responseWithCors("该评论不存在", { status: 404 });
  }
  const newHidden = comment.hidden === 1 ? 0 : 1;
  await env.DB.prepare("UPDATE comments SET hidden=? WHERE id=?").bind(newHidden, commentId).run();
  return responseWithCors("OK", { status: 200 });
  }
  
  /** 处理举报 -> 标记已处理 */
  async function handleResolveReport(reportId, request, env) {
  const cookie = parseCookie(request.headers.get("Cookie") || "");
  if (cookie.auth !== "1") {
  return responseWithCors("Unauthorized", { status: 401 });
  }
  // 查询是否存在
  const rep = await env.DB.prepare("SELECT id FROM reports WHERE id=?").bind(reportId).first();
  if (!rep) {
  return responseWithCors("该举报不存在", { status: 404 });
  }
  await env.DB.prepare("UPDATE reports SET resolved=1 WHERE id=?").bind(reportId).run();
  return responseWithCors("OK", { status: 200 });
  }
  
  /** 处理切换语言 */
  async function handleSetLang(request, env) {
  try {
      const data = await request.json();
      const lang = data.lang || 'en';
       const res = responseWithCors(JSON.stringify({ success: true }), {
          headers: {'Content-Type': 'application/json;charset=UTF-8'}
      });
      setCookie('lang', lang, res);
      return res;
    } catch (err) {
      return responseWithCors(JSON.stringify({ success: false, message: err.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      });
    }
  }
  
  /** 处理切换主题 */
  async function handleSetTheme(request, env) {
  try {
      const data = await request.json();
    const theme = data.theme || 'dark';
     const res = responseWithCors(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      });
    setCookie('theme', theme, res);
      return res;
  } catch (err) {
      return responseWithCors(JSON.stringify({ success: false, message: err.message }), {
        status: 400,
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      });
  }
  }
