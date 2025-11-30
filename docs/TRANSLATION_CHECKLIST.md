# 翻译完整性检查清单

## ✅ 已完成的翻译键

### Common (通用)
- ✅ home, features, capabilities, getStarted
- ✅ privacy, terms
- ✅ loading, error, back, copy, regenerate
- ✅ thinking, backToHome

### Home Page
- ✅ title, subtitle, description, badge
- ✅ placeholder, continuePlaceholder
- ✅ viewCapabilities
- ✅ featuresTitle, featuresSubtitle
- ✅ capabilitiesTitle, capabilitiesSubtitle
- ✅ aboutTitle, aboutDescription, aboutNotice
- ✅ ctaTitle, ctaDescription
- ✅ startConversation, loadingChatInterface
- ✅ stats (lmArenaElo, tokenContext, sweBench, gpqaDiamond)
- ✅ features (6个功能的title和description)
- ✅ capabilities (4个类别的title和metrics)

### Footer
- ✅ brandDescription
- ✅ officialGoogle, legal, community
- ✅ communityDescription
- ✅ copyright, poweredBy

### Chat
- ✅ copied, copyFailed
- ✅ typeMessage, startConversation

### SEO
- ✅ title, description, keywords

## ⚠️ 需要补充的语言

以下语言文件需要添加上述所有翻译键：

1. **es.json** (西班牙语) - 需要补充
2. **ja.json** (日语) - 需要补充
3. **ko.json** (韩语) - 需要补充
4. **fr.json** (法语) - 需要补充
5. **de.json** (德语) - 需要补充

## 📝 翻译键结构

```json
{
  "common": { ... },
  "home": {
    "stats": { ... },
    "features": {
      "reasoning": { "title": "...", "description": "..." },
      "context": { "title": "...", "description": "..." },
      "coding": { "title": "...", "description": "..." },
      "multimodal": { "title": "...", "description": "..." },
      "leader": { "title": "...", "description": "..." },
      "safety": { "title": "...", "description": "..." }
    },
    "capabilities": {
      "reasoning": { "title": "...", "metrics": { ... } },
      "coding": { "title": "...", "metrics": { ... } },
      "multimodal": { "title": "...", "metrics": { ... } },
      "safety": { "title": "...", "metrics": { ... } }
    }
  },
  "footer": { ... },
  "chat": { ... },
  "seo": { ... }
}
```

## 🔍 检查方法

1. 对比 `en.json` 和 `zh.json` 的键结构
2. 确保所有语言文件都有相同的键
3. 使用 JSON Schema 验证器检查结构一致性

## 📌 注意事项

- 所有语言文件必须包含相同的键结构
- 如果某个键在某种语言中不需要翻译（如品牌名），可以保持英文
- 确保翻译准确且符合目标语言的文化习惯

