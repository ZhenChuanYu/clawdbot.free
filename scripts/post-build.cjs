const fs = require('fs');
const path = require('path');

try {
  const distPath = path.join(__dirname, '../dist');
  const generatedFiles = [];
  
  // 语言映射
  const languageMap = {
    'zh': 'zh',
    'es': 'es',
    'ja': 'ja',
    'ko': 'ko',
    'fr': 'fr',
    'de': 'de',
    'pt': 'pt',
    'ru': 'ru',
    'it': 'it',
    'ar': 'ar',
    'hi': 'hi',
    'tr': 'tr',
    'vi': 'vi',
    'th': 'th',
    'id': 'id',
            'nl': 'nl',
            'pl': 'pl',
            'sv': 'sv', // Swedish
            'no': 'no', // Norwegian
            'da': 'da', // Danish
            'fi': 'fi', // Finnish
            'zh-tw': 'zh-tw' // Traditional Chinese
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

