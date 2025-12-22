// server.js
// 优化版 Node.js Express 服务器

// 1. 最优先引入 dotenv 以加载环境变量
require('dotenv').config();

const express = require('express');
const path = require('path');
const compression = require('compression'); // 引入压缩中间件
const app = express();

// 2. 启用 Gzip 压缩 (大幅提升加载速度)
app.use(compression());

// 3. 启用 JSON 解析
app.use(express.json());

// 4. 托管静态文件 (前端网页)
// maxAge: 缓存 1 天，提高重复访问速度
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d' 
}));

// 5. 后端 API 接口
app.post('/api/chat', async (req, res) => {
    try {
        // 修改点：从环境变量中读取 Key，不再硬编码
        const API_KEY = process.env.DEEPSEEK_API_KEY;
        
        if (!API_KEY) {
            throw new Error('服务器未配置 API Key，请检查 .env 文件');
        }

        // 使用之前的 API 接口地址
        const response = await fetch('https://edge.tb.api.mkeai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        // 检查上游 API 是否报错
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API 请求失败: ${response.status} ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

// 6. 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});