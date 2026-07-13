const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'app', 'en', 'about', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Disable DB query to force fallback
content = content.replace(
  "const results = await query('SELECT page_key, content FROM admin_contents WHERE page_key = ? OR page_key LIKE ?', [pageKey, 'about/intro/%']);",
  "const results = []; // Disabled DB query for English page to use hardcoded translations"
);

// 2. Translate intro texts
content = content.replace(
  "let introTitle = '인류의 건강을 위한 혁신,다산제약';",
  "let introTitle = 'Innovation for Human Health, Dasan Pharmaceutical';"
);
content = content.replace(
  "let introBody = '다산제약은 1996년 설립 이후 끊임없는 연구개발과 과감한 투자를 통해 고품질의 의약품을 제공함으로써 국민 보건 증진과 삶의 질 향상에 기여해 왔습니다. 차별화된 제제 기술력을 보유한 개량신약 전문 제약회사로서 글로벌 시장을 무대로 뻗어나가고 있습니다.\\n\\n현재 마이크로캡슐화 기술 등 특화된 제형 기술을 중심으로 원료의약품 합성에서 완제의약품 제조까지 수직계열화를 완성하였으며, 이를 기반으로 글로벌 CDMO 기업으로 성장하고 있습니다.';",
  "let introBody = 'Since its establishment in 1996, Dasan Pharmaceutical has contributed to promoting national health and improving the quality of life by providing high-quality pharmaceuticals through continuous R&D and bold investments. As a pharmaceutical company specializing in IMD with differentiated formulation technology, we are expanding into the global market.\\n\\nCurrently, we have completed vertical integration from API synthesis to finished product manufacturing, focusing on specialized formulation technologies such as microencapsulation technology, and based on this, we are growing into a global CDMO company.';"
);

// 3. Translate history intro
content = content.replace(
  "let historyIntroTitle = '도전과 신뢰의 역사, 인류의 건강을 위해 걸어온 길';",
  "let historyIntroTitle = 'A History of Challenge and Trust, The Path Walked for Human Health';"
);
content = content.replace(
  "let historyIntroBody = '다산제약은 1996년 설립 이후 독자적인 DDS 기술 확보와 글로벌 신약 개발을 향해 쉼 없이 달려왔습니다.';",
  "let historyIntroBody = 'Since its establishment in 1996, Dasan Pharmaceutical has run tirelessly towards securing independent DDS technology and developing global new drugs.';"
);

// 4. Translate history timeline
content = content.replace(
  "eraSubtitle: '설립기 (원천기술 확보)',",
  "eraSubtitle: 'Establishment Phase (Securing Core Tech)',"
);
content = content.replace(
  "eraSubtitle: '성장기 (R&D 고도화 및 생산 인프라 확장)',",
  "eraSubtitle: 'Growth Phase (R&D Advancement & Infrastructure Expansion)',"
);
content = content.replace(
  "eraSubtitle: '도약기 (고성장/고수익 창출)',",
  "eraSubtitle: 'Leap Phase (High Growth / High Profit Creation)',"
);
content = content.replace(
  "eraSubtitle: '글로벌 리더 (Global Standard 확립 및 신약 개발)',",
  "eraSubtitle: 'Global Leader (Establishing Global Standard & New Drug Dev)',"
);

// 5. Translate CI section
content = content.replace(
  "let ciIntroTitle = '다산제약 CI (Corporate Identity)';",
  "let ciIntroTitle = 'Dasan Pharmaceutical CI (Corporate Identity)';"
);
content = content.replace(
  "let ciIntroBody = '다산제약의 CI는 글로벌 제약기업으로의 도약과 혁신을 향한 의지를 담고 있습니다.\\n자연과 인간, 기술이 조화롭게 융합된 형태를 통해 건강한 미래를 창조해 나가는 우리의 비전을 상징합니다.';",
  "let ciIntroBody = 'The CI of Dasan Pharmaceutical embodies our leap towards becoming a global pharmaceutical company and our will for innovation.\\nIt symbolizes our vision of creating a healthy future through the harmonious fusion of nature, humans, and technology.';"
);
content = content.replace(
  "let ciSymbolTitle = '심볼 마크 (Symbol Mark)';",
  "let ciSymbolTitle = 'Symbol Mark';"
);
content = content.replace(
  "let ciSymbolBody = '육각형 구조는 화학 결합의 견고함과 제약 기술의 정밀함을 상징하며, 나뭇잎 모티브는 자연 친화적 가치와 생명 존중의 철학을 나타냅니다. 전체적으로 끊임없이 성장하고 진화하는 다산제약의 역동적인 에너지를 표현하고 있습니다.';",
  "let ciSymbolBody = 'The hexagonal structure symbolizes the solidity of chemical bonds and the precision of pharmaceutical technology, while the leaf motif represents eco-friendly values and the philosophy of respecting life. Overall, it expresses the dynamic energy of Dasan Pharmaceutical, which is constantly growing and evolving.';"
);
content = content.replace(
  "name: 'Dasan Green', desc: '정밀성과 신뢰를 기반으로 한 다산제약의 핵심\\n컬러로, 안정감 있는 그린 톤을 통해 친환경적\\n가치와 브랜드 아이덴티티를 상징하는\\n시그니처 컬러'",
  "name: 'Dasan Green', desc: 'As Dasan Pharmaceutical\\'s core color based on precision and trust, it is a signature color that symbolizes eco-friendly values and brand identity through a stable green tone.'"
);
content = content.replace(
  "name: 'Dasan Light Green', desc: '생동감과 확장성을 담은 컬러로,\\n브랜드에 유연한 흐름과 밝은 에너지를\\n더해주는 보조 컬러'",
  "name: 'Dasan Light Green', desc: 'A color containing vitality and expandability, it is an auxiliary color that adds flexible flow and bright energy to the brand.'"
);
content = content.replace(
  "name: 'Dasan Gray', desc: '전체적인 균형과 질서를 유지하는 컬러로,\\n정보 전달의 명확성을 높이고 시각 요소를\\n정돈하는 보조 컬러'",
  "name: 'Dasan Gray', desc: 'A color that maintains overall balance and order, it is an auxiliary color that increases the clarity of information delivery and organizes visual elements.'"
);
content = content.replace(
  "['CI 가이드라인 다운로드']",
  "['Download CI Guideline']"
);
content = content.replace(
  "['AI 다운로드']",
  "['Download AI']"
);

