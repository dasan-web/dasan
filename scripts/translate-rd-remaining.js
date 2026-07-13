const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'en', 'rd', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/'DDS 플랫폼 기술, 유동층 코팅 기술, 제품센터'/g, "'DDS Platform Technology, Fluid Bed Coating Technology, Product Center'");
content = content.replace(/다산제약의 중앙연구소는 석·박사급 우수 연구인력과 고해상도 분광계, 정밀 HPLC 크로마토그래피 등 글로벌 탑티어 연구 인프라를 바탕으로 유기합성 원료 신기술 확보 및 DDS 복합 제제 개발을 이끌어내고 있습니다\./g, "Dasan Pharmaceutical\\'s Central R&D Center is leading the securing of new organic synthesis material technologies and the development of DDS complex formulations based on global top-tier research infrastructure such as high-resolution spectrometers and precision HPLC chromatography along with excellent researchers with master\\'s and doctoral degrees.");
content = content.replace(/신약 합성 루트 설계, 특허 회피성 신규 고순도 원료의약품\(API\) 공정 개발/g, "Design of new drug synthesis routes, process development of novel high-purity Active Pharmaceutical Ingredients (APIs) capable of avoiding patents");
content = content.replace(/다산제약의 핵심 연구 성과는 고유한 DDS\(약물전달시스템\) 설계 능력에 기인합니다\. 복용 편의성을 개선하고 부작용을 최소화하는 혁신적인 formulation 플랫폼을 확보하고 있습니다\./g, "Dasan Pharmaceutical\\'s core research achievements originate from its unique DDS (Drug Delivery System) design capabilities. We secure innovative formulation platforms that improve medication convenience and minimize side effects.");
content = content.replace(/상세 정보를 준비 중입니다\./g, "Detailed information is being prepared.");

fs.writeFileSync(filePath, content);
console.log('Fixed remaining Korean text in rd page!');
