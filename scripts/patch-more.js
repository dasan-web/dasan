const fs = require('fs');
const path = require('path');

// 1. Patch Footer.tsx
const footerFile = path.join(__dirname, '..', 'src', 'components', 'Footer.tsx');
let footerContent = fs.readFileSync(footerFile, 'utf8');

footerContent = footerContent.replace(/\{grand\.name\}/g, '{isEnglish ? (grand.enName || grand.name) : grand.name}');
footerContent = footerContent.replace(/\{major\.name\}/g, '{isEnglish ? (major.enName || major.name) : major.name}');
footerContent = footerContent.replace(/\{sub\.name\}/g, '{isEnglish ? (sub.enName || sub.name) : sub.name}');

// Also translate address info in footer if isEnglish
footerContent = footerContent.replace(
  '>본사<',
  '>{isEnglish ? "HQ" : "본사"}<'
);
footerContent = footerContent.replace(
  '>연구소<',
  '>{isEnglish ? "R&D Center" : "연구소"}<'
);
footerContent = footerContent.replace(
  '>1공장<',
  '>{isEnglish ? "Plant 1" : "1공장"}<'
);
footerContent = footerContent.replace(
  '>2공장<',
  '>{isEnglish ? "Plant 2" : "2공장"}<'
);

footerContent = footerContent.replace(
  '>서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호<',
  '>{isEnglish ? "Rm 1302, Woori Venture Town II, 70 Seonyu-ro, Yeongdeungpo-gu, Seoul" : "서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호"}<'
);
footerContent = footerContent.replace(
  '>경기 수원시 영통구 신원로 304 이노플렉스 3동 306호<',
  '>{isEnglish ? "Rm 306, Bldg 3, Innoplex, 304 Sinwon-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do" : "경기 수원시 영통구 신원로 304 이노플렉스 3동 306호"}<'
);
footerContent = footerContent.replace(
  '>충청남도 아산시 도고면 덕암산로 342<',
  '>{isEnglish ? "342 Deogamsan-ro, Dogo-myeon, Asan-si, Chungcheongnam-do" : "충청남도 아산시 도고면 덕암산로 342"}<'
);
footerContent = footerContent.replace(
  '>충청남도 아산시 도고면 덕암산로 381<',
  '>{isEnglish ? "381 Deogamsan-ro, Dogo-myeon, Asan-si, Chungcheongnam-do" : "충청남도 아산시 도고면 덕암산로 381"}<'
);

fs.writeFileSync(footerFile, footerContent);
console.log('Footer patched.');

// 2. Patch CoreTechnology.tsx title
const coreFile = path.join(__dirname, '..', 'src', 'components', 'CoreTechnology.tsx');
let coreContent = fs.readFileSync(coreFile, 'utf8');

const oldTitle = `다산제약은 <span className="text-brand-green font-extrabold">핵심 기술</span>을 통하여{' '}
              <span className="text-brand-green font-extrabold">글로벌 DDS</span> 기업으로 성장하고 있습니다.`;
const newTitle = `{isEnglish ? (
                <>Dasan Pharmaceutical is growing into a <span className="text-brand-green font-extrabold">global DDS</span> company through <span className="text-brand-green font-extrabold">core technology</span>.</>
              ) : (
                <>다산제약은 <span className="text-brand-green font-extrabold">핵심 기술</span>을 통하여{' '}
                <span className="text-brand-green font-extrabold">글로벌 DDS</span> 기업으로 성장하고 있습니다.</>
              )}`;

coreContent = coreContent.replace(oldTitle, newTitle);

// 3. Patch the '1st Generic 품목' title from the right grid (if it still exists in Korean)
coreContent = coreContent.replace(/>1st Generic 품목</g, '>{isEnglish ? "1st Generic" : "1st Generic 품목"}<');

fs.writeFileSync(coreFile, coreContent);
console.log('CoreTechnology patched.');
