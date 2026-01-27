#!/usr/bin/env python3
"""
使用 OpenAI SDK 调用 Gemini API 生成图片
"""

from openai import OpenAI
import json
import base64
import re
from pathlib import Path

# # 配置
# base_url = "https://aiberm.com/v1"
# api_key = "sk-TwEfV8RJLyqCxLI8Lc8w9u4HInGfWV8942gmaBmEPjQfMbw6"
# model = "gemini-3-pro-image-preview"
# output_file = "openai_generated_image.png"

# 配置
base_url = "https://dev.aiberm.com/v1"
api_key = "sk-ZizP7psfoXzppTtoWC0cvmrmoylXkiacDjoN6TGPFfy29OKI"
model = "gemini-3-pro-image-preview"
output_file = "openai_generated_image.png"


# 初始化 OpenAI 客户端
client = OpenAI(
    api_key=api_key,
    base_url=base_url
)

# 发送请求
print(f"正在请求: {base_url}/chat/completions")
print(f"模型: {model}\n")

response = client.chat.completions.create(
    model=model,
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "生成一只可爱的小海獭图片"
        }
    ],
    extra_body={
        "google": {
            "image_config": {
                "aspect_ratio": "1:1",
                "image_size": "2K"
            }
        }
    }
)

# 截断长字符串的函数
def truncate_long_strings(obj, max_length=50):
    """递归截断长字符串"""
    if isinstance(obj, dict):
        return {k: truncate_long_strings(v, max_length) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [truncate_long_strings(item, max_length) for item in obj]
    elif isinstance(obj, str) and len(obj) > 100:
        return obj[:max_length] + f"... (truncated, total length: {len(obj)})"
    else:
        return obj

# 输出完整 JSON 响应（截断长字符串）
print("=== 完整 JSON 响应 (图片数据已截断) ===")
response_dict = response.model_dump()
truncated_response = truncate_long_strings(response_dict)
print(json.dumps(truncated_response, ensure_ascii=False, indent=2))
print("=" * 50 + "\n")

# 提取内容
if response.choices and len(response.choices) > 0:
    choice = response.choices[0]
    message = choice.message
    
    if message.content:
        content = message.content
        print(f"🔍 调试信息:")
        print(f"   内容长度: {len(content)}")
        print(f"   内容前100字符: {content[:100]}")
        print(f"   是否包含 '![': {'!['  in content}")
        print(f"   是否包含 'data:image': {'data:image' in content}\n")
        
        # 检查是否包含 Markdown 格式的 base64 图片
        # 格式: ![image](data:image/jpeg;base64,...)
        markdown_image_match = re.search(r'!\[.*?\]\(data:image/[^;]+;base64,([^)]+)\)', content)
        
        if markdown_image_match:
            base64_data = markdown_image_match.group(1)
            print(f"✅ 检测到 Markdown 格式的 base64 图片数据")
            print(f"   Base64 数据长度: {len(base64_data)}")
            
            # 保存图片
            try:
                image_bytes = base64.b64decode(base64_data)
                output_path = Path(output_file)
                output_path.write_bytes(image_bytes)
                
                print(f"✅ 图片已保存: {output_file}")
                print(f"   图片大小: {len(image_bytes)} 字节")
                print(f"   保存路径: {output_path.absolute()}\n")
            except Exception as e:
                print(f"❌ 保存图片失败: {e}\n")
                import traceback
                traceback.print_exc()
        else:
            print(f"❌ 未匹配到 Markdown 图片格式")
            print(f"   尝试其他匹配方式...\n")
            
            # 尝试更宽松的匹配
            loose_match = re.search(r'data:image/[^;]+;base64,([A-Za-z0-9+/=]+)', content)
            if loose_match:
                base64_data = loose_match.group(1)
                print(f"✅ 使用宽松匹配检测到 base64 图片数据")
                print(f"   Base64 数据长度: {len(base64_data)}")
                
                try:
                    image_bytes = base64.b64decode(base64_data)
                    output_path = Path(output_file)
                    output_path.write_bytes(image_bytes)
                    
                    print(f"✅ 图片已保存: {output_file}")
                    print(f"   图片大小: {len(image_bytes)} 字节")
                    print(f"   保存路径: {output_path.absolute()}\n")
                except Exception as e:
                    print(f"❌ 保存图片失败: {e}\n")
                    import traceback
                    traceback.print_exc()
            else:
                print(f"❌ 也未匹配到宽松格式")
                print(f"   内容预览: {content[:300]}...\n")
    else:
        print("⚠️  响应中未找到文本内容\n")
else:
    print("❌ 响应中未找到内容\n")
