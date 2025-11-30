# Next.js vs 当前方案：多语言处理对比

## Next.js 的多语言方案

### 1. 内置 i18n 路由（Pages Router）

Next.js 10.0+ 提供了内置的国际化路由支持：

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'zh', 'es', 'ja', 'ko', 'fr', 'de'],
    defaultLocale: 'en',
    localeDetection: true, // 自动检测浏览器语言
  }
}
```

**特点**：
- ✅ **服务端渲染（SSR）**：每个语言路径在服务端生成 HTML，包含正确的 meta 标签
- ✅ **自动路由**：`/about` → `/zh/about`（中文），`/es/about`（西班牙语）
- ✅ **自动 hreflang**：Next.js 自动为每个页面添加 hreflang 标签
- ✅ **SEO 友好**：服务端渲染确保爬虫能直接读取 meta 标签
- ✅ **自动语言检测**：根据浏览器语言自动重定向

**URL 结构**：
- 英文：`https://example.com/about`
- 中文：`https://example.com/zh/about`
- 西班牙语：`https://example.com/es/about`

### 2. App Router 方案（Next.js 13+）

使用新的 App Router 时，需要手动实现：

```typescript
// app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**特点**：
- ✅ **服务端组件**：默认服务端渲染
- ✅ **静态生成**：可以预生成所有语言版本的静态页面
- ✅ **更好的性能**：服务端组件减少客户端 JavaScript

## 当前方案（Vite + React SPA）

### 实现方式

1. **客户端渲染（CSR）**：使用 React + i18next
2. **构建时预渲染**：通过脚本生成静态 HTML 文件
3. **动态 meta 标签**：通过 `useEffect` 更新

### 对比

| 特性 | Next.js (内置 i18n) | 当前方案 (Vite + React) |
|------|-------------------|----------------------|
| **渲染方式** | 服务端渲染（SSR） | 客户端渲染 + 构建时预渲染 |
| **SEO 友好度** | ⭐⭐⭐⭐⭐ 原生支持 | ⭐⭐⭐⭐ 需要预渲染脚本 |
| **meta 标签** | 服务端生成，爬虫直接读取 | 构建时生成静态 HTML |
| **路由处理** | 内置，自动处理 | 手动配置 React Router |
| **hreflang 标签** | 自动生成 | 手动生成（脚本 + 组件） |
| **语言检测** | 内置自动检测 | 需要手动实现 |
| **构建复杂度** | 简单（配置即可） | 中等（需要脚本） |
| **性能** | 优秀（SSR + 静态生成） | 良好（静态 HTML + CSR） |
| **灵活性** | 中等（受限于框架） | 高（完全控制） |

## Next.js 的优势

### 1. 原生 SSR 支持

```javascript
// Next.js 自动在服务端渲染，包含正确的 meta 标签
export async function getServerSideProps({ locale }) {
  return {
    props: {
      locale,
      // 服务端就能获取翻译内容
    }
  }
}
```

### 2. 自动静态生成（SSG）

```javascript
// 构建时预生成所有语言版本的静态页面
export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: 'en' } },
      { params: { locale: 'zh' } },
      // ...
    ],
    fallback: false
  }
}
```

### 3. 自动 hreflang 生成

Next.js 自动为每个页面生成 hreflang 标签，无需手动配置。

## 当前方案的优势

### 1. 完全控制

- 可以自定义任何逻辑
- 不依赖框架限制
- 可以自由选择技术栈

### 2. 更轻量

- 不需要 Node.js 服务器
- 可以部署到任何静态托管服务
- 构建产物更小

### 3. 灵活性

- 可以随时切换技术栈
- 不受 Next.js 版本升级影响
- 可以自由选择 i18n 库

## 推荐方案

### 如果使用 Next.js

**推荐使用 Next.js 内置 i18n**：
- 更简单：配置即可
- 更可靠：框架原生支持
- 更 SEO 友好：服务端渲染

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'zh', 'es', 'ja', 'ko', 'fr', 'de'],
    defaultLocale: 'en',
  }
}
```

### 如果使用 Vite + React（当前项目）

**当前方案已经很好**：
- ✅ 构建时预渲染确保 SEO
- ✅ 静态 HTML 文件包含完整 meta 标签
- ✅ 完全控制，灵活性强

**可以优化的点**：
1. 考虑使用 React Helmet 或 react-helmet-async 管理 meta 标签
2. 考虑使用 next-intl 的灵感，创建更结构化的路由系统

## 总结

**Next.js 方案**：
- 更适合新项目
- 框架原生支持，开箱即用
- 服务端渲染，SEO 更优

**当前方案**：
- 适合已有 Vite + React 项目
- 需要手动实现，但更灵活
- 通过预渲染脚本达到类似效果

两种方案都能很好地支持多语言 SEO，主要区别在于：
- **Next.js**：框架层面支持，更自动化
- **当前方案**：应用层面实现，更灵活

---

**使用的模型**: Claude Sonnet 4.5

