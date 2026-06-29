'use client';

import React, { useState, useEffect } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { useRouter, useParams } from 'next/navigation';
import { navigationData, GrandMenu } from '@/lib/navigation';
import { 
  LogOut, ShieldAlert, Check, Plus, Trash2, Edit, Save, 
  ChevronRight, ChevronDown, CheckCircle2, ListFilter, Search, Download, Globe,
  Heart, BookOpen, MessageSquare, LineChart,
  CheckCircle, ShieldCheck, Truck, Layers
} from 'lucide-react';


const seoSubpages: { [key: string]: { key: string; label: string }[] } = {
  'seo/main': [],
  'seo/about': [
    { key: 'seo/about', label: 'About Us 카테고리 전체' },
    { key: 'seo/about/intro', label: '기업개요' },
    { key: 'seo/about/business-area', label: '사업영역' },
    { key: 'seo/about/history', label: '연혁' },
    { key: 'seo/about/ci', label: 'CI' },
    { key: 'seo/about/facilities', label: '공장 및 연구소' },
    { key: 'seo/about/location', label: '찾아오시는 길' },
    { key: 'seo/about/esg/ethics', label: '윤리경영' },
    { key: 'seo/about/esg/environment', label: '환경경영' },
    { key: 'seo/about/esg/safety', label: '안전보건경영' },
    { key: 'seo/about/ir/announcement', label: '공시정보' },
    { key: 'seo/about/ir/financial', label: '재무정보' },
    { key: 'seo/about/ir/news', label: 'IR News' },
  ],
  'seo/business': [
    { key: 'seo/business', label: 'Business 카테고리 전체' },
    { key: 'seo/business/finished/search', label: '제품검색' },
    { key: 'seo/business/finished/news', label: '제품소식' },
    { key: 'seo/business/api/raw', label: '원료의약품(API)' },
    { key: 'seo/business/api/intermediates', label: '원료의약품 중간체' },
    { key: 'seo/business/cdmo/quality', label: 'CDMO 서비스 품질' },
    { key: 'seo/business/cdmo/advantages', label: 'CDMO 특장점' },
    { key: 'seo/business/cdmo/logistics', label: 'CDMO 물류' },
  ],
  'seo/rd': [
    { key: 'seo/rd', label: 'R&D 카테고리 전체' },
    { key: 'seo/rd/intro', label: '연구소 소개' },
    { key: 'seo/rd/activities', label: '연구 활동' },
    { key: 'seo/rd/pipeline', label: '파이프라인' },
  ],
  'seo/contact': [
    { key: 'seo/contact', label: 'Contact 카테고리 전체' },
    { key: 'seo/contact/newsroom/press', label: '보도자료' },
    { key: 'seo/contact/newsroom/media', label: '홍보자료실' },
    { key: 'seo/contact/careers/talent', label: '인재상' },
    { key: 'seo/contact/careers/process', label: '채용프로세스' },
    { key: 'seo/contact/careers/jobs', label: '채용공고' },
    { key: 'seo/contact/inquiry', label: '고객 문의' },
    { key: 'seo/contact/inquiry/check', label: '문의 확인' },
  ],
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const slugArray = (params.slug as string[]) || [];
  const currentSubPath = slugArray.length > 0 ? slugArray.join('/') : '';

  // Auth checking
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string; role: string } | null>(null);

  // Admin users management states (super_admin only)
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminModalMode, setAdminModalMode] = useState<'create' | 'edit'>('create');
  const [editingAdminId, setEditingAdminId] = useState<number | null>(null);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('editor');
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Dynamic lists
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [showVisitorModal, setShowVisitorModal] = useState(false);

  // Static content state
  const [staticContent, setStaticContent] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [savingStatic, setSavingStatic] = useState(false);
  const [activeIntroTab, setActiveIntroTab] = useState('about/intro');
  const [activeSeoTab, setActiveSeoTab] = useState('seo/main');
  const [activeSeoSubpage, setActiveSeoSubpage] = useState('seo/main');
  const [showDataDropdown, setShowDataDropdown] = useState(false);

  // UI status
  const [loadingData, setLoadingData] = useState(false);
  const [sidebarOpenKeys, setSidebarOpenKeys] = useState<{ [key: string]: boolean }>({
    'Company': false,
    'Innovation': false,
    'Business': false,
    'Connect': false,
  });

  // Modal / Editor form states
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [activeItem, setActiveItem] = useState<any>(null);

  // Form Fields
  // Product fields
  const [prodName, setProdName] = useState('');
  const [prodEngName, setProdEngName] = useState('');
  const [prodType, setProdType] = useState('전문의약품');
  const [prodEfficacy, setProdEfficacy] = useState('');
  const [prodConsonant, setProdConsonant] = useState('ㄱ');
  const [prodFileUrl, setProdFileUrl] = useState('');
  const [prodFileName, setProdFileName] = useState('');
  const [uploadingProdFile, setUploadingProdFile] = useState(false);

  // Pipeline fields
  const [pipeCategory, setPipeCategory] = useState('개량신약');
  const [pipeProject, setPipeProject] = useState('');
  const [pipeDisease, setPipeDisease] = useState('');
  const [pipePhase, setPipePhase] = useState('기초연구');
  const [pipePartner, setPipePartner] = useState('');

  // News fields
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsFileUrl, setNewsFileUrl] = useState('');
  const [newsFileName, setNewsFileName] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingCiLogo, setUploadingCiLogo] = useState(false);

  // Job fields
  const [jobType, setJobType] = useState('신입/경력');
  const [jobQualifications, setJobQualifications] = useState('');
  const [jobDeadline, setJobDeadline] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // Inquiries Detail
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  // Consonant list for dropdown
  const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const PHASES = ['기초연구', '전임상', '임상 1상', '임상 2상', '임상 3상', '허가신청', '발매'];

  const getCleanSubjectAndPrefix = (subject: string) => {
    let prefix = '';
    let clean = subject || '';
    if (clean.startsWith('[제품 문의]')) {
      prefix = '제품 문의';
      clean = clean.substring('[제품 문의]'.length).trim();
    } else if (clean.startsWith('[영업 문의]')) {
      prefix = '영업 문의';
      clean = clean.substring('[영업 문의]'.length).trim();
    } else if (clean.startsWith('[부패신고 문의]')) {
      prefix = '부패신고';
      clean = clean.substring('[부패신고 문의]'.length).trim();
    } else if (clean.startsWith('[1:1 문의]')) {
      prefix = '1:1 문의';
      clean = clean.substring('[1:1 문의]'.length).trim();
    }
    return { prefix, clean };
  };

  const getFilteredInquiries = () => {
    if (currentSubPath === 'contact/inquiry') {
      return inquiries.filter(inq => inq.subject.startsWith('[제품 문의]'));
    }
    if (currentSubPath === 'contact/inquiry/sales') {
      return inquiries.filter(inq => inq.subject.startsWith('[영업 문의]'));
    }
    if (currentSubPath === 'contact/inquiry/corruption') {
      return inquiries.filter(inq => inq.subject.startsWith('[부패신고 문의]'));
    }
    return inquiries;
  };
  const filteredInquiries = getFilteredInquiries();

  // 1. Session check
  useEffect(() => {
    fetch('/api/management/auth')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/management/login');
        } else {
          setCurrentUser(data.user);
          setCheckingAuth(false);
        }
      })
      .catch(() => {
        router.push('/management/login');
      });
  }, [router]);

  // Redirection guard for connect_editor role
  useEffect(() => {
    if (checkingAuth || !currentUser) return;
    if (currentUser.role === 'connect_editor') {
      if (
        currentSubPath !== 'contact/newsroom/press' &&
        currentSubPath !== 'contact/newsroom/media'
      ) {
        router.replace('/management/dashboard/contact/newsroom/press');
      }
    }
  }, [currentSubPath, currentUser, checkingAuth, router]);

  // 2. Fetch data based on the active path
  useEffect(() => {
    if (checkingAuth) return;

    // Reset modals & detail views
    setShowFormModal(false);
    setSelectedInquiry(null);

    // Automatically open corresponding grand menu in sidebar based on currentSubPath
    const matchedGrand = navigationData.find(grand => 
      grand.majors.some(major => 
        major.subMenus.some(sub => sub.link.replace(/^\//, '') === currentSubPath)
      )
    );
    if (matchedGrand) {
      setSidebarOpenKeys(prev => ({
        ...prev,
        [matchedGrand.name]: true
      }));
    }

    const fullPath = `/${slugArray.join('/')}`;

    // Decide what to fetch
    if (currentSubPath === 'rd/pipeline') {
      fetchPipelines();
    } else if (currentSubPath === 'business/finished/search') {
      fetchProducts();
    } else if (
      currentSubPath === 'contact/newsroom/press' ||
      currentSubPath === 'contact/newsroom/media' ||
      currentSubPath === 'about/ir/news' ||
      currentSubPath === 'contact/careers/jobs'
    ) {
      fetchNews(getNewsCategory(currentSubPath));
    } else if (
      currentSubPath === 'contact/inquiry' ||
      currentSubPath === 'contact/inquiry/sales' ||
      currentSubPath === 'contact/inquiry/corruption' ||
      currentSubPath === 'contact/inquiry/check'
    ) {
      fetchInquiries();
    } else if (currentSubPath === 'admin-users') {
      fetchAdminUsers();
    } else if (currentSubPath === '') {
      fetchInquiries();
      fetchProducts();
      fetchPipelines();
      fetchDashboardStats();
    } else if (currentSubPath !== '') {
      // It's a static content page (e.g. about/intro, about/esg/ethics, etc.)
      const keyToLoad = currentSubPath === 'about/intro' 
        ? activeIntroTab 
        : currentSubPath === 'seo-settings'
        ? activeSeoTab
        : currentSubPath;

      if (currentSubPath !== 'about/intro' && currentSubPath !== 'seo-settings') {
        setActiveIntroTab('about/intro');
        setActiveSeoTab('seo/main');
      }
      fetchStaticContent(keyToLoad);
    }
  }, [currentSubPath, checkingAuth, activeIntroTab, activeSeoTab]);

  // news category mapper
  const getNewsCategory = (path: string) => {
    if (path === 'contact/newsroom/press') return 'press';
    if (path === 'contact/newsroom/media') return 'media';
    if (path === 'about/ir/announcement') return 'announcement';
    if (path === 'about/ir/financial') return 'financial';
    if (path === 'about/ir/news') return 'ir';
    if (path === 'contact/careers/jobs') return 'jobs';
    return 'press';
  };

  const getNewsCategoryLabel = (cat: string) => {
    if (cat === 'press') return '보도자료';
    if (cat === 'media') return '홍보자료실';
    if (cat === 'announcement') return '공시정보';
    if (cat === 'financial') return '재무정보';
    if (cat === 'ir') return 'IR News';
    if (cat === 'jobs') return '채용공고';
    return '글';
  };

  // Helper: Fetch Functions
  const fetchPipelines = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/pipeline');
      const data = await res.json();
      setPipelines(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchNews = async (category: string) => {
    setLoadingData(true);
    try {
      const res = await fetch(`/api/news?category=${category}`);
      const data = await res.json();
      setNewsList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchInquiries = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/inquiries?admin=true');
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/management/stats');
      if (res.ok) {
        const data = await res.json();
        setDashboardStats(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStaticContent = async (key: string) => {
    setLoadingData(true);
    try {
      const res = await fetch(`/api/management/contents?page_key=${key}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        let contentVal = (data.content || '').replace(/\r\n/g, '\n');

        // ESG path check and auto-formatting if missing pipe
        if ((key === 'about/esg/ethics' || key === 'about/esg/environment' || key === 'about/esg/safety') && contentVal && !contentVal.includes('|')) {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|${contentVal}`;
        }

        if (key === 'about/ci' && !contentVal) {
          contentVal = `다산제약의 CI는 독자적인 연구 플랫폼과 신약 파이프라인 개발을 향한 끝없는 도전, 그리고 인류의 건강을 최우선으로 생각하는 핵심 이념을 시각적으로 형상화하고 있습니다.
다산제약의 심볼은 과학과 생명의 조화로운 결합을 나타냅니다. 육각형 구조는 신약 개발 및 연구의 정밀한 화학적 결합과 견고한 기술력을 의미하며, 내부에 배치된 초록 나뭇잎은 인류의 생명 건강 증진과 친환경 미래 생명공학 리더로 성장하겠다는 비전을 상징합니다.
DASAN GREEN
RGB: 116, 184, 22 | HEX: #74B816
#74B816
생명력, 인류의 건강, 지속가능한 경영 가치 상징
DASAN CHARCOAL
RGB: 43, 43, 43 | HEX: #2B2B2B
#2B2B2B
기술적인 전문성, 정직한 기업 경영과 신뢰성 상징`;
        } else if (key === 'about/facilities' && !contentVal) {
          contentVal = `다산제약은 고난도 제형 연구를 선도하는 수원 R&D 중앙연구소와 선진 GMP(KGMP) 규격에 부합하는 아산 제1, 2공장을 가동하여 연구개발에서 생산에 이르는 완성도 높은 제약 솔루션을 제공합니다.
수원 중앙연구소
경기 수원시 영통구 신원로 304(원천동) 이노플렉스 3동 306호
약물전달시스템(DDS) 플랫폼 설계, 복합 개량신약 제제 연구, 원료의약품(API) 고효율 합성 공정 개발
고해상도 분광광도계, 초고성능 액체크로마토그래피(UPLC), 나노 입자 입도분석기 등 최첨단 제제 분석 설비 보유
아산 제1공장
충청남도 아산시 도고면 덕암산로 342
완제의약품 (정제, 캡슐제, 유동층 과립제품 등)
독일 Glatt社 최첨단 유동층 코팅기 (GPCG-300, GPCG-120), 초고속 이중정 타정기, 중앙 자동화 컨트롤 모니터링 시스템
연간 최대 9억 정 규모 고형제 생산 라인
아산 제2공장
충청남도 아산시 도고면 덕암산로 381
의약품 포장 공정 자동화 및 스마트 물류창고
독일 및 이탈리아산 고속 블리스터(Alu-Alu, PVC/PVDC) 포장기, 카토너 카운터 일원화 라인, 실시간 온습도 조절 항온물류창고
정제 선별 고해상도 인쇄 선별 장치, 고성능 스마트 집진 시스템`;
        } else if (key === 'about/location' && !contentVal) {
          contentVal = `서울 본사
경영총괄, 해외 영업본부, 마케팅 전략부서
37.5186,126.8906
다산제약 서울 본사
서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호
02-2627-5300
2호선 문래역 3번 출구 도보 8분|2/5호선 영등포구청역 6번 출구 도보 10분
우리벤처타운 정류장 하차|지선 6625, 6640A번 / 마을 영등포05번
수원 중앙연구소
DDS 제제 연구, 유기합성 연구
37.266205,127.054366
다산제약 수원 중앙연구소
경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호
031-546-8200
수인분당선 영통역 또는 청명역 하차 후 시내버스 환승 이용|수인분당선 망포역 4번 출구 도보 15분 (또는 버스 환승)
이노플렉스 정류장 하차|일반 62-1, 82-1, 99번 / 마을 55번
아산 제1공장
완제의약품 생산본부
36.7589,126.8687
다산제약 아산 제1공장
충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)
041-543-5311
1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용
아산 제2공장
최첨단 스마트 패키징 & 대량생산 라인
36.7621,126.8698
다산제약 아산 제2공장
충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)
041-428-9484
1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용`;
        } else if (key === 'about/esg/ethics' && !contentVal) {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|다산제약은 준법감시 제도를 도입하여 투명하고 정직한 경영 문화를 실천합니다.`;
        } else if (key === 'about/esg/environment' && !contentVal) {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|친환경 원료 합성 공정 및 폐기물 감소 솔루션을 통해 지구 환경 보존에 기여합니다.`;
        } else if (key === 'about/esg/safety' && !contentVal) {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|임직원의 안전한 근무 환경을 보장하기 위해 산업안전보건 지침을 철저히 준수합니다.`;
        } else if (key === 'about/ir/announcement' && !contentVal) {
          contentVal = `주주 중심 경영과 공정한 기업 가치 평가|다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.|https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD`;
        } else if (key === 'about/ir/financial' && !contentVal) {
          contentVal = `주주 중심 경영과 공정한 기업 가치 평가\n다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.\n2023년 (개별)|2024년 (개별)|2025년 (연결)|2026년 (목표)\n매출액|793|938|1,069|1,400\n영업이익|24|62|14|85\nR&D 투자액|95|120|135|160`;
        } else if (key === 'rd/intro' && !contentVal) {
          contentVal = `수원 중앙연구소 - 혁신 신약의 메카\n다산제약의 중앙연구소는 석·박사급 우수 연구인력과 고해상도 분광계, 정밀 HPLC 크로마토그래피 등 글로벌 탑티어 연구 인프라를 바탕으로 유기합성 원료 신기술 확보 및 DDS 복합 제제 개발을 이끌어내고 있습니다.\n합성 연구 파트\n신약 합성 루트 설계, 특허 회피성 신규 고순도 원료의약품(API) 공정 개발\n제제 연구 파트\n약물방출조절(DDS), 복합제 설계, 용해도 개선 및 제형 차별화 연구`;
        } else if (key === 'rd/activities' && !contentVal) {
          contentVal = `다산제약의 핵심 연구 성과는 고유한 DDS(약물전달시스템) 설계 능력에 기인합니다. 복용 편의성을 개선하고 부작용을 최소화하는 혁신적인 formulation 플랫폼을 확보하고 있습니다.\nDDS(약물전달시스템) 플랫폼 기술\n체내에서 약물이 서서히 방출되도록 설계하는 서방성 복합제 플랫폼을 보유하여 복용 횟수를 1일 3회에서 1일 1회로 개선하는 기술력 확보.\n마이크로캡슐화 기술\n약물 분자를 머리카락 굵기의 미세 캡슐로 보호하여 위장 장애를 최소화하고 표적 부위에서 효율적으로 흡수되도록 유도.`;
        } else if (key === 'business/finished/news' && !contentVal) {
          contentVal = `신제품 출시|복합 고혈압 개량신약 '피마사탄/암로디핀' 출시 승인|자체 DDS 특허 서방성 과립 코팅 기술을 사용해 환자의 복용 크기를 축소시킨 고혈압 치료제 판매가 시작되었습니다.`;
        } else if ((key === 'business/api/raw' || key === 'business/api/intermediates') && !contentVal) {
          contentVal = `다산제약은 높은 순도와 엄격한 결정 형태 조절 기술을 통해 국내외 유수 제약사들에 고부가가치 원료의약품(API)을 공급하고 있습니다.
주요 API 파이프라인
Fimasartan, Dapagliflozin, Sitagliptin, Metformin 고순도 활성 성분을 직접 합성하여 연간 수십 톤 규모로 납품 가능합니다.
중간체 정밀 유기합성
원료의 전구체 단계를 고효율 반응 공정으로 연구 및 위탁 생산하여 원가 절감과 대량 수급 안정성을 제공합니다.`;
        } else if ((key === 'business/cdmo/quality' || key === 'business/cdmo/advantages' || key === 'business/cdmo/logistics') && !contentVal) {
          contentVal = `Dasan CDMO Advantage Platform
다산제약은 단순 위탁 생산(CMO)의 단계를 넘어 약물의 제제 개발부터 임상 배치 생산, 시판 승인 신청(NDA) 지원까지 일원화된 위탁 개발 생산(CDMO) 원스톱 서비스를 지원합니다.
우수한 품질관리(QA/QC)
한국 식약처 KGMP 인증 보유 및 cGMP 기준 분석 장비와 데이터 무결성(Data Integrity) 지침 철저 운영.
특화된 과립 코팅 기술
입자가 미세한 API의 용출 속도를 제어하는 유동층 과립기 및 정밀 정제 타정 공정 장치 다수 운영.
글로벌 콜드체인 물류
생물학적 활성을 보존해야 하는 원료 및 중간체의 완벽한 보관 온습도 관리를 통한 글로벌 항공/해상 물류망 확보.`;
        } else if (key === 'contact/careers/talent' && !contentVal) {
          contentVal = `도전, 혁신, 소통으로 미래를 여는 인재
다산제약은 최고의 전문성을 지향하며, 변화에 도전하고 상호 신뢰와 소통을 바탕으로 새로운 성장과 발전을 주도해 나가는 성실한 주역을 기다립니다.
전문적 도전
자기 분야 최고의 전문 지식을 고도화하며 타협하지 않는 열정으로 문제 해결에 도전.
혁신 지향
기존 관행을 뛰어넘는 창의적인 사고로 신기술 및 프로세스 효율화 혁신 구현.
신뢰와 협동
정직과 도덕적 의무를 철저히 지키며 동료 및 파트너와의 수평적 소통을 지향.`;
        } else if (key === 'contact/careers/process' && !contentVal) {
          contentVal = `채용 프로세스 안내
다산제약은 지원자 한 분 한 분의 소중한 서류와 인성을 세밀히 검토하고 있습니다.
서류 전형
기본 요건 검토
1차 실무 면접
직무 적합성 및 역량
2차 임원 면접
인성 및 미래 가치 평가
최종 합격
입사 계약 조율`;
        }
        setStaticContent(contentVal);
        setIsHidden(data.is_hidden === 1 || data.is_hidden === true);
      } else {
        let contentVal = '';
        if (key === 'about/ci') {
          contentVal = `다산제약의 CI는 독자적인 연구 플랫폼과 신약 파이프라인 개발을 향한 끝없는 도전, 그리고 인류의 건강을 최우선으로 생각하는 핵심 이념을 시각적으로 형상화하고 있습니다.
다산제약의 심볼은 과학과 생명의 조화로운 결합을 나타냅니다. 육각형 구조는 신약 개발 및 연구의 정밀한 화학적 결합과 견고한 기술력을 의미하며, 내부에 배치된 초록 나뭇잎은 인류의 생명 건강 증진과 친환경 미래 생명공학 리더로 성장하겠다는 비전을 상징합니다.
DASAN GREEN
RGB: 116, 184, 22 | HEX: #74B816
#74B816
생명력, 인류의 건강, 지속가능한 경영 가치 상징
DASAN CHARCOAL
RGB: 43, 43, 43 | HEX: #2B2B2B
#2B2B2B
기술적인 전문성, 정직한 기업 경영과 신뢰성 상징`;
        } else if (key === 'about/facilities') {
          contentVal = `다산제약은 고난도 제형 연구를 선도하는 수원 R&D 중앙연구소와 선진 GMP(KGMP) 규격에 부합하는 아산 제1, 2공장을 가동하여 연구개발에서 생산에 이르는 완성도 높은 제약 솔루션을 제공합니다.
수원 중앙연구소
경기 수원시 영통구 신원로 304(원천동) 이노플렉스 3동 306호
약물전달시스템(DDS) 플랫폼 설계, 복합 개량신약 제제 연구, 원료의약품(API) 고효율 합성 공정 개발
고해상도 분광광도계, 초고성능 액체크로마토그래피(UPLC), 나노 입자 입도분석기 등 최첨단 제제 분석 설비 보유
아산 제1공장
충청남도 아산시 도고면 덕암산로 342
완제의약품 (정제, 캡슐제, 유동층 과립제품 등)
독일 Glatt社 최첨단 유동층 코팅기 (GPCG-300, GPCG-120), 초고속 이중정 타정기, 중앙 자동화 컨트롤 모니터링 시스템
연간 최대 9억 정 규모 고형제 생산 라인
아산 제2공장
충청남도 아산시 도고면 덕암산로 381
의약품 포장 공정 자동화 및 스마트 물류창고
독일 및 이탈리아산 고속 블리스터(Alu-Alu, PVC/PVDC) 포장기, 카토너 카운터 일원화 라인, 실시간 온습도 조절 항온물류창고
정제 선별 고해상도 인쇄 선별 장치, 고성능 스마트 집진 시스템`;
        } else if (key === 'about/location') {
          contentVal = `서울 본사
경영총괄, 해외 영업본부, 마케팅 전략부서
37.5186,126.8906
다산제약 서울 본사
서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호
02-2627-5300
2호선 문래역 3번 출구 도보 8분|2/5호선 영등포구청역 6번 출구 도보 10분
우리벤처타운 정류장 하차|지선 6625, 6640A번 / 마을 영등포05번
수원 중앙연구소
DDS 제제 연구, 유기합성 연구
37.266205,127.054366
다산제약 수원 중앙연구소
경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호
031-546-8200
수인분당선 영통역 또는 청명역 하차 후 시내버스 환승 이용|수인분당선 망포역 4번 출구 도보 15분 (또는 버스 환승)
이노플렉스 정류장 하차|일반 62-1, 82-1, 99번 / 마을 55번
아산 제1공장
완제의약품 생산본부
36.7589,126.8687
다산제약 아산 제1공장
충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)
041-543-5311
1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용
아산 제2공장
최첨단 스마트 패키징 & 대량생산 라인
36.7621,126.8698
다산제약 아산 제2공장
충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)
041-428-9484
1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용`;
        } else if (key === 'about/esg/ethics') {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|다산제약은 준법감시 제도를 도입하여 투명하고 정직한 경영 문화를 실천합니다.`;
        } else if (key === 'about/esg/environment') {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|친환경 원료 합성 공정 및 폐기물 감소 솔루션을 통해 지구 환경 보존에 기여합니다.`;
        } else if (key === 'about/esg/safety') {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|임직원의 안전한 근무 환경을 보장하기 위해 산업안전보건 지침을 철저히 준수합니다.`;
        } else if (key === 'about/ir/announcement') {
          contentVal = `주주 중심 경영과 공정한 기업 가치 평가|다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.|https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD`;
        } else if (key === 'about/ir/financial') {
          contentVal = `주주 중심 경영과 공정한 기업 가치 평가\n다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.\n2023년 (개별)|2024년 (개별)|2025년 (연결)|2026년 (목표)\n매출액|793|938|1,069|1,400\n영업이익|24|62|14|85\nR&D 투자액|95|120|135|160`;
        } else if (key === 'rd/intro') {
          contentVal = `수원 중앙연구소 - 혁신 신약의 메카\n다산제약의 중앙연구소는 석·박사급 우수 연구인력과 고해상도 분광계, 정밀 HPLC 크로마토그래피 등 글로벌 탑티어 연구 인프라를 바탕으로 유기합성 원료 신기술 확보 및 DDS 복합 제제 개발을 이끌어내고 있습니다.\n합성 연구 파트\n신약 합성 루트 설계, 특허 회피성 신규 고순도 원료의약품(API) 공정 개발\n제제 연구 파트\n약물방출조절(DDS), 복합제 설계, 용해도 개선 및 제형 차별화 연구`;
        } else if (key === 'rd/activities') {
          contentVal = `다산제약의 핵심 연구 성과는 고유한 DDS(약물전달시스템) 설계 능력에 기인합니다. 복용 편의성을 개선하고 부작용을 최소화하는 혁신적인 formulation 플랫폼을 확보하고 있습니다.\nDDS(약물전달시스템) 플랫폼 기술\n체내에서 약물이 서서히 방출되도록 설계하는 서방성 복합제 플랫폼을 보유하여 복용 횟수를 1일 3회에서 1일 1회로 개선하는 기술력 확보.\n마이크로캡슐화 기술\n약물 분자를 머리카락 굵기의 미세 캡슐로 보호하여 위장 장애를 최소화하고 표적 부위에서 효율적으로 흡수되도록 유도.`;
        } else if (key === 'business/finished/news') {
          contentVal = `신제품 출시|복합 고혈압 개량신약 '피마사탄/암로디핀' 출시 승인|자체 DDS 특허 서방성 과립 코팅 기술을 사용해 환자의 복용 크기를 축소시킨 고혈압 치료제 판매가 시작되었습니다.`;
        } else if (key === 'business/api/raw' || key === 'business/api/intermediates') {
          contentVal = `다산제약은 높은 순도와 엄격한 결정 형태 조절 기술을 통해 국내외 유수 제약사들에 고부가가치 원료의약품(API)을 공급하고 있습니다.
주요 API 파이프라인
Fimasartan, Dapagliflozin, Sitagliptin, Metformin 고순도 활성 성분을 직접 합성하여 연간 수십 톤 규모로 납품 가능합니다.
중간체 정밀 유기합성
원료의 전구체 단계를 고효율 반응 공정으로 연구 및 위탁 생산하여 원가 절감과 대량 수급 안정성을 제공합니다.`;
        } else if (key === 'business/cdmo/quality' || key === 'business/cdmo/advantages' || key === 'business/cdmo/logistics') {
          contentVal = `Dasan CDMO Advantage Platform
다산제약은 단순 위탁 생산(CMO)의 단계를 넘어 약물의 제제 개발부터 임상 배치 생산, 시판 승인 신청(NDA) 지원까지 일원화된 위탁 개발 생산(CDMO) 원스톱 서비스를 지원합니다.
우수한 품질관리(QA/QC)
한국 식약처 KGMP 인증 보유 및 cGMP 기준 분석 장비와 데이터 무결성(Data Integrity) 지침 철저 운영.
특화된 과립 코팅 기술
입자가 미세한 API의 용출 속도를 제어하는 유동층 과립기 및 정밀 정제 타정 공정 장치 다수 운영.
글로벌 콜드체인 물류
생명력 있고 활성이 높은 상태를 유지하기 위한 글로벌 콜드체인 물류망 제공.`;
        } else if (key === 'contact/careers/talent') {
          contentVal = `도전, 혁신, 소통으로 미래를 여는 인재
다산제약은 최고의 전문성을 지향하며, 변화에 도전하고 상호 신뢰와 소통을 바탕으로 새로운 성장과 발전을 주도해 나가는 성실한 주역을 기다립니다.
전문적 도전
자기 분야 최고의 전문 지식을 고도화하며 타협하지 않는 열정으로 문제 해결에 도전.
혁신 지향
기존 관행을 뛰어넘는 창의적인 사고로 신기술 및 프로세스 효율화 혁신 구현.
신뢰와 협동
정직과 도덕적 의무를 철저히 지키며 동료 및 파트너와의 수평적 소통을 지향.`;
        } else if (key === 'contact/careers/process') {
          contentVal = `채용 프로세스 안내
다산제약은 지원자 한 분 한 분의 소중한 서류와 인성을 세밀히 검토하고 있습니다.
서류 전형
기본 요건 검토
1차 실무 면접
직무 적합성 및 역량
2차 임원 면접
인성 및 미래 가치 평가
최종 합격
입사 계약 조율`;
        }
        setStaticContent(contentVal);
        setIsHidden(false);
      }
    } catch (e) {
      console.error(e);
      setIsHidden(false);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchAdminUsers = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/management/admin-users');
      if (res.ok) {
        const data = await res.json();
        setAdminUsers(Array.isArray(data) ? data : []);
      } else {
        const errData = await res.json();
        console.error(errData.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingAdmin(true);
    setAdminError('');
    try {
      const isEdit = adminModalMode === 'edit';
      const bodyData: any = {
        username: newAdminUsername,
        name: newAdminName,
        role: newAdminRole,
      };
      if (isEdit) {
        bodyData.id = editingAdminId;
        if (newAdminPassword.trim() !== '') {
          bodyData.password = newAdminPassword;
        }
      } else {
        bodyData.password = newAdminPassword;
      }

      const res = await fetch('/api/management/admin-users', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();
      if (res.ok) {
        alert(isEdit ? '계정 정보가 수정되었습니다.' : '계정이 등록되었습니다.');
        setShowAdminModal(false);
        setNewAdminUsername('');
        setNewAdminPassword('');
        setNewAdminName('');
        setNewAdminRole('editor');
        setEditingAdminId(null);
        setAdminModalMode('create');
        fetchAdminUsers();
      } else {
        setAdminError(data.error || (isEdit ? '계정 수정에 실패했습니다.' : '계정 등록에 실패했습니다.'));
      }
    } catch (err) {
      console.error(err);
      setAdminError('서버 통신 오류가 발생했습니다.');
    } finally {
      setCreatingAdmin(false);
    }
  };

  const openEditAdminModal = (user: any) => {
    setAdminError('');
    setAdminModalMode('edit');
    setEditingAdminId(user.id);
    setNewAdminName(user.name);
    setNewAdminUsername(user.username);
    setNewAdminPassword(''); // Leave empty unless changing
    setNewAdminRole(user.role);
    setShowAdminModal(true);
  };

  const handleDeleteAdminUser = async (id: number) => {
    if (!confirm('정말로 이 계정을 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/management/admin-users?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert('계정이 삭제되었습니다.');
        fetchAdminUsers();
      } else {
        alert(data.error || '계정 삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 통신 오류가 발생했습니다.');
    }
  };

  // Actions: Save Static Content
  const saveStaticContent = async () => {
    setSavingStatic(true);
    const activeKey = currentSubPath === 'about/intro' 
      ? activeIntroTab 
      : currentSubPath === 'seo-settings'
      ? activeSeoSubpage
      : currentSubPath;
    try {
      const res = await fetch('/api/management/contents', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          page_key: activeKey, 
          content: staticContent,
          is_hidden: isHidden ? 1 : 0
        }),
      });
      if (res.ok) {
        alert('콘텐츠가 성공적으로 저장되었습니다.');
        fetchStaticContent(activeKey);
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('저장 중 오류 발생');
    } finally {
      setSavingStatic(false);
    }
  };

  // Actions: Logout
  const handleLogout = async () => {
    await fetch('/api/management/auth', { method: 'DELETE' });
    router.push('/management/login');
  };

  // CRUD handlers
  // 1. Delete
  const handleDeleteItem = async (id: number, type: 'product' | 'pipeline' | 'news' | 'inquiry') => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    let url = '';
    if (type === 'product') url = `/api/products?id=${id}`;
    if (type === 'pipeline') url = `/api/pipeline?id=${id}`;
    if (type === 'news') url = `/api/news?id=${id}`;
    if (type === 'inquiry') url = `/api/inquiries?id=${id}`;

    try {
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) {
        alert('성공적으로 삭제되었습니다.');
        // Refresh list
        if (type === 'product') fetchProducts();
        if (type === 'pipeline') fetchPipelines();
        if (type === 'news') fetchNews(getNewsCategory(currentSubPath));
        if (type === 'inquiry') {
          fetchInquiries();
          setSelectedInquiry(null);
        }
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 2. Open Modal for Create
  const openCreateModal = () => {
    setFormMode('create');
    setActiveItem(null);

    // Reset fields
    setProdName('');
    setProdEngName('');
    setProdType('전문의약품');
    setProdEfficacy('');
    setProdConsonant('ㄱ');
    setProdFileUrl('');
    setProdFileName('');

    setPipeCategory('개량신약');
    setPipeProject('');
    setPipeDisease('');
    setPipePhase('기초연구');
    setPipePartner('');

    setNewsTitle('');
    setNewsContent('');
    setNewsFileUrl('');
    setNewsFileName('');

    setJobType('신입/경력');
    setJobQualifications('');
    setJobDeadline('');
    setJobDescription('');

    setShowFormModal(true);
  };

  // 3. Open Modal for Edit
  const openEditModal = (item: any, type: 'product' | 'pipeline' | 'news') => {
    setFormMode('edit');
    setActiveItem(item);

    if (type === 'product') {
      setProdName(item.name);
      setProdEngName(item.englishName);
      setProdType(item.type);
      setProdEfficacy(item.efficacy);
      setProdConsonant(item.consonant);
      setProdFileUrl(item.file_url || '');
      setProdFileName(item.file_name || '');
    } else if (type === 'pipeline') {
      setPipeCategory(item.category);
      setPipeProject(item.project_name);
      setPipeDisease(item.disease);
      setPipePhase(item.phase);
      setPipePartner(item.partner);
    } else if (type === 'news') {
      setNewsTitle(item.title);
      setNewsContent(item.content);
      setNewsFileUrl(item.file_url || '');
      setNewsFileName(item.file_name || '');

      if (currentSubPath === 'contact/careers/jobs') {
        const parts = (item.content || '').split('|');
        if (parts.length >= 4) {
          setJobType(parts[0] || '신입/경력');
          setJobQualifications(parts[1] || '');
          setJobDeadline(parts[2] || '');
          setJobDescription(parts.slice(3).join('|') || '');
        } else {
          setJobType('공통');
          setJobQualifications('상세내용 참조');
          setJobDeadline('상시채용');
          setJobDescription(item.content || '');
        }
      }
    }

    setShowFormModal(true);
  };

  // 4. Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let url = '';
    let method = formMode === 'create' ? 'POST' : 'PUT';
    let bodyData: any = {};

    if (currentSubPath === 'business/finished/search') {
      url = '/api/products';
      bodyData = {
        name: prodName,
        englishName: prodEngName,
        type: prodType,
        efficacy: prodEfficacy,
        consonant: prodConsonant,
        file_url: prodFileUrl,
        file_name: prodFileName,
      };
      if (formMode === 'edit') bodyData.id = activeItem.id;
    } else if (currentSubPath === 'rd/pipeline') {
      url = '/api/pipeline';
      bodyData = {
        category: pipeCategory,
        project_name: pipeProject,
        disease: pipeDisease,
        phase: pipePhase,
        partner: pipePartner,
      };
      if (formMode === 'edit') bodyData.id = activeItem.id;
    } else if (
      currentSubPath === 'contact/newsroom/press' ||
      currentSubPath === 'contact/newsroom/media' ||
      currentSubPath === 'about/ir/announcement' ||
      currentSubPath === 'about/ir/financial' ||
      currentSubPath === 'about/ir/news' ||
      currentSubPath === 'contact/careers/jobs'
    ) {
      url = '/api/news';
      const finalContent = currentSubPath === 'contact/careers/jobs'
        ? `${jobType}|${jobQualifications}|${jobDeadline}|${jobDescription}`
        : newsContent;

      bodyData = {
        category: getNewsCategory(currentSubPath),
        title: newsTitle,
        content: finalContent,
        file_url: newsFileUrl,
        file_name: newsFileName,
      };
      if (formMode === 'edit') {
        bodyData.id = activeItem.id;
        bodyData.views = activeItem.views;
      }
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        alert(formMode === 'create' ? '정상적으로 등록되었습니다.' : '정상적으로 수정되었습니다.');
        setShowFormModal(false);
        // Refresh list
        if (currentSubPath === 'business/finished/search') fetchProducts();
        if (currentSubPath === 'rd/pipeline') fetchPipelines();
        if (
          currentSubPath === 'contact/newsroom/press' ||
          currentSubPath === 'contact/newsroom/media' ||
          currentSubPath === 'about/ir/announcement' ||
          currentSubPath === 'about/ir/financial' ||
          currentSubPath === 'about/ir/news' ||
          currentSubPath === 'contact/careers/jobs'
        ) {
          fetchNews(getNewsCategory(currentSubPath));
        }
      } else {
        const err = await res.json();
        alert(err.error || '처리에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('오류 발생');
    }
  };

  // Export board data to Excel (CSV with BOM)
  const handleExportExcel = () => {
    let headers: string[] = [];
    let rows: any[] = [];
    let filename = '';

    if (
      currentSubPath === 'contact/newsroom/press' ||
      currentSubPath === 'contact/newsroom/media' ||
      currentSubPath === 'about/ir/news' ||
      currentSubPath === 'about/ir/announcement' ||
      currentSubPath === 'about/ir/financial' ||
      currentSubPath === 'contact/careers/jobs'
    ) {
      if (currentSubPath === 'contact/careers/jobs') {
        headers = ['번호', '채용구분', '공고명', '자격요건', '마감일', '조회수', '등록일'];
        rows = newsList.map(n => {
          const parts = (n.content || '').split('|');
          const type = parts[0] || '신입/경력';
          const qualifications = parts[1] || '학사 이상';
          const deadline = parts[2] || '상시채용';
          return [
            n.id,
            type,
            n.title,
            qualifications,
            deadline,
            n.views,
            new Date(n.created_at).toLocaleDateString()
          ];
        });
        filename = `채용공고_리스트_${new Date().toISOString().slice(0, 10)}.csv`;
      } else {
        headers = ['번호', '구분', '제목', '조회수', '첨부파일명', '등록일'];
        rows = newsList.map(n => [
          n.id,
          getNewsCategoryLabel(n.category),
          n.title,
          n.views,
          n.file_name || '없음',
          new Date(n.created_at).toLocaleDateString()
        ]);
        filename = `보도자료_IR_리스트_${new Date().toISOString().slice(0, 10)}.csv`;
      }
    } else if (currentSubPath === 'business/finished/search') {
      headers = ['번호', '구분', '약효군', '제품명(국문)', '제품명(영문)'];
      rows = products.map(p => [
        p.id,
        p.type,
        p.efficacy,
        p.name,
        p.english_name || ''
      ]);
      filename = `제품리스트_${new Date().toISOString().slice(0, 10)}.csv`;
    } else if (currentSubPath === 'rd/pipeline') {
      headers = ['번호', '구분', '프로젝트명', '적응증', '개발단계', '협력기관'];
      rows = pipelines.map(p => [
        p.id,
        p.category,
        p.project_name,
        p.disease,
        p.phase,
        p.partner || ''
      ]);
      filename = `파이프라인리스트_${new Date().toISOString().slice(0, 10)}.csv`;
    } else {
      alert('다운로드 가능한 데이터가 없습니다.');
      return;
    }

    // Convert to CSV string with BOM for Excel Korean support
    const csvContent = "\uFEFF" + [
      headers.join(','),
      ...rows.map(row => row.map((val: any) => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle Sidebar Menu Accordions
  const toggleSidebarAccordion = (key: string) => {
    setSidebarOpenKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#070b13]">
        <div className="text-center text-xs md:text-sm text-gray-500 font-semibold">
          인증 여부를 확인하는 중입니다...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#070b13] text-gray-150">
      {/* 1. Header (Navbar) */}
      <header className="bg-[#0a1120]/90 backdrop-blur-md border-b border-white/10 h-20 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push('/management/dashboard')}
            className="font-extrabold text-sm tracking-wider text-brand-green uppercase cursor-pointer hover:opacity-80 transition-opacity"
          >
            DASAN PHARM
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => router.push('/management/dashboard')}
            className="font-bold text-xs md:text-sm text-white cursor-pointer hover:opacity-80 transition-opacity"
          >
            관리자 대시보드
          </button>
        </div>
        <div className="flex items-center space-x-3">
          {currentUser && (
            <span className="text-[11px] text-gray-300 font-extrabold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <span className="text-brand-green uppercase mr-1.5">
                {currentUser.role === 'super_admin'
                  ? '최고관리자'
                  : currentUser.role === 'editor'
                  ? '콘텐츠관리자'
                  : currentUser.role === 'connect_editor'
                  ? '뉴스룸관리자'
                  : '조회권한자'}
              </span>
              {currentUser.name}님
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:border-brand-green/30 hover:text-brand-green text-xs font-bold transition-all bg-white/5 cursor-pointer hover:bg-white/10"
          >
            <Globe size={14} />
            <span>사용자 페이지 바로가기</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:border-red-500/30 hover:text-red-450 text-xs font-bold transition-all bg-white/5 cursor-pointer hover:bg-white/10"
          >
            <LogOut size={14} />
            <span>로그아웃</span>
          </button>
        </div>
      </header>

      {/* 2. Main Section */}
      <div className="flex-1 flex w-full relative">
        
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-[#0a1120]/40 backdrop-blur-sm min-h-[calc(100vh-80px)] shrink-0 hidden md:block select-none">
          <nav className="p-4 space-y-3">
            {navigationData
              .map((grand) => {
                if (currentUser?.role === 'connect_editor') {
                  if (grand.name !== 'Connect') return null;
                  const filteredMajors = grand.majors
                    .filter((major) => major.name === '뉴스룸')
                    .map((major) => ({
                      ...major,
                      subMenus: major.subMenus.filter(
                        (sub) =>
                          sub.link === '/contact/newsroom/press' ||
                          sub.link === '/contact/newsroom/media'
                      ),
                    }));
                  return { ...grand, majors: filteredMajors };
                }
                return grand;
              })
              .filter((grand): grand is GrandMenu => grand !== null)
              .map((grand) => {
              // Skip the dummy ENG menu
              if (grand.name === 'Connect' && grand.majors[grand.majors.length - 1].name === '상단메뉴') {
                grand.majors = grand.majors.filter(m => m.name !== '상단메뉴');
              }
              const isGrandOpen = sidebarOpenKeys[grand.name];

              return (
                <div key={grand.name} className="space-y-1">
                  {/* Grand Menu Button */}
                  <button
                    onClick={() => toggleSidebarAccordion(grand.name)}
                    className="flex items-center justify-between w-full px-3 py-2 text-[11px] font-black uppercase tracking-wider text-gray-400 hover:text-white text-left rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <span>{grand.name}</span>
                    {isGrandOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>

                  {/* Majors & Subs Accordion */}
                  {isGrandOpen && (
                    <div className="pl-2.5 space-y-2.5 mt-1 border-l border-white/5 ml-3.5">
                      {grand.majors.map((major) => (
                        <div key={major.name} className="space-y-1">
                          <h4 className="text-[10px] font-black tracking-wider text-white px-2 py-0.5 uppercase">
                            {major.name}
                          </h4>
                          <ul className="space-y-0.5">
                            {major.subMenus.map((sub) => {
                              // Skip hash links
                              if (sub.link.startsWith('#')) return null;

                              const relativeLink = sub.link.replace(/^\//, '');
                              const isActive = currentSubPath === relativeLink;

                              return (
                                <li key={sub.name}>
                                  <button
                                    onClick={() => router.push(`/management/dashboard/${relativeLink}`)}
                                    className={`w-full text-left py-2 rounded-r-xl text-[11px] transition-all duration-300 cursor-pointer font-semibold border-l-[3px] ${
                                      isActive
                                        ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5'
                                    }`}
                                  >
                                    {sub.name}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Custom SEO Settings Accordion */}
            {currentUser?.role !== 'connect_editor' && (
              <div className="pt-2.5 mt-2.5 border-t border-white/5 space-y-1">
                <button
                  onClick={() => router.push('/management/dashboard/seo-settings')}
                  className={`w-full text-left py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer block border-l-[3px] ${
                    currentSubPath === 'seo-settings'
                      ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5'
                  }`}
                >
                  <span>SEO 설정 관리</span>
                </button>

                {/* Admin Users management (Super admin only) */}
                {currentUser?.role === 'super_admin' && (
                  <button
                    onClick={() => router.push('/management/dashboard/admin-users')}
                    className={`w-full text-left py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer block border-l-[3px] ${
                      currentSubPath === 'admin-users'
                        ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5'
                    }`}
                  >
                    <span>관리자 계정 관리</span>
                  </button>
                )}
              </div>
            )}
          </nav>
        </aside>

        {/* Right Dashboard Area */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full">
          {/* Active page header */}
          <div className="mb-8 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-green mb-1.5">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-gray-500">{currentSubPath === '' ? 'Main' : currentSubPath.split('/')[0]}</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {currentSubPath === 'seo-settings'
                  ? 'SEO 설정 관리'
                  : currentSubPath === 'admin-users'
                  ? '관리자 계정 관리'
                  : navigationData
                      .flatMap(g => g.majors.flatMap(m => m.subMenus))
                      .find(s => s.link.replace(/^\//, '') === currentSubPath)?.name || '관리자 메인'}
              </h2>
            </div>
             {/* Context Actions */}
             {(currentSubPath === 'business/finished/search' || 
               currentSubPath === 'rd/pipeline' ||
               currentSubPath === 'contact/newsroom/press' ||
               currentSubPath === 'contact/newsroom/media' ||
               currentSubPath === 'about/ir/announcement' ||
               currentSubPath === 'about/ir/financial' ||
               currentSubPath === 'about/ir/news' ||
               currentSubPath === 'contact/careers/jobs') && (
               <div className="flex items-center space-x-2 ml-auto sm:ml-0">
                 <button
                   onClick={handleExportExcel}
                   className="inline-flex items-center space-x-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-250 hover:text-white font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer shadow-sm"
                 >
                   <Download size={14} />
                   <span>엑셀 다운로드</span>
                 </button>
                 {currentUser?.role !== 'viewer' && (
                   <button
                     onClick={openCreateModal}
                     className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                   >
                     <Plus size={14} />
                     <span>신규 등록</span>
                   </button>
                 )}
               </div>
             )}
          </div>

          {/* 3. Panel Switcher based on currentSubPath */}
          {loadingData ? (
            <div className="bg-[#0a1120]/60 border border-white/10 rounded-2xl p-20 text-center text-xs md:text-sm text-gray-500 font-semibold shadow-lg backdrop-blur-md">
              데이터를 로딩 중입니다...
            </div>
          ) : (
            <div className="w-full">
              
              {/* Case A: Products Manager */}
              {currentSubPath === 'business/finished/search' && (
                <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-5 py-4 w-[15%]">구분</th>
                          <th className="px-5 py-4 w-[25%]">제품명</th>
                          <th className="px-5 py-4 w-[25%]">영문명</th>
                          <th className="px-5 py-4 w-[20%]">효능/효과</th>
                          <th className="px-5 py-4 w-[15%] text-right">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                        {products.length > 0 ? (
                          products.map(p => (
                            <tr key={p.id} className="hover:bg-white/[0.02] border-b border-white/5 last:border-0 transition-colors">
                              <td className="px-5 py-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                                  p.type === '전문의약품' 
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                    : 'bg-brand-green/20 text-brand-green border-brand-green/30'
                                }`}>
                                  {p.type}
                                </span>
                              </td>
                              <td className="px-5 py-4 font-bold text-white">{p.name}</td>
                              <td className="px-5 py-4 text-gray-500 font-mono text-xs">{p.english_name || '-'}</td>
                              <td className="px-5 py-4 text-xs text-gray-400">{p.efficacy}</td>
                              <td className="px-5 py-4 text-right space-x-2">
                                {currentUser?.role !== 'viewer' && (
                                  <button
                                    onClick={() => openEditModal(p, 'product')}
                                    className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer inline-block"
                                  >
                                    <Edit size={14} />
                                  </button>
                                )}
                                {currentUser?.role === 'super_admin' && (
                                  <button
                                    onClick={() => handleDeleteItem(p.id, 'product')}
                                    className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer inline-block"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-12 text-gray-500 text-xs">
                              등록된 완제의약품이 없습니다.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Case B: Pipeline Manager */}
              {currentSubPath === 'rd/pipeline' && (
                <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-5 py-4 w-[20%]">구분</th>
                          <th className="px-5 py-4 w-[20%]">프로젝트명</th>
                          <th className="px-5 py-4 w-[25%]">질환군</th>
                          <th className="px-5 py-4 w-[15%]">개발단계</th>
                          <th className="px-5 py-4 w-[10%]">협력기관</th>
                          <th className="px-5 py-4 w-[10%] text-right">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                        {pipelines.length > 0 ? (
                          pipelines.map(p => (
                            <tr key={p.id} className="hover:bg-white/[0.02] border-b border-white/5 last:border-0 transition-colors">
                              <td className="px-5 py-4 font-bold text-white">{p.category}</td>
                              <td className="px-5 py-4 font-mono font-bold text-brand-green">{p.project_name}</td>
                              <td className="px-5 py-4 text-xs text-gray-400">{p.disease}</td>
                              <td className="px-5 py-4">
                                <span className="bg-white/5 text-gray-300 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold">
                                  {p.phase}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-xs text-gray-500">{p.partner || '-'}</td>
                              <td className="px-5 py-4 text-right space-x-2">
                                {currentUser?.role !== 'viewer' && (
                                  <button
                                    onClick={() => openEditModal(p, 'pipeline')}
                                    className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer inline-block"
                                  >
                                    <Edit size={14} />
                                  </button>
                                )}
                                {currentUser?.role === 'super_admin' && (
                                  <button
                                    onClick={() => handleDeleteItem(p.id, 'pipeline')}
                                    className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer inline-block"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center py-12 text-gray-400 text-xs">
                              등록된 파이프라인 항목이 없습니다.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Case C: News / IR Manager */}
              {(currentSubPath === 'contact/newsroom/press' ||
                currentSubPath === 'contact/newsroom/media' ||
                currentSubPath === 'about/ir/announcement' ||
                currentSubPath === 'about/ir/financial' ||
                currentSubPath === 'about/ir/news' ||
                currentSubPath === 'contact/careers/jobs') && (
                <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                        {currentSubPath === 'contact/careers/jobs' ? (
                          <tr>
                            <th className="px-5 py-4 w-[12%]">채용구분</th>
                            <th className="px-5 py-4 w-[35%]">공고명</th>
                            <th className="px-5 py-4 w-[25%]">자격요건</th>
                            <th className="px-5 py-4 w-[10%]">마감일</th>
                            <th className="px-5 py-4 w-[8%]">조회수</th>
                            <th className="px-5 py-4 w-[10%] text-right">관리</th>
                          </tr>
                        ) : (
                          <tr>
                            <th className="px-5 py-4 w-[15%]">구분</th>
                            <th className="px-5 py-4 w-[50%]">제목</th>
                            <th className="px-5 py-4 w-[10%]">조회수</th>
                            <th className="px-5 py-4 w-[15%]">작성일</th>
                            <th className="px-5 py-4 w-[10%] text-right">관리</th>
                          </tr>
                        )}
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                        {newsList.length > 0 ? (
                          newsList.map(n => {
                            let jobType = '신입/경력';
                            let jobQual = '학사 이상';
                            let jobDead = '상시채용';
                            if (currentSubPath === 'contact/careers/jobs') {
                              const parts = (n.content || '').split('|');
                              jobType = parts[0] || '신입/경력';
                              jobQual = parts[1] || '학사 이상';
                              jobDead = parts[2] || '상시채용';
                            }
                            return (
                              <tr key={n.id} className="hover:bg-white/[0.02] border-b border-white/5 last:border-0 transition-colors">
                                {currentSubPath === 'contact/careers/jobs' ? (
                                  <>
                                    <td className="px-5 py-4">
                                      <span className="bg-brand-green/10 text-brand-green border border-brand-green/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                        {jobType}
                                      </span>
                                    </td>
                                    <td className="px-5 py-4 font-bold text-white">{n.title}</td>
                                    <td className="px-5 py-4 text-xs text-gray-400 truncate max-w-[200px]">{jobQual}</td>
                                    <td className="px-5 py-4 font-bold text-rose-500">{jobDead}</td>
                                    <td className="px-5 py-4 font-mono text-gray-500">{n.views}</td>
                                  </>
                                ) : (
                                  <>
                                    <td className="px-5 py-4">
                                      <span className="bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                        {getNewsCategoryLabel(n.category)}
                                      </span>
                                    </td>
                                    <td className="px-5 py-4 font-bold text-white">{n.title}</td>
                                    <td className="px-5 py-4 font-mono text-gray-500">{n.views}</td>
                                    <td className="px-5 py-4 text-xs text-gray-400">
                                      {new Date(n.created_at).toLocaleDateString()}
                                    </td>
                                  </>
                                )}
                                <td className="px-5 py-4 text-right space-x-2">
                                  {currentUser?.role !== 'viewer' && (
                                    <button
                                      onClick={() => openEditModal(n, 'news')}
                                      className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer inline-block"
                                    >
                                      <Edit size={14} />
                                    </button>
                                  )}
                                  {currentUser?.role === 'super_admin' && (
                                    <button
                                      onClick={() => handleDeleteItem(n.id, 'news')}
                                      className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer inline-block"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={currentSubPath === 'contact/careers/jobs' ? 6 : 5} className="text-center py-12 text-gray-500 text-xs">
                              등록된 게시글이 없습니다.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Case D: Inquiries View */}
              {(currentSubPath === 'contact/inquiry/check' ||
                currentSubPath === 'contact/inquiry' ||
                currentSubPath === 'contact/inquiry/sales' ||
                currentSubPath === 'contact/inquiry/corruption') && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Inquiries List */}
                  <div className="lg:col-span-2 bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="px-4 py-4 w-[25%]">작성자</th>
                            <th className="px-4 py-4 w-[45%]">제목</th>
                            <th className="px-4 py-4 w-[20%]">작성일</th>
                            <th className="px-4 py-4 w-[10%] text-right">삭제</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                          {filteredInquiries.length > 0 ? (
                            filteredInquiries.map(inq => {
                              const { prefix, clean } = getCleanSubjectAndPrefix(inq.subject);
                              return (
                                <tr 
                                  key={inq.id} 
                                  onClick={() => setSelectedInquiry(inq)}
                                  className={`hover:bg-white/[0.02] border-b border-white/5 transition-colors cursor-pointer ${
                                    selectedInquiry?.id === inq.id ? 'bg-brand-green/10 text-white' : ''
                                  }`}
                                >
                                  <td className="px-4 py-4 font-bold text-white">
                                    {inq.name}
                                    <span className="block text-[10px] text-gray-500 font-normal font-mono">{inq.email}</span>
                                  </td>
                                  <td className="px-4 py-4 font-bold text-gray-200">
                                    {prefix && (
                                      <span className={`inline-block mr-2 px-1.5 py-0.5 text-[9px] font-black rounded ${
                                        prefix === '제품 문의' ? 'bg-brand-teal/10 text-brand-teal border border-brand-teal/20' :
                                        prefix === '영업 문의' ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' :
                                        prefix === '부패신고' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                        'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                                      }`}>
                                        {prefix}
                                      </span>
                                    )}
                                    {clean}
                                  </td>
                                  <td className="px-4 py-4 text-xs text-gray-400">
                                    {new Date(inq.created_at).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                    {currentUser?.role === 'super_admin' ? (
                                      <button
                                        onClick={() => handleDeleteItem(inq.id, 'inquiry')}
                                        className="text-gray-500 hover:text-red-450 p-1 cursor-pointer transition-colors"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    ) : (
                                      <span className="text-[10px] text-gray-650">권한없음</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center py-12 text-gray-550 text-xs">
                                등록된 고객 문의사항이 없습니다.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Right Column: Inquiry detail */}
                  <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4 h-fit text-white">
                    <h3 className="text-sm font-extrabold text-white pb-2 border-b border-white/10 flex items-center space-x-1.5">
                      <span>문의내용 상세 확인</span>
                    </h3>

                    {selectedInquiry ? (
                      <div className="space-y-4 animate-fade-in-up">
                        <div className="grid grid-cols-2 gap-3 text-xs bg-white/5 p-3.5 rounded-lg border border-white/10 font-semibold">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase block">작성자</span>
                            <span className="text-white font-bold">{selectedInquiry.name}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase block">연락처</span>
                            <span className="text-white font-mono">{selectedInquiry.phone || '미기재'}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[10px] text-gray-400 uppercase block">이메일</span>
                            <span className="text-white font-mono">{selectedInquiry.email || '미기재'}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] text-gray-400 uppercase block">제목</span>
                          <div className="text-white font-bold bg-white/5 p-3 rounded-lg border border-white/10 text-xs">
                            {(() => {
                              const { prefix, clean } = getCleanSubjectAndPrefix(selectedInquiry.subject);
                              return (
                                <>
                                  {prefix && (
                                    <span className={`inline-block mr-2 px-1.5 py-0.5 text-[9px] font-black rounded ${
                                      prefix === '제품 문의' ? 'bg-brand-teal/10 text-brand-teal border border-brand-teal/20' :
                                      prefix === '영업 문의' ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' :
                                      prefix === '부패신고' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                      'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                                    }`}>
                                      {prefix}
                                    </span>
                                  )}
                                  {clean}
                                </>
                              );
                            })()}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] text-gray-400 uppercase block">문의내용</span>
                          <div className="text-gray-200 bg-white/5 p-3.5 rounded-lg border border-white/10 text-xs min-h-[150px] whitespace-pre-wrap font-medium">
                            {selectedInquiry.content}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-550 text-xs">
                        확인할 문의사항을 선택해 주세요.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Case E: Static Text Content CMS Editor */}
              {currentSubPath !== '' && 
               currentSubPath !== 'business/finished/search' && 
               currentSubPath !== 'rd/pipeline' && 
               currentSubPath !== 'contact/newsroom/press' && 
               currentSubPath !== 'contact/newsroom/media' && 
               currentSubPath !== 'about/ir/announcement' && 
               currentSubPath !== 'about/ir/financial' && 
               currentSubPath !== 'about/ir/news' && 
               currentSubPath !== 'contact/careers/jobs' && 
               currentSubPath !== 'contact/inquiry/check' && 
               currentSubPath !== 'contact/inquiry' && 
               currentSubPath !== 'contact/inquiry/sales' && 
               currentSubPath !== 'contact/inquiry/corruption' && 
               currentSubPath !== 'admin-users' && 
               currentSubPath !== 'seo-settings' && (
                <div className="space-y-6">
                  {/* Sub-tabs for intro page key sub-components */}
                  {currentSubPath === 'about/intro' && (
                    <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
                       {[
                        { key: 'about/intro', label: '회사소개 본문' },
                        { key: 'about/intro/competencies', label: '핵심역량' },
                        { key: 'about/intro/vision', label: '비전/미션' },
                        { key: 'about/intro/values', label: '핵심가치' },
                        { key: 'about/intro/philosophy', label: '경영철학' },
                        { key: 'about/intro/culture', label: '건강한 문화' }
                      ].map(tab => {
                        const isActive = activeIntroTab === tab.key;
                        return (
                          <button
                            key={tab.key}
                            onClick={() => {
                              setActiveIntroTab(tab.key);
                              fetchStaticContent(tab.key);
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isActive 
                                ? 'bg-brand-green text-white shadow-md shadow-brand-green/10'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Content Editor Form */}
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md space-y-4 text-white">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <h3 className="text-sm font-extrabold text-white">
                          {currentSubPath === 'about/intro'
                            ? `문구 에디터 (${
                                [
                                  { key: 'about/intro', label: '회사소개 본문' },
                                  { key: 'about/intro/competencies', label: '핵심역량' },
                                  { key: 'about/intro/vision', label: '비전/미션' },
                                  { key: 'about/intro/values', label: '핵심가치' },
                                  { key: 'about/intro/philosophy', label: '경영철학' },
                                  { key: 'about/intro/culture', label: '건강한 문화' }
                                ].find(t => t.key === activeIntroTab)?.label || '회사소개 본문'
                              })`
                            : '문구 에디터'}
                        </h3>
                        {currentUser?.role !== 'viewer' && (
                          <button
                            onClick={async () => {
                              const activeKey = currentSubPath === 'about/intro' ? activeIntroTab : currentSubPath;
                              setSavingStatic(true);
                              try {
                                const res = await fetch('/api/management/contents', {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ page_key: activeKey, content: staticContent }),
                                });
                                if (res.ok) {
                                  alert('콘텐츠가 성공적으로 저장되었습니다.');
                                  fetchStaticContent(activeKey);
                                } else {
                                  alert('저장에 실패했습니다.');
                                }
                              } catch (e) {
                                console.error(e);
                                alert('저장 중 오류 발생');
                              } finally {
                                setSavingStatic(false);
                              }
                            }}
                            disabled={savingStatic}
                            className="inline-flex items-center space-x-1 bg-brand-green hover:bg-brand-green-dark text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10 cursor-pointer disabled:opacity-50"
                          >
                            <Save size={14} />
                            <span>저장하기</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        {/* 1. 회사소개 본문 */}
                        {currentSubPath === 'about/intro' && activeIntroTab === 'about/intro' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 제목 (Title)</label>
                              <input
                                type="text"
                                value={staticContent.split('|')[0] || ''}
                                onChange={(e) => {
                                  const parts = staticContent.split('|');
                                  if (parts.length < 2) {
                                    parts.push('');
                                  }
                                  parts[0] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                                placeholder="기업개요 제목을 입력하세요 (줄바꿈이 필요한 경우 \n 입력)."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 본문 내용 (Content)</label>
                              <textarea
                                value={staticContent.split('|')[1] || ''}
                                onChange={(e) => {
                                  const parts = staticContent.split('|');
                                  if (parts.length < 2) {
                                    parts.unshift('');
                                  }
                                  parts[1] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-4 text-xs md:text-sm text-white placeholder-gray-500 min-h-[250px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                                placeholder="기업개요 본문 내용을 입력하세요."
                              />
                            </div>
                          </div>
                        )}

                        {/* 2. 핵심역량 */}
                        {currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/competencies' && (
                          <div className="space-y-4">
                            {[0, 1, 2].map((idx) => {
                              const line = (staticContent || '').split('\n')[idx] || '';
                              const lineParts = line.split('|');
                              const title = lineParts[0] || '';
                              const desc = lineParts[1] || '';
                              return (
                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                  <span className="text-[10px] font-bold text-brand-green uppercase">역량 #{idx + 1}</span>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">역량 제목</label>
                                    <input
                                      type="text"
                                      value={title}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        currentLineParts[0] = e.target.value;
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="역량 제목을 입력하세요."
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">역량 설명</label>
                                    <textarea
                                      value={desc}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        currentLineParts[1] = e.target.value;
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="설명 내용을 입력하세요."
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 3. 비전/미션 */}
                        {currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/vision' && (
                          <div className="space-y-4">
                            {['Mission', 'Vision'].map((type, idx) => {
                              const line = (staticContent || '').split('\n')[idx] || '';
                              const lineParts = line.split('|');
                              const title = lineParts[0] || '';
                              const desc = lineParts[1] || '';
                              return (
                                <div key={type} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                  <span className="text-[10px] font-bold text-brand-green uppercase">{type} 설정</span>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">{type} 제목</label>
                                    <input
                                      type="text"
                                      value={title}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        currentLineParts[0] = e.target.value;
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder={`${type} 제목을 입력하세요.`}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">{type} 설명</label>
                                    <textarea
                                      value={desc}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        currentLineParts[1] = e.target.value;
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[70px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder={`${type} 설명을 입력하세요.`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 4. 핵심가치 */}
                        {currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/values' && (
                          <div className="space-y-4">
                            {[0, 1, 2, 3, 4].map((idx) => {
                              const line = (staticContent || '').split('\n')[idx] || '';
                              const lineParts = line.split('|');
                              const valueName = lineParts[0] || '';
                              const subtitle = lineParts[1] || '';
                              const desc = lineParts[2] || '';
                              const letter = ['D', 'A', 'S', 'A', 'N'][idx];
                              return (
                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="w-5 h-5 rounded bg-brand-green/20 text-brand-green flex items-center justify-center font-bold text-xs">{letter}</span>
                                    <span className="text-[10px] font-bold text-brand-green uppercase">핵심 가치 #{idx + 1}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block">가치 영문명 (Value Name)</label>
                                      <input
                                        type="text"
                                        value={valueName}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= idx) lines.push('');
                                          const currentLineParts = lines[idx].split('|');
                                          currentLineParts[0] = e.target.value;
                                          while (currentLineParts.length < 3) currentLineParts.push('');
                                          lines[idx] = currentLineParts.join('|');
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="예: Devotion"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block">소제목 (Subtitle)</label>
                                      <input
                                        type="text"
                                        value={subtitle}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= idx) lines.push('');
                                          const currentLineParts = lines[idx].split('|');
                                          while (currentLineParts.length < 2) currentLineParts.push('');
                                          currentLineParts[1] = e.target.value;
                                          while (currentLineParts.length < 3) currentLineParts.push('');
                                          lines[idx] = currentLineParts.join('|');
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="예: 신뢰와 책임"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">가치 설명</label>
                                    <textarea
                                      value={desc}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        while (currentLineParts.length < 3) currentLineParts.push('');
                                        currentLineParts[2] = e.target.value;
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="핵심 가치 상세 설명 내용을 입력하세요."
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 5. 경영철학 */}
                        {currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/philosophy' && (
                          <div className="space-y-4">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const quote = lines[0] || '';
                              return (
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                  <span className="text-[10px] font-bold text-brand-green uppercase">경영철학 인용구</span>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">메인 인용구 (Quote)</label>
                                    <input
                                      type="text"
                                      value={quote}
                                      onChange={(e) => {
                                        const currentLines = (staticContent || '').split('\n');
                                        currentLines[0] = e.target.value;
                                        setStaticContent(currentLines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="경영철학 메인 문구를 입력하세요."
                                    />
                                  </div>
                                </div>
                              );
                            })()}

                            {[1, 2, 3].map((idx) => {
                              const line = (staticContent || '').split('\n')[idx] || '';
                              const lineParts = line.split('|');
                              const title = lineParts[0] || '';
                              const desc = lineParts[1] || '';
                              return (
                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                  <span className="text-[10px] font-bold text-brand-green uppercase">핵심 기둥 #{idx} (Pillar)</span>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">기둥 제목</label>
                                    <input
                                      type="text"
                                      value={title}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        currentLineParts[0] = e.target.value;
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="기둥 제목을 입력하세요."
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">기둥 설명</label>
                                    <textarea
                                      value={desc}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        currentLineParts[1] = e.target.value;
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="상세 설명 내용을 입력하세요."
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 6. 건강한 문화 */}
                        {currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/culture' && (
                          <div className="space-y-4">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              let mainTitle = '다산인의 건강한 문화';
                              let subText = '';
                              const isLegacy = lines.length < 5;

                              if (isLegacy) {
                                subText = lines[0] || '';
                              } else {
                                mainTitle = lines[0] || '다산인의 건강한 문화';
                                subText = lines[1] || '';
                              }

                              return (
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                                  <span className="text-[10px] font-bold text-brand-green uppercase block">건강한 문화 소개글</span>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">메인 타이틀 (Main Title)</label>
                                    <input
                                      type="text"
                                      value={mainTitle}
                                      onChange={(e) => {
                                        const currentLines = (staticContent || '').split('\n');
                                        if (currentLines.length < 5) {
                                          // Upgrade to 5 lines
                                          const newLines = [
                                            e.target.value,
                                            currentLines[0] || '',
                                            currentLines[1] || '',
                                            currentLines[2] || '',
                                            currentLines[3] || ''
                                          ];
                                          setStaticContent(newLines.join('\n'));
                                        } else {
                                          currentLines[0] = e.target.value;
                                          setStaticContent(currentLines.join('\n'));
                                        }
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="예: 다산인의 건강한 문화"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">서브 카피 (Sub Text)</label>
                                    <input
                                      type="text"
                                      value={subText}
                                      onChange={(e) => {
                                        const currentLines = (staticContent || '').split('\n');
                                        if (currentLines.length < 5) {
                                          // Upgrade to 5 lines
                                          const newLines = [
                                            '다산인의 건강한 문화',
                                            e.target.value,
                                            currentLines[1] || '',
                                            currentLines[2] || '',
                                            currentLines[3] || ''
                                          ];
                                          setStaticContent(newLines.join('\n'));
                                        } else {
                                          currentLines[1] = e.target.value;
                                          setStaticContent(currentLines.join('\n'));
                                        }
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="소개 서브 문구를 입력하세요."
                                    />
                                  </div>
                                </div>
                              );
                            })()}

                            {[1, 2, 3].map((idx) => {
                              const lines = (staticContent || '').split('\n');
                              const isLegacy = lines.length < 5;
                              const lineIndex = isLegacy ? idx : idx + 1;

                              const line = lines[lineIndex] || '';
                              const lineParts = line.split('|');
                              const title = lineParts[0] || '';
                              const desc = lineParts[1] || '';

                              const icons = [
                                <Heart size={14} key="heart" className="text-brand-teal" />,
                                <BookOpen size={14} key="book" className="text-brand-cyan" />,
                                <MessageSquare size={14} key="msg" className="text-blue-400" />
                              ];

                              return (
                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                                      {icons[(idx - 1) % icons.length]}
                                    </div>
                                    <span className="text-[10px] font-bold text-brand-green uppercase">문화 요목 #{idx}</span>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">항목 제목</label>
                                    <input
                                      type="text"
                                      value={title}
                                      onChange={(e) => {
                                        const currentLines = (staticContent || '').split('\n');
                                        const targetIndex = currentLines.length < 5 ? idx : idx + 1;
                                        
                                        while (currentLines.length <= targetIndex) {
                                          currentLines.push('');
                                        }

                                        const currentLineParts = currentLines[targetIndex].split('|');
                                        currentLineParts[0] = e.target.value;
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        currentLines[targetIndex] = currentLineParts.join('|');
                                        setStaticContent(currentLines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="항목 제목을 입력하세요."
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">설명</label>
                                    <textarea
                                      value={desc}
                                      onChange={(e) => {
                                        const currentLines = (staticContent || '').split('\n');
                                        const targetIndex = currentLines.length < 5 ? idx : idx + 1;
                                        
                                        while (currentLines.length <= targetIndex) {
                                          currentLines.push('');
                                        }

                                        const currentLineParts = currentLines[targetIndex].split('|');
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        currentLineParts[1] = e.target.value;
                                        currentLines[targetIndex] = currentLineParts.join('|');
                                        setStaticContent(currentLines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="항목 상세 설명 내용을 입력하세요."
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 다른 모든 정적 페이지 (사업영역, 연혁, CI, 공장및연구소, 찾아오시는길, IR 공시/재무, 연구소 소개/활동 제외) */}
                        {currentSubPath !== 'about/intro' && 
                         currentSubPath !== 'about/business-area' && 
                         currentSubPath !== 'about/history' && 
                         currentSubPath !== 'about/ci' && 
                         currentSubPath !== 'about/facilities' && 
                         currentSubPath !== 'about/location' &&
                         currentSubPath !== 'about/ir/announcement' &&
                         currentSubPath !== 'about/ir/financial' &&
                         currentSubPath !== 'rd/intro' &&
                         currentSubPath !== 'rd/activities' &&
                         currentSubPath !== 'business/finished/news' &&
                         currentSubPath !== 'business/api/raw' &&
                         currentSubPath !== 'business/api/intermediates' &&
                         currentSubPath !== 'business/cdmo/quality' &&
                         currentSubPath !== 'business/cdmo/advantages' &&
                         currentSubPath !== 'business/cdmo/logistics' &&
                         currentSubPath !== 'contact/careers/talent' &&
                         currentSubPath !== 'contact/careers/process' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">제목 (Title)</label>
                              <input
                                type="text"
                                value={staticContent.split('|')[0] || ''}
                                onChange={(e) => {
                                  const parts = staticContent.split('|');
                                  if (parts.length < 2) {
                                    parts.push('');
                                  }
                                  parts[0] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                                placeholder="제목을 입력하세요 (줄바꿈이 필요한 경우 \n 입력)."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">내용 (Content)</label>
                              <textarea
                                value={staticContent.split('|')[1] || ''}
                                onChange={(e) => {
                                  const parts = staticContent.split('|');
                                  if (parts.length < 2) {
                                    parts.unshift('');
                                  }
                                  parts[1] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-4 text-xs md:text-sm text-white placeholder-gray-500 min-h-[250px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                                placeholder="내용을 입력하세요."
                              />
                            </div>
                          </div>
                        )}

                        {/* CI 정적 페이지 */}
                        {currentSubPath === 'about/ci' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">CI 소개글 설명 (Intro)</label>
                              <textarea
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length <= 0) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[80px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="CI 소개 문구를 입력하세요."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">심볼마크의 의미</label>
                              <textarea
                                value={(staticContent || '').split('\n')[1] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length <= 1) lines.push('');
                                  lines[1] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[80px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="심볼마크의 의미 설명을 입력하세요."
                              />
                            </div>

                            {/* CI 로고 업로드 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-green uppercase">CI 로고 이미지 업로드</span>
                              <div className="flex items-center space-x-3">
                                <div className="bg-white rounded-lg p-2 flex items-center justify-center min-h-[50px] w-24 border border-white/10">
                                  <img
                                    src={(staticContent || '').split('\n')[10] || '/dasan_logo_raw.png'}
                                    alt="CI Logo Preview"
                                    className="object-contain max-h-[40px]"
                                  />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id="ci-logo-upload"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      setUploadingCiLogo(true);
                                      try {
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        const res = await fetch('/api/upload', {
                                          method: 'POST',
                                          body: formData
                                        });
                                        if (res.ok) {
                                          const data = await res.json();
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= 10) lines.push('');
                                          lines[10] = data.url;
                                          setStaticContent(lines.join('\n'));
                                        } else {
                                          alert('로고 업로드에 실패했습니다.');
                                        }
                                      } catch (err) {
                                        console.error('CI logo upload error:', err);
                                        alert('업로드 중 오류가 발생했습니다.');
                                      } finally {
                                        setUploadingCiLogo(false);
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor="ci-logo-upload"
                                    className="px-3 py-2 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg font-bold cursor-pointer transition-colors block text-center text-xs w-fit"
                                  >
                                    {uploadingCiLogo ? '업로드 중...' : '이미지 선택'}
                                  </label>
                                  <p className="text-[9px] text-gray-400">
                                    권장 크기: 가로 280px / 세로 80px (배경이 투명한 PNG 권장)
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Green Color System */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-green uppercase">DASAN GREEN 색상 설정</span>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">색상명</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[2] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 2) lines.push('');
                                      lines[2] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="DASAN GREEN"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">HEX 코드 (예: #008953)</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[4] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 4) lines.push('');
                                      lines[4] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="#008953"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 block">RGB 및 HEX 전체 표기 (예: RGB: 0, 137, 83 | HEX: #008953)</label>
                                <input
                                  type="text"
                                  value={(staticContent || '').split('\n')[3] || ''}
                                  onChange={(e) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 3) lines.push('');
                                    lines[3] = e.target.value;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="RGB: 0, 137, 83 | HEX: #008953"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 block">색상 설명</label>
                                <input
                                  type="text"
                                  value={(staticContent || '').split('\n')[5] || ''}
                                  onChange={(e) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 5) lines.push('');
                                    lines[5] = e.target.value;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="생명력, 인류의 건강, 지속가능한 경영 가치 상징"
                                />
                              </div>
                            </div>

                            {/* Charcoal Color System */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-green uppercase">DASAN CHARCOAL 색상 설정</span>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">색상명</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[6] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 6) lines.push('');
                                      lines[6] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="DASAN CHARCOAL"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">HEX 코드 (예: #2B2B2B)</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[8] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 8) lines.push('');
                                      lines[8] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="#2B2B2B"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 block">RGB 및 HEX 전체 표기 (예: RGB: 43, 43, 43 | HEX: #2B2B2B)</label>
                                <input
                                  type="text"
                                  value={(staticContent || '').split('\n')[7] || ''}
                                  onChange={(e) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 7) lines.push('');
                                    lines[7] = e.target.value;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="RGB: 43, 43, 43 | HEX: #2B2B2B"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 block">색상 설명</label>
                                <input
                                  type="text"
                                  value={(staticContent || '').split('\n')[9] || ''}
                                  onChange={(e) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 9) lines.push('');
                                    lines[9] = e.target.value;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="기술적인 전문성, 정직한 기업 경영과 신뢰성 상징"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 공장 및 연구소 정적 페이지 */}
                        {currentSubPath === 'about/facilities' && (
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">메인 소개글 설명</label>
                              <textarea
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length <= 0) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[80px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="소개 문구를 입력하세요."
                              />
                            </div>

                            {/* 수원 중앙연구소 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-blue uppercase">수원 중앙연구소 설정</span>
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">연구소 명칭</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[1] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 1) lines.push('');
                                      lines[1] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="수원 중앙연구소"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">소재지</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[2] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 2) lines.push('');
                                      lines[2] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="경기 수원시 영통구..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">주요 연구 분야</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[3] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 3) lines.push('');
                                      lines[3] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[60px]"
                                    placeholder="연구 분야에 대해 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">연구 인프라</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[4] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 4) lines.push('');
                                      lines[4] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[60px]"
                                    placeholder="연구 인프라 설비를 입력하세요."
                                  />
                                </div>
                              </div>
                            </div>

                            {/* 아산 제1공장 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-green uppercase">아산 제1공장 설정</span>
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">공장 명칭</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[5] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 5) lines.push('');
                                      lines[5] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="아산 제1공장"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">소재지</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[6] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 6) lines.push('');
                                      lines[6] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="충청남도 아산시 도고면..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">주요 생산 품목</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[7] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 7) lines.push('');
                                      lines[7] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="완제의약품..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">핵심 생산 설비</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[8] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 8) lines.push('');
                                      lines[8] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[60px]"
                                    placeholder="핵심 생산 설비 목록을 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">연간 생산 능력</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[9] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 9) lines.push('');
                                      lines[9] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="연간 최대 9억 정 규모 고형제 생산 라인"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* 아산 제2공장 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-cyan uppercase">아산 제2공장 설정</span>
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">공장 명칭</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[10] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 10) lines.push('');
                                      lines[10] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="아산 제2공장"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">소재지</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[11] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 11) lines.push('');
                                      lines[11] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="충청남도 아산시 도고면..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">주요 생산 기능</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[12] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 12) lines.push('');
                                      lines[12] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="의약품 포장 공정 자동화..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">핵심 생산 설비</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[13] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 13) lines.push('');
                                      lines[13] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[60px]"
                                    placeholder="핵심 생산 설비 목록을 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">친환경 스마트 설비</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[14] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 14) lines.push('');
                                      lines[14] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[60px]"
                                    placeholder="친환경 스마트 설비 목록을 입력하세요."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 찾아오시는 길 정적 페이지 */}
                        {currentSubPath === 'about/location' && (
                          <div className="space-y-6">
                            <span className="text-xs font-bold text-gray-400 block mb-2">
                              총 4개의 지점 정보를 관리합니다. 각 지점별로 상세한 정보를 정확히 입력해주세요.
                            </span>

                            {[0, 1, 2, 3].map((locIdx) => {
                              const offset = locIdx * 8;
                              const titleColor = locIdx === 0 ? 'text-brand-teal' : locIdx === 1 ? 'text-brand-blue' : locIdx === 2 ? 'text-brand-green' : 'text-brand-cyan';
                              const labelPrefix = locIdx === 0 ? '서울 본사' : locIdx === 1 ? '수원 R&D 중앙연구소' : locIdx === 2 ? '아산 제1공장' : '아산 제2공장';

                              return (
                                <div key={locIdx} className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-4">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span className={`text-xs font-bold uppercase ${titleColor}`}>{labelPrefix} 설정</span>
                                    <span className="text-[10px] text-gray-400">지점 #{locIdx + 1}</span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block font-semibold">지점 명칭 (예: 서울 본사)</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[offset] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= offset) lines.push('');
                                          lines[offset] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="지점 명칭 입력"
                                      />
                                    </div>

                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block font-semibold">부서/역할 설명 (예: 경영총괄, 해외 영업본부...)</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[offset + 1] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= offset + 1) lines.push('');
                                          lines[offset + 1] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="역할 설명 입력"
                                      />
                                    </div>

                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block font-semibold">위도, 경도 좌표 (예: 37.5186,126.8906)</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[offset + 2] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= offset + 2) lines.push('');
                                          lines[offset + 2] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="37.5186,126.8906"
                                      />
                                    </div>

                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block font-semibold">지도 마커 표시명 (예: 다산제약 서울 본사)</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[offset + 3] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= offset + 3) lines.push('');
                                          lines[offset + 3] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="지도 마커명 입력"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block font-semibold">도로명 주소</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[offset + 4] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= offset + 4) lines.push('');
                                          lines[offset + 4] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="도로명 주소 입력"
                                      />
                                    </div>

                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block font-semibold">대표 전화번호</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[offset + 5] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= offset + 5) lines.push('');
                                          lines[offset + 5] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="전화번호 입력"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block font-semibold">지하철 오시는 길 정보 (파이프 `|` 기호로 구분하여 여러 개 작성 가능)</label>
                                    <textarea
                                      value={(staticContent || '').split('\n')[offset + 6] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= offset + 6) lines.push('');
                                        lines[offset + 6] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[60px]"
                                      placeholder="예: 2호선 문래역 3번 출구 도보 8분|2/5호선 영등포구청역 6번 출구 도보 10분"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block font-semibold">버스 오시는 길 정보 (파이프 `|` 기호로 구분하여 여러 개 작성 가능)</label>
                                    <textarea
                                      value={(staticContent || '').split('\n')[offset + 7] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= offset + 7) lines.push('');
                                        lines[offset + 7] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[60px]"
                                      placeholder="예: 우리벤처타운 정류장 하차|지선 6625, 6640A번 / 마을 영등포05번"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 공시정보 정적 페이지 */}
                        {currentSubPath === 'about/ir/announcement' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">공시정보 타이틀</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('|')[0] || ''}
                                onChange={(e) => {
                                  const parts = (staticContent || '').split('|');
                                  while (parts.length < 3) parts.push('');
                                  parts[0] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="주주 중심 경영과 공정한 기업 가치 평가"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">설명 문구 (Description)</label>
                              <textarea
                                value={(staticContent || '').split('|')[1] || ''}
                                onChange={(e) => {
                                  const parts = (staticContent || '').split('|');
                                  while (parts.length < 3) parts.push('');
                                  parts[1] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[80px]"
                                placeholder="공시 관련 설명글 입력"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">DART 공시 Iframe 주소 (URL)</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('|')[2] || ''}
                                onChange={(e) => {
                                  const parts = (staticContent || '').split('|');
                                  while (parts.length < 3) parts.push('');
                                  parts[2] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="DART 공시 아이프레임 링크"
                              />
                            </div>
                          </div>
                        )}

                        {/* 재무정보 정적 페이지 */}
                        {currentSubPath === 'about/ir/financial' && (
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">재무정보 타이틀</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 6) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="주주 중심 경영과 공정한 기업 가치 평가"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">설명 문구 (Description)</label>
                              <textarea
                                value={(staticContent || '').split('\n')[1] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 6) lines.push('');
                                  lines[1] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[80px]"
                                placeholder="설명글 입력"
                              />
                            </div>

                            {/* Table Inputs Grid */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-cyan uppercase">재무제표 데이터 테이블 설정 (단위: 백만원)</span>
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left min-w-[500px]">
                                  <thead>
                                    <tr className="border-b border-white/10 text-gray-400">
                                      <th className="p-2 w-1/5">구분 항목</th>
                                      <th className="p-2 w-1/5">1차년도</th>
                                      <th className="p-2 w-1/5">2차년도</th>
                                      <th className="p-2 w-1/5">3차년도</th>
                                      <th className="p-2 w-1/5">4차년도 (목표)</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-white/5">
                                    {/* Headers Row */}
                                    <tr>
                                      <td className="p-2 font-bold text-white">연도/라벨</td>
                                      {[0, 1, 2, 3].map((colIdx) => {
                                        const headers = ((staticContent || '').split('\n')[2] || '').split('|');
                                        return (
                                          <td key={colIdx} className="p-1">
                                            <input
                                              type="text"
                                              value={headers[colIdx] || ''}
                                              onChange={(e) => {
                                                const lines = (staticContent || '').split('\n');
                                                while (lines.length < 6) lines.push('');
                                                const currentHeaders = (lines[2] || '').split('|');
                                                while (currentHeaders.length < 4) currentHeaders.push('');
                                                currentHeaders[colIdx] = e.target.value;
                                                lines[2] = currentHeaders.join('|');
                                                setStaticContent(lines.join('\n'));
                                              }}
                                              className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white text-center outline-none focus:border-brand-green"
                                              placeholder={`라벨 ${colIdx + 1}`}
                                            />
                                          </td>
                                        );
                                      })}
                                    </tr>
                                    {/* Rows for Sales, Profit, R&D */}
                                    {[3, 4, 5].map((rowIdx) => {
                                      const rowLabel = rowIdx === 3 ? '매출액' : rowIdx === 4 ? '영업이익' : 'R&D 투자액';
                                      return (
                                        <tr key={rowIdx}>
                                          <td className="p-2 font-bold text-brand-cyan">{rowLabel}</td>
                                          {[0, 1, 2, 3].map((colIdx) => {
                                            const lineParts = ((staticContent || '').split('\n')[rowIdx] || '').split('|');
                                            const value = lineParts[colIdx + 1] || '';
                                            return (
                                              <td key={colIdx} className="p-1">
                                                <input
                                                  type="text"
                                                  value={value}
                                                  onChange={(e) => {
                                                    const lines = (staticContent || '').split('\n');
                                                    while (lines.length < 6) lines.push('');
                                                    const currentParts = (lines[rowIdx] || '').split('|');
                                                    currentParts[0] = rowLabel;
                                                    while (currentParts.length < 5) currentParts.push('');
                                                    currentParts[colIdx + 1] = e.target.value;
                                                    lines[rowIdx] = currentParts.join('|');
                                                    setStaticContent(lines.join('\n'));
                                                  }}
                                                  className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white text-center outline-none focus:border-brand-green"
                                                  placeholder="금액"
                                                />
                                              </td>
                                            );
                                          })}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 연구소 소개 정적 페이지 */}
                        {currentSubPath === 'rd/intro' && (
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 6) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="수원 중앙연구소 - 혁신 신약의 메카"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">연구소 전체 소개 설명글</label>
                              <textarea
                                value={(staticContent || '').split('\n')[1] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 6) lines.push('');
                                  lines[1] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[80px]"
                                placeholder="소개글 입력"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* 합성 연구 파트 */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                <span className="text-[10px] font-bold text-brand-teal uppercase">파트 1 설정</span>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">파트 명칭</label>
                                    <input
                                      type="text"
                                      value={(staticContent || '').split('\n')[2] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 6) lines.push('');
                                        lines[2] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                      placeholder="합성 연구 파트"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">설명 및 연구 분야</label>
                                    <textarea
                                      value={(staticContent || '').split('\n')[3] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 6) lines.push('');
                                        lines[3] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                      placeholder="설명 입력"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* 제제 연구 파트 */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                <span className="text-[10px] font-bold text-brand-cyan uppercase">파트 2 설정</span>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">파트 명칭</label>
                                    <input
                                      type="text"
                                      value={(staticContent || '').split('\n')[4] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 6) lines.push('');
                                        lines[4] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                      placeholder="제제 연구 파트"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">설명 및 연구 분야</label>
                                    <textarea
                                      value={(staticContent || '').split('\n')[5] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 6) lines.push('');
                                        lines[5] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                      placeholder="설명 입력"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 연구 활동 정적 페이지 */}
                        {currentSubPath === 'rd/activities' && (
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">핵심 연구 성과 요약 소개글</label>
                              <textarea
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 5) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[80px]"
                                placeholder="소개글 입력"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* 기술 1 */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                <span className="text-[10px] font-bold text-brand-teal uppercase">핵심 기술 1 설정</span>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">기술 명칭</label>
                                    <input
                                      type="text"
                                      value={(staticContent || '').split('\n')[1] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 5) lines.push('');
                                        lines[1] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                      placeholder="DDS(약물전달시스템) 플랫폼 기술"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">기술 상세 설명</label>
                                    <textarea
                                      value={(staticContent || '').split('\n')[2] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 5) lines.push('');
                                        lines[2] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[80px]"
                                      placeholder="설명 입력"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* 기술 2 */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                <span className="text-[10px] font-bold text-brand-cyan uppercase">핵심 기술 2 설정</span>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">기술 명칭</label>
                                    <input
                                      type="text"
                                      value={(staticContent || '').split('\n')[3] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 5) lines.push('');
                                        lines[3] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                      placeholder="마이크로캡슐화 기술"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 block">기술 상세 설명</label>
                                    <textarea
                                      value={(staticContent || '').split('\n')[4] || ''}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length < 5) lines.push('');
                                        lines[4] = e.target.value;
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[80px]"
                                      placeholder="설명 입력"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 제품소식 정적 페이지 */}
                        {currentSubPath === 'business/finished/news' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">태그 (Tag)</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('|')[0] || ''}
                                onChange={(e) => {
                                  const parts = (staticContent || '').split('|');
                                  while (parts.length < 3) parts.push('');
                                  parts[0] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="태그를 입력하세요 (예: 신제품 출시)."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">제목 (Title)</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('|')[1] || ''}
                                onChange={(e) => {
                                  const parts = (staticContent || '').split('|');
                                  while (parts.length < 3) parts.push('');
                                  parts[1] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="제목을 입력하세요."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">상세 설명 (Description)</label>
                              <textarea
                                value={(staticContent || '').split('|')[2] || ''}
                                onChange={(e) => {
                                  const parts = (staticContent || '').split('|');
                                  while (parts.length < 3) parts.push('');
                                  parts[2] = e.target.value;
                                  setStaticContent(parts.join('|'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-4 text-xs md:text-sm text-white placeholder-gray-500 min-h-[150px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="상세 설명 내용을 입력하세요."
                              />
                            </div>
                          </div>
                        )}

                        {/* 원료의약품(API) / 중간체 정적 페이지 */}
                        {(currentSubPath === 'business/api/raw' || currentSubPath === 'business/api/intermediates') && (
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 설명 (Intro)</label>
                              <textarea
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 5) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[100px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="소개 문구를 입력하세요."
                              />
                            </div>

                            {/* Card 1 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-green uppercase">카드 1 설정</span>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">카드 제목</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[1] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 5) lines.push('');
                                      lines[1] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                    placeholder="카드 제목을 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">카드 상세 설명</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[2] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 5) lines.push('');
                                      lines[2] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[80px]"
                                    placeholder="카드 내용을 입력하세요."
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-green uppercase">카드 2 설정</span>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">카드 제목</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[3] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 5) lines.push('');
                                      lines[3] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                    placeholder="카드 제목을 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">카드 상세 설명</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[4] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 5) lines.push('');
                                      lines[4] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[80px]"
                                    placeholder="카드 내용을 입력하세요."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CDMO (서비스품질/특장점/물류) 정적 페이지 */}
                        {(currentSubPath === 'business/cdmo/quality' || 
                          currentSubPath === 'business/cdmo/advantages' || 
                          currentSubPath === 'business/cdmo/logistics') && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 block flex items-center space-x-1">
                                  <ShieldCheck size={14} className="text-brand-green" />
                                  <span>플랫폼 대제목 (Platform Title)</span>
                                </label>
                                <input
                                  type="text"
                                  value={(staticContent || '').split('\n')[0] || ''}
                                  onChange={(e) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length < 8) lines.push('');
                                    lines[0] = e.target.value;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="Dasan CDMO Advantage Platform"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 설명 (Intro)</label>
                              <textarea
                                value={(staticContent || '').split('\n')[1] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 8) lines.push('');
                                  lines[1] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[100px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="소개 문구를 입력하세요."
                              />
                            </div>

                            {/* Bullet 1 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-cyan uppercase flex items-center space-x-1">
                                <CheckCircle size={12} className="text-brand-cyan" />
                                <span>핵심 강점 1 설정</span>
                              </span>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">강점 제목</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[2] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 8) lines.push('');
                                      lines[2] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                    placeholder="강점 제목을 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">강점 상세 설명</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[3] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 8) lines.push('');
                                      lines[3] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                    placeholder="설명 입력"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Bullet 2 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-cyan uppercase flex items-center space-x-1">
                                <Layers size={12} className="text-brand-cyan" />
                                <span>핵심 강점 2 설정</span>
                              </span>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">강점 제목</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[4] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 8) lines.push('');
                                      lines[4] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                    placeholder="강점 제목을 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">강점 상세 설명</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[5] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 8) lines.push('');
                                      lines[5] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                    placeholder="설명 입력"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Bullet 3 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-cyan uppercase flex items-center space-x-1">
                                <Truck size={12} className="text-brand-cyan" />
                                <span>핵심 강점 3 설정</span>
                              </span>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">강점 제목</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[6] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 8) lines.push('');
                                      lines[6] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green"
                                    placeholder="강점 제목을 입력하세요."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 block">강점 상세 설명</label>
                                  <textarea
                                    value={(staticContent || '').split('\n')[7] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length < 8) lines.push('');
                                      lines[7] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                    placeholder="설명 입력"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 사업영역 정적 페이지 */}
                        {currentSubPath === 'about/business-area' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 설명 (Intro)</label>
                              <textarea
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[80px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="사업영역 메인 소개글을 입력하세요."
                              />
                            </div>
                            {[1, 2, 3].map((idx) => {
                              const line = (staticContent || '').split('\n')[idx] || '';
                              const lineParts = line.split('|');
                              const title = lineParts[0] || '';
                              const desc = lineParts[1] || '';
                              return (
                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                  <span className="text-[10px] font-bold text-brand-green uppercase">세부 사업 #{idx}</span>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">사업 제목</label>
                                    <input
                                      type="text"
                                      value={title}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        currentLineParts[0] = e.target.value;
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="사업명(예: 1. 원료의약품 개발 및 공급)을 입력하세요."
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] text-gray-400 block">사업 설명</label>
                                    <textarea
                                      value={desc}
                                      onChange={(e) => {
                                        const lines = (staticContent || '').split('\n');
                                        while (lines.length <= idx) lines.push('');
                                        const currentLineParts = lines[idx].split('|');
                                        if (currentLineParts.length < 2) currentLineParts.push('');
                                        currentLineParts[1] = e.target.value;
                                        lines[idx] = currentLineParts.join('|');
                                        setStaticContent(lines.join('\n'));
                                      }}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="상세 설명 내용을 입력하세요."
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 연혁 정적 페이지 */}
                        {currentSubPath === 'about/history' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 및 소개글</label>
                              <textarea
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="타이틀|소개글 (예: 도전과 신뢰의 역사|다산제약은...)"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">연혁 상세 데이터 (ERA 및 YEAR)</label>
                              <textarea
                                value={(staticContent || '').split('\n').slice(1).join('\n')}
                                onChange={(e) => {
                                  const intro = (staticContent || '').split('\n')[0] || '';
                                  setStaticContent(intro + '\n' + e.target.value);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs text-gray-300 placeholder-gray-500 min-h-[350px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-mono"
                                placeholder="ERA:시대명|서브타이틀&#10;YEAR:연도|내용1<br />내용2"
                              />
                              <p className="text-[10px] text-gray-400 mt-1">
                                <strong className="text-brand-green">ERA:2020 ~ Present|글로벌 도약과 기술 혁신</strong> 형식으로 시대를 구분하고,<br/>
                                <strong className="text-brand-green">YEAR:2025년|프리IPO 유치 성공&lt;br /&gt;코스닥 상장 채비 완료</strong> 형식으로 연도별 내용을 입력하세요.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* 인재상 정적 페이지 */}
                        {currentSubPath === 'contact/careers/talent' && (
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (Main Title)</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 8) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="도전, 혁신, 소통으로 미래를 여는 인재"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 설명 (Intro)</label>
                              <textarea
                                value={(staticContent || '').split('\n')[1] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 8) lines.push('');
                                  lines[1] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[80px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="인재상 메인 소개글을 입력하세요."
                              />
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-4">
                              <h4 className="text-xs font-bold text-brand-green">인재상 카드 설정 (3개 카드)</h4>
                              {[
                                { key: 'card1', label: '인재상 1 (전문적 도전)', titleIdx: 2, descIdx: 3 },
                                { key: 'card2', label: '인재상 2 (혁신 지향)', titleIdx: 4, descIdx: 5 },
                                { key: 'card3', label: '인재상 3 (신뢰와 협동)', titleIdx: 6, descIdx: 7 }
                              ].map((card) => {
                                return (
                                  <div key={card.key} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                    <span className="text-[10px] font-bold text-brand-teal uppercase">{card.label}</span>
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block">카드 제목</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[card.titleIdx] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= card.titleIdx) lines.push('');
                                          lines[card.titleIdx] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="제목 입력"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block">상세 설명</label>
                                      <textarea
                                        value={(staticContent || '').split('\n')[card.descIdx] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= card.descIdx) lines.push('');
                                          lines[card.descIdx] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="설명 입력"
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 채용절차 정적 페이지 */}
                        {currentSubPath === 'contact/careers/process' && (
                          <div className="space-y-6">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (Main Title)</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('\n')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 10) lines.push('');
                                  lines[0] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="채용 프로세스 안내"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 설명 (Intro)</label>
                              <textarea
                                value={(staticContent || '').split('\n')[1] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  while (lines.length < 10) lines.push('');
                                  lines[1] = e.target.value;
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[80px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="채용 프로세스 메인 소개글을 입력하세요."
                              />
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-4">
                              <h4 className="text-xs font-bold text-brand-green">채용 단계 설정 (4개 단계)</h4>
                              {[
                                { key: 'step1', label: 'STEP 1 (서류 전형)', titleIdx: 2, descIdx: 3 },
                                { key: 'step2', label: 'STEP 2 (1차 면접)', titleIdx: 4, descIdx: 5 },
                                { key: 'step3', label: 'STEP 3 (2차 면접)', titleIdx: 6, descIdx: 7 },
                                { key: 'step4', label: 'STEP 4 (최종 합격)', titleIdx: 8, descIdx: 9 }
                              ].map((step) => {
                                return (
                                  <div key={step.key} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                    <span className="text-[10px] font-bold text-brand-cyan uppercase">{step.label}</span>
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block">단계 명칭</label>
                                      <input
                                        type="text"
                                        value={(staticContent || '').split('\n')[step.titleIdx] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= step.titleIdx) lines.push('');
                                          lines[step.titleIdx] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="명칭 입력"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block">단계 설명</label>
                                      <textarea
                                        value={(staticContent || '').split('\n')[step.descIdx] || ''}
                                        onChange={(e) => {
                                          const lines = (staticContent || '').split('\n');
                                          while (lines.length <= step.descIdx) lines.push('');
                                          lines[step.descIdx] = e.target.value;
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                        placeholder="설명 입력"
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Live Preview Panel */}
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md space-y-4 text-white">
                      <h3 className="text-sm font-extrabold text-white pb-2 border-b border-white/10">실시간 미리보기</h3>
                      <div className="border border-dashed border-white/15 rounded-lg p-5 bg-white/[0.02] min-h-[300px]">
                        <h4 className="text-sm font-bold text-brand-green tracking-tight mb-4 flex items-center space-x-1.5">
                          <CheckCircle2 size={16} />
                          <span>미리보기 화면 (사용자 페이지 노출 예시)</span>
                        </h4>
                        
                        {currentSubPath === 'about/intro' && activeIntroTab === 'about/intro' ? (
                          <div className="space-y-4">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const title = parts[0] || '인류의 건강을 위한 혁신,다산제약';
                              const body = parts[1] || parts[0] || '(입력된 문구가 여기에 표시됩니다)';
                              return (
                                <>
                                  <h5 className="font-bold text-white text-xs mb-2 whitespace-pre-wrap">{title.replace(/\\n/g, '\n')}</h5>
                                  <p className="text-[11px] text-gray-400 leading-relaxed whitespace-pre-wrap">{body}</p>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/competencies' ? (
                          <div className="grid grid-cols-1 gap-4">
                            {(staticContent || '').split('\n').map((line, idx) => {
                              const parts = line.split('|');
                              if (!parts[0]) return null;
                              return (
                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                  <h5 className="font-bold text-brand-teal text-xs mb-1">{parts[0]}</h5>
                                  <p className="text-[11px] text-gray-400">{parts[1] || ''}</p>
                                </div>
                              );
                            })}
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/vision' ? (
                          <div className="space-y-4">
                            {(() => {
                              const lines = (staticContent || '').split('\n').filter(l => l.includes('|'));
                              const mParts = lines[0]?.split('|') || [];
                              const vParts = lines[1]?.split('|') || [];
                              return (
                                <>
                                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-[9px] font-bold text-brand-green uppercase block mb-1">Our Mission</span>
                                    <h5 className="font-bold text-white text-xs mb-1">{mParts[0] || ''}</h5>
                                    <p className="text-[11px] text-gray-400">{mParts[1] || ''}</p>
                                  </div>
                                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-[9px] font-bold text-brand-green uppercase block mb-1">Our Vision</span>
                                    <h5 className="font-bold text-white text-xs mb-1">{vParts[0] || ''}</h5>
                                    <p className="text-[11px] text-gray-400">{vParts[1] || ''}</p>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/values' ? (
                          <div className="grid grid-cols-2 gap-3">
                            {(staticContent || '').split('\n').map((line, idx) => {
                              const parts = line.split('|');
                              if (!parts[0]) return null;
                              return (
                                <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5">
                                  <div className="w-6 h-6 rounded bg-brand-green/20 text-brand-green flex items-center justify-center font-black text-xs mb-2">
                                    {parts[0].trim().charAt(0).toUpperCase()}
                                  </div>
                                  <h5 className="font-bold text-white text-[11px] mb-0.5">{parts[0]}</h5>
                                  <p className="text-[9px] text-brand-teal font-semibold mb-1">{parts[1] || ''}</p>
                                  <p className="text-[10px] text-gray-400 leading-normal">{parts[2] || ''}</p>
                                </div>
                              );
                            })}
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/philosophy' ? (
                          <div className="space-y-4">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const quote = lines[0] || '';
                              const pillars = lines.slice(1).filter(l => l.includes('|'));
                              return (
                                <>
                                  <div className="border-l-4 border-brand-green pl-3 py-1 bg-white/5 rounded-r">
                                    <p className="text-xs font-bold italic text-white">&quot;{quote}&quot;</p>
                                  </div>
                                  <div className="space-y-2">
                                    {pillars.map((p, idx) => {
                                      const parts = p.split('|');
                                      return (
                                        <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs">
                                          <h5 className="font-bold text-brand-teal mb-0.5">{idx + 1}. {parts[0]}</h5>
                                          <p className="text-[11px] text-gray-400">{parts[1] || ''}</p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/culture' ? (
                          <div className="space-y-4">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              let mainTitle = '다산인의 건강한 문화';
                              let subText = '';
                              const isLegacy = lines.length < 5;

                              if (isLegacy) {
                                subText = lines[0] || '';
                              } else {
                                mainTitle = lines[0] || '다산인의 건강한 문화';
                                subText = lines[1] || '';
                              }

                              const itemsLines = isLegacy ? lines.slice(1) : lines.slice(2);
                              const itemsParsed = itemsLines.map(line => {
                                const parts = line.split('|');
                                return { title: parts[0] || '', desc: parts[1] || '' };
                              }).filter(item => item.title);
                              
                              const previewItems = itemsParsed.length > 0 ? itemsParsed : [
                                { title: '유연하고 자율적인 몰입', desc: '시차출퇴근제 운영 및 자유로운 휴가 문화를 바탕으로 업무 효율성을 높이고 개개인의 소중한 라이프 스타일을 존중합니다.' },
                                { title: '배움과 성장의 기회', desc: '임직원의 성장을 위해 직무 교육, 전문 도서 구매, 국내외 유수 학회 및 박람회 참가를 전폭적으로 보장하고 격려합니다.' },
                                { title: '수평적 소통과 배려', desc: '직급과 부서를 초월하여 누구든 아이디어를 제안할 수 있는 타운홀 미팅과 상호 존중하는 피드백 문화를 지향합니다.' }
                              ];

                              return (
                                <>
                                  <div className="mb-4 bg-white/5 p-3 rounded-lg border border-white/5">
                                    <span className="text-[9px] font-bold text-brand-green uppercase block mb-1">Corporate Culture</span>
                                    <h5 className="font-bold text-white text-xs mb-1">{mainTitle}</h5>
                                    <p className="text-[11px] text-gray-400 leading-normal">{subText}</p>
                                  </div>
                                  <div className="grid grid-cols-1 gap-3">
                                    {previewItems.map((item, idx) => {
                                      const icons = [
                                        <Heart size={14} key="heart" />,
                                        <BookOpen size={14} key="book" />,
                                        <MessageSquare size={14} key="msg" />
                                      ];
                                      const bgs = [
                                        'bg-brand-teal/20 text-brand-teal border border-brand-teal/20',
                                        'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/20',
                                        'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                                      ];
                                      return (
                                        <div key={idx} className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-start space-x-3">
                                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bgs[idx % bgs.length]}`}>
                                            {icons[idx % icons.length]}
                                          </div>
                                          <div>
                                            <h6 className="font-bold text-white text-[11px] mb-1">{item.title}</h6>
                                            <p className="text-[10px] text-gray-455 leading-relaxed">{item.desc}</p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/business-area' ? (
                          <div className="space-y-4">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const intro = lines[0] || '(소개 문구가 여기에 표시됩니다)';
                              const itemsParsed = lines.slice(1).map(line => {
                                const parts = line.split('|');
                                return { title: parts[0] || '', desc: parts[1] || '' };
                              }).filter(item => item.title);

                              const previewItems = itemsParsed.length > 0 ? itemsParsed : [
                                { title: '1. 원료의약품(API) 개발 및 공급', desc: '고난도 유기합성 기술을 기반으로 자체 원료 합성 연구소를 구축하여 고품질의 API를 전 세계 시장에 직접 유통하며 중간체 정밀 화학 사업도 전개합니다.' },
                                { title: '2. 완제의약품 생산 및 판매', desc: '순환기계(혈압, 고지혈증), 대사계(당뇨), 소화기계 및 일반의약품(OTC)에 이르는 폭넓은 스펙트럼의 고부가가치 완제의약품 파이프라인을 공급합니다.' },
                                { title: '3. CDMO (위탁 개발 및 생산)', desc: '마이크로캡슐화, 서방성 제형 특화 플랫폼 등 자사 고유의 DDS(약물전달시스템) 기술을 결합하여 복합제 개발 및 차별화 완제의약품의 수탁 개발/생산 서비스를 제공합니다.' }
                              ];

                              return (
                                <>
                                  <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap mb-3">{intro}</p>
                                  <div className="space-y-3">
                                    {previewItems.map((item, idx) => (
                                      <div key={idx} className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                                        <h5 className="font-bold text-white text-xs mb-1">{item.title}</h5>
                                        <p className="text-[10px] text-gray-455 leading-relaxed">{item.desc}</p>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/ci' ? (
                          <div className="space-y-6">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const ciIntro = lines[0] || '다산제약의 CI는...';
                              const ciSymbol = lines[1] || '다산제약의 심볼은 과학과 생명의...';
                              const greenName = lines[2] || 'DASAN GREEN';
                              const greenCode = lines[3] || 'RGB: 0, 137, 83 | HEX: #008953';
                              const greenHex = lines[4] || '#008953';
                              const greenDesc = lines[5] || '생명력, 인류의 건강, 지속가능한 경영 가치 상징';
                              const charcoalName = lines[6] || 'DASAN CHARCOAL';
                              const charcoalCode = lines[7] || 'RGB: 43, 43, 43 | HEX: #2B2B2B';
                              const charcoalHex = lines[8] || '#2B2B2B';
                              const charcoalDesc = lines[9] || '기술적인 전문성, 정직한 기업 경영과 신뢰성 상징';

                              return (
                                <div className="space-y-6 text-xs text-gray-300">
                                  <p className="leading-relaxed font-medium text-gray-200">
                                    {ciIntro}
                                  </p>

                                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center space-y-4">
                                    <div className="relative bg-white rounded-lg p-4 flex items-center justify-center min-h-[100px] w-full max-w-xs">
                                      <img
                                        src={lines[10] || '/dasan_logo_raw.png'}
                                        alt="Dasan Corporate Identity Logo"
                                        className="object-contain max-h-[60px]"
                                      />
                                    </div>
                                    <span className="text-[10px] text-gray-400">CI 로고 다운로드 (PNG)</span>
                                  </div>

                                  <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                      <h5 className="font-bold text-brand-green text-xs mb-1">심볼마크의 의미</h5>
                                      <p className="leading-relaxed">{ciSymbol}</p>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                                      <h5 className="font-bold text-brand-green text-xs mb-1">전용 색상 (Color System)</h5>
                                      <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                          <div 
                                            className="w-10 h-10 rounded-xl border border-white/10 shadow-inner flex-shrink-0"
                                            style={{ backgroundColor: greenHex }}
                                          />
                                          <div>
                                            <span className="font-bold text-xs text-white block">{greenName}</span>
                                            <span className="text-[9px] text-gray-400 font-mono block">{greenCode}</span>
                                            <span className="text-[10px] text-gray-300 mt-0.5 block">{greenDesc}</span>
                                          </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                          <div 
                                            className="w-10 h-10 rounded-xl border border-white/10 shadow-inner flex-shrink-0"
                                            style={{ backgroundColor: charcoalHex }}
                                          />
                                          <div>
                                            <span className="font-bold text-xs text-white block">{charcoalName}</span>
                                            <span className="text-[9px] text-gray-400 font-mono block">{charcoalCode}</span>
                                            <span className="text-[10px] text-gray-300 mt-0.5 block">{charcoalDesc}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/facilities' ? (
                          <div className="space-y-6 text-xs text-gray-300">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const facIntro = lines[0] || '다산제약은 고난도 제형 연구를 선도하는...';
                              
                              const resName = lines[1] || '수원 중앙연구소';
                              const resLoc = lines[2] || '';
                              const resField = lines[3] || '';
                              const resInfra = lines[4] || '';

                              const f1Name = lines[5] || '아산 제1공장';
                              const f1Loc = lines[6] || '';
                              const f1Item = lines[7] || '';
                              const f1Facility = lines[8] || '';
                              const f1Capacity = lines[9] || '';

                              const f2Name = lines[10] || '아산 제2공장';
                              const f2Loc = lines[11] || '';
                              const f2Function = lines[12] || '';
                              const f2Facility = lines[13] || '';
                              const f2Green = lines[14] || '';

                              return (
                                <div className="space-y-4">
                                  <p className="leading-relaxed font-medium text-gray-200">
                                    {facIntro}
                                  </p>

                                  <div className="grid grid-cols-1 gap-4">
                                    {/* 수원 중앙연구소 */}
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                                      <h5 className="font-bold text-brand-teal text-xs border-b border-white/10 pb-1.5">{resName}</h5>
                                      <div className="space-y-2 text-[11px]">
                                        <div>
                                          <span className="text-gray-400 block">소재지</span>
                                          <p className="text-white font-semibold">{resLoc}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">주요 연구 분야</span>
                                          <p className="text-white font-semibold">{resField}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">연구 인프라</span>
                                          <p className="text-white font-semibold">{resInfra}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 아산 제1공장 */}
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                                      <h5 className="font-bold text-brand-green text-xs border-b border-white/10 pb-1.5">{f1Name}</h5>
                                      <div className="space-y-2 text-[11px]">
                                        <div>
                                          <span className="text-gray-400 block">소재지</span>
                                          <p className="text-white font-semibold">{f1Loc}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">주요 생산 품목</span>
                                          <p className="text-white font-semibold">{f1Item}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">핵심 생산 설비</span>
                                          <p className="text-white font-semibold">{f1Facility}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">연간 생산 능력</span>
                                          <p className="text-white font-semibold">{f1Capacity}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 아산 제2공장 */}
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                                      <h5 className="font-bold text-brand-cyan text-xs border-b border-white/10 pb-1.5">{f2Name}</h5>
                                      <div className="space-y-2 text-[11px]">
                                        <div>
                                          <span className="text-gray-400 block">소재지</span>
                                          <p className="text-white font-semibold">{f2Loc}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">주요 생산 기능</span>
                                          <p className="text-white font-semibold">{f2Function}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">핵심 생산 설비</span>
                                          <p className="text-white font-semibold">{f2Facility}</p>
                                        </div>
                                        <div>
                                          <span className="text-gray-400 block">친환경 스마트 설비</span>
                                          <p className="text-white font-semibold">{f2Green}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/location' ? (
                          <div className="space-y-6 text-xs text-gray-300">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const locations = [];
                              for (let i = 0; i < 4; i++) {
                                const offset = i * 8;
                                const locName = lines[offset] || '';
                                if (!locName) continue;
                                
                                locations.push({
                                  name: locName,
                                  subName: lines[offset + 1] || '',
                                  coordinates: lines[offset + 2] || '',
                                  placeName: lines[offset + 3] || '',
                                  address: lines[offset + 4] || '',
                                  phone: lines[offset + 5] || '',
                                  subways: (lines[offset + 6] || '').split('|').filter(Boolean),
                                  buses: (lines[offset + 7] || '').split('|').filter(Boolean),
                                });
                              }

                              return (
                                <div className="space-y-4">
                                  {locations.map((loc, idx) => (
                                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                                      <div className="border-b border-white/10 pb-1.5 flex items-center justify-between">
                                        <h5 className="font-bold text-brand-green text-xs">{loc.name}</h5>
                                        <span className="text-[10px] text-gray-400 font-medium">{loc.subName}</span>
                                      </div>
                                      <div className="space-y-2 text-[11px]">
                                        <div>
                                          <span className="text-gray-400 block">주소</span>
                                          <p className="text-white font-semibold">{loc.address}</p>
                                        </div>
                                        {loc.phone && (
                                          <div>
                                            <span className="text-gray-400 block">전화번호</span>
                                            <p className="text-white font-semibold">{loc.phone}</p>
                                          </div>
                                        )}
                                        {loc.coordinates && (
                                          <div>
                                            <span className="text-gray-400 block">좌표 및 지도 표시명</span>
                                            <p className="text-white font-mono">{loc.coordinates} ({loc.placeName})</p>
                                          </div>
                                        )}
                                        {loc.subways.length > 0 && (
                                          <div>
                                            <span className="text-gray-400 block">지하철 정보</span>
                                            <ul className="list-disc pl-4 text-white">
                                              {loc.subways.map((sub, sIdx) => <li key={sIdx}>{sub}</li>)}
                                            </ul>
                                          </div>
                                        )}
                                        {loc.buses.length > 0 && (
                                          <div>
                                            <span className="text-gray-400 block">버스 정보</span>
                                            <ul className="list-disc pl-4 text-white">
                                              {loc.buses.map((bus, bIdx) => <li key={bIdx}>{bus}</li>)}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                        ) : (currentSubPath === 'about/esg/ethics' || currentSubPath === 'about/esg/environment' || currentSubPath === 'about/esg/safety') ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const title = parts[0] || '지속 가능한 비즈니스를 위한 ESG 선언';
                              const body = parts[1] || parts[0] || '(입력된 문구가 여기에 표시됩니다)';
                              return (
                                <>
                                  <div className="flex items-center space-x-3 text-emerald-600 border-b border-gray-100 pb-2">
                                    <Heart size={20} className="text-emerald-600 flex-shrink-0" />
                                    <h4 className="text-sm font-bold">{title}</h4>
                                  </div>
                                  <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap">{body}</p>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/ir/announcement' ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const title = parts[0] || '주주 중심 경영과 공정한 기업 가치 평가';
                              const desc = parts[1] || '설명글이 여기에 들어갑니다.';
                              const url = parts[2] || '';
                              return (
                                <>
                                  <div className="flex items-center space-x-3 text-brand-cyan border-b border-gray-100 pb-2">
                                    <LineChart size={20} className="text-brand-cyan flex-shrink-0" />
                                    <h4 className="text-sm font-bold">{title}</h4>
                                  </div>
                                  <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap">{desc}</p>
                                  <div className="border border-gray-200 rounded-lg p-2 text-[10px] bg-gray-50 text-gray-500 text-center font-mono">
                                    DART Iframe: {url || '(URL 미지정)'}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/ir/financial' ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const title = lines[0] || '주주 중심 경영과 공정한 기업 가치 평가';
                              const desc = lines[1] || '설명글이 여기에 들어갑니다.';
                              const headers = (lines[2] || '').split('|');
                              const sales = (lines[3] || '').split('|');
                              const profit = (lines[4] || '').split('|');
                              const rd = (lines[5] || '').split('|');
                              return (
                                <>
                                  <div className="flex items-center space-x-3 text-brand-cyan border-b border-gray-100 pb-2">
                                    <LineChart size={20} className="text-brand-cyan flex-shrink-0" />
                                    <h4 className="text-sm font-bold">{title}</h4>
                                  </div>
                                  <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap">{desc}</p>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-[10px] text-left">
                                      <thead className="bg-brand-gray-light text-brand-blue uppercase">
                                        <tr>
                                          <th className="p-2 border-b border-gray-200">구분 항목</th>
                                          {headers.map((h, i) => (
                                            <th key={i} className="p-2 border-b border-gray-200">{h}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-100 text-gray-600">
                                        <tr>
                                          <td className="p-2 font-semibold text-brand-blue">{sales[0] || '매출액'}</td>
                                          <td className="p-2">{sales[1] || ''}</td>
                                          <td className="p-2">{sales[2] || ''}</td>
                                          <td className="p-2">{sales[3] || ''}</td>
                                          <td className="p-2">{sales[4] || ''}</td>
                                        </tr>
                                        <tr>
                                          <td className="p-2 font-semibold text-brand-blue">{profit[0] || '영업이익'}</td>
                                          <td className="p-2">{profit[1] || ''}</td>
                                          <td className="p-2">{profit[2] || ''}</td>
                                          <td className="p-2">{profit[3] || ''}</td>
                                          <td className="p-2">{profit[4] || ''}</td>
                                        </tr>
                                        <tr>
                                          <td className="p-2 font-semibold text-brand-blue">{rd[0] || 'R&D 투자액'}</td>
                                          <td className="p-2">{rd[1] || ''}</td>
                                          <td className="p-2">{rd[2] || ''}</td>
                                          <td className="p-2">{rd[3] || ''}</td>
                                          <td className="p-2">{rd[4] || ''}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'rd/intro' ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const title = lines[0] || '수원 중앙연구소 - 혁신 신약의 메카';
                              const desc = lines[1] || '설명글이 여기에 들어갑니다.';
                              const part1Name = lines[2] || '합성 연구 파트';
                              const part1Desc = lines[3] || '';
                              const part2Name = lines[4] || '제제 연구 파트';
                              const part2Desc = lines[5] || '';
                              return (
                                <>
                                  <div className="border-b border-gray-100 pb-2">
                                    <h4 className="text-sm font-bold text-brand-blue">{title}</h4>
                                    <p className="text-[10px] text-gray-500 leading-relaxed mt-1 whitespace-pre-wrap">{desc}</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                      <h5 className="font-bold text-xs text-brand-blue">{part1Name}</h5>
                                      <p className="text-[10px] text-gray-500 mt-1 whitespace-pre-wrap">{part1Desc}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                      <h5 className="font-bold text-xs text-brand-blue">{part2Name}</h5>
                                      <p className="text-[10px] text-gray-500 mt-1 whitespace-pre-wrap">{part2Desc}</p>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'rd/activities' ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const desc = lines[0] || '설명글이 여기에 들어갑니다.';
                              const tech1Name = lines[1] || 'DDS 플랫폼 기술';
                              const tech1Desc = lines[2] || '';
                              const tech2Name = lines[3] || '마이크로캡슐화 기술';
                              const tech2Desc = lines[4] || '';
                              return (
                                <>
                                  <p className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-wrap border-b border-gray-100 pb-2">{desc}</p>
                                  <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start space-x-2">
                                      <span className="p-1 bg-brand-teal/10 rounded text-brand-teal text-[10px] font-bold">DDS</span>
                                      <div>
                                        <h5 className="font-bold text-xs text-brand-blue">{tech1Name}</h5>
                                        <p className="text-[9px] text-gray-500 mt-0.5 whitespace-pre-wrap">{tech1Desc}</p>
                                      </div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start space-x-2">
                                      <span className="p-1 bg-brand-cyan/10 rounded text-brand-cyan text-[10px] font-bold">CAP</span>
                                      <div>
                                        <h5 className="font-bold text-xs text-brand-blue">{tech2Name}</h5>
                                        <p className="text-[9px] text-gray-500 mt-0.5 whitespace-pre-wrap">{tech2Desc}</p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'business/finished/news' ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const tag = parts[0] || '신제품 출시';
                              const title = parts[1] || "복합 고혈압 개량신약 '피마사탄/암로디핀' 출시 승인";
                              const desc = parts[2] || '자체 DDS 특허 서방성 과립 코팅 기술을 사용해 환자의 복용 크기를 축소시킨 고혈압 치료제 판매가 시작되었습니다.';
                              return (
                                <div className="space-y-6">
                                  <div className="p-6 rounded-xl bg-gray-50 space-y-2 border border-gray-100">
                                    <span className="text-[10px] bg-teal-50 text-teal-600 border border-teal-200/50 px-2 py-0.5 rounded font-bold uppercase">{tag}</span>
                                    <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
                                    <p className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed">{desc}</p>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (currentSubPath === 'business/api/raw' || currentSubPath === 'business/api/intermediates') ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const desc = lines[0] || '다산제약은 높은 순도와 엄격한 결정 형태 조절 기술을 통해 국내외 유수 제약사들에 고부가가치 원료의약품(API)을 공급하고 있습니다.';
                              const card1Title = lines[1] || '주요 API 파이프라인';
                              const card1Desc = lines[2] || 'Fimasartan, Dapagliflozin, Sitagliptin, Metformin 고순도 활성 성분을 직접 합성하여 연간 수십 톤 규모로 납품 가능합니다.';
                              const card2Title = lines[3] || '중간체 정밀 유기합성';
                              const card2Desc = lines[4] || '원료의 전구체 단계를 고효율 반응 공정으로 연구 및 위탁 생산하여 원가 절감과 대량 수급 안정성을 제공합니다.';
                              return (
                                <div className="space-y-6">
                                  <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap border-b border-gray-100 pb-3">
                                    {desc}
                                  </p>
                                  <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                                      <h5 className="font-bold text-gray-900 text-xs">{card1Title}</h5>
                                      <p className="text-[11px] text-gray-500 leading-normal whitespace-pre-wrap">{card1Desc}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                                      <h5 className="font-bold text-gray-900 text-xs">{card2Title}</h5>
                                      <p className="text-[11px] text-gray-500 leading-normal whitespace-pre-wrap">{card2Desc}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (currentSubPath === 'business/cdmo/quality' || 
                             currentSubPath === 'business/cdmo/advantages' || 
                             currentSubPath === 'business/cdmo/logistics') ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const platformTitle = lines[0] || 'Dasan CDMO Advantage Platform';
                              const intro = lines[1] || '다산제약은 단순 위탁 생산(CMO)의 단계를 넘어 약물의 제제 개발부터 임상 배치 생산...';
                              const bullet1Title = lines[2] || '우수한 품질관리(QA/QC)';
                              const bullet1Desc = lines[3] || '한국 식약처 KGMP 인증 보유 및 cGMP 기준 분석 장비와 데이터 무결성 지침 철저 운영.';
                              const bullet2Title = lines[4] || '특화된 과립 코팅 기술';
                              const bullet2Desc = lines[5] || '입자가 미세한 API의 용출 속도를 제어하는 유동층 과립기 및 정밀 정제 타정 공정 장치 다수 운영.';
                              const bullet3Title = lines[6] || '글로벌 콜드체인 물류';
                              const bullet3Desc = lines[7] || '생물학적 활성을 보존해야 하는 원료 및 중간체의 완벽한 보관 온습도 관리를 통한 글로벌 항공/해상 물류망 확보.';
                              return (
                                <div className="space-y-4">
                                  <h4 className="text-sm font-bold text-gray-900 flex items-center space-x-2 border-b border-gray-100 pb-2">
                                    <ShieldCheck size={18} className="text-teal-600 flex-shrink-0" />
                                    <span>{platformTitle}</span>
                                  </h4>
                                  <p className="text-xs text-gray-650 leading-relaxed whitespace-pre-wrap">
                                    {intro}
                                  </p>
                                  <div className="space-y-2.5 pt-1.5">
                                    <div className="flex items-start space-x-2.5 text-[11px] text-gray-500">
                                      <CheckCircle size={14} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                                      <p><strong className="text-gray-950 font-bold">{bullet1Title}</strong>: {bullet1Desc}</p>
                                    </div>
                                    <div className="flex items-start space-x-2.5 text-[11px] text-gray-500">
                                      <Layers size={14} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                                      <p><strong className="text-gray-950 font-bold">{bullet2Title}</strong>: {bullet2Desc}</p>
                                    </div>
                                    <div className="flex items-start space-x-2.5 text-[11px] text-gray-500">
                                      <Truck size={14} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                                      <p><strong className="text-gray-950 font-bold">{bullet3Title}</strong>: {bullet3Desc}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'contact/careers/talent' ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-6 shadow-sm border border-gray-150 text-left">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const mainTitle = lines[0] || '도전, 혁신, 소통으로 미래를 여는 인재';
                              const intro = lines[1] || '다산제약은 최고의 전문성을 지향하며, 변화에 도전하고 상호 신뢰와 소통을 바탕으로 새로운 성장과 발전을 주도해 나가는 성실한 주역을 기다립니다.';
                              const card1Title = lines[2] || '전문적 도전';
                              const card1Desc = lines[3] || '자기 분야 최고의 전문 지식을 고도화하며 타협하지 않는 열정으로 문제 해결에 도전.';
                              const card2Title = lines[4] || '혁신 지향';
                              const card2Desc = lines[5] || '기존 관행을 뛰어넘는 창의적인 사고로 신기술 및 프로세스 효율화 혁신 구현.';
                              const card3Title = lines[6] || '신뢰와 협동';
                              const card3Desc = lines[7] || '정직과 도덕적 의무를 철저히 지키며 동료 및 파트너와의 수평적 소통을 지향.';
                              return (
                                <div className="space-y-6">
                                  <div className="border-b border-gray-100 pb-3 text-center md:text-left">
                                    <h4 className="text-sm md:text-base font-black text-brand-blue mb-1 whitespace-pre-wrap">{mainTitle}</h4>
                                    <p className="text-[11px] text-gray-500 max-w-2xl leading-relaxed whitespace-pre-wrap">
                                      {intro}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-white rounded-xl border border-gray-150 space-y-2">
                                      <div className="w-8 h-8 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal mx-auto">
                                        <CheckCircle2 size={16} />
                                      </div>
                                      <h5 className="font-extrabold text-brand-blue text-xs whitespace-pre-wrap">{card1Title}</h5>
                                      <p className="text-[10px] text-gray-500 leading-normal font-semibold whitespace-pre-wrap">
                                        {card1Desc}
                                      </p>
                                    </div>
                                    <div className="p-4 bg-white rounded-xl border border-gray-150 space-y-2">
                                      <div className="w-8 h-8 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan mx-auto">
                                        <CheckCircle2 size={16} />
                                      </div>
                                      <h5 className="font-extrabold text-brand-blue text-xs whitespace-pre-wrap">{card2Title}</h5>
                                      <p className="text-[10px] text-gray-500 leading-normal font-semibold whitespace-pre-wrap">
                                        {card2Desc}
                                      </p>
                                    </div>
                                    <div className="p-4 bg-white rounded-xl border border-gray-150 space-y-2">
                                      <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto">
                                        <CheckCircle2 size={16} />
                                      </div>
                                      <h5 className="font-extrabold text-brand-blue text-xs whitespace-pre-wrap">{card3Title}</h5>
                                      <p className="text-[10px] text-gray-500 leading-normal font-semibold whitespace-pre-wrap">
                                        {card3Desc}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'contact/careers/process' ? (
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-6 shadow-sm border border-gray-150 text-left">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const mainTitle = lines[0] || '채용 프로세스 안내';
                              const intro = lines[1] || '다산제약은 지원자 한 분 한 분의 소중한 서류와 인성을 세밀히 검토하고 있습니다.';
                              const step1Title = lines[2] || '서류 전형';
                              const step1Desc = lines[3] || '기본 요건 검토';
                              const step2Title = lines[4] || '1차 실무 면접';
                              const step2Desc = lines[5] || '직무 적합성 및 역량';
                              const step3Title = lines[6] || '2차 임원 면접';
                              const step3Desc = lines[7] || '인성 및 미래 가치 평가';
                              const step4Title = lines[8] || '최종 합격';
                              const step4Desc = lines[9] || '입사 계약 조율';
                              return (
                                <div className="space-y-6">
                                  <div className="border-b border-gray-100 pb-3">
                                    <h4 className="font-black text-brand-blue text-sm md:text-base mb-1 whitespace-pre-wrap">{mainTitle}</h4>
                                    <p className="text-gray-500 text-[11px] whitespace-pre-wrap">{intro}</p>
                                  </div>
                                  <div className="flex flex-col gap-4 text-center">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                      <div className="p-3 bg-white rounded-xl border border-gray-150">
                                        <span className="font-black text-brand-teal text-[10px] block mb-1">STEP 1</span>
                                        <p className="font-extrabold text-brand-blue text-xs whitespace-pre-wrap">{step1Title}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 font-medium whitespace-pre-wrap">{step1Desc}</p>
                                      </div>
                                      <div className="p-3 bg-white rounded-xl border border-gray-150">
                                        <span className="font-black text-brand-cyan text-[10px] block mb-1">STEP 2</span>
                                        <p className="font-extrabold text-brand-blue text-xs whitespace-pre-wrap">{step2Title}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 font-medium whitespace-pre-wrap">{step2Desc}</p>
                                      </div>
                                      <div className="p-3 bg-white rounded-xl border border-gray-150">
                                        <span className="font-black text-brand-blue text-[10px] block mb-1">STEP 3</span>
                                        <p className="font-extrabold text-brand-blue text-xs whitespace-pre-wrap">{step3Title}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 font-medium whitespace-pre-wrap">{step3Desc}</p>
                                      </div>
                                      <div className="p-3 bg-white rounded-xl border border-gray-150">
                                        <span className="font-black text-emerald-600 text-[10px] block mb-1">STEP 4</span>
                                        <p className="font-extrabold text-emerald-800 text-xs whitespace-pre-wrap">{step4Title}</p>
                                        <p className="text-[10px] text-emerald-700 mt-1 font-medium whitespace-pre-wrap">{step4Desc}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const title = parts[0] || '';
                              const body = parts[1] || parts[0] || '(입력된 문구가 여기에 표시됩니다)';
                              
                              if (parts.length >= 2) {
                                return (
                                  <>
                                    <h5 className="font-bold text-white text-xs mb-2 whitespace-pre-wrap">{title.replace(/\\n/g, '\n')}</h5>
                                    <p className="text-[11px] text-gray-400 leading-relaxed whitespace-pre-wrap">{body}</p>
                                  </>
                                );
                              }
                              return (
                                <p className="text-xs md:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                  {body}
                                </p>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Case F: SEO Settings CMS Editor */}
              {currentSubPath === 'seo-settings' && (
                <div className="space-y-6 animate-fade-in-up">
                  {/* Sub-tabs for SEO pages */}
                  <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
                    {[
                      { key: 'seo/main', label: '메인페이지 SEO' },
                      { key: 'seo/about', label: 'Company SEO' },
                      { key: 'seo/business', label: 'Business SEO' },
                      { key: 'seo/rd', label: 'Innovation SEO' },
                      { key: 'seo/contact', label: 'Connect SEO' }
                    ].map(tab => {
                      const isActive = activeSeoTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => {
                            setActiveSeoTab(tab.key);
                            setActiveSeoSubpage(tab.key);
                            fetchStaticContent(tab.key);
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-brand-green text-white shadow-sm'
                              : 'bg-white text-gray-550 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Subpages Selector for Detailed SEO */}
                  {activeSeoTab !== 'seo/main' && seoSubpages[activeSeoTab] && (
                    <div className="flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl">
                      {seoSubpages[activeSeoTab].map(sub => {
                        const isSubActive = activeSeoSubpage === sub.key;
                        return (
                          <button
                            key={sub.key}
                            onClick={() => {
                              setActiveSeoSubpage(sub.key);
                              fetchStaticContent(sub.key);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer ${
                              isSubActive
                                ? 'bg-brand-green text-white shadow-md shadow-brand-green/15'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Content Editor Form */}
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-150">
                        <h3 className="text-sm font-extrabold text-white">
                          SEO 설정 수정
                        </h3>
                        {currentUser?.role !== 'viewer' && (
                          <button
                            onClick={saveStaticContent}
                            disabled={savingStatic}
                            className="inline-flex items-center space-x-1 bg-brand-green hover:bg-brand-green-dark text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10 cursor-pointer disabled:opacity-50"
                          >
                            <Save size={14} />
                            <span>저장하기</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-400 block">SEO 타이틀 (Title)</label>
                          <input
                            type="text"
                            value={staticContent.split('|')[0] || ''}
                            onChange={(e) => {
                              const parts = staticContent.split('|');
                              parts[0] = e.target.value;
                              setStaticContent(parts.join('|'));
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                            placeholder="페이지 타이틀을 입력하세요."
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-400 block">SEO 키워드 (Keywords)</label>
                          <input
                            type="text"
                            value={staticContent.split('|')[1] || ''}
                            onChange={(e) => {
                              const parts = staticContent.split('|');
                              parts[1] = e.target.value;
                              setStaticContent(parts.join('|'));
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                            placeholder="키워드를 쉼표(,)로 구분하여 입력하세요."
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-400 block">SEO 설명 (Description)</label>
                          <textarea
                            value={staticContent.split('|')[2] || ''}
                            onChange={(e) => {
                              const parts = staticContent.split('|');
                              parts[2] = e.target.value;
                              setStaticContent(parts.join('|'));
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[120px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                            placeholder="검색엔진 노출을 위한 설명문구를 입력하세요."
                          />
                        </div>

                        {/* Menu Show/Hide Toggler Option */}
                        {activeSeoSubpage !== 'seo/main' && (
                          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-[11px] font-bold text-gray-400 block">메뉴 노출 설정</span>
                              <span className="text-[9px] text-gray-500 block">이 메뉴를 사용자 페이지(GNB/LNB)에서 보이지 않게 합니다.</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={isHidden}
                                onChange={(e) => setIsHidden(e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                              <span className="ml-3 text-[11px] font-extrabold text-white">
                                {isHidden ? '숨김 처리됨' : '정상 노출'}
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Live Preview Panel */}
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
                      <h3 className="text-sm font-extrabold text-white pb-2 border-b border-white/10">SEO 검색엔진 미리보기</h3>
                      <div className="border border-dashed border-white/15 rounded-2xl p-5 bg-white/[0.01] min-h-[300px] flex items-center justify-center">
                        <div className="bg-[#0d1527] border border-white/10 rounded-2xl p-5 shadow-2xl max-w-md w-full space-y-2 text-left relative overflow-hidden">
                          <span className="text-[10px] text-gray-400 block font-semibold">Google 검색결과 예시</span>
                          <h4 className="text-blue-400 hover:underline font-bold text-base md:text-lg cursor-pointer leading-tight truncate">
                            {staticContent.split('|')[0] || '페이지 타이틀'}
                          </h4>
                          <span className="text-brand-green text-[10px] block truncate font-mono">
                            https://www.dasanpharm.com{activeSeoSubpage === 'seo/main' ? '' : `/${activeSeoSubpage.replace('seo/', '')}`}
                          </span>
                          <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                            {staticContent.split('|')[2] || '검색엔진 노출을 위한 설명문구가 여기에 표시됩니다.'}
                          </p>
                          <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                            {(staticContent.split('|')[1] || '').split(',').map((k, idx) => {
                              const kw = k.trim();
                              if (!kw) return null;
                              return (
                                <span key={idx} className="bg-white/5 text-gray-300 border border-white/10 px-2 py-0.5 rounded text-[10px] font-semibold">
                                  #{kw}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Case G: Admin Users Management (Super Admin Only) */}
              {currentSubPath === 'admin-users' && currentUser?.role === 'super_admin' && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="text-sm font-extrabold text-white">
                      등록된 관리자 계정 목록
                    </h3>
                    <button
                      onClick={() => {
                        setAdminError('');
                        setAdminModalMode('create');
                        setEditingAdminId(null);
                        setNewAdminName('');
                        setNewAdminUsername('');
                        setNewAdminPassword('');
                        setNewAdminRole('editor');
                        setShowAdminModal(true);
                      }}
                      className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                    >
                      <Plus size={14} />
                      <span>신규 관리자 등록</span>
                    </button>
                  </div>

                  <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="px-5 py-4 w-[25%]">이름</th>
                            <th className="px-5 py-4 w-[25%]">로그인 ID</th>
                            <th className="px-5 py-4 w-[25%]">권한 등급</th>
                            <th className="px-5 py-4 w-[15%]">생성일</th>
                            <th className="px-5 py-4 w-[10%] text-right">삭제</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                          {adminUsers.length > 0 ? (
                            adminUsers.map(user => (
                              <tr key={user.id} className="hover:bg-white/[0.04] border-b border-white/5 last:border-0 transition-colors cursor-pointer">
                                <td className="px-5 py-4 font-bold text-white" onClick={() => openEditAdminModal(user)}>{user.name}</td>
                                <td className="px-5 py-4 font-mono text-gray-450" onClick={() => openEditAdminModal(user)}>{user.username}</td>
                                <td className="px-5 py-4" onClick={() => openEditAdminModal(user)}>
                                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase border ${
                                    user.role === 'super_admin'
                                      ? 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                                      : user.role === 'editor'
                                      ? 'bg-brand-green/20 text-brand-green border-brand-green/30'
                                      : user.role === 'connect_editor'
                                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                                      : 'bg-gray-400/10 text-gray-400 border-gray-400/20'
                                  }`}>
                                    {user.role === 'super_admin'
                                      ? '최고관리자'
                                      : user.role === 'editor'
                                      ? '콘텐츠관리자'
                                      : user.role === 'connect_editor'
                                      ? '뉴스룸관리자'
                                      : '조회권한자'}
                                  </span>
                                </td>
                                <td className="px-5 py-4 text-xs text-gray-500" onClick={() => openEditAdminModal(user)}>
                                  {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-5 py-4 text-right">
                                  {user.username !== 'admin' && user.username !== currentUser?.username ? (
                                    <button
                                      onClick={() => handleDeleteAdminUser(user.id)}
                                      className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  ) : (
                                    <span className="text-[10px] text-gray-600 font-semibold px-1">삭제불가</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="text-center py-12 text-gray-500 text-xs">
                                등록된 관리자 계정이 없습니다.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Case Landing: Dashboard Summary Overview */}
              {currentSubPath === '' && (
                <div className="space-y-8 animate-fade-in-up">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">일일 방문자수</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-black text-brand-green drop-shadow-[0_0_8px_rgba(55,154,53,0.3)]">
                          {dashboardStats?.todayCount ?? 0}
                        </span>
                        {(() => {
                          const today = dashboardStats?.todayCount ?? 0;
                          const yesterday = dashboardStats?.yesterdayCount ?? 0;
                          const diff = today - yesterday;
                          if (diff >= 0) {
                            return <span className="text-[10px] text-emerald-400 font-bold">▲ {diff}명</span>;
                          } else {
                            return <span className="text-[10px] text-rose-400 font-bold">▼ {Math.abs(diff)}명</span>;
                          }
                        })()}
                      </div>
                      <p className="text-[10px] text-gray-400">어제 ({dashboardStats?.yesterdayCount ?? 0}명) 대비</p>
                    </div>
                    <div 
                      onClick={() => setShowVisitorModal(true)}
                      className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-2 hover:border-brand-cyan hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block group-hover:text-brand-cyan transition-colors">누적 방문자수 (IP 기준)</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-black text-brand-cyan drop-shadow-[0_0_8px_rgba(0,163,224,0.3)]">
                          {Number(dashboardStats?.totalCount ?? 0).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-brand-teal font-extrabold uppercase">전체 누적</span>
                      </div>
                      <p className="text-[10px] text-gray-400 group-hover:underline">개설 이후 누적 유니크 IP 수 (클릭 시 세부내역)</p>
                    </div>
                    <div 
                      onClick={() => router.push('/management/dashboard/contact/inquiry/check')}
                      className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-2 hover:border-rose-300 hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block group-hover:text-rose-500 transition-colors">등록된 고객 문의</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-black text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]">{inquiries.length}</span>
                        <span className="text-[10px] text-gray-400 font-bold">건</span>
                      </div>
                      <p className="text-[10px] text-gray-400 group-hover:underline">고객 문의내역 관리 이동</p>
                    </div>
                    <div 
                      className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-2 hover:border-amber-300 hover:shadow-xs transition-all relative select-none"
                    >
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">총 등록 데이터</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-black text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">{products.length + pipelines.length}</span>
                        <span className="text-[10px] text-gray-400 font-bold">개</span>
                      </div>
                      
                      {/* 상시 노출형 프리미엄 세부 메뉴 버튼 */}
                      <div className="flex items-center space-x-2 pt-2.5 mt-2 border-t border-white/5 text-[10px] font-bold">
                        <button 
                          onClick={() => router.push('/management/dashboard/business/finished/search')}
                          className="flex items-center justify-center flex-1 py-2 bg-white/5 hover:bg-brand-green/10 text-gray-300 hover:text-brand-green border border-white/10 hover:border-brand-green/30 rounded-lg transition-all cursor-pointer"
                        >
                          제품 {products.length}개
                        </button>
                        <button 
                          onClick={() => router.push('/management/dashboard/rd/pipeline')}
                          className="flex items-center justify-center flex-1 py-2 bg-white/5 hover:bg-brand-green/10 text-gray-300 hover:text-brand-green border border-white/10 hover:border-brand-green/30 rounded-lg transition-all cursor-pointer"
                        >
                          파이프라인 {pipelines.length}개
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Charts & Graphs Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Visitor Trend (Bar Chart) */}
                    <div className="lg:col-span-2 bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">주간 방문 현황</h3>
                        <span className="text-[10px] text-gray-400 font-semibold font-mono">최근 7일 유입 지표</span>
                      </div>
                      
                      <div className="h-48 flex items-end justify-between px-2 pt-4 border-b border-white/10">
                        {(() => {
                          const stats = dashboardStats?.weeklyStats || [];
                          if (stats.length === 0) {
                            return (
                              <div className="w-full text-center pb-12 text-xs text-gray-400">
                                접속 지표 데이터 로딩 중...
                              </div>
                            );
                          }
                          const maxVal = Math.max(...stats.map((s: any) => s.count), 1);
                          return stats.map((d: any, idx: number) => {
                            const pct = Math.round((d.count / maxVal) * 80) + 10;
                            const active = idx === stats.length - 1;
                            return (
                              <div key={idx} className="flex flex-col items-center flex-1 space-y-2 group">
                                <div className="relative w-full flex justify-center h-32 items-end">
                                  <span className="absolute -top-7 scale-0 group-hover:scale-100 transition-all duration-150 bg-[#0d1527] border border-white/10 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xl z-10">
                                    {d.count}명
                                  </span>
                                  <div 
                                    className={`w-8 rounded-t-md transition-all duration-500 cursor-pointer ${
                                      active ? 'bg-gradient-to-t from-brand-green to-brand-teal shadow-md shadow-brand-green/20' : 'bg-brand-green/20 hover:bg-brand-green/40'
                                    }`}
                                    style={{ height: `${pct}%`, minHeight: '10px' }}
                                  />
                                </div>
                                <span className={`text-[9px] font-bold tracking-tight pb-1.5 ${active ? 'text-brand-green' : 'text-gray-400'}`}>
                                  {d.visit_date}
                                </span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Page View Share (Category stats) */}
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">메뉴 영역별 뷰 분포 (누적)</h3>
                        <span className="text-[10px] bg-brand-green/10 text-brand-green font-bold px-2 py-0.5 rounded">전체비율</span>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        {[
                          { name: 'Company (회사소개/IR/ESG)', share: dashboardStats?.categoryStats?.about?.share ?? '0%', count: dashboardStats?.categoryStats?.about?.pv ?? 0, color: 'bg-brand-cyan' },
                          { name: 'Innovation (연구분야/파이프라인)', share: dashboardStats?.categoryStats?.rd?.share ?? '0%', count: dashboardStats?.categoryStats?.rd?.pv ?? 0, color: 'bg-amber-500' },
                          { name: 'Business (제품/원료/CDMO)', share: dashboardStats?.categoryStats?.business?.share ?? '0%', count: dashboardStats?.categoryStats?.business?.pv ?? 0, color: 'bg-brand-green' },
                          { name: 'Connect (문의/뉴스룸/채용)', share: dashboardStats?.categoryStats?.contact?.share ?? '0%', count: dashboardStats?.categoryStats?.contact?.pv ?? 0, color: 'bg-brand-teal' },
                          { name: '메인화면 (/)', share: dashboardStats?.categoryStats?.main?.share ?? '0%', count: dashboardStats?.categoryStats?.main?.pv ?? 0, color: 'bg-gray-400' },
                        ].map((c, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="text-gray-300">{c.name}</span>
                              <span className="text-gray-400 font-mono">{c.count} PV ({c.share})</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                              <div className={`h-full ${c.color} rounded-full`} style={{ width: c.share }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Logs & Contacts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Visitor Log IP list */}
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">최근 접속자 실시간 로그</h3>
                        <span className="text-[10px] text-gray-400 font-semibold font-mono">Real-time IP</span>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] md:text-xs">
                          <thead>
                            <tr className="text-gray-400 font-bold border-b border-gray-100 pb-2">
                              <th className="pb-2">접속 IP</th>
                              <th className="pb-2">운영체제/기기</th>
                              <th className="pb-2">방문 페이지</th>
                              <th className="pb-2 text-right">접속시간</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                            {(dashboardStats?.recentLogs || []).map((l: any, idx: number) => (
                              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-2.5 font-bold font-mono text-white">{l.ip}</td>
                                <td className="py-2.5 text-gray-400">{l.device}</td>
                                <td className="py-2.5 font-semibold text-brand-green">{l.page}</td>
                                <td className="py-2.5 text-right text-gray-400 font-mono">{l.time}</td>
                              </tr>
                            ))}
                            {(!dashboardStats?.recentLogs || dashboardStats.recentLogs.length === 0) && (
                              <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-400 text-xs">
                                  아직 기록된 접속자 로그가 없습니다.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Recent Inquiries List */}
                    <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">최근 고객 문의</h3>
                        <button 
                          onClick={() => router.push('/management/dashboard/contact/inquiry/check')}
                          className="text-[10px] text-brand-green hover:underline font-bold"
                        >
                          전체보기
                        </button>
                      </div>

                      <div className="space-y-3 divide-y divide-white/5">
                        {inquiries.slice(0, 3).map((inq) => (
                          <div 
                            key={inq.id} 
                            onClick={() => {
                              router.push('/management/dashboard/contact/inquiry/check');
                            }}
                            className="pt-3 first:pt-0 group cursor-pointer space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-gray-200 group-hover:text-brand-green transition-colors">{inq.subject}</span>
                              <span className="text-[10px] text-gray-400 font-mono">{new Date(inq.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 truncate">{inq.content || inq.message || inq.subject}</p>
                            <div className="flex items-center justify-between text-[9px] text-gray-400 font-bold">
                              <span>작성자: {inq.name} ({inq.email})</span>
                              <span className="bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-1.5 py-0.5 rounded font-black text-[9px] uppercase tracking-wider">신규접수</span>
                            </div>
                          </div>
                        ))}
                        {inquiries.length === 0 && (
                          <div className="text-center py-12 text-gray-400 text-xs">
                            등록된 고객 문의사항이 없습니다.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </main>

      </div>

      {/* 4. CRUD Modals */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none">
          <div className="bg-[#0a1120]/90 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative text-white backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-brand-cyan/50" />
            <h3 className="text-lg font-black text-white tracking-tight pb-2 border-b border-white/10">
              {formMode === 'create' ? '신규 데이터 등록' : '데이터 정보 수정'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Conditional Form Fields */}
              {/* Product Form */}
              {currentSubPath === 'business/finished/search' && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">제품 구분</label>
                    <select
                      value={prodType}
                      onChange={(e) => setProdType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    >
                      <option value="전문의약품">전문의약품</option>
                      <option value="일반의약품">일반의약품</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">제품명</label>
                    <input
                      type="text"
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      placeholder="제품명을 입력해주세요."
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">영문명</label>
                    <input
                      type="text"
                      value={prodEngName}
                      onChange={(e) => setProdEngName(e.target.value)}
                      placeholder="영문명 또는 제품 상세설명을 입력해주세요."
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">효능 / 효과</label>
                    <input
                      type="text"
                      required
                      value={prodEfficacy}
                      onChange={(e) => setProdEfficacy(e.target.value)}
                      placeholder="효능/효과를 입력해주세요. (예: 혈압강하제)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">자음 분류 (초성 검색용)</label>
                    <select
                      value={prodConsonant}
                      onChange={(e) => setProdConsonant(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    >
                      {consonants.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 mt-2">
                    <label className="font-bold text-gray-400 block">첨부파일(제품 안내 브로셔/설명서 등)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        id="prod-file-upload"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          setUploadingProdFile(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData,
                            });
                            
                            if (res.ok) {
                              const data = await res.json();
                              setProdFileUrl(data.url);
                              setProdFileName(data.name);
                            } else {
                              alert('파일 업로드에 실패했습니다.');
                            }
                          } catch (err) {
                            console.error('File upload error:', err);
                            alert('업로드 도중 오류가 발생했습니다.');
                          } finally {
                            setUploadingProdFile(false);
                          }
                        }}
                      />
                      <label
                        htmlFor="prod-file-upload"
                        className="px-3.5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 cursor-pointer transition-colors block text-center text-xs"
                      >
                        {uploadingProdFile ? '업로드 중...' : '파일 선택'}
                      </label>
                      {prodFileName && (
                        <div className="flex flex-col space-y-2">
                          {prodFileUrl && /\.(jpg|jpeg|png|gif|webp|svg)($|\?)/i.test(prodFileUrl) && (
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={prodFileUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                            <span className="font-semibold text-gray-300 truncate max-w-[250px]">{prodFileName}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setProdFileUrl('');
                                setProdFileName('');
                              }}
                              className="text-red-500 hover:text-red-700 font-bold px-1.5 py-0.5 rounded hover:bg-red-50 cursor-pointer text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Pipeline Form */}
              {currentSubPath === 'rd/pipeline' && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">구분</label>
                    <select
                      value={pipeCategory}
                      onChange={(e) => setPipeCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    >
                      <option value="개량신약">개량신약</option>
                      <option value="자료 제출 의약품">자료 제출 의약품</option>
                      <option value="퍼스트 제네릭">퍼스트 제네릭</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">프로젝트명</label>
                    <input
                      type="text"
                      required
                      value={pipeProject}
                      onChange={(e) => setPipeProject(e.target.value)}
                      placeholder="예: SLIM2403"
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">질환군</label>
                    <input
                      type="text"
                      required
                      value={pipeDisease}
                      onChange={(e) => setPipeDisease(e.target.value)}
                      placeholder="예: 비만치료제"
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">개발 단계</label>
                    <select
                      value={pipePhase}
                      onChange={(e) => setPipePhase(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    >
                      {PHASES.map(ph => (
                        <option key={ph} value={ph}>{ph}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">협력 기관</label>
                    <input
                      type="text"
                      value={pipePartner}
                      onChange={(e) => setPipePartner(e.target.value)}
                      placeholder="협력 기관을 입력해주세요. (공란 가능)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* News / Board Form */}
              {(currentSubPath === 'contact/newsroom/press' ||
                currentSubPath === 'contact/newsroom/media' ||
                currentSubPath === 'about/ir/announcement' ||
                currentSubPath === 'about/ir/financial' ||
                currentSubPath === 'about/ir/news') && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">제목</label>
                    <input
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="제목을 입력해주세요."
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">내용</label>
                    <RichTextEditor
                      value={newsContent}
                      onChange={(value) => setNewsContent(value)}
                      placeholder="본문 내용을 상세히 적어주세요."
                    />
                  </div>
                  <div className="space-y-1 mt-2">
                    <label className="font-bold text-gray-400 block">첨부파일</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        id="news-file-upload"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          setUploadingFile(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData,
                            });
                            
                            if (res.ok) {
                              const data = await res.json();
                              setNewsFileUrl(data.url);
                              setNewsFileName(data.name);
                            } else {
                              alert('파일 업로드에 실패했습니다.');
                            }
                          } catch (err) {
                            console.error('File upload error:', err);
                            alert('업로드 도중 오류가 발생했습니다.');
                          } finally {
                            setUploadingFile(false);
                          }
                        }}
                      />
                      <label
                        htmlFor="news-file-upload"
                        className="px-3.5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 cursor-pointer transition-colors block text-center text-xs"
                      >
                        {uploadingFile ? '업로드 중...' : '파일 선택'}
                      </label>
                      {newsFileName && (
                        <div className="flex flex-col space-y-2">
                          {newsFileUrl && /\.(jpg|jpeg|png|gif|webp|svg)($|\?)/i.test(newsFileUrl) && (
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={newsFileUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                            <span className="font-semibold text-gray-300 truncate max-w-[250px]">{newsFileName}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setNewsFileUrl('');
                                setNewsFileName('');
                              }}
                              className="text-red-500 hover:text-red-700 font-bold px-1.5 py-0.5 rounded hover:bg-red-50 cursor-pointer text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentSubPath === 'contact/careers/jobs' && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">공고명 (제목)</label>
                    <input
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="공고명을 입력해주세요."
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-400 block">채용 구분</label>
                      <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="w-full bg-[#0a1120] border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                      >
                        <option value="신입" className="bg-[#0a1120] text-white">신입</option>
                        <option value="경력" className="bg-[#0a1120] text-white">경력</option>
                        <option value="신입/경력" className="bg-[#0a1120] text-white">신입/경력</option>
                        <option value="계약직" className="bg-[#0a1120] text-white">계약직</option>
                        <option value="인턴" className="bg-[#0a1120] text-white">인턴</option>
                      </select>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="font-bold text-gray-400 block">자격 요건</label>
                      <input
                        type="text"
                        required
                        value={jobQualifications}
                        onChange={(e) => setJobQualifications(e.target.value)}
                        placeholder="예: 학사 이상, 관련 분야 3년 이상"
                        className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">마감일</label>
                    <input
                      type="text"
                      required
                      value={jobDeadline}
                      onChange={(e) => setJobDeadline(e.target.value)}
                      placeholder="예: D-15 또는 상시채용"
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">상세 내용 (상세 공고 내용)</label>
                    <RichTextEditor
                      value={jobDescription}
                      onChange={(value) => setJobDescription(value)}
                      placeholder="상세한 모집요강 및 지원방법을 입력해주세요."
                    />
                  </div>
                  <div className="space-y-1 mt-2">
                    <label className="font-bold text-gray-400 block">첨부파일 (채용 공고문 등)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        id="news-file-upload"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          setUploadingFile(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData,
                            });
                            
                            if (res.ok) {
                              const data = await res.json();
                              setNewsFileUrl(data.url);
                              setNewsFileName(data.name);
                            } else {
                              alert('파일 업로드에 실패했습니다.');
                            }
                          } catch (err) {
                            console.error('File upload error:', err);
                            alert('업로드 도중 오류가 발생했습니다.');
                          } finally {
                            setUploadingFile(false);
                          }
                        }}
                      />
                      <label
                        htmlFor="news-file-upload"
                        className="px-3.5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 cursor-pointer transition-colors block text-center text-xs"
                      >
                        {uploadingFile ? '업로드 중...' : '파일 선택'}
                      </label>
                      {newsFileName && (
                        <div className="flex flex-col space-y-2">
                          {newsFileUrl && /\.(jpg|jpeg|png|gif|webp|svg)($|\?)/i.test(newsFileUrl) && (
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={newsFileUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                            <span className="font-semibold text-gray-300 truncate max-w-[250px]">{newsFileName}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setNewsFileUrl('');
                                setNewsFileName('');
                              }}
                              className="text-red-500 hover:text-red-700 font-bold px-1.5 py-0.5 rounded hover:bg-red-50 cursor-pointer text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2 text-xs">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold cursor-pointer shadow-md shadow-brand-green/10 hover:scale-[1.02] transition-all text-xs"
                >
                  {formMode === 'create' ? '등록하기' : '저장하기'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white font-bold cursor-pointer transition-colors text-xs"
                >
                  취소
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Admin User Create Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none animate-fade-in">
          <div className="bg-[#0a1120]/90 border border-white/10 rounded-2xl w-full max-w-md p-6 md:p-8 space-y-6 shadow-2xl relative text-white backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-brand-cyan/50" />
            <h3 className="text-lg font-black text-white tracking-tight pb-2 border-b border-white/10">
              {adminModalMode === 'edit' ? '관리자 정보 수정' : '신규 관리자 계정 등록'}
            </h3>

            {adminError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400 font-semibold">
                ⚠️ {adminError}
              </div>
            )}

            <form onSubmit={handleCreateAdminUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">이름</label>
                <input
                  type="text"
                  required
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="관리자 이름을 입력하세요."
                  className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">로그인 ID</label>
                <input
                  type="text"
                  required
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  placeholder="로그인에 사용할 ID를 입력하세요."
                  className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">
                  비밀번호 {adminModalMode === 'edit' && <span className="text-[10px] text-brand-green font-bold">(변경시에만 입력)</span>}
                </label>
                <input
                  type="password"
                  required={adminModalMode === 'create'}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder={adminModalMode === 'edit' ? "비밀번호 변경 시에만 입력하세요." : "비밀번호를 입력하세요."}
                  className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 block">권한 등급 설정</label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value)}
                  className="w-full bg-[#0a1120] border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                >
                  <option value="super_admin" className="bg-[#0a1120] text-white">최고관리자 (전체 권한)</option>
                  <option value="editor" className="bg-[#0a1120] text-white">콘텐츠관리자 (등록/수정 권한)</option>
                  <option value="connect_editor" className="bg-[#0a1120] text-white">뉴스룸관리자 (보도자료/홍보자료실 권한)</option>
                  <option value="viewer" className="bg-[#0a1120] text-white">조회권한자 (조회만 가능)</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2 text-xs">
                <button
                  type="submit"
                  disabled={creatingAdmin}
                  className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold cursor-pointer shadow-md shadow-brand-green/10 hover:scale-[1.02] transition-all text-xs disabled:opacity-50"
                >
                  {creatingAdmin ? '저장 중...' : (adminModalMode === 'edit' ? '저장하기' : '등록하기')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminModalMode('create');
                    setEditingAdminId(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white font-bold cursor-pointer transition-colors text-xs"
                >
                  취소
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 누적 방문자 상세 모달 */}
      {showVisitorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0a1120] border border-white/10 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white">누적 방문자 상세 내역 (IP 기준)</h3>
              <button 
                onClick={() => setShowVisitorModal(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
            
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 font-bold">
                    <th className="py-2.5">방문일 (년월일)</th>
                    <th className="py-2.5 text-center">방문 인원수</th>
                    <th className="py-2.5 pl-4">방문 IP 목록</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(dashboardStats?.uniqueVisitors || []).map((v: any, idx: number) => (
                    <tr key={idx} className="text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-3 font-mono font-bold text-brand-cyan">{v.visit_date}</td>
                      <td className="py-3 font-mono font-bold text-emerald-400 text-center">{v.visitor_count}명</td>
                      <td className="py-3 font-mono text-[10px] pl-4 space-y-1.5 max-w-[260px]">
                        {v.pc_ips && (
                          <div className="flex items-center space-x-1.5">
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1 py-0.5 rounded-[4px] text-[8px] font-black shrink-0">PC</span>
                            <span className="text-gray-400 truncate w-full" title={v.pc_ips}>{v.pc_ips}</span>
                          </div>
                        )}
                        {v.mobile_ips && (
                          <div className="flex items-center space-x-1.5">
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.5 rounded-[4px] text-[8px] font-black shrink-0">MOBILE</span>
                            <span className="text-gray-400 truncate w-full" title={v.mobile_ips}>{v.mobile_ips}</span>
                          </div>
                        )}
                        {!v.pc_ips && !v.mobile_ips && (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {(!dashboardStats?.uniqueVisitors || dashboardStats.uniqueVisitors.length === 0) && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-500">
                        방문 기록이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button 
                onClick={() => setShowVisitorModal(false)}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