// 6. Translate Facilities (Location)
content = content.replace(
  "title: '1공장', titleDesc: '(완제 의약품)'",
  "title: 'Plant 1', titleDesc: '(Finished Products)'"
);
content = content.replace(
  "title: '2공장', titleDesc: '(원료 의약품 및 중간체)'",
  "title: 'Plant 2', titleDesc: '(API and Intermediates)'"
);
content = content.replace(
  "title: '본사'",
  "title: 'HQ'"
);
content = content.replace(
  "title: '연구소'",
  "title: 'R&D Center'"
);

// 7. Translate Sub Titles in Business Area
content = content.replace(
  "intro: '연구개발(R&D)부터 판매까지 의약품 전 주기의 Key Value Chain 인프라를 구축하여 고부가가치 사업 성장성을 확보하고 있습니다',",
  "intro: 'We have secured high value-added business growth by establishing a Key Value Chain infrastructure for the entire pharmaceutical lifecycle from R&D to sales.',"
);
content = content.replace(
  "title: '1) 자사 완제 의약품 사업', desc: '순환기, 호흡기, 비뇨기 중심의 우수한 제품 라인업 구축 및 생산·판매'",
  "title: '1) Own Finished Product Business', desc: 'Establishing an excellent product lineup centered on cardiovascular, respiratory, and urology, and production/sales'"
);
content = content.replace(
  "title: '2) 수탁 완제 의약품 (CMO) 사업', desc: '독자적인 제제기술 및 공정 최적화를 통한 전문의약품 수탁 생산'",
  "title: '2) Consignment Finished Product (CMO) Business', desc: 'Consignment production of ethical drugs through proprietary formulation technology and process optimization'"
);
content = content.replace(
  "title: '3) 의약품 핵심 원료 및 중간체 사업', desc: '의약품 핵심 원료 및 중간체 개발 및 특허 확보, 신규 합성 및 신규 수입 원료 DMF 등록·관리'",
  "title: '3) API and Intermediates Business', desc: 'Development and patent securing of key APIs and intermediates, DMF registration and management for new synthetic and imported materials'"
);

// 8. General fallback strings
content = content.replace(/주요 사업 영역 \(Core Business\)/g, "Core Business");
content = content.replace(/다산제약 대표이사/g, "CEO of Dasan Pharmaceutical");
content = content.replace(/류형선/g, "Ryu Hyung-sun");

// 9. Fix Intro Body fallback parsing which relies on Korean strings
// In `en/about/[[...slug]]/page.tsx`, there is logic:
// trimmed.startsWith('다산(茶山)의 정신으로') || trimmed.startsWith('신뢰와 혁신으로') || trimmed.includes('4대 경영 철학') || trimmed.includes('핵심 가치')
content = content.replace(
  "trimmed.startsWith('다산(茶山)의 정신으로') || \n                      trimmed.startsWith('신뢰와 혁신으로') ||\n                      trimmed.includes('4대 경영 철학') ||\n                      trimmed.includes('핵심 가치')",
  "trimmed.startsWith('With the spirit of Dasan') || \n                      trimmed.startsWith('With trust and innovation') ||\n                      trimmed.includes('4 Major Management Philosophies') ||\n                      trimmed.includes('Core Values')"
);

fs.writeFileSync(targetFile, content);
console.log('en/about page.tsx translations applied.');
