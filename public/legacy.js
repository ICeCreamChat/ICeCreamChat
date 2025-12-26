/* public/legacy.js - 核心功能兼容版 */

(function() {
    console.log("正在运行兼容模式 (Legacy Mode)...");

    var input = document.getElementById('chat-input');
    var sendBtn = document.getElementById('send-btn');
    var messagesContainer = document.getElementById('messages');
    var loadingDiv = document.getElementById('loading');
    
    // 强制显示发送按钮（因为 CSS 可能隐藏了图标）
    sendBtn.style.display = 'block';
    sendBtn.innerText = '发送';

    // 绑定事件
    sendBtn.onclick = sendMessage;
    input.onkeypress = function(e) {
        if (e.keyCode === 13) sendMessage();
    };

    function sendMessage() {
        var text = input.value;
        if (!text) return;

        // 1. 显示用户消息
        appendMessage(text, 'user');
        input.value = '';
        
        // 2. 显示加载中
        loadingDiv.style.display = 'block';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 3. 发送请求 (使用老式 XMLHttpRequest)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/chat", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                loadingDiv.style.display = 'none';
                if (xhr.status === 200) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        // 获取回复内容
                        var reply = response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;
                        if (reply) {
                            appendMessage(reply, 'bot');
                        } else {
                            appendMessage("错误：无法解析服务器响应", 'bot');
                        }
                    } catch (e) {
                        appendMessage("数据解析错误", 'bot');
                    }
                } else {
                    appendMessage("连接服务器失败 (状态码: " + xhr.status + ")", 'bot');
                }
            }
        };

        // 构造简单的历史记录上下文 (只发最后一条，为了省事且兼容)
        var payload = JSON.stringify({
            messages: [{ role: "user", content: text }]
        });
        
        xhr.send(payload);
    }

    function appendMessage(text, role) {
        var msgDiv = document.createElement('div');
        msgDiv.className = 'message ' + role;
        
        var contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // 简单处理换行，IE 不支持 marked.js 复杂的渲染，直接显示文本
        contentDiv.innerText = text; 
        
        msgDiv.appendChild(contentDiv);
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 禁用不兼容的功能
    var style = document.createElement('style');
    style.innerHTML = '.glass-snowflake { display: none; }';
    document.head.appendChild(style);

})();