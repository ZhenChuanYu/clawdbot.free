const fs = require('fs');
const path = require('path');

try {
  const distPath = path.join(__dirname, '../dist');
  const generatedFiles = [];
  
  // 保留简体中文和繁体中文
  const languageMap = {
    'zh': 'zh',
    'zh-tw': 'zh-tw'
  };

  // 处理每个语言的 HTML 文件
  Object.entries(languageMap).forEach(([langCode, langDir]) => {
    const htmlFileName = `index-${langCode}.html`;
    const htmlPath = path.join(distPath, htmlFileName);
    
    if (fs.existsSync(htmlPath)) {
      const targetDir = path.join(distPath, langDir);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      const targetPath = path.join(targetDir, 'index.html');
      fs.renameSync(htmlPath, targetPath);
      generatedFiles.push(`dist/${langDir}/index.html (${langCode.toUpperCase()})`);
    } else {
      console.log(`⚠️  ${htmlFileName} not found, skipping...`);
    }
  });

  // 删除所有其他语言的 HTML 文件
  const oldLangFiles = [
    'index-es.html', 'index-ja.html', 'index-ko.html', 'index-fr.html',
    'index-de.html', 'index-pt.html', 'index-ru.html', 'index-it.html',
    'index-ar.html', 'index-hi.html', 'index-tr.html', 'index-vi.html',
    'index-th.html', 'index-id.html', 'index-nl.html', 'index-pl.html',
    'index-sv.html', 'index-no.html', 'index-da.html', 'index-fi.html',
    'index-zh-tw.html'
  ];

  oldLangFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Deleted ${file}`);
    }
  });

  // 删除旧的语言目录（不包括 zh 和 zh-tw）
  const oldLangDirs = [
    'es', 'ja', 'ko', 'fr', 'de', 'pt', 'ru', 'it', 'ar', 'hi', 'tr', 'vi',
    'th', 'id', 'nl', 'pl', 'sv', 'no', 'da', 'fi'
  ];

  oldLangDirs.forEach(dir => {
    const dirPath = path.join(distPath, dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`🗑️  Deleted directory ${dir}/`);
    }
  });
  
  // 检查主 index.html 是否存在
  const mainHtmlPath = path.join(distPath, 'index.html');
  if (fs.existsSync(mainHtmlPath)) {
    generatedFiles.push('dist/index.html (English - Main)');
  }
  
  console.log('✅ Post-build completed!');
  console.log('📄 Generated files:');
  generatedFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
  
  if (generatedFiles.length === 0) {
    console.log('⚠️  No HTML files were processed!');
  }
} catch (error) {
  console.error('❌ Post-build failed:', error.message);
  process.exit(1);
}
