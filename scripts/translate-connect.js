const fs = require('fs');
const path = require('path');

// 1. Update src/app/en/contact/[[...slug]]/page.tsx
const contactPagePath = path.join(__dirname, '..', 'src', 'app', 'en', 'contact', '[[...slug]]', 'page.tsx');
let contactPage = fs.readFileSync(contactPagePath, 'utf8');

const contactReplacements = {
  "다산제약의 기업 성과 및 주요 미디어 보도자료 피드입니다.": "Dasan Pharmaceutical's corporate achievements and major media press release feed.",
  "다산제약의 다양한 미디어 및 홍보 자료 피드입니다.": "Dasan Pharmaceutical's various media and promotional materials feed.",
  "등록된 홍보자료가 없습니다.": "No promotional materials registered.",
  "도전, 혁신, 소통으로 미래를 여는 인재": "Talent opening the future with challenge, innovation, and communication",
  "다산제약은 최고의 전문성을 지향하며, 변화에 도전하고 상호 신뢰와 소통을 바탕으로 새로운 성장과 발전을 주도해 나가는 성실한 주역을 기다립니다.": "Dasan Pharmaceutical aims for top-tier expertise and awaits sincere individuals who challenge changes and lead new growth and development based on mutual trust and communication.",
  "전문적 도전": "Professional Challenge",
  "자기 분야 최고의 전문 지식을 고도화하며 타협하지 않는 열정으로 문제 해결에 도전.": "Enhancing top professional knowledge in one's field and challenging problem solving with uncompromising passion.",
  "혁신 지향": "Innovation-Oriented",
  "기존 관행을 뛰어넘는 창의적인 사고로 신기술 및 프로세스 효율화 혁신 구현.": "Implementing new technologies and process efficiency innovations with creative thinking beyond existing practices.",
  "신뢰와 협동": "Trust and Cooperation",
  "정직과 도덕적 의무를 철저히 지키며 동료 및 파트너와의 수평적 소통을 지향.": "Thoroughly observing honesty and moral duties and aiming for horizontal communication with colleagues and partners.",
  "채용 프로세스 안내": "Recruitment Process Guide",
  "다산제약은 지원자 한 분 한 분의 소중한 서류와 인성을 세밀히 검토하고 있습니다.": "Dasan Pharmaceutical carefully reviews the precious documents and personality of each applicant.",
  "서류 전형": "Document Screening",
  "기본 요건 검토": "Basic requirements review",
  "1차 실무 면접": "1st Practical Interview",
  "직무 적합성 및 역량": "Job suitability and competency",
  "2차 임원 면접": "2nd Executive Interview",
  "인성 및 미래 가치 평가": "Personality and future value evaluation",
  "최종 합격": "Final Acceptance",
  "입사 계약 조율": "Joining contract coordination"
};

for (const [kr, en] of Object.entries(contactReplacements)) {
  contactPage = contactPage.replace(new RegExp(kr, 'g'), en);
}
fs.writeFileSync(contactPagePath, contactPage);


// 2. Update src/app/en/contact/inquiry/check/page.tsx
const inquiryCheckPath = path.join(__dirname, '..', 'src', 'app', 'en', 'contact', 'inquiry', 'check', 'page.tsx');
let inquiryCheck = fs.readFileSync(inquiryCheckPath, 'utf8');
const inquiryCheckReplacements = {
  "제품 문의 및 영업 문의 접수 시 입력하셨던 이메일 주소를 입력하시면 접수된 문의글의 상태를 확인하실 수 있습니다.": "You can check the status of your inquiry by entering the email address you provided when submitting a product or sales inquiry.",
  "* 부패신고 문의(익명)의 경우, 조회용 기본 이메일인": "* For anonymous corruption reporting, you can check the submission status by entering the default inquiry email,",
  "을 입력하시면 익명 접수 완료 여부를 확인하실 수 있습니다.": ".",
  "조회할 이메일 주소 입력": "Enter the email address to search",
  "조회하기": "Search",
  "조회 결과를 찾을 수 없습니다.": "No search results found.",
  "상태": "Status",
  "대기 중": "Pending",
  "완료": "Completed",
  "이메일 주소를 입력해주세요.": "Please enter your email address."
};

for (const [kr, en] of Object.entries(inquiryCheckReplacements)) {
  inquiryCheck = inquiryCheck.replace(new RegExp(kr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), en);
}
fs.writeFileSync(inquiryCheckPath, inquiryCheck);

console.log('Connect translated!');
