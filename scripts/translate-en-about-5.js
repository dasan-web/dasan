const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'app', 'en', 'about', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// The rest of the untranslated lines in page.tsx

content = content.replace(/1\. Corporate Philosophy and Core Values, 2\. CEO Message 등 Main Title/g, "1. Corporate Philosophy and Core Values, 2. CEO Message, etc. Main Title");
content = content.replace(/Sub Title \(다산의 정신으로\.\.\., With trust and innovation\.\.\., 4 Major Management Philosophies\)/g, "Sub Title (With the spirit of Dasan..., With trust and innovation..., 4 Major Management Philosophies)");

content = content.replace(/연구개발\(R&D\)부터 판매까지 의약품 전 주기의 <strong className="font-bold text-gray-900">Key Value Chain<\/strong> 인프라를 구축하여 고부가가치 사업 성장성을 확보하고 있습니다/g, "We have secured high value-added business growth by establishing a <strong className=\"font-bold text-gray-900\">Key Value Chain</strong> infrastructure for the entire pharmaceutical lifecycle from R&D to sales");

content = content.replace(/복잡한 패턴 위에 로고를 적용하는 경우/g, "When applying a logo on a complex pattern");
content = content.replace(/채도가 유사한 배경색에 로고를\\n적용하는 경우/g, "When applying a logo to a background color with similar saturation");
content = content.replace(/복잡한 이미지 위에 로고를 적용하는 경우/g, "When applying a logo over a complex image");
content = content.replace(/로고에 그림자를 적용하는경우/g, "When applying a shadow to a logo");

content = content.replace(/심볼마크의 의미/g, "Meaning of Symbol Mark");
content = content.replace(/인쇄용/g, "Print");

content = content.replace(/로고 최상의 시각적 효과 가독성 및 식별을 보장하기 위해 단독 적용 시 Min 사용 여백을 유지해야 합니다\. 표시된 심볼 주변 공간은 Min 여백을 나타내며 이 공간에는 다른 요소가 나타나지 않도록 적용하여야 합니다\./g, "To ensure the best visual effect, readability and identification of the logo, Min margins must be maintained when applied alone. The space around the displayed symbol represents the Min margin, and no other elements should appear in this space.");

content = content.replace(/Min 공간 규정의 기준 단위\(X\)는 심볼\(육각형\)의 절반 높이를 기준으로 설정한 가상선과 워드마크\(DASAN\) 상단 간의 거리에서 도출하였습니다\. 이는 심볼과 워드마크간의 구조적 비례 관계를 반영한 값으로, 로고의 일체감과 시각적 균형을 유지하기 위한 기준입니다\./g, "The standard unit (X) of the Min space regulation was derived from the distance between the imaginary line set based on half the height of the symbol (hexagon) and the top of the wordmark (DASAN). This is a value reflecting the structural proportional relationship between the symbol and the wordmark, and is a standard for maintaining the unity and visual balance of the logo.");

content = content.replace(/심볼\(육각형\) 높이를 잽니다\./g, "Measure the height of the symbol (hexagon).");
content = content.replace(/그 절반 위치에 가상의 수평선을 긋습니다\./g, "Draw a virtual horizontal line at its half position.");

content = content.replace(/Print Standard용/g, "For Print Standard");
content = content.replace(/Digital Screen용/g, "For Digital Screen");

content = content.replace(/경영, 영업, 구매, 사업개발 등 지속 가능한 미래 성장 전략 수립/g, "Establishment of management, sales, purchasing, business development, and sustainable future growth strategies");
content = content.replace(/중국 내 연구, 허가, 사업개발을 담당하는 글로벌 영토 확장의 전초기지/g, "An outpost for expanding global territory in charge of research, approval, and business development in China");

content = content.replace(/아산 제1공장 \/ 제2공장/g, "Asan Plant 1 / Plant 2");
content = content.replace(/원료 및 완제의약품, 내용고형제 대량 생산 체계 구축/g, "Establishment of mass production system for APIs, finished products, and solid dosage forms");
content = content.replace(/연간 약 40억 정의 생산 능력을 갖춘 중국 현지 전진 생산 기지/g, "Local advanced production base in China with an annual production capacity of about 4 billion tablets");

content = content.replace(/지속 가능한 비즈니스를 위한 ESG 선언/g, "ESG Declaration for Sustainable Business");

fs.writeFileSync(targetFile, content);
console.log('en/about page.tsx final translations applied.');
