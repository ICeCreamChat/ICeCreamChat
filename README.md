# 🍦 ICeCreamChat (Ice-Core)

> **探索数学与逻辑的未知之地** > 一个拥有极致“玻璃拟态”美学、集成 Three.js 3D 粒子特效与 DeepSeek 深度思考能力的现代化 AI 聊天室。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![DeepSeek](https://img.shields.io/badge/AI-DeepSeek-blueviolet)

## ✨ 项目亮点 (Features)

### 🎨 极致 UI/UX 设计
- **沉浸式玻璃拟态 (Glassmorphism)**：全站采用磨砂玻璃质感设计，配合动态噪点纹理，提供高级的视觉体验。
- **日夜自动切换**：
  - 基于**北京时间**（06:00 - 19:00）自动切换浅色/深色主题。
  - 支持手动一键切换，移动端状态栏颜色自动同步（沉浸式体验）。
- **响应式布局**：完美适配桌面端、平板及移动端（解决了软键盘遮挡、背景混搭等痛点）。

### 🧠 强大的 AI 内核
- **DeepSeek 驱动**：后端代理转发请求，保护 API Key 安全，提供深度数学与逻辑推理能力。
- **Ghost 幽灵补全**：独创的输入框 AI 联想功能。当你输入时，AI 会预判你的意图并以淡色文字展示补全建议，按 `Tab` 或 `→` 键即可采纳。
- **LaTeX 数学公式渲染**：完美支持数学公式显示（使用 KaTeX），自动解析 `$e=mc^2$` 或 `$$\sum$$`。

### ⚡ 交互与特效
- **3D 数学粒子背景**：基于 Three.js 构建的漂浮数学符号空间，随鼠标移动产生视差效果。
- **点击爆破特效**：鼠标点击处会产生数学符号爆炸效果。
- **语音交互**：
  - **STT**: 支持语音转文字输入。
  - **TTS**: AI 回复后可自动朗读（支持 Azure/Edge 风格语音）。

---

## 🛠️ 技术栈 (Tech Stack)

- **前端**: HTML5, CSS3 (Variables, Flexbox, Glassmorphism), Vanilla JavaScript (ES6+).
- **3D 引擎**: Three.js.
- **渲染库**: KaTeX (数学公式), Marked.js (Markdown 解析).
- **后端**: Node.js, Express.
- **AI 接口**: DeepSeek API (通过后端代理).
- **部署环境**: Node.js >= 18.0.0 (支持 Docker/宝塔面板/Vercel).
确保你的服务器或本地环境已安装 [Node.js](https://nodejs.org/) (建议 v18 或更高版本)。
