# 🚀 Cloudflare Pages 部署检查清单

## 部署前准备

### 本地测试
- [ ] 运行 `pnpm install` 安装所有依赖
- [ ] 运行 `pnpm dev` 确保开发环境正常
- [ ] 运行 `pnpm build` 确保构建成功
- [ ] 运行 `pnpm preview` 预览生产版本
- [ ] 测试所有页面路由（/, /privacy-policy, /terms-of-service）
- [ ] 测试移动端响应式设计
- [ ] 检查浏览器控制台无错误

### 代码检查
- [ ] 确保所有文件已保存
- [ ] 检查 `public/_redirects` 文件存在
- [ ] 检查 `public/_headers` 文件存在
- [ ] 检查 `public/sitemap.xml` 文件存在
- [ ] 检查 `public/robots.txt` 文件存在
- [ ] 确保 `package.json` 中的依赖正确

### Git 提交
- [ ] 运行 `git status` 查看未提交的文件
- [ ] 运行 `git add .` 添加所有文件
- [ ] 运行 `git commit -m "Ready for deployment"` 提交
- [ ] 运行 `git push origin main` 推送到 GitLab

## Cloudflare Pages 配置

### 项目设置
- [ ] 登录 Cloudflare Dashboard
- [ ] 进入 Pages 部分
- [ ] 点击 "Create a project"
- [ ] 连接到 GitLab 仓库
- [ ] 选择 `gemini3.us` 仓库

### 构建配置
```
框架预设: Vite
构建命令: pnpm build
构建输出目录: dist
根目录: /
Node 版本: 18（在环境变量中设置）
```

- [ ] 设置框架预设为 "Vite"
- [ ] 设置构建命令为 `pnpm build`
- [ ] 设置构建输出目录为 `dist`
- [ ] 添加环境变量 `NODE_VERSION = 18`（可选）

### 部署
- [ ] 点击 "Save and Deploy"
- [ ] 等待构建完成（通常 2-3 分钟）
- [ ] 检查构建日志无错误
- [ ] 访问临时域名测试（*.pages.dev）

## 域名配置

### 自定义域名
- [ ] 在 Cloudflare Pages 项目中点击 "Custom domains"
- [ ] 点击 "Set up a custom domain"
- [ ] 输入 `gemini3.us`
- [ ] 等待 DNS 配置完成（自动）
- [ ] 添加 `www.gemini3.us`（可选）

### DNS 验证
- [ ] 等待 5-30 分钟 DNS 传播
- [ ] 访问 https://gemini3.us 确认可访问
- [ ] 检查 SSL 证书正常（绿色锁图标）
- [ ] 测试 www 重定向（如果配置了）

## 部署后测试

### 功能测试
- [ ] 首页正常显示
- [ ] Header 导航正常工作
- [ ] Footer 链接正常工作
- [ ] 点击 "Get Started" 按钮滚动正常
- [ ] 访问 /privacy-policy 页面正常
- [ ] 访问 /terms-of-service 页面正常
- [ ] 所有内部链接正常工作

### 性能测试
- [ ] 使用 PageSpeed Insights 测试性能
  - 访问: https://pagespeed.web.dev/
  - 输入: https://gemini3.us
  - 目标: 移动端和桌面端都 > 90 分
- [ ] 使用 GTmetrix 测试加载速度
  - 访问: https://gtmetrix.com/
  - 目标: 加载时间 < 2 秒

### 响应式测试
- [ ] 在手机上测试（iOS/Android）
- [ ] 在平板上测试
- [ ] 在桌面浏览器测试
- [ ] 测试不同浏览器（Chrome, Firefox, Safari, Edge）

### SEO 检查
- [ ] 查看页面源代码，确认 meta 标签存在
- [ ] 访问 https://gemini3.us/robots.txt 确认可访问
- [ ] 访问 https://gemini3.us/sitemap.xml 确认可访问
- [ ] 使用 Google 的富媒体测试工具测试结构化数据
  - 访问: https://search.google.com/test/rich-results
  - 输入: https://gemini3.us

## SEO 提交

### Google Search Console
- [ ] 访问 https://search.google.com/search-console
- [ ] 添加属性 `gemini3.us`
- [ ] 验证所有权（DNS 或 HTML 文件方式）
- [ ] 提交 sitemap: `https://gemini3.us/sitemap.xml`
- [ ] 请求索引首页

### Bing Webmaster Tools
- [ ] 访问 https://www.bing.com/webmasters
- [ ] 添加网站 `gemini3.us`
- [ ] 验证所有权
- [ ] 提交 sitemap: `https://gemini3.us/sitemap.xml`

### 其他搜索引擎（可选）
- [ ] Yandex Webmaster
- [ ] Baidu 站长平台（如果需要中国市场）

## 监控设置

### Cloudflare Analytics
- [ ] 在 Cloudflare Pages 项目中查看 Analytics
- [ ] 确认数据正在收集

### Google Analytics（可选）
- [ ] 创建 GA4 属性
- [ ] 获取测量 ID (G-XXXXXXXXXX)
- [ ] 在 `index.html` 中添加 GA 代码
- [ ] 验证数据正在收集

### Uptime 监控（可选）
- [ ] 注册 UptimeRobot 或类似服务
- [ ] 添加 `https://gemini3.us` 监控
- [ ] 设置邮件/短信告警

## 安全检查

### SSL/TLS
- [ ] 访问 https://www.ssllabs.com/ssltest/
- [ ] 输入 `gemini3.us`
- [ ] 确认评级为 A 或 A+

### 安全头部
- [ ] 访问 https://securityheaders.com/
- [ ] 输入 `https://gemini3.us`
- [ ] 检查安全评分

### 隐私合规
- [ ] 确认隐私政策页面完整
- [ ] 确认使用条款页面完整
- [ ] 确认免责声明清晰可见

## 文档更新

- [ ] 更新 README.md 中的部署状态
- [ ] 记录部署日期和版本
- [ ] 更新团队文档（如果有）

## 备份和回滚

- [ ] 记录当前部署的 commit hash
- [ ] 了解如何在 Cloudflare Pages 中回滚
- [ ] 测试回滚流程（可选）

## 后续优化

### 内容优化
- [ ] 添加更多 SEO 优化内容
- [ ] 添加博客文章（如果需要）
- [ ] 优化图片（添加 WebP 格式）
- [ ] 添加 favicon 和 app icons

### 功能增强
- [ ] 添加用户注册/登录功能
- [ ] 添加 API 密钥管理
- [ ] 添加使用统计仪表板
- [ ] 添加文档页面

### 营销
- [ ] 在社交媒体分享
- [ ] 提交到产品目录（Product Hunt 等）
- [ ] 联系相关社区和论坛

## 完成！🎉

恭喜！你的网站已成功部署到 Cloudflare Pages。

**网站地址:** https://gemini3.us

**下一步:**
1. 定期检查网站性能和可用性
2. 监控 SEO 排名
3. 收集用户反馈
4. 持续优化和改进

---

**需要帮助？**
- 查看 [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
- 联系: support@gemini3.us
