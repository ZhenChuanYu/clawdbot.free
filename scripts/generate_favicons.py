#!/usr/bin/env python3
"""
Favicon 生成脚本
从 logo 原图生成所有需要的 favicon 格式文件

依赖: pip install Pillow cairosvg

输入: public/logo-original.png (1024x1024 正方形图片)
输出:
  - public/favicon.ico (16x16, 32x32, 48x48 多尺寸)
  - public/favicon-96x96.png
  - public/apple-touch-icon.png (180x180)
  - public/web-app-manifest-192x192.png
  - public/web-app-manifest-512x512.png
  - public/512.png
  - public/logo.png (用于 JSON-LD)
"""

import os
from PIL import Image

# 配置
INPUT_FILE = "public/logo-original.png"
OUTPUT_DIR = "public"

# 需要生成的 PNG 尺寸
PNG_SIZES = {
    "favicon-96x96.png": 96,
    "apple-touch-icon.png": 180,
    "web-app-manifest-192x192.png": 192,
    "web-app-manifest-512x512.png": 512,
    "512.png": 512,
    "logo.png": 512,  # 用于 JSON-LD schema
}

# ICO 文件包含的尺寸
ICO_SIZES = [16, 32, 48]


def resize_image(img, size):
    """高质量缩放图片"""
    return img.resize((size, size), Image.Resampling.LANCZOS)


def generate_png_files(img):
    """生成各种尺寸的 PNG 文件"""
    print("\n生成 PNG 文件...")
    
    for filename, size in PNG_SIZES.items():
        output_path = os.path.join(OUTPUT_DIR, filename)
        resized = resize_image(img, size)
        
        # 确保有 alpha 通道
        if resized.mode != 'RGBA':
            resized = resized.convert('RGBA')
        
        resized.save(output_path, 'PNG', optimize=True)
        print(f"  ✓ {filename} ({size}x{size})")


def generate_ico_file(img):
    """生成 ICO 文件（包含多个尺寸）"""
    print("\n生成 ICO 文件...")
    
    output_path = os.path.join(OUTPUT_DIR, "favicon.ico")
    
    # 确保原图是 RGBA 模式
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # 直接使用原图保存，指定所有需要的尺寸
    # Pillow 会自动为每个尺寸创建缩放版本
    img.save(
        output_path,
        format='ICO',
        sizes=[(size, size) for size in ICO_SIZES]
    )
    
    print(f"  ✓ favicon.ico ({', '.join(f'{s}x{s}' for s in ICO_SIZES)})")


def generate_svg_placeholder():
    """生成 SVG 占位文件（需要手动设计或使用矢量工具）"""
    print("\n生成 SVG 文件...")
    
    # 创建一个简单的 SVG 占位符
    # 实际使用时建议用矢量设计工具重新设计
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#050810"/>
  <circle cx="50" cy="40" r="25" fill="#FF4D4D"/>
  <rect x="35" y="55" width="30" height="8" rx="4" fill="#FF4D4D"/>
  <circle cx="40" cy="35" r="5" fill="#050810"/>
  <circle cx="60" cy="35" r="5" fill="#050810"/>
</svg>'''
    
    output_path = os.path.join(OUTPUT_DIR, "favicon.svg")
    with open(output_path, 'w') as f:
        f.write(svg_content)
    
    print(f"  ✓ favicon.svg (占位符 - 建议使用矢量工具重新设计)")


def main():
    print("=" * 50)
    print("Favicon 生成脚本")
    print("=" * 50)
    
    # 检查输入文件
    if not os.path.exists(INPUT_FILE):
        print(f"\n✗ 错误: 找不到输入文件 {INPUT_FILE}")
        print("请先运行 create_clawd_bot_logo.py 生成 logo 原图")
        return False
    
    # 加载原图
    print(f"\n加载原图: {INPUT_FILE}")
    img = Image.open(INPUT_FILE)
    print(f"  原图尺寸: {img.size[0]}x{img.size[1]}")
    print(f"  颜色模式: {img.mode}")
    
    # 确保是 RGBA 模式
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # 生成各种格式
    generate_png_files(img)
    generate_ico_file(img)
    generate_svg_placeholder()
    
    print("\n" + "=" * 50)
    print("✓ 所有 favicon 文件生成完成!")
    print("=" * 50)
    
    print("\n生成的文件列表:")
    for filename in list(PNG_SIZES.keys()) + ["favicon.ico", "favicon.svg"]:
        filepath = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"  - {filename} ({size:,} bytes)")
    
    return True


if __name__ == "__main__":
    main()

