const fs = require('fs');
const path = require('path');

function fixPage(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix activeTitle and activeMajor
  content = content.replace(/activeTitle = sub\.name;/g, "activeTitle = sub.enName || sub.name;");
  content = content.replace(/activeMajor = major\.name;/g, "activeMajor = major.enName || major.name;");

  // Fix grand parent variable name based on navigationData
  content = content.replace(/finalTitle === '연구소 소개' \|\| finalTitle === '연구 활동' \|\| finalTitle === '파이프라인'/g, "finalTitle === 'R&D Center Intro' || finalTitle === 'R&D Activities' || finalTitle === 'Pipeline'");
  content = content.replace(/'다산제약_R&D'/g, "'Dasan Pharmaceutical_R&D'");
  content = content.replace(/'DDS 플랫폼 기술, 유동층 코팅 기술, 쇼핑몰센터'/g, "'DDS Platform Technology, Fluid Bed Coating Technology'");
  content = content.replace(/'다산제약의 약물전달시스템\(DDS\) 플랫폼 기술, 유동층 코팅 기술 등 독보적인 제제 기술 연구개발 역량을 소개합니다\.'/g, "'We introduce Dasan Pharmaceutical\\'s unique formulation technology R&D capabilities such as Drug Delivery System (DDS) platform technology and fluid bed coating technology.'");

  content = content.replace(/수원 중앙연구소 - 혁신 신약의 메카/g, "Suwon Central R&D Center - Mecca of Innovative New Drugs");
  content = content.replace(/다산제약의 중앙연구소는 석·박사급 우수 연구인력과 고해상도 분광기 등 HPLC 크로마토그래피 등 글로벌 세팅의 연구 인프라를 바탕으로 희귀난치성 질환 원기질 확보 및 DDS 복합 제제 개발을 이끌어내고 있습니다\./g, "Dasan Pharmaceutical\\'s Central R&D Center is leading the securing of base materials for rare and incurable diseases and the development of DDS complex formulations based on excellent researchers with master\\'s and doctoral degrees and global-setting research infrastructure such as high-resolution spectrometers and HPLC chromatography.");
  
  content = content.replace(/합성 연구 파트/g, "Synthesis Research Part");
  content = content.replace(/신약 합성 루트 설계, 특허 회피가 가능한 신규 고순도 원료의약품\(API\) 공정 개발/g, "Design of new drug synthesis routes, process development of new high-purity APIs capable of avoiding patents");
  content = content.replace(/제제 연구 파트/g, "Formulation Research Part");
  content = content.replace(/약물방출조절\(DDS\), 복합제 설계, 용해도 개선 및 제형 차별화 연구/g, "Drug release control (DDS), complex design, solubility improvement, and formulation differentiation research");

  content = content.replace(/다산제약의 핵심 연구 성과는 고유의 DDS\(약물전달시스템\) 설계 능력에 기인합니다\. 복용 편의성을 개선하고 부작용을 최소화하는 혁신적인 formulation 플랫폼을 확보하고 있습니다\./g, "Dasan Pharmaceutical\\'s core research achievements originate from its unique DDS (Drug Delivery System) design capabilities. We secure innovative formulation platforms that improve medication convenience and minimize side effects.");
  content = content.replace(/DDS\(약물전달시스템\) 플랫폼 기술/g, "DDS (Drug Delivery System) Platform Technology");
  content = content.replace(/체내에서 약물이 서서히 방출되도록 설계하는 서방성 복합제 플랫폼을 보유하여 복용 횟수를 1일 3회에서 1일 1회로 개선하는 기술력 확보\./g, "Secured technology to improve the number of medications from 3 times a day to once a day by possessing a sustained-release complex platform designed to release drugs slowly in the body.");
  content = content.replace(/마이크로캡슐화 기술/g, "Microencapsulation Technology");
  content = content.replace(/약물 분자를 머리카락 굵기의 미세 캡슐로 보호하여 위장 장애를 최소화하고 표적 부위에서 효율적으로 흡수되도록 유도\./g, "Minimize gastrointestinal disorders by protecting drug molecules with microcapsules the thickness of a hair and induce efficient absorption at the target site.");
  content = content.replace(/상세 정보는 준비 중입니다\./g, "Detailed information is being prepared.");

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

fixPage(path.join(__dirname, '..', 'src', 'app', 'en', 'rd', '[[...slug]]', 'page.tsx'));
fixPage(path.join(__dirname, '..', 'src', 'app', 'en', 'business', '[[...slug]]', 'page.tsx'));
