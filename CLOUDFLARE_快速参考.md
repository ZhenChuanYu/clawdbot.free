# ⚡ Cloudflare Pages 部署 - 快速参考卡片

## 🎯 核心配置（复制粘贴）

### Cloudflare Pages 构建设置

```
框架预设: Vite
构建命令: pnpm build
构建输出目录: dist
根目录: /
```

### 环境变量（可选）

```
NODE_VERSION = 18
```

## 📝 部署步骤（5 步完成）

### 1️⃣ 本地测试
```bash
pnpm install
pnpm build
pnpm preview
```

### 2️⃣ 推送到 GitLab
```bash
git add .
git commit -m "Deploy to Cloudflare"
git push origin main
```

### 3️⃣ Cloudflare 配置
1. 登录 https://dash.cloudflare.com/
2. Pages → Create a project
3. 连接 GitLab → 选择仓库
4. 填写上面的构建设置
5. Save and Deploy

### 4️⃣ 添加域名
1. Custom domains → Set up a custom domain
2. 输入 `gemini3.us`
3. 等待 DNS 生效（5-30 分钟）

### 5️⃣ 验证部署
访问：
- https://gemini3.us
- https://gemini3.us/privacy-policy
- https://gemini3.us/terms-of-service

## ✅ 关键文件检查

确保这些文件存在：
- ✅ `public/_redirects` - SPA 路由
- ✅ `public/_headers` - 安全头部
- ✅ `public/sitemap.xml` - SEO
- ✅ `public/robots.txt` - 爬虫
- ✅ `.node-version` - Node 版本

## 🔧 常见问题速查

| 问题 | 解决方案 |
|------|---------|
| 构建失败 | 检查构建命令是 `pnpm build` |
| 404 错误 | 确保 `_redirects` 文件存在 |
| 域名未生效 | 等待 DNS 传播（5-30 分钟）|
| 样式不显示 | 清除浏览器缓存 |

## 📊 SEO 提交

### Google Search Console
1. https://search.google.com/search-console
2. 添加 `gemini3.us`
3. 提交 sitemap: `https://gemini3.us/sitemap.xml`

### Bing Webmaster
1. https://www.bing.com/webmasters
2. 添加网站
3. 提交 sitemap

## 🔄 更新流程

```bash
# 修改代码后
git add .
git commit -m "Update: 描述"
git push
# Cloudflare 自动部署！
```

## 📚 详细文档

- 完整指南: [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
- 检查清单: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- 中文总结: [部署到Cloudflare总结.md](./部署到Cloudflare总结.md)

## 🎉 完成标志

- [ ] 网站可访问 https://gemini3.us
- [ ] SSL 证书正常（绿色锁）
- [ ] 所有页面正常加载
- [ ] 移动端显示正常
- [ ] 已提交到搜索引擎

---

**需要帮助？查看详细文档或联系 support@gemini3.us**
