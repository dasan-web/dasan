const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'PressReleaseSlider.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Add usePathname
if (!content.includes('usePathname')) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
}

// Add isEnglish inside component
content = content.replace('const [newsList, setNewsList] = useState(initialNews);', 'const [newsList, setNewsList] = useState(initialNews);\n  const pathname = usePathname();\n  const isEnglish = pathname ? pathname.startsWith(\'/en\') : false;');

// Replace text
content = content.replace('>보도자료<', '>{isEnglish ? "Press Release" : "보도자료"}<');
content = content.replace('등록일: ', '{isEnglish ? "Date: " : "등록일: "}');
content = content.replace('조회수: ', '{isEnglish ? "Views: " : "조회수: "}');
content = content.replace('>확인<', '>{isEnglish ? "Confirm" : "확인"}<');

fs.writeFileSync(targetFile, content);
console.log('PressReleaseSlider.tsx updated for English.');
