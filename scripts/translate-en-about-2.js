const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'app', 'en', 'about', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// History items
content = content.replace("['• 주식회사 다산메디켐 설립']", "['• Dasan Medichem Co., Ltd. Established']");
content = content.replace("['• 원료의약품 공장 준공 및 제조업 허가 취득', '• 기업부설연구소 인가']", "['• API Plant Completed & Manufacturing License Acquired', '• Corporate R&D Center Approved']");
content = content.replace("['• BGMP 인증']", "['• BGMP Certified']");
content = content.replace("['• 기술혁신형중소기업(INNO-BIZ) 인증', '• 3D Clean 사업장 인증']", "['• INNO-BIZ Certified', '• 3D Clean Workplace Certified']");
content = content.replace("['• 매출 100억 원 달성', '• KGMP 인증']", "['• Achieved 10B KRW Revenue', '• KGMP Certified']");
content = content.replace("['• 300만불 수출탑 수상']", "['• $3M Export Tower Award']");
content = content.replace("['• \\'KIBO 성공기업\\' 선정']", "['• Selected as KIBO Success Company']");

content = content.replace("['• 완제의약품 물류센터 완공', '• 벤처기업 중소기업청장상 표창', '• 합성연구소 확장 이전']", "['• Finished Product Logistics Center Completed', '• SME Administrator Award', '• Synthetic R&D Center Relocated']");
content = content.replace("['• 중앙연구소 확장 이전']", "['• Central R&D Center Relocated']");
content = content.replace("['• 사명 변경 (\"주식회사 다산제약\")']", "['• Company Name Changed to Dasan Pharmaceutical Co., Ltd.']");
content = content.replace("['• 중앙연구소 통합 개소']", "['• Central R&D Center Integrated & Opened']");
content = content.replace("['• 매출 500억 원 달성', '• 아산 제2공장 완공', '• 심양연구소(중국 랴오닝성) 확장']", "['• Achieved 50B KRW Revenue', '• Asan Plant 2 Completed', '• Shenyang R&D Center (China) Expanded']");
content = content.replace("['• 충청남도 유망 중소기업 선정']", "['• Selected as Promising SME by Chungnam']");
content = content.replace("['• 충청남도 우수기업인상 수상', '• 좋은 일자리 기업 선정', '• 글로벌 강소기업 선정']", "['• Chungnam Excellent Entrepreneur Award', '• Good Workplace Company', '• Global Hidden Champion']");

content = content.replace("['• 무역의날 산자부 장관표창 및 700만불 수출탑 수상', '• 혁신성장 유공중소기업 장관상 수상', '• 의약품수출분야 보건복지부 장관상 수상', '• 4년 연속 청년친화 강소기업 선정']", "['• $7M Export Tower Award', '• Minister Award for Innovative SME', '• Minister Award for Drug Export', '• Youth-Friendly Hidden Champion (4 Yrs)']");
content = content.replace("['• 부패방지경영시스템(ISO 37001) 인증 획득']", "['• ISO 37001 Anti-Bribery Management System Certified']");
content = content.replace("['• 중소벤처기업부 글로벌강소기업 1000+ 프로젝트 선정', '• 식약처 공급망 안정화 선도 사업자 선정', '• 안전보건경영시스템(ISO 45001) 인증 획득', '• 중국 \\'안휘허이다산의약유한회사\\' 합작법인 설립']", "['• Selected for Global Hidden Champion 1000+ Project', '• Selected as Leading Supply Chain Stabilizer by MFDS', '• ISO 45001 Certified', '• Established Anhui Heyi-Dasan Pharma JV in China']");
content = content.replace("['• 환경부 한국환경공단 스마트생태공장 구축 사업 선정']", "['• Selected for Smart Eco-Plant Construction Project']");

// Other history texts
content = content.replace("let historyIntroTitle = '성장 History (History)';", "let historyIntroTitle = 'Growth History';");
content = content.replace("|| '성장 History (History)'", "|| 'Growth History'");
content = content.replace("let ciTitle = 'CI 소개';", "let ciTitle = 'CI Introduction';");
content = content.replace("let ciIntro = '육각형 심볼은 분자 구조와 함께 안정성과 신뢰를 상징하며, 대각선으로 절제된 워드마크는 혁신성과 기술적 진보를 표현합니다. 내부의 흐름형 그래픽(그라데이션-잎)은 생명과 기술의 연결을 의미하고, 그린 컬러는 생명·친환경·신뢰의 가치를 담고 있습니다.';", "let ciIntro = 'The hexagonal symbol represents stability and trust along with molecular structure, while the diagonal wordmark expresses innovation and technological progress. The internal flowing graphic (gradation-leaf) means the connection between life and technology, and the green color contains the values of life, eco-friendliness, and trust.';");

