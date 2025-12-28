#!/usr/bin/env node

/**
 * IndexNow 提交新增页面脚本
 * 比较当前 sitemap 和上次提交的日志，只提交新增的 URL
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';

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
 * 从 sitemap.xml 解析所有 URL
 */
async function parseSitemap(sitemapPath) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  const result = await parseStringPromise(sitemapContent);
  
  const urls = [];
  if (result.urlset && result.urlset.url) {
    const urlArray = Array.isArray(result.urlset.url) 
      ? result.urlset.url 
      : [result.urlset.url];
    
    urlArray.forEach(urlEntry => {
      if (urlEntry.loc && urlEntry.loc[0]) {
        urls.push(urlEntry.loc[0]);
      }
    });
  }
  
  return urls;
}

/**
 * 读取上次提交的日志
 */
function getLastSubmitLog() {
  const latestLogFile = path.join(logDir, 'submit-all-latest.json');
  
  if (!fs.existsSync(latestLogFile)) {
    return null;
  }

  try {
    const content = fs.readFileSync(latestLogFile, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️  无法读取上次日志: ${error.message}`);
    return null;
  }
}

/**
 * 找出新增的 URL
 */
function findNewUrls(currentUrls, lastLog) {
  if (!lastLog || !lastLog.urls || lastLog.urls.length === 0) {
    // 如果没有上次日志，返回所有 URL
    return currentUrls;
  }

  const lastUrls = new Set(lastLog.urls);
  const newUrls = currentUrls.filter(url => !lastUrls.has(url));
  
  return newUrls;
}

/**
 * 提交 URL 列表到 IndexNow
 * 使用统一 API (api.indexnow.org) 和核心提交逻辑（与 submit-indexnow.ts 保持一致）
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
    // 从第一个 URL 提取 host（与 submit-indexnow.ts 保持一致）
    const firstUrl = new URL(urls[0]);
    const host = firstUrl.hostname;

    // 验证所有 URL 的 host 是否一致（与 submit-indexnow.ts 保持一致）
    for (const urlStr of urls) {
      const url = new URL(urlStr);
      if (url.hostname !== host) {
        return { 
          success: false, 
          statusCode: 422, 
          message: `Host mismatch: ${url.hostname} !== ${host}` 
        };
      }
    }

    // 使用统一 API，不包含 keyLocation（与 submit-indexnow.ts 保持一致）
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
 * 保存提交日志（与 submit-indexnow.ts 格式保持一致）
 */
function saveLog(newUrls, allUrls, results) {
  const timestamp = new Date().toISOString();
  
  // 统一日志格式，与 submit-indexnow.ts 保持一致
  const logEntry = {
    timestamp,
    type: 'submit-new',
    totalUrls: newUrls.length,
    urls: newUrls,
    allUrls: allUrls,
    result: results.length > 0 ? {
      success: results[0].success,
      statusCode: results[0].statusCode,
      message: results[0].message,
    } : {
      success: false,
      statusCode: undefined,
      message: 'No results'
    },
    // 保留详细结果用于调试
    results: results
  };

  const logFile = path.join(logDir, `submit-new-${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify(logEntry, null, 2), 'utf-8');
  
  // 同时保存最新日志
  const latestLogFile = path.join(logDir, 'submit-new-latest.json');
  fs.writeFileSync(latestLogFile, JSON.stringify(logEntry, null, 2), 'utf-8');
  
  return logFile;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始提交新增页面到 IndexNow...\n');
  
  // 解析 sitemap
  const sitemapPath = path.resolve(rootDir, config.sitemapPath);
  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ 错误: 找不到 sitemap 文件: ${sitemapPath}`);
    process.exit(1);
  }

  console.log(`📄 读取 sitemap: ${sitemapPath}`);
  const currentUrls = await parseSitemap(sitemapPath);
  console.log(`✅ 当前 sitemap 中有 ${currentUrls.length} 个 URL\n`);

  // 读取上次提交日志
  const lastLog = getLastSubmitLog();
  if (lastLog) {
    console.log(`📝 上次提交时间: ${lastLog.timestamp}`);
    console.log(`📝 上次提交 URL 数量: ${lastLog.urls?.length || lastLog.allUrls?.length || 0}\n`);
  } else {
    console.log('📝 未找到上次提交记录，将提交所有 URL\n');
  }

  // 找出新增的 URL
  const newUrls = findNewUrls(currentUrls, lastLog);
  
  if (newUrls.length === 0) {
    console.log('✅ 没有新增的 URL，无需提交');
    process.exit(0);
  }

  console.log(`🆕 发现 ${newUrls.length} 个新增 URL:\n`);
  newUrls.forEach((url, index) => {
    console.log(`   ${index + 1}. ${url}`);
  });
  console.log('');

  // 分批提交（每次最多 10000 个 URL）
  const batchSize = 10000;
  const batches = [];
  for (let i = 0; i < newUrls.length; i += batchSize) {
    batches.push(newUrls.slice(i, i + batchSize));
  }

  const allResults = [];

  // 使用统一 API 提交（一次提交通知所有支持的搜索引擎）
  console.log(`\n🔍 提交到 IndexNow 统一 API (https://api.indexnow.org/indexnow)...`);
  console.log(`   这将通知所有支持的搜索引擎（Bing、Yandex 等）\n`);
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`   批次 ${i + 1}/${batches.length}: ${batch.length} 个 URL`);
    
    const result = await submitUrls(batch);
    allResults.push({
      batch: i + 1,
      ...result
    });

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

    // 避免请求过快，稍作延迟
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // 保存日志
  const logFile = saveLog(newUrls, currentUrls, allResults);
  console.log(`\n📝 日志已保存: ${logFile}`);

  // 统计结果
  const successCount = allResults.filter(r => r.success).length;
  const totalCount = allResults.length;
  console.log(`\n📊 提交结果: ${successCount}/${totalCount} 成功\n`);

  if (successCount === totalCount) {
    console.log('✅ 所有新增 URL 提交成功！');
    process.exit(0);
  } else {
    console.log('⚠️  部分提交失败，请查看日志');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ 发生错误:', error);
  process.exit(1);
});

