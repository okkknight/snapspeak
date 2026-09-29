# snapspeak

拍一张照片，把眼前的真实场景变成一段可听、可读、可跟读的英语。

snapspeak 是一个手机端的照片英语练习原型。它从相机页出发：拍照或上传图片，AI 根据画面生成英文内容，你可以播放语音，再用不同模式和难度让同一张照片变成新的练习。它要验证的是一条很短的学习闭环：**拍照 → 英文输出 → 听一听 → 换一种方式再练。**

**[拿照片试试 →](https://boringmax.com/snapspeak/)**

拍照或上传后，可以在同一张图上切换 Describe、Explain、Comment 和 Practice；英文可以直接播放，中文解释默认收起，需要时再打开。

## 四种模式

| 模式 | 得到什么 |
| --- | --- |
| Describe | 把画面说出来 |
| Explain | 讲清它是什么、怎么用 |
| Comment | 像聊天一样说一句感受 |
| Practice | 给自己一道开口题 |

同一张照片可以换模式，也可以调 Easy、Normal、Advanced 三档难度。现在它专注在“拍一张、学几句、听一听”这一件事。

## 本地运行

需要 Node.js、npm 和已登录的 Codex CLI。安装依赖后，分别启动服务端和前端：

```bash
npm install
npm run dev:server
```

另开一个终端：

```bash
npm run dev
```

服务端接收照片，调用本机 Codex CLI 生成内容；前端由 React/Vite 构建。应用代码在 [`src/`](src/)，生成服务在 [`server/`](server/)。想改交互或部署，再看 [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) 和 [VPS 文档](docs/SNAPSPEAK_VPS_DEPLOYMENT.md)。

当前 `/api/generate` 没有内置认证或限流。自行部署到公网时，需要在网关加访问控制和调用限制，避免他人消耗你的 AI 配额。

## 许可

应用代码采用 [MIT 许可证](LICENSE)。第三方依赖及素材遵循各自的许可证。
