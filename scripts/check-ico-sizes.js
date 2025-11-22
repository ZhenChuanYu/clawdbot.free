import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 检查 .ico 文件中包含的图标尺寸
 * @param {string} icoFilePath - .ico 文件的路径
 */
function checkIcoSizes(icoFilePath) {
    try {
        // 读取文件
        const buffer = fs.readFileSync(icoFilePath);

        // 检查文件头 (前4个字节应该是 0, 0, 1, 0)
        if (buffer[0] !== 0 || buffer[1] !== 0 || buffer[2] !== 1 || buffer[3] !== 0) {
            console.error('❌ 这不是一个有效的 .ico 文件');
            return;
        }

        // 读取图标数量 (第5-6字节，小端序)
        const iconCount = buffer.readUInt16LE(4);

        console.log(`\n📁 文件: ${path.basename(icoFilePath)}`);
        console.log(`📊 包含 ${iconCount} 个尺寸的图标\n`);
        console.log('详细信息:');
        console.log('─'.repeat(60));

        // 遍历每个图标的目录条目
        for (let i = 0; i < iconCount; i++) {
            const offset = 6 + (i * 16); // 每个目录条目16字节

            // 读取宽度和高度 (0表示256)
            let width = buffer[offset];
            let height = buffer[offset + 1];

            if (width === 0) width = 256;
            if (height === 0) height = 256;

            // 读取颜色数量
            const colorCount = buffer[offset + 2];

            // 读取保留字节
            const reserved = buffer[offset + 3];

            // 读取颜色平面数
            const colorPlanes = buffer.readUInt16LE(offset + 4);

            // 读取每像素位数
            const bitsPerPixel = buffer.readUInt16LE(offset + 6);

            // 读取图像数据大小
            const imageSize = buffer.readUInt32LE(offset + 8);

            // 读取图像数据偏移
            const imageOffset = buffer.readUInt32LE(offset + 12);

            console.log(`图标 #${i + 1}:`);
            console.log(`  尺寸: ${width} × ${height} 像素`);
            console.log(`  颜色深度: ${bitsPerPixel} 位`);
            console.log(`  数据大小: ${(imageSize / 1024).toFixed(2)} KB`);

            if (i < iconCount - 1) {
                console.log('─'.repeat(60));
            }
        }

        console.log('─'.repeat(60));
        console.log(`\n✅ 分析完成！\n`);

    } catch (error) {
        console.error('❌ 读取文件时出错:', error.message);
    }
}

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length === 0) {
    // 默认检查 scripts\favicon (17).ico
    const defaultPath = path.join(__dirname, 'favicon (17).ico');
    console.log('使用默认文件路径:', defaultPath);
    checkIcoSizes(defaultPath);
} else {
    // 使用用户提供的路径
    const icoPath = path.resolve(args[0]);
    checkIcoSizes(icoPath);
}
