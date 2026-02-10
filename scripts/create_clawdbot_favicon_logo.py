#!/usr/bin/env python3
"""
ClawdBot Favicon 用 Logo 生成脚本（第一步：输出正方形 logo 原图）
使用 Gemini API 生成极简、扁平化风格的正方形 logo，供后续生成 favicon 使用。

参考: scripts/create_gemini_image_by_gemini_sdk.py
输出: public/logo-original.png（正方形，建议 1024x1024 或以上）
第二步请运行: python scripts/generate_favicons.py
"""

import os
import json
import base64

# 可选：从环境变量读取，否则使用下方占位
api_key = os.environ.get("GEMINI_API_KEY") or "sk-TwEfV8RJLyqCxLI8Lc8w9u4HInGfWV8942gmaBmEPjQfMbw6"
base_url = os.environ.get("GEMINI_BASE_URL") or "https://aiberm.com"

# 输出路径（与 generate_favicons.py 的 INPUT_FILE 一致）
output_file = "public/logo-original.png"

# 设计说明：ClawdBot 品牌 - 龙虾/钳子、珊瑚红+青色、深色背景
prompt = """请按以下两步执行：

第一步（中文描述）：
请详细描述你将要生成的图片：1）主题：ClawdBot 品牌 logo，极简风格、扁平化设计；2）主体：一只简洁、易识别的龙虾或钳子造型图标，类似 🦞 但更几何化、适合做 favicon；3）色彩：主色珊瑚红 #ff4d4d，辅助色青色 #00e5cc，背景深色 #050810 或透明；4）构图：正方形画布，图标居中约占 80%，无文字；5）风格：现代、科技感、小尺寸下仍清晰可辨。

第二步（生成图片）：
根据上述描述生成一张正方形、极简扁平风格的 logo 图片。必须满足：纯正方形、无文字、适合缩小到 16x16 做网站 favicon。"""

model = "gemini-3-pro-image-preview"
response_modalities = ["TEXT", "IMAGE"]
aspect_ratio = "1:1"
image_size = "1K"


def serialize_response(obj):
    if isinstance(obj, bytes):
        encoded = base64.b64encode(obj).decode("utf-8")
        return encoded[:50] + f"... (truncated, total {len(encoded)})" if len(encoded) > 50 else encoded
    if isinstance(obj, dict):
        return {k: serialize_response(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [serialize_response(item) for item in obj]
    return obj


def main():
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("请先安装: pip install google-genai")
        return False

    if api_key == "YOUR_API_KEY":
        print("请设置环境变量 GEMINI_API_KEY 或在脚本中填写 api_key")
        return False

    client = genai.Client(
        api_key=api_key,
        http_options=types.HttpOptions(api_version="v1beta", base_url=base_url),
    )

    config = types.GenerateContentConfig(
        response_modalities=response_modalities,
        temperature=0.9,
        top_p=0.95,
        max_output_tokens=8192,
        system_instruction="You are a helpful assistant. 重要：你必须先用中文详细描述你将要生成的图片内容、设计理念、色彩搭配和构图思路，然后再生成图片。文字描述和图片都是必需的。",
        image_config=types.ImageConfig(aspect_ratio=aspect_ratio, image_size=image_size),
    )
    config.tools = [{"google_search": {}}]

    print("正在生成 ClawdBot 正方形 logo（极简扁平风格）...")
    print(f"API: {base_url} | 模型: {model} | 比例: {aspect_ratio}\n")

    response = client.models.generate_content(
        model=model,
        contents=[prompt],
        config=config,
    )

    # 打印文本描述
    for part in response.parts:
        if part.text:
            print(part.text)
        elif part.inline_data is not None:
            image = part.as_image()
            os.makedirs(os.path.dirname(output_file) or ".", exist_ok=True)
            image.save(output_file)
            print(f"\n✓ Logo 原图已保存: {output_file}")
            print("下一步运行: python scripts/generate_favicons.py 生成 favicon 各格式。")
            return True

    print("未收到图片，请检查 API 与模型是否支持生图。")
    return False


if __name__ == "__main__":
    main()
