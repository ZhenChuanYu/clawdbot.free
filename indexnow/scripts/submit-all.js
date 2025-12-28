#!/usr/bin/env node

/**
 * IndexNow 提交全部页面脚本
 * 从 sitemap.xml 读取所有 URL 并提交到 IndexNow
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
 * 提交 URL 列表到 IndexNow
 */
async function submitToIndexNow(urls, searchEngine) {
  const payload = {
    host: config.host,
    key: config.key,
    keyLocation: config.keyLocation,
    urlList: urls
  };

  try {
    const response = await fetch(searchEngine.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const status = response.status;
    const statusText = response.statusText;
    let responseBody = '';
    
    try {
      responseBody = await response.text();
    } catch (e) {
      // 忽略响应体解析错误
    }

    return {
      success: status === 200 || status === 202,
      status,
      statusText,
      responseBody
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 保存提交日志
 */
function saveLog(urls, results) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    type: 'submit-all',
    totalUrls: urls.length,
    urls: urls,
    results: results
  };

  const logFile = path.join(logDir, `submit-all-${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify(logEntry, null, 2), 'utf-8');
  
  // 同时保存最新日志
  const latestLogFile = path.join(logDir, 'submit-all-latest.json');
  fs.writeFileSync(latestLogFile, JSON.stringify(logEntry, null, 2), 'utf-8');
  
  return logFile;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始提交全部页面到 IndexNow...\n');
  
  // 解析 sitemap
  const sitemapPath = path.resolve(rootDir, config.sitemapPath);
  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ 错误: 找不到 sitemap 文件: ${sitemapPath}`);
    process.exit(1);
  }

  console.log(`📄 读取 sitemap: ${sitemapPath}`);
  const urls = await parseSitemap(sitemapPath);
  console.log(`✅ 找到 ${urls.length} 个 URL\n`);

  if (urls.length === 0) {
    console.log('⚠️  没有找到任何 URL，退出');
    process.exit(0);
  }

  // 显示 URL 列表
  console.log('📋 URL 列表:');
  urls.forEach((url, index) => {
    console.log(`   ${index + 1}. ${url}`);
  });
  console.log('');

  // 分批提交（每次最多 10000 个 URL）
  const batchSize = 10000;
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  const allResults = [];

  // 提交到每个搜索引擎
  for (const searchEngine of config.searchEngines) {
    console.log(`\n🔍 提交到 ${searchEngine.name} (${searchEngine.url})...`);
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`   批次 ${i + 1}/${batches.length}: ${batch.length} 个 URL`);
      
      const result = await submitToIndexNow(batch, searchEngine);
      allResults.push({
        searchEngine: searchEngine.name,
        batch: i + 1,
        ...result
      });

      if (result.success) {
        console.log(`   ✅ 成功: ${result.status} ${result.statusText}`);
      } else {
        console.log(`   ❌ 失败: ${result.status || 'Error'} ${result.statusText || result.error}`);
        if (result.responseBody) {
          console.log(`   响应: ${result.responseBody}`);
        }
      }

      // 避免请求过快，稍作延迟
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  // 保存日志
  const logFile = saveLog(urls, allResults);
  console.log(`\n📝 日志已保存: ${logFile}`);

  // 统计结果
  const successCount = allResults.filter(r => r.success).length;
  const totalCount = allResults.length;
  console.log(`\n📊 提交结果: ${successCount}/${totalCount} 成功\n`);

  if (successCount === totalCount) {
    console.log('✅ 所有提交成功！');
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

