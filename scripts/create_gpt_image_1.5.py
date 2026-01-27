#!/usr/bin/env python3
"""
GPT Image 1.5 图片生成脚本
官方文档: https://platform.openai.com/docs/guides/image-generation

参数:
- model: "gpt-image-1.5"
- prompt: 图片描述文本
- size: "1024x1024" | "1024x1536" | "1536x1024"
- quality: "low" | "medium" | "high"
- n: 1-10
- response_format: "b64_json" | "url"
"""

import base64
from openai import OpenAI

# 配置
base_url = "https://aiberm.com/v1"
api_key = "sk-TwEfV8RJLyqCxLI8Lc8w9u4HInGfWV8942gmaBmEPjQfMbw6"

client = OpenAI(api_key=api_key, base_url=base_url)


def generate_image(
    prompt, 
    output_prefix="output",
    size="1024x1024",  # "1024x1024" | "1024x1536" | "1536x1024"
    quality="high",  # "low" | "medium" | "high"
    n=1,  # 1-10
    response_format="b64_json"  # "b64_json" | "url"
):
    """生成图片"""
    print(f"正在生成 {n} 张图片: {prompt}")
    print(f"API: {base_url} | size={size}, quality={quality}")
    print("请求中...")
    
    try:
        response = client.images.generate(
            model="gpt-image-1.5",
            prompt=prompt,
            size=size,
            quality=quality,
            n=n,
            response_format=response_format
        )
        
        print(f"✓ 收到响应，共 {len(response.data)} 张图片")
        
        saved_files = []
        
        for idx, image_data_obj in enumerate(response.data, 1):
            if response_format == "b64_json":
                filename = f"{output_prefix}.png" if n == 1 else f"{output_prefix}_{idx}.png"
                with open(filename, "wb") as f:
                    f.write(base64.b64decode(image_data_obj.b64_json))
                print(f"✓ 图片 {idx} 已保存: {filename}")
                saved_files.append(filename)
            else:
                print(f"✓ 图片 {idx} URL: {image_data_obj.url}")
                saved_files.append(image_data_obj.url)
        
        if hasattr(response.data[0], 'revised_prompt') and response.data[0].revised_prompt:
            print(f"\n修订提示词: {response.data[0].revised_prompt}")
        
        return saved_files
        
    except Exception as e:
        print(f"✗ 失败: {e}")
        return None


if __name__ == "__main__":
    # 示例1：生成单张中等质量图片
    prompt = "一只可爱的橙色小猫坐在窗台上，阳光透过窗户洒在它身上，温馨的室内场景"
    generate_image(prompt, output_prefix="cute_cat", n=1)
    
