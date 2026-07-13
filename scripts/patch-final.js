const fs = require('fs');
const path = require('path');

const coreFile = path.join(__dirname, '..', 'src', 'components', 'CoreTechnology.tsx');
let content = fs.readFileSync(coreFile, 'utf8');

// Add usePathname
if (!content.includes('usePathname')) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
}

// Add isEnglish inside component
if (!content.includes('const isEnglish = pathname')) {
  content = content.replace('const [hoveredSection, setHoveredSection] = useState<string | null>(null);', 'const [hoveredSection, setHoveredSection] = useState<string | null>(null);\n  const pathname = usePathname();\n  const isEnglish = pathname ? pathname.startsWith(\'/en\') : false;');
}

// 1. The main heading
const titleRegex = /다산제약은 <span className="text-brand-green font-extrabold">핵심 기술<\/span>을 통하여\{' '\}\s*<span className="text-brand-green font-extrabold">글로벌 DDS<\/span> 기업으로 성장하고 있습니다\./g;
const titleRepl = `{isEnglish ? (
                <>Dasan Pharmaceutical is growing into a <span className="text-brand-green font-extrabold">global DDS</span> company through <span className="text-brand-green font-extrabold">core technology</span>.</>
              ) : (
                <>다산제약은 <span className="text-brand-green font-extrabold">핵심 기술</span>을 통하여{' '}
                <span className="text-brand-green font-extrabold">글로벌 DDS</span> 기업으로 성장하고 있습니다.</>
              )}`;
content = content.replace(titleRegex, titleRepl);

// 2. 1st Generic품목
content = content.replace(
  />\s*1st Generic품목\s*</g,
  ">{isEnglish ? '1st Generic' : '1st Generic품목'}<"
);
content = content.replace(
  />\s*1st Generic 품목\s*</g,
  ">{isEnglish ? '1st Generic' : '1st Generic 품목'}<"
);

// 3. 핵심공정 ODM품목 / 전공정 ODM품목
content = content.replace(
  /· 핵심공정 ODM품목<br \/>· 전공정 ODM품목/g,
  "{isEnglish ? (<>· Core Process ODM<br />· Full Process ODM</>) : (<>· 핵심공정 ODM품목<br />· 전공정 ODM품목</>)}"
);

// 4. 개량신약(염 변경)
content = content.replace(
  /개량신약\(염 변경\)/g,
  "{isEnglish ? 'IMD (Salt Change)' : '개량신약(염 변경)'}"
);
content = content.replace(
  />\s*개량신약\(염변경\)\s*</g,
  ">{isEnglish ? 'IMD (Salt Change)' : '개량신약(염변경)'}<"
);

// 5. 공동개발 품목이며...
content = content.replace(
  /\*공동개발 품목이며 다산에서 핵심기술 진행 \(약물의 안정성 확보\)/g,
  "{isEnglish ? '*Co-developed item, core tech handled by Dasan (Securing drug stability)' : '*공동개발 품목이며 다산에서 핵심기술 진행 (약물의 안정성 확보)'}"
);

// 6. 전공정 ODM품목
content = content.replace(
  />\s*전공정 ODM품목\s*</g,
  ">{isEnglish ? 'Full Process ODM' : '전공정 ODM품목'}<"
);

// 7. 핵심공정 ODM품목
content = content.replace(
  />\s*핵심공정 ODM품목\s*</g,
  ">{isEnglish ? 'Core Process ODM' : '핵심공정 ODM품목'}<"
);

// 8. 개량신약(약물방출)
content = content.replace(
  /개량신약\(약물방출\)/g,
  "{isEnglish ? 'IMD (Drug Release)' : '개량신약(약물방출)'}"
);

// 9. 약물방출 조절 개량신약 / 고함량 개량신약
content = content.replace(
  /· 약물방출 조절 개량신약<br \/>· 고함량 개량신약/g,
  "{isEnglish ? (<>· Controlled Release IMD<br />· High Dose IMD</>) : (<>· 약물방출 조절 개량신약<br />· 고함량 개량신약</>)}"
);

content = content.replace(
  />\s*약물방출 조절 개량신약\s*</g,
  ">{isEnglish ? 'Controlled Release IMD' : '약물방출 조절 개량신약'}<"
);

content = content.replace(
  />\s*고함량 개량신약\s*</g,
  ">{isEnglish ? 'High Dose IMD' : '고함량 개량신약'}<"
);

content = content.replace(
  /\*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행/g,
  "{isEnglish ? '*Co-developed item, Dasan handles core drug release control' : '*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행'}"
);

// 10. 개량신약(복합제 & 기타)
content = content.replace(
  /개량신약\(복합제 & 기타\)/g,
  "{isEnglish ? 'IMD (Combination & Others)' : '개량신약(복합제 & 기타)'}"
);

content = content.replace(
  /개량신약\(복합제\)&기타/g,
  "{isEnglish ? 'IMD (Combination) & Others' : '개량신약(복합제)&기타'}"
);

// 11. 복합제제 개량신약 / 제형변경(기타)
content = content.replace(
  /· 복합제제 개량신약<br \/>· 제형변경\(기타\)/g,
  "{isEnglish ? (<>· Combination IMD<br />· Formulation Change (Others)</>) : (<>· 복합제제 개량신약<br />· 제형변경(기타)</>)}"
);

content = content.replace(
  />\s*복합제제 개량신약\s*</g,
  ">{isEnglish ? 'Combination IMD' : '복합제제 개량신약'}<"
);

content = content.replace(
  />\s*제형 변경\(기타\)\s*</g,
  ">{isEnglish ? 'Formulation Change (Others)' : '제형 변경(기타)'}<"
);

content = content.replace(
  /imatinib mesylate 고함량제제/g,
  "{isEnglish ? 'imatinib mesylate high dose preparation' : 'imatinib mesylate 고함량제제'}"
);

content = content.replace(
  /Choline alfoscerate 정제<br \/>/g,
  "{isEnglish ? (<>Choline alfoscerate tablet<br /></>) : (<>Choline alfoscerate 정제<br /></>)}"
);
content = content.replace(
  /Olmesartan, Amlodipine, Rosuvastatin 복합제<br \/>/g,
  "{isEnglish ? (<>Olmesartan, Amlodipine, Rosuvastatin Combination<br /></>) : (<>Olmesartan, Amlodipine, Rosuvastatin 복합제<br /></>)}"
);

fs.writeFileSync(coreFile, content);
console.log('CoreTechnology patched heavily.');
