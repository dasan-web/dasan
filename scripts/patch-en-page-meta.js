const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'app', 'en', 'page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

content = content.replace(/다산제약 \| 의약품 CDMO 기업/g, 'Dasan Pharmaceutical | Pharmaceutical CDMO Company');
content = content.replace(/다산제약, 의약품 CDMO 기업/g, 'Dasan Pharmaceutical, Pharmaceutical CDMO Company');
content = content.replace(/다산제약은 지속적인 연구개발과 고품질의 의약품 생산을 통해 건강한 삶을 만들어가는 글로벌 제약회사입니다./g, 'Dasan Pharmaceutical is a global pharmaceutical company creating a healthy life through continuous R&D and high-quality drug production.');

fs.writeFileSync(targetFile, content);
console.log('en/page.tsx metadata updated.');
