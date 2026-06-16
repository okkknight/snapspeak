# snapspeak 产品设计文档

## 1. 产品一句话

**拍一张照片，把现实场景变成英语表达练习。**

用户打开手机网页后，像使用相机 App 一样拍照。AI 根据照片内容，用英文输出描述、介绍、评论或练习任务，并支持语音播放和难度切换。

MVP 阶段可先用本地 mock 内容模拟 AI 输出，不接真实视觉模型 API。

---

## 2. 产品目标

### 核心目标

让用户把身边真实场景转化为可听、可读、可跟读的英文表达。

### 不做什么

MVP 阶段暂时不做：

- 实时摄像头连续识别
- 长时间语音对话
- 用户登录
- 学习记录系统
- 跟读评分
- iOS 原生 App

第一版只验证一个闭环：

> 拍照 → AI 输出英文 → 播放语音 → 切换模式/难度重新生成

---

## 3. 目标平台

### 第一阶段

**手机网页**

原因：

- 拍照链路最自然
- 开发和验证最快
- 可快速部署和分享
- 后续可演进为 PWA 或 iOS App

### 设计约束

第一版只做手机端体验，不做桌面端布局。

具体要求：

- 视觉稿、交互稿、前端实现都以 iPhone 尺寸为基准
- 页面只需要适配手机浏览器，不需要为大屏设计额外信息层级
- 桌面端访问时可以保持基础可用，但不单独设计桌面版界面
- 后续所有新增页面和组件也默认按手机端标准设计

### 后续方向

如果体验成立，可以考虑：

- PWA：添加到手机主屏幕
- iOS App：使用 Swift 或 React Native / Expo 实现更好的相机和语音体验

---

## 4. 核心使用流程

```text
打开页面
↓
默认进入相机模式
↓
用户直接拍照 / 上传照片
↓
AI 按默认模式 Describe + Normal 输出英文
↓
用户播放语音
↓
用户可滑动结果卡片切换模式
↓
同一张照片按新模式重新生成
↓
用户可切换难度
↓
同一张照片按新难度重新生成
```

---

## 5. 页面状态

产品主要有两个状态：

1. 相机模式
2. 结果模式

---

## 6. 状态一：相机模式

### 页面感觉

初始页面应该像一个极简相机 App，而不是表单工具。

### 页面结构

```text
┌────────────────────────┐
│                        │
│      Camera Preview    │
│                        │
│                        │
│                        │
├────────────────────────┤
│  Describe · Normal     │
│                        │
│        ○               │
│      拍照按钮           │
│                        │
│  Upload     Settings   │
└────────────────────────┘
```

### 上半部分

- 相机实时预览
- 占据页面主要空间
- 默认使用后置摄像头

### 下半部分

只放核心控制项：

- 当前模式：默认 Describe
- 当前难度：默认 Normal
- 拍照按钮
- 上传照片入口
- 设置入口

### 默认状态

```text
currentMode = Describe
currentLevel = Normal
currentImage = null
```

---

## 7. 状态二：结果模式

用户点击拍照后，页面进入结果模式。

### 页面结构

```text
┌────────────────────────┐
│                        │
│     Captured Photo     │
│                        │
├────────────────────────┤
│  Describe · Normal     │
│                        │
│  I can see a coffee    │
│  mug on the desk.      │
│                        │
│  Useful words          │
│  coffee mug · desk     │
│                        │
│  ▶ Play   中文解释      │
│                        │
│  ← Retake              │
└────────────────────────┘
```

### 上半部分

- 显示刚拍到的照片
- 图片可预览
- 保持相机产品的视觉感

### 下半部分

使用结果卡片 / Bottom Sheet：

- 当前模式和难度
- 英文输出
- Useful words
- 播放语音按钮
- 中文解释折叠按钮
- 重新拍照按钮

---

## 8. 结果卡片交互

### 模式切换

下半部分结果卡片支持横向滑动切换模式：

```text
[Describe] → [Explain] → [Comment] → [Practice]
```

交互规则：

```text
拍照后
↓
默认生成 Describe + Normal
↓
用户滑动到 Explain
↓
同一张照片生成 Explain + Normal
↓
用户滑动到 Comment
↓
同一张照片生成 Comment + Normal
```

