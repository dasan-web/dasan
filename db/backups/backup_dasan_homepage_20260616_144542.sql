-- Pure JS Database Backup for [dasan_homepage]
-- Date: 2026-06-16T05:45:42.815Z

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`id`, `name`, `email`, `phone`, `subject`, `content`, `created_at`) VALUES
(1, '테스트_0615', 'test@dspharm.com', '010-0000-0000', '테스트_0615', '테스트_0615', '2026-06-15 05:16:06'),
(2, '테스트_0615_1', 'test@dspharm.com', '010-0000-0000', '테스트_0615_1', '테스트_0615_1', '2026-06-15 05:39:44'),
(3, '테스트03', 'test@gmail.com', '010-0000-0000', '테스트03_0615', '테스트03_0615', '2026-06-15 05:53:27'),
(4, '테스트0615_4', 'test@test.com', '010-9999-9999', '테스트0615-4', '테스트0615-4', '2026-06-15 06:02:56'),
(5, '테스트0615_5', 'test@test.com', '010-9999-0000', '테스트0615_5', '테스트0615_5', '2026-06-15 06:05:23');

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
  `file_url` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `category`, `title`, `content`, `views`, `created_at`, `file_url`, `file_name`) VALUES
(1, 'press', '다산제약, 신규 R&D 연구센터 개소로 혁신 신약 파이프라인 가속화', '다산제약이 최첨단 신약 연구센터를 공식 오픈하고 차세대 의약품 파이프라인 개발에 속도를 냅니다. 연구소 소개 및 인터뷰 내용 포함...', 124, '2026-06-15 01:44:27', NULL, NULL),
(2, 'press', '다산제약, 글로벌 제약사와 CDMO 협력 양해각서(MOU) 체결', '본 협약을 통해 고난도 고형제 및 개량신약 위탁개발생산(CDMO) 사업 영역을 글로벌 시장으로 본격 확장할 예정입니다.', 98, '2026-06-15 01:44:27', NULL, NULL),
(3, 'ir', '2026년 제1분기 재무 성과 요약 및 IR 공시 안내', '1분기 매출 증가율 및 연구개발 투자 비율 등 핵심 재무 실적이 공시 정보에 반영되었습니다.', 56, '2026-06-15 01:44:27', NULL, NULL),
(4, 'ir', '2026년도 정기 주주총회 소집 공고', '정기 주주총회 소집 장소 및 의결 사항 등 상세 정보 안내문입니다.', 74, '2026-06-15 01:44:27', NULL, NULL),
(5, 'press', '다산제약, ESG 인증 확보…IPO 앞두고 신뢰 다진다', '2026년 시무식서 ESG 경영시스템 인증 수여
2025년 매출 1000억 돌파 이어 올해 1400억 목표
30년 DDS 기술력 바탕 글로벌 시장 공략 포부

[데일리팜] https://www.dailypharm.com/user/news/334466?REFERER=NP', 0, '2026-06-15 07:04:31', NULL, NULL),
(6, 'press', '다산제약, 창립 30주년 맞는 2026년 시무식 통해 실행 과제 발표', '지난해 매출 1,000억 달성 기반 AI·효율 중심 경영 고도화‥책임경영 및 거버넌스 강화 추진
류형선 대표, "지난 30년 축적 위에 더 높은 기준과 실행으로 다음 30년의 성장 기반 만들 것"

<제약지>

메디파나 https://www.medipana.com/news/articleView.html?idxno=404904

메디소비자 https://www.medisobizanews.com/news/articleView.html?idxno=132991

약업 신문 https://www.yakup.com/news/index.html?mode=view&cat=12&nid=321417

메디칼타임즈 https://www.medicaltimes.com/Main/News/NewsView.html?ID=1166710&ref=naverpc

 

<경제지>

머니S https://www.moneys.co.kr/article/2026010513193569512

프레스나인 https://www.press9.kr/news/articleView.html?idxno=70521

뉴스핌 https://www.newspim.com/news/view/20260105000646

글로벌경제 https://www.getnews.co.kr/news/articleView.html?idxno=855965

서울경제 https://www.sentv.co.kr/article/view/sentv202601050065

뉴스웨이 https://www.newsway.co.kr/news/view?ud=2026010514312422125

서울와이어 https://www.seoulwire.com/news/articleView.html?idxno=700058

FETV https://www.fetv.co.kr/news/article.html?no=209203

포인트데일리 https://www.pointdaily.co.kr/news/articleView.html?idxno=287453

 

<일반>

메트로 https://www.metroseoul.co.kr/article/20260105500297

더팩트 https://news.tf.co.kr/read/economy/2279047.htm', 0, '2026-06-15 07:05:07', NULL, NULL),
(7, 'press', '다산제약, ESG 인증 - ISO 45001·14001 통합 인증 획득', '산업 전반 안전/환경 분야 관리 역량 입증
“글로벌 기준 부합 ESG 경영 고도화 ”

<제약지>

약업신문 https://www.yakup.com/news/index.html?mode=view&cat=12&nid=321484

메디파나 https://www.medipana.com/news/articleView.html?idxno=404974

의학신문 http://www.bosa.co.kr/news/articleView.html?idxno=2267275

메디컬투데이 https://mdtoday.co.kr/news/view/1065585791165831

하이뉴스 https://www.hinews.co.kr/view.php?ud=2026010614393474336aa9cc43d0_48

 

 

<경제지>

뉴스핌 https://www.newspim.com/news/view/20260106000418

이데일리 https://www.edaily.co.kr/News/Read?newsId=03135686645315096&mediaCodeNo=257&OutLnkChk=Y

서울와이어 https://www.seoulwire.com/news/articleView.html?idxno=700270

벤처스퀘어 https://www.venturesquare.net/1031025/', 0, '2026-06-15 07:05:42', NULL, NULL),
(8, 'press', '흔한 DDS, CDMO? 류형선 대표 "정밀화 제어 기술 차별화"', '"생산 아닌 DDS 기술 중심 CDMO 타깃, 올해 연말 예비심사 청구 예정"

[더벨] https://www.thebell.co.kr/front/newsview.asp?code=00&key=202603110633193920105220', 0, '2026-06-15 07:06:18', NULL, NULL),
(9, 'press', '다산제약, 1000억 매출 첫 돌파…제품 성장·CDMO 확장 동시 진행', '다산제약, 1000억 매출 첫 돌파…제품 성장·CDMO 확장 동시 진행

[메디파나뉴스] https://www.medipana.com/news/articleView.html?idxno=409573', 0, '2026-06-15 07:06:47', NULL, NULL),
(10, 'press', '다산제약, \'CPHI JAPAN\' 참가 글로벌 확장 본격화', 'DDS·Multi-Stra 기술 기반 차별화 전략
PMDA 실사 통과…품질 경쟁력 입증
둘록세틴 등 안전성 강화 라인업 공개

[데일리팜] https://new.dailypharm.com/user/news/337784?REFERER=NP

[메디칼타임즈] http://medicaltimes.com/Main/News/NewsView.html?ID=1168391&ref=naverpc

[메디컬투데이] https://mdtoday.co.kr/news/view/1065587216879612

[메디파나뉴스] https://www.medipana.com/news/articleView.html?idxno=410165

[뉴스핌] https://www.newspim.com/news/view/20260422000497', 0, '2026-06-15 07:07:21', NULL, NULL);

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
  `file_url` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `english_name`, `type`, `efficacy`, `consonant`, `file_url`, `file_name`) VALUES
(1, '클피그렐정 75mg', 'CLPIGREL', '전문의약품', '동맥경화용제', 'ㅋ', NULL, NULL),
(2, '에스클러캡슐', 'ESCLOR Cap.', '전문의약품', '기타의화학요법제', 'ㅇ', NULL, NULL),
(3, '리얼리정', 'REALLY Tab.', '전문의약품', '해열,진통,소염제', 'ㄹ', NULL, NULL),
(4, '올메히드플러스정 20/12.5mg', 'OLMEHID Plus Tab.', '전문의약품', '혈압강하제', 'ㅇ', NULL, NULL),
(5, '피마사탄정 60mg', 'Fimasartan Potassium 60mg', '전문의약품', '혈압강하제', 'ㅍ', NULL, NULL),
(6, '다파글리정 10mg', 'Dapagliflozin propanediol 10mg', '전문의약품', '당뇨병치료제', 'ㄷ', NULL, NULL),
(7, '다산 비타C 1000', 'Ascorbic Acid 1000mg', '일반의약품', '비타민제', 'ㄷ', NULL, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=449 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(25, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 01:57:32'),
(26, '127.0.0.1', 'Windows / Chrome', '/about', '2026-06-15 03:06:39'),
(27, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 03:06:40'),
(28, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 05:09:10'),
(29, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 05:14:35'),
(30, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 05:14:36'),
(31, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 05:14:44'),
(32, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 05:15:09'),
(33, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 05:20:36'),
(34, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 05:20:43'),
(35, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 05:51:55'),
(36, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 05:52:08'),
(37, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 05:52:11'),
(38, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 05:52:32'),
(39, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 05:56:01'),
(40, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 05:59:16'),
(41, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-15 05:59:18'),
(42, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-15 05:59:19'),
(43, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 05:59:19'),
(44, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:02:25'),
(45, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 06:03:32'),
(46, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:04:54'),
(47, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 06:19:28'),
(48, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 06:26:57'),
(49, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 06:27:05'),
(50, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-15 06:27:11'),
(51, '115.91.37.94', 'Windows / Chrome', '/about/facilities', '2026-06-15 06:27:13'),
(52, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 06:27:16'),
(53, '115.91.37.94', 'Windows / Chrome', '/rd/pipeline', '2026-06-15 06:27:39'),
(54, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 06:27:59'),
(55, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:30:17'),
(56, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry/check', '2026-06-15 06:32:04'),
(57, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:32:06'),
(58, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 06:34:46'),
(59, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry/check', '2026-06-15 06:37:32'),
(60, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:37:33'),
(61, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:37:37'),
(62, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry/check', '2026-06-15 06:39:04'),
(63, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 06:39:07'),
(64, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 06:39:09'),
(65, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 06:39:10'),
(66, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 06:39:12'),
(67, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 06:39:12'),
(68, '115.91.37.94', 'Windows / Chrome', '/about/location', '2026-06-15 06:39:14'),
(69, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 06:39:44'),
(70, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:40:31'),
(71, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 06:41:00'),
(72, '127.0.0.1', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 06:41:05'),
(73, '127.0.0.1', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 06:41:09'),
(74, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:41:12'),
(75, '127.0.0.1', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 06:41:33'),
(76, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry/check', '2026-06-15 06:41:36'),
(77, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:41:38'),
(78, '127.0.0.1', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 06:41:42'),
(79, '127.0.0.1', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 06:41:43'),
(80, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 06:41:49'),
(81, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 06:41:51'),
(82, '127.0.0.1', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 06:41:53'),
(83, '127.0.0.1', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 06:41:53'),
(84, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:41:56'),
(85, '127.0.0.1', 'Windows / Chrome', '/business/finished/news', '2026-06-15 06:43:15'),
(86, '127.0.0.1', 'Windows / Chrome', '/business/api/intermediates', '2026-06-15 06:43:16'),
(87, '127.0.0.1', 'Windows / Chrome', '/business/api/raw', '2026-06-15 06:43:17'),
(88, '127.0.0.1', 'Windows / Chrome', '/business/cdmo/logistics', '2026-06-15 06:43:19'),
(89, '127.0.0.1', 'Windows / Chrome', '/business/cdmo/advantages', '2026-06-15 06:43:19'),
(90, '127.0.0.1', 'Windows / Chrome', '/rd/pipeline', '2026-06-15 06:43:22'),
(91, '127.0.0.1', 'Windows / Chrome', '/about', '2026-06-15 06:43:25'),
(92, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 06:43:26'),
(93, '127.0.0.1', 'Windows / Chrome', '/about/esg/safety', '2026-06-15 06:43:39'),
(94, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 06:43:40'),
(95, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-15 06:43:41'),
(96, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-15 06:43:42'),
(97, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 06:43:43'),
(98, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 06:43:47'),
(99, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-15 06:47:09'),
(100, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 06:47:10'),
(101, '127.0.0.1', 'Windows / Chrome', '/about/esg/ethics', '2026-06-15 06:47:36'),
(102, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 06:47:41'),
(103, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 06:47:42'),
(104, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 06:47:54'),
(105, '127.0.0.1', 'Windows / Chrome', '/business/finished/search', '2026-06-15 06:47:59'),
(106, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 06:48:30'),
(107, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 06:48:36'),
(108, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-15 06:48:57'),
(109, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-15 06:49:03'),
(110, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-15 06:49:10'),
(111, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 06:49:12'),
(112, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-15 06:49:24'),
(113, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-15 06:51:05'),
(114, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 06:53:10'),
(115, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-15 06:54:52'),
(116, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 06:54:56'),
(117, '127.0.0.1', 'Windows / Chrome', '/about/esg/ethics', '2026-06-15 06:55:24'),
(118, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 06:55:26'),
(119, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 06:55:27'),
(120, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-15 06:55:58'),
(121, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-15 06:56:00'),
(122, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-15 06:56:01'),
(123, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-15 06:56:06'),
(124, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-15 06:58:10'),
(125, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-15 06:58:12'),
(126, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-15 06:58:13'),
(127, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 06:58:14'),
(128, '127.0.0.1', 'Windows / Chrome', '/about/esg/ethics', '2026-06-15 06:58:15'),
(129, '127.0.0.1', 'Windows / Chrome', '/about/esg/environment', '2026-06-15 06:58:17'),
(130, '127.0.0.1', 'Windows / Chrome', '/about/esg/safety', '2026-06-15 06:58:18'),
(131, '127.0.0.1', 'Windows / Chrome', '/about/esg/environment', '2026-06-15 06:58:23'),
(132, '127.0.0.1', 'Windows / Chrome', '/about/esg/ethics', '2026-06-15 06:58:25'),
(133, '127.0.0.1', 'Windows / Chrome', '/about/esg/environment', '2026-06-15 06:58:27'),
(134, '127.0.0.1', 'Windows / Chrome', '/about/esg/safety', '2026-06-15 06:58:27'),
(135, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-15 06:58:29'),
(136, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-15 07:00:33'),
(137, '127.0.0.1', 'Windows / Chrome', '/about/ir/financial', '2026-06-15 07:00:37'),
(138, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-15 07:00:41'),
(139, '127.0.0.1', 'Windows / Chrome', '/about/ir/news', '2026-06-15 07:00:43'),
(140, '127.0.0.1', 'Windows / Chrome', '/about/ir/financial', '2026-06-15 07:01:13'),
(141, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 07:01:18'),
(142, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 07:07:45'),
(143, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 07:38:23'),
(144, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 07:40:19'),
(145, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 07:42:52'),
(146, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 07:43:17'),
(147, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 07:44:58'),
(148, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 07:52:45'),
(149, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 07:56:47'),
(150, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:01:02'),
(151, '127.0.0.1', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:01:13'),
(152, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:01:14'),
(153, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:02:49'),
(154, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:03:49'),
(155, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 08:04:14'),
(156, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 08:07:32'),
(157, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 08:09:28'),
(158, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:10:26'),
(159, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 08:12:58'),
(160, '106.247.148.134', 'Windows / Chrome', '/', '2026-06-15 08:13:01'),
(161, '106.247.148.134', 'Windows / Chrome', '/about', '2026-06-15 08:13:09'),
(162, '106.247.148.134', 'Windows / Chrome', '/about/intro', '2026-06-15 08:13:09'),
(163, '106.247.148.134', 'Windows / Chrome', '/rd', '2026-06-15 08:13:10'),
(164, '106.247.148.134', 'Windows / Chrome', '/rd/intro', '2026-06-15 08:13:10'),
(165, '106.247.148.134', 'Windows / Chrome', '/business', '2026-06-15 08:13:11'),
(166, '106.247.148.134', 'Windows / Chrome', '/business/finished/search', '2026-06-15 08:13:11'),
(167, '106.247.148.134', 'Windows / Chrome', '/contact', '2026-06-15 08:13:11'),
(168, '106.247.148.134', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:13:12'),
(169, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:15:52'),
(170, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:16:09'),
(171, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-15 08:16:15'),
(172, '115.91.37.94', 'Windows / Chrome', '/about/location', '2026-06-15 08:16:21'),
(173, '115.91.37.94', 'Windows / Chrome', '/rd/pipeline', '2026-06-15 08:16:34'),
(174, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 08:17:00'),
(175, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/', '2026-06-15 08:19:22'),
(176, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/location', '2026-06-15 08:19:42'),
(177, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:21:07'),
(178, '115.91.37.94', 'Windows / Chrome', '/contact', '2026-06-15 08:22:34'),
(179, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:22:35'),
(180, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 08:23:08'),
(181, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:23:10'),
(182, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 08:23:11'),
(183, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:24:04'),
(184, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:24:22'),
(185, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-15 08:24:29'),
(186, '115.91.37.94', 'Windows / Chrome', '/rd/activities', '2026-06-15 08:24:31'),
(187, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-15 08:24:33'),
(188, '115.91.37.94', 'Windows / Chrome', '/rd/activities', '2026-06-15 08:24:37'),
(189, '115.91.37.94', 'Windows / Chrome', '/rd/pipeline', '2026-06-15 08:24:39'),
(190, '115.91.37.94', 'Windows / Chrome', '/business', '2026-06-15 08:24:50'),
(191, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-15 08:24:50'),
(192, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:28:00'),
(193, '115.91.37.94', 'Windows / Chrome', '/about/location', '2026-06-15 08:28:04'),
(194, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 08:28:12'),
(195, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:28:40'),
(196, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:28:49'),
(197, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 08:29:09'),
(198, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:29:10'),
(199, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:29:21'),
(200, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 08:29:23'),
(201, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:29:25'),
(202, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry/check', '2026-06-15 08:29:28'),
(203, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:29:31'),
(204, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:29:39'),
(205, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:29:44'),
(206, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:29:46'),
(207, '2001:2d8:2227:2ac7:b41b:8c8e:1ed8:5820', 'iPhone / Safari', '/about/location', '2026-06-15 08:34:44'),
(208, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:42:06'),
(209, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 08:42:07'),
(210, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:42:08'),
(211, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:44:17'),
(212, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-15 08:44:18'),
(213, '115.91.37.94', 'Windows / Chrome', '/rd/pipeline', '2026-06-15 08:44:18'),
(214, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 08:44:30'),
(215, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:44:31'),
(216, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:44:33'),
(217, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:44:34'),
(218, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:44:36'),
(219, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 08:44:38'),
(220, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:44:39'),
(221, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:44:42'),
(222, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:44:53'),
(223, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 08:45:08'),
(224, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:45:47'),
(225, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 08:45:49'),
(226, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 08:45:53'),
(227, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry/check', '2026-06-15 08:45:56'),
(228, '115.91.37.94', 'Windows / Chrome', '/contact/careers/talent', '2026-06-15 08:46:01'),
(229, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 08:46:03'),
(230, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:46:04'),
(231, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 08:46:05'),
(232, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:46:09'),
(233, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-15 08:46:15'),
(234, '115.91.37.94', 'Windows / Chrome', '/about/facilities', '2026-06-15 08:46:17'),
(235, '115.91.37.94', 'Windows / Chrome', '/about/location', '2026-06-15 08:46:24'),
(236, '115.91.37.94', 'Windows / Chrome', '/about/esg/safety', '2026-06-15 08:46:27'),
(237, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:48:56'),
(238, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:49:01'),
(239, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-15 08:49:07'),
(240, '115.91.37.94', 'Windows / Chrome', '/about/history', '2026-06-15 08:49:12'),
(241, '115.91.37.94', 'Windows / Chrome', '/about/facilities', '2026-06-15 08:49:20'),
(242, '115.91.37.94', 'Windows / Chrome', '/about/facilities', '2026-06-15 08:50:47'),
(243, '115.91.37.94', 'Windows / Chrome', '/about/location', '2026-06-15 08:51:46'),
(244, '115.91.37.94', 'Windows / Chrome', '/about/esg/ethics', '2026-06-15 08:51:51'),
(245, '115.91.37.94', 'Windows / Chrome', '/about/esg/environment', '2026-06-15 08:51:54'),
(246, '115.91.37.94', 'Windows / Chrome', '/about/esg/safety', '2026-06-15 08:51:55'),
(247, '115.91.37.94', 'Windows / Chrome', '/about/ir/announcement', '2026-06-15 08:51:57'),
(248, '115.91.37.94', 'Windows / Chrome', '/about/ir/financial', '2026-06-15 08:52:01'),
(249, '115.91.37.94', 'Windows / Chrome', '/about/ir/news', '2026-06-15 08:52:07'),
(250, '115.91.37.94', 'Windows / Chrome', '/about/ir/financial', '2026-06-15 08:52:09'),
(251, '115.91.37.94', 'Windows / Chrome', '/about/ir/news', '2026-06-15 08:52:11'),
(252, '115.91.37.94', 'Windows / Chrome', '/about/ir/financial', '2026-06-15 08:52:13'),
(253, '115.91.37.94', 'Windows / Chrome', '/about/ir/news', '2026-06-15 08:52:15'),
(254, '115.91.37.94', 'Windows / Chrome', '/about/ir/financial', '2026-06-15 08:52:18'),
(255, '115.91.37.94', 'Windows / Chrome', '/about/ir/news', '2026-06-15 08:52:19'),
(256, '115.91.37.94', 'Windows / Chrome', '/about/ir/news', '2026-06-15 08:54:18'),
(257, '115.91.37.94', 'Windows / Chrome', '/rd/pipeline', '2026-06-15 08:54:19'),
(258, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-15 08:54:19'),
(259, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:54:43'),
(260, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:54:54'),
(261, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-15 08:55:08'),
(262, '115.91.37.94', 'Windows / Chrome', '/about/location', '2026-06-15 08:55:12'),
(263, '115.91.37.94', 'Windows / Chrome', '/about/facilities', '2026-06-15 08:55:14'),
(264, '115.91.37.94', 'Windows / Chrome', '/about/history', '2026-06-15 08:55:16'),
(265, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-15 08:55:17'),
(266, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:55:18'),
(267, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-15 08:55:19'),
(268, '115.91.37.94', 'Windows / Chrome', '/about/history', '2026-06-15 08:55:21'),
(269, '115.91.37.94', 'Windows / Chrome', '/about/facilities', '2026-06-15 08:55:22'),
(270, '115.91.37.94', 'Windows / Chrome', '/about/location', '2026-06-15 08:55:24'),
(271, '115.91.37.94', 'Windows / Chrome', '/about/esg/ethics', '2026-06-15 08:55:25'),
(272, '115.91.37.94', 'Windows / Chrome', '/about/esg/environment', '2026-06-15 08:55:27'),
(273, '115.91.37.94', 'Windows / Chrome', '/about/esg/safety', '2026-06-15 08:55:28'),
(274, '115.91.37.94', 'Windows / Chrome', '/about/ir/announcement', '2026-06-15 08:55:30'),
(275, '115.91.37.94', 'Windows / Chrome', '/about/ir/financial', '2026-06-15 08:55:31'),
(276, '115.91.37.94', 'Windows / Chrome', '/about/ir/news', '2026-06-15 08:55:33'),
(277, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-15 08:55:36'),
(278, '115.91.37.94', 'Windows / Chrome', '/rd/activities', '2026-06-15 08:55:41'),
(279, '115.91.37.94', 'Windows / Chrome', '/rd/pipeline', '2026-06-15 08:55:44'),
(280, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-15 08:55:49'),
(281, '115.91.37.94', 'Windows / Chrome', '/business/finished/news', '2026-06-15 08:55:51'),
(282, '115.91.37.94', 'Windows / Chrome', '/business/api/raw', '2026-06-15 08:55:52'),
(283, '115.91.37.94', 'Windows / Chrome', '/business/api/intermediates', '2026-06-15 08:55:54'),
(284, '115.91.37.94', 'Windows / Chrome', '/business/api/raw', '2026-06-15 08:55:56'),
(285, '115.91.37.94', 'Windows / Chrome', '/business/api/intermediates', '2026-06-15 08:55:58'),
(286, '115.91.37.94', 'Windows / Chrome', '/business/cdmo/quality', '2026-06-15 08:56:01'),
(287, '115.91.37.94', 'Windows / Chrome', '/business/cdmo/advantages', '2026-06-15 08:56:05'),
(288, '115.91.37.94', 'Windows / Chrome', '/business/cdmo/logistics', '2026-06-15 08:56:07'),
(289, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:56:12'),
(290, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-15 08:56:13'),
(291, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 08:56:17'),
(292, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 08:56:20'),
(293, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 08:56:32'),
(294, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:56:48'),
(295, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:56:59'),
(296, '115.91.37.94', 'Windows / Chrome', '/about', '2026-06-15 08:57:14'),
(297, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:57:14'),
(298, '115.91.37.94', 'Windows / Chrome', '/rd', '2026-06-15 08:57:18'),
(299, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-15 08:57:19'),
(300, '115.91.37.94', 'Windows / Chrome', '/business', '2026-06-15 08:57:21'),
(301, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-15 08:57:21'),
(302, '115.91.37.94', 'Windows / Chrome', '/about', '2026-06-15 08:57:24'),
(303, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:57:25'),
(304, '115.91.37.94', 'Windows / Chrome', '/about', '2026-06-15 08:59:38'),
(305, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:59:39'),
(306, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 08:59:40'),
(307, '115.91.37.94', 'Windows / Chrome', '/about', '2026-06-15 08:59:42'),
(308, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 08:59:43'),
(309, '115.91.37.94', 'Windows / Chrome', '/rd', '2026-06-15 08:59:51'),
(310, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-15 08:59:52'),
(311, '115.91.37.94', 'Windows / Chrome', '/business', '2026-06-15 08:59:54'),
(312, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-15 08:59:55'),
(313, '115.91.37.94', 'Windows / Chrome', '/contact', '2026-06-15 08:59:58'),
(314, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 08:59:58'),
(315, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-15 09:00:12'),
(316, '115.91.37.94', 'Windows / Chrome', '/about', '2026-06-15 09:00:14'),
(317, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 09:00:15'),
(318, '115.91.37.94', 'Windows / Chrome', '/rd', '2026-06-15 09:01:31'),
(319, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-15 09:01:31'),
(320, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 09:03:15'),
(321, '115.91.37.94', 'Windows / Chrome', '/about', '2026-06-15 09:03:16'),
(322, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 09:03:16'),
(323, '115.91.37.94', 'Windows / Chrome', '/rd', '2026-06-15 09:03:18'),
(324, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-15 09:03:18'),
(325, '115.91.37.94', 'Windows / Chrome', '/business', '2026-06-15 09:03:21'),
(326, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-15 09:03:22'),
(327, '115.91.37.94', 'Windows / Chrome', '/business/finished/news', '2026-06-15 09:03:26'),
(328, '115.91.37.94', 'Windows / Chrome', '/contact/careers/process', '2026-06-15 09:03:29'),
(329, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 09:03:33'),
(330, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-15 09:03:40'),
(331, '115.91.37.94', 'Windows / Chrome', '/about/history', '2026-06-15 09:03:57'),
(332, '115.91.37.94', 'Windows / Chrome', '/about/facilities', '2026-06-15 09:04:01'),
(333, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 09:04:06'),
(334, '115.91.37.94', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-15 09:05:08'),
(335, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-15 09:05:11'),
(336, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-15 09:05:56'),
(337, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-15 09:09:33'),
(338, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-15 09:09:42'),
(339, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 00:08:56'),
(340, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-16 00:13:00'),
(341, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 00:23:33'),
(342, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 00:30:22'),
(343, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 00:30:46'),
(344, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 00:31:19'),
(345, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 00:31:21'),
(346, '115.91.37.94', 'Windows / Chrome', '/contact/inquiry', '2026-06-16 00:31:45'),
(347, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 00:31:48'),
(348, '115.91.37.94', 'Windows / Chrome', '/privacy', '2026-06-16 00:35:09'),
(349, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 00:35:11'),
(350, '115.91.37.94', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 00:35:35'),
(351, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 00:35:49'),
(352, '115.91.37.94', 'Windows / Chrome', '/', '2026-06-16 02:47:04'),
(353, '115.91.37.94', 'Windows / Chrome', '/about/intro', '2026-06-16 02:47:38'),
(354, '115.91.37.94', 'Windows / Chrome', '/about/business-area', '2026-06-16 02:47:52'),
(355, '115.91.37.94', 'Windows / Chrome', '/about/esg/safety', '2026-06-16 02:47:59'),
(356, '115.91.37.94', 'Windows / Chrome', '/rd/intro', '2026-06-16 02:48:02'),
(357, '115.91.37.94', 'Windows / Chrome', '/business/finished/search', '2026-06-16 02:48:11'),
(358, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 02:56:51'),
(359, '127.0.0.1', 'Windows / Chrome', '/business/finished/search', '2026-06-16 02:56:54'),
(360, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 02:58:18'),
(361, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-16 02:58:20'),
(362, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-16 02:58:22'),
(363, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-16 02:58:23'),
(364, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-16 02:58:23'),
(365, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-16 02:58:35'),
(366, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 02:58:50'),
(367, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-16 02:58:56'),
(368, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-16 02:59:12'),
(369, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-16 02:59:13'),
(370, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-16 02:59:13'),
(371, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-16 02:59:14'),
(372, '127.0.0.1', 'Windows / Chrome', '/about/esg/ethics', '2026-06-16 02:59:14'),
(373, '127.0.0.1', 'Windows / Chrome', '/about/esg/environment', '2026-06-16 02:59:16'),
(374, '127.0.0.1', 'Windows / Chrome', '/about/esg/safety', '2026-06-16 02:59:17'),
(375, '127.0.0.1', 'Windows / Chrome', '/rd/intro', '2026-06-16 02:59:20'),
(376, '127.0.0.1', 'Windows / Chrome', '/rd/activities', '2026-06-16 02:59:21'),
(377, '127.0.0.1', 'Windows / Chrome', '/rd/pipeline', '2026-06-16 02:59:23'),
(378, '127.0.0.1', 'Windows / Chrome', '/business/finished/search', '2026-06-16 02:59:29'),
(379, '127.0.0.1', 'Windows / Chrome', '/business/finished/news', '2026-06-16 02:59:30'),
(380, '127.0.0.1', 'Windows / Chrome', '/business/api/raw', '2026-06-16 02:59:31'),
(381, '127.0.0.1', 'Windows / Chrome', '/business/api/intermediates', '2026-06-16 02:59:31'),
(382, '127.0.0.1', 'Windows / Chrome', '/business/cdmo/quality', '2026-06-16 02:59:32'),
(383, '127.0.0.1', 'Windows / Chrome', '/business/cdmo/advantages', '2026-06-16 02:59:33'),
(384, '127.0.0.1', 'Windows / Chrome', '/business/cdmo/quality', '2026-06-16 02:59:35'),
(385, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 02:59:41'),
(386, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-16 02:59:42'),
(387, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 02:59:43'),
(388, '127.0.0.1', 'Windows / Chrome', '/contact/careers/process', '2026-06-16 02:59:55'),
(389, '127.0.0.1', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-16 02:59:58'),
(390, '127.0.0.1', 'Windows / Chrome', '/contact/careers/talent', '2026-06-16 03:00:00'),
(391, '127.0.0.1', 'Windows / Chrome', '/contact/careers/process', '2026-06-16 03:00:11'),
(392, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 03:00:12'),
(393, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 03:00:14'),
(394, '127.0.0.1', 'Windows / Chrome', '/rd/pipeline', '2026-06-16 03:01:37'),
(395, '127.0.0.1', 'Windows / Chrome', '/rd/activities', '2026-06-16 03:01:44'),
(396, '127.0.0.1', 'Windows / Chrome', '/rd/pipeline', '2026-06-16 03:01:45'),
(397, '127.0.0.1', 'Windows / Chrome', '/business', '2026-06-16 03:01:48'),
(398, '127.0.0.1', 'Windows / Chrome', '/business/finished/search', '2026-06-16 03:01:49'),
(399, '127.0.0.1', 'Windows / Chrome', '/business', '2026-06-16 03:02:02'),
(400, '127.0.0.1', 'Windows / Chrome', '/business/finished/search', '2026-06-16 03:02:02'),
(401, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 03:12:24'),
(402, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-16 03:12:29'),
(403, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-16 03:12:35'),
(404, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-16 03:12:36'),
(405, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-16 03:12:36'),
(406, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-16 03:12:37'),
(407, '127.0.0.1', 'Windows / Chrome', '/about/esg/ethics', '2026-06-16 03:12:38'),
(408, '127.0.0.1', 'Windows / Chrome', '/about/esg/safety', '2026-06-16 03:12:38'),
(409, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-16 03:12:39'),
(410, '127.0.0.1', 'Windows / Chrome', '/about/ir/financial', '2026-06-16 03:12:39'),
(411, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-16 03:12:40'),
(412, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 03:12:47'),
(413, '127.0.0.1', 'Windows / Chrome', '/about/intro', '2026-06-16 03:15:20'),
(414, '127.0.0.1', 'Windows / Chrome', '/about/business-area', '2026-06-16 03:16:29'),
(415, '127.0.0.1', 'Windows / Chrome', '/about/history', '2026-06-16 03:16:38'),
(416, '127.0.0.1', 'Windows / Chrome', '/about/facilities', '2026-06-16 03:16:39'),
(417, '127.0.0.1', 'Windows / Chrome', '/about/location', '2026-06-16 03:16:42'),
(418, '127.0.0.1', 'Windows / Chrome', '/about/esg/ethics', '2026-06-16 03:17:24'),
(419, '127.0.0.1', 'Windows / Chrome', '/about/esg/environment', '2026-06-16 03:17:25'),
(420, '127.0.0.1', 'Windows / Chrome', '/about/esg/safety', '2026-06-16 03:17:26'),
(421, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-16 03:17:27'),
(422, '127.0.0.1', 'Windows / Chrome', '/about/ir/financial', '2026-06-16 03:17:27'),
(423, '127.0.0.1', 'Windows / Chrome', '/about/ir/announcement', '2026-06-16 03:17:28'),
(424, '127.0.0.1', 'Windows / Chrome', '/about/ir/financial', '2026-06-16 03:17:49'),
(425, '127.0.0.1', 'Windows / Chrome', '/about/ir/news', '2026-06-16 03:17:50'),
(426, '127.0.0.1', 'Windows / Chrome', '/about/ir/financial', '2026-06-16 03:17:51'),
(427, '127.0.0.1', 'Windows / Chrome', '/about/ir/news', '2026-06-16 03:17:52'),
(428, '127.0.0.1', 'Windows / Chrome', '/about/ir/financial', '2026-06-16 03:17:52'),
(429, '127.0.0.1', 'Windows / Chrome', '/about/ir/news', '2026-06-16 03:17:54'),
(430, '127.0.0.1', 'Windows / Chrome', '/rd/intro', '2026-06-16 03:18:10'),
(431, '127.0.0.1', 'Windows / Chrome', '/rd/activities', '2026-06-16 03:18:11'),
(432, '127.0.0.1', 'Windows / Chrome', '/rd/pipeline', '2026-06-16 03:18:12'),
(433, '127.0.0.1', 'Windows / Chrome', '/rd/activities', '2026-06-16 03:19:07'),
(434, '127.0.0.1', 'Windows / Chrome', '/rd/intro', '2026-06-16 03:19:07'),
(435, '127.0.0.1', 'Windows / Chrome', '/business/finished/search', '2026-06-16 03:19:09'),
(436, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 03:20:20'),
(437, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/media', '2026-06-16 03:20:29'),
(438, '127.0.0.1', 'Windows / Chrome', '/contact/careers/talent', '2026-06-16 03:20:37'),
(439, '127.0.0.1', 'Windows / Chrome', '/contact/careers/process', '2026-06-16 03:20:38'),
(440, '127.0.0.1', 'Windows / Chrome', '/contact/careers/jobs', '2026-06-16 03:20:39'),
(441, '127.0.0.1', 'Windows / Chrome', '/contact/inquiry', '2026-06-16 03:20:59'),
(442, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 03:23:40'),
(443, '127.0.0.1', 'Windows / Chrome', '/business/finished/search', '2026-06-16 03:24:20'),
(444, '127.0.0.1', 'Windows / Chrome', '/contact', '2026-06-16 03:26:47'),
(445, '127.0.0.1', 'Windows / Chrome', '/contact/newsroom/press', '2026-06-16 03:26:48'),
(446, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 04:51:13'),
(447, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 05:32:28'),
(448, '127.0.0.1', 'Windows / Chrome', '/', '2026-06-16 05:34:03');

