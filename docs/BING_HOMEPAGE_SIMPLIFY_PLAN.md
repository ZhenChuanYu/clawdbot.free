# Bing 友好型首页简化方案

## 背景

- Bing 更偏好**纯文本、结构清晰、HTML 直出**的页面。
- Bing 对 JS/富交互、首屏无长文本、landing 型页面不友好。
- 当前首页：多区块（Hero / WhatIs / WhySpecial / FreeSafe / InstallSetup / Docs / App），偏视觉与 CTA，文本被拆散，不利于 Bing 抓取与「知识源」判定。

---

## 方案一：首页内增加「长文本区」（推荐，改动最小）

在现有首页 **main 末尾**（Footer 前）增加一个**纯文本区块**，满足 Bing：

- **单一大区块**，用 `<article>` 或 `<section>` 包住。
- **结构**：一个 H1（与 title 一致）+ 多个 H2（What is Clawd Bot / Why special / Is it free / Is it safe / Install & setup / Docs / App），每段下 2–4 段纯段落。
- **字数**：整页合计约 800–1500 英文词（或各语言等效），以「问题→答案」形式写。
- **无卡片、无复杂布局**：仅标题 + 段落 + 少量列表 + 链接。
- **可选**：该区块用 `id="main-content"`，便于 Bing 识别主体内容。

**优点**：不删现有模块，不破坏现有体验，仅追加 Bing 可读的连续文本。  
**缺点**：页面更长，需注意与现有 H1 不冲突（可保留顶部 Hero 的 H1，长文本区用 H2 起，或整页只保留一个 H1 在长文本区）。

---

## 方案二：首页改为「单页长文」形态（Bing 最优，改动大）

把首页改成**一页一主题**的文档式长文：

- **唯一 H1**：如 "Clawd Bot: Personal AI Assistant That Actually Does Things"。
- **H2**：What is Clawd Bot、What's so special、Is Clawd Bot free、Is Clawd Bot safe、Install & setup、Docs、App。
- 每节下 **2–4 段纯文本** + 少量 `<ul>` 或有序列表，链接嵌在段落中。
- **弱化或移除**：大 Hero、多卡片、多 CTA 区块；保留简洁 Header + Footer。
- **字数**：整页 1000–2000 词（英文），其他语言等效。

**优点**：最符合 Bing「重文本、像文章」的偏好。  
**缺点**：首页视觉冲击力下降，需产品侧接受。

---

## 方案三：独立文本页 + 首页留精简入口（兼顾体验与 Bing）

- **新增独立页**：如 `/what-is-clawd-bot`（或 `/about`），**纯文本**：H1 + 多 H2 + 长段落，约 1500–2500 词，回答「What / Why / Free / Safe / Install / Docs / App」。
- **首页**：保持现有区块，但在首屏或 Hero 下增加一段 2–3 句的**纯文本摘要** + 链接「完整介绍：/what-is-clawd-bot」。
- **sitemap / 内链**：新页加入 sitemap，首页、Footer 链过去。

**优点**：首页体验不变，Bing 有专门的高质量文本页可抓。  
**缺点**：多维护一页及多语言版本。

---

## 方案四：noscript 补强（与以上任一方案同用）

无论选哪一方案，都建议在 **Layout 或 index** 的 `<body>` 内靠前位置加 `<noscript>`：

- 内容为**当前页语义摘要**：H1 + 2–4 个 H2 + 若干段 + 关键链接（文档、安装、GitHub 等）。
- 约 250–500 英文词，仅用语义化 HTML（h1/h2/p/ul/li/a），无 script/style。
- 与可见页面主题一致，不堆砌关键词。

这样即使 Bing 不执行 JS，也能拿到完整文本。

---

## 建议优先级

| 优先级 | 动作 |
|--------|------|
| 1 | **方案四**：先做 noscript，成本低、立刻对 Bing 有利。 |
| 2 | **方案一**：在首页底部加「长文本区」，不砍现有模块。 |
| 3 | 若 Bing 仍不理想，再考虑 **方案三**（独立文本页）或 **方案二**（首页改长文）。 |

---

## 实施要点（方案一 + 四）

1. **noscript**：在 `ClawdBotLayout.astro` 或 `index.astro` 的 `<main>` 前插入 `<noscript>...</noscript>`，文案可从现有 i18n 抽一段摘要或单独建 key。
2. **长文本区组件**：新建 `HomeBingText.astro`，按 locale 输出 H2 + 段落 + 列表 + 链接，样式极简（标题 + 段落间距即可）。
3. **H1 唯一性**：若保留 Hero 的 H1，长文本区只用 H2；或 Hero 改为用 `<p>`/视觉标题，H1 只放在长文本区。
4. **多语言**：`HomeBingText` 与 noscript 均走现有 clawdbot-home i18n 或单独 key，与各语言首页一致。

---

## 参考

- `SEO/Base-Bing页面文本内容指南1`：Bing 偏好纯文本、结构清晰、可当知识源。
- `SEO/Base-配置noscript内容指南`：noscript 结构、字数、语义一致性。
