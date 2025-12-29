/**
 * 预渲染脚本 - 使用 Puppeteer 将 SPA 页面预渲染为静态 HTML
 * 用于 SEO 优化，让搜索引擎爬虫直接获取完整 HTML 内容
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');

// 需要预渲染的路由
const routes = [
  '/',
  '/privacy-policy',
  '/terms-of-service',
  '/zh',
  '/zh/privacy-policy',
  '/zh/terms-of-service',
  '/zh-tw',
  '/zh-tw/privacy-policy',
  '/zh-tw/terms-of-service'
];

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 8787;

// 简单的静态文件服务器
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
      
      // 处理 SPA 路由 - 如果文件不存在，返回对应的 index.html
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        // 检查是否有对应语言的 index.html
        const urlParts = req.url.split('/').filter(Boolean);
        if (urlParts[0] === 'zh') {
          filePath = path.join(DIST_DIR, 'index-zh.html');
        } else if (urlParts[0] === 'zh-tw') {
          filePath = path.join(DIST_DIR, 'index-zh-tw.html');
        } else {
          filePath = path.join(DIST_DIR, 'index.html');
        }
      }

      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
      };

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`📦 静态服务器启动: http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('🚀 开始预渲染...\n');
  
  const server = await startServer();
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const url = `http://localhost:${PORT}${route}`;
      
      console.log(`📄 预渲染: ${route}`);
      
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // 等待 React 渲染完成
      await page.waitForSelector('#root > *', { timeout: 10000 });
      
      // 额外等待确保动画和异步内容加载完成
      await new Promise(r => setTimeout(r, 1000));
      
      // 获取渲染后的 HTML
      const html = await page.content();
      
      // 确定输出路径
      let outputPath;
      if (route === '/') {
        outputPath = path.join(DIST_DIR, 'index.html');
      } else if (route === '/zh') {
        outputPath = path.join(DIST_DIR, 'index-zh.html');
      } else if (route === '/zh-tw') {
        outputPath = path.join(DIST_DIR, 'index-zh-tw.html');
      } else {
        // 创建目录结构 /privacy-policy -> /privacy-policy/index.html
        const dir = path.join(DIST_DIR, route);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        outputPath = path.join(dir, 'index.html');
      }
      
      fs.writeFileSync(outputPath, html);
      console.log(`   ✅ 已保存: ${outputPath.replace(DIST_DIR, 'dist')}`);
      
      await page.close();
    }
    
    console.log('\n🎉 预渲染完成！');
  } catch (error) {
    console.error('❌ 预渲染失败:', error);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
}

prerender();
