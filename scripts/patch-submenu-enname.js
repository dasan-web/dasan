const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'SubmenuTabBar.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Add usePathname to imports if not present
if (!content.includes('usePathname')) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
}

// Add isEnglish
content = content.replace('const [hiddenSlugs, setHiddenSlugs] = useState<string[]>([]);', 'const [hiddenSlugs, setHiddenSlugs] = useState<string[]>([]);\n  const pathname = usePathname();\n  const isEnglish = pathname ? pathname.startsWith(\'/en\') : false;');

// Add enName to SubMenu interface
content = content.replace('interface SubMenu {\n  name: string;', 'interface SubMenu {\n  name: string;\n  enName?: string;');

// Replace {sub.name}
content = content.replace(/\{sub\.name\}/g, '{isEnglish ? (sub.enName || sub.name) : sub.name}');

fs.writeFileSync(targetFile, content);
console.log('SubmenuTabBar.tsx updated with enNames.');
