const fs = require('fs');
const path = require('path');

function patchFile(filePath, isEnglishVarCode, replaceFunc) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('usePathname')) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport { usePathname } from 'next/navigation';");
    content = content.replace("export default function", "import { usePathname } from 'next/navigation';\nexport default function");
  }
  if (!content.includes('const isEnglish')) {
    const fnStart = content.indexOf('{', content.indexOf('export default function')) + 1;
    content = content.slice(0, fnStart) + `\n  const pathname = usePathname();\n  const isEnglish = pathname?.startsWith('/en');` + content.slice(fnStart);
  }
  content = replaceFunc(content);
  fs.writeFileSync(filePath, content);
}

// 1. PrimaryCIDownloadButton
patchFile(
  path.join(__dirname, '..', 'src', 'components', 'PrimaryCIDownloadButton.tsx'),
  '',
  (content) => {
    content = content.replace(/<span>CI 다운로드<\/span>/g, '<span>{isEnglish ? "Download CI" : "CI 다운로드"}</span>');
    content = content.replace(/aria-label="CI 다운로드"/g, 'aria-label={isEnglish ? "Download CI" : "CI 다운로드"}');
    return content;
  }
);

// 2. CIDownloadButton
patchFile(
  path.join(__dirname, '..', 'src', 'components', 'CIDownloadButton.tsx'),
  '',
  (content) => {
    content = content.replace(/>다산제약 CI 가이드라인 파일 받기</g, '>{isEnglish ? "Download Dasan Pharmaceutical CI Guideline File" : "다산제약 CI 가이드라인 파일 받기"}<');
    content = content.replace(/aria-label="CI 가이드라인 다운로드"/g, 'aria-label={isEnglish ? "Download CI Guideline" : "CI 가이드라인 다운로드"}');
    return content;
  }
);

console.log('Fixed CI buttons!');
