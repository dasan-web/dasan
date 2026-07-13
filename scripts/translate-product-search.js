const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'ProductSearch.tsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('usePathname')) {
  content = content.replace("import { Search } from 'lucide-react';", "import { Search } from 'lucide-react';\nimport { usePathname } from 'next/navigation';");
}

if (!content.includes('const isEnglish')) {
  const funcStart = content.indexOf('export default function ProductSearch() {');
  const bodyStart = content.indexOf('{', funcStart) + 1;
  content = content.slice(0, bodyStart) + `\n  const pathname = usePathname();\n  const isEnglish = pathname?.startsWith('/en');\n` + content.slice(bodyStart);
}

// Map the UI texts
content = content.replace(/>\s*전체\s*<\/button>/, ">{isEnglish ? 'All' : '전체'}</button>");
content = content.replace(/>\s*전문의약품\s*<\/button>/, ">{isEnglish ? 'ETC' : '전문의약품'}</button>");
content = content.replace(/>\s*일반의약품\s*<\/button>/, ">{isEnglish ? 'OTC' : '일반의약품'}</button>");
content = content.replace(/>\s*제품명 검색\s*<\/button>/, ">{isEnglish ? 'Search by Name' : '제품명 검색'}</button>");
content = content.replace(/>\s*효능별 검색\s*<\/button>/, ">{isEnglish ? 'Search by Efficacy' : '효능별 검색'}</button>");

// Hide consonant filter
content = content.replace("{searchMode === 'name' && (", "{searchMode === 'name' && !isEnglish && (");

// Placeholder text
const koPlaceholder1 = "'검색하실 제품명을 입력해 주세요'";
const enPlaceholder1 = "isEnglish ? 'Please enter the product name to search' : '검색하실 제품명을 입력해 주세요'";
content = content.replace(koPlaceholder1, enPlaceholder1);

const koPlaceholder2 = "'검색하실 효능/효과를 입력해 주세요 (예: 고혈압, 당뇨 등)'";
const enPlaceholder2 = "isEnglish ? 'Please enter the efficacy/effect to search (e.g., hypertension, diabetes, etc.)' : '검색하실 효능/효과를 입력해 주세요 (예: 고혈압, 당뇨 등)'";
content = content.replace(koPlaceholder2, enPlaceholder2);

// Loading text
content = content.replace("데이터를 불러오는 중입니다...", "{isEnglish ? 'Loading data...' : '데이터를 불러오는 중입니다...'}");
content = content.replace("검색 결과와 일치하는 제품이 없습니다.", "{isEnglish ? 'No products match your search.' : '검색 결과와 일치하는 제품이 없습니다.'}");

// Card Type Text
content = content.replace(/{product.type}/g, "{product.type === '전문의약품' ? (isEnglish ? 'ETC' : '전문의약품') : (isEnglish ? 'OTC' : '일반의약품')}");
content = content.replace(/{selectedProduct.type}/g, "{selectedProduct.type === '전문의약품' ? (isEnglish ? 'ETC' : '전문의약품') : (isEnglish ? 'OTC' : '일반의약품')}");

// Modal headers
content = content.replace("효능 및 효과", "{isEnglish ? 'Efficacy & Effects' : '효능 및 효과'}");
content = content.replace("'등록된 정보가 없습니다.'", "isEnglish ? 'No information registered.' : '등록된 정보가 없습니다.'");

fs.writeFileSync(filePath, content);
console.log('Translated ProductSearch!');
