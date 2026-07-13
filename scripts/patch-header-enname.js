const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'Header.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace {grand.name}
content = content.replace(/\{grand\.name\}/g, '{isEnglish ? (grand.enName || grand.name) : grand.name}');

// Replace {major.name}
content = content.replace(/\{major\.name\}/g, '{isEnglish ? (major.enName || major.name) : major.name}');

// Replace {sub.name}
content = content.replace(/\{sub\.name\}/g, '{isEnglish ? (sub.enName || sub.name) : sub.name}');

fs.writeFileSync(targetFile, content);
console.log('Header.tsx updated with enNames.');
