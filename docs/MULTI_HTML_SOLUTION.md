# 多 HTML 文件方案（折中方案）

## 方案概述

为每个语言创建独立的 HTML 模板文件，构建时自动复制到对应目录。这样：
- ✅ **无需维护复杂的预渲染脚本**：只需要简单的文件复制
- ✅ **每个语言路径都有独立的 HTML 文件**：包含正确的 meta 标签
- ✅ **SEO 友好**：爬虫可以直接读取静态 HTML 中的 meta 标签
- ✅ **维护简单**：添加新语言只需添加一个 HTML 模板文件

## 文件结构

```
├── html-templates/          # HTML 模板目录
│   ├── zh.html             # 中文模板
│   ├── es.html             # 西班牙语模板
│   ├── ja.html             # 日语模板
│   ├── ko.html             # 韩语模板
│   ├── fr.html             # 法语模板
│   └── de.html             # 德语模板
├── scripts/
│   └── copy-html-files.js  # 简单的复制脚本
└── dist/                   # 构建输出
    ├── index.html          # 英文首页（由 Vite 生成）
    ├── zh/
    │   ├── index.html      # 中文首页
    │   ├── privacy-policy/
    │   │   └── index.html
    │   └── terms-of-service/
    │       └── index.html
    └── ...                 # 其他语言
```

## 工作流程

1. **开发阶段**：在 `html-templates/` 目录维护各语言的 HTML 模板
2. **构建阶段**：
   - Vite 构建 React 应用
   - 运行 `copy-html-files.js` 脚本
   - 脚本将模板文件复制到 `dist/` 目录的对应位置

## 使用方法

### 构建项目

```bash
pnpm build
```

构建过程会自动：
1. 编译 TypeScript
2. 构建 Vite 项目
3. 复制所有语言的 HTML 文件到对应目录

### 添加新语言

1. 在 `html-templates/` 目录创建新的 HTML 模板文件（如 `pt.html`）
2. 在 `scripts/copy-html-files.js` 中添加语言代码到 `languages` 数组
3. 重新构建

### 更新 SEO 信息

直接编辑 `html-templates/` 目录中对应语言的 HTML 文件，修改：
- `<title>` 标签
- `<meta name="description">` 标签
- `<meta name="keywords">` 标签
- Open Graph 标签
- Twitter Card 标签
- hreflang 标签

## 优势

1. **维护简单**：
   - 不需要复杂的脚本逻辑
   - 每个语言的 HTML 文件独立，易于管理
   - 添加新语言只需复制模板并修改内容

2. **SEO 友好**：
   - 每个 HTML 文件包含完整的 meta 标签
   - 爬虫可以直接读取，无需执行 JavaScript
   - 包含完整的 hreflang 标签

3. **清晰明了**：
   - 文件结构清晰
   - 每个语言的文件独立
   - 易于理解和维护

## 劣势

1. **文件数量**：需要为每个语言创建 HTML 模板文件
2. **重复代码**：HTML 结构会有一些重复（但可以通过模板引擎优化）

## 与旧方案对比

| 特性 | 旧方案（预渲染脚本） | 新方案（多 HTML 文件） |
|------|-------------------|---------------------|
| **维护成本** | 高（需要维护复杂脚本） | 低（只需维护 HTML 文件） |
| **添加新语言** | 需要修改脚本 | 只需添加 HTML 文件 |
| **更新 SEO** | 需要修改脚本和翻译文件 | 直接编辑 HTML 文件 |
| **可读性** | 低（脚本逻辑复杂） | 高（HTML 文件直观） |
| **灵活性** | 中等（受脚本限制） | 高（完全控制 HTML） |

## 最佳实践

1. **保持模板同步**：确保所有语言的 HTML 模板结构一致
2. **使用版本控制**：将 `html-templates/` 目录纳入版本控制
3. **定期检查**：定期检查各语言的 meta 标签是否正确
4. **测试验证**：构建后验证各语言版本的 HTML 文件

## 未来优化

如果需要进一步简化，可以考虑：
1. 使用模板引擎（如 Handlebars）减少重复代码
2. 从翻译文件自动生成 HTML（但会增加复杂度）
3. 使用构建工具插件自动处理

---

**使用的模型**: Claude Sonnet 4.5
