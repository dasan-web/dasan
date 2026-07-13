const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'app', 'en', 'about', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Location section
content = content.replace(/\(서브 로고도 동일하게 적용됩니다\)/g, "(The same applies to the sub logo)");
content = content.replace(/Min 공간 규정은 기본 단위\(X\)를 심볼\(육각형\)의 절반 높이와 동일하게 설정하여, 가상의 수평선과 워드마크\(DASAN\) 상단 간의 거리에서 도출된 것입니다\. 이는 심볼과 워드마크간의 구조적 비례 관계를 반영한 값으로, 로고의 입체감과 시각적 균형을 유지하기 위한 기준입니다\./g, "The Min space regulation is derived from the distance between the imaginary horizontal line and the top of the wordmark (DASAN) by setting the basic unit (X) equal to half the height of the symbol (hexagon). This is a value reflecting the structural proportional relationship between the symbol and the wordmark, and is a standard for maintaining the 3D effect and visual balance of the logo.");
content = content.replace(/1\. 심볼\(육각형\) 높이를 잽니다\./g, "1. Measure the height of the symbol (hexagon).");
content = content.replace(/2\. 그 절반 위치에 가상의 수평선을 긋습니다\./g, "2. Draw an imaginary horizontal line at its half position.");
content = content.replace(/3\. 그 선부터 DASAN 상단까지 거리 = X/g, "3. The distance from that line to the top of DASAN = X");

content = content.replace(/인쇄 기준/g, "Print Standard");
content = content.replace(/Digital 화면/g, "Digital Screen");
content = content.replace(/연구개발에서 생산, 글로벌 시장 진출까지 유기적으로 연결된 다산제약의 핵심 거점입니다\./g, "It is the core base of Dasan Pharmaceutical organically connected from R&D to production and entering the global market.");
content = content.replace(/글로벌 인프라 현황 \(Global Infrastructure\)/g, "Global Infrastructure");

content = content.replace(/본사/g, "HQ");
content = content.replace(/서울 영등포구 선유로 70/g, "70 Seonyu-ro, Yeongdeungpo-gu, Seoul");
content = content.replace(/경영, 영업, 구매, 사업개발 및 지속 가능한 미래 성장 전략 수립/g, "Establishment of management, sales, purchasing, business development, and sustainable future growth strategies");
content = content.replace(/R&D 네트워크/g, "R&D Network");
content = content.replace(/다산 중앙연구소/g, "Dasan Central R&D Center");
content = content.replace(/경기 수원시/g, "Suwon, Gyeonggi");
content = content.replace(/제제 및 합성 관련 연구시설을 갖추고 연구개발 총괄/g, "Equipped with formulation and synthesis-related research facilities to oversee R&D");
content = content.replace(/중국 심양연구소/g, "Shenyang R&D Center, China");
content = content.replace(/중국 심양시/g, "Shenyang, China");
content = content.replace(/중국 내 연구, 허가, 사업개발을 전담하는 글로벌 진출 시장의 전초기지/g, "An outpost for the global market dedicated to research, approval, and business development in China");
content = content.replace(/글로벌 생산 기지/g, "Global Production Base");
content = content.replace(/다산 1공장 \/ 2공장/g, "Dasan Plant 1 / Plant 2");
content = content.replace(/충남 아산시/g, "Asan, Chungnam");
content = content.replace(/원료 및 완제의약품, 내용고형제 특화 생산 체계 구축/g, "Establishment of a specialized production system for APIs, finished products, and solid dosage forms");
content = content.replace(/MHLW, GMP 인증 완료/g, "MHLW, GMP Certification Completed");
content = content.replace(/중국 안휘성/g, "Anhui, China");
content = content.replace(/연간 약 40억 정의 생산 능력을 갖춘 중국 내 선진 생산 기지/g, "Advanced production base in China with an annual production capacity of about 4 billion tablets");
content = content.replace(/찾아오시는 길 & 지도/g, "Location & Map");
content = content.replace(/찾아오시는 길/g, "Location");
content = content.replace(/지속가능한 비즈니스를 위한 ESG 선언/g, "ESG Declaration for Sustainable Business");
content = content.replace(/\(입력된 문구가 여기에 표시됩니다\)/g, "(The entered text will be displayed here)");
content = content.replace(/다산제약은 신약 개발을 통한 보건 기여뿐만 아니라, 미래 세대를 위한 친환경 공정 도입, 철저한 안전 보건 관리, 투명하고 정의로운 윤리경영 실천에 앞장섭니다\./g, "Dasan Pharmaceutical not only contributes to health through new drug development, but also takes the lead in introducing eco-friendly processes for future generations, thoroughly managing safety and health, and practicing transparent and just ethical management.");
content = content.replace(/친환경, 고효율, 자원화 시스템 가동 및 에너지 사용 절감 목표 수립/g, "Establishment of goals to operate eco-friendly, highly efficient, and resource-oriented systems and reduce energy use");
content = content.replace(/임직원의 안전을 위한 ISO45001\(안전보건경영\) 시스템 유지 및 정기 검사/g, "Maintenance and regular inspection of ISO45001 (Safety and Health Management) system for the safety of executives and employees");
content = content.replace(/부패방지 가이드라인 실천, 임직원 자율적 공정거래 자율준수프로그램\(CP\) 교육 의무화/g, "Practice anti-corruption guidelines, mandate employee voluntary fair trade compliance program (CP) training");
content = content.replace(/주주 중심 경영과 공정한 기업 가치 평가/g, "Shareholder-centered management and fair corporate valuation");
content = content.replace(/다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개하고 있습니다\. 주주 및 투자자 여러분의 이해를 돕기 위해 수시로 재무 핵심 지표를 제공합니다\./g, "Dasan Pharmaceutical's management performance and investment disclosure data are disclosed clearly and faithfully in accordance with relevant laws and regulations. We provide key financial indicators from time to time to help shareholders and investors understand.");