content = content.replace("let primaryLogoDesc = '다산제약 브랜드 아이덴티티를 대표하는 메인 로고입니다, 대내외 다양한 커뮤니케이션에 최우선으로 사용합니다.\\n다산제약의 메인 로고는 각 형태에 따라 비례를 조정한 것이므로, 글자와 도형의 형태, 굵기, 비례 등을 임의로 변경할 수 없습니다.';", "let primaryLogoDesc = 'This is the main logo representing the brand identity of Dasan Pharmaceutical, used with top priority for various internal and external communications.\\nThe main logo has its proportions adjusted according to its shape, so the shape, thickness, and proportion of letters and figures cannot be arbitrarily changed.';");
content = content.replace("let primaryLogoPrint = '인쇄용: 가로기준 권장: 30mm이상, 최소: 25mm';", "let primaryLogoPrint = 'For Print: Recommended width 30mm+, Min 25mm';");
content = content.replace("let primaryLogoDigital = '디지털: 가로기준 권장: 130px이상, 최소 120px';", "let primaryLogoDigital = 'For Digital: Recommended width 130px+, Min 120px';");
content = content.replace("let primaryLogoFooter = '로고 활용 시 규정된 최소 사이즈 미만의 사용을 금합니다. 모바일 애플리케이션 등 작게 적용될 수 밖에 없는 매체에서는\\n주어진 공간에서 최대한 크게 보일 수 있게 적용합니다.';", "let primaryLogoFooter = 'When using the logo, it is prohibited to use it below the specified minimum size. In media where it must be applied small, such as mobile apps, apply it as large as possible within the given space.';");

content = content.replace("let secondaryLogoDesc = '시그니처 조합형(가로 , 세로, 워드마크)';", "let secondaryLogoDesc = 'Signature Combination (Horizontal, Vertical, Wordmark)';");
content = content.replace("let secondaryLogoPrint1 = '인쇄용: 가로기준 권장: 70mm이상, 최소: 66mm';", "let secondaryLogoPrint1 = 'For Print: Recommended width 70mm+, Min 66mm';");
content = content.replace("let secondaryLogoDigital1 = '디지털: 가로기준 권장: 240px이상, 최소 220px';", "let secondaryLogoDigital1 = 'For Digital: Recommended width 240px+, Min 220px';");
content = content.replace("let secondaryLogoPrint2 = '인쇄용: 가로기준 권장: 30mm이상, 최소: 25mm';", "let secondaryLogoPrint2 = 'For Print: Recommended width 30mm+, Min 25mm';");
content = content.replace("let secondaryLogoDigital2 = '디지털: 가로기준 권장: 130px이상, 최소 120px';", "let secondaryLogoDigital2 = 'For Digital: Recommended width 130px+, Min 120px';");
content = content.replace("let secondaryLogoPrint3 = '인쇄용: 가로기준 권장: 30mm이상, 최소: 25mm';", "let secondaryLogoPrint3 = 'For Print: Recommended width 30mm+, Min 25mm';");
content = content.replace("let secondaryLogoDigital3 = '디지털: 가로기준 권장: 100px이상, 최소 80px';", "let secondaryLogoDigital3 = 'For Digital: Recommended width 100px+, Min 80px';");

content = content.replace("let primaryColorDesc = '색상은 브랜드 아이덴티티를 전달하는 핵심적인 요소로 일관성 있는 이미지 구축을 위하여 지정된 색상 값을 참고하여 사용하는 것을 권장합니다.';", "let primaryColorDesc = 'Color is a core element conveying brand identity, and we recommend using specified color values for consistent image building.';");
content = content.replace("let secondaryColorDesc = '보조 색상은 브랜드 커뮤니케이션에 다양성을 부여하기 위해 보조적으로 사용되는 컬러입니다. 메인 컬러를 보조하는 역할로서 면적 비율에 있어 메인 컬러보다 적은 면적으로 사용되어야 합니다.';", "let secondaryColorDesc = 'Auxiliary colors add variety to brand communications. They assist the main color and should occupy a smaller area proportion.';");

content = content.replace(/인쇄용:/g, "For Print:");
content = content.replace(/가로기준 권장:/g, "Recommended width:");
content = content.replace(/최소/g, "Min");
content = content.replace(/디지털/g, "Digital");

fs.writeFileSync(targetFile, content);
console.log('en/about page.tsx MORE translations applied.');
