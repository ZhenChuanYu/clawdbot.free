#!/usr/bin/env python3
"""
使用 JSON 请求 Gemini API 生成 2K 图片
"""

import requests
import json
import base64
from pathlib import Path

# 配置
base_url = "https://aiberm.com"
api_key = "sk-TwEfV8RJLyqCxLI8Lc8w9u4HInGfWV8942gmaBmEPjQfMbw6"
model = "gemini-3-pro-image-preview"
output_file = "gemini_json_generated.png"

# 构建 JSON 请求体
request_data = {
    "generationConfig": {
        "imageConfig": {
            "aspectRatio": "1:1",
            "imageSize": "2K"
        },
        "responseModalities": [
            "TEXT",
            "IMAGE"
        ]
    },
    "systemInstruction": {
        "parts": [
            {
                "text": "You are a helpful assistant. 重要：你必须先用中文详细描述你将要生成的图片内容、设计理念、色彩搭配和构图思路，然后再生成图片。文字描述和图片都是必需的。"
            }
        ]
    },
    "contents": [
        {
            "role": "user",
            "parts": [
                {
                    "text": "第一步：请先用中文详细描述你将要生成的图片，包括：1）当前北京时间 2）适合当前时节的风景类型 3）图片的色彩搭配 4）构图设计。\n\n第二步：根据你的描述生成一张符合当前时节的风景图片，并把北京时间标注在图片右下角。"
                }
            ]
        }
    ],
    "tools": [
        {
            "googleSearch": {}
        }
    ]
}

# 设置请求头
headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": api_key
}

# 构建 API 端点（移除 base_url 末尾的斜杠，避免双斜杠）
base_url_clean = base_url.rstrip('/')
api_endpoint = f"{base_url_clean}/v1beta/models/{model}:generateContent"

print(f"正在请求: {api_endpoint}")
print(f"请求数据: {json.dumps(request_data, ensure_ascii=False, indent=2)}")

# 发送请求
try:
    response = requests.post(
        api_endpoint,
        headers=headers,
        json=request_data,
        timeout=120
    )
    
    print(f"\n响应状态码: {response.status_code}")
    print(f"响应头: {dict(response.headers)}")
    
    # 先打印原始响应文本，便于调试
    response_text = response.text
    print(f"\n原始响应内容 (前500字符): {response_text[:500]}")
    
    # 尝试解析 JSON
    try:
        result = response.json()
        
        # 截断图片 base64 数据以便查看完整 JSON 结构
        def truncate_image_data(obj):
            """递归截断图片 base64 数据"""
            if isinstance(obj, dict):
                return {k: truncate_image_data(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [truncate_image_data(item) for item in obj]
            elif isinstance(obj, str) and len(obj) > 100:
                # 如果是长字符串（可能是 base64 图片数据），截断它
                return obj[:50] + f"... (truncated, total length: {len(obj)})"
            else:
                return obj
        
        truncated_result = truncate_image_data(result)
        print(f"\n解析后的 JSON (图片数据已截断): {json.dumps(truncated_result, ensure_ascii=False, indent=2)}")
    except json.JSONDecodeError as json_err:
        print(f"\n❌ JSON 解析失败: {json_err}")
        print(f"   完整响应内容: {response_text}")
        raise
    
    response.raise_for_status()
    
    # 提取图片数据和文本内容
    if "candidates" in result and len(result["candidates"]) > 0:
        candidate = result["candidates"][0]
        if "content" in candidate and "parts" in candidate["content"]:
            image_saved = False
            text_found = False
            
            for part in candidate["content"]["parts"]:
                # 处理文本内容
                if "text" in part:
                    text_found = True
                    print(f"\n📝 文本内容:\n{part['text']}\n")
                
                # 处理图片数据
                if "inlineData" in part:
                    # 获取 base64 图片数据
                    image_data = part["inlineData"]["data"]
                    mime_type = part["inlineData"]["mimeType"]
                    
                    # 解码并保存图片
                    image_bytes = base64.b64decode(image_data)
                    output_path = Path(output_file)
                    output_path.write_bytes(image_bytes)
                    
                    image_saved = True
                    print(f"✅ 图片已保存: {output_file}")
                    print(f"   图片类型: {mime_type}")
                    print(f"   图片大小: {len(image_bytes)} 字节")
            
            if not text_found:
                print("\n⚠️  响应中未找到文本内容")
            if not image_saved:
                print("\n❌ 响应中未找到图片数据")
        else:
            print("\n❌ 响应格式不正确")
    else:
        print("\n❌ 响应中未找到 candidates")
        
except requests.exceptions.RequestException as e:
    print(f"\n❌ 请求失败: {e}")
    if hasattr(e, 'response') and e.response is not None:
        print(f"   状态码: {e.response.status_code}")
        print(f"   响应内容: {e.response.text[:1000]}")
except json.JSONDecodeError as json_err:
    print(f"\n❌ JSON 解析错误: {json_err}")
except Exception as e:
    print(f"\n❌ 未知错误: {type(e).__name__}: {e}")
