# 本站框架与 SEO 要点（按现有实现记录）

便于按现有结构扩展：加页面、加语言、改首页区块、改品牌/域名。

---

## 1. 目录与职责

| 路径 | 作用 |
|------|------|
| `src/layouts/BaseLayout.astro` | 全站壳：meta、canonical、hreflang、OG/Twitter、JSON-LD、品牌与域名 |
| `src/pages/index.astro` | 英文首页（locale 写死 `en`，path `""`） |
| `src/pages/zh/index.astro` 等 | 多语言首页：仅改 `locale`，`path` 仍为 `""`，相对路径用 `../../` |
| `src/pages/privacy-policy.astro` 等 | 单页：传 `title/description/keywords`、`path="/privacy-policy"`，无 locale 子路径 |
| `src/components/HomePage.astro` | 首页内容，按 section id 切块，数据用 i18n key 引用 |
| `src/components/Header.astro` | 导航：`getLocalizedPath('/', locale)` 得到首页路径；锚点 `#intro`、`#capabilities` 等 |
| `src/components/Footer.astro` | 同套锚点 + 法律页链接 |
| `src/i18n/translations.ts` | `t(locale, key)`，缺 key 先回退 en 再回退 key；`locales`、`localeNames` |
| `src/i18n/locales/*.json` | 每语言一份，key 一致；首页 SEO 用 `seo_title`、`seo_description`、`seo_keywords` |

---

## 2. 页面写法（套路）

- **首页（某语言）**：`BaseLayout` 传 `title={t(locale,'seo_title')}`、`description`、`keywords`、`locale`、`path=""`；内层 `Header` + `main`（`id="main-content"`）+ `HomePage` + `Footer`，都传 `locale`。
- **非首页单页**：`path` 为路径如 `"/privacy-policy"`；title/description/keywords 可写死或从 i18n 取；英文无前缀，多语言需在 `pages/` 下建 `zh/privacy-policy.astro` 等并设 `path` 一致。
- **canonical**：BaseLayout 按 `locale` + `path` 生成；英文 `BASE_URL + path`，其他 `BASE_URL/{locale}{path}`。需指定规范页时用 `canonicalOverride`。

---

## 3. 首页区块与锚点（当前）

HomePage 内 section 的 `id` 与 Header/Footer 锚点对应关系：

| id | 用途 |
|----|------|
| `intro` | What Is GLM-5 |
| `features` | At a Glance（4 卡片） |
| `capabilities` | 5 大能力 |
| `usecases` | Use Cases 网格 + 标签 |
| `architecture` | 技术架构 + 规格表 |
| `compare` | Why GLM-5 四条 |
| `opensource` | 开源与定价 |
| `timeline` | 时间线 |
| `getstarted` | 三步 + 外链 |
| `faq` | FAQ 手风琴 |

扩展首页：在 HomePage 里加新 `<section id="xxx">`，再在 Header/Footer 加 `href="#xxx"` 和对应 `t(locale, 'xxx_section')`（需在 i18n 补 key）。

---

## 4. 首页数据与 i18n 约定

- 区块文案全部走 `t(locale, key)`，不在组件里写死。
- 列表/表格：在 HomePage 顶部定义数组，项为 `{ titleKey, descKey }` 或单 key；模板里 `array.map` 渲染，每项用 `t(locale, item.xxxKey)`。
- key 命名：`gemini31_` 前缀 + 区块简写 + `_title`/`_desc`/`_section`/`_q1`/`_a1` 等。通用按钮/链接用 `common_`。
- 新增区块：在 `en.json`、`zh.json` 加齐 key；其他 locale 不写则自动用 en。

---

## 5. 品牌与域名

- **域名 / canonical / OG**：`src/layouts/BaseLayout.astro` 内 `const BASE_URL = 'https://gemini31.com'`。改站只需改此处（及若有硬编码的站名）。
- **站名**：BaseLayout 里 `og:site_name`、Schema 的 `name`、`author` 等为「Gemini 3.1 Pro」；Header/Footer 的 logo 文案也需同步改。

---

## 6. SEO 在哪儿配

- **每页 title/description/keywords**：由各页面传进 BaseLayout 的 props；首页来自 i18n 的 `seo_title`、`seo_description`、`seo_keywords`。
- **全站通用**：BaseLayout 内写死——robots、canonical 逻辑、hreflang 列表、OG/Twitter、JSON-LD（WebSite + WebPage）、Google/Bing 验证、Clarity。
- **多语言**：hreflang 覆盖 en, zh-CN, zh-TW, zh-HK, ja, hi, es, pt, ru, de, fr, ko；x-default 为 en。新增语言需在 BaseLayout 的 hreflang 和 `translations.ts` 的 `locales` 里加，并增加 `pages/{locale}/index.astro` 及对应 json。

---

## 7. 扩展检查清单

- **加新页面**：新建 `pages/xxx.astro` 或 `pages/zh/xxx.astro`；传对 `path`；需多语言则每个 locale 一份或复用同一 path 靠 hreflang；Header/Footer 需加链接时用 `getLocalizedPath('/xxx', locale)`。
- **加首页区块**：HomePage 加 section 与 id；定义数据数组 + i18n key；en/zh 补 key；Header/Footer 加锚点链接。
- **加语言**：`locales/xx.json`、translations 里注册、BaseLayout 加 hreflang、`pages/xx/index.astro`（复制现有改 locale）。
- **改品牌/域名**：BaseLayout 的 `BASE_URL` 与站名；Header/Footer 品牌文案；可选整站替换旧品牌名等字符串。
