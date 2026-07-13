const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'Footer.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Unescape \${ to ${
content = content.replace(/\\\$\{/g, '${');

fs.writeFileSync(targetFile, content);
console.log('Footer.tsx link variables fixed.');
