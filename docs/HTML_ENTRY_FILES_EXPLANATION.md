# HTML 入口文件说明

## 文件列表

这些文件是**多语言 HTML 入口文件**：

- `index.html` - 英文入口（默认）
- `index-zh.html` - 中文入口
- `index-es.html` - 西班牙语入口
- `index-ja.html` - 日语入口
- `index-ko.html` - 韩语入口
- `index-fr.html` - 法语入口
- `index-de.html` - 德语入口

## 作用

### 1. Vite 多入口构建

这些文件作为 Vite 的**多个入口点**，在 `vite.config.ts` 中配置：

```typescript
build: {
  rollupOptions: {
    input: {
      main: 'index.html',        // 英文
      zh: 'index-zh.html',       // 中文
      es: 'index-es.html',       // 西班牙语
      ja: 'index-ja.html',       // 日语
      ko: 'index-ko.html',       // 韩语
      fr: 'index-fr.html',       // 法语
      de: 'index-de.html'        // 德语
    }
  }
}
```

### 2. 构建时生成独立的 HTML 文件

运行 `pnpm build` 时：
- Vite 会为每个入口文件生成独立的 HTML 文件
- 每个 HTML 文件包含对应语言的完整 meta 标签
- 生成到 `dist/` 目录

### 3. 构建后处理

`scripts/post-build.cjs` 脚本会自动：
- 将 `dist/index-zh.html` → `dist/zh/index.html`
- 将 `dist/index-es.html` → `dist/es/index.html`
- 将 `dist/index-ja.html` → `dist/ja/index.html`
- 等等...

### 4. 最终结果

构建后，访问不同语言版本时：
- `https://gemini3.us/` → 返回 `dist/index.html`（英文 meta 标签）
- `https://gemini3.us/zh/` → 返回 `dist/zh/index.html`（中文 meta 标签）
- `https://gemini3.us/es/` → 返回 `dist/es/index.html`（西班牙语 meta 标签）
- 等等...

## 每个文件包含什么

每个 HTML 文件包含：

1. **正确的语言属性**：
   ```html
   <html lang="zh-CN">  <!-- 中文 -->
   <html lang="es">     <!-- 西班牙语 -->
   ```

2. **对应语言的 SEO meta 标签**：
   ```html
   <title>Gemini 3 | Google 最新 AI 模型</title>  <!-- 中文 -->
   <meta name="description" content="...">  <!-- 中文描述 -->
   ```

3. **完整的 hreflang 标签**：
   ```html
   <link rel="alternate" hreflang="en" href="https://gemini3.us/" />
   <link rel="alternate" hreflang="zh" href="https://gemini3.us/zh/" />
   <!-- 所有语言版本 -->
   ```

4. **Open Graph 和 Twitter Card 标签**：
   ```html
   <meta property="og:title" content="...">
   <meta property="twitter:title" content="...">
   ```

5. **React 应用入口**：
   ```html
   <div id="root"></div>
   <script type="module" src="/src/main.tsx"></script>
   ```

## 工作流程

```
开发阶段
  ↓
index-zh.html (手动维护，包含中文 meta 标签)
  ↓
pnpm build
  ↓
Vite 构建
  ↓
dist/index-zh.html (构建后的文件)
  ↓
post-build.cjs 脚本
  ↓
dist/zh/index.html (最终位置)
  ↓
部署后
  ↓
访问 https://gemini3.us/zh/
  ↓
服务器返回 dist/zh/index.html
  ↓
浏览器收到包含中文 meta 标签的 HTML
  ↓
Google 爬虫可以直接读取中文的 title 和 description
```

## 为什么需要这些文件？

### SEO 友好

- ✅ 每个语言有独立的 HTML 文件
- ✅ 包含正确的 meta 标签（爬虫直接读取，无需执行 JavaScript）
- ✅ 包含完整的 hreflang 标签（帮助 Google 理解多语言结构）

### 维护简单

- ✅ 直接编辑 HTML 文件即可更新 SEO 信息
- ✅ 不需要复杂的生成脚本
- ✅ 每个语言的文件独立，易于管理

## 与翻译文件的关系

| 文件类型 | 用途 | 维护方式 |
|---------|------|---------|
| **HTML 入口文件** | SEO meta 标签（title, description 等） | 直接编辑 HTML 文件 |
| **翻译文件** (`src/i18n/locales/`) | 页面内容翻译（用户看到的文本） | 编辑 JSON 文件 |

## 总结

这些 HTML 文件是**多语言网站的 SEO 入口点**：
- 每个语言一个独立的 HTML 文件
- 包含对应语言的完整 meta 标签
- 构建时自动处理，部署后直接使用
- 确保 Google 爬虫能直接读取正确的 SEO 信息

---

**使用的模型**: Claude Sonnet 4.5

