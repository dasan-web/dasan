-- Pure JS Database Backup for [dasan_homepage]
-- Date: 2026-06-15T02:09:27.921Z

CREATE DATABASE IF NOT EXISTS `dasan_homepage` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dasan_homepage`;

--
-- Table structure for table `admin_contents`
--

DROP TABLE IF EXISTS `admin_contents`;
CREATE TABLE `admin_contents` (
  `page_key` varchar(100) NOT NULL,
  `page_title` varchar(200) NOT NULL,
  `content` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`page_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_contents`
--

INSERT INTO `admin_contents` (`page_key`, `page_title`, `content`, `updated_at`) VALUES
('about/business-area', '사업영역', '완제의약품 R&D 및 마케팅, 글로벌 원료의약품(API) 공급, 그리고 약물방출조절(DDS) 기반 고품격 위탁생산개발(CDMO) 서비스를 바탕으로 세계인의 삶의 질을 높입니다.', '2026-06-15 01:44:27'),
('about/esg/environment', '환경경영', '친환경 원료 합성 공정 및 폐기물 감소 솔루션을 통해 지구 환경 보존에 기여합니다.', '2026-06-15 01:44:27'),
('about/esg/ethics', '윤리경영', '다산제약은 준법감시 제도를 도입하여 투명하고 정직한 경영 문화를 실천합니다.', '2026-06-15 01:44:27'),
('about/esg/safety', '안전보건경영', '임직원의 안전한 근무 환경을 보장하기 위해 산업안전보건 지침을 철저히 준수합니다.', '2026-06-15 01:44:27'),
('about/facilities', '공장 및 연구소', '수원 R&D 중앙연구소와 GMP 생산 공장은 엄격한 국제 기준을 만족하는 자동화 설비와 데이터 무결성 검증 환경을 보유하여 안전하고 신뢰할 수 있는 의약품을 제공합니다.', '2026-06-15 01:44:27'),
('about/history', '연혁', '1996년 설립 이후 다산제약은 자체 DDS 플랫폼 확립, 수원 중앙연구소 개소, 2026년 글로벌 시장 진출 가속화 등 끊임없는 도전을 거듭하며 혁신적 바이오 헬스케어 리더로 성장해왔습니다.', '2026-06-15 01:44:27'),
('about/intro', '회사소개', '다산제약은 1996년 설립 이후 끊임없는 연구개발과 과감한 투자를 통해 고품질의 의약품을 제공함으로써 국민 보건 증진과 삶의 질 향상에 기여해 왔습니다. 차별화된 제제 기술력을 보유한 개량신약 전문 제약회사로서 글로벌 시장을 무대로 뻗어나가고 있습니다.

현재 마이크로캡슐화 기술 등 특화된 제형 기술을 중심으로 원료의약품 합성에서 완제의약품 제조까지 수직계열화를 완성하였으며, 이를 기반으로 글로벌 CDMO 기업으로 성장하고 있습니다.', '2026-06-15 01:44:27'),
('about/intro/competencies', '핵심역량(그림1)', '기술력 입증|30여 건 이상의 핵심 기술 특허와 국가 R&D 우수 과제 선정 레코드 보유
글로벌 규격 생산|c-GMP 급 준수 스마트 팩토리를 통한 엄격한 품질관리 체계 확립
글로벌 파트너쉽|일본, 동남아, 남미 등 전세계 20여 개국 원료의약품 및 완제품 직수출', '2026-06-15 01:44:27'),
('about/intro/philosophy', '경영철학(그림4)', '사람이 중심이 되는 기술, 정직으로 만드는 건강한 내일|정도경영 (Ethical Management)|눈앞의 이익보다 절대적인 신뢰와 고품질 기준을 지켜내며, 투명하고 정직한 운영을 통해 사회적 가치에 책임을 다합니다.
R&D 중심 성장 (R&D-Driven Innovation)|매출액 대비 높은 비율을 신약 개발과 제제 기술 연구에 꾸준히 투자하여, 차별화된 특허 장벽과 고부가가치 DDS 플랫폼을 구축합니다.
인재 중심 가치창출 (People First)|구성원 개개인의 자율성과 전문성을 전폭 지원하며, 임직원의 동반 성장이 곧 글로벌 다산의 경쟁력임을 굳게 믿고 실천합니다.', '2026-06-15 01:44:27'),
('about/intro/values', '핵심가치(그림3)', 'Devotion|신뢰와 책임|생명을 살리는 사명감으로 고객과 환자의 두터운 신뢰에 정직과 품질로 보답합니다.
Agility|변화와 실행|급변하는 글로벌 환경을 기민하게 포착하고, 망설임 없이 기회를 실행으로 바꿉니다.
Synergy|상생와 협업|부서 간 벽을 허무는 소통과 글로벌 파트너사와의 상생을 통해 더 큰 가치를 창출합니다.
Aspire|도전과 열정|새로운 기술과 글로벌 시장을 향해 멈추지 않는 도전정신으로 늘 한계에 맞섭니다.
Novelty|창의와 혁신|고정관념을 넘어서는 독자적인 아이디어로 다산제약만의 차별화된 솔루션을 구축합니다.', '2026-06-15 01:44:27'),
('about/intro/vision', '비전/미션(그림2)', '인류의 건강과 행복한 삶에 공헌|차별화된 제제 기술과 고품질의 의약품을 연구·생산·공급하여, 전 인류가 보다 건강하고 가치 있는 삶을 영위할 수 있도록 기여합니다.
DDS 기술 혁신 기반의 글로벌 헬스케어 리더|독보적인 약물전달시스템(DDS) 플랫폼 기술을 선도하며 완제 및 API 수출을 가속화하여, 글로벌 제약 바이오 시장에서 신뢰받는 최고의 파트너가 됩니다.', '2026-06-15 01:44:27'),
('about/location', '찾아오시는 길', '본사: 서울특별시 강남구 위치
연구소 및 공장: 경기도 수원시 영통구 대학로 및 충청남도 아산시 제약공단', '2026-06-15 01:44:27'),
('seo/about', 'About Us SEO', 'About Us | 다산제약|다산제약 연혁, 류형선 대표, 아산 공장 시설, cGMP 인증 제약사|다산제약의 기업개요, 연혁, 대표이사 메시지, 아산 공장 시설 및 연구소를 소개합니다. cGMP 인증을 획득한 신뢰받는 제약사입니다.', '2026-06-15 01:44:27'),
('seo/business', 'Business SEO', 'Business | 다산제약|의약품 CDMO, 완제의약품 위탁생산, Pharmaceutical CDMO, CMO|다산제약의 완제의약품, API 원료의약품 공급 및 의약품 위탁개발생산(CDMO) 사업 영역을 소개합니다.', '2026-06-15 01:44:27'),
('seo/contact', 'Contact SEO', 'Contact | 다산제약|다산제약 뉴스룸, 보도자료, 미디어, 인재채용, 채용프로세스|다산제약의 뉴스룸, 언론 보도, 미디어 자료 및 인재 채용 정보를 확인하실 수 있습니다.', '2026-06-15 01:44:27'),
('seo/contact/careers/jobs', '채용공고 SEO', '채용공고 | 다산제약|다산제약 채용공고, 모집부문, 상시채용|다산제약에서 현재 진행 중인 채용 공고를 안내해 드립니다.', '2026-06-15 01:44:27'),
('seo/contact/careers/process', '채용프로세스 SEO', '채용프로세스 | 다산제약|다산제약 입사지원, 채용절차, 서류전형, 면접전형|다산제약의 채용 과정과 전형 단계별 정보를 상세히 안내해 드립니다.', '2026-06-15 01:44:27'),
('seo/contact/careers/talent', '인재상 SEO', '인재상 | 다산제약|다산제약 인재상, 채용, 기업 인재|다산제약과 함께 미래를 열어갈 창의적이고 도전적인 인재를 찾습니다.', '2026-06-15 01:44:27'),
('seo/contact/inquiry', '1:1 고객 문의 SEO', '1:1 고객 문의 | 다산제약|다산제약 1:1 문의, 고객지원, 제휴 문의, CDMO 문의|다산제약에 궁금한 점을 문의하시면 친절하게 답변해 드립니다. 제약 위탁개발(CDMO), 원료 공급, 일반 제휴 문의.', '2026-06-15 01:44:27'),
('seo/contact/inquiry/check', '문의 내역 확인 SEO', '문의 내역 확인 | 다산제약|다산제약 문의 조회, 문의 내역 확인, 고객센터|다산제약에 접수해주신 1:1 고객 문의 내역과 답변을 안전하게 이메일 인증을 통해 확인할 수 있습니다.', '2026-06-15 01:44:27'),
('seo/contact/newsroom/media', '홍보자료실 SEO', '홍보자료실 | 다산제약|다산제약 홍보자료, 기업소식, 미디어자료|다산제약의 미디어 자료 및 다양한 홍보 콘텐츠를 제공합니다.', '2026-06-15 01:44:27'),
('seo/contact/newsroom/press', '보도자료 SEO', '보도자료 | 다산제약|다산제약 보도자료, 보도뉴스, 언론보도|다산제약의 주요 소식과 언론 보도자료를 신속하고 정확하게 알려드립니다.', '2026-06-15 01:44:27'),
('seo/main', '메인페이지 SEO', '다산제약 | 의약품 CDMO 기업|다산제약, 의약품 CDMO 기업, Dasan Pharmaceutical, dspharm|다산제약은 지속적인 연구개발과 고품질의 의약품 생산을 통해 건강한 삶을 만들어가는 글로벌 제약회사입니다.', '2026-06-15 01:44:27'),
('seo/rd', 'R&D SEO', 'R&D | 다산제약|DDS 플랫폼 기술, 유동층 코팅 기술, 제품센터|다산제약의 약물전달시스템(DDS) 플랫폼 기술, 유동층 코팅 기술 등 독보적인 제제 기술 연구개발 역량을 소개합니다.', '2026-06-15 01:44:27');

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inquiries`
--

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `views` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `category`, `title`, `content`, `views`, `created_at`) VALUES
(1, 'press', '다산제약, 신규 R&D 연구센터 개소로 혁신 신약 파이프라인 가속화', '다산제약이 최첨단 신약 연구센터를 공식 오픈하고 차세대 의약품 파이프라인 개발에 속도를 냅니다. 연구소 소개 및 인터뷰 내용 포함...', 124, '2026-06-15 01:44:27'),
(2, 'press', '다산제약, 글로벌 제약사와 CDMO 협력 양해각서(MOU) 체결', '본 협약을 통해 고난도 고형제 및 개량신약 위탁개발생산(CDMO) 사업 영역을 글로벌 시장으로 본격 확장할 예정입니다.', 98, '2026-06-15 01:44:27'),
(3, 'ir', '2026년 제1분기 재무 성과 요약 및 IR 공시 안내', '1분기 매출 증가율 및 연구개발 투자 비율 등 핵심 재무 실적이 공시 정보에 반영되었습니다.', 56, '2026-06-15 01:44:27'),
(4, 'ir', '2026년도 정기 주주총회 소집 공고', '정기 주주총회 소집 장소 및 의결 사항 등 상세 정보 안내문입니다.', 74, '2026-06-15 01:44:27');

