# SEO 预渲染解决方案

## 问题

对于客户端渲染（CSR）的 React SPA，Google 爬虫虽然支持 JavaScript 渲染，但：
- 需要执行 JavaScript 才能看到动态生成的 meta 标签
- 可能存在延迟，导致爬虫无法及时抓取到正确的 title 和 description
- 对于多语言网站，每个语言路径都需要独立的 HTML 文件

## 解决方案

我们实现了**构建时预渲染**方案，为每个语言路径生成包含正确 meta 标签的静态 HTML 文件。

### 工作原理

1. **构建时生成**：在 `pnpm build` 后，自动为每个语言路径生成静态 HTML 文件
2. **包含完整 meta 标签**：每个 HTML 文件包含：
   - 正确的 `<title>` 标签（对应语言）
   - `<meta name="description">`（对应语言）
   - `<meta name="keywords">`（对应语言）
   - `<html lang>` 属性（对应语言）
   - 完整的 hreflang 标签（所有语言版本）
   - Canonical URL
   - Open Graph 标签
   - Twitter Card 标签
   - JSON-LD 结构化数据

3. **文件结构**：
   ```
   dist/
   ├── index.html                    # 英文首页
   ├── privacy-policy/
   │   └── index.html                # 英文隐私政策
   ├── terms-of-service/
   │   └── index.html                # 英文使用协议
   ├── zh/
   │   ├── index.html                # 中文首页
   │   ├── privacy-policy/
   │   │   └── index.html
   │   └── terms-of-service/
   │       └── index.html
   ├── es/
   │   └── ...                       # 西班牙语版本
   └── ...                           # 其他语言
   ```

## 使用方法

### 构建项目

```bash
pnpm build
```

构建过程会自动：
1. 编译 TypeScript
2. 构建 Vite 项目
3. 生成所有语言路径的 HTML 文件

### 手动生成 HTML 文件

如果需要单独生成 HTML 文件：

```bash
pnpm generate:html
```

## 验证方法

### 1. 检查生成的文件

构建后，检查 `dist/` 目录：

```bash
# 检查中文首页
cat dist/zh/index.html | grep -A 2 "<title>"

# 检查英文首页
cat dist/index.html | grep -A 2 "<title>"
```

### 2. 使用 Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 使用"URL 检查"工具
3. 输入不同语言版本的 URL：
   - `https://gemini3.us/`
   - `https://gemini3.us/zh/`
   - `https://gemini3.us/es/`
4. 查看"已编入索引"页面，确认 title 和 description 正确

### 3. 使用 curl 检查

```bash
# 检查中文版本
curl -s https://gemini3.us/zh/ | grep -o '<title>.*</title>'

# 检查英文版本
curl -s https://gemini3.us/ | grep -o '<title>.*</title>'
```

### 4. 使用浏览器开发者工具

1. 访问不同语言版本的 URL
2. 查看页面源代码（右键 → 查看页面源代码）
3. 确认 `<head>` 部分包含正确的 meta 标签

## 服务器配置

### Cloudflare Pages

Cloudflare Pages 会自动处理这些静态 HTML 文件，无需额外配置。

### Nginx

确保 Nginx 配置支持 SPA 路由：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Apache

使用 `.htaccess`：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 优势

✅ **Google 爬虫友好**：每个语言路径都有独立的静态 HTML 文件，包含完整的 meta 标签  
✅ **无需 JavaScript**：爬虫可以直接从 HTML 中读取 title 和 description  
✅ **快速索引**：静态 HTML 文件更容易被爬虫发现和索引  
✅ **SEO 优化**：包含完整的 hreflang 标签，帮助 Google 理解多语言结构  
✅ **社交分享优化**：Open Graph 和 Twitter Card 标签确保社交分享显示正确内容  

## 注意事项

1. **构建后运行**：脚本必须在 `vite build` 之后运行，因为需要 `dist` 目录存在
2. **翻译文件同步**：确保所有语言的翻译文件都包含 `seo` 部分
3. **新增语言**：添加新语言时，需要：
   - 在 `scripts/generate-html-pages.js` 中添加语言代码
   - 创建对应的翻译文件
   - 重新构建

## 技术细节

### 脚本位置
`scripts/generate-html-pages.js`

### 生成的文件
- 每个语言 × 每个路由 = 21 个 HTML 文件（7 种语言 × 3 个路由）
- 所有文件都包含完整的 SEO meta 标签

### 构建流程
```
pnpm build
  ↓
tsc (TypeScript 编译)
  ↓
vite build (Vite 构建)
  ↓
generate-html-pages.js (生成 HTML 文件)
```

## 故障排除

### 问题：生成的 HTML 文件没有正确的 meta 标签

**解决方案**：
1. 检查翻译文件是否包含 `seo` 部分
2. 确认翻译文件格式正确（JSON 格式）
3. 重新运行 `pnpm build`

### 问题：某些语言路径返回 404

**解决方案**：
1. 检查服务器配置是否正确
2. 确认 `dist` 目录中是否存在对应的 HTML 文件
3. 检查路由配置

### 问题：Google 仍然显示错误的 title/description

**解决方案**：
1. 在 Google Search Console 中请求重新索引
2. 等待 Google 重新抓取（可能需要几天）
3. 使用"URL 检查"工具验证当前状态

