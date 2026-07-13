const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/app/en/about/[[...slug]]/page.tsx');
let content = fs.readFileSync(file, 'utf8');

const replacements = {
  '다산제약_About us': 'Dasan_About Us',
  '다산제약의 기업개요, 연혁, 대표이사 메시지, 아산 공장 시설 및 연구소를 소개합니다. cGMP 인증을 획득한 신뢰받는 제약사입니다.': 'Introducing Asan plant facilities and R&D center. A trusted pharmaceutical company with cGMP certification.',
  '다산제약 연혁, 류형선 대표, 아산 공장 시설, cGMP 인증 제약사': 'Dasan Pharmaceutical history, CEO Ryu Hyung-sun, Asan plant facility, cGMP certified pharmaceutical company',
  '기술력 입증': 'Proven Technology',
  '30여 건 이상의 핵심 기술 특허와 국가 R&D 우수 과제 선정 레코드 보유': 'Holds over 30 core technology patents and selected for national R&D excellent projects',
  '글로벌 규격 생산': 'Global Standard Production',
  'c-GMP 급 준수 스마트 팩토리를 통한 엄격한 품질관리 체계 확립': 'Established strict quality control system through c-GMP compliant smart factory',
  '글로벌 파트너쉽': 'Global Partnership',
  '일본, 동남아, 남미 등 전세계 20여 개국 원료의약품 및 완제품 직수출': 'Direct export of API and finished products to over 20 countries worldwide',
  '인류의 건강과 행복한 삶에 공헌': 'Contributing to the health and happy life of mankind',
  '차별화된 제제 기술과 고품질의 의약품을 연구·생산·공급하여, 전 인류가 보다 건강하고 가치 있는 삶을 영위할 수 있도록 기여합니다.': 'We research, produce, and supply high-quality medicines with differentiated formulation technology to help mankind lead a healthier and more valuable life.',
  'DDS 기술 혁신 기반의 글로벌 헬스케어 리더': 'Global Healthcare Leader based on DDS Technology Innovation',
  '독보적인 약물전달시스템(DDS) 플랫폼 기술을 선도하며 완제 및 API 수출을 가속화하여, 글로벌 제약 바이오 시장에서 신뢰받는 최고의 파트너가 됩니다.': 'Leading the unique DDS platform technology and accelerating exports of finished products and API to become the most trusted partner in the global pharmaceutical bio market.',
  '신뢰와 책임': 'Trust and Responsibility',
  '생명을 살리는 사명감으로 고객과 환자의 두터운 신뢰에 정직과 품질로 보답합니다.': 'We reward the deep trust of customers and patients with honesty and quality, driven by a mission to save lives.',
  '변화와 실행': 'Change and Execution',
  '급변하는 글로벌 환경을 기민하게 포착하고, 망설임 없이 기회를 실행으로 바꿉니다.': 'We keenly capture the rapidly changing global environment and turn opportunities into execution without hesitation.',
  '상생과 협업': 'Coexistence and Collaboration',
  '부서 간 벽을 허무는 소통과 글로벌 파트너사와의 상생을 통해 더 큰 가치를 창출합니다.': 'We create greater value through communication that breaks down barriers between departments and coexistence with global partners.',
  '도전과 열정': 'Challenge and Passion',
  '새로운 기술과 글로벌 시장을 향해 멈추지 않는 도전정신으로 늘 한계에 맞섭니다.': 'We always face limits with an unstoppable challenging spirit towards new technologies and global markets.',
  '창의와 혁신\\|고정관념을 넘어서는 독자적인 아이디어로 다산제약만의 차별화된 솔루션을 구축합니다.': "Creativity and Innovation|We build Dasan Pharmaceutical's unique solutions with independent ideas beyond stereotypes.",
  '사람이 중심이 되는 기술, 정직으로 만드는 건강한 내일': 'People-centered technology, a healthy tomorrow made with honesty',
  '정도경영 \\(Ethical Management\\)': 'Ethical Management',
  '눈앞의 이익보다 절대적인 신뢰와 고품질 기준을 지켜내며, 투명하고 정직한 운영을 통해 사회적 가치에 책임을 다합니다.': 'We fulfill our responsibilities for social values through transparent and honest operations, maintaining absolute trust and high-quality standards over immediate profits.',
  'R&D 중심 성장 \\(R&D-Driven Innovation\\)': 'R&D-Driven Innovation',
  '매출액 대비 높은 비율을 신약 개발과 제제 기술 연구에 꾸준히 투자하여, 차별화된 특허 장벽과 고부가가치 DDS 플랫폼을 구축합니다.': 'We consistently invest a high percentage of our sales in new drug development and formulation technology research to build a differentiated patent barrier and high-value-added DDS platform.',
  '인재 중심 가치창출 \\(People First\\)': 'People First',
  '구성원 개개인의 자율성과 전문성을 전폭 지원하며, 임직원의 동반 성장이 곧 글로벌 다산의 경쟁력임을 굳게 믿고 실천합니다.': 'We fully support the autonomy and expertise of each member, firmly believing and practicing that the mutual growth of our employees is the competitiveness of Global Dasan.',
  '다산인의 건강한 문화': 'Healthy Culture of Dasan',
  '일할 때는 뜨겁게 몰입하고, 서로를 신뢰하고 배려하는 일터': 'A workplace where we work passionately, trust and care for each other',
  '유연하고 자율적인 몰입': 'Flexible and Autonomous Immersion',
  '시차출퇴근제 운영 및 자유로운 휴가 문화를 바탕으로 업무 효율성을 높이고 개개인의 소중한 라이프 스타일을 존중합니다.': "We increase work efficiency and respect each individual's precious lifestyle based on flexible working hours and a free vacation culture.",
  '배움과 성장의 기회': 'Opportunities for Learning and Growth',
  '임직원의 성장을 위해 직무 교육, 전문 도서 구매, 국내외 유수 학회 및 박람회 참가를 전폭적으로 보장하고 격려합니다.': 'We fully guarantee and encourage job training, professional book purchases, and participation in leading domestic and international conferences and exhibitions for the growth of our employees.',
  '수평적 소통과 배려': 'Horizontal Communication and Consideration',
  '직급과 부서를 초월하여 누구든 아이디어를 제안할 수 있는 타운홀 미팅과 상호 존중하는 피드백 문화를 지향합니다.': 'We aim for a town hall meeting where anyone can propose ideas regardless of rank or department, and a feedback culture of mutual respect.',
  '기업개요': 'Company Overview',
  '연혁': 'History',
  '대표이사 메시지': 'CEO Message'
};

for (const [kr, en] of Object.entries(replacements)) {
  const regex = new RegExp(kr.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&'), 'g');
  content = content.replace(regex, en);
}

fs.writeFileSync(file, content);
console.log('About page translated.');