// Financial tables
content = content.replace(/2023년\(개별\)/g, "2023 (Separate)");
content = content.replace(/2024년\(개별\)/g, "2024 (Separate)");
content = content.replace(/2025년\(연결\)/g, "2025 (Consolidated)");
content = content.replace(/'매출액'/g, "'Sales'");
content = content.replace(/'영업이익'/g, "'Operating Profit'");
content = content.replace(/'R&D 투자액'/g, "'R&D Investment'");

content = content.replace(/'유동자산'/g, "'Current Assets'");
content = content.replace(/'비유동자산'/g, "'Non-current Assets'");
content = content.replace(/'자산총계'/g, "'Total Assets'");
content = content.replace(/'유동부채'/g, "'Current Liabilities'");
content = content.replace(/'비유동부채'/g, "'Non-current Liabilities'");
content = content.replace(/'부채총계'/g, "'Total Liabilities'");
content = content.replace(/'자본금'/g, "'Capital Stock'");
content = content.replace(/'자본잉여금'/g, "'Capital Surplus'");
content = content.replace(/'기타자본'/g, "'Other Capital'");
content = content.replace(/'이익잉여금'/g, "'Retained Earnings'");
content = content.replace(/'비지배지분'/g, "'Non-controlling Interests'");
content = content.replace(/'자본총계'/g, "'Total Equity'");

content = content.replace(/'법인세차감전이익'/g, "'Profit Before Tax'");
content = content.replace(/'당기순이익'/g, "'Net Income'");

content = content.replace(/재무 항목 \(단위: 백만원\)/g, "Financial Items (Unit: Million KRW)");

// IR Announcement
content = content.replace(/2026년 1분기 재무 성과 요약 및 IR 공시 안내/g, "Summary of Q1 2026 Financial Performance and IR Disclosure Guide");
content = content.replace(/1분기 매출 증가율, 연구개발 R&D 투자 비율 등 핵심 재무 실적이 공시 정보로 공식적으로 반영되었습니다\./g, "Key financial results such as Q1 sales growth rate and R&D investment ratio have been officially reflected in the disclosure information.");
content = content.replace(/2026년도 정기 주주총회 소집 공고/g, "Notice of Convocation of the 2026 Annual General Meeting of Shareholders");
content = content.replace(/정기 주주총회 소집 장소 및 의결 사항 등 상세 정보 안내문입니다\./g, "This is a detailed information guide including the location of the regular general meeting of shareholders and items to be resolved.");
content = content.replace(/다산제약의 기업 성과 및 주요 IR 공시 보도 소식입니다\./g, "This is news on Dasan Pharmaceutical's corporate performance and major IR disclosures.");
content = content.replace(/상세 정보는 준비 중입니다\./g, "Detailed information is being prepared.");


fs.writeFileSync(targetFile, content);
console.log('en/about page.tsx 4th translations applied.');