--
-- Table structure for table `pipeline`
--

DROP TABLE IF EXISTS `pipeline`;
CREATE TABLE `pipeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `disease` varchar(200) NOT NULL,
  `phase` varchar(50) NOT NULL,
  `partner` varchar(100) DEFAULT '',
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pipeline`
--

INSERT INTO `pipeline` (`id`, `category`, `project_name`, `disease`, `phase`, `partner`, `updated_at`) VALUES
(1, '개량신약', 'SLIM2403', '비만치료제', '기초연구', '', '2026-06-15 01:44:27'),
(2, '개량신약', 'SLIM2402', '항암·면역보조치료제', '기초연구', '', '2026-06-15 01:44:27'),
(3, '개량신약', 'SLIM2401', '류마티스관절염치료제', '기초연구', '', '2026-06-15 01:44:27'),
(4, '자료 제출 의약품', 'SIST2402', '고혈압(최초복합제) 치료제', '기초연구', '', '2026-06-15 01:44:27'),
(5, '퍼스트 제네릭', 'SIST2301', '위식도역류(P-CAB) 치료제', '임상 3상', '', '2026-06-15 01:44:27'),
(6, '퍼스트 제네릭', 'SIST2401', '고지혈증 치료제', '임상 3상', '', '2026-06-15 01:44:27');

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `english_name` varchar(150) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `efficacy` varchar(100) NOT NULL,
  `consonant` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `english_name`, `type`, `efficacy`, `consonant`) VALUES
