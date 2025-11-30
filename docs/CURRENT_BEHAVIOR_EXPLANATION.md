# 当前行为说明

## 开发模式（`pnpm dev`）

### 访问 `http://localhost:3003/es` 时的流程

1. **Vite 开发服务器返回 `index.html`**
   - Vite 只使用根目录的 `index.html` 作为入口
   - 这个 HTML 文件包含**英文**的 meta 标签

2. **React 应用启动**
   - React 应用挂载到 `<div id="root">`
   - React Router 开始工作

3. **路由匹配**
   - React Router 匹配到 `/:lang` 路由（`lang = 'es'`）
   - 渲染 `LanguageRoute` 组件

4. **语言切换（客户端）**
   - `LanguageRoute` 的 `useEffect` 检测到 `lang = 'es'`
   - 调用 `i18n.changeLanguage('es')` 切换语言
   - `SEOHead` 组件的 `useEffect` 更新 meta 标签为西班牙语

5. **内容渲染**
   - 页面内容通过 `t()` 函数显示西班牙语文本

### 问题

- ⚠️ **会有短暂的英文显示**：HTML 中的 meta 标签是英文的，直到 React 应用启动并更新
- ⚠️ **meta 标签延迟更新**：meta 标签在 `useEffect` 中更新，需要等待 React 应用启动
- ⚠️ **SEO 不友好**：开发模式下，爬虫看到的初始 HTML 是英文的

## 生产模式（构建后）

### 访问 `https://gemini3.us/es` 时的流程

1. **服务器返回 `dist/es/index.html`**
   - 如果服务器配置正确（如 Cloudflare Pages），会直接返回 `dist/es/index.html`
   - 这个 HTML 文件包含**西班牙语**的 meta 标签（从模板复制）

2. **React 应用启动**
   - React 应用挂载
   - React Router 匹配路由

3. **语言确认**
   - `LanguageRoute` 确认语言为 `es`
   - 内容直接显示西班牙语（因为 HTML 中的 meta 已经是西班牙语）

### 优势

- ✅ **SEO 友好**：爬虫看到的初始 HTML 就是西班牙语的 meta 标签
- ✅ **无闪烁**：HTML 中的 meta 标签已经是正确的语言
- ✅ **快速加载**：不需要等待 React 应用更新 meta 标签

## 关键区别

| 模式 | HTML 文件 | Meta 标签 | SEO |
|------|----------|-----------|-----|
| **开发模式** | 只有 `index.html`（英文） | 客户端动态更新 | ❌ 不友好 |
| **生产模式** | `dist/es/index.html`（西班牙语） | 服务端已正确 | ✅ 友好 |

## 开发模式的限制

开发模式下，Vite 只使用一个 `index.html` 文件，所以：
- 所有路由都返回同一个 HTML 文件
- meta 标签需要客户端 JavaScript 更新
- 会有短暂的英文显示

这是**正常行为**，因为：
- 开发模式注重开发体验，不注重 SEO
- 生产模式才是真正部署的版本，SEO 友好

## 如何验证生产模式

1. **构建项目**：
   ```bash
   pnpm build
   ```

2. **预览构建结果**：
   ```bash
   pnpm preview
   ```

3. **检查 HTML 文件**：
   ```bash
   # 查看中文版本的 HTML
   cat dist/zh/index.html | grep -A 2 "<title>"
   
   # 应该看到中文的 title
   ```

4. **在浏览器中查看**：
   - 访问 `http://localhost:3003/zh/`
   - 右键 → 查看页面源代码
   - 应该看到中文的 meta 标签

## 总结

- **开发模式**：客户端渲染，meta 标签动态更新，会有短暂英文显示（正常）
- **生产模式**：静态 HTML 文件包含正确的 meta 标签，SEO 友好（这是我们想要的）

---

**使用的模型**: Claude Sonnet 4.5

