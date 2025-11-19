# 🚀 快速启动 Gemini3.us

## 第一步：安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

## 第二步：启动开发服务器

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev
```

浏览器会自动打开 http://localhost:3003

## 第三步：构建生产版本

```bash
# 使用 pnpm
pnpm build

# 或使用 npm
npm run build
```

构建文件会生成在 `dist/` 目录中。

## 项目结构

```
gemini3.us/
├── src/
│   ├── components/          # 组件
│   │   ├── Header.tsx      # 网站头部
│   │   └── Footer.tsx      # 网站底部（含免责声明）
│   ├── pages/              # 页面
│   │   ├── HomePage.tsx    # 首页
│   │   ├── PrivacyPolicy.tsx    # 隐私政策
│   │   └── TermsOfService.tsx   # 使用协议
│   ├── App.tsx             # 根组件
│   ├── main.tsx            # 入口文件
│   └── index.css           # 全局样式
├── public/                 # 静态资源
│   ├── robots.txt         # SEO 机器人文件
│   └── sitemap.xml        # SEO 站点地图
├── index.html             # HTML 模板（含 SEO 优化）
├── package.json           # 依赖配置
├── vite.config.ts         # Vite 配置
├── tailwind.config.js     # Tailwind CSS 配置
└── tsconfig.json          # TypeScript 配置
```

## 主要特性

✅ **SEO 优化** - 针对 "gemini3" 关键词优化
✅ **完整网站** - Header、Footer、隐私政策、使用协议
✅ **免责声明** - 在 Footer 和 About 部分明确说明非官方
✅ **响应式设计** - 支持所有设备
✅ **现代技术栈** - React + TypeScript + Vite + Tailwind CSS
✅ **动画效果** - Framer Motion 流畅动画

## 更多文档

- [README.md](./README.md) - 完整项目文档
- [QUICKSTART.md](./QUICKSTART.md) - 详细快速启动指南
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 部署指南
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - 项目总结

## 需要帮助？

查看文档或联系：support@gemini3.us

祝你开发愉快！🎉
