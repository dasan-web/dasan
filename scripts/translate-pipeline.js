const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'PipelineChart.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add import for usePathname
if (!content.includes('usePathname')) {
  content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { usePathname } from 'next/navigation';");
}

// Add isEnglish
if (!content.includes('const isEnglish = ')) {
  content = content.replace("export default function PipelineChart() {", "export default function PipelineChart() {\n  const pathname = usePathname();\n  const isEnglish = pathname ? pathname.startsWith('/en') : false;");
}

// Map dict
const mapDictCode = `
  const t = (ko) => {
    if (!isEnglish) return ko;
    const dict = {
      '구분': 'Category',
      '프로젝트명': 'Project Name',
      '질환군': 'Indication',
      '개발단계': 'Development Phase',
      '협력기관': 'Partners',
      '기초연구': 'Basic Research',
      '전임상': 'Pre-Clinical',
      '임상 1상': 'Phase 1',
      '임상 2상': 'Phase 2',
      '임상 3상': 'Phase 3',
      '허가': 'Approval',
      '개량신약': 'IMD',
      '자료 제출 의약품': 'Data Submission Drug',
      '퍼스트 제네릭': 'First Generic',
      '비만치료제': 'Obesity Treatment',
      '항암·면역보조치료제': 'Anti-cancer / Immune Adjuvant',
      '류마티스관절염치료제': 'Rheumatoid Arthritis Treatment',
      '고혈압(최초복합제) 치료제': 'Hypertension Treatment',
      '위식도역류(P-CAB) 치료제': 'GERD (P-CAB) Treatment',
      '고지혈증 치료제': 'Hyperlipidemia Treatment',
      '파이프라인 데이터를 불러오는 중입니다...': 'Loading pipeline data...',
      '등록된 파이프라인 항목이 없습니다.': 'No pipeline data available.'
    };
    return dict[ko] || ko;
  };
`;

if (!content.includes('const t = (ko) =>')) {
  content = content.replace("const processedData = React.useMemo(() => {", mapDictCode + "\n  const processedData = React.useMemo(() => {");
}

// Headers
content = content.replace(/<th>구분<\/th>/g, "<th>{t('구분')}</th>");
content = content.replace(/{phase}/g, "{t(phase)}");
content = content.replace(/>구분</g, ">{t('구분')}<");
content = content.replace(/>프로젝트명</g, ">{t('프로젝트명')}<");
content = content.replace(/>질환군</g, ">{t('질환군')}<");
content = content.replace(/>개발단계</g, ">{t('개발단계')}<");
content = content.replace(/>협력기관</g, ">{t('협력기관')}<");

// Body values
content = content.replace(/>\s*\{item\.category\}\s*<\/td>/g, ">{t(item.category)}</td>");
content = content.replace(/>\s*\{item\.disease\}\s*<\/td>/g, ">{t(item.disease)}</td>");

// Loading / Empty
content = content.replace(/>\s*파이프라인 데이터를 불러오는 중입니다...\s*<\/td>/g, ">{t('파이프라인 데이터를 불러오는 중입니다...')}</td>");
content = content.replace(/>\s*등록된 파이프라인 항목이 없습니다\.\s*<\/td>/g, ">{t('등록된 파이프라인 항목이 없습니다.')}</td>");

fs.writeFileSync(filePath, content);
console.log('PipelineChart.tsx updated to support English!');
