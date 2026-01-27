# Clawd.bot 网站 UI 风格分析

**分析日期**: 2025-01-27  
**网站地址**: https://clawd.bot

## 整体风格

- **设计风格**: 深色主题，现代简约风格
- **品牌定位**: AI 助手产品（Moltbot/Clawd Bot）
- **视觉特色**: 使用龙虾（🦞）作为品牌标识

## 颜色系统

### 背景色
- **深色背景**: `#050810` (rgb(5, 8, 16))
- **表面背景**: `#0a0f1a` (rgb(10, 15, 26))
- **提升背景**: `#111827` (rgb(17, 24, 39))

### 主色调
- **珊瑚红（Coral）**:
  - 亮色: `#ff4d4d` (rgb(255, 77, 77))
  - 中色: `#e63946`
  - 深色: `#991b1b`
  - 强调边框: `rgba(255, 77, 77, .3)`

- **青色（Cyan）**:
  - 亮色: `#00e5cc`
  - 中色: `#14b8a6`
  - 发光效果: `rgba(0, 229, 204, .4)`

### 文本颜色
- **主要文本**: `#f0f4ff` (rgb(240, 244, 255))
- **次要文本**: `#8892b0`
- **弱化文本**: `#5a6480`

### 边框颜色
- **微妙边框**: `rgba(136, 146, 176, .15)`
- **强调边框**: `rgba(255, 77, 77, .3)`

## 字体系统

### 字体族
- **显示字体**: `"Clash Display", system-ui, sans-serif` (用于标题)
- **正文字体**: `"Satoshi", system-ui, sans-serif` (用于正文)
- **等宽字体**: `"SF Mono", "Fira Code", "JetBrains Mono", monospace` (用于代码)

### 字体大小
- **基础字体**: `16px`
- **行高**: `25.6px` (1.6倍)
- **H1 标题**: `72px`, 字重 `700`
- **正文文本**: `17.6px`

## 布局特点

### 页面结构
1. **Hero 区域**: 
   - 主标题 "Moltbot"
   - 副标题 "THE AI THAT ACTUALLY DOES THINGS."
   - 描述文本

2. **用户评价区域**: "⟩ What People Say"
   - 展示 Twitter/X 用户评价卡片
   - 每个卡片包含用户头像、评价内容、用户名

3. **快速开始区域**: "⟩ Quick Start"
   - 安装代码块展示
   - 支持多种安装方式切换（One-liner, npm, Hackable, macOS）

4. **功能特性区域**: "⟩ What It Does"
   - 卡片式布局展示功能点
   - 每个功能包含图标、标题、描述

5. **集成展示区域**: "⟩ Works With Everything"
   - 展示支持的聊天应用和工具图标
   - 包括 WhatsApp, Telegram, Discord, Slack, Signal, iMessage 等

6. **媒体报道区域**: "⟩ Featured In"
   - 展示媒体报道卡片

7. **导航链接区域**:
   - Discord, Documentation, GitHub, ClawdHub 链接

8. **订阅区域**: "⟩ Stay in the Loop"
   - 邮件订阅表单

### 视觉元素
- **特殊符号**: 使用 `⟩` 作为章节标题前缀
- **按钮样式**: 圆角按钮，使用品牌色
- **卡片设计**: 深色背景，微妙边框，圆角
- **代码块**: 深色背景，等宽字体，复制按钮

## 交互设计

- **链接样式**: 使用品牌色（珊瑚红）作为链接颜色
- **按钮状态**: 悬停效果使用发光效果（cyan-glow）
- **响应式设计**: 支持多设备适配

## CSS 变量系统

网站使用 CSS 自定义属性（变量）来管理设计系统：

```css
--bg-deep: #050810
--bg-surface: #0a0f1a
--bg-elevated: #111827
--coral-bright: #ff4d4d
--coral-mid: #e63946
--coral-dark: #991b1b
--cyan-bright: #00e5cc
--cyan-mid: #14b8a6
--cyan-glow: rgba(0, 229, 204, .4)
--text-primary: #f0f4ff
--text-secondary: #8892b0
--text-muted: #5a6480
--border-subtle: rgba(136, 146, 176, .15)
--border-accent: rgba(255, 77, 77, .3)
--font-display: "Clash Display", system-ui, sans-serif
--font-body: "Satoshi", system-ui, sans-serif
--font-mono: "SF Mono", "Fira Code", "JetBrains Mono", monospace
```

## 设计亮点

1. **深色主题**: 使用深色背景，减少视觉疲劳，适合长时间浏览
2. **品牌色突出**: 珊瑚红作为主要强调色，青色作为辅助色
3. **层次分明**: 通过不同的背景色和边框创建视觉层次
4. **现代字体**: 使用 Clash Display 和 Satoshi 等现代字体
5. **图标系统**: 使用图标增强视觉识别
6. **社交证明**: 大量展示用户评价，增强信任感

## 技术实现

- **框架**: 现代 Web 框架（可能是 Next.js 或类似）
- **样式**: CSS 变量 + 现代 CSS 特性
- **字体**: 自定义字体（Clash Display, Satoshi）
- **图标**: SVG 图标系统

