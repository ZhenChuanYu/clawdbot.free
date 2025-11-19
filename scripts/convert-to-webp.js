import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 源文件路径
const sourceFile = join(__dirname, '..', 'public', '128.png')
// 输出文件路径
const outputFile = join(__dirname, '..', 'public', '128.webp')

async function convertToWebp() {
  try {
    // 检查源文件是否存在
    if (!existsSync(sourceFile)) {
      console.error(`错误: 源文件不存在: ${sourceFile}`)
      process.exit(1)
    }

    console.log(`正在转换: ${sourceFile}`)
    console.log(`输出到: ${outputFile}`)

    // 使用 sharp 转换图片
    await sharp(sourceFile)
      .webp({ quality: 90 }) // 设置 WebP 质量 (0-100)
      .toFile(outputFile)

    console.log('✅ 转换成功!')
    console.log(`源文件已保留: ${sourceFile}`)
    console.log(`WebP 文件已创建: ${outputFile}`)
  } catch (error) {
    console.error('❌ 转换失败:', error.message)
    process.exit(1)
  }
}

convertToWebp()

