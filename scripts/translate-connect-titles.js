const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'en', 'contact', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix activeTitle and activeMajor
content = content.replace(
  'activeTitle = sub.name;',
  'activeTitle = sub.enName || sub.name;'
);
content = content.replace(
  'activeMajor = major.name;',
  'activeMajor = major.enName || major.name;'
);

// 2. Fix sidebar grandContact name
content = content.replace(
  '{grandContact?.name}',
  '{grandContact?.enName || grandContact?.name}'
);

// 3. Fix sidebar major.name
content = content.replace(
  '{major.name}',
  '{major.enName || major.name}'
);

// 4. Fix sidebar sub.name inside the map
content = content.replace(
  /\{sub\.name\}(\s*<\/Link>)/,
  '{sub.enName || sub.name}$1'
);

// Fix the header grandContact name too (the one in "CONNECT / 뉴스룸")
// Actually, I already replaced '{grandContact?.name}' so it replaces both! Wait, grandContact doesn't have an enName in navigationData? Let's check.
// In navigationData, Connect has enName: 'Connect'. It's already 'Connect' but it's fine.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed titles in English contact page!');
