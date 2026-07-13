const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'components', 'CoreTechnology.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Add usePathname
if (!content.includes('usePathname')) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
}

// Add isEnglish inside component
content = content.replace('const [hoveredSection, setHoveredSection] = useState<string | null>(null);', 'const [hoveredSection, setHoveredSection] = useState<string | null>(null);\n  const pathname = usePathname();\n  const isEnglish = pathname ? pathname.startsWith(\'/en\') : false;');

// Section 1: Title
content = content.replace(
  "다산제약은 <span className=\"text-brand-green font-extrabold\">핵심 기술</span>을 통하여{' '}\n              <span className=\"text-brand-green font-extrabold\">글로벌 DDS</span> 기업으로 성장하고 있습니다.",
  "{isEnglish ? (<>Dasan Pharmaceutical is growing into a <span className=\"text-brand-green font-extrabold\">global DDS</span> company through <span className=\"text-brand-green font-extrabold\">core technology</span>.</>) : (<>다산제약은 <span className=\"text-brand-green font-extrabold\">핵심 기술</span>을 통하여{' '}\n              <span className=\"text-brand-green font-extrabold\">글로벌 DDS</span> 기업으로 성장하고 있습니다.</>)}"
);

// 1st Generic품목
content = content.replace(
  ">1st Generic품목<",
  ">{isEnglish ? '1st Generic' : '1st Generic품목'}<"
);
content = content.replace(
  ">1st Generic 품목<",
  ">{isEnglish ? '1st Generic' : '1st Generic 품목'}<"
);

// 핵심공정 ODM품목 / 전공정 ODM품목
content = content.replace(
  /· 핵심공정 ODM품목<br \/>· 전공정 ODM품목/g,
  "{isEnglish ? (<>· Core Process ODM<br />· Full Process ODM</>) : (<>· 핵심공정 ODM품목<br />· 전공정 ODM품목</>)}"
);

// 개량신약(염 변경)
content = content.replace(
  /개량신약\(염 변경\)/g,
  "{isEnglish ? 'IMD (Salt Change)' : '개량신약(염 변경)'}"
);

// 개량신약(염변경)
content = content.replace(
  />개량신약\(염변경\)</g,
  ">{isEnglish ? 'IMD (Salt Change)' : '개량신약(염변경)'}<"
);

// 공동개발 품목이며 다산에서 핵심기술 진행 (약물의 안정성 확보)
content = content.replace(
  /\*공동개발 품목이며 다산에서 핵심기술 진행 \(약물의 안정성 확보\)/g,
  "{isEnglish ? '*Co-developed item, core tech handled by Dasan (Securing drug stability)' : '*공동개발 품목이며 다산에서 핵심기술 진행 (약물의 안정성 확보)'}"
);

// 전공정 ODM품목
content = content.replace(
  />전공정 ODM품목</g,
  ">{isEnglish ? 'Full Process ODM' : '전공정 ODM품목'}<"
);

// 핵심공정 ODM품목
content = content.replace(
  />핵심공정 ODM품목</g,
  ">{isEnglish ? 'Core Process ODM' : '핵심공정 ODM품목'}<"
);

// 개량신약(약물방출)
content = content.replace(
  /개량신약\(약물방출\)/g,
  "{isEnglish ? 'IMD (Drug Release)' : '개량신약(약물방출)'}"
);

// 약물방출 조절 개량신약 / 고함량 개량신약
content = content.replace(
  /· 약물방출 조절 개량신약<br \/>· 고함량 개량신약/g,
  "{isEnglish ? (<>· Controlled Release IMD<br />· High Dose IMD</>) : (<>· 약물방출 조절 개량신약<br />· 고함량 개량신약</>)}"
);

// 약물방출 조절 개량신약
content = content.replace(
  />약물방출 조절 개량신약</g,
  ">{isEnglish ? 'Controlled Release IMD' : '약물방출 조절 개량신약'}<"
);

// 고함량 개량신약
content = content.replace(
  />고함량 개량신약</g,
  ">{isEnglish ? 'High Dose IMD' : '고함량 개량신약'}<"
);

// *공동개발 품목이며 다산에서 핵심 약물방출 조절 진행
content = content.replace(
  /\*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행/g,
  "{isEnglish ? '*Co-developed item, Dasan handles core drug release control' : '*공동개발 품목이며 다산에서 핵심 약물방출 조절 진행'}"
);

// 개량신약(복합제 & 기타)
content = content.replace(
  /개량신약\(복합제 & 기타\)/g,
  "{isEnglish ? 'IMD (Combination & Others)' : '개량신약(복합제 & 기타)'}"
);

// 개량신약(복합제)\&기타
content = content.replace(
  /개량신약\(복합제\)&기타/g,
  "{isEnglish ? 'IMD (Combination) & Others' : '개량신약(복합제)&기타'}"
);

// 복합제제 개량신약 / 제형변경(기타)
content = content.replace(
  /· 복합제제 개량신약<br \/>· 제형변경\(기타\)/g,
  "{isEnglish ? (<>· Combination IMD<br />· Formulation Change (Others)</>) : (<>· 복합제제 개량신약<br />· 제형변경(기타)</>)}"
);

// 복합제제 개량신약
content = content.replace(
  />복합제제 개량신약</g,
  ">{isEnglish ? 'Combination IMD' : '복합제제 개량신약'}<"
);

// 제형 변경(기타)
content = content.replace(
  />제형 변경\(기타\)</g,
  ">{isEnglish ? 'Formulation Change (Others)' : '제형 변경(기타)'}<"
);

// imatinib mesylate 고함량제제
content = content.replace(
  /imatinib mesylate 고함량제제/g,
  "{isEnglish ? 'imatinib mesylate high dose preparation' : 'imatinib mesylate 고함량제제'}"
);

// Choline alfoscerate 정제
content = content.replace(
  /Choline alfoscerate 정제<br \/>/g,
  "{isEnglish ? (<>Choline alfoscerate tablet<br /></>) : (<>Choline alfoscerate 정제<br /></>)}"
);
content = content.replace(
  /Olmesartan, Amlodipine, Rosuvastatin 복합제<br \/>/g,
  "{isEnglish ? (<>Olmesartan, Amlodipine, Rosuvastatin Combination<br /></>) : (<>Olmesartan, Amlodipine, Rosuvastatin 복합제<br /></>)}"
);

fs.writeFileSync(targetFile, content);
console.log('CoreTechnology.tsx updated for English.');
