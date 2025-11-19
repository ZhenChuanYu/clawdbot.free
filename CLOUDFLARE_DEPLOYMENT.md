# Cloudflare Pages 部署指南

## 部署前准备

### 1. 确保项目可以正常构建

```bash
# 安装依赖
pnpm install

# 测试构建
pnpm build

# 预览构建结果
pnpm preview
```

如果构建成功，会在 `dist/` 目录生成文件。

### 2. 上传代码到 GitLab

```bash
# 初始化 git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Gemini3.us website"

# 添加远程仓库
git remote add origin https://gitlab.com/your-username/gemini3.us.git

# 推送到 GitLab
git push -u origin main
```

## Cloudflare Pages 部署步骤

### 步骤 1：登录 Cloudflare

1. 访问 https://dash.cloudflare.com/
2. 登录你的 Cloudflare 账号
3. 点击左侧菜单的 "Pages"

### 步骤 2：创建新项目

1. 点击 "Create a project" 按钮
2. 选择 "Connect to Git"
3. 选择 "GitLab"
4. 授权 Cloudflare 访问你的 GitLab 账号
5. 选择你的 `gemini3.us` 仓库

### 步骤 3：配置构建设置

在构建配置页面，填写以下信息：

```
项目名称: gemini3-us（或你喜欢的名字）
生产分支: main
```

**构建设置：**

```
框架预设: Vite
构建命令: pnpm build
构建输出目录: dist
根目录: /（保持默认）
```

**环境变量（可选）：**
如果需要环境变量，可以添加：
```
NODE_VERSION = 18
```

### 步骤 4：部署

1. 点击 "Save and Deploy"
2. Cloudflare 会自动开始构建和部署
3. 等待 2-3 分钟，部署完成

### 步骤 5：配置自定义域名

部署完成后，配置你的域名 `gemini3.us`：

1. 在 Cloudflare Pages 项目页面，点击 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入 `gemini3.us`
4. Cloudflare 会自动配置 DNS 记录

**如果域名在 Cloudflare 管理：**
- Cloudflare 会自动添加 CNAME 记录
- 等待几分钟 DNS 生效

**如果域名不在 Cloudflare：**
- 需要在你的域名注册商添加 CNAME 记录：
  ```
  类型: CNAME
  名称: @（或 www）
  目标: your-project.pages.dev
  ```

### 步骤 6：配置 www 重定向（可选）

如果你想让 `www.gemini3.us` 也能访问：

1. 添加 `www.gemini3.us` 作为自定义域名
2. Cloudflare 会自动处理重定向

## 重要配置

### 1. 创建 `_redirects` 文件（用于 SPA 路由）

在 `public/` 目录创建 `_redirects` 文件：

```
/*    /index.html   200
```

这确保所有路由都指向 index.html，支持 React Router。

### 2. 创建 `_headers` 文件（可选，用于安全和性能）

在 `public/` 目录创建 `_headers` 文件：

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable
```

## 自动部署

配置完成后，每次推送到 GitLab 的 `main` 分支，Cloudflare Pages 会自动：

1. 拉取最新代码
2. 运行 `pnpm build`
3. 部署到生产环境
4. 更新 CDN 缓存

## 环境变量配置（如果需要）

如果你的项目需要环境变量：

1. 在 Cloudflare Pages 项目设置中
2. 找到 "Environment variables"
3. 添加变量，例如：
   ```
   VITE_API_URL = https://api.gemini3.us
   VITE_GA_ID = G-XXXXXXXXXX
   ```

## 性能优化

Cloudflare Pages 自动提供：

✅ **全球 CDN** - 自动分发到全球边缘节点
✅ **自动 HTTPS** - 免费 SSL 证书
✅ **HTTP/2 & HTTP/3** - 自动启用
✅ **Brotli 压缩** - 自动压缩资源
✅ **DDoS 防护** - 自动防护
✅ **无限带宽** - 免费计划包含

## 部署后检查清单

- [ ] 网站可以正常访问 https://gemini3.us
- [ ] 所有页面都能正常加载
- [ ] 路由跳转正常（/privacy-policy, /terms-of-service）
- [ ] 移动端显示正常
- [ ] SSL 证书正常（绿色锁图标）
- [ ] 检查浏览器控制台无错误
- [ ] 测试页面加载速度

## SEO 配置

部署后，提交网站到搜索引擎：

### Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加属性：`gemini3.us`
3. 验证所有权（DNS 或 HTML 文件）
4. 提交 sitemap：`https://gemini3.us/sitemap.xml`

### Bing Webmaster Tools

1. 访问 https://www.bing.com/webmasters
2. 添加网站
3. 提交 sitemap

## 监控和分析

### Cloudflare Analytics

Cloudflare Pages 自动提供：
- 访问量统计
- 带宽使用
- 请求分析
- 性能指标

在项目页面的 "Analytics" 标签查看。

### 添加 Google Analytics（可选）

在 `index.html` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 常见问题

### Q: 404 错误（刷新页面时）

**解决方案：** 确保 `public/_redirects` 文件存在，内容为：
```
/*    /index.html   200
```

### Q: 构建失败

**检查：**
1. 确保 `package.json` 中的依赖正确
2. 检查构建命令是否为 `pnpm build`
3. 查看 Cloudflare 构建日志

### Q: 样式不显示

**检查：**
1. 确保 Tailwind CSS 配置正确
2. 检查 `postcss.config.js` 存在
3. 清除浏览器缓存

### Q: 域名未生效

**等待时间：**
- DNS 传播通常需要 5-30 分钟
- 最多可能需要 24-48 小时

## 更新网站

更新网站非常简单：

```bash
# 修改代码后
git add .
git commit -m "Update: 描述你的更改"
git push

# Cloudflare 会自动重新部署
```

## 回滚版本

如果新版本有问题：

1. 在 Cloudflare Pages 项目页面
2. 找到 "Deployments" 标签
3. 选择之前的成功部署
4. 点击 "Rollback to this deployment"

## 成本

Cloudflare Pages 免费计划包括：
- ✅ 无限请求
- ✅ 无限带宽
- ✅ 500 次构建/月
- ✅ 1 次并发构建
- ✅ 自动 HTTPS
- ✅ 全球 CDN

对于大多数项目完全够用！

## 技术支持

- Cloudflare 文档: https://developers.cloudflare.com/pages/
- Cloudflare 社区: https://community.cloudflare.com/
- 项目问题: support@gemini3.us

---

**祝你部署顺利！🚀**
