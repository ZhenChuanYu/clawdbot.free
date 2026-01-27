# IndexNow 提交脚本

## 概述

本目录包含用于向 IndexNow 提交网站 URL 的脚本和配置。

## 文件结构

```
indexnow/
├── config.json          # IndexNow 配置（key、host、搜索引擎等）
├── scripts/
│   ├── submit-all.js   # 提交全部页面脚本
│   └── submit-new.js   # 提交新增页面脚本
└── logs/               # 提交日志目录
```

## 配置

编辑 `config.json` 来配置：

- `key`: IndexNow key（必须与 key 文件中的 key 一致）
- `host`: 网站域名
- `keyLocation`: key 文件的完整 URL
- `searchEngines`: 搜索引擎列表（Bing、Yandex 等）
- `sitemapPath`: sitemap.xml 文件路径
- `logDir`: 日志目录路径

## 使用方法

### 1. 提交全部页面

```bash
pnpm run indexnow:submit-all
```

或直接运行：

```bash
node indexnow/scripts/submit-all.js
```

此脚本会：
- 从 `sitemap.xml` 读取所有 URL
- 提交到配置的所有搜索引擎
- 保存提交日志到 `logs/submit-all-{timestamp}.json`
- 同时保存最新日志到 `logs/submit-all-latest.json`

### 2. 提交新增页面

```bash
pnpm run indexnow:submit-new
```

或直接运行：

```bash
node indexnow/scripts/submit-new.js
```

此脚本会：
- 从 `sitemap.xml` 读取当前所有 URL
- 读取上次提交的日志（`logs/submit-all-latest.json`）
- 比较并找出新增的 URL
- 只提交新增的 URL
- 保存提交日志到 `logs/submit-new-{timestamp}.json`
- 同时保存最新日志到 `logs/submit-new-latest.json`

## 日志格式

### submit-all 日志

```json
{
  "timestamp": "2025-01-01T00:00:00.000Z",
  "type": "submit-all",
  "totalUrls": 5,
  "urls": ["https://clawd-bot.com/", ...],
  "results": [
    {
      "searchEngine": "Bing",
      "batch": 1,
      "success": true,
      "status": 200,
      "statusText": "OK"
    }
  ]
}
```

### submit-new 日志

```json
{
  "timestamp": "2025-01-01T00:00:00.000Z",
  "type": "submit-new",
  "newUrlsCount": 2,
  "totalUrlsCount": 5,
  "newUrls": ["https://clawd-bot.com/new-page"],
  "allUrls": ["https://clawd-bot.com/", ...],
  "results": [...]
}
```

## 注意事项

1. **Key 文件**: 确保 key 文件已部署到网站根目录，可通过 `https://clawd-bot.com/{key}.txt` 访问
2. **批量限制**: 每次最多提交 10,000 个 URL
3. **请求频率**: 脚本会在批次之间添加 500ms 延迟，避免请求过快
4. **日志记录**: 所有提交都会记录时间戳，方便追踪和调试

## 响应码说明

- `200 OK`: URL 提交成功
- `202 Accepted`: URL 已接收，key 验证待处理
- `400 Bad Request`: 请求格式无效
- `403 Forbidden`: Key 无效（未找到 key 文件或 key 不匹配）
- `422 Unprocessable Entity`: URL 不属于该 host 或 key 不匹配协议
- `429 Too Many Requests`: 请求过于频繁（可能被视为垃圾信息）

## 参考

- [IndexNow 官方文档](https://www.indexnow.org/documentation)
- [IndexNow FAQ](https://www.indexnow.org/faq)

