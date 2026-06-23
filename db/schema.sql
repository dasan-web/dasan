-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS dasan_homepage CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE dasan_homepage;

DROP TABLE IF EXISTS inquiries, pipeline, news, products, admin_contents;

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News/IR Board Table
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    views INT DEFAULT 0,
    file_url VARCHAR(255) DEFAULT NULL,
    file_name VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pipeline Table
CREATE TABLE IF NOT EXISTS pipeline (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    project_name VARCHAR(100) NOT NULL,
    disease VARCHAR(200) NOT NULL,
    phase VARCHAR(50) NOT NULL, -- '기초연구', '전임상', '임상 1상', '임상 2상', '임상 3상', '허가'
    partner VARCHAR(100) DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Sample Pipeline Data
INSERT INTO pipeline (category, project_name, disease, phase, partner) VALUES
('개량신약', 'SLIM2403', '비만치료제', '기초연구', ''),
('개량신약', 'SLIM2402', '항암·면역보조치료제', '기초연구', ''),
('개량신약', 'SLIM2401', '류마티스관절염치료제', '기초연구', ''),
('자료 제출 의약품', 'SIST2402', '고혈압(최초복합제) 치료제', '기초연구', ''),
('퍼스트 제네릭', 'SIST2301', '위식도역류(P-CAB) 치료제', '임상 3상', ''),
('퍼스트 제네릭', 'SIST2401', '고지혈증 치료제', '임상 3상', '');

-- Insert Sample News/IR Data
INSERT INTO news (category, title, content, views) VALUES
('press', '다산제약, 신규 R&D 연구센터 개소로 혁신 신약 파이프라인 가속화', '다산제약이 최첨단 신약 연구센터를 공식 오픈하고 차세대 의약품 파이프라인 개발에 속도를 냅니다. 연구소 소개 및 인터뷰 내용 포함...', 124),
('press', '다산제약, 글로벌 제약사와 CDMO 협력 양해각서(MOU) 체결', '본 협약을 통해 고난도 고형제 및 개량신약 위탁개발생산(CDMO) 사업 영역을 글로벌 시장으로 본격 확장할 예정입니다.', 98),
('ir', '2026년 제1분기 재무 성과 요약 및 IR 공시 안내', '1분기 매출 증가율 및 연구개발 투자 비율 등 핵심 재무 실적이 공시 정보에 반영되었습니다.', 56),
('ir', '2026년도 정기 주주총회 소집 공고', '정기 주주총회 소집 장소 및 의결 사항 등 상세 정보 안내문입니다.', 74);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    english_name VARCHAR(150),
    type VARCHAR(50) NOT NULL, -- '전문의약품', '일반의약품'
    efficacy VARCHAR(100) NOT NULL,
    consonant VARCHAR(10) NOT NULL,
    file_url VARCHAR(255) DEFAULT NULL,
    file_name VARCHAR(255) DEFAULT NULL
);

-- Insert Initial Products Data
INSERT INTO products (name, english_name, type, efficacy, consonant) VALUES
('클피그렐정 75mg', 'CLPIGREL', '전문의약품', '동맥경화용제', 'ㅋ'),
('에스클러캡슐', 'ESCLOR Cap.', '전문의약품', '기타의화학요법제', 'ㅇ'),
('리얼리정', 'REALLY Tab.', '전문의약품', '해열,진통,소염제', 'ㄹ'),
('올메히드플러스정 20/12.5mg', 'OLMEHID Plus Tab.', '전문의약품', '혈압강하제', 'ㅇ'),
('피마사탄정 60mg', 'Fimasartan Potassium 60mg', '전문의약품', '혈압강하제', 'ㅍ'),
('다파글리정 10mg', 'Dapagliflozin propanediol 10mg', '전문의약품', '당뇨병치료제', 'ㄷ'),
('다산 비타C 1000', 'Ascorbic Acid 1000mg', '일반의약품', '비타민제', 'ㄷ');

