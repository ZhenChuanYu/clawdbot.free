#!/usr/bin/env python3
"""
ClawdBot Logo 生成脚本
使用 GPT Image 1.5 生成极简风格的正方形 logo

生成的 logo 将保存到 public/logo-original.png
"""

import base64
from openai import OpenAI

# 配置
base_url = "https://aiberm.com/v1"
api_key = "sk-TwEfV8RJLyqCxLI8Lc8w9u4HInGfWV8942gmaBmEPjQfMbw6"

client = OpenAI(api_key=api_key, base_url=base_url)


def generate_logo(output_path="public/logo-original.png"):
    """生成 ClawdBot logo"""
    
    # Logo 设计提示词：极简风格、扁平化、龙虾主题
    prompt = """Design a minimalist, flat-style square logo featuring a stylized LOBSTER for "ClawdBot" brand.

Requirements:
- Extremely simple and clean lobster silhouette design
- Flat design style, no gradients or 3D effects
- Use a cute, friendly, cartoon-style lobster icon
- Primary color: bright coral red (#FF4D4D) on dark navy background (#050810)
- The lobster icon should be centered and fill about 65% of the canvas
- No text, just the lobster icon/symbol
- Should work well at small sizes (16x16 favicon)
- Modern, tech-forward aesthetic
- The lobster should look friendly and approachable, not realistic
- Simple geometric shapes, minimal details
- Similar style to emoji 🦞 but more stylized and logo-friendly

Style reference: Think of app icons like Discord mascot or Twitter bird - simple, bold, instantly recognizable silhouette."""

    print("正在生成 ClawdBot logo...")
    print(f"API: {base_url}")
    print("请求中...")
    
    try:
        response = client.images.generate(
            model="gpt-image-1.5",
            prompt=prompt,
            size="1024x1024",
            quality="high",
            n=1,
            response_format="b64_json"
        )
        
        print("✓ 收到响应")
        
        # 保存图片
        image_data = response.data[0].b64_json
        with open(output_path, "wb") as f:
            f.write(base64.b64decode(image_data))
        
        print(f"✓ Logo 已保存: {output_path}")
        
        if hasattr(response.data[0], 'revised_prompt') and response.data[0].revised_prompt:
            print(f"\n修订提示词: {response.data[0].revised_prompt}")
        
        return output_path
        
    except Exception as e:
        print(f"✗ 生成失败: {e}")
        return None


if __name__ == "__main__":
    generate_logo()

