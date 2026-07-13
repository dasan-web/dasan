const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'en', 'business', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
  "let tag = '신제품 출시';": "let tag = 'New Product Launch';",
  "let title = \"복합 고혈압 개량신약 '피마사탄/암로디핀' 출시 승인\";": "let title = \"Approval for Launch of Combination Hypertension IMD 'Fimasartan/Amlodipine'\";",
  "let desc = '자체 DDS 특허 서방성 과립 코팅 기술을 사용해 환자의 복용 크기를 축소시킨 고혈압 치료제 판매가 시작되었습니다.';": "let desc = 'Sales of a hypertension treatment that reduced the patient\\'s dosage size using our own DDS patented sustained-release granule coating technology have begun.';",
  
  "let desc = '다산제약은 높은 순도와 엄격한 결정 형태 조절 기술을 통해 국내외 유수 제약사들에 고부가가치 원료의약품(API)을 공급하고 있습니다.';": "let desc = 'Dasan Pharmaceutical is supplying high-value-added Active Pharmaceutical Ingredients (APIs) to leading domestic and international pharmaceutical companies through high purity and strict crystal form control technology.';",
  "let card1Title = '주요 API 파이프라인';": "let card1Title = 'Major API Pipeline';",
  "let card1Desc = 'Fimasartan, Dapagliflozin, Sitagliptin, Metformin 고순도 활성 성분을 직접 합성하여 연간 수십 톤 규모로 납품 가능합니다.';": "let card1Desc = 'We directly synthesize high-purity active ingredients such as Fimasartan, Dapagliflozin, Sitagliptin, and Metformin, and can supply tens of tons annually.';",
  "let card2Title = '중간체 정밀 유기합성';": "let card2Title = 'Intermediate Precision Organic Synthesis';",
  "let card2Desc = '원료의 전구체 단계를 고효율 반응 공정으로 연구 및 위탁 생산하여 원가 절감과 대량 수급 안정성을 제공합니다.';": "let card2Desc = 'We provide cost reduction and mass supply stability by researching and contract manufacturing the precursor stages of raw materials through highly efficient reaction processes.';",
  
  "let intro = '다산제약은 단순 위탁 생산(CMO)의 단계를 넘어 약물의 제제 개발부터 임상 배치 생산, 시판 승인 신청(NDA) 지원까지 일원화된 위탁 개발 생산(CDMO) 원스톱 서비스를 지원합니다.';": "let intro = 'Dasan Pharmaceutical goes beyond simple contract manufacturing (CMO) to provide a unified one-stop contract development and manufacturing (CDMO) service from drug formulation development to clinical batch production and New Drug Application (NDA) support.';",
  "let bullet1Title = '우수한 품질관리(QA/QC)';": "let bullet1Title = 'Excellent Quality Control (QA/QC)';",
  "let bullet1Desc = '한국 식약처 KGMP 인증 보유 및 cGMP 기준 분석 장비와 데이터 무결성(Data Integrity) 지침 철저 운영.';": "let bullet1Desc = 'Holds Korea MFDS KGMP certification and thoroughly operates cGMP standard analytical equipment and Data Integrity guidelines.';",
  "let bullet2Title = '특화된 과립 코팅 기술';": "let bullet2Title = 'Specialized Granule Coating Technology';",
  "let bullet2Desc = '입자가 미세한 API의 용출 속도를 제어하는 유동층 과립기 및 정밀 정제 타정 공정 장치 다수 운영.';": "let bullet2Desc = 'Operates multiple fluid bed granulators and precision tablet tableting process equipment that control the dissolution rate of fine-particle APIs.';",
  "let bullet3Title = '글로벌 콜드체인 물류';": "let bullet3Title = 'Global Cold Chain Logistics';",
  "let bullet3Desc = '생물학적 활성을 보존해야 하는 원료 및 중간체의 완벽한 보관 온습도 관리를 통한 글로벌 항공/해상 물류망 확보.';": "let bullet3Desc = 'Securing a global air/sea logistics network through perfect storage temperature and humidity control of raw materials and intermediates that must preserve biological activity.';"
};

// Apply all replacements
for (const [target, replacement] of Object.entries(replacements)) {
  if (content.includes(target)) {
    content = content.replace(target, replacement);
  } else {
    console.log('Could not find:', target);
  }
}

fs.writeFileSync(filePath, content);
console.log('Translated Business page!');