-- Admin Contents Table for Static Pages
CREATE TABLE IF NOT EXISTS admin_contents (
    page_key VARCHAR(100) PRIMARY KEY,
    page_title VARCHAR(200) NOT NULL,
    content TEXT,
    is_hidden TINYINT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Default Contents
INSERT INTO admin_contents (page_key, page_title, content) VALUES
('about/intro', '회사소개', '다산제약은 1996년 설립 이후 끊임없는 연구개발과 과감한 투자를 통해 고품질의 의약품을 제공함으로써 국민 보건 증진과 삶의 질 향상에 기여해 왔습니다. 차별화된 제제 기술력을 보유한 개량신약 전문 제약회사로서 글로벌 시장을 무대로 뻗어나가고 있습니다.\n\n현재 마이크로캡슐화 기술 등 특화된 제형 기술을 중심으로 원료의약품 합성에서 완제의약품 제조까지 수직계열화를 완성하였으며, 이를 기반으로 글로벌 CDMO 기업으로 성장하고 있습니다.'),
('about/intro/competencies', '핵심역량(그림1)', '기술력 입증|30여 건 이상의 핵심 기술 특허와 국가 R&D 우수 과제 선정 레코드 보유\n글로벌 규격 생산|c-GMP 급 준수 스마트 팩토리를 통한 엄격한 품질관리 체계 확립\n글로벌 파트너쉽|일본, 동남아, 남미 등 전세계 20여 개국 원료의약품 및 완제품 직수출'),
('about/intro/vision', '비전/미션(그림2)', '인류의 건강과 행복한 삶에 공헌|차별화된 제제 기술과 고품질의 의약품을 연구·생산·공급하여, 전 인류가 보다 건강하고 가치 있는 삶을 영위할 수 있도록 기여합니다.\nDDS 기술 혁신 기반의 글로벌 헬스케어 리더|독보적인 약물전달시스템(DDS) 플랫폼 기술을 선도하며 완제 및 API 수출을 가속화하여, 글로벌 제약 바이오 시장에서 신뢰받는 최고의 파트너가 됩니다.'),
('about/intro/values', '핵심가치(그림3)', 'Devotion|신뢰와 책임|생명을 살리는 사명감으로 고객과 환자의 두터운 신뢰에 정직과 품질로 보답합니다.\nAgility|변화와 실행|급변하는 글로벌 환경을 기민하게 포착하고, 망설임 없이 기회를 실행으로 바꿉니다.\nSynergy|상생와 협업|부서 간 벽을 허무는 소통과 글로벌 파트너사와의 상생을 통해 더 큰 가치를 창출합니다.\nAspire|도전과 열정|새로운 기술과 글로벌 시장을 향해 멈추지 않는 도전정신으로 늘 한계에 맞섭니다.\nNovelty|창의와 혁신|고정관념을 넘어서는 독자적인 아이디어로 다산제약만의 차별화된 솔루션을 구축합니다.'),
('about/intro/philosophy', '경영철학(그림4)', '사람이 중심이 되는 기술, 정직으로 만드는 건강한 내일|정도경영 (Ethical Management)|눈앞의 이익보다 절대적인 신뢰와 고품질 기준을 지켜내며, 투명하고 정직한 운영을 통해 사회적 가치에 책임을 다합니다.\nR&D 중심 성장 (R&D-Driven Innovation)|매출액 대비 높은 비율을 신약 개발과 제제 기술 연구에 꾸준히 투자하여, 차별화된 특허 장벽과 고부가가치 DDS 플랫폼을 구축합니다.\n인재 중심 가치창출 (People First)|구성원 개개인의 자율성과 전문성을 전폭 지원하며, 임직원의 동반 성장이 곧 글로벌 다산의 경쟁력임을 굳게 믿고 실천합니다.'),
('about/business-area', '사업영역', '완제의약품 R&D 및 마케팅, 글로벌 원료의약품(API) 공급, 그리고 약물방출조절(DDS) 기반 고품격 위탁생산개발(CDMO) 서비스를 바탕으로 세계인의 삶의 질을 높입니다.'),
('about/history', '연혁', '1996년 설립 이후 다산제약은 자체 DDS 플랫폼 확립, 수원 중앙연구소 개소, 2026년 글로벌 시장 진출 가속화 등 끊임없는 도전을 거듭하며 혁신적 바이오 헬스케어 리더로 성장해왔습니다.'),
('about/ci', 'CI', '다산제약의 CI는 독자적인 연구 플랫폼과 신약 파이프라인 개발을 향한 끝없는 도전, 그리고 인류의 건강을 최우선으로 생각하는 핵심 이념을 시각적으로 형상화하고 있습니다.\n다산제약의 심볼은 과학과 생명의 조화로운 결합을 나타냅니다. 육각형 구조는 신약 개발 및 연구의 정밀한 화학적 결합과 견고한 기술력을 의미하며, 내부에 배치된 초록 나뭇잎은 인류의 생명 건강 증진과 친환경 미래 생명공학 리더로 성장하겠다는 비전을 상징합니다.\nDASAN GREEN\nRGB: 116, 184, 22 | HEX: #74B816\n#74B816\n생명력, 인류의 건강, 지속가능한 경영 가치 상징\nDASAN CHARCOAL\nRGB: 43, 43, 43 | HEX: #2B2B2B\n#2B2B2B\n기술적인 전문성, 정직한 기업 경영과 신뢰성 상징'),
('about/facilities', '공장 및 연구소', '다산제약은 고난도 제형 연구를 선도하는 수원 R&D 중앙연구소와 선진 GMP(KGMP) 규격에 부합하는 아산 제1, 2공장을 가동하여 연구개발에서 생산에 이르는 완성도 높은 제약 솔루션을 제공합니다.\n수원 중앙연구소\n경기 수원시 영통구 신원로 304(원천동) 이노플렉스 3동 306호\n약물전달시스템(DDS) 플랫폼 설계, 복합 개량신약 제제 연구, 원료의약품(API) 고효율 합성 공정 개발\n고해상도 분광광도계, 초고성능 액체크로마토그래피(UPLC), 나노 입자 입도분석기 등 최첨단 제제 분석 설비 보유\n아산 제1공장\n충청남도 아산시 도고면 덕암산로 342\n완제의약품 (정제, 캡슐제, 유동층 과립제품 등)\n독일 Glatt社 최첨단 유동층 코팅기 (GPCG-300, GPCG-120), 초고속 이중정 타정기, 중앙 자동화 컨트롤 모니터링 시스템\n연간 최대 9억 정 규모 고형제 생산 라인\n아산 제2공장\n충청남도 아산시 도고면 덕암산로 381\n의약품 포장 공정 자동화 및 스마트 물류창고\n독일 및 이탈리아산 고속 블리스터(Alu-Alu, PVC/PVDC) 포장기, 카토너 카운터 일원화 라인, 실시간 온습도 조절 항온물류창고\n정제 선별 고해상도 인쇄 선별 장치, 고성능 스마트 집진 시스템'),
('about/location', '찾아오시는 길', '서울 본사\n경영총괄, 해외 영업본부, 마케팅 전략부서\n37.5186,126.8906\n다산제약 서울 본사\n서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호\n02-2627-5300\n2호선 문래역 3번 출구 도보 8분|2/5호선 영등포구청역 6번 출구 도보 10분\n우리벤처타운 정류장 하차|지선 6625, 6640A번 / 마을 영등포05번\n수원 중앙연구소\nDDS 제제 연구, 유기합성 연구\n37.266205,127.054366\n다산제약 수원 중앙연구소\n경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호\n031-546-8200\n수인분당선 영통역 또는 청명역 하차 후 시내버스 환승 이용|수인분당선 망포역 4번 출구 도보 15분 (또는 버스 환승)\n이노플렉스 정류장 하차|일반 62-1, 82-1, 99번 / 마을 55번\n아산 제1공장\n완제의약품 생산본부\n36.7589,126.8687\n다산제약 아산 제1공장\n충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)\n041-543-5311\n1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용\n와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용\n아산 제2공장\n최첨단 스마트 패키징 & 대량생산 라인\n36.7621,126.8698\n다산제약 아산 제2공장\n충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)\n041-428-9484\n1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용\n와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용'),
('about/esg/ethics', '윤리경영', '다산제약은 준법감시 제도를 도입하여 투명하고 정직한 경영 문화를 실천합니다.'),
('about/esg/environment', '환경경영', '친환경 원료 합성 공정 및 폐기물 감소 솔루션을 통해 지구 환경 보존에 기여합니다.'),
('about/esg/safety', '안전보건경영', '임직원의 안전한 근무 환경을 보장하기 위해 산업안전보건 지침을 철저히 준수합니다.'),
('seo/main', '메인페이지 SEO', '다산제약 | 의약품 CDMO 기업|다산제약, 의약품 CDMO 기업, Dasan Pharmaceutical, dspharm|다산제약은 지속적인 연구개발과 고품질의 의약품 생산을 통해 건강한 삶을 만들어가는 글로벌 제약회사입니다.'),
('seo/about', 'About Us SEO', 'About Us | 다산제약|다산제약 연혁, 류형선 대표, 아산 공장 시설, cGMP 인증 제약사|다산제약의 기업개요, 연혁, 대표이사 메시지, 아산 공장 시설 및 연구소를 소개합니다. cGMP 인증을 획득한 신뢰받는 제약사입니다.'),
('seo/business', 'Business SEO', 'Business | 다산제약|의약품 CDMO, 완제의약품 위탁생산, Pharmaceutical CDMO, CMO|다산제약의 완제의약품, API 원료의약품 공급 및 의약품 위탁개발생산(CDMO) 사업 영역을 소개합니다.'),
('seo/rd', 'R&D SEO', 'R&D | 다산제약|DDS 플랫폼 기술, 유동층 코팅 기술, 제품센터|다산제약의 약물전달시스템(DDS) 플랫폼 기술, 유동층 코팅 기술 등 독보적인 제제 기술 연구개발 역량을 소개합니다.'),
('seo/contact', 'Contact SEO', 'Contact | 다산제약|다산제약 뉴스룸, 보도자료, 미디어, 인재채용, 채용프로세스|다산제약의 뉴스룸, 언론 보도, 미디어 자료 및 인재 채용 정보를 확인하실 수 있습니다.'),
('seo/contact/newsroom/press', '보도자료 SEO', '보도자료 | 다산제약|다산제약 보도자료, 보도뉴스, 언론보도|다산제약의 주요 소식과 언론 보도자료를 신속하고 정확하게 알려드립니다.'),
('seo/contact/newsroom/media', '홍보자료실 SEO', '홍보자료실 | 다산제약|다산제약 홍보자료, 기업소식, 미디어자료|다산제약의 미디어 자료 및 다양한 홍보 콘텐츠를 제공합니다.'),
('seo/contact/careers/talent', '인재상 SEO', '인재상 | 다산제약|다산제약 인재상, 채용, 기업 인재|다산제약과 함께 미래를 열어갈 창의적이고 도전적인 인재를 찾습니다.'),
('seo/contact/careers/process', '채용프로세스 SEO', '채용프로세스 | 다산제약|다산제약 입사지원, 채용절차, 서류전형, 면접전형|다산제약의 채용 과정과 전형 단계별 정보를 상세히 안내해 드립니다.'),
('seo/contact/careers/jobs', '채용공고 SEO', '채용공고 | 다산제약|다산제약 채용공고, 모집부문, 상시채용|다산제약에서 현재 진행 중인 채용 공고를 안내해 드립니다.'),
('seo/contact/inquiry', '1:1 고객 문의 SEO', '1:1 고객 문의 | 다산제약|다산제약 1:1 문의, 고객지원, 제휴 문의, CDMO 문의|다산제약에 궁금한 점을 문의하시면 친절하게 답변해 드립니다. 제약 위탁개발(CDMO), 원료 공급, 일반 제휴 문의.'),
('seo/contact/inquiry/check', '문의 내역 확인 SEO', '문의 내역 확인 | 다산제약|다산제약 문의 조회, 문의 내역 확인, 고객센터|다산제약에 접수해주신 1:1 고객 문의 내역과 답변을 안전하게 이메일 인증을 통해 확인할 수 있습니다.');

-- Visitor Logs Table
CREATE TABLE IF NOT EXISTS visitor_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(50) NOT NULL,
    device VARCHAR(150),
    page VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily Visitors Summary Table
CREATE TABLE IF NOT EXISTS daily_visitors (
    visit_date DATE PRIMARY KEY,
    visitor_count INT DEFAULT 0
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'editor', -- 'super_admin', 'editor', 'viewer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin Users (Password: ektks1234!)
INSERT INTO admin_users (username, password, name, role) VALUES
('admin', 'c522284b97b08d4447a41aba564bd86546dfd3427c625370c80344f733610eb3', '최고관리자', 'super_admin'),
('editor1', 'c522284b97b08d4447a41aba564bd86546dfd3427c625370c80344f733610eb3', '콘텐츠관리자', 'editor'),
('viewer1', 'c522284b97b08d4447a41aba564bd86546dfd3427c625370c80344f733610eb3', '조회권한자', 'viewer')
ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role);


