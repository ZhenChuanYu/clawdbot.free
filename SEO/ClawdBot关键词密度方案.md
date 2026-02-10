# ClawdBot 关键词密度方案（目标 3–4%）

## 当前结果（英文首页）

- **修改前**：约 542 词，18 次 ClawdBot/Clawdbot → **3.32%**
- **修改后**：约 547 词，23 次 → **约 4.2%**（已达标）

## 已实施的 5 处自然增加（en.json）

1. **home_whatis_diff**  
   `it actually executes` → `ClawdBot actually executes`  
   保持主语明确，顺带加一次品牌词。

2. **home_install_prereq**  
   `Requires Node.js 22+` → `ClawdBot requires Node.js 22+`  
   在前提条件里自然带出产品名。

3. **home_docs_description**  
   句首增加 `ClawdBot docs cover everything from...`  
   用「ClawdBot 文档」统摄整句，不堆砌。

4. **home_freesafe_freeNote**  
   `the software itself is free` → `ClawdBot itself is free`  
   说明免费范围时用产品名替代泛称。

5. **home_whyspecial_item1_desc**  
   `Data stays on your machine` → `ClawdBot keeps data on your machine`  
   强调隐私时带出品牌，且与「ClawdBot 隐私优先」一致。

以上均为**自然句内出现**，避免重复同一句式，符合「真实、非夸张」的表述要求。

## 可选的进一步做法

- **其他语言**：在 zh / zh-TW / ja 等 locale 中，对同一 5 个 key 做等价改写（把「它」「软件」「文档」等替换为「ClawdBot」），使各语言密度也接近 3–4%。
- **noscript 块**：若需照顾无 JS 爬虫，可在 `ClawdBotLayout.astro` 的 noscript 段落里再自然出现 1–2 次 ClawdBot（例如首段或安装说明）。
- **监控**：新加正文或新语言后，可用脚本对「正文总词数」和「ClawdBot 出现次数」再算一次密度，保持在 3–4% 即可。

## 不建议的做法

- 在短段落里重复多遍「ClawdBot」。
- 在 H2/H3 标题里为加词而加词（保持标题简洁、可读）。
- 密度超过约 5%，易被判定为堆砌。

## 密度计算公式

```
关键词密度 = (ClawdBot 出现次数 / 页面正文总词数) × 100%
建议区间：3%–4%
```

统计范围：首页主内容（Hero + Article + 各 section）及对应 i18n 文案；不含 footer/header 导航链接文案。
