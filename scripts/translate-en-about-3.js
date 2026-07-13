const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'app', 'en', 'about', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// General translations
content = content.replace(/회사소개/g, 'Company Overview');
content = content.replace(/독보적인 약물전달시스템\(DDS\) 플랫폼 기술을 선도하며 완제 및 API 수출을 가속화하여, 글로벌 제약 바이오 시장에서 신뢰받는 최고의 파트너가 됩니다\./g, 'Leading the unique Drug Delivery System (DDS) platform technology, we accelerate finished product and API exports to become the most trusted partner in the global pharmaceutical bio market.');

// CI translation
content = content.replace(/준비된 데이터 변수 - 순서대로 데이터가 들어갈 수 있도록 구성/g, 'Prepared data variables - configured to enter data in order');
content = content.replace(/필수 사용 \(3컬러\)/g, 'Mandatory Use (3 Colors)');
content = content.replace(/배경 명도에 따라 가독성을 우선 고려합니다\. 기본은 오리지널 컬러를 사용하며, 필요 시 White 또는 Soft Black 로고로 대체합니다\.\\n색상 변경은 사전 승인 후 적용합니다\./g, 'Readability is prioritized according to background brightness. The original color is used by default, replaced with White or Soft Black logo if necessary.\\nColor changes are applied after prior approval.');
content = content.replace(/로고 최상의 시각적 효과 가독성 및 식별을 보장하기 위해\\n단독 적용 시 Min 사용 여백을 유지해야 합니다\./g, 'To ensure the best visual effect, readability and identification of the logo,\\nMin margins must be maintained when applied alone.');
content = content.replace(/외부 사용자 Tip/g, 'External User Tip');
content = content.replace(/1\. 심볼\(육각형\) 높이를 잽니다\./g, '1. Measure the height of the symbol (hexagon).');
content = content.replace(/2\. 그 절반 위치에 가상의 수평선을 긋습니다\./g, '2. Draw a virtual horizontal line at its half position.');
content = content.replace(/3\. 그 선부터 DASAN 상단까지 거리 = X/g, '3. The distance from that line to the top of DASAN = X');
content = content.replace(/다산제약 로고를 임의로 변형하거나 왜곡하는 것을 금지하며, 표준 형태와 색상을 준수해야 합니다\./g, 'Arbitrarily modifying or distorting the Dasan Pharmaceutical logo is prohibited, and standard shapes and colors must be observed.');

content = content.replace(/'로고의 형태를 변경하는 경우'/g, "'When changing the shape of the logo'");
content = content.replace(/'심볼과 로고타입 조합의 비례를\\n임의로 변경한 경우'/g, "'When arbitrarily changing the proportion\\nof symbol and logotype combination'");
content = content.replace(/'로고의 서체를 다르게 적용하는 경우'/g, "'When applying a different font to the logo'");
content = content.replace(/'로고 비율 규정\\n기존 비율 2048px, 776px \[2.64:1\(2.6:1\)\]'/g, "'Logo proportion rule\\nOriginal proportion 2048px, 776px [2.64:1(2.6:1)]'");
content = content.replace(/'지정색 이외의 색상을 적용하는 경우'/g, "'When applying colors other than the designated colors'");
content = content.replace(/'로고의 테두리에 색 또는 효과를\\n적용하는 경우'/g, "'When applying colors or effects\\nto the border of the logo'");
content = content.replace(/'로고에 그라데이션을 적용하는 경우'/g, "'When applying gradation to the logo'");

content = content.replace(/다산\(茶山\)의 정신으로/g, 'With the spirit of Dasan');
content = content.replace(/신뢰와 혁신으로/g, 'With trust and innovation');
content = content.replace(/4대 경영 철학/g, '4 Major Management Philosophies');
content = content.replace(/핵심 가치/g, 'Core Values');
content = content.replace(/기업 이념 및 핵심가치/g, 'Corporate Philosophy and Core Values');
content = content.replace(/CEO 메시지/g, 'CEO Message');
content = content.replace(/메인 타이틀/g, 'Main Title');
content = content.replace(/서브 타이틀/g, 'Sub Title');
content = content.replace(/불릿 리스트/g, 'Bullet List');
content = content.replace(/일반 단락/g, 'General Paragraph');

// Location
content = content.replace(/충청남도 아산시 선장면 삽교천로 156-42 \(271-28\)/g, '156-42 Sapgyocheon-ro, Seonjang-myeon, Asan-si, Chungcheongnam-do');
content = content.replace(/충청남도 아산시 둔포면 아산밸리동로 271/g, '271 Asanvalley-dongro, Dunpo-myeon, Asan-si, Chungcheongnam-do');
content = content.replace(/서울시 송파구 법원로 128, SK V1 GL메트로시티 A동 1102호/g, '1102, Bldg A, SK V1 GL Metro City, 128 Beobwon-ro, Songpa-gu, Seoul');
content = content.replace(/경기도 수원시 영통구 창룡대로 256번길 91, 10층 1010-1014호/g, '10F 1010-1014, 91 Changnyong-daero 256beon-gil, Yeongtong-gu, Suwon-si, Gyeonggi-do');

content = content.replace(/길찾기/g, 'Get Directions');

fs.writeFileSync(targetFile, content);
console.log('en/about page.tsx 3rd translations applied.');
