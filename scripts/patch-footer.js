const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'Footer.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

content = content.replace('const pathname = usePathname();\n', 'const pathname = usePathname();\n  const isEnglish = pathname.startsWith(\'/en\');\n  const basePath = isEnglish ? \'/en\' : \'\';\n');

// Update Links
content = content.replace(/href=\{grand\.link\}/g, 'href={`\\${basePath}\\${grand.link}`}');
content = content.replace(/href=\{major\.link\}/g, 'href={`\\${basePath}\\${major.link}`}');
content = content.replace(/href=\{sub\.link\}/g, 'href={`\\${basePath}\\${sub.link}`}');

// Update specific Links like href="/"
content = content.replace(/href="\/"/g, 'href={`\${basePath}/`}');

fs.writeFileSync(targetFile, content);
console.log('Footer.tsx patched.');
