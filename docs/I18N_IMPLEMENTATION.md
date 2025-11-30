# 多语言国际化实现方案

## 概述

本项目已实现完整的 SEO 友好的多语言支持，使用 `i18next` 和 `react-i18next` 库。

## 支持的语言

- 🇺🇸 English (en) - 默认语言
- 🇨🇳 中文 (zh)
- 🇪🇸 Español (es)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)

## SEO 优化特性

### 1. URL 结构
- 英文（默认）：`https://gemini3.us/`
- 其他语言：`https://gemini3.us/{lang}/`
- 示例：`https://gemini3.us/zh/`, `https://gemini3.us/es/`

### 2. Hreflang 标签
- 自动为每个页面添加所有语言版本的 hreflang 标签
- 包含 `x-default` 指向英文版本
- 帮助 Google 正确索引和显示不同语言版本

### 3. 动态 Meta 标签
- 根据当前语言自动更新：
  - `<html lang>` 属性
  - `<title>` 标签
  - `<meta name="description">`
  - `<meta name="keywords">`
  - Canonical URL
  - Open Graph 标签
  - Twitter Card 标签

### 4. Sitemap.xml
- 包含所有语言版本的所有页面
- 每个 URL 包含对应的 hreflang 链接
- 符合 Google 多语言网站最佳实践

## 文件结构

```
src/
├── i18n/
│   ├── config.ts              # i18n 配置
│   └── locales/
│       ├── en.json            # 英文翻译
│       ├── zh.json            # 中文翻译
│       ├── es.json            # 西班牙语翻译
│       ├── ja.json            # 日语翻译
│       ├── ko.json            # 韩语翻译
│       ├── fr.json            # 法语翻译
│       └── de.json            # 德语翻译
├── components/
│   ├── LanguageSwitcher.tsx   # 语言切换组件
│   ├── LanguageRoute.tsx      # 语言路由包装器
│   └── SEOHead.tsx            # SEO 标签管理组件
└── utils/
    └── routes.ts              # 路由工具函数
```

## 使用方法

### 在组件中使用翻译

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  )
}
```

### 获取本地化路径

```tsx
import { useLocalizedPath } from '../utils/routes'

function MyComponent() {
  const { getLocalizedPath } = useLocalizedPath()
  
  return (
    <Link to={getLocalizedPath('/privacy-policy')}>
      Privacy Policy
    </Link>
  )
}
```

### 添加新语言

1. 在 `src/i18n/config.ts` 中添加语言配置：
```typescript
export const SUPPORTED_LANGUAGES = [
  // ... 现有语言
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
]
```

2. 创建翻译文件 `src/i18n/locales/pt.json`

3. 在 `src/i18n/config.ts` 中导入并添加到 resources

4. 更新 `public/sitemap.xml` 添加新语言的 URL

## 语言检测顺序

1. URL 路径中的语言代码（最高优先级）
2. localStorage 中保存的语言偏好
3. 浏览器语言设置
4. 默认英语

## Google Search Console 配置建议

1. **提交所有语言版本的 sitemap**
   - 确保 sitemap.xml 已提交到 Google Search Console

2. **验证 hreflang 标签**
   - 使用 Google 的 hreflang 测试工具验证标签正确性

3. **设置目标国家/地区**
   - 在 Search Console 中为每种语言设置目标国家/地区

4. **监控索引状态**
   - 定期检查各语言版本的索引状态

## 最佳实践

1. **保持翻译文件同步**
   - 添加新文本时，确保所有语言文件都更新

2. **使用命名空间**
   - 按功能模块组织翻译键（如 `home.*`, `common.*`）

3. **避免硬编码文本**
   - 所有用户可见的文本都应使用 `t()` 函数

4. **测试所有语言**
   - 确保所有语言版本的页面都能正常显示

## 性能优化

- 翻译文件按需加载（当前实现为全量加载，可优化为按需加载）
- 语言切换时使用 `replace: true` 避免历史记录堆积
- SEO 标签更新使用 `useEffect` 避免不必要的重渲染

## 故障排除

### 语言切换不生效
- 检查 `src/i18n/config.ts` 中的语言配置
- 确认翻译文件存在且格式正确

### SEO 标签未更新
- 确认 `SEOHead` 组件已添加到路由中
- 检查浏览器控制台是否有错误

### 路由跳转问题
- 确认 `LanguageRoute` 组件正确包装了路由
- 检查 `getLocalizedPath` 函数是否正确使用

## 参考资料

- [i18next 文档](https://www.i18next.com/)
- [react-i18next 文档](https://react.i18next.com/)
- [Google 多语言网站指南](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Hreflang 标签指南](https://developers.google.com/search/docs/specialty/international/localized-versions)

