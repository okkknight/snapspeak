# snapspeak

snapspeak 是一个移动端优先的拍照学英语应用。拍照或上传图片后，可以按模式和难度获取简短英语表达，并播放英文语音。前端使用 React/Vite，服务端通过本机 Codex CLI 生成内容。

## 本地运行

需要 Node.js、npm；使用真实生成功能时，服务端还需要可用的 Codex CLI 登录状态。

```bash
npm install
npm run dev:server
```

在另一个终端运行 `npm run dev` 启动前端。产品背景见 [项目上下文](PROJECT_CONTEXT.md)，部署结构见 [VPS 文档](docs/SNAPSPEAK_VPS_DEPLOYMENT.md)。

服务端 `/api/generate` 当前没有内置认证或限流。部署到公网前，应在网关增加访问控制和调用限制，避免他人消耗服务器的 AI 配额。

## 许可

应用代码采用 [MIT 许可证](LICENSE)。第三方依赖及其素材遵循各自的许可证。