(1, '클피그렐정 75mg', 'CLPIGREL', '전문의약품', '동맥경화용제', 'ㅋ'),
(2, '에스클러캡슐', 'ESCLOR Cap.', '전문의약품', '기타의화학요법제', 'ㅇ'),
(3, '리얼리정', 'REALLY Tab.', '전문의약품', '해열,진통,소염제', 'ㄹ'),
(4, '올메히드플러스정 20/12.5mg', 'OLMEHID Plus Tab.', '전문의약품', '혈압강하제', 'ㅇ'),
(5, '피마사탄정 60mg', 'Fimasartan Potassium 60mg', '전문의약품', '혈압강하제', 'ㅍ'),
(6, '다파글리정 10mg', 'Dapagliflozin propanediol 10mg', '전문의약품', '당뇨병치료제', 'ㄷ'),
(7, '다산 비타C 1000', 'Ascorbic Acid 1000mg', '일반의약품', '비타민제', 'ㄷ');

--
-- Table structure for table `visitor_logs`
--

DROP TABLE IF EXISTS `visitor_logs`;
CREATE TABLE `visitor_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `device` varchar(150) DEFAULT NULL,
  `page` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `visitor_logs`
--

INSERT INTO `visitor_logs` (`id`, `ip`, `device`, `page`, `created_at`) VALUES
(1, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 01:45:00'),
(2, '222.233.228.26', 'iPhone / Safari', '/', '2026-06-15 01:50:11'),
(3, '222.233.228.26', 'iPhone / Safari', '/about/intro', '2026-06-15 01:50:17'),
(4, '222.233.228.26', 'iPhone / Safari', '/', '2026-06-15 01:50:25'),
(5, '222.233.228.26', 'iPhone / Safari', '/about/intro', '2026-06-15 01:50:39'),
(6, '222.233.228.26', 'iPhone / Safari', '/about/esg/ethics', '2026-06-15 01:50:45'),
(7, '222.233.228.26', 'iPhone / Safari', '/rd/intro', '2026-06-15 01:50:50'),
(8, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 01:53:44'),
(9, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/intro', '2026-06-15 01:54:19'),
(10, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/business-area', '2026-06-15 01:54:37'),
(11, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/esg/ethics', '2026-06-15 01:54:43'),
(12, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/ir/announcement', '2026-06-15 01:54:51'),
(13, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/rd/intro', '2026-06-15 01:55:08'),
(14, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/location', '2026-06-15 01:55:17'),
(15, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/intro', '2026-06-15 01:55:48'),
(16, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/business-area', '2026-06-15 01:55:52'),
(17, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/ir/news', '2026-06-15 01:55:55'),
(18, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/history', '2026-06-15 01:55:58'),
(19, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 01:56:05'),
(20, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/intro', '2026-06-15 01:56:10'),
(21, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 01:56:29'),
(22, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/rd/pipeline', '2026-06-15 01:57:07'),
(23, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/rd/activities', '2026-06-15 01:57:22'),
(24, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/rd/intro', '2026-06-15 01:57:32'),
(25, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 01:57:32');

