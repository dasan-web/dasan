const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'Header.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Add isEnglish and basePath
content = content.replace('const pathname = usePathname();\n', 'const pathname = usePathname();\n  const isEnglish = pathname.startsWith(\'/en\');\n  const basePath = isEnglish ? \'/en\' : \'\';\n');

// Update handleEnglishClick
content = content.replace(
  /const handleEnglishClick = \(e: React\.MouseEvent\) => {[\s\S]*?};/g,
  `const handleEnglishClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isEnglish) {
      window.location.href = \`/en\${pathname === '/' ? '' : pathname}\`;
    }
  };

  const handleKoreanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isEnglish) {
      window.location.href = pathname.replace(/^\\/en/, '') || '/';
    }
  };`
);

// Update KOR | ENG section
content = content.replace(
  /<span className="cursor-pointer">KOR<\/span>[\s\S]*?<a href="#" onClick={handleEnglishClick} className="hover:text-brand-green transition-colors">ENG<\/a>/g,
  `<a href="#" onClick={handleKoreanClick} className={\`cursor-pointer transition-colors \${!isEnglish ? 'text-brand-green font-bold' : 'hover:text-brand-green'}\`}>KOR</a>
                <span className="text-gray-300">|</span>
                <a href="#" onClick={handleEnglishClick} className={\`cursor-pointer transition-colors \${isEnglish ? 'text-brand-green font-bold' : 'hover:text-brand-green'}\`}>ENG</a>`
);

// Update KOR | ENG in mobile menu
content = content.replace(
  /<span className="cursor-pointer">KOR<\/span>[\s\S]*?<a href="#" onClick={handleEnglishClick} className="hover:text-brand-green">ENG<\/a>/g,
  `<a href="#" onClick={handleKoreanClick} className={\`cursor-pointer transition-colors \${!isEnglish ? 'text-brand-green font-bold' : 'hover:text-brand-green'}\`}>KOR</a>
                  <span className="text-gray-300">|</span>
                  <a href="#" onClick={handleEnglishClick} className={\`cursor-pointer transition-colors \${isEnglish ? 'text-brand-green font-bold' : 'hover:text-brand-green'}\`}>ENG</a>`
);

// Replace href="/" with href={`${basePath}/`} except for some external ones
content = content.replace(/href="\/"/g, 'href={`\${basePath}/`}');

// We have Links like: href={grand.majors[0]?.subMenus[0]?.link || grand.link}
// Let's replace them using regex
content = content.replace(/href=\{grand\.majors\[0\]\?\.subMenus\[0\]\?\.link \|\| grand\.link\}/g, 'href={`\\${basePath}\\${grand.majors[0]?.subMenus[0]?.link || grand.link}`}');
content = content.replace(/href=\{major\.subMenus\[0\]\?\.link \|\| '#'\}/g, 'href={`\\${basePath}\\${major.subMenus[0]?.link || \'#\'}`}');
content = content.replace(/href=\{sub\.link\}/g, 'href={`\\${basePath}\\${sub.link}`}');

fs.writeFileSync(targetFile, content);
console.log('Header.tsx patched.');
