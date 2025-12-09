// server.js
// 优化版 Node.js Express 服务器111

const express = require('express');
const path = require('path');
const compression = require('compression'); // 引入压缩中间件
const app = express();

// 1. 启用 Gzip 压缩 (大幅提升加载速度)
app.use(compression());

// 2. 启用 JSON 解析
app.use(express.json());

// 3. 托管静态文件 (前端网页)
// maxAge: 缓存 1 天，提高重复访问速度
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d' 
}));

// 4. 后端 API 接口
app.post('/api/chat', async (req, res) => {
    try {
        // const API_KEY = process.env.DEEPSEEK_KEY; 
        const API_KEY = "sk-t741Aph1aaXnU9ZUhGV1NjlYbNBGRSuLw23AYgaLGTqmRRz5";
        
        if (!API_KEY) {
            throw new Error('服务器未配置 API Key');
        }

        const response = await fetch('https://edge.tb.api.mkeai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

// 5. 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});