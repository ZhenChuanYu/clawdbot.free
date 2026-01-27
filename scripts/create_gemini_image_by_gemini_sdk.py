#!/usr/bin/env python3
"""
使用 Gemini API 生成图片
"""

from google import genai
from google.genai import types
from PIL import Image


base_url = "https://aiberm.com"
api_key = "sk-TwEfV8RJLyqCxLI8Lc8w9u4HInGfWV8942gmaBmEPjQfMbw6"  # 替换为你的 API key
prompt = "第一步：请先用中文详细描述你将要生成的图片，包括：1）图片主题和内容 2）色彩搭配 3）构图设计 4）风格特点。\n\n第二步：根据你的描述生成一只可爱的小海獭图片"
model = "gemini-3-pro-image-preview"  # 使用支持的模型
output_file = "gemini_sdk_generated.png"


# 图片生成配置
response_modalities = ['TEXT', 'IMAGE']  # ['TEXT', 'IMAGE'] 或 ['IMAGE']
aspect_ratio = "16:9"  # "1:1","2:3","3:2","3:4","4:3","4:5","5:4","9:16","16:9","21:9"
image_size = "4K"  # "1K", "2K", "4K" (仅 gemini-3-pro-image-preview 支持)
use_google_search = True  # 是否使用 Google 搜索工具

# 生成参数配置
temperature = 1.0  # 温度 (0.0-2.0)，控制随机性，越高越随机
top_p = 0.95  # Top P (0.0-1.0)，核采样参数，控制多样性
max_output_tokens = 8192  # 最大输出 token (1-8192)，控制生成内容长度

# 初始化客户端
if api_key:
    client = genai.Client(
        api_key=api_key,
        http_options=types.HttpOptions(
            api_version='v1beta',
            base_url=base_url
        )
    )
else:
    client = genai.Client()

# 构建配置
config = types.GenerateContentConfig(
    response_modalities=response_modalities,
    temperature=temperature,
    top_p=top_p,
    max_output_tokens=max_output_tokens,
    system_instruction="You are a helpful assistant. 重要：你必须先用中文详细描述你将要生成的图片内容、设计理念、色彩搭配和构图思路，然后再生成图片。文字描述和图片都是必需的。",
    image_config=types.ImageConfig(
        aspect_ratio=aspect_ratio,
        image_size=image_size if "pro-image" in model else None  # 只有 pro-image 支持 image_size
    )
)

# 添加 Google 搜索工具（可选）
config.tools = [{"google_search": {}}]

# 生成图片
response = client.models.generate_content(
    model=model,
    contents=[prompt],
    config=config
)

# 输出完整的 JSON 响应
import json
import base64

def serialize_response(obj):
    """自定义序列化函数，处理 bytes 类型"""
    if isinstance(obj, bytes):
        encoded = base64.b64encode(obj).decode('utf-8')
        if len(encoded) > 50:
            return encoded[:50] + f"... (truncated, total length: {len(encoded)})"
        return encoded
    elif isinstance(obj, dict):
        return {k: serialize_response(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [serialize_response(item) for item in obj]
    else:
        return obj

print("\n=== 完整 JSON 响应 ===")
response_dict = response.model_dump()
serialized_response = serialize_response(response_dict)
print(json.dumps(serialized_response, ensure_ascii=False, indent=2))
print("=" * 50 + "\n")

# 保存图片
for part in response.parts:
    if part.text is not None:
        print(part.text)
    elif part.inline_data is not None:
        image = part.as_image()
        image.save(output_file)
        print(f"图片已保存: {output_file}")