### 缓存规则

同一张照片下，已经生成过的结果可以缓存。

缓存 Key：

```text
photoId + mode + level
```

这样用户在不同模式和难度之间切换时，不需要重复请求已经生成过的内容。

---

## 9. 难度切换

### 难度等级

支持三级难度：

```text
Easy / Normal / Advanced
```

默认：

```text
Normal
```

### 切换方式

难度不使用滑动，避免和模式横滑冲突。

建议使用：

```text
Normal ▼
```

或：

```text
Easy · Normal · Advanced
```

### 切换规则

```text
当前照片 + 当前模式 + 新难度 → 重新生成
```

---

## 10. 四种输出模式

### 10.1 Describe 描述模式

目标：把照片里的内容说成英文。

适合练习：

- 场景描述
- 物品名称
- 方位表达
- There is / I can see

示例：

```text
I can see a coffee mug on the desk.
There is a laptop next to it.

Useful words:
coffee mug · desk · next to
```

---

### 10.2 Explain 介绍模式

目标：介绍照片里的主要物品或场景。

适合练习：

- 物品介绍
- 用途表达
- 功能解释
- 日常词汇

示例：

```text
This is a coffee mug.
People usually use it for hot drinks like coffee or tea.
It often has a handle, so it is easy to hold.

Useful words:
coffee mug · hot drinks · handle
```

---

### 10.3 Comment 评论模式

目标：像真人一样对照片发表一点自然看法。

适合练习：

- 自然口语
- 观点表达
- 感受描述
- 场景判断

示例：

```text
This scene feels calm and practical.
It looks like a comfortable place to work or study.

Useful words:
calm · practical · comfortable
```

---

### 10.4 Practice 练习模式

目标：引导用户自己开口说。

适合练习：

- 主动输出
- 模仿造句
- 一句话描述
- 观点表达

示例：

```text
Try to describe this photo in one sentence.
Example: I can see a coffee mug on the desk.

Useful words:
describe · in one sentence · on the desk
```

---

## 11. 三档难度定义

### Easy

特点：

- 句子短
- 词汇简单
- 适合初学者
- 容易跟读

规则：

```text
1-2 个短句
每句 5-8 个词
尽量使用简单结构
```

示例：

```text
I can see a cup on the desk.
It is next to a laptop.
```

---

### Normal

特点：

- 默认难度
- 日常口语
- 句子自然
- 不幼稚，也不复杂

规则：

```text
2-3 个自然短句
每句 8-14 个词
加入简单细节和方位表达
```

示例：

```text
I can see a coffee mug on the desk.
There is a laptop next to it.
```

---

### Advanced

特点：

- 句子更长
- 表达更自然
- 可以加入氛围、观点或上下文
- 适合进阶用户

规则：

```text
2-3 个更丰富的句子
每句 10-18 个词
可以使用更自然的短语和复合表达
```

示例：

```text
A coffee mug is sitting on the desk beside a laptop.
The scene looks like a casual workspace.
```

---

## 12. 输出结构

AI 每次返回统一 JSON：

```json
{
  "title": "Describe",
  "english": [
    "I can see a coffee mug on the desk.",
    "There is a laptop next to it."
  ],
  "words": [
    "coffee mug",
    "desk",
    "next to"
  ],
  "chinese": "我能看到桌上有一个咖啡杯。旁边有一台笔记本电脑。",
  "speakText": "I can see a coffee mug on the desk. There is a laptop next to it."
}
```

### 字段说明

| 字段 | 说明 |
|---|---|
| title | 当前输出模式 |
| english | 展示给用户的英文句子 |
| words | 3 个关键词或短语 |
| chinese | 中文解释，默认折叠 |
| speakText | 用于 TTS 播放的英文文本 |

---

## 13. 语音策略

### MVP 语音方案

第一版使用浏览器 TTS。

```js
speechSynthesis.speak(new SpeechSynthesisUtterance(speakText))
```

### 交互规则

- 生成后可自动播放一次，也可以先只显示播放按钮
- 页面必须提供 Replay / Play 按钮
- 只朗读英文内容
- 不朗读中文解释
- 不朗读 Useful words，除非后续单独做词汇播放

