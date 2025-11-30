# 统一多语言方案

## 方案概述

**只维护一套翻译文件**（`src/i18n/locales/`），HTML 模板自动从翻译文件生成。

## 工作流程

1. **维护翻译文件**：只需要维护 `src/i18n/locales/*.json` 文件
2. **构建时自动生成**：构建脚本从翻译文件读取内容，自动生成所有语言的 HTML 文件
3. **页面内容多语言化**：React 组件通过 `t()` 函数使用翻译文件

## 优势

✅ **只维护一套翻译文件**：`src/i18n/locales/`  
✅ **HTML 模板自动生成**：不需要手动维护 `html-templates/`  
✅ **消除重复工作**：SEO meta 标签和页面内容使用同一套翻译  
✅ **保持一致性**：翻译更新时，HTML 和页面内容自动同步  

## 文件结构

```
src/
└── i18n/
    └── locales/              # 唯一的翻译数据源
        ├── en.json
        ├── zh.json
        ├── es.json
        └── ...

scripts/
└── generate-html-from-i18n.js  # 从翻译文件生成 HTML

dist/                          # 构建输出
├── index.html                 # 英文（Vite 生成）
├── zh/
│   └── index.html            # 从翻译文件自动生成
└── ...
```

## 使用方法

### 更新翻译

只需要编辑 `src/i18n/locales/*.json` 文件：

```json
{
  "seo": {
    "title": "Gemini 3 | Google 最新 AI 模型",
    "description": "...",
    "keywords": "..."
  },
  "home": {
    "title": "...",
    "subtitle": "..."
  }
}
```

### 构建项目

```bash
pnpm build
```

构建过程会自动：
1. 编译 TypeScript
2. 构建 Vite 项目
3. 从翻译文件生成所有语言的 HTML 文件

## 与旧方案对比

| 特性 | 旧方案 | 新方案 |
|------|--------|--------|
| **翻译文件** | `src/i18n/locales/` | `src/i18n/locales/` |
| **HTML 模板** | `html-templates/`（手动维护） | 自动从翻译文件生成 |
| **维护工作** | 两套系统，需要同步 | 一套系统，自动同步 |
| **一致性** | 可能不一致 | 自动保持一致 |

## 迁移步骤

1. ✅ 创建新脚本 `scripts/generate-html-from-i18n.js`
2. ✅ 更新 `package.json` 构建脚本
3. ⏳ 删除 `html-templates/` 目录（可选）
4. ⏳ 删除 `scripts/copy-html-files.js`（已删除）

## 注意事项

- HTML 模板现在完全由脚本生成，不需要手动维护
- 如果需要修改 HTML 结构，编辑 `scripts/generate-html-from-i18n.js`
- 翻译内容只需要在 `src/i18n/locales/*.json` 中维护

---

**使用的模型**: Claude Sonnet 4.5

