# Cloudflare Pages 构建配置确认

## ✅ 构建命令

在 Cloudflare Pages 中使用的构建命令：
```
pnpm run build
```

或者（两者等价）：
```
pnpm build
```

## 📋 构建流程

`pnpm build` 会执行以下步骤：

1. **TypeScript 类型检查**：`tsc`
   - 检查 TypeScript 类型错误
   - 如果类型错误，构建会失败

2. **Vite 构建**：`vite build`
   - 编译 React 应用
   - 生成优化的生产文件到 `dist/` 目录
   - 代码分割和压缩

3. **后处理脚本**：`node scripts/post-build.cjs`
   - 处理多语言 HTML 文件
   - 将 `index-{lang}.html` 移动到 `dist/{lang}/index.html`

## 🔧 Cloudflare Pages 配置

### 基本设置

```
框架预设: Vite
构建命令: pnpm run build
构建输出目录: dist
根目录: /
```

### 环境变量（可选）

```
NODE_VERSION = 18
```

或者使用 `.node-version` 文件（已存在）

### 安装命令（可选）

如果需要，可以添加：
```
pnpm install --frozen-lockfile
```

## ⚠️ 注意事项

### 1. post-build.cjs 脚本

`scripts/post-build.cjs` 使用 CommonJS (`require`)，这在 Node.js 环境中完全支持。

### 2. 构建时间

完整构建通常需要 2-3 分钟：
- TypeScript 检查：~10-20 秒
- Vite 构建：~30-60 秒
- 后处理：~5-10 秒

### 3. 构建日志

如果构建失败，检查 Cloudflare Pages 的构建日志：
- 查看是否有 TypeScript 错误
- 查看是否有文件路径问题
- 查看 post-build.cjs 是否执行成功

## 🚀 验证构建

构建成功后，`dist/` 目录应包含：

```
dist/
├── index.html              # 英文首页
├── assets/
│   ├── main-*.css         # CSS 文件
│   ├── main-*.js          # 主 JS 文件
│   ├── react-vendor-*.js  # React 库
│   ├── i18n-vendor-*.js   # i18n 库
│   └── ui-vendor-*.js     # UI 库
├── zh/
│   └── index.html         # 中文首页
├── es/
│   └── index.html         # 西班牙语首页
└── ... (其他语言)
```

## 🔍 故障排除

### 构建失败

1. **TypeScript 错误**
   - 检查 `tsc` 输出
   - 修复类型错误

2. **Vite 构建失败**
   - 检查依赖是否完整
   - 检查 `vite.config.ts` 配置

3. **post-build.cjs 失败**
   - 检查文件路径
   - 检查文件权限
   - 查看错误日志

### 部署后问题

1. **404 错误**
   - 检查 `public/_redirects` 文件
   - 确认路由配置正确

2. **资源加载失败**
   - 检查资源路径
   - 检查 `_headers` 文件

3. **样式不显示**
   - 清除浏览器缓存
   - 检查 CSS 文件是否正确加载

