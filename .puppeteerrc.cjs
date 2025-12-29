const { join } = require('path');

/**
 * Puppeteer 配置
 * 用于 Cloudflare Pages 构建环境
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
