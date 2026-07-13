const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'SubmenuTabBar.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Add basePath to SubmenuTabBar
content = content.replace(
  "const isEnglish = pathname ? pathname.startsWith('/en') : false;",
  "const isEnglish = pathname ? pathname.startsWith('/en') : false;\n  const basePath = isEnglish ? '/en' : '';"
);

// Prepend basePath to href
content = content.replace(
  "href={sub.link}",
  "href={`${basePath}${sub.link}`}"
);

fs.writeFileSync(targetFile, content);
console.log('SubmenuTabBar.tsx links fixed.');
