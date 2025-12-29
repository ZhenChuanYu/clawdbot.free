/**
 * 生成社交分享图片 (Open Graph Image)
 * 使用 Sharp 库基于现有 logo 生成 1200x630 的分享图
 */
import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '../public');
const OUTPUT_PATH = join(PUBLIC_DIR, 'og-image.png');

// OG 图片标准尺寸
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOGImage() {
  console.log('🎨 开始生成 OG 图片...');

  try {
    // 使用 512.png 作为 logo
    const logoPath = join(PUBLIC_DIR, '512.png');
    
    if (!existsSync(logoPath)) {
      throw new Error('未找到 512.png 文件');
    }
    
    console.log('✓ 使用 logo: 512.png');

    // 创建背景（渐变效果用纯色代替）
    const background = await sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // 白色背景
      }
    })
    .png()
    .toBuffer();

    // 读取并调整 logo 大小
    const logo = await sharp(logoPath)
      .resize(200, 200, { fit: 'contain' })
      .toBuffer();

    // 创建文字 SVG
    const titleSvg = `
      <svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
        <style>
          .title { 
            fill: #111827; 
            font-size: 80px; 
            font-weight: bold; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .subtitle { 
            fill: #6B7280; 
            font-size: 36px; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
        </style>
        <text x="600" y="450" text-anchor="middle" class="title">Grok API</text>
        <text x="600" y="510" text-anchor="middle" class="subtitle">xAI Grok API Resources</text>
      </svg>
    `;

    // 合成最终图片
    await sharp(background)
      .composite([
        {
          input: logo,
          top: 150,
          left: Math.floor((OG_WIDTH - 200) / 2)
        },
        {
          input: Buffer.from(titleSvg),
          top: 0,
          left: 0
        }
      ])
      .png()
      .toFile(OUTPUT_PATH);

    console.log(`✅ OG 图片已生成: ${OUTPUT_PATH}`);
    console.log(`   尺寸: ${OG_WIDTH}x${OG_HEIGHT}`);
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    process.exit(1);
  }
}

generateOGImage();
