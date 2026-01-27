#!/usr/bin/env node

/**
 * IndexNow 提交首页多语言页面脚本
 * 提交所有首页多语言版本的 URL 到 IndexNow
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

// 读取配置
const configPath = path.join(rootDir, 'indexnow/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// 日志目录
const logDir = path.resolve(rootDir, config.logDir);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * 获取所有首页多语言 URL
 * 确保所有 URL 都以 / 结尾
 */
function getHomepageUrls() {
  const host = config.host;
  const baseUrl = `https://${host}`;
  
  // 所有支持的语言代码（根据 sitemap.xml 和翻译文件）
  const languages = [
    '',      // 英文（默认，根路径）
    'zh',    // 简体中文
    'zh-tw', // 繁体中文
    'de',    // 德语
    'es',    // 西班牙语
    'fr',    // 法语
    'hi',    // 印地语
    'ja',    // 日语
    'ko',    // 韩语
    'pt',    // 葡萄牙语
    'ru',    // 俄语
  ];

  const urls = languages.map(lang => {
    if (lang === '') {
      // 英文首页
      return `${baseUrl}/`;
    } else {
      // 其他语言首页，确保以 / 结尾
      return `${baseUrl}/${lang}/`;
    }
  });

  return urls;
}

/**
 * 提交 URL 列表到 IndexNow
 */
async function submitUrls(urls) {
  if (urls.length === 0) {
    return { 
      success: false, 
      statusCode: 400, 
      message: 'No URLs to submit' 
    };
  }

  try {
    // 从第一个 URL 提取 host
    const firstUrl = new URL(urls[0]);
    const host = firstUrl.hostname;

    // 验证所有 URL 的 host 是否一致
    for (const urlStr of urls) {
      const url = new URL(urlStr);
      if (url.hostname !== host) {
        return { 
          success: false, 
          statusCode: 422, 
          message: `Host mismatch: ${url.hostname} !== ${host}` 
        };
      }
      
      // 确保 URL 以 / 结尾（根路径除外，但根路径也应该是 /）
      if (!url.pathname.endsWith('/')) {
        console.warn(`⚠️  警告: URL ${urlStr} 不以 / 结尾，已自动修正`);
      }
    }

    // 使用统一 API
    const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
    
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ host, key: config.key, urlList: urls }),
    });

    const statusCode = response.status;
    const success = statusCode === 200 || statusCode === 202;

    return {
      success,
      statusCode,
      message: success ? 'Submitted successfully' : `Failed with status ${statusCode}`,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: undefined,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * 保存提交日志
 */
function saveLog(urls, result) {
  const timestamp = new Date().toISOString();
  
  const logEntry = {
    timestamp,
    type: 'submit-homepages',
    totalUrls: urls.length,
    urls: urls,
    result: result
  };

  const logFile = path.join(logDir, `submit-homepages-${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify(logEntry, null, 2), 'utf-8');
  
  // 同时保存最新日志
  const latestLogFile = path.join(logDir, 'submit-homepages-latest.json');
  fs.writeFileSync(latestLogFile, JSON.stringify(logEntry, null, 2), 'utf-8');
  
  return logFile;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始提交首页多语言页面到 IndexNow...\n');
  
  // 获取所有首页 URL
  const urls = getHomepageUrls();
  console.log(`✅ 找到 ${urls.length} 个首页 URL:\n`);
  
  // 显示并验证 URL
  urls.forEach((url, index) => {
    const urlObj = new URL(url);
    const endsWithSlash = urlObj.pathname.endsWith('/');
    const status = endsWithSlash ? '✅' : '❌';
    console.log(`   ${index + 1}. ${status} ${url}`);
    
    if (!endsWithSlash) {
      console.error(`      ⚠️  警告: 此 URL 不以 / 结尾！`);
    }
  });
  console.log('');

  // 验证所有 URL 都以 / 结尾
  const invalidUrls = urls.filter(url => {
    const urlObj = new URL(url);
    return !urlObj.pathname.endsWith('/');
  });

  if (invalidUrls.length > 0) {
    console.error(`❌ 错误: 发现 ${invalidUrls.length} 个不以 / 结尾的 URL:`);
    invalidUrls.forEach(url => console.error(`   - ${url}`));
    console.error('\n请确保所有首页 URL 都以 / 结尾！');
    process.exit(1);
  }

  // 提交 URL
  console.log(`\n🔍 提交到 IndexNow 统一 API (https://api.indexnow.org/indexnow)...`);
  console.log(`   这将通知所有支持的搜索引擎（Bing、Yandex 等）\n`);
  
  const result = await submitUrls(urls);

  if (result.success) {
    console.log(`   ✅ 成功: ${result.statusCode} ${result.message}`);
    if (result.statusCode === 200) {
      console.log(`   ✨ 状态码 200 - 提交已立即处理`);
    } else if (result.statusCode === 202) {
      console.log(`   ⏳ 状态码 202 - 提交已接收，key 验证待处理`);
    }
  } else {
    console.log(`   ❌ 失败: ${result.statusCode || 'Error'} ${result.message}`);
  }

  // 保存日志
  const logFile = saveLog(urls, result);
  console.log(`\n📝 日志已保存: ${logFile}`);

  if (result.success) {
    console.log('\n✅ 首页多语言 URL 提交成功！');
    process.exit(0);
  } else {
    console.log('\n⚠️  提交失败，请查看日志');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ 发生错误:', error);
  process.exit(1);
});


