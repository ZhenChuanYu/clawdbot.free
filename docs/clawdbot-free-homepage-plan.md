# clawdbot.free 首页重构计划

## 一、站点定位

| 项目 | 说明 |
|------|------|
| 域名 | clawdbot.free |
| 品牌 | Clawd Bot |
| 服务 | Clawd Bot 的介绍与使用教程 |

## 二、首页需回答的核心问题（SEO + 用户意图）

1. **What's so special about Clawd Bot?** — 产品差异化与亮点
2. **What is a Clawd Bot?** — 产品定义与能力
3. **Is Clawdbot free?** — 是否免费（开源/自托管）
4. **Is Clawdbot safe?** — 隐私与安全（数据本地、权限模型）
5. **Clawdbot docs** — 官方文档入口（docs.clawd.bot）
6. **Clawdbot setup** — 配置与向导（Wizard、Setup）
7. **Clawdbot install** — 安装方式（一行命令、Docker、npm 等）
8. **Clawdbot app** — 应用形态（CLI、macOS/iOS/Android、WebChat、Dashboard）

## 三、内容与结构规划（新首页）

基于联网检索与 docs.clawd.bot 信息，建议新首页结构：

1. **Hero**
   - 主标题：Clawd Bot / 品牌 Slogan（如 "The AI that actually does things"）
   - 副标题/一句话：开源、本地运行的个人 AI 助手，支持 WhatsApp / Telegram / Discord 等
   - CTA：查看文档、快速安装

2. **What is Clawd Bot?**
   - 定义：自托管、本地运行的 AI 助手，可执行真实任务（邮件、日历、航班值机、浏览等）
   - 与普通聊天机器人的区别：真正执行操作，而非仅给建议

3. **What's so special?**
   - 隐私优先（数据在本地）
   - 多平台（WhatsApp、Telegram、Discord、Slack、Signal、iMessage 等）
   - 真实自动化（浏览器、Shell、文件、表单等）
   - 可扩展（技能/插件，如 ClawdHub）

4. **Is Clawd Bot free?**
   - 开源（MIT）、自托管免费
   - 云模型 API 按使用付费；本地模型完全免费

5. **Is Clawd Bot safe?**
   - 数据留在本机；官方文档有 Security 章节
   - 执行前可配置权限与审批（Sandbox / Tool Policy / Elevated）

6. **Clawdbot install & setup**
   - 一行安装命令（如 `npm install -g moltbot@latest`）+ 指向 docs 的「完整安装与更新」
   - 简要步骤：安装 → onboard/install-daemon → channels login（如 WhatsApp 扫码）→ 使用
   - 链接：docs.clawd.bot 的 Getting started、Wizard、Setup、Install

7. **Clawdbot docs**
   - 文档入口卡片/链接：docs.clawd.bot
   - 分类入口：入门、安装与更新、CLI、安全、各平台（macOS/Windows/Linux）、频道（WhatsApp/Telegram 等）

8. **Clawdbot app**
   - CLI（moltbot gateway / onboard / channels 等）
   - Web：Dashboard / Control UI（如 http://127.0.0.1:18789/）、WebChat
   - 伴侣应用：macOS 应用、iOS/Android 节点（通过 Gateway 配对）

9. **Footer**
   - 文档、GitHub、Discord、ClawdHub 等（与现有 Footer 或 UI 风格一致即可）

## 四、UI 设计约束（仅参考 clawd-bot-ui-style.md）

- **风格**：深色主题、现代简约；品牌标识为龙虾 🦞
- **颜色**：背景 `#050810` / `#0a0f1a` / `#111827`；主色珊瑚红 `#ff4d4d`、辅助青色 `#00e5cc`；文案主色 `#f0f4ff`，次要 `#8892b0`
- **字体**：标题用 Clash Display（或项目已有 display 字体），正文 Satoshi / system-ui，代码用等宽字体
- **布局**：卡片式区块、圆角按钮、深色代码块与复制按钮；链接/按钮悬停用珊瑚红或青色发光
- **实现**：使用现有 CSS 变量（--bg-deep, --coral-bright, --cyan-bright 等），与 `clawd-bot-ui-style.md` 保持一致

## 五、技术实现要点

- **新首页**：重新制作首页内容，不沿用当前首页的 Hero/Features/UseCases 等旧模块。
- **可复用**：ClawdBotLayout（含 meta、canonical、hreflang）、ClawdBotHeader、ClawdBotFooter；样式沿用 `/styles/clawd-bot.css` 及 layout 内全局样式。
- **新组件**：为上述 1～8 节新建 Astro 组件（如 HomeHero、HomeWhatIs、HomeWhySpecial、HomeFreeSafe、HomeInstallSetup、HomeDocs、HomeApp 等），在 `src/pages/index.astro` 及各语言首页中按顺序挂载。
- **多语言**：新组件需支持 locale，文案走多语言（与现有 i18n 或每组件内 content 对象一致）。
- **域名与品牌**：站点内链接与文案统一为「Clawd Bot」；正式上线时 SEO 与 canonical 需对应 clawdbot.free。

## 六、任务拆解（执行顺序）

1. **确认配置与域名**  
   - 若当前项目仍为 clawd-bot.com，在 clawdbot.free 分支上确认 BASE_URL / 站点标题等为 clawdbot.free。

2. **新建首页区块组件**  
   - HomeHero  
   - HomeWhatIs  
   - HomeWhySpecial  
   - HomeFreeSafe（免费 + 安全）  
   - HomeInstallSetup  
   - HomeDocs  
   - HomeApp  

3. **在 index.astro 中组装**  
   - 仅保留 Layout + Header + Footer，main 内按顺序引入上述新组件并传入 locale。

4. **多语言**  
   - 为各新组件添加 11 种语言的文案（en, zh, zh-tw, ja, ko, es, de, fr, pt, ru, hi），与现有首页语言路由一致。

5. **同步各语言首页**  
   - 对 zh、zh-tw、ja、ko、es、de、fr、pt、ru、hi 的 index.astro 做与英文首页相同的组件组装与 props。

6. **样式与响应式**  
   - 严格按 clawd-bot-ui-style.md 的变量与组件规范调整间距、圆角、按钮与链接样式；保证移动端可读与点击区域。

7. **链接与 SEO**  
   - 所有「文档」「安装」「安全」等链接指向 docs.clawd.bot 对应页面；检查 title/description/canonical/hreflang 是否适配 clawdbot.free。

8. **自测与收尾**  
   - 本地预览所有语言首页；检查无控制台报错、无错链；再提交 IndexNow（如需要）。

---

**下一步**：按上述任务 1～8 依次实现；优先完成 1、2、3，再补 4、5、6、7、8。