建议 MVP：

```text
默认不自动播放
用户点击 Play 后播放
```

这样更安静，不打扰用户。

---

## 14. 中文解释策略

中文解释支持，但默认折叠。

原因：

- 产品核心是练英语
- 中文不能抢占主要注意力
- 初学者需要中文辅助理解

展示方式：

```text
[中文解释 ▼]
```

点击后展开。

---

## 15. Prompt 规则

```text
You are a photo-based English coach.

The user will provide one image.
Generate English learning content based on:
- mode: Describe / Explain / Comment / Practice
- level: Easy / Normal / Advanced

Return JSON only:
{
  "title": string,
  "english": string[],
  "words": string[],
  "chinese": string,
  "speakText": string
}

Rules:
- English first.
- Keep the output short and useful for speaking practice.
- Do not mention uncertain details as facts.
- If the image is unclear, say what seems visible.
- speakText should include only the English sentences, not the word list.
- words should contain 3 useful words or phrases.
- Chinese should briefly explain the English content.

Level rules:
Easy:
- 1-2 short sentences.
- Simple words.
- Good for beginners.

Normal:
- 2-3 natural spoken sentences.
- Daily English.
- Default level.

Advanced:
- 2-3 richer sentences.
- More natural expressions.
- Can include atmosphere, opinion, or context.

Mode rules:
Describe:
- Describe what is visible in the photo.
- Focus on objects, positions, and scene.

Explain:
- Pick the main object or scene.
- Explain what it is and how people use it.

Comment:
- Give a natural opinion about the scene.
- Sound like a real person, not an encyclopedia.

Practice:
- Give the user a speaking task.
- Provide one example answer.
```

---

## 16. MVP 技术建议

### 前端

```text
React + Vite + Tailwind
```

### 图片输入

手机网页使用：

```html
<input type="file" accept="image/*" capture="environment" />
```

同时支持：

- 拍照
- 从相册上传

### AI

MVP 阶段先使用本地 mock 数据或静态映射结果，后续再接支持图片理解的视觉模型 API。

### 语音

MVP 使用 Web Speech API。

后续可接：

- OpenAI TTS
- ElevenLabs
- 其他更自然的 TTS 服务

### 部署

可选：

- Vercel
- Cloudflare Pages
- ShipNow
- 自有 VPS

---

## 17. MVP 功能清单

### 必须做

- 手机网页
- 相机/上传图片
- 默认 Describe + Normal
- 拍照后展示照片
- 英文输出内容（MVP 可用 mock 数据）
- Useful words
- 中文解释折叠
- 播放语音
- 横向滑动切换四种模式
- 切换三级难度
- 同图重新生成
- 已生成结果缓存
- 重新拍照

### 暂时不做

- 登录
- 历史记录
- 跟读评分
- 语音纠错
- 连续摄像头识别
- iOS 原生 App
- 支付系统
- 社区分享

---

## 18. 验收标准

第一版只看这些标准：

1. 用户打开手机网页后，能直接拍照。
2. 默认模式是 Describe，默认难度是 Normal。
3. 拍照后能看到照片和英文输出。
4. 英文输出不超过 3 句。
5. 用户可以播放英文语音。
6. 用户可以展开中文解释。
7. 用户可以横向滑动切换 Describe / Explain / Comment / Practice。
8. 用户可以切换 Easy / Normal / Advanced。
9. 同一张照片切换模式或难度时，不需要重新拍照。
10. 用户可以重新拍照开始下一轮。

---

## 19. 项目定名

项目名称统一使用：

> snapspeak

这一版不再保留其他候选名，后续文档、页面标题、变量命名和展示文案都以 `snapspeak` 为准。

---

## 20. 当前版本结论

当前 MVP 的核心不是“AI 摄像头助手”，而是：

> 一个手机相机式英语学习工具：拍照后，把现实场景转化成短小、自然、可播放、可切换难度的英文表达练习。

第一版应保持轻量，优先验证：

> 用户是否愿意反复拍身边的东西，用英文听一遍、读一遍、换一种表达方式再听一遍。
