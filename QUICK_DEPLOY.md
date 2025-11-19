# ⚡ 快速部署到 Cloudflare Pages

## 一键部署命令

```bash
# 1. 测试构建
pnpm install && pnpm build

# 2. 提交到 Git
git add . && git commit -m "Deploy to Cloudflare" && git push

# 3. Cloudflare 会自动部署！
```

## Cloudflare Pages 配置（首次设置）

在 Cloudflare Pages 创建项目时使用这些设置：

```yaml
框架预设: Vite
构建命令: pnpm build
构建输出目录: dist
根目录: /
```

## 环境变量（可选）

如果需要，在 Cloudflare Pages 设置中添加：

```
NODE_VERSION = 18
```

## 自定义域名

1. 在 Cloudflare Pages 项目中点击 "Custom domains"
2. 添加 `gemini3.us`
3. Cloudflare 自动配置 DNS
4. 等待 5-30 分钟生效

## 验证部署

访问以下 URL 确认部署成功：

- ✅ https://gemini3.us
- ✅ https://gemini3.us/privacy-policy
- ✅ https://gemini3.us/terms-of-service
- ✅ https://gemini3.us/sitemap.xml
- ✅ https://gemini3.us/robots.txt

## 自动部署

配置完成后，每次 `git push` 到 main 分支，Cloudflare 会自动：

1. 拉取代码
2. 运行 `pnpm build`
3. 部署到生产环境
4. 更新全球 CDN

## 需要详细指南？

查看完整文档：
- [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) - 详细部署指南
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - 部署检查清单

---

**就这么简单！🚀**
