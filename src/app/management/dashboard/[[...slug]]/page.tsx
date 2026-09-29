'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CustomDatePicker from '@/components/CustomDatePicker';
import RichTextEditor from '@/components/RichTextEditor';
import RdIntroContent from '@/components/RdIntroContent';
import RdActivitiesContent from '@/components/RdActivitiesContent';
import { useRouter, useParams } from 'next/navigation';
import { navigationData, GrandMenu } from '@/lib/navigation';
import { parseGreetingData, DEFAULT_GREETING_DATA, GreetingData } from '@/lib/greeting';
import { parseEsgData, DEFAULT_ESG_DATA, EsgData, DEFAULT_CODE_OF_ETHICS_HTML } from '@/lib/esg';
import { 
  LogOut, ShieldAlert, Check, Plus, Trash2, Edit, Save, Settings, GripVertical,
  ChevronRight, ChevronDown, CheckCircle2, ListFilter, Search, Download, Globe, X,
  Heart, BookOpen, MessageSquare, LineChart,
  CheckCircle, ShieldCheck, Truck, Layers, RotateCcw,
  Mail, Send, UploadCloud, Image as ImageIcon, Award, Building2, Users, Zap, Factory, MapPin, Sparkles
} from 'lucide-react';
import DetailedFinancialTables from '@/components/DetailedFinancialTables';
import ExcelDownloadButton from '@/components/ExcelDownloadButton';
import TalentValuesInteractive from '@/components/TalentValuesInteractive';
import CareerProcessAlternating from '@/components/CareerProcessAlternating';
import { parseTalentData, serializeTalentData, DEFAULT_TALENT_DATA, TalentData } from '@/lib/talent';
import { parseCareerProcessData, serializeCareerProcessData, DEFAULT_CAREER_PROCESS_DATA, CareerProcessData } from '@/lib/careerProcess';
import { parseRdIntroData, serializeRdIntroData, DEFAULT_RD_INTRO_DATA, RdIntroData } from '@/lib/rdIntro';
import { parseRdActivitiesData, serializeRdActivitiesData, DEFAULT_RD_ACTIVITIES_DATA, RdActivitiesData } from '@/lib/rdActivities';
import ApiRawContent from '@/components/ApiRawContent';
import CdmoContent from '@/components/CdmoContent';
import { parseBusinessApiData, serializeBusinessApiData, DEFAULT_BUSINESS_API_DATA, BusinessApiData } from '@/lib/businessApi';
import { parseBusinessCdmoData, serializeBusinessCdmoData, DEFAULT_BUSINESS_CDMO_DATA, BusinessCdmoData } from '@/lib/businessCdmo';


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
    { key: 'seo/business/finished/pharmacy', label: '판매약국찾기' },
    { key: 'seo/business/finished/news', label: '제품소식' },
    { key: 'seo/business/api/raw', label: 'API' },
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

export const DEFAULT_ANNOUNCEMENT_CONTENT = '주주 중심 경영과 공정한 기업 가치 평가|다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.|https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD';

export const DEFAULT_FINANCIAL_CONTENT = `주주 중심 경영과 공정한 기업 가치 평가
다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.
2023년 (개별)|2024년 (개별)|2025년 (연결)
매출액 | 79,275 | 92,734 | 110,191
영업이익 | 2,389 | 6,068 | 338
R&D 투자액 | 9,500 | 12,000 | 13,500
유동자산 | 42,060 | 49,466 | 67,118
비유동자산 | 31,197 | 38,595 | 43,297
자산총계 | 73,257 | 88,061 | 110,415
유동부채 | 39,071 | 42,281 | 61,928
비유동부채 | 11,223 | 14,582 | 12,099
부채총계 | 50,294 | 56,863 | 74,028
자본금 | 1,120 | 1,120 | 1,120
자본잉여금 | 3,583 | 3,583 | 3,583
기타자본 | -7,762 | -7,771 | -7,776
이익잉여금 | 26,152 | 34,248 | 39,645
비지배지분 | -131 | 17 | -185
자본총계 | 22,962 | 31,198 | 36,388
유동자산 | 41,899 | 49,031 | 65,212
비유동자산 | 31,032 | 38,621 | 45,426
자산총계 | 72,931 | 87,652 | 110,637
유동부채 | 38,309 | 41,738 | 61,197
비유동부채 | 11,223 | 14,582 | 11,887
부채총계 | 49,531 | 56,320 | 73,084
자본금 | 1,120 | 1,120 | 1,120
자본잉여금 | 3,583 | 3,583 | 3,583
기타자본 | -7,766 | -7,766 | -7,766
이익잉여금 | 26,462 | 34,395 | 40,616
자본총계 | 23,400 | 31,333 | 37,554
매출액 | 80,027 | 93,817 | 110,191
영업이익 | 1,867 | 6,161 | 338
법인세차감전순이익 | 46 | 8,247 | 3,238
당기순이익 | 1,815 | 8,035 | 3,690
매출액 | 79,275 | 92,734 | 106,877
영업이익 | 2,389 | 6,068 | 1,399
법인세차감전순이익 | 547 | 8,150 | 4,547
당기순이익 | 2,316 | 7,929 | 4,937`;

// Module-level caches to prevent screen blink on navigation
let cachedUser: { username: string; name: string; role: string } | null = null;
let cachedAuthChecked = false;
let cachedSidebarOpenKeys: { [key: string]: boolean } | null = null;

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const slugArray = (params.slug as string[]) || [];
  const initialSubPath = slugArray.length > 0 ? slugArray.join('/') : '';
  const [currentSubPath, setCurrentSubPath] = useState<string>(initialSubPath);

  // Sync state if params.slug changes (e.g. browser navigation or external link)
  useEffect(() => {
    const slug = (params.slug as string[]) || [];
    const p = slug.length > 0 ? slug.join('/') : '';
    setCurrentSubPath(p);
  }, [params.slug]);

  // Handle browser back/forward buttons seamlessly
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const stripped = pathname.replace(/^\/management\/dashboard\/?/, '');
      setCurrentSubPath(stripped);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (pathOrSubPath: string, replace = false) => {
    const cleanSubPath = pathOrSubPath
      .replace(/^\/management\/dashboard\/?/, '')
      .replace(/^\//, '');
    if (currentSubPath === cleanSubPath) return;
    setCurrentSubPath(cleanSubPath);
    const targetUrl = cleanSubPath ? `/management/dashboard/${cleanSubPath}` : '/management/dashboard';
    if (replace) {
      window.history.replaceState(null, '', targetUrl);
    } else {
      window.history.pushState(null, '', targetUrl);
    }
  };

  // Auth checking with module cache to avoid flash
  const [checkingAuth, setCheckingAuth] = useState(!cachedAuthChecked);
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string; role: string } | null>(cachedUser);

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
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  const adminProductsPerPage = 10;
  const [newsList, setNewsList] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [inquiryCategoryFilter, setInquiryCategoryFilter] = useState<'all' | 'careers' | 'product' | 'sales' | 'corruption'>('all');
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [selectedVisitorDate, setSelectedVisitorDate] = useState<string | null>(null);
  const [backupLogs, setBackupLogs] = useState<any[]>([]);

  // Email resend modal states
  const [showResendModal, setShowResendModal] = useState(false);
  const [resendInquiry, setResendInquiry] = useState<any>(null);
  const [resendTargetEmail, setResendTargetEmail] = useState('');
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  // Static content state
  const [staticContent, setStaticContent] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [savingStatic, setSavingStatic] = useState(false);
  const [activeIntroTab, setActiveIntroTab] = useState('about/intro');
  const [activeSeoTab, setActiveSeoTab] = useState('seo/main');
  const [activeSeoSubpage, setActiveSeoSubpage] = useState('seo/main');
  const [showDataDropdown, setShowDataDropdown] = useState(false);
  const [previewWidthMode, setPreviewWidthMode] = useState<'normal' | 'wide' | 'expanded'>('wide');
  const [financialEditorTab, setFinancialEditorTab] = useState<'summary' | 'cons_bs' | 'sep_bs' | 'cons_is' | 'sep_is'>('summary');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dasan_preview_width_mode');
      if (saved === 'normal' || saved === 'wide' || saved === 'expanded') {
        setPreviewWidthMode(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSetPreviewWidthMode = (mode: 'normal' | 'wide' | 'expanded') => {
    setPreviewWidthMode(mode);
    try {
      localStorage.setItem('dasan_preview_width_mode', mode);
    } catch {
      // ignore
    }
  };

  // UI status
  const [loadingData, setLoadingData] = useState(false);
  const [sidebarOpenKeys, setSidebarOpenKeys] = useState<{ [key: string]: boolean }>(() => {
    if (cachedSidebarOpenKeys) return cachedSidebarOpenKeys;
    const initialKeys: { [key: string]: boolean } = {
      'Company': false,
      'Innovation': false,
      'Business': false,
      'CDMO': false,
      'Connect': false,
    };
    const matched = navigationData.find(grand => 
      grand.majors.some(major => 
        (major.link && (major.link.replace(/^\//, '') === initialSubPath || (major.link === '/business/cdmo' && initialSubPath.startsWith('business/cdmo')) || (major.link === '/business/api/raw' && (initialSubPath === 'business/api' || initialSubPath === 'business/api/raw')))) ||
        major.subMenus.some(sub => sub.link.replace(/^\//, '') === initialSubPath)
      )
    );
    if (matched) {
      initialKeys[matched.name] = true;
    }
    return initialKeys;
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
  const [prodCategory, setProdCategory] = useState('');
  const [prodIngredient, setProdIngredient] = useState('');
  const [prodContent, setProdContent] = useState('');
  const [prodReferenceDrug, setProdReferenceDrug] = useState('');
  const [prodEfficacyDetail, setProdEfficacyDetail] = useState('');
  const [prodAppearance, setProdAppearance] = useState('');
  const [prodIngredientDetail, setProdIngredientDetail] = useState('');
  const [prodUsageCapacity, setProdUsageCapacity] = useState('');
  const [prodStorageMethod, setProdStorageMethod] = useState('');
  const [prodPackagingUnit, setProdPackagingUnit] = useState('');
  const [prodInsuranceCode, setProdInsuranceCode] = useState('');
  const [prodInsurancePrice, setProdInsurancePrice] = useState<number | ''>('');
  const [prodPrecautions, setProdPrecautions] = useState('');
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
  const [uploadingHeroBanner, setUploadingHeroBanner] = useState(false);

  // Job fields
  const [jobType, setJobType] = useState('신입/경력');
  const [jobQualifications, setJobQualifications] = useState('');
  const [jobDeadline, setJobDeadline] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // Inquiries Detail
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  // Popups Management
  const [popups, setPopups] = useState<any[]>([]);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [popupLinkUrl, setPopupLinkUrl] = useState('');
  const [popupStartDate, setPopupStartDate] = useState('');
  const [popupEndDate, setPopupEndDate] = useState('');
  const [popupIsActive, setPopupIsActive] = useState(true);
  const [popupWidth, setPopupWidth] = useState(400);
  const [popupHeight, setPopupHeight] = useState(400);
  const [popupTop, setPopupTop] = useState(100);
  const [popupLeft, setPopupLeft] = useState(100);

  // Phase Manager States
  const [showPhaseManager, setShowPhaseManager] = useState(false);
  const [editingPhases, setEditingPhases] = useState<string[]>([]);
  const [newPhaseName, setNewPhaseName] = useState('');
  const [isSavingPhases, setIsSavingPhases] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hideProjectName, setHideProjectName] = useState(false);
  const [editingHideProjectName, setEditingHideProjectName] = useState(false);

  // Category Manager States
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingCategories, setEditingCategories] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSavingCategories, setIsSavingCategories] = useState(false);
  const [draggedCatIndex, setDraggedCatIndex] = useState<number | null>(null);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['바이오신약', '합성신약', '제네릭']);

  // Pipeline Reorder States
  const [draggedPipelineIndex, setDraggedPipelineIndex] = useState<number | null>(null);
  const [isPipelineOrderChanged, setIsPipelineOrderChanged] = useState(false);
  const [isSavingPipelineOrder, setIsSavingPipelineOrder] = useState(false);

  // Consonant list for dropdown
  const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const [dynamicPhases, setDynamicPhases] = useState<string[]>(['기초연구', '전임상', '임상 1상', '임상 2상', '임상 3상', '허가']);

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
    } else if (clean.startsWith('[상시 채용지원]')) {
      prefix = '상시 채용';
      clean = clean.substring('[상시 채용지원]'.length).trim();
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
    if (currentSubPath === 'contact/careers/jobs') {
      return inquiries.filter(inq => inq.subject.startsWith('[상시 채용지원]'));
    }
    if (currentSubPath === 'inquiries' || currentSubPath === 'contact/inquiry/check') {
      if (inquiryCategoryFilter === 'careers') return inquiries.filter(inq => inq.subject.startsWith('[상시 채용지원]'));
      if (inquiryCategoryFilter === 'product') return inquiries.filter(inq => inq.subject.startsWith('[제품 문의]'));
      if (inquiryCategoryFilter === 'sales') return inquiries.filter(inq => inq.subject.startsWith('[영업 문의]'));
      if (inquiryCategoryFilter === 'corruption') return inquiries.filter(inq => inq.subject.startsWith('[부패신고 문의]'));
      return inquiries;
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
          cachedUser = null;
          cachedAuthChecked = false;
          router.push('/management/login');
        } else {
          cachedUser = data.user;
          cachedAuthChecked = true;
          setCurrentUser(data.user);
          setCheckingAuth(false);
        }
      })
      .catch(() => {
        cachedUser = null;
        cachedAuthChecked = false;
        router.push('/management/login');
      });
  }, [router]);

  // Redirection guard for connect_editor role
  useEffect(() => {
    if (checkingAuth || !currentUser) return;
    if (currentUser.username === 'editor3') {
      if (currentSubPath !== 'business/finished/search') {
        navigateTo('business/finished/search', true);
      }
    } else if (currentUser.role === 'connect_editor') {
      if (
        currentSubPath !== 'contact/newsroom/press' &&
        currentSubPath !== 'contact/newsroom/media'
      ) {
        navigateTo('contact/newsroom/press', true);
      }
    }
  }, [currentSubPath, currentUser, checkingAuth]);

  // 2. Fetch data based on the active path
  useEffect(() => {
    if (checkingAuth) return;

    // Reset modals & detail views
    setShowFormModal(false);
    setSelectedInquiry(null);

    // Automatically open corresponding grand menu in sidebar based on currentSubPath
    const matchedGrand = navigationData.find(grand => 
      grand.majors.some(major => 
        (major.link && (major.link.replace(/^\//, '') === currentSubPath || (major.link === '/business/cdmo' && currentSubPath.startsWith('business/cdmo')) || (major.link === '/business/api/raw' && (currentSubPath === 'business/api' || currentSubPath === 'business/api/raw')))) ||
        major.subMenus.some(sub => sub.link.replace(/^\//, '') === currentSubPath)
      )
    );
    if (matchedGrand) {
      setSidebarOpenKeys(prev => {
        if (prev[matchedGrand.name]) return prev;
        const updated = {
          ...prev,
          [matchedGrand.name]: true
        };
        cachedSidebarOpenKeys = updated;
        return updated;
      });
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
      currentSubPath === 'contact/inquiry/check' ||
      currentSubPath === 'inquiries'
    ) {
      fetchInquiries();
    } else if (currentSubPath === 'admin-users') {
      fetchAdminUsers();
    } else if (currentSubPath === 'popups') {
      fetchPopups();
    } else if (currentSubPath === 'backup-settings') {
      fetchBackupLogs();
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
      const [res, phasesRes, categoriesRes] = await Promise.all([
        fetch('/api/pipeline'),
        fetch('/api/pipeline/phases'),
        fetch('/api/pipeline/categories')
      ]);
      const data = await res.json();
      const phasesData = await phasesRes.json();
      const categoriesData = await categoriesRes.json();
      
      setPipelines(Array.isArray(data) ? data : []);
      if (phasesData) {
        if (phasesData.phases) setDynamicPhases(phasesData.phases);
        if (phasesData.hideProjectName !== undefined) setHideProjectName(!!phasesData.hideProjectName);
      }
      if (categoriesData && categoriesData.categories) {
        setDynamicCategories(categoriesData.categories);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
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

        if (key === 'about/ir/announcement' && !contentVal) {
          contentVal = DEFAULT_ANNOUNCEMENT_CONTENT;
        } else if (key === 'about/ir/financial' && !contentVal) {
          contentVal = DEFAULT_FINANCIAL_CONTENT;
        } else if (key === 'about/ci' && !contentVal) {
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
          contentVal = `서울 사무실
경영총괄, 해외 영업본부, 마케팅 전략부서
37.5186,126.8906
다산제약 서울 사무실
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
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용
중국 선양연구소

41.6906,123.4779
다산제약 중국 선양연구소
Room 310, Building F9, Shangshengou Village, Hunnan District, Shenyang, Liaoning, 중국 110179

심양 트램 1·2호선 궈지롼젠위안(国际软件园, Shenyang Int’l Software Park)역 하차|심양 지하철 2호선 취안윈루(全运路)역 또는 백탑하(白塔河路)역 하차 후 차량/택시 이동
선양국제소프트웨어파크(Shenyang International Software Park) 방면 버스 이용|상성거우(上深沟, Shangshengou) 또는 소프트웨어파크 F동 인근 하차`;
        } else if (key === 'about/esg/ethics' && !contentVal) {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|다산제약은 준법감시 제도를 도입하여 투명하고 정직한 경영 문화를 실천합니다.`;
        } else if (key === 'about/esg/environment' && !contentVal) {
          contentVal = `지속 가능한 비즈니스를 위한 ESG 선언|친환경 원료 합성 공정 및 폐기물 감소 솔루션을 통해 지구 환경 보존에 기여합니다.`;
        } else if (key === 'about/esg/safety' && !contentVal) {
          contentVal = JSON.stringify(DEFAULT_ESG_DATA['about/esg/safety']);
        } else if (key === 'about/esg/environment' && !contentVal) {
          contentVal = JSON.stringify(DEFAULT_ESG_DATA['about/esg/environment']);
        } else if (key === 'about/esg/anti-corruption' && !contentVal) {
          contentVal = JSON.stringify(DEFAULT_ESG_DATA['about/esg/anti-corruption']);
        } else if (key === 'about/esg/code-of-ethics' && !contentVal) {
          contentVal = '윤리 강령|' + DEFAULT_CODE_OF_ETHICS_HTML;
        } else if (key === 'about/ir/announcement' && !contentVal) {
          contentVal = `주주 중심 경영과 공정한 기업 가치 평가|다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.|https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD`;
        } else if (key === 'about/ir/financial' && !contentVal) {
          contentVal = `주주 중심 경영과 공정한 기업 가치 평가\n다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.\n2023년 (개별)|2024년 (개별)|2025년 (연결)|2026년 (목표)\n매출액|793|938|1,069|1,400\n영업이익|24|62|14|85\nR&D 투자액|95|120|135|160`;
        } else if (key === 'rd/intro') {
          contentVal = serializeRdIntroData(parseRdIntroData(contentVal));
        } else if (key === 'rd/activities') {
          contentVal = serializeRdActivitiesData(parseRdActivitiesData(contentVal));
        } else if (key === 'business/finished/news' && !contentVal) {
          contentVal = `신제품 출시|복합 고혈압 개량신약 '피마사탄/암로디핀' 출시 승인|자체 DDS 특허 서방성 과립 코팅 기술을 사용해 환자의 복용 크기를 축소시킨 고혈압 치료제 판매가 시작되었습니다.`;
        } else if (key === 'business/api' || key === 'business/api/raw' || key === 'business/api/intermediates') {
          contentVal = serializeBusinessApiData(parseBusinessApiData(contentVal));
        } else if (key === 'business/cdmo' || key === 'business/cdmo/quality' || key === 'business/cdmo/advantages' || key === 'business/cdmo/logistics') {
          contentVal = serializeBusinessCdmoData(parseBusinessCdmoData(contentVal));
        } else if (key === 'contact/careers/talent' && !contentVal) {
          contentVal = serializeTalentData(DEFAULT_TALENT_DATA);
        } else if (key === 'contact/careers/process' && !contentVal) {
          contentVal = serializeCareerProcessData(DEFAULT_CAREER_PROCESS_DATA);
        }
        setStaticContent(contentVal);
        setIsHidden(data.is_hidden === 1 || data.is_hidden === true);
      } else {
        let contentVal = '';
        if (key === 'about/greeting') {
          contentVal = `CEO 메시지 (CEO Message)|<h4><strong>신뢰와 혁신으로 열어가는 더 건강한 미래</strong></h4><p>다산제약 홈페이지를 방문해 주신 고객과 주주, 그리고 협력사 여러분을 진심으로 환영합니다</p><p>1996년 첫 발을 내딛은 다산제약은 '차별화된 의약품 연구개발'이라는 확고한 신념을 바탕으로 대한민국 제약 산업과 함께 성장해 왔습니다 우수한 제조 기술력과 엄격한 품질 관리를 기반으로 국내외 시장에서 두터운 신뢰를 쌓을 수 있었던 것은 모두 여러분의 변함없는 성원 덕분입니다</p><p>우리는 다산 정약용 선생의 실사구시 정신을 바탕으로 최첨단 제조 공정 도입과 선진화된 인프라 구축을 통해 글로벌 기준에 부합하는 의약품을 생산하고 있으며, 급변하는 제약 바이오 환경에 발맞추어 보다 신속하고 유연한 경영 체계를 확립해 나가고 있습니다</p><p>나아가 임직원 모두가 창의적으로 역량을 발휘할 수 있는 조직 문화를 바탕으로, 현장에서 창출된 가치를 고객 및 주주 여러분과 함께 나누며 건강한 사회를 만드는 데 기여하겠습니다</p><p>다산제약은 현실에 안주하지 않고, 질병으로 고통받는 이들에게 희망을 전하며 인류의 건강하고 행복한 삶에 기여하는 '글로벌 헬스케어 리더'로 끊임없이 도약할 것을 약속드립니다</p><p>새롭게 단장한 공간에서 다산제약이 열어갈 원대한 미래와 도전을 계속해서 따뜻한 시선으로 지켜봐 주시기 바랍니다</p><p>감사합니다</p>`;
        } else if (key === 'about/ci') {
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
          contentVal = `서울 사무실
경영총괄, 해외 영업본부, 마케팅 전략부서
37.5186,126.8906
다산제약 서울 사무실
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
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용
중국 선양연구소

41.6906,123.4779
다산제약 중국 선양연구소
Room 310, Building F9, Shangshengou Village, Hunnan District, Shenyang, Liaoning, 중국 110179

심양 트램 1·2호선 궈지롼젠위안(国际软件园, Shenyang Int’l Software Park)역 하차|심양 지하철 2호선 취안윈루(全运路)역 또는 백탑하(白塔河路)역 하차 후 차량/택시 이동
선양국제소프트웨어파크(Shenyang International Software Park) 방면 버스 이용|상성거우(上深沟, Shangshengou) 또는 소프트웨어파크 F동 인근 하차`;
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
          contentVal = serializeRdIntroData(DEFAULT_RD_INTRO_DATA);
        } else if (key === 'rd/activities') {
          contentVal = serializeRdActivitiesData(DEFAULT_RD_ACTIVITIES_DATA);
        } else if (key === 'business/finished/news') {
          contentVal = `신제품 출시|복합 고혈압 개량신약 '피마사탄/암로디핀' 출시 승인|자체 DDS 특허 서방성 과립 코팅 기술을 사용해 환자의 복용 크기를 축소시킨 고혈압 치료제 판매가 시작되었습니다.`;
        } else if (key === 'business/api' || key === 'business/api/raw' || key === 'business/api/intermediates') {
          contentVal = serializeBusinessApiData(DEFAULT_BUSINESS_API_DATA);
        } else if (key === 'business/cdmo' || key === 'business/cdmo/quality' || key === 'business/cdmo/advantages' || key === 'business/cdmo/logistics') {
          contentVal = serializeBusinessCdmoData(DEFAULT_BUSINESS_CDMO_DATA);
        } else if (key === 'contact/careers/talent') {
          contentVal = serializeTalentData(DEFAULT_TALENT_DATA);
        } else if (key === 'contact/careers/process') {
          contentVal = serializeCareerProcessData(DEFAULT_CAREER_PROCESS_DATA);
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

  const fetchPopups = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/management/popups');
      if (res.ok) {
        const data = await res.json();
        setPopups(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
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

  const fetchBackupLogs = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/backup/history');
      if (res.ok) {
        const data = await res.json();
        setBackupLogs(data.logs || []);
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

  // Phase Management Handlers
  const openPhaseManager = () => {
    setEditingPhases([...dynamicPhases]);
    setEditingHideProjectName(hideProjectName);
    setNewPhaseName('');
    setShowPhaseManager(true);
  };

  const handleAddPhase = () => {
    const trimmed = newPhaseName.trim();
    if (!trimmed) return;
    if (editingPhases.includes(trimmed)) {
      alert('이미 존재하는 단계입니다.');
      return;
    }
    setEditingPhases([...editingPhases, trimmed]);
    setNewPhaseName('');
  };

  const handleRemovePhase = (phase: string) => {
    if (!confirm(`'${phase}' 단계를 삭제하시겠습니까?\n주의: 차트에서 해당 단계가 사라지면 관련된 프로젝트 표시에 문제가 발생할 수 있습니다.`)) return;
    setEditingPhases(editingPhases.filter(p => p !== phase));
  };

  const handleMovePhase = (index: number, direction: 'up' | 'down') => {
    const newPhases = [...editingPhases];
    if (direction === 'up' && index > 0) {
      [newPhases[index - 1], newPhases[index]] = [newPhases[index], newPhases[index - 1]];
    } else if (direction === 'down' && index < newPhases.length - 1) {
      [newPhases[index], newPhases[index + 1]] = [newPhases[index + 1], newPhases[index]];
    }
    setEditingPhases(newPhases);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newPhases = [...editingPhases];
    const draggedItem = newPhases[draggedIndex];
    newPhases.splice(draggedIndex, 1);
    newPhases.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setEditingPhases(newPhases);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSavePhases = async () => {
    setIsSavingPhases(true);
    try {
      const res = await fetch('/api/pipeline/phases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phases: editingPhases, hideProjectName: editingHideProjectName }),
      });
      if (res.ok) {
        alert('설정이 성공적으로 저장되었습니다.');
        setDynamicPhases(editingPhases);
        setHideProjectName(editingHideProjectName);
        setShowPhaseManager(false);
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('저장 중 오류 발생');
    } finally {
      setIsSavingPhases(false);
    }
  };

  // Category Manager Functions
  const openCategoryManager = () => {
    setEditingCategories([...dynamicCategories]);
    setNewCategoryName('');
    setShowCategoryManager(true);
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (editingCategories.includes(trimmed)) {
      alert('이미 존재하는 분류입니다.');
      return;
    }
    setEditingCategories([...editingCategories, trimmed]);
    setNewCategoryName('');
  };

  const handleRemoveCategory = (cat: string) => {
    if (!confirm(`'${cat}' 분류를 삭제하시겠습니까?`)) return;
    setEditingCategories(editingCategories.filter(c => c !== cat));
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const newCats = [...editingCategories];
    if (direction === 'up' && index > 0) {
      [newCats[index - 1], newCats[index]] = [newCats[index], newCats[index - 1]];
    } else if (direction === 'down' && index < newCats.length - 1) {
      [newCats[index], newCats[index + 1]] = [newCats[index + 1], newCats[index]];
    }
    setEditingCategories(newCats);
  };

  const handleCatDragStart = (e: React.DragEvent, index: number) => {
    setDraggedCatIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleCatDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedCatIndex === null || draggedCatIndex === index) return;
    
    const newCats = [...editingCategories];
    const draggedItem = newCats[draggedCatIndex];
    newCats.splice(draggedCatIndex, 1);
    newCats.splice(index, 0, draggedItem);
    
    setDraggedCatIndex(index);
    setEditingCategories(newCats);
  };

  const handleCatDragEnd = () => {
    setDraggedCatIndex(null);
  };

  const handleSaveCategories = async () => {
    setIsSavingCategories(true);
    try {
      const res = await fetch('/api/pipeline/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: editingCategories }),
      });
      if (res.ok) {
        alert('분류 설정이 성공적으로 저장되었습니다.');
        setDynamicCategories(editingCategories);
        setShowCategoryManager(false);
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('저장 중 오류 발생');
    } finally {
      setIsSavingCategories(false);
    }
  };

  // Pipeline Row Drag and Drop Handlers
  const handlePipelineDragStart = (e: React.DragEvent, index: number) => {
    setDraggedPipelineIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handlePipelineDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedPipelineIndex === null || draggedPipelineIndex === index) return;

    const newPipelines = [...pipelines];
    const draggedItem = newPipelines[draggedPipelineIndex];
    newPipelines.splice(draggedPipelineIndex, 1);
    newPipelines.splice(index, 0, draggedItem);

    setDraggedPipelineIndex(index);
    setPipelines(newPipelines);
    setIsPipelineOrderChanged(true);
  };

  const handlePipelineDragEnd = () => {
    setDraggedPipelineIndex(null);
  };

  const handleResetPipelineOrder = async () => {
    await fetchPipelines();
    setIsPipelineOrderChanged(false);
  };

  const handleSavePipelineOrder = async () => {
    setIsSavingPipelineOrder(true);
    try {
      const orderedIds = pipelines.map(p => p.id);
      const res = await fetch('/api/pipeline', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds }),
      });
      if (res.ok) {
        alert('파이프라인 순서가 성공적으로 저장되었습니다.');
        setIsPipelineOrderChanged(false);
      } else {
        alert('순서 저장에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('순서 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSavingPipelineOrder(false);
    }
  };

  // Actions: Logout
  const handleLogout = async () => {
    cachedUser = null;
    cachedAuthChecked = false;
    cachedSidebarOpenKeys = null;
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

  // Email Resend Handlers
  const handleOpenResendModal = (inq: any) => {
    setResendInquiry(inq);
    const subject = inq?.subject || '';
    if (subject.startsWith('[상시 채용지원]') || subject.startsWith('[부패신고 문의]')) {
      setResendTargetEmail('insa@dspharm.com, jssong@dspharm.com');
    } else if (subject.startsWith('[영업 문의]') || subject.startsWith('[1:1 문의]')) {
      setResendTargetEmail('dssale1996@dspharm.com, jssong@dspharm.com');
    } else {
      setResendTargetEmail('jssong@dspharm.com');
    }
    setShowResendModal(true);
  };

  const handleConfirmResendEmail = async () => {
    if (!resendInquiry) return;
    setIsResendingEmail(true);
    try {
      const res = await fetch('/api/inquiries/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resendInquiry.id,
          targetEmail: resendTargetEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`메일이 성공적으로 재발송되었습니다!\n수신처: ${data.recipients}`);
        setShowResendModal(false);
      } else {
        alert(data.error || '메일 재발송에 실패했습니다.');
      }
    } catch (err: any) {
      console.error('Resend error:', err);
      alert('네트워크 오류가 발생했습니다: ' + (err.message || ''));
    } finally {
      setIsResendingEmail(false);
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
    setProdCategory('');
    setProdIngredient('');
    setProdContent('');
    setProdReferenceDrug('');
    setProdEfficacyDetail('');
    setProdAppearance('');
    setProdIngredientDetail('');
    setProdUsageCapacity('');
    setProdStorageMethod('');
    setProdPackagingUnit('');
    setProdInsuranceCode('');
    setProdInsurancePrice('');
    setProdPrecautions('');

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
    setPopupTitle('');
    setPopupContent('');
    setPopupLinkUrl('');
    setPopupStartDate('');
    setPopupEndDate('');
    setPopupIsActive(true);
    setPopupWidth(400);
    setPopupHeight(400);
    setPopupTop(100);
    setPopupLeft(100);

    setShowFormModal(true);
  };

  // 3. Open Modal for Edit
  const openEditModal = (item: any, type: 'product' | 'pipeline' | 'news' | 'popups') => {
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
      setProdCategory(item.category || '');
      setProdIngredient(item.ingredient || '');
      setProdContent(item.content || '');
      setProdReferenceDrug(item.reference_drug || '');
      setProdEfficacyDetail(item.efficacy_detail || '');
      setProdAppearance(item.appearance || '');
      setProdIngredientDetail(item.ingredient_detail || '');
      setProdUsageCapacity(item.usage_capacity || '');
      setProdStorageMethod(item.storage_method || '');
      setProdPackagingUnit(item.packaging_unit || '');
      setProdInsuranceCode(item.insurance_code || '');
      setProdInsurancePrice(item.insurance_price !== null && item.insurance_price !== undefined ? item.insurance_price : '');
      setProdPrecautions(item.precautions || '');
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
    } else if (currentSubPath === 'popups') {
      setPopupTitle(item.title);
      setPopupContent(item.content || '');
      setPopupLinkUrl(item.link_url || '');
      setPopupStartDate(item.start_date ? new Date(item.start_date).toISOString().slice(0, 10) : '');
      setPopupEndDate(item.end_date ? new Date(item.end_date).toISOString().slice(0, 10) : '');
      setPopupIsActive(!!item.is_active);
      setPopupWidth(item.width || 400);
      setPopupHeight(item.height || 400);
      setPopupTop(item.top_pos || 100);
      setPopupLeft(item.left_pos || 100);
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
        category: prodCategory,
        ingredient: prodIngredient,
        content: prodContent,
        reference_drug: prodReferenceDrug,
        efficacy_detail: prodEfficacyDetail,
        appearance: prodAppearance,
        ingredient_detail: prodIngredientDetail,
        usage_capacity: prodUsageCapacity,
        storage_method: prodStorageMethod,
        packaging_unit: prodPackagingUnit,
        insurance_code: prodInsuranceCode,
        insurance_price: prodInsurancePrice === '' ? null : prodInsurancePrice,
        precautions: prodPrecautions,
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
      currentSubPath === 'about/ir/news' ||
      currentSubPath === 'contact/careers/jobs'
    ) {
      if (currentSubPath === 'contact/newsroom/media' && !newsFileUrl) {
        alert('홍보사진 파일을 먼저 업로드해 주세요.');
        return;
      }
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
    } else if (currentSubPath === 'popups') {
      url = '/api/management/popups';
      bodyData = {
        title: popupTitle,
        content: popupContent,
        link_url: popupLinkUrl,
        start_date: popupStartDate || null,
        end_date: popupEndDate || null,
        is_active: popupIsActive ? 1 : 0,
        width: popupWidth,
        height: popupHeight,
        top_pos: popupTop,
        left_pos: popupLeft,
      };
      if (formMode === 'edit') {
        bodyData.id = activeItem.id;
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
          currentSubPath === 'about/ir/news' ||
          currentSubPath === 'contact/careers/jobs'
        ) {
          fetchNews(getNewsCategory(currentSubPath));
        }
        if (currentSubPath === 'popups') {
          fetchPopups();
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
      headers = ['번호', '분류', '프로젝트명', '적응증', '단계', '협력기관'];
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
    setSidebarOpenKeys(prev => {
      const updated = {
        ...prev,
        [key]: !prev[key]
      };
      cachedSidebarOpenKeys = updated;
      return updated;
    });
  };

  const filteredAdminProducts = useMemo(() => {
    let list = products;
    if (productSearchQuery.trim()) {
      const q = productSearchQuery.trim().toLowerCase();
      list = products.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.englishName && p.englishName.toLowerCase().includes(q)) ||
        (p.efficacy && p.efficacy.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ko'));
  }, [products, productSearchQuery]);

  const adminTotalPages = Math.ceil(filteredAdminProducts.length / adminProductsPerPage);
  const paginatedAdminProducts = filteredAdminProducts.slice((productCurrentPage - 1) * adminProductsPerPage, productCurrentPage * adminProductsPerPage);

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
            onClick={() => navigateTo('')}
            className="font-extrabold text-sm tracking-wider text-brand-green uppercase cursor-pointer hover:opacity-80 transition-opacity"
          >
            DASAN PHARM
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => navigateTo('')}
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
                if (currentUser?.username === 'editor3') {
                  if (grand.name !== 'Business') return null;
                  const filteredMajors = grand.majors
                    .filter((major) => major.name === '완제의약품')
                    .map((major) => ({
                      ...major,
                      subMenus: major.subMenus.filter(
                        (sub) => sub.link === '/business/finished/search'
                      ),
                    }));
                  return { ...grand, majors: filteredMajors };
                }
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
                      {grand.majors.map((major) => {
                        const hasSubMenus = major.subMenus && major.subMenus.length > 0;
                        const majorRelativeLink = major.link ? major.link.replace(/^\//, '') : '';
                        const isMajorActive = majorRelativeLink ? (
                          currentSubPath === majorRelativeLink ||
                          (majorRelativeLink === 'business/api/raw' && (currentSubPath === 'business/api' || currentSubPath === 'business/api/raw' || currentSubPath === 'business/api/intermediates')) ||
                          (majorRelativeLink === 'business/cdmo' && currentSubPath.startsWith('business/cdmo'))
                        ) : false;

                        if (!hasSubMenus && major.link) {
                          return (
                            <div key={major.name} className="space-y-0.5">
                              <button
                                onClick={() => navigateTo(majorRelativeLink)}
                                className={`w-full text-left py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border-l-[3px] flex items-center justify-between ${
                                  isMajorActive
                                    ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                                    : 'text-white hover:text-brand-green hover:bg-white/5 border-transparent pl-3.5'
                                }`}
                              >
                                <span>{major.name}</span>
                              </button>
                            </div>
                          );
                        }

                        return (
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
                                      onClick={() => navigateTo(relativeLink)}
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
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Custom SEO Settings Accordion */}
            {currentUser?.role !== 'connect_editor' && currentUser?.username !== 'editor3' && (
              <div className="pt-2.5 mt-2.5 border-t border-white/5 space-y-1">
                <button
                  onClick={() => {
                    setInquiryCategoryFilter('all');
                    navigateTo('inquiries');
                  }}
                  className={`w-full flex items-center justify-between py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border-l-[3px] ${
                    currentSubPath === 'inquiries' || currentSubPath === 'contact/inquiry/check'
                      ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)] pr-3'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5 pr-3'
                  }`}
                >
                  <span>1:1 문의 / 접수 관리</span>
                  {inquiries.length > 0 && (
                    <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded-full font-bold">
                      {inquiries.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigateTo('seo-settings')}
                  className={`w-full text-left py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer block border-l-[3px] ${
                    currentSubPath === 'seo-settings'
                      ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5'
                  }`}
                >
                  <span>SEO 설정 관리</span>
                </button>

                <button
                  onClick={() => navigateTo('popups')}
                  className={`w-full text-left py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer block border-l-[3px] ${
                    currentSubPath === 'popups'
                      ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5'
                  }`}
                >
                  <span>팝업 관리</span>
                </button>

                {/* Admin Users management (Super admin only) */}
                {currentUser?.role === 'super_admin' && (
                  <>
                    <button
                      onClick={() => navigateTo('admin-users')}
                      className={`w-full text-left py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer block border-l-[3px] ${
                        currentSubPath === 'admin-users'
                          ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5'
                      }`}
                    >
                      <span>관리자 계정 관리</span>
                    </button>

                    <button
                      onClick={() => navigateTo('backup-settings')}
                      className={`w-full text-left py-2 rounded-r-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer block border-l-[3px] ${
                        currentSubPath === 'backup-settings'
                          ? 'bg-gradient-to-r from-brand-green/15 via-brand-green/5 to-transparent text-brand-green border-brand-green font-extrabold pl-4 shadow-[inset_1px_0_10px_rgba(0,212,178,0.05)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent pl-3.5'
                      }`}
                    >
                      <span>백업 설정</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </nav>
        </aside>

        {/* Right Dashboard Area */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-[1800px] w-full min-w-0">
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
                  : currentSubPath === 'popups'
                  ? '팝업 관리'
                  : currentSubPath === 'admin-users'
                  ? '관리자 계정 관리'
                  : currentSubPath === 'backup-settings'
                  ? '백업 설정 관리'
                  : currentSubPath === 'inquiries' || currentSubPath === 'contact/inquiry/check'
                  ? '1:1 문의 / 접수 관리'
                  : navigationData
                      .flatMap(g => g.majors.flatMap(m => m.subMenus))
                      .find(s => s.link.replace(/^\//, '') === currentSubPath)?.name ||
                    navigationData
                      .flatMap(g => g.majors)
                      .find(m => m.link && (m.link.replace(/^\//, '') === currentSubPath || (currentSubPath.startsWith('business/api') && m.link.includes('business/api')) || (currentSubPath.startsWith('business/cdmo') && m.link.includes('business/cdmo'))))?.name || '관리자 메인'}
              </h2>
            </div>
             {/* Context Actions */}
             {(currentSubPath === 'business/finished/search' || 
               currentSubPath === 'rd/pipeline' ||
               currentSubPath === 'contact/newsroom/press' ||
               currentSubPath === 'contact/newsroom/media' ||
               currentSubPath === 'about/ir/news' ||
               currentSubPath === 'contact/careers/jobs') && (
               <div className="flex items-center space-x-2 ml-auto sm:ml-0">
                 {(currentUser?.role !== 'viewer' || (currentSubPath === 'business/finished/search' && currentUser?.username === 'editor3')) && (
                   <>
                     {currentSubPath === 'rd/pipeline' && (
                        <>
                          <button
                            onClick={handleResetPipelineOrder}
                             disabled={!isPipelineOrderChanged}
                             className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                               isPipelineOrderChanged
                                 ? 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer border border-white/20'
                                 : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed opacity-40'
                             }`}
                             title="저장 전 기존 순서로 되돌리기"
                           >
                             <RotateCcw size={14} />
                             <span>순서 초기화</span>
                           </button>
                           <button
                             onClick={handleSavePipelineOrder}
                             disabled={!isPipelineOrderChanged || isSavingPipelineOrder}
                             className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                               isPipelineOrderChanged
                                 ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer animate-pulse shadow-amber-500/20'
                                 : 'bg-white/10 text-gray-400 border border-white/10 cursor-not-allowed opacity-60'
                             }`}
                           >
                             <Save size={14} />
                             <span>{isSavingPipelineOrder ? '저장 중...' : '순서 저장'}</span>
                           </button>
                           <button
                             onClick={openCategoryManager}
                            className="inline-flex items-center space-x-1.5 bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                          >
                            <Layers size={14} />
                            <span>분류 설정</span>
                          </button>
                          <button
                            onClick={openPhaseManager}
                         className="inline-flex items-center space-x-1.5 bg-[#1F4E78] hover:bg-[#153a5b] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                       >
                         <Settings size={14} />
                         <span>단계 설정</span>
                          </button>
                        </>
                      )}
                     <button
                       onClick={openCreateModal}
                       className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                     >
                       <Plus size={14} />
                       <span>{currentSubPath === 'contact/newsroom/media' ? '새 홍보사진 등록' : '신규 등록'}</span>
                     </button>
                   </>
                 )}
                 <button
                   onClick={handleExportExcel}
                   className="inline-flex items-center space-x-1.5 bg-white/20 border border-white/30 hover:bg-white/30 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer shadow-sm"
                 >
                   <Download size={14} />
                   <span>엑셀 다운로드</span>
                 </button>
               </div>
             )}
          </div>

          {/* 3. Panel Switcher based on currentSubPath */}
          <div className={`w-full relative transition-opacity duration-150 ${loadingData ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
            {loadingData && (
              <div className="absolute top-0 right-0 z-30 flex items-center space-x-2 bg-[#0a1120]/90 border border-brand-green/30 text-brand-green px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md animate-pulse">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                <span>데이터 불러오는 중...</span>
              </div>
            )}
              
              {/* Case A: Products Manager */}
              {currentSubPath === 'business/finished/search' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center text-white text-sm font-bold">
                      총 제품수: <span className="text-brand-green ml-1">{filteredAdminProducts.length}</span>개
                      {productSearchQuery && (
                        <span className="text-xs text-gray-400 font-normal ml-2">
                          (전체 {products.length}개 중 {filteredAdminProducts.length}개 검색됨)
                        </span>
                      )}
                    </div>
                    <div className="relative w-full sm:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={15} />
                      <input
                        type="text"
                        placeholder="제품명 또는 영문명 검색 (예: 레 -> 레보드로프)..."
                        value={productSearchQuery}
                        onChange={(e) => {
                          setProductSearchQuery(e.target.value);
                          setProductCurrentPage(1);
                        }}
                        className="w-full bg-[#0d1527] border border-white/15 rounded-xl pl-9 pr-9 py-2 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-green/60 focus:ring-1 focus:ring-brand-green/30 transition-all shadow-inner"
                      />
                      {productSearchQuery && (
                        <button
                          onClick={() => {
                            setProductSearchQuery('');
                            setProductCurrentPage(1);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors"
                          title="검색어 초기화"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-4 w-[6%] text-center font-mono text-gray-400">NO</th>
                          <th className="px-5 py-4 w-[12%]">구분</th>
                          <th className="px-5 py-4 w-[25%]">제품명</th>
                          <th className="px-5 py-4 w-[24%]">영문명</th>
                          <th className="px-5 py-4 w-[20%]">효능/효과</th>
                          <th className="px-5 py-4 w-[13%] text-right">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                        {paginatedAdminProducts.length > 0 ? (
                          paginatedAdminProducts.map((p, index) => {
                            const itemIndex = (productCurrentPage - 1) * adminProductsPerPage + index + 1;
                            return (
                              <tr key={p.id} className="hover:bg-white/[0.02] border-b border-white/5 last:border-0 transition-colors">
                                <td className="px-4 py-4 text-center font-mono text-xs text-gray-400 font-bold">
                                  {itemIndex}
                                </td>
                                <td className="px-5 py-4">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                                    p.type === '전문의약품' 
                                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                      : 'bg-brand-green/20 text-brand-green border-brand-green/30'
                                  }`}>
                                    {p.type}
                                  </span>
                                </td>
                                <td className="px-5 py-4 font-bold text-white">
                                  {(currentUser?.role !== 'viewer' || currentUser?.username === 'editor3') ? (
                                    <span 
                                      onClick={() => openEditModal(p, 'product')}
                                      className="cursor-pointer hover:text-brand-green hover:underline transition-colors"
                                    >
                                      {p.name}
                                    </span>
                                  ) : (
                                    <span>{p.name}</span>
                                  )}
                                </td>
                                <td className="px-5 py-4 text-gray-500 font-mono text-xs">{p.englishName || '-'}</td>
                                <td className="px-5 py-4 text-xs text-gray-400">{p.efficacy}</td>
                                <td className="px-5 py-4 text-right space-x-2">
                                  {(currentUser?.role !== 'viewer' || currentUser?.username === 'editor3') && (
                                    <button
                                      onClick={() => openEditModal(p, 'product')}
                                      className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer inline-block"
                                    >
                                      <Edit size={14} />
                                    </button>
                                  )}
                                  {(currentUser?.role === 'super_admin' || currentUser?.username === 'editor3') && (
                                    <button
                                      onClick={() => handleDeleteItem(p.id, 'product')}
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
                            <td colSpan={6} className="text-center py-12 text-gray-500 text-xs">
                              등록된 완제의약품이 없습니다.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                {adminTotalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 pt-6">
                    {/* First Page Button << */}
                    <button
                      onClick={() => setProductCurrentPage(1)}
                      disabled={productCurrentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-xs"
                      title="첫 페이지"
                    >
                      &lt;&lt;
                    </button>

                    {/* Prev Page Button < */}
                    <button
                      onClick={() => setProductCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={productCurrentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="이전 페이지"
                    >
                      &lt;
                    </button>
                    
                    {Array.from({ length: adminTotalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setProductCurrentPage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                          productCurrentPage === page
                            ? 'bg-brand-green text-[#0a1120] border-transparent'
                            : 'border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Page Button > */}
                    <button
                      onClick={() => setProductCurrentPage(prev => Math.min(prev + 1, adminTotalPages))}
                      disabled={productCurrentPage === adminTotalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="다음 페이지"
                    >
                      &gt;
                    </button>

                    {/* Last Page Button >> */}
                    <button
                      onClick={() => setProductCurrentPage(adminTotalPages)}
                      disabled={productCurrentPage === adminTotalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-xs"
                      title="마지막 페이지"
                    >
                      &gt;&gt;
                    </button>
                  </div>
                )}
              </div>
              )}

              {/* Case B: Pipeline Manager */}
              {currentSubPath === 'rd/pipeline' && (
                <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-3 py-4 w-[40px] text-center">순서</th>
                          <th className="px-5 py-4 w-[18%]">분류</th>
                          {!hideProjectName && (
                            <th className="px-5 py-4 w-[20%]">프로젝트명</th>
                          )}
                          <th className="px-5 py-4 w-[25%]">적응증</th>
                          <th className="px-5 py-4 w-[15%]">단계</th>
                          <th className="px-5 py-4 w-[10%]">협력기관</th>
                          <th className="px-5 py-4 w-[10%] text-right">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                        {pipelines.length > 0 ? (
                          pipelines.map((p, idx) => (
                            <tr 
                              key={p.id} 
                              draggable={currentUser?.role !== 'viewer'}
                              onDragStart={(e) => handlePipelineDragStart(e, idx)}
                              onDragOver={(e) => handlePipelineDragOver(e, idx)}
                              onDragEnd={handlePipelineDragEnd}
                              className={`hover:bg-white/[0.04] border-b border-white/5 last:border-0 transition-colors select-none ${
                                draggedPipelineIndex === idx ? 'bg-brand-green/20 opacity-60 border-brand-green/50' : ''
                              }`}
                            >
                              <td className="px-3 py-4 text-center cursor-grab active:cursor-grabbing text-gray-500">
                                <GripVertical size={16} className="mx-auto text-gray-400 hover:text-white" />
                              </td>
                              <td className="px-5 py-4 font-bold text-white">
                                {currentUser?.role !== 'viewer' ? (
                                  <span 
                                    className="cursor-pointer hover:underline transition-colors"
                                    onClick={() => openEditModal(p, 'pipeline')}
                                  >
                                    {p.category}
                                  </span>
                                ) : (
                                  p.category
                                )}
                              </td>
                              {!hideProjectName && (
                                <td className="px-5 py-4 font-mono font-bold text-brand-green">
                                  {currentUser?.role !== 'viewer' ? (
                                    <span 
                                      className="cursor-pointer hover:underline transition-colors"
                                      onClick={() => openEditModal(p, 'pipeline')}
                                    >
                                      {p.project_name || '(미입력)'}
                                    </span>
                                  ) : (
                                    p.project_name || '-'
                                  )}
                                </td>
                              )}
                              <td className="px-5 py-4 text-gray-300 font-medium">
                                {currentUser?.role !== 'viewer' ? (
                                  <span 
                                    className="cursor-pointer hover:underline text-white font-bold transition-colors"
                                    onClick={() => openEditModal(p, 'pipeline')}
                                  >
                                    {p.disease}
                                  </span>
                                ) : (
                                  p.disease
                                )}
                              </td>
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
                        ) : currentSubPath === 'contact/newsroom/media' ? (
                          <tr>
                            <th className="px-5 py-4 w-[12%]">사진</th>
                            <th className="px-5 py-4 w-[48%]">홍보자료 제목</th>
                            <th className="px-5 py-4 w-[10%]">조회수</th>
                            <th className="px-5 py-4 w-[15%]">등록일</th>
                            <th className="px-5 py-4 w-[15%] text-right">관리</th>
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
                                ) : currentSubPath === 'contact/newsroom/media' ? (
                                  <>
                                    <td className="px-5 py-4">
                                      {n.file_url ? (
                                        <div className="w-16 h-11 rounded-lg overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center flex-shrink-0 shadow-sm">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={n.file_url}
                                            alt={n.title}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      ) : (
                                        <div className="w-16 h-11 rounded-lg border border-dashed border-white/10 bg-white/5 flex items-center justify-center text-gray-500 text-[10px]">
                                          사진 없음
                                        </div>
                                      )}
                                    </td>
                                    <td className="px-5 py-4 font-bold text-white">{n.title}</td>
                                    <td className="px-5 py-4 font-mono text-gray-500">{n.views}</td>
                                    <td className="px-5 py-4 text-xs text-gray-400">
                                      {new Date(n.created_at).toLocaleDateString()}
                                    </td>
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
              {(currentSubPath === 'inquiries' ||
                currentSubPath === 'contact/inquiry/check' ||
                currentSubPath === 'contact/inquiry' ||
                currentSubPath === 'contact/inquiry/sales' ||
                currentSubPath === 'contact/inquiry/corruption') && (
                <div className="space-y-4">
                  {(currentSubPath === 'inquiries' || currentSubPath === 'contact/inquiry/check') && (
                    <div className="flex items-center gap-2 pb-2 overflow-x-auto text-xs">
                      <button
                        onClick={() => setInquiryCategoryFilter('all')}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          inquiryCategoryFilter === 'all'
                            ? 'bg-brand-green text-gray-950 shadow-md font-extrabold'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        전체 ({inquiries.length})
                      </button>
                      <button
                        onClick={() => setInquiryCategoryFilter('careers')}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          inquiryCategoryFilter === 'careers'
                            ? 'bg-emerald-500 text-gray-950 shadow-md font-extrabold'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        상시 채용지원 ({inquiries.filter(i => i.subject.startsWith('[상시 채용지원]')).length})
                      </button>
                      <button
                        onClick={() => setInquiryCategoryFilter('product')}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          inquiryCategoryFilter === 'product'
                            ? 'bg-teal-400 text-gray-950 shadow-md font-extrabold'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        제품 문의 ({inquiries.filter(i => i.subject.startsWith('[제품 문의]')).length})
                      </button>
                      <button
                        onClick={() => setInquiryCategoryFilter('sales')}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          inquiryCategoryFilter === 'sales'
                            ? 'bg-cyan-400 text-gray-950 shadow-md font-extrabold'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        영업 문의 ({inquiries.filter(i => i.subject.startsWith('[영업 문의]')).length})
                      </button>
                      <button
                        onClick={() => setInquiryCategoryFilter('corruption')}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          inquiryCategoryFilter === 'corruption'
                            ? 'bg-rose-500 text-white shadow-md font-extrabold'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        부패신고 ({inquiries.filter(i => i.subject.startsWith('[부패신고 문의]')).length})
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Inquiries List */}
                  <div className="lg:col-span-2 bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="px-4 py-4 w-[25%]">작성자</th>
                            <th className="px-4 py-4 w-[43%]">제목</th>
                            <th className="px-4 py-4 w-[20%]">작성일</th>
                            <th className="px-4 py-4 w-[12%] text-right">관리</th>
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
                                        prefix === '상시 채용' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
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
                                    <div className="flex items-center justify-end space-x-1.5">
                                      <button
                                        onClick={() => handleOpenResendModal(inq)}
                                        className="text-gray-400 hover:text-emerald-400 p-1 cursor-pointer transition-colors"
                                        title="알림 메일 재발송"
                                      >
                                        <Mail size={14} />
                                      </button>
                                      {currentUser?.role === 'super_admin' ? (
                                        <button
                                          onClick={() => handleDeleteItem(inq.id, 'inquiry')}
                                          className="text-gray-500 hover:text-red-450 p-1 cursor-pointer transition-colors"
                                          title="삭제"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      ) : (
                                        <span className="text-[10px] text-gray-650">권한없음</span>
                                      )}
                                    </div>
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
                    <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
                        <span>문의내용 상세 확인</span>
                      </h3>
                      {selectedInquiry && (
                        <button
                          onClick={() => handleOpenResendModal(selectedInquiry)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shadow-xs hover:border-emerald-400"
                          title="담당자 알림 메일 재발송"
                        >
                          <Mail size={13} />
                          <span>메일 재발송</span>
                        </button>
                      )}
                    </div>

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
                                      prefix === '상시 채용' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
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

                        {selectedInquiry.file_url && (
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-gray-400 uppercase">첨부파일</span>
                              <span className="text-[10px] font-semibold text-emerald-400/90 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                🔒 영구 보관 (관리자 전용)
                              </span>
                            </div>
                            <a
                              href={selectedInquiry.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-colors w-full"
                            >
                              <span>📎</span>
                              <span className="truncate flex-1">{selectedInquiry.file_name || '첨부파일 다운로드'}</span>
                              <span className="text-[11px] text-emerald-400/80 font-normal">다운로드 ↗</span>
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-550 text-xs">
                        확인할 문의사항을 선택해 주세요.
                      </div>
                    )}
                  </div>
                </div>
                </div>
              )}

              {/* Case E: Static Text Content CMS Editor */}
              {currentSubPath !== '' && 
               currentSubPath !== 'business/finished/search' && 
               currentSubPath !== 'rd/pipeline' && 
               currentSubPath !== 'contact/newsroom/press' && 
               currentSubPath !== 'contact/newsroom/media' && 
               currentSubPath !== 'about/ir/news' && 
               currentSubPath !== 'contact/careers/jobs' && 
               currentSubPath !== 'contact/inquiry/check' && 
               currentSubPath !== 'contact/inquiry' && 
               currentSubPath !== 'contact/inquiry/sales' && 
               currentSubPath !== 'contact/inquiry/corruption' && 
               currentSubPath !== 'inquiries' && 
               currentSubPath !== 'admin-users' && 
               currentSubPath !== 'popups' && 
               currentSubPath !== 'backup-settings' && 
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

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Content Editor Form */}
                    <div className={`${
                      previewWidthMode === 'expanded' 
                        ? 'lg:col-span-4 2xl:col-span-3' 
                        : previewWidthMode === 'normal' 
                        ? 'lg:col-span-6 2xl:col-span-6' 
                        : 'lg:col-span-5 2xl:col-span-4'
                    } bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md space-y-4 text-white transition-all duration-300 min-w-0`}>
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
                            : currentSubPath === 'about/ci' ? 'CI 소개'
                            : currentSubPath === 'about/ir/announcement' ? '공시정보 관리'
                            : currentSubPath === 'about/ir/financial' ? '재무정보 관리'
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
                                  const body = parts.slice(1).join('|');
                                  setStaticContent(e.target.value + '|' + body);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                                placeholder="기업개요 제목을 입력하세요 (줄바꿈이 필요한 경우 \n 입력)."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 본문 내용 (Content)</label>
                              <div className="bg-white rounded-xl overflow-hidden text-gray-900">
                                <RichTextEditor
                                  value={(() => {
                                    const parts = (staticContent || '').split('|');
                                    const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
                                    return hasImg ? parts.slice(2).join('|') : parts.slice(1).join('|') || '';
                                  })()}
                                  onChange={(val) => {
                                    const parts = staticContent.split('|');
                                    const title = parts[0] || '';
                                    setStaticContent(title + '|' + val);
                                  }}
                                />
                              </div>
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
                         currentSubPath !== 'business/api' &&
                         currentSubPath !== 'business/api/raw' &&
                         currentSubPath !== 'business/api/intermediates' &&
                         currentSubPath !== 'business/cdmo' &&
                         currentSubPath !== 'business/cdmo/quality' &&
                         currentSubPath !== 'business/cdmo/advantages' &&
                         currentSubPath !== 'business/cdmo/logistics' &&
                         currentSubPath !== 'contact/careers/talent' &&
                         currentSubPath !== 'contact/careers/process' &&
                          currentSubPath !== 'about/esg/environment' &&
                          currentSubPath !== 'about/esg/safety' &&
                          currentSubPath !== 'about/esg/anti-corruption' && (
                          <div className="space-y-4">
                            {/* Case ESG: Ethics (지속가능경영) 대표 히어로 배너 사진 업로드 */}
                            {/* Case ESG: Code of Ethics (윤리강령) 대표 히어로 배너 사진 업로드 */}
                            {currentSubPath === 'about/esg/code-of-ethics' && (() => {
                              const parts = (staticContent || '').split('|');
                              const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
                              const currentHero = hasImg ? parts[1] : '/images/ethics_banner.jpg';
                              return (
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 mb-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                      <ImageIcon size={14} />
                                      <span>윤리강령 대표 비주얼 사진 (상단 21:9 와이드)</span>
                                    </span>
                                    <span className="text-[9px] text-gray-400">사용자 페이지 상단 와이드 화면에 노출됩니다</span>
                                  </div>
                                  <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-full sm:w-44 aspect-[21/9] rounded-lg overflow-hidden bg-slate-900 border border-white/15 relative shrink-0">
                                      <img
                                        src={currentHero}
                                        alt="Code of Ethics Hero Banner Preview"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          id="esg-ethics-code-upload"
                                          className="hidden"
                                          disabled={uploadingHeroBanner}
                                          onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            setUploadingHeroBanner(true);
                                            try {
                                              const formData = new FormData();
                                              formData.append('file', file);
                                              const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                              if (res.ok) {
                                                const data = await res.json();
                                                const curParts = (staticContent || '').split('|');
                                                const curTitle = curParts[0] || '윤리 강령';
                                                const curBody = curParts.length >= 3 && (curParts[1].startsWith('/') || curParts[1].startsWith('http')) ? curParts.slice(2).join('|') : curParts.slice(1).join('|');
                                                setStaticContent(`${curTitle}|${data.url}|${curBody}`);
                                              } else {
                                                alert('사진 업로드 실패');
                                              }
                                            } catch (err) {
                                              console.error(err);
                                              alert('업로드 중 오류 발생');
                                            } finally {
                                              setUploadingHeroBanner(false);
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor="esg-ethics-code-upload"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                        >
                                          <UploadCloud size={13} />
                                          <span>{uploadingHeroBanner ? '업로드 중...' : '대표 사진 업로드 / 변경'}</span>
                                        </label>
                                        {hasImg && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const curParts = (staticContent || '').split('|');
                                              const curTitle = curParts[0] || '윤리 강령';
                                              const curBody = curParts.slice(2).join('|');
                                              setStaticContent(`${curTitle}|${curBody}`);
                                            }}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors"
                                          >
                                            <RotateCcw size={12} />
                                            <span>기본 사진으로 복원</span>
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-[9px] text-gray-400">
                                        권장 규격: 21:9 와이드 비율 (1920x820px 이상 고해상도)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                            {currentSubPath === 'about/esg/ethics' && (() => {
                              const parts = (staticContent || '').split('|');
                              const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
                              const currentHero = hasImg ? parts[1] : '/images/ESG.jpg';
                              return (
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 mb-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                      <ImageIcon size={14} />
                                      <span>지속가능경영 대표 비주얼 사진 (상단 21:9 와이드)</span>
                                    </span>
                                    <span className="text-[9px] text-gray-400">사용자 페이지 상단 와이드 화면에 노출됩니다</span>
                                  </div>
                                  <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-full sm:w-44 aspect-[21/9] rounded-lg overflow-hidden bg-slate-900 border border-white/15 relative shrink-0">
                                      <img
                                        src={currentHero}
                                        alt="ESG Hero Banner Preview"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          id="esg-ethics-hero-upload"
                                          className="hidden"
                                          disabled={uploadingHeroBanner}
                                          onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            setUploadingHeroBanner(true);
                                            try {
                                              const formData = new FormData();
                                              formData.append('file', file);
                                              const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                              if (res.ok) {
                                                const data = await res.json();
                                                const curParts = (staticContent || '').split('|');
                                                const curTitle = curParts[0] || '지속가능경영 (ESG Management)';
                                                const curBody = curParts.length >= 3 && (curParts[1].startsWith('/') || curParts[1].startsWith('http')) ? curParts.slice(2).join('|') : curParts.slice(1).join('|');
                                                setStaticContent(`${curTitle}|${data.url}|${curBody}`);
                                              } else {
                                                alert('사진 업로드 실패');
                                              }
                                            } catch (err) {
                                              console.error(err);
                                              alert('업로드 중 오류 발생');
                                            } finally {
                                              setUploadingHeroBanner(false);
                                            }
                                          }}
                                        />
                                        <label
                                          htmlFor="esg-ethics-hero-upload"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                        >
                                          <UploadCloud size={13} />
                                          <span>{uploadingHeroBanner ? '업로드 중...' : '대표 사진 업로드 / 변경'}</span>
                                        </label>
                                        {hasImg && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const curParts = (staticContent || '').split('|');
                                              const curTitle = curParts[0] || '지속가능경영 (ESG Management)';
                                              const curBody = curParts.slice(2).join('|');
                                              setStaticContent(`${curTitle}|${curBody}`);
                                            }}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors"
                                          >
                                            <RotateCcw size={12} />
                                            <span>기본 사진으로 복원</span>
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-[9px] text-gray-400">
                                        권장 규격: 21:9 와이드 비율 (1920x820px 이상 고해상도)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">제목 (Title)</label>
                              <input
                                type="text"
                                value={staticContent.split('|')[0] || ''}
                                onChange={(e) => {
                                  const parts = (staticContent || '').split('|');
                                  const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
                                  if (hasImg) {
                                    parts[0] = e.target.value;
                                    setStaticContent(parts.join('|'));
                                  } else {
                                    if (parts.length < 2) parts.push('');
                                    parts[0] = e.target.value;
                                    setStaticContent(parts.join('|'));
                                  }
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] focus:shadow-md focus:shadow-brand-green/5 transition-all"
                                placeholder="제목을 입력하세요 (줄바꿈이 필요한 경우 \n 입력)."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">내용 (Content)</label>
                              <div className="min-h-[150px] bg-white text-gray-900 rounded-xl overflow-hidden border border-white/10">
                                <RichTextEditor
                                  value={staticContent.split('|').slice(1).join('|') || ''}
                                  onChange={(value) => {
                                    const parts = (staticContent || '').split('|');
                                    const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
                                    if (hasImg) {
                                      setStaticContent((parts[0] || '') + '|' + parts[1] + '|' + value);
                                    } else {
                                      setStaticContent((parts[0] || '') + '|' + value);
                                    }
                                  }}
                                  placeholder="내용을 입력하세요."
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CI 정적 페이지 */}
                        {currentSubPath === 'about/ci' && (
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">Corporate Identity</label>
                              <div className="bg-white rounded-xl overflow-hidden text-gray-900">
                                <RichTextEditor
                                  value={(staticContent || '').split('\n')[0] || ''}
                                  onChange={(val) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 0) lines.push('');
                                    lines[0] = val.replace(/\n/g, ''); // Replace newlines in HTML to prevent breaking DB structure
                                    setStaticContent(lines.join('\n'));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">심볼마크의 의미</label>
                              <div className="bg-white rounded-xl overflow-hidden text-gray-900">
                                <RichTextEditor
                                  value={(staticContent || '').split('\n')[1] || ''}
                                  onChange={(val) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 1) lines.push('');
                                    lines[1] = val.replace(/\n/g, ''); // Replace newlines in HTML to prevent breaking DB structure
                                    setStaticContent(lines.join('\n'));
                                  }}
                                />
                              </div>
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

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">Primary Logo 설명</label>
                              <div className="bg-white rounded-xl overflow-hidden text-gray-900">
                                <RichTextEditor
                                  value={(staticContent || '').split('\n')[11] || '다산제약 브랜드 아이덴티티를 대표하는 메인 로고입니다.<br/>다산제약의 기업 이미지를 일관되게 표현하는 가장 핵심적인 요소이므로, 적용 시 본 매뉴얼의 규정을 엄격하게 준수해야 합니다.'}
                                  onChange={(val) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 11) lines.push('');
                                    lines[11] = val.replace(/\n/g, '');
                                    setStaticContent(lines.join('\n'));
                                  }}
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">Clear Space 설명</label>
                              <div className="bg-white rounded-xl overflow-hidden text-gray-900">
                                <RichTextEditor
                                  value={(staticContent || '').split('\n')[13] || '로고 최상의 시각적 효과 가독성 및 식별을 보장하기 위해 단독 적용 시 최소 사용 여백을 유지해야 합니다. 표시된 심볼 주변 공간은 최소 여백을 나타내며 이 공간에는 다른 요소가 나타나지 않도록 적용하여야 합니다.<br/>(서브 로고형도 동일하게 적용합니다.)<br/><br/>최소 공간 규정의 기준 단위(X)는 심볼(육각형)의 절반 높이를 기준으로 설정한 가상선과 워드마크(DASAN) 상단 간의 거리에서 도출하였습니다. 이는 심볼과 워드마크간의 구조적 비례 관계를 반영한 값으로, 로고의 일체감과 시각적 균형을 유지하기 위한 기준입니다.'}
                                  onChange={(val) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 13) lines.push('');
                                    lines[13] = val.replace(/\n/g, '');
                                    setStaticContent(lines.join('\n'));
                                  }}
                                />
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

                            {/* Light Green Color System */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <span className="text-[10px] font-bold text-brand-green uppercase">DASAN LIGHT GREEN 색상 설정</span>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">색상명</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[14] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 14) lines.push('');
                                      lines[14] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="Dasan Light Green"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-gray-400 block">HEX 코드 (예: #8dc63f)</label>
                                  <input
                                    type="text"
                                    value={(staticContent || '').split('\n')[16] || ''}
                                    onChange={(e) => {
                                      const lines = (staticContent || '').split('\n');
                                      while (lines.length <= 16) lines.push('');
                                      lines[16] = e.target.value;
                                      setStaticContent(lines.join('\n'));
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="#8dc63f"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 block">RGB 및 HEX 전체 표기 (예: RGB: 141, 198, 63 | HEX: #8dc63f)</label>
                                <input
                                  type="text"
                                  value={(staticContent || '').split('\n')[15] || ''}
                                  onChange={(e) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 15) lines.push('');
                                    lines[15] = e.target.value;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="RGB: 141, 198, 63 | HEX: #8dc63f"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 block">색상 설명</label>
                                <input
                                  type="text"
                                  value={(staticContent || '').split('\n')[17] || ''}
                                  onChange={(e) => {
                                    const lines = (staticContent || '').split('\n');
                                    while (lines.length <= 17) lines.push('');
                                    lines[17] = e.target.value;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="자연, 치유, 역동적인 에너지 상징"
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
                            {/* 글로벌 인프라 대표 히어로 배너 사진 업로드 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                  <ImageIcon size={14} />
                                  <span>글로벌 인프라 대표 비주얼 사진 (상단 21:9 와이드)</span>
                                </span>
                                <span className="text-[9px] text-gray-400">사용자 페이지 상단 와이드 화면에 노출됩니다</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-full sm:w-44 aspect-[21/9] rounded-lg overflow-hidden bg-slate-900 border border-white/15 relative shrink-0">
                                  <img
                                    src={(staticContent || '').split('\n')[15] || '/global_infrastructure_highway.jpg'}
                                    alt="Facilities Banner Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id="facilities-hero-upload"
                                      className="hidden"
                                      disabled={uploadingHeroBanner}
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setUploadingHeroBanner(true);
                                        try {
                                          const formData = new FormData();
                                          formData.append('file', file);
                                          const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                          if (res.ok) {
                                            const data = await res.json();
                                            const lines = (staticContent || '').split('\n');
                                            while (lines.length <= 15) lines.push('');
                                            lines[15] = data.url;
                                            setStaticContent(lines.join('\n'));
                                          } else {
                                            alert('사진 업로드 실패');
                                          }
                                        } catch (err) {
                                          console.error(err);
                                          alert('업로드 중 오류 발생');
                                        } finally {
                                          setUploadingHeroBanner(false);
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor="facilities-hero-upload"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                    >
                                      <UploadCloud size={13} />
                                      <span>{uploadingHeroBanner ? '업로드 중...' : '대표 사진 업로드 / 변경'}</span>
                                    </label>
                                    {((staticContent || '').split('\n')[15]) && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const lines = (staticContent || '').split('\n');
                                          lines[15] = '';
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors"
                                      >
                                        <RotateCcw size={12} />
                                        <span>기본 사진으로 복원</span>
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-[9px] text-gray-400">
                                    권장 규격: 21:9 와이드 비율 (1920x820px 이상 고해상도)
                                  </p>
                                </div>
                              </div>
                            </div>
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
                            {/* 찾아오시는 길 대표 히어로 배너 사진 업로드 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                  <ImageIcon size={14} />
                                  <span>찾아오시는 길 대표 비주얼 사진 (상단 21:9 와이드)</span>
                                </span>
                                <span className="text-[9px] text-gray-400">사용자 페이지 상단 와이드 화면에 노출됩니다</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-full sm:w-44 aspect-[21/9] rounded-lg overflow-hidden bg-slate-900 border border-white/15 relative shrink-0">
                                  <img
                                    src={(() => {
                                      const lines = (staticContent || '').split('\n');
                                      const l40 = lines[40]?.trim();
                                      if (l40 && (l40.startsWith('/') || l40.startsWith('http'))) return l40;
                                      const l32 = lines[32]?.trim();
                                      if (l32 && (l32.startsWith('/uploads/') || l32.startsWith('http'))) return l32;
                                      return '/location_hero.jpg';
                                    })()}
                                    alt="Location Banner Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id="location-hero-upload"
                                      className="hidden"
                                      disabled={uploadingHeroBanner}
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setUploadingHeroBanner(true);
                                        try {
                                          const formData = new FormData();
                                          formData.append('file', file);
                                          const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                          if (res.ok) {
                                            const data = await res.json();
                                            const lines = (staticContent || '').split('\n');
                                            while (lines.length <= 40) lines.push('');
                                            lines[40] = data.url;
                                            setStaticContent(lines.join('\n'));
                                          } else {
                                            alert('사진 업로드 실패');
                                          }
                                        } catch (err) {
                                          console.error(err);
                                          alert('업로드 중 오류 발생');
                                        } finally {
                                          setUploadingHeroBanner(false);
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor="location-hero-upload"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                    >
                                      <UploadCloud size={13} />
                                      <span>{uploadingHeroBanner ? '업로드 중...' : '대표 사진 업로드 / 변경'}</span>
                                    </label>
                                    {(() => {
                                      const lines = (staticContent || '').split('\n');
                                      const l40 = lines[40]?.trim();
                                      const l32 = lines[32]?.trim();
                                      const hasCustom = (l40 && (l40.startsWith('/') || l40.startsWith('http')) && l40 !== '/location_hero.jpg') ||
                                                        (l32 && (l32.startsWith('/uploads/') || l32.startsWith('http')));
                                      if (!hasCustom) return null;
                                      return (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const lines = (staticContent || '').split('\n');
                                            while (lines.length <= 40) lines.push('');
                                            lines[40] = '/location_hero.jpg';
                                            if (lines[32] && (lines[32].startsWith('/uploads/') || lines[32].startsWith('http'))) {
                                              lines[32] = '중국 선양연구소';
                                            }
                                            setStaticContent(lines.join('\n'));
                                          }}
                                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                                        >
                                          <RotateCcw size={12} />
                                          <span>기본 사진으로 복원</span>
                                        </button>
                                      );
                                    })()}
                                  </div>
                                  <p className="text-[9px] text-gray-400">
                                    권장 규격: 21:9 와이드 비율 (1920x820px 이상 고해상도)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 block mb-2">
                              총 5개의 지점 정보를 관리합니다. 각 지점별로 상세한 정보를 정확히 입력해주세요.
                            </span>

                            {[0, 1, 2, 3, 4].map((locIdx) => {
                              const offset = locIdx * 8;
                              const titleColor = locIdx === 0 ? 'text-brand-teal' : locIdx === 1 ? 'text-brand-blue' : locIdx === 2 ? 'text-brand-green' : locIdx === 3 ? 'text-brand-cyan' : 'text-amber-400';
                              const labelPrefix = locIdx === 0 ? '서울 사무실' : locIdx === 1 ? '수원 R&D 중앙연구소' : locIdx === 2 ? '아산 제1공장' : locIdx === 3 ? '아산 제2공장' : '중국 선양연구소';

                              return (
                                <div key={locIdx} className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-4">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span className={`text-xs font-bold uppercase ${titleColor}`}>{labelPrefix} 설정</span>
                                    <span className="text-[10px] text-gray-400">지점 #{locIdx + 1}</span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[11px] text-gray-400 block font-semibold">지점 명칭 (예: 서울 사무실)</label>
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
                                      <label className="text-[11px] text-gray-400 block font-semibold">지도 마커 표시명 (예: 다산제약 서울 사무실)</label>
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
                        {currentSubPath === 'about/ir/announcement' && (() => {
                          const parts = (staticContent || '').split('|');
                          const titleVal = parts[0] || '';
                          const descVal = parts[1] || '';
                          const dartUrlVal = parts[2] || '';

                          const updateAnnouncement = (idx: number, val: string) => {
                            const newParts = (staticContent || '').split('|');
                            while (newParts.length < 3) newParts.push('');
                            newParts[idx] = val;
                            setStaticContent(newParts.join('|'));
                          };

                          return (
                            <div className="space-y-5">
                              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                <span className="text-[11px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                  <LineChart size={14} />
                                  <span>DART 전자공시 시스템 연동 설정</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm('기본 DART 공시정보 설정값으로 복원하시겠습니까?')) {
                                      setStaticContent(DEFAULT_ANNOUNCEMENT_CONTENT);
                                    }
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={12} />
                                  <span>기본값 복원</span>
                                </button>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-300 block">
                                  공시정보 페이지 타이틀
                                </label>
                                <input
                                  type="text"
                                  value={titleVal}
                                  onChange={(e) => updateAnnouncement(0, e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="주주 중심 경영과 공정한 기업 가치 평가"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-300 block">
                                  설명 문구 (Description)
                                </label>
                                <textarea
                                  value={descVal}
                                  onChange={(e) => updateAnnouncement(1, e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs md:text-sm text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[90px] leading-relaxed resize-y"
                                  placeholder="다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여..."
                                />
                                <span className="text-[10px] text-gray-500 block">
                                  문장 끝 마침표(.) 뒤에서 사용자 페이지에 맞게 자연스럽게 줄바꿈됩니다.
                                </span>
                              </div>

                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2.5">
                                <label className="text-[11px] font-bold text-brand-cyan block">
                                  금융감독원 DART 공시 Iframe 주소 (URL)
                                </label>
                                <input
                                  type="text"
                                  value={dartUrlVal}
                                  onChange={(e) => updateAnnouncement(2, e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-brand-green font-mono outline-none focus:border-brand-green transition-all"
                                  placeholder="https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD"
                                />
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-[10px] text-gray-400">
                                    DART 기업 IR 전용 검색 URL 또는 외부 공시 링크를 입력하세요.
                                  </span>
                                  {dartUrlVal && (
                                    <a
                                      href={dartUrlVal}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 underline font-medium"
                                    >
                                      <Globe size={12} />
                                      <span>새 창에서 링크 확인</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* 재무정보 정적 페이지 */}
                        {currentSubPath === 'about/ir/financial' && (() => {
                          const lines = (staticContent || '').split('\n');
                          while (lines.length < 37) lines.push('');
                          
                          const titleVal = lines[0] || '';
                          const descVal = lines[1] || '';
                          const headers = (lines[2] || '').split('|').map(s => s.trim());
                          while (headers.length < 3) headers.push('');

                          const updateFinancialLine = (lineIdx: number, colIdx: number, val: string) => {
                            const newLines = (staticContent || '').split('\n');
                            while (newLines.length < 37) newLines.push('');
                            const parts = (newLines[lineIdx] || '').split('|').map(s => s.trim());
                            while (parts.length < 4) parts.push('');
                            parts[colIdx] = val;
                            newLines[lineIdx] = parts.join(' | ');
                            setStaticContent(newLines.join('\n'));
                          };

                          const updateFinancialHeader = (colIdx: number, val: string) => {
                            const newLines = (staticContent || '').split('\n');
                            while (newLines.length < 37) newLines.push('');
                            const currentHeaders = (newLines[2] || '').split('|').map(s => s.trim());
                            while (currentHeaders.length < 3) currentHeaders.push('');
                            currentHeaders[colIdx] = val;
                            newLines[2] = currentHeaders.join(' | ');
                            setStaticContent(newLines.join('\n'));
                          };

                          const updateFinancialTitle = (val: string) => {
                            const newLines = (staticContent || '').split('\n');
                            while (newLines.length < 37) newLines.push('');
                            newLines[0] = val;
                            setStaticContent(newLines.join('\n'));
                          };

                          const updateFinancialDesc = (val: string) => {
                            const newLines = (staticContent || '').split('\n');
                            while (newLines.length < 37) newLines.push('');
                            newLines[1] = val;
                            setStaticContent(newLines.join('\n'));
                          };

                          const financialEditorTabs: { key: typeof financialEditorTab; label: string; count?: number }[] = [
                            { key: 'summary', label: '핵심 실적 (3개년)' },
                            { key: 'cons_bs', label: '연결 재무상태표', count: 12 },
                            { key: 'sep_bs', label: '별도 재무상태표', count: 11 },
                            { key: 'cons_is', label: '연결 손익계산서', count: 4 },
                            { key: 'sep_is', label: '별도 손익계산서', count: 4 }
                          ];

                          const renderRowInputs = (lineIdx: number, defaultLabel: string, isHighlighted: boolean = false) => {
                            const parts = (lines[lineIdx] || '').split('|').map(s => s.trim());
                            const label = parts[0] || defaultLabel;
                            const v1 = parts[1] || '';
                            const v2 = parts[2] || '';
                            const v3 = parts[3] || '';

                            return (
                              <tr key={lineIdx} className={isHighlighted ? 'bg-brand-green/10 border-t border-b border-brand-green/30' : 'hover:bg-white/[0.02]'}>
                                <td className="p-1.5 w-1/4">
                                  <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => updateFinancialLine(lineIdx, 0, e.target.value)}
                                    className={`w-full bg-white/5 border ${isHighlighted ? 'border-brand-green/40 text-brand-green font-bold' : 'border-white/10 text-white font-medium'} rounded p-1.5 text-xs outline-none focus:border-brand-green`}
                                    placeholder={defaultLabel}
                                  />
                                </td>
                                <td className="p-1.5 w-1/4">
                                  <input
                                    type="text"
                                    value={v1}
                                    onChange={(e) => updateFinancialLine(lineIdx, 1, e.target.value)}
                                    className={`w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs ${isHighlighted ? 'text-brand-green font-bold' : 'text-gray-200'} text-center outline-none focus:border-brand-green`}
                                    placeholder="금액"
                                  />
                                </td>
                                <td className="p-1.5 w-1/4">
                                  <input
                                    type="text"
                                    value={v2}
                                    onChange={(e) => updateFinancialLine(lineIdx, 2, e.target.value)}
                                    className={`w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs ${isHighlighted ? 'text-brand-green font-bold' : 'text-gray-200'} text-center outline-none focus:border-brand-green`}
                                    placeholder="금액"
                                  />
                                </td>
                                <td className="p-1.5 w-1/4">
                                  <input
                                    type="text"
                                    value={v3}
                                    onChange={(e) => updateFinancialLine(lineIdx, 3, e.target.value)}
                                    className={`w-full bg-white/5 border border-white/10 rounded p-1.5 text-xs ${isHighlighted ? 'text-brand-green font-bold' : 'text-gray-200'} text-center outline-none focus:border-brand-green`}
                                    placeholder="금액"
                                  />
                                </td>
                              </tr>
                            );
                          };

                          return (
                            <div className="space-y-5">
                              {/* Header & Reset Button */}
                              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                <span className="text-[11px] font-bold text-brand-cyan uppercase flex items-center gap-1.5">
                                  <LineChart size={14} />
                                  <span>재무제표 데이터 편집 (단위: 백만원)</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm('기본 37라인 재무제표 전체 데이터로 복원하시겠습니까?')) {
                                      setStaticContent(DEFAULT_FINANCIAL_CONTENT);
                                    }
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={12} />
                                  <span>기본값 복원</span>
                                </button>
                              </div>

                              {/* Sub-tab Navigation */}
                              <div className="flex flex-wrap gap-1.5 p-1 bg-black/30 rounded-xl border border-white/10">
                                {financialEditorTabs.map((t) => {
                                  const isActive = financialEditorTab === t.key;
                                  return (
                                    <button
                                      key={t.key}
                                      type="button"
                                      onClick={() => setFinancialEditorTab(t.key)}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        isActive
                                          ? 'bg-brand-green text-white shadow-sm'
                                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                                      }`}
                                    >
                                      <span>{t.label}</span>
                                      {t.count && (
                                        <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-gray-400'}`}>
                                          {t.count}
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Tab Content 1: Summary */}
                              {financialEditorTab === 'summary' && (
                                <div className="space-y-4">
                                  <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-300 block">재무정보 타이틀</label>
                                    <input
                                      type="text"
                                      value={titleVal}
                                      onChange={(e) => updateFinancialTitle(e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                      placeholder="주주 중심 경영과 공정한 기업 가치 평가"
                                    />
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-300 block">설명 문구 (Description)</label>
                                    <textarea
                                      value={descVal}
                                      onChange={(e) => updateFinancialDesc(e.target.value)}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs md:text-sm text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all min-h-[80px] leading-relaxed resize-y"
                                      placeholder="다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여..."
                                    />
                                    <span className="text-[10px] text-gray-500 block">
                                      문장 끝 마침표(.) 뒤에서 사용자 페이지에 맞게 자연스럽게 줄바꿈됩니다.
                                    </span>
                                  </div>

                                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                    <span className="text-[11px] font-bold text-brand-green uppercase block">3개년 연도 표기 설정</span>
                                    <div className="grid grid-cols-3 gap-2">
                                      {[0, 1, 2].map((colIdx) => (
                                        <div key={colIdx} className="space-y-1">
                                          <label className="text-[10px] text-gray-400 block">{colIdx + 1}차년도 라벨</label>
                                          <input
                                            type="text"
                                            value={headers[colIdx] || ''}
                                            onChange={(e) => updateFinancialHeader(colIdx, e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white text-center font-bold outline-none focus:border-brand-green"
                                            placeholder={`202${3 + colIdx}년`}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                    <span className="text-[11px] font-bold text-brand-cyan uppercase block">핵심 경영 실적 요약 테이블</span>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-xs text-left min-w-[450px]">
                                        <thead>
                                          <tr className="border-b border-white/10 text-gray-400">
                                            <th className="p-2 w-1/4">재무 항목</th>
                                            <th className="p-2 w-1/4 text-center">{headers[0] || '1차년도'}</th>
                                            <th className="p-2 w-1/4 text-center">{headers[1] || '2차년도'}</th>
                                            <th className="p-2 w-1/4 text-center">{headers[2] || '3차년도'}</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                          {renderRowInputs(3, '매출액', true)}
                                          {renderRowInputs(4, '영업이익', true)}
                                          {renderRowInputs(5, 'R&D 투자액', false)}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Tab Content 2: Consolidated BS (12 rows: lines 6 to 17) */}
                              {financialEditorTab === 'cons_bs' && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">연결 재무상태표 (12개 항목)</span>
                                    <span className="text-[10px] text-gray-400">단위: 백만원</span>
                                  </div>
                                  <div className="overflow-x-auto bg-white/5 p-3 rounded-xl border border-white/10">
                                    <table className="w-full text-xs text-left min-w-[480px]">
                                      <thead>
                                        <tr className="border-b border-white/10 text-gray-400">
                                          <th className="p-2 w-1/4">구분</th>
                                          <th className="p-2 w-1/4 text-center">{headers[0] || '1차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[1] || '2차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[2] || '3차년도'}</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-white/5">
                                        {[
                                          { idx: 6, label: '유동자산', highlight: false },
                                          { idx: 7, label: '비유동자산', highlight: false },
                                          { idx: 8, label: '자산총계', highlight: true },
                                          { idx: 9, label: '유동부채', highlight: false },
                                          { idx: 10, label: '비유동부채', highlight: false },
                                          { idx: 11, label: '부채총계', highlight: true },
                                          { idx: 12, label: '자본금', highlight: false },
                                          { idx: 13, label: '자본잉여금', highlight: false },
                                          { idx: 14, label: '기타자본', highlight: false },
                                          { idx: 15, label: '이익잉여금', highlight: false },
                                          { idx: 16, label: '비지배지분', highlight: false },
                                          { idx: 17, label: '자본총계', highlight: true },
                                        ].map(item => renderRowInputs(item.idx, item.label, item.highlight))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              {/* Tab Content 3: Separate BS (11 rows: lines 18 to 28) */}
                              {financialEditorTab === 'sep_bs' && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">별도 재무상태표 (11개 항목)</span>
                                    <span className="text-[10px] text-gray-400">단위: 백만원</span>
                                  </div>
                                  <div className="overflow-x-auto bg-white/5 p-3 rounded-xl border border-white/10">
                                    <table className="w-full text-xs text-left min-w-[480px]">
                                      <thead>
                                        <tr className="border-b border-white/10 text-gray-400">
                                          <th className="p-2 w-1/4">구분</th>
                                          <th className="p-2 w-1/4 text-center">{headers[0] || '1차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[1] || '2차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[2] || '3차년도'}</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-white/5">
                                        {[
                                          { idx: 18, label: '유동자산', highlight: false },
                                          { idx: 19, label: '비유동자산', highlight: false },
                                          { idx: 20, label: '자산총계', highlight: true },
                                          { idx: 21, label: '유동부채', highlight: false },
                                          { idx: 22, label: '비유동부채', highlight: false },
                                          { idx: 23, label: '부채총계', highlight: true },
                                          { idx: 24, label: '자본금', highlight: false },
                                          { idx: 25, label: '자본잉여금', highlight: false },
                                          { idx: 26, label: '기타자본', highlight: false },
                                          { idx: 27, label: '이익잉여금', highlight: false },
                                          { idx: 28, label: '자본총계', highlight: true },
                                        ].map(item => renderRowInputs(item.idx, item.label, item.highlight))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              {/* Tab Content 4: Consolidated IS (4 rows: lines 29 to 32) */}
                              {financialEditorTab === 'cons_is' && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">연결 손익계산서 (4개 항목)</span>
                                    <span className="text-[10px] text-gray-400">단위: 백만원</span>
                                  </div>
                                  <div className="overflow-x-auto bg-white/5 p-3 rounded-xl border border-white/10">
                                    <table className="w-full text-xs text-left min-w-[480px]">
                                      <thead>
                                        <tr className="border-b border-white/10 text-gray-400">
                                          <th className="p-2 w-1/4">구분</th>
                                          <th className="p-2 w-1/4 text-center">{headers[0] || '1차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[1] || '2차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[2] || '3차년도'}</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-white/5">
                                        {[
                                          { idx: 29, label: '매출액', highlight: false },
                                          { idx: 30, label: '영업이익', highlight: true },
                                          { idx: 31, label: '법인세차감전순이익', highlight: false },
                                          { idx: 32, label: '당기순이익', highlight: true },
                                        ].map(item => renderRowInputs(item.idx, item.label, item.highlight))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              {/* Tab Content 5: Separate IS (4 rows: lines 33 to 36) */}
                              {financialEditorTab === 'sep_is' && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white">별도 손익계산서 (4개 항목)</span>
                                    <span className="text-[10px] text-gray-400">단위: 백만원</span>
                                  </div>
                                  <div className="overflow-x-auto bg-white/5 p-3 rounded-xl border border-white/10">
                                    <table className="w-full text-xs text-left min-w-[480px]">
                                      <thead>
                                        <tr className="border-b border-white/10 text-gray-400">
                                          <th className="p-2 w-1/4">구분</th>
                                          <th className="p-2 w-1/4 text-center">{headers[0] || '1차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[1] || '2차년도'}</th>
                                          <th className="p-2 w-1/4 text-center">{headers[2] || '3차년도'}</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-white/5">
                                        {[
                                          { idx: 33, label: '매출액', highlight: false },
                                          { idx: 34, label: '영업이익', highlight: true },
                                          { idx: 35, label: '법인세차감전순이익', highlight: false },
                                          { idx: 36, label: '당기순이익', highlight: true },
                                        ].map(item => renderRowInputs(item.idx, item.label, item.highlight))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* 연구소 소개 정적 페이지 */}
                        {currentSubPath === 'rd/intro' && (() => {
                          const rdData = parseRdIntroData(staticContent);
                          const updateRdIntro = (updater: (prev: RdIntroData) => RdIntroData) => {
                            const next = updater(rdData);
                            setStaticContent(serializeRdIntroData(next));
                          };

                          return (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <div>
                                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Sparkles size={16} className="text-brand-green" />
                                    연구소 소개 콘텐츠 설정
                                  </h3>
                                  <p className="text-[11px] text-gray-400 mt-0.5">
                                    헤어로 비전, 중앙연구소 소개, 핵심 연구 분야를 실시간 편집합니다.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setStaticContent(serializeRdIntroData(DEFAULT_RD_INTRO_DATA))}
                                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={12} />
                                  기본값 복원
                                </button>
                              </div>

                              {/* 1. 헤어로 비전 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">1. 헤어로 비전 (Hero & Vision)</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">메인 헤드라인 (Main Headline)</label>
                                  <input
                                    type="text"
                                    value={rdData.heroTitle}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, heroTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                    placeholder="다산제약은 글로벌 경쟁력을 갖춘 연구소로 거듭납니다."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">서브 설명문 (Sub Headline)</label>
                                  <textarea
                                    value={rdData.heroSubtitle}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                    placeholder="연구개발(R&D)부터 판매까지의 전주기 인프라를 바탕으로 차별화된 제제 기술과 고부가가치 사업 성장성을 확보하고 있습니다."
                                  />
                                </div>
                              </div>

                              {/* 2. 중앙연구소 소개 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">2. 중앙연구소 소개 (Central Research Institute)</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">섹션 타이틀</label>
                                  <input
                                    type="text"
                                    value={rdData.centerTitle}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, centerTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                    placeholder="중앙 연구소"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">소개 본문 문단 1 (연구인력 & 종합 역량)</label>
                                  <textarea
                                    value={rdData.centerDesc1}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, centerDesc1: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[90px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                    placeholder="다산제약의 중앙연구소는 50여명의 석·박사급 연구인력을 중심으로..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">소개 본문 문단 2 (설비 & 분석 인프라)</label>
                                  <textarea
                                    value={rdData.centerDesc2}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, centerDesc2: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[90px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                    placeholder="또한 연구소 내에 30L 규모 Pilot-scale의 다목적 합성 반응 시스템과..."
                                  />
                                </div>

                                <div className="space-y-2 pt-2 border-t border-white/10">
                                  <label className="text-[11px] font-bold text-gray-400 block">4대 연구 역량 하이라이트 카드</label>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {rdData.features.map((feat, fIdx) => (
                                      <div key={fIdx} className="p-3 rounded-lg bg-black/20 border border-white/10 space-y-2">
                                        <span className="text-[10px] font-bold text-brand-green uppercase">{feat.category}</span>
                                        <input
                                          type="text"
                                          value={feat.title}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newFeatures = [...prev.features];
                                            newFeatures[fIdx] = { ...newFeatures[fIdx], title: e.target.value };
                                            return { ...prev, features: newFeatures };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                          placeholder="카드 제목"
                                        />
                                        <textarea
                                          value={feat.desc}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newFeatures = [...prev.features];
                                            newFeatures[fIdx] = { ...newFeatures[fIdx], desc: e.target.value };
                                            return { ...prev, features: newFeatures };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[50px]"
                                          placeholder="카드 설명"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* 3. 첨단 과학의 선도 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">3. 첨단 과학의 선도 섹션</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">섹션 타이틀</label>
                                  <input
                                    type="text"
                                    value={rdData.scienceSectionTitle}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, scienceSectionTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">섹션 설명문</label>
                                  <input
                                    type="text"
                                    value={rdData.scienceSectionDesc}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, scienceSectionDesc: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                  />
                                </div>
                                <div className="space-y-2 pt-2 border-t border-white/10">
                                  <label className="text-[11px] font-bold text-gray-400 block">3대 첨단 과학 카드</label>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {rdData.scienceCards.map((card, cIdx) => (
                                      <div key={cIdx} className="p-3 rounded-lg bg-black/20 border border-white/10 space-y-2">
                                        <span className="text-[10px] font-bold text-brand-green">카드 {cIdx + 1}</span>
                                        <input
                                          type="text"
                                          value={card.title}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newCards = [...prev.scienceCards];
                                            newCards[cIdx] = { ...newCards[cIdx], title: e.target.value };
                                            return { ...prev, scienceCards: newCards };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                          placeholder="카드 제목"
                                        />
                                        <textarea
                                          value={card.desc}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newCards = [...prev.scienceCards];
                                            newCards[cIdx] = { ...newCards[cIdx], desc: e.target.value };
                                            return { ...prev, scienceCards: newCards };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                          placeholder="카드 설명"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* 4. 인재 육성 및 연구 인프라 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">4. 인재 육성 및 연구 인프라 섹션</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">섹션 타이틀</label>
                                  <input
                                    type="text"
                                    value={rdData.infraSectionTitle}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, infraSectionTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">섹션 설명문</label>
                                  <input
                                    type="text"
                                    value={rdData.infraSectionDesc}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, infraSectionDesc: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                  />
                                </div>
                                <div className="space-y-2 pt-2 border-t border-white/10">
                                  <label className="text-[11px] font-bold text-gray-400 block">3대 인프라 카드</label>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {rdData.infraCards.map((card, cIdx) => (
                                      <div key={cIdx} className="p-3 rounded-lg bg-black/20 border border-white/10 space-y-2">
                                        <span className="text-[10px] font-bold text-brand-green">인프라 카드 {cIdx + 1}</span>
                                        <input
                                          type="text"
                                          value={card.title}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newCards = [...prev.infraCards];
                                            newCards[cIdx] = { ...newCards[cIdx], title: e.target.value };
                                            return { ...prev, infraCards: newCards };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green font-bold"
                                          placeholder="인프라 제목"
                                        />
                                        <textarea
                                          value={card.desc}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newCards = [...prev.infraCards];
                                            newCards[cIdx] = { ...newCards[cIdx], desc: e.target.value };
                                            return { ...prev, infraCards: newCards };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                          placeholder="인프라 설명"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* 5. 함께 만드는 혁신 (제제연구 & 합성연구) */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">5. 함께 만드는 혁신 (연구 분야)</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">섹션 타이틀</label>
                                  <input
                                    type="text"
                                    value={rdData.synergySectionTitle}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, synergySectionTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">섹션 설명문</label>
                                  <input
                                    type="text"
                                    value={rdData.synergySectionDesc}
                                    onChange={(e) => updateRdIntro(prev => ({ ...prev, synergySectionDesc: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                  />
                                </div>
                                <div className="space-y-4 pt-2 border-t border-white/10">
                                  {rdData.divisions.map((div, dIdx) => (
                                    <div key={div.id} className="p-3.5 rounded-xl bg-black/20 border border-white/10 space-y-3">
                                      <span className="text-xs font-bold text-brand-green">{div.name} ({div.subTitle})</span>
                                      <div className="space-y-1">
                                        <label className="text-[10px] text-gray-400 block">개요 설명</label>
                                        <textarea
                                          value={div.leadDesc}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newDivs = [...prev.divisions];
                                            newDivs[dIdx] = { ...newDivs[dIdx], leadDesc: e.target.value };
                                            return { ...prev, divisions: newDivs };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-[10px] text-gray-400 block">상세 기술 설명</label>
                                        <textarea
                                          value={div.detailDesc}
                                          onChange={(e) => updateRdIntro(prev => {
                                            const newDivs = [...prev.divisions];
                                            newDivs[dIdx] = { ...newDivs[dIdx], detailDesc: e.target.value };
                                            return { ...prev, divisions: newDivs };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[70px]"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* 연구 활동 정적 페이지 */}
                        {currentSubPath === 'rd/activities' && (() => {
                          const actData = parseRdActivitiesData(staticContent);
                          const updateActivities = (updater: (prev: RdActivitiesData) => RdActivitiesData) => {
                            const next = updater(actData);
                            setStaticContent(serializeRdActivitiesData(next));
                          };

                          return (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <div>
                                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Sparkles size={16} className="text-brand-green" />
                                    연구 활동 콘텐츠 설정
                                  </h3>
                                  <p className="text-[11px] text-gray-400 mt-0.5">
                                    핵심 제제 플랫폼 Multi-Stra™ 및 5대 핵심 기술을 실시간 편집합니다.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setStaticContent(serializeRdActivitiesData(DEFAULT_RD_ACTIVITIES_DATA))}
                                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={12} />
                                  기본값 복원
                                </button>
                              </div>

                              {/* 1. 히어로 비전 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">1. 히어로 비전 (Hero Vision)</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (줄바꿈 가능)</label>
                                  <textarea
                                    value={actData.heroTitle}
                                    onChange={(e) => updateActivities(prev => ({ ...prev, heroTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                    placeholder="다산제약은 차별화된 DDS(약물전달시스템) 설계를 통해..."
                                  />
                                </div>
                              </div>

                              {/* 2. 플랫폼 소개 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">2. 플랫폼 소개 (Platform Intro)</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">플랫폼 제목</label>
                                  <input
                                    type="text"
                                    value={actData.platformTitle}
                                    onChange={(e) => updateActivities(prev => ({ ...prev, platformTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">플랫폼 설명</label>
                                  <textarea
                                    value={actData.platformDesc}
                                    onChange={(e) => updateActivities(prev => ({ ...prev, platformDesc: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[70px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                  />
                                </div>
                              </div>

                              {/* 3. 5대 핵심 기술 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">3. 5대 핵심 기술 (5 Core Technologies)</h4>
                                <div className="space-y-3">
                                  {actData.techList.map((tech, tIdx) => (
                                    <div key={tech.id} className="p-3.5 rounded-xl bg-black/20 border border-white/10 space-y-2">
                                      <span className="text-xs font-bold text-brand-green">{tech.id}. {tech.title}</span>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div>
                                          <label className="text-[10px] text-gray-400 block">단축 타이틀</label>
                                          <input
                                            type="text"
                                            value={tech.shortTitle}
                                            onChange={(e) => updateActivities(prev => {
                                              const newTechs = [...prev.techList];
                                              newTechs[tIdx] = { ...newTechs[tIdx], shortTitle: e.target.value };
                                              return { ...prev, techList: newTechs };
                                            })}
                                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[10px] text-gray-400 block">영문 서브타이틀</label>
                                          <input
                                            type="text"
                                            value={tech.subTitle}
                                            onChange={(e) => updateActivities(prev => {
                                              const newTechs = [...prev.techList];
                                              newTechs[tIdx] = { ...newTechs[tIdx], subTitle: e.target.value };
                                              return { ...prev, techList: newTechs };
                                            })}
                                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green"
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-[10px] text-gray-400 block">기술 상세 설명</label>
                                        <textarea
                                          value={tech.desc}
                                          onChange={(e) => updateActivities(prev => {
                                            const newTechs = [...prev.techList];
                                            newTechs[tIdx] = { ...newTechs[tIdx], desc: e.target.value };
                                            return { ...prev, techList: newTechs };
                                          })}
                                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[60px]"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

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
                        {(currentSubPath === 'business/api' || currentSubPath === 'business/api/raw' || currentSubPath === 'business/api/intermediates') && (() => {
                          const apiData = parseBusinessApiData(staticContent);
                          const updateApi = (updater: (prev: BusinessApiData) => BusinessApiData) => {
                            const next = updater(apiData);
                            setStaticContent(serializeBusinessApiData(next));
                          };

                          return (
                            <div className="space-y-6">
                              {/* Section 1: Hero Header */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                                <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
                                  상단 히어로 배너 & 비전 영역
                                </span>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (Hero Title)</label>
                                  <input
                                    type="text"
                                    value={apiData.title}
                                    onChange={(e) => updateApi(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="원료를 넘어, 의약품의 새로운 가능성을 만듭니다."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">소개 문구 1 (Intro Paragraph 1)</label>
                                  <textarea
                                    value={apiData.desc1}
                                    onChange={(e) => updateApi(prev => ({ ...prev, desc1: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[70px] resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="다산제약은 축적된 의약품 개발 경험과..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">소개 문구 2 (Intro Paragraph 2)</label>
                                  <textarea
                                    value={apiData.desc2}
                                    onChange={(e) => updateApi(prev => ({ ...prev, desc2: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[70px] resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="Prodrug를 비롯한 고부가가치 원료 개발부터..."
                                  />
                                </div>
                              </div>

                              {/* Section 2: Core Competencies Section Title */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                                <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
                                  원료의약품 핵심 경쟁력 섹션
                                </span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 block">섹션 대제목</label>
                                    <input
                                      type="text"
                                      value={apiData.sectionTitle}
                                      onChange={(e) => updateApi(prev => ({ ...prev, sectionTitle: e.target.value }))}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-400 block">섹션 부가설명</label>
                                    <input
                                      type="text"
                                      value={apiData.sectionDesc}
                                      onChange={(e) => updateApi(prev => ({ ...prev, sectionDesc: e.target.value }))}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Section 3: 5 Core Cards */}
                              <div className="space-y-4">
                                <span className="text-xs font-bold text-gray-300 block">5대 핵심 경쟁력 카드 관리</span>
                                {apiData.cards.map((card, cIdx) => (
                                  <div key={card.num || cIdx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-black text-brand-green font-mono">
                                        CARD {card.num}
                                      </span>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] text-gray-400 block">카드 소제목 (SubTitle)</label>
                                      <input
                                        type="text"
                                        value={card.subTitle}
                                        onChange={(e) => {
                                          const nextCards = [...apiData.cards];
                                          nextCards[cIdx] = { ...card, subTitle: e.target.value };
                                          updateApi(prev => ({ ...prev, cards: nextCards }));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] text-gray-400 block">강조 인용 문구 (Intro Highlight)</label>
                                      <input
                                        type="text"
                                        value={card.intro}
                                        onChange={(e) => {
                                          const nextCards = [...apiData.cards];
                                          nextCards[cIdx] = { ...card, intro: e.target.value };
                                          updateApi(prev => ({ ...prev, cards: nextCards }));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] text-gray-400 block">상세 설명 (Body)</label>
                                      <textarea
                                        value={card.body}
                                        onChange={(e) => {
                                          const nextCards = [...apiData.cards];
                                          nextCards[cIdx] = { ...card, body: e.target.value };
                                          updateApi(prev => ({ ...prev, cards: nextCards }));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[70px] resize-y"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* CDMO (서비스품질/특장점/물류) 정적 페이지 */}
                        {(currentSubPath === 'business/cdmo' ||
                          currentSubPath === 'business/cdmo/quality' || 
                          currentSubPath === 'business/cdmo/advantages' || 
                          currentSubPath === 'business/cdmo/logistics') && (() => {
                          const cdmoData = parseBusinessCdmoData(staticContent);
                          const updateCdmo = (updater: (prev: BusinessCdmoData) => BusinessCdmoData) => {
                            const next = updater(cdmoData);
                            setStaticContent(serializeBusinessCdmoData(next));
                          };

                          return (
                            <div className="space-y-6">
                              {/* Section 1: Main Title & Descriptions */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                                <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
                                  CDMO 솔루션 상단 헤더 영역
                                </span>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (Main Title)</label>
                                  <input
                                    type="text"
                                    value={cdmoData.title}
                                    onChange={(e) => updateCdmo(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="One-stop CDMO Solution"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">소개 문구 1 (Description 1)</label>
                                  <textarea
                                    value={cdmoData.desc1}
                                    onChange={(e) => updateCdmo(prev => ({ ...prev, desc1: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[70px] resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="다산제약은 의약품 연구개발 역량과..."
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">소개 문구 2 (Description 2)</label>
                                  <textarea
                                    value={cdmoData.desc2}
                                    onChange={(e) => updateCdmo(prev => ({ ...prev, desc2: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[70px] resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="Multi-Stra®를 기반으로 차별화된 제형 설계 및 약물 방출 기술을 제공합니다."
                                  />
                                </div>
                              </div>

                              {/* Section 2: CDMO Process Title */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
                                <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
                                  프로세스 섹션 타이틀
                                </span>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">프로세스 영역 제목</label>
                                  <input
                                    type="text"
                                    value={cdmoData.processTitle}
                                    onChange={(e) => updateCdmo(prev => ({ ...prev, processTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="CDMO PROCESS"
                                  />
                                </div>
                              </div>

                              {/* Section 3: 5 Process Steps */}
                              <div className="space-y-4">
                                <span className="text-xs font-bold text-gray-300 block">5대 프로세스 단계 (STEP 01 ~ 05) 관리</span>
                                {cdmoData.steps.map((stepItem, sIdx) => (
                                  <div key={stepItem.step || sIdx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-black text-brand-green uppercase bg-brand-green/10 px-2.5 py-0.5 rounded">
                                        {stepItem.step || `STEP 0${sIdx + 1}`}
                                      </span>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] text-gray-400 block">단계명 (Title)</label>
                                      <input
                                        type="text"
                                        value={stepItem.title}
                                        onChange={(e) => {
                                          const nextSteps = [...cdmoData.steps];
                                          nextSteps[sIdx] = { ...stepItem, title: e.target.value };
                                          updateCdmo(prev => ({ ...prev, steps: nextSteps }));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] text-gray-400 block">상세 설명 (Description)</label>
                                      <textarea
                                        value={stepItem.desc}
                                        onChange={(e) => {
                                          const nextSteps = [...cdmoData.steps];
                                          nextSteps[sIdx] = { ...stepItem, desc: e.target.value };
                                          updateCdmo(prev => ({ ...prev, steps: nextSteps }));
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-brand-green min-h-[60px] resize-y"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* 사업영역 정적 페이지 */}
                        {currentSubPath === 'about/business-area' && (
                          <div className="space-y-4">
                            {/* 사업영역 대표 히어로 배너 사진 업로드 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                  <ImageIcon size={14} />
                                  <span>사업영역 대표 비주얼 사진 (상단 21:9 와이드)</span>
                                </span>
                                <span className="text-[9px] text-gray-400">사용자 페이지 상단 와이드 화면에 노출됩니다</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-full sm:w-44 aspect-[21/9] rounded-lg overflow-hidden bg-slate-900 border border-white/15 relative shrink-0">
                                  <img
                                    src={(staticContent || '').split('\n')[0]?.split('|')[1] || '/images/business_hero.jpg'}
                                    alt="Business Hero Banner Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id="biz-hero-upload"
                                      className="hidden"
                                      disabled={uploadingHeroBanner}
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setUploadingHeroBanner(true);
                                        try {
                                          const formData = new FormData();
                                          formData.append('file', file);
                                          const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                          if (res.ok) {
                                            const data = await res.json();
                                            const lines = (staticContent || '').split('\n');
                                            const parts = (lines[0] || '').split('|');
                                            lines[0] = (parts[0] || '') + '|' + data.url;
                                            setStaticContent(lines.join('\n'));
                                          } else {
                                            alert('사진 업로드 실패');
                                          }
                                        } catch (err) {
                                          console.error(err);
                                          alert('업로드 중 오류 발생');
                                        } finally {
                                          setUploadingHeroBanner(false);
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor="biz-hero-upload"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                    >
                                      <UploadCloud size={13} />
                                      <span>{uploadingHeroBanner ? '업로드 중...' : '대표 사진 업로드 / 변경'}</span>
                                    </label>
                                    {((staticContent || '').split('\n')[0]?.split('|')[1]) && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const lines = (staticContent || '').split('\n');
                                          const parts = (lines[0] || '').split('|');
                                          lines[0] = parts[0] || '';
                                          setStaticContent(lines.join('\n'));
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors"
                                      >
                                        <RotateCcw size={12} />
                                        <span>기본 사진으로 복원</span>
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-[9px] text-gray-400">
                                    권장 규격: 21:9 와이드 비율 (1920x820px 이상 고해상도)
                                  </p>
                                </div>
                              </div>
                            </div>
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
                            {/* 연혁 대표 히어로 배너 사진 업로드 */}
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                  <ImageIcon size={14} />
                                  <span>연혁 대표 비주얼 사진 (상단 21:9 와이드)</span>
                                </span>
                                <span className="text-[9px] text-gray-400">사용자 페이지 상단 와이드 화면에 노출됩니다</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-full sm:w-44 aspect-[21/9] rounded-lg overflow-hidden bg-slate-900 border border-white/15 relative shrink-0">
                                  <img
                                    src={(staticContent || '').split('\n')[0]?.split('|')[2] || '/history_hero_spiral.png'}
                                    alt="History Hero Banner Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id="history-hero-upload"
                                      className="hidden"
                                      disabled={uploadingHeroBanner}
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setUploadingHeroBanner(true);
                                        try {
                                          const formData = new FormData();
                                          formData.append('file', file);
                                          const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                          if (res.ok) {
                                            const data = await res.json();
                                            const lines = (staticContent || '').split('\n');
                                            const parts = (lines[0] || '').split('|');
                                            while (parts.length < 2) parts.push('');
                                            parts[2] = data.url;
                                            lines[0] = parts.join('|');
                                            setStaticContent(lines.join('\n'));
                                          } else {
                                            alert('사진 업로드 실패');
                                          }
                                        } catch (err) {
                                          console.error(err);
                                          alert('업로드 중 오류 발생');
                                        } finally {
                                          setUploadingHeroBanner(false);
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor="history-hero-upload"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                    >
                                      <UploadCloud size={13} />
                                      <span>{uploadingHeroBanner ? '업로드 중...' : '대표 사진 업로드 / 변경'}</span>
                                    </label>
                                    {((staticContent || '').split('\n')[0]?.split('|')[2]) && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const lines = (staticContent || '').split('\n');
                                          const parts = (lines[0] || '').split('|');
                                          if (parts.length >= 3) {
                                            parts[2] = '';
                                            lines[0] = parts.join('|');
                                            setStaticContent(lines.join('\n'));
                                          }
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 text-gray-300 rounded-lg text-[11px] font-medium transition-colors"
                                      >
                                        <RotateCcw size={12} />
                                        <span>기본 사진으로 복원</span>
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-[9px] text-gray-400">
                                    권장 규격: 21:9 와이드 비율 (1920x820px 이상 고해상도)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (Title)</label>
                              <input
                                type="text"
                                value={(staticContent || '').split('\n')[0]?.split('|')[0] || ''}
                                onChange={(e) => {
                                  const lines = (staticContent || '').split('\n');
                                  const parts = (lines[0] || '').split('|');
                                  parts[0] = e.target.value;
                                  if (parts.length < 2) parts.push('');
                                  lines[0] = parts.join('|');
                                  setStaticContent(lines.join('\n'));
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                placeholder="예: 성장 연혁 (History)"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-400 block">소개글 설명 (Intro)</label>
                              <div className="bg-white rounded-xl overflow-hidden text-gray-900">
                                <RichTextEditor
                                  value={(staticContent || '').split('\n')[0]?.split('|').slice(1).join('|') || ''}
                                  onChange={(val) => {
                                    const lines = (staticContent || '').split('\n');
                                    const parts = (lines[0] || '').split('|');
                                    const title = parts[0] || '';
                                    lines[0] = title + '|' + val;
                                    setStaticContent(lines.join('\n'));
                                  }}
                                />
                              </div>
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
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-[10px] text-gray-400">
                                  <strong className="text-brand-green">ERA:2020 ~ Present|글로벌 도약과 기술 혁신</strong> 형식으로 시대를 구분하고,<br/>
                                  <strong className="text-brand-green">YEAR:2025년|프리IPO 유치 성공&lt;br /&gt;코스닥 상장 채비 완료</strong> 형식으로 연도별 내용을 입력하세요.
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const lines = (staticContent || '').split('\n');
                                    if (lines.length <= 1) return;
                                    const intro = lines[0] || '';
                                    const dataLines = lines.slice(1);
                                    
                                    const eras: { titleLine: string; yearStart: number; years: { line: string; yearNum: number }[] }[] = [];
                                    let currentEra: { titleLine: string; yearStart: number; years: { line: string; yearNum: number }[] } | null = null;
                                    
                                    for (let line of dataLines) {
                                      const trimmed = line.trim();
                                      if (!trimmed) continue;
                                      
                                      if (trimmed.startsWith('ERA:')) {
                                        const match = trimmed.match(/\d{4}/);
                                        const yearStart = match ? parseInt(match[0], 10) : 9999;
                                        currentEra = { titleLine: trimmed, yearStart, years: [] };
                                        eras.push(currentEra);
                                      } else if (trimmed.startsWith('YEAR:') && currentEra) {
                                        const match = trimmed.match(/\d{4}/);
                                        const yearNum = match ? parseInt(match[0], 10) : 9999;
                                        currentEra.years.push({ line: trimmed, yearNum });
                                      }
                                    }
                                    
                                    eras.sort((a, b) => a.yearStart - b.yearStart);
                                    eras.forEach(era => era.years.sort((a, b) => a.yearNum - b.yearNum));
                                    
                                    let newContent = intro;
                                    eras.forEach(era => {
                                      newContent += '\n' + era.titleLine;
                                      era.years.forEach(y => newContent += '\n' + y.line);
                                    });
                                    
                                    setStaticContent(newContent);
                                    alert('과거순(1996년~)으로 정렬되었습니다. 우측 상단의 저장 버튼을 눌러주세요.');
                                  }}
                                  className="text-[11px] bg-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white px-3 py-1.5 rounded transition-colors"
                                >
                                  과거순(1996년~) 자동 정렬
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 인재상 정적 페이지 */}
                        {currentSubPath === 'contact/careers/talent' && (() => {
                          const talentData = parseTalentData(staticContent);
                          const updateTalent = (updater: (prev: TalentData) => TalentData) => {
                            const updated = updater(talentData);
                            setStaticContent(serializeTalentData(updated));
                          };

                          return (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <div>
                                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Sparkles size={16} className="text-brand-green" />
                                    인재상 콘텐츠 설정
                                  </h3>
                                  <p className="text-[11px] text-gray-400 mt-0.5">
                                    철학 메시지와 D-A-S-A-N 5대 핵심 인재상을 실시간 편집합니다.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setStaticContent(serializeTalentData(DEFAULT_TALENT_DATA))}
                                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={12} />
                                  기본값 복원
                                </button>
                              </div>

                              {/* 1. 경영 철학 및 인재 철학 소개 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">1. 경영철학 & 인재상 철학 섹션</h4>
                                
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">메인 철학 타이틀 (Philosophy Title)</label>
                                  <input
                                    type="text"
                                    value={talentData.philosophyTitle}
                                    onChange={(e) => updateTalent(prev => ({ ...prev, philosophyTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                    placeholder="좋은 의약품은 좋은 사람에게서 나옵니다"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">철학 본문 소개문 - 문단 1 (창업이념 & 사람 중심 가치)</label>
                                  <textarea
                                    value={talentData.philosophyP1}
                                    onChange={(e) => updateTalent(prev => ({ ...prev, philosophyP1: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[85px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                    placeholder="다산제약 창업이념 및 인재 철학 문단을 입력하세요."
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">철학 본문 소개문 - 문단 2 (비전 & 인재 영입 슬로건)</label>
                                  <textarea
                                    value={talentData.philosophyP2}
                                    onChange={(e) => updateTalent(prev => ({ ...prev, philosophyP2: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[75px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                    placeholder="'Innovating Today for a Healthier Tomorrow' 등 인재 영입 메시지"
                                  />
                                </div>
                              </div>

                              {/* 2. D-A-S-A-N 5 Letters Items */}
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-brand-green">2. 5대 핵심 인재상 (D · A · S · A · N)</h4>
                                  <span className="text-[10px] text-gray-400">우측 인터랙티브 다이어그램 실시간 연동</span>
                                </div>

                                {talentData.items.map((item, idx) => {
                                  const letterColors = [
                                    'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                                    'text-teal-400 border-teal-500/30 bg-teal-500/10',
                                    'text-sky-400 border-sky-500/30 bg-sky-500/10',
                                    'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
                                    'text-purple-400 border-purple-500/30 bg-purple-500/10',
                                  ];
                                  const colorClass = letterColors[idx] || letterColors[0];

                                  return (
                                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                      <div className="flex items-center gap-2">
                                        <span className={`w-6 h-6 rounded-md border flex items-center justify-center font-black text-xs ${colorClass}`}>
                                          {item.letter}
                                        </span>
                                        <span className="text-xs font-bold text-white">
                                          {item.letter} - {item.word}
                                        </span>
                                      </div>

                                      <div className="space-y-1">
                                        <label className="text-[11px] text-gray-400 block">키워드 영문명 (Keyword)</label>
                                        <input
                                          type="text"
                                          value={item.word}
                                          onChange={(e) => {
                                            const newWord = e.target.value;
                                            updateTalent(prev => {
                                              const newItems = [...prev.items];
                                              newItems[idx] = { ...newItems[idx], word: newWord };
                                              return { ...prev, items: newItems };
                                            });
                                          }}
                                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                          placeholder="키워드 입력 (예: Detail)"
                                        />
                                      </div>

                                      <div className="space-y-1">
                                        <label className="text-[11px] text-gray-400 block">상세 설명 (Description)</label>
                                        <textarea
                                          value={item.desc}
                                          onChange={(e) => {
                                            const newDesc = e.target.value;
                                            updateTalent(prev => {
                                              const newItems = [...prev.items];
                                              newItems[idx] = { ...newItems[idx], desc: newDesc };
                                              return { ...prev, items: newItems };
                                            });
                                          }}
                                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[55px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                          placeholder="상세 설명 입력"
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}

                        {/* 채용절차 정적 페이지 */}
                        {currentSubPath === 'contact/careers/process' && (() => {
                          const processData = parseCareerProcessData(staticContent);
                          const updateProcess = (updater: (prev: CareerProcessData) => CareerProcessData) => {
                            const updated = updater(processData);
                            setStaticContent(serializeCareerProcessData(updated));
                          };

                          return (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <div>
                                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Sparkles size={16} className="text-brand-green" />
                                    채용 프로세스 설정 (6개 단계)
                                  </h3>
                                  <p className="text-[11px] text-gray-400 mt-0.5">
                                    서류 전형부터 최종 합격까지 6개 전형의 명칭, 부제 및 안내 설명을 편집합니다.
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setStaticContent(serializeCareerProcessData(DEFAULT_CAREER_PROCESS_DATA))}
                                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={12} />
                                  기본값 복원
                                </button>
                              </div>

                              {/* 1. 상단 안내 섹션 */}
                              <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-xs font-bold text-brand-green">1. 프로세스 안내문 (Header & Intro)</h4>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (Main Title)</label>
                                  <input
                                    type="text"
                                    value={processData.mainTitle}
                                    onChange={(e) => updateProcess(prev => ({ ...prev, mainTitle: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                    placeholder="채용 프로세스 안내"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">소개글 설명 (Intro)</label>
                                  <textarea
                                    value={processData.intro}
                                    onChange={(e) => updateProcess(prev => ({ ...prev, intro: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 min-h-[75px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                    placeholder="채용 프로세스 메인 소개글을 입력하세요."
                                  />
                                </div>
                              </div>

                              {/* 2. 6개 단계 설정 */}
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-brand-green">2. 채용 6개 단계별 설정</h4>
                                  <span className="text-[10px] text-gray-400">우측 교차 스쿼클 카드 실시간 연동</span>
                                </div>

                                {processData.steps.map((step, idx) => {
                                  const stepColors = [
                                    'text-sky-400 border-sky-500/30 bg-sky-500/10',
                                    'text-teal-400 border-teal-500/30 bg-teal-500/10',
                                    'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
                                    'text-purple-400 border-purple-500/30 bg-purple-500/10',
                                    'text-rose-400 border-rose-500/30 bg-rose-500/10',
                                    'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                                  ];
                                  const colorClass = stepColors[idx] || stepColors[0];

                                  return (
                                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                      <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${colorClass}`}>
                                          STEP {step.stepNumber}
                                        </span>
                                        <span className="text-xs font-bold text-white">
                                          {step.title}
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                          <label className="text-[11px] text-gray-400 block">단계 명칭 (Title)</label>
                                          <input
                                            type="text"
                                            value={step.title}
                                            onChange={(e) => {
                                              const newTitle = e.target.value;
                                              updateProcess(prev => {
                                                const newSteps = [...prev.steps];
                                                newSteps[idx] = { ...newSteps[idx], title: newTitle };
                                                return { ...prev, steps: newSteps };
                                              });
                                            }}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                            placeholder="예: 서류 전형"
                                          />
                                        </div>

                                        <div className="space-y-1">
                                          <label className="text-[11px] text-gray-400 block">부제 / 요약 (Subtitle)</label>
                                          <input
                                            type="text"
                                            value={step.subTitle}
                                            onChange={(e) => {
                                              const newSub = e.target.value;
                                              updateProcess(prev => {
                                                const newSteps = [...prev.steps];
                                                newSteps[idx] = { ...newSteps[idx], subTitle: newSub };
                                                return { ...prev, steps: newSteps };
                                              });
                                            }}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all font-medium"
                                            placeholder="예: 기본 요건 및 직무 적합성 검토"
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-1">
                                        <label className="text-[11px] text-gray-400 block">단계 상세 설명 (Description)</label>
                                        <textarea
                                          value={step.desc}
                                          onChange={(e) => {
                                            const newDesc = e.target.value;
                                            updateProcess(prev => {
                                              const newSteps = [...prev.steps];
                                              newSteps[idx] = { ...newSteps[idx], desc: newDesc };
                                              return { ...prev, steps: newSteps };
                                            });
                                          }}
                                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none min-h-[60px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all font-normal"
                                          placeholder="단계 상세 설명을 입력하세요."
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                        {/* Case ESG: Ethics, Environment, Safety */}
                        {(currentSubPath === 'about/esg/environment' || currentSubPath === 'about/esg/safety' || currentSubPath === 'about/esg/anti-corruption') && (() => {
                          const esgData = parseEsgData(staticContent, currentSubPath);
                          const defaultEsg = DEFAULT_ESG_DATA[currentSubPath] || DEFAULT_ESG_DATA['about/esg/environment'];

                          const updateEsg = (field: keyof EsgData, val: any) => {
                            const updated = { ...esgData, [field]: val };
                            setStaticContent(JSON.stringify(updated));
                          };

                          return (
                            <div className="space-y-6">
                              {/* 1. 상단 대표 히어로 배너 사진 업로드 */}
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-brand-green uppercase flex items-center gap-1.5">
                                    <ImageIcon size={14} />
                                    <span>대표 히어로 배너 사진</span>
                                  </span>
                                  <span className="text-[10px] text-gray-400">사용자 페이지 상단 21:9 와이드 영역에 노출됩니다</span>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                  <div className="w-full sm:w-48 aspect-[21/9] rounded-lg overflow-hidden bg-slate-900 border border-white/15 relative shrink-0">
                                    <img 
                                      src={esgData.imageUrl || defaultEsg.imageUrl} 
                                      alt="ESG Banner Preview"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        id="esg-hero-file-input"
                                        className="hidden"
                                        disabled={uploadingHeroBanner}
                                        onChange={async (e) => {
                                          const file = e.target.files?.[0];
                                          if (!file) return;
                                          setUploadingHeroBanner(true);
                                          try {
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            const res = await fetch('/api/upload', {
                                              method: 'POST',
                                              body: formData
                                            });
                                            if (res.ok) {
                                              const data = await res.json();
                                              updateEsg('imageUrl', data.url);
                                            } else {
                                              alert('사진 업로드에 실패했습니다.');
                                            }
                                          } catch (err) {
                                            console.error('ESG photo upload error:', err);
                                            alert('업로드 중 오류가 발생했습니다.');
                                          } finally {
                                            setUploadingHeroBanner(false);
                                          }
                                        }}
                                      />
                                      <label 
                                        htmlFor="esg-hero-file-input"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-green hover:bg-brand-green-dark text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
                                      >
                                        <UploadCloud size={14} />
                                        <span>{uploadingHeroBanner ? '업로드 중...' : '배너 사진 업로드 / 변경'}</span>
                                      </label>

                                      {esgData.imageUrl && esgData.imageUrl !== defaultEsg.imageUrl && (
                                        <button
                                          type="button"
                                          onClick={() => updateEsg('imageUrl', defaultEsg.imageUrl)}
                                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/15 text-gray-300 rounded-xl text-xs font-medium transition-colors"
                                        >
                                          <RotateCcw size={13} />
                                          <span>기본 사진으로 복원</span>
                                        </button>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-gray-400">
                                      권장 크기: 21:9 비율 (1920x820px 이상 고해상도 JPG/PNG/WebP)
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* 2. 타이틀 입력 */}
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 block">메인 타이틀 (Title)</label>
                                <input
                                  type="text"
                                  value={esgData.title}
                                  onChange={(e) => updateEsg('title', e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="방침 및 선언문 제목"
                                />
                              </div>

                              {/* 3. 핵심 선언문 / 방침 설명 */}
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 block">핵심 선언문 / 기본 방침 (Statement)</label>
                                <textarea
                                  value={esgData.statement}
                                  onChange={(e) => updateEsg('statement', e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3.5 text-xs md:text-sm text-white placeholder-gray-500 min-h-[90px] leading-relaxed resize-y focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="핵심 방침 문구를 입력하세요."
                                />
                              </div>

                              {/* 4. 브릿지 문구 */}
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 block">실천 연결 문구 (Bridge Text)</label>
                                <input
                                  type="text"
                                  value={esgData.bridgeText || ''}
                                  onChange={(e) => updateEsg('bridgeText', e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                  placeholder="예: 이를 위해 다음과 같은 사항을 적극 실천한다."
                                />
                              </div>

                              {/* 5. 실천 항목 목록 */}
                              <div className="space-y-3 pt-2 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                  <label className="text-[11px] font-bold text-brand-green block">실천 수칙 / 원칙 항목 ({esgData.items.length}개)</label>
                                  <button
                                    type="button"
                                    onClick={() => updateEsg('items', [...esgData.items, '새로운 실천 항목을 입력하세요.'])}
                                    className="text-[11px] text-brand-green hover:underline flex items-center gap-1 font-bold"
                                  >
                                    <Plus size={13} />
                                    <span>항목 추가</span>
                                  </button>
                                </div>

                                <div className="space-y-2.5">
                                  {esgData.items.map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
                                        {idx + 1}
                                      </span>
                                      <textarea
                                        value={item}
                                        onChange={(e) => {
                                          const newItems = [...esgData.items];
                                          newItems[idx] = e.target.value;
                                          updateEsg('items', newItems);
                                        }}
                                        className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-gray-500 min-h-[44px] resize-y p-1"
                                        placeholder={`항목 ${idx + 1} 내용`}
                                      />
                                      {esgData.items.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newItems = esgData.items.filter((_: string, i: number) => i !== idx);
                                            updateEsg('items', newItems);
                                          }}
                                          className="text-gray-400 hover:text-red-400 p-1 transition-colors shrink-0"
                                        >
                                          <Trash2 size={13} />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 6. 공표일자 및 서명인 정보 */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">제정/개정 일자</label>
                                  <input
                                    type="text"
                                    value={esgData.date}
                                    onChange={(e) => updateEsg('date', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="2025년 10월 20일"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-gray-400 block">대표이사 성명</label>
                                  <input
                                    type="text"
                                    value={esgData.signerName}
                                    onChange={(e) => updateEsg('signerName', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-brand-green focus:bg-white/[0.07] transition-all"
                                    placeholder="류 형 선"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Right: Live Preview Panel */}
                    <div className={`${
                      previewWidthMode === 'expanded' 
                        ? 'lg:col-span-8 2xl:col-span-9' 
                        : previewWidthMode === 'normal' 
                        ? 'lg:col-span-6 2xl:col-span-6' 
                        : 'lg:col-span-7 2xl:col-span-8'
                    } bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md space-y-4 text-white transition-all duration-300 min-w-0`}>
                      <div className="flex flex-wrap items-center justify-between pb-2 border-b border-white/10 gap-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-extrabold text-white">실시간 미리보기</h3>
                          <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                            {previewWidthMode === 'wide' ? '가로 확장 (4:8)' : previewWidthMode === 'expanded' ? '최대 확장 (3:9)' : '기본 (5:5)'}
                          </span>
                        </div>

                        {/* Width Ratio Selector Controls */}
                        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
                          <span className="text-gray-400 text-[10px] px-1 font-bold">가로폭:</span>
                          <button
                            type="button"
                            onClick={() => handleSetPreviewWidthMode('normal')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              previewWidthMode === 'normal'
                                ? 'bg-brand-green text-gray-950 shadow-md font-extrabold'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                            title="기본 5:5 분할"
                          >
                            기본 (5:5)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetPreviewWidthMode('wide')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              previewWidthMode === 'wide'
                                ? 'bg-brand-green text-gray-950 shadow-md font-extrabold'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                            title="미리보기 넓게 (4:8 분할)"
                          >
                            넓게 (추천)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetPreviewWidthMode('expanded')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              previewWidthMode === 'expanded'
                                ? 'bg-brand-green text-gray-950 shadow-md font-extrabold'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                            title="미리보기 최대 (3:9 분할)"
                          >
                            최대 (3:9)
                          </button>
                        </div>
                      </div>
                      <div className="border border-dashed border-white/15 rounded-lg p-5 bg-white/[0.02] min-h-[300px]">
                        <h4 className="text-sm font-bold text-brand-green tracking-tight mb-4 flex items-center space-x-1.5">
                          <CheckCircle2 size={16} />
                          <span>미리보기 화면 (사용자 페이지 노출 예시)</span>
                        </h4>
                        
                        {/* 1. CEO Greeting */}
                        {currentSubPath === 'about/greeting' ? (
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const data = parseGreetingData(staticContent);
                              return (
                                <div className="space-y-6">
                                  {/* Header Title */}
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                                      {data.title || 'CEO 메시지'}
                                    </h3>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                      실시간 미리보기
                                    </span>
                                  </div>

                                  {/* 2-Column Responsive Layout matching user page */}
                                  <div className="flex flex-col xl:flex-row gap-6 items-start">
                                    {/* Left Column: Prominent CEO Photo Card */}
                                    <div className="w-full xl:w-[190px] shrink-0">
                                      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-2.5 shadow-sm">
                                        <div className="relative aspect-[3/4.2] w-full rounded-xl overflow-hidden shadow-md bg-slate-900">
                                          <img 
                                            src={data.imageUrl || '/images/ceo_greeting.webp'} 
                                            alt={data.signerName ? `다산제약 ${data.signerTitle} ${data.signerName}` : '대표이사'} 
                                            className="w-full h-full object-cover object-top"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Column: Greeting Text */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                      <div>
                                        {/* Slogan Banner with Green Left Border */}
                                        {data.slogan && (
                                          <div className="border-l-4 border-brand-green pl-3.5 py-0.5 mb-5">
                                            <h4 className="text-sm sm:text-base font-black text-gray-900 tracking-tight leading-snug break-keep">
                                              {data.slogan}
                                            </h4>
                                          </div>
                                        )}

                                        {/* Paragraphs with identical font-weight & line-height to user page */}
                                        <div className="space-y-4 text-gray-700 text-xs sm:text-[13px] leading-[1.95] tracking-normal font-normal break-keep">
                                          {data.greeting && (
                                            <p className="font-semibold text-gray-900 text-xs sm:text-sm leading-relaxed mb-4">
                                              {data.greeting}
                                            </p>
                                          )}
                                          {data.body && (data.body.includes('<p') || data.body.includes('<h') || data.body.includes('<br')) ? (
                                            <div 
                                              className="space-y-4 [&_p]:leading-[1.95] [&_p]:text-gray-700 [&_strong]:font-bold [&_strong]:text-gray-900 [&_h4]:font-bold [&_h4]:text-sm [&_h4]:text-gray-900" 
                                              dangerouslySetInnerHTML={{ __html: data.body }} 
                                            />
                                          ) : (
                                            <div className="space-y-4">
                                              {(data.body || '').split('\n\n').map((para: string, i: number) => (
                                                <p key={i} className="whitespace-pre-line leading-[1.95]">{para}</p>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* CEO Signature Block */}
                                      <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end items-end">
                                        <div className="flex items-end gap-2.5">
                                          <span className="text-[11px] font-bold text-gray-500">
                                            {data.signerCompany || '주식회사 다산제약'}
                                          </span>
                                          <span className="text-[11px] font-bold text-gray-700">
                                            {data.signerTitle || '대표이사'}
                                          </span>
                                          <span className="text-base sm:text-lg font-black text-gray-900 tracking-wider">
                                            {data.signerName || '류형선'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/business-area' ? (
                          /* 2. Business Area */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const introParts = (lines[0] || '').split('|');
                              const intro = introParts[0] || '연구개발(R&D)부터 판매까지 의약품 전 주기의 Key Value Chain 인프라를 구축하여 고부가가치 사업 성장성을 확보하고 있습니다';
                              const heroImg = introParts[1] || '/images/business_hero.jpg';

                              const defaultCards = [
                                { title: '자사 완제 의약품 사업', desc: '순환기, 호흡기, 비뇨기 중심의\n우수한 제품 라인업 구축 및 생산·판매', image: '/images/business_hero1.jpg' },
                                { title: '수탁 완제 의약품 (CMO) 사업', desc: '독자적인 제제기술 및 공정 최적화를 통한\n전문의약품 수탁 생산', image: '/images/business_hero2.jpg' },
                                { title: '의약품 핵심 원료 및 중간체 사업', desc: '의약품 핵심 원료 및 중간체 개발 및 특허 확보,\n신규 합성 및 신규 수입 원료 DMF 등록관리', image: '/images/business_hero3.jpg' }
                              ];

                              const cards = [1, 2, 3].map((cardIdx) => {
                                const line = lines[cardIdx] || '';
                                const parts = line.split('|');
                                const defaultItem = defaultCards[cardIdx - 1];
                                return {
                                  title: parts[0] ? parts[0].replace(/^(\d+[\.\)]\s*)/, '').trim() : defaultItem.title,
                                  desc: parts[1] || defaultItem.desc,
                                  image: parts[2] || defaultItem.image
                                };
                              });

                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">주요 사업 영역 (Core Business)</h3>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                      실시간 미리보기
                                    </span>
                                  </div>

                                  {/* Top Hero Banner Mockup */}
                                  <div className="relative aspect-[21/8] rounded-xl overflow-hidden shadow-sm bg-slate-900">
                                    <img src={heroImg} alt="Business Hero" className="w-full h-full object-cover object-center" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent flex items-center p-4">
                                      <div className="max-w-xs space-y-1">
                                        <span className="text-[9px] font-extrabold text-[#2f7847] uppercase tracking-wider block">Key Value Chain</span>
                                        <p className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug break-keep">
                                          {intro}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* 3 Business Cards */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                    {cards.map((card, idx) => (
                                      <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-150 bg-slate-100 group">
                                        <img src={card.image} alt={card.title} className="w-full h-full object-cover object-center brightness-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                                        <div className="absolute inset-x-2.5 bottom-2.5 p-2.5 rounded-xl bg-black/55 backdrop-blur-sm border border-white/20 text-white">
                                          <h5 className="text-xs sm:text-[13px] font-extrabold text-white leading-tight mb-1 truncate">
                                            {card.title}
                                          </h5>
                                          <p className="text-[10px] text-white/90 font-medium leading-relaxed whitespace-pre-line line-clamp-3">
                                            {card.desc.replace(/<br\s*\/?>/g, '\n')}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro' ? (
                          /* 3. Company Intro: Main Tab */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150 font-pretendard">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const title = (parts[0] || '인류의 건강을 위한 혁신,다산제약').replace(/^[1-9]\.\s?/, '').trim();
                              const body = parts.slice(1).join('|') || '(입력된 문구가 여기에 표시됩니다)';

                              return (
                                <div className="space-y-5">
                                  {/* Top Slogan */}
                                  <div className="text-center py-2 border-b border-gray-100">
                                    <p className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">
                                      우리는 <strong className="font-extrabold text-gray-950">생명연장</strong>이라는 고귀한 사명을 바탕으로 인류가 <strong className="font-extrabold text-gray-950">행복한 세상</strong>을 만든다.
                                    </p>
                                  </div>

                                  {/* Title */}
                                  <div className="border-l-4 border-brand-green pl-3.5 py-0.5">
                                    <h4 className="text-sm sm:text-base font-black text-gray-900 tracking-tight leading-snug">
                                      {title}
                                    </h4>
                                  </div>

                                  {/* Body with exact user page typography */}
                                  <div className="text-gray-700 text-xs sm:text-[13px] leading-[1.85] font-normal break-keep">
                                    {(body.includes('<p') || body.includes('<h') || body.includes('<br')) ? (
                                      <div 
                                        className="space-y-3 [&_p]:leading-[1.85] [&_p]:text-gray-700 [&_strong]:font-bold [&_strong]:text-gray-900 [&_h3]:font-black [&_h3]:text-gray-900 [&_h3]:text-sm [&_h4]:font-bold [&_h4]:text-gray-900"
                                        dangerouslySetInnerHTML={{ __html: body }}
                                      />
                                    ) : (
                                      <div className="space-y-3">
                                        {body.split('\n\n').map((para, pIdx) => (
                                          <p key={pIdx} className="whitespace-pre-line leading-[1.85]">{para}</p>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/competencies' ? (
                          /* 4. Company Intro: Competencies */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150 font-pretendard">
                            <div className="space-y-4">
                              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                <h4 className="text-sm sm:text-base font-black text-gray-900">핵심역량 (Core Competencies)</h4>
                                <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">미리보기</span>
                              </div>
                              <div className="grid grid-cols-1 gap-3">
                                {(staticContent || '').split('\n').map((line, idx) => {
                                  const parts = line.split('|');
                                  if (!parts[0]) return null;
                                  const icons = [<Award size={20} key="1" />, <Building2 size={20} key="2" />, <Users size={20} key="3" />];
                                  const colors = ['bg-teal-50 text-teal-600 border-teal-100', 'bg-cyan-50 text-cyan-600 border-cyan-100', 'bg-blue-50 text-blue-600 border-blue-100'];
                                  return (
                                    <div key={idx} className="p-4 rounded-xl border border-gray-150 bg-white hover:border-brand-green/40 transition-all flex items-start space-x-3.5 shadow-2xs">
                                      <div className={`p-2.5 rounded-xl border ${colors[idx % 3]} shrink-0`}>
                                        {icons[idx % 3]}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h5 className="font-extrabold text-gray-900 text-xs sm:text-sm mb-1">{parts[0]}</h5>
                                        <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line">{parts[1] || ''}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/vision' ? (
                          /* 5. Company Intro: Vision */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150 font-pretendard">
                            <div className="space-y-4">
                              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                <h4 className="text-sm sm:text-base font-black text-gray-900">비전 및 미션 (Vision & Mission)</h4>
                                <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">미리보기</span>
                              </div>
                              {(() => {
                                const lines = (staticContent || '').split('\n').filter(l => l.includes('|'));
                                const mParts = lines[0]?.split('|') || [];
                                const vParts = lines[1]?.split('|') || [];
                                return (
                                  <div className="space-y-3.5">
                                    <div className="p-4 rounded-xl border border-gray-150 bg-slate-50/70 space-y-1.5">
                                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded uppercase">Our Mission</span>
                                      <h5 className="font-black text-gray-900 text-xs sm:text-sm mt-1">{mParts[0] || '인류의 건강과 행복한 삶에 공헌'}</h5>
                                      <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line">{mParts[1] || ''}</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-150 bg-slate-50/70 space-y-1.5">
                                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100/70 border border-teal-200 px-2 py-0.5 rounded uppercase">Our Vision</span>
                                      <h5 className="font-black text-gray-900 text-xs sm:text-sm mt-1">{vParts[0] || 'DDS 기술 혁신 기반의 글로벌 헬스케어 리더'}</h5>
                                      <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line">{vParts[1] || ''}</p>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/values' ? (
                          /* 6. Company Intro: Values */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150 font-pretendard">
                            <div className="space-y-4">
                              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                <h4 className="text-sm sm:text-base font-black text-gray-900">핵심가치 (Core Values - DASAN)</h4>
                                <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">미리보기</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {(staticContent || '').split('\n').map((line, idx) => {
                                  const parts = line.split('|');
                                  if (!parts[0]) return null;
                                  return (
                                    <div key={idx} className="p-3.5 rounded-xl border border-gray-150 bg-slate-50/60 hover:bg-white transition-all space-y-2">
                                      <div className="w-7 h-7 rounded-lg bg-brand-green text-white flex items-center justify-center font-black text-xs shadow-xs">
                                        {parts[0].trim().charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <h5 className="font-black text-gray-900 text-xs sm:text-sm">{parts[0]}</h5>
                                        <span className="text-[10px] text-brand-green font-bold block">{parts[1] || ''}</span>
                                      </div>
                                      <p className="text-[11px] text-gray-600 leading-normal font-normal">{parts[2] || ''}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/philosophy' ? (
                          /* 7. Company Intro: Philosophy */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150 font-pretendard">
                            <div className="space-y-4">
                              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                <h4 className="text-sm sm:text-base font-black text-gray-900">경영철학 (Philosophy)</h4>
                                <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">미리보기</span>
                              </div>
                              {(() => {
                                const lines = (staticContent || '').split('\n');
                                const quote = lines[0] || '사람이 중심이 되는 기술, 정직으로 만드는 건강한 내일';
                                const pillars = lines.slice(1).filter(l => l.includes('|'));
                                return (
                                  <div className="space-y-4">
                                    <div className="border-l-4 border-brand-green pl-3.5 py-1.5 bg-emerald-50/50 rounded-r-xl">
                                      <p className="text-xs sm:text-sm font-extrabold italic text-gray-900">&quot;{quote}&quot;</p>
                                    </div>
                                    <div className="space-y-2.5">
                                      {pillars.map((p, idx) => {
                                        const parts = p.split('|');
                                        return (
                                          <div key={idx} className="p-3.5 rounded-xl border border-gray-150 bg-white hover:border-brand-green/40 transition-all shadow-2xs">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded">0{idx + 1}</span>
                                              <h5 className="font-extrabold text-gray-900 text-xs sm:text-sm">{parts[0]}</h5>
                                            </div>
                                            <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-normal pl-7">{parts[1] || ''}</p>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        ) : currentSubPath === 'about/intro' && activeIntroTab === 'about/intro/culture' ? (
                          /* 8. Company Intro: Culture */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150 font-pretendard">
                            <div className="space-y-4">
                              {(() => {
                                const lines = (staticContent || '').split('\n');
                                let mainTitle = lines[0] || '다산인의 건강한 문화';
                                let subText = lines[1] || '일할 때는 뜨겁게 몰입하고, 서로를 신뢰하고 배려하는 일터';
                                const items = lines.slice(2).map(l => {
                                  const parts = l.split('|');
                                  return { title: parts[0] || '', desc: parts[1] || '' };
                                }).filter(item => item.title);

                                return (
                                  <div className="space-y-4">
                                    <div className="pb-3 border-b border-gray-100">
                                      <span className="text-[9px] font-extrabold text-brand-green uppercase tracking-wider block mb-1">Corporate Culture</span>
                                      <h4 className="text-sm sm:text-base font-black text-gray-900">{mainTitle}</h4>
                                      <p className="text-xs text-gray-600 mt-1 font-normal leading-relaxed">{subText}</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                      {(items.length > 0 ? items : [
                                        { title: '유연하고 자율적인 몰입', desc: '시차출퇴근제 운영 및 자유로운 휴가 문화로 업무 몰입 극대화' },
                                        { title: '배움과 성장의 기회', desc: '직무 교육 및 국내외 유수 학회/박람회 참가 전폭 지원' },
                                        { title: '수평적 소통과 배려', desc: '타운홀 미팅과 상호 존중하는 피드백 문화 지향' }
                                      ]).map((it, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl border border-gray-150 bg-slate-50/60 hover:bg-white transition-all space-y-1">
                                          <h5 className="font-extrabold text-gray-900 text-xs sm:text-sm flex items-center gap-1.5">
                                            <CheckCircle2 size={14} className="text-brand-green" />
                                            <span>{it.title}</span>
                                          </h5>
                                          <p className="text-[11px] text-gray-600 leading-relaxed font-normal pl-5">{it.desc}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        ) : currentSubPath === 'about/history' ? (
                          /* 9. History */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const introLine = lines[0] || '';
                              const parts = introLine.split('|');
                              const historyTitle = parts[0] || '성장 연혁 (History)';
                              const historyIntro = parts[1] || '원천기술 확보에서 글로벌 고성장·고수익 창출 기업으로 도약해 온 다산제약의 발자취입니다';
                              const historyHero = parts[2] || '/history_hero_spiral.png';

                              const eras: { eraTitle: string; eraSubtitle: string; events: { year: string; details: string[] }[] }[] = [];
                              let currentEra: { eraTitle: string; eraSubtitle: string; events: { year: string; details: string[] }[] } | null = null;

                              for (let i = 1; i < lines.length; i++) {
                                const line = lines[i].trim();
                                if (!line) continue;
                                if (line.startsWith('ERA:')) {
                                  const eraStr = line.substring(4);
                                  const [eraTitle, eraSubtitle] = eraStr.split('|');
                                  currentEra = { eraTitle: eraTitle || '', eraSubtitle: eraSubtitle || '', events: [] };
                                  eras.push(currentEra);
                                } else if (line.startsWith('YEAR:') && currentEra) {
                                  const yearStr = line.substring(5);
                                  const [yearLabel, detailsStr] = yearStr.split('|');
                                  const details = detailsStr ? detailsStr.split(/<br\s*\/?>/).map(s => s.trim()) : [];
                                  currentEra.events.push({ year: yearLabel || '', details });
                                }
                              }

                              const displayEras = eras.length > 0 ? eras : [
                                {
                                  eraTitle: '2022 ~ Present',
                                  eraSubtitle: '도약기',
                                  events: [
                                    { year: '2025', details: ['환경부 한국환경공단 스마트생태공장 구축 사업 선정'] },
                                    { year: '2024', details: ['글로벌강소기업 1000+ 프로젝트 선정 / ISO 45001 획득 / 중국 합작법인 설립'] },
                                    { year: '2023', details: ['부패방지경영시스템(ISO 37001) 인증 획득'] },
                                    { year: '2022', details: ['무역의날 700만불 수출탑 수상 / 청년친화 강소기업 선정'] }
                                  ]
                                },
                                {
                                  eraTitle: '2013 ~ 2021',
                                  eraSubtitle: '성장기',
                                  events: [
                                    { year: '2021', details: ['충청남도 우수기업인상 수상 / 글로벌 강소기업 선정'] },
                                    { year: '2019', details: ['매출 500억 원 달성 / 아산 제2공장 완공 / 심양연구소 확장'] },
                                    { year: '2017', details: ['사명 변경 (주식회사 다산제약)'] }
                                  ]
                                },
                                {
                                  eraTitle: '1996 ~ 2011',
                                  eraSubtitle: '설립기',
                                  events: [
                                    { year: '2008', details: ['매출 100억 원 달성 / KGMP 인증'] },
                                    { year: '2001', details: ['원료의약품 공장 준공 및 제조업 허가 취득'] },
                                    { year: '1996', details: ['주식회사 다산메디켐 설립'] }
                                  ]
                                }
                              ];

                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <div>
                                      <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">{historyTitle}</h3>
                                      <p className="text-xs text-gray-500 mt-0.5">{historyIntro}</p>
                                    </div>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full shrink-0">
                                      실시간 미리보기
                                    </span>
                                  </div>

                                  <div className="relative aspect-[21/8] rounded-xl overflow-hidden shadow-sm bg-slate-900">
                                    <img src={historyHero} alt="History Hero" className="w-full h-full object-cover object-center" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent flex items-center p-4">
                                      <div className="max-w-xs space-y-1">
                                        <span className="text-[9px] font-extrabold text-[#3a8b54] uppercase tracking-wider block">History</span>
                                        <p className="text-xs sm:text-sm font-black text-gray-900 leading-snug">
                                          신뢰와 혁신으로 미래를 향한 <span className="text-[#3a8b54]">DASAN</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="relative pl-6 space-y-6 border-l-2 border-gray-200">
                                    {displayEras.map((era, eIdx) => (
                                      <div key={eIdx} className="space-y-3 relative">
                                        <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-brand-green border-[3px] border-white shadow-sm" />
                                        <div className="flex items-center gap-2">
                                          <span className="px-2.5 py-0.5 bg-brand-green/10 text-brand-green font-extrabold text-xs rounded-full">
                                            {era.eraSubtitle}
                                          </span>
                                          <h4 className="font-black text-gray-900 text-xs sm:text-sm">{era.eraTitle}</h4>
                                        </div>

                                        <div className="space-y-2 pl-2">
                                          {era.events.map((ev, evIdx) => (
                                            <div key={evIdx} className="flex items-start gap-2 text-xs">
                                              <span className="font-black text-gray-900 shrink-0 w-12">{ev.year}</span>
                                              <div className="text-gray-600 leading-relaxed font-normal flex-1">
                                                {ev.details.map((d, dIdx) => (
                                                  <p key={dIdx} className="whitespace-pre-line">{d}</p>
                                                ))}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/ci' ? (
                          /* 10. CI */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const ciIntro = lines[0] || '육각형 심볼은 분자 구조와 함께 안정성과 신뢰를 상징하며, 대각선으로 절제된 워드마크는 혁신성과 기술적 진보를 표현합니다.';
                              const ciSymbol = lines[1] || '내부의 흐름형 그래픽은 생명과 기술의 연결을 의미하고, 그린 컬러는 생명·친환경·신뢰의 가치를 담고 있습니다.';
                              const primaryLogoDesc = lines[11] || '다산제약 브랜드 아이덴티티를 대표하는 메인 로고입니다.';
                              const clearSpaceDesc = lines[13] || '로고 최상의 시각적 효과와 식별을 위해 최소 사용 여백을 유지해야 합니다.';
                              const customLogo = lines[18] || lines[10] || '/clear_space_grid.png';

                              const greenHex = lines[4] || '#008953';
                              const lGreenHex = lines[16] || '#84BD00';
                              const charcoalHex = lines[8] || '#63666A';

                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">CI 소개 (Corporate Identity)</h3>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                      실시간 미리보기
                                    </span>
                                  </div>

                                  <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed text-gray-700">
                                    <h4 className="font-extrabold text-[#2A5C43] text-xs sm:text-sm">Corporate Identity</h4>
                                    <p className="whitespace-pre-line font-normal">{ciIntro}</p>
                                  </div>

                                  <div className="p-4 rounded-xl bg-slate-50/70 border border-gray-150 space-y-1">
                                    <h5 className="font-bold text-[#2A5C43] text-xs">심볼마크의 의미</h5>
                                    <p className="text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line">{ciSymbol}</p>
                                  </div>

                                  <div className="p-4 rounded-xl border border-gray-150 bg-white space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-bold text-gray-900 text-xs">Primary Logo</h5>
                                      <span className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">표준 규정</span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed whitespace-pre-line">{primaryLogoDesc}</p>
                                    <div className="bg-slate-50 border border-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[120px]">
                                      <img src={customLogo} alt="Primary Logo" className="max-h-[70px] object-contain" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 leading-normal">{clearSpaceDesc}</p>
                                  </div>

                                  <div className="p-4 rounded-xl border border-gray-150 bg-slate-50/70 space-y-3">
                                    <h5 className="font-bold text-gray-900 text-xs">전용 색상 (Color System)</h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                      <div className="p-3 bg-white rounded-xl border border-gray-150 space-y-2">
                                        <div className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: greenHex }} />
                                        <div>
                                          <span className="font-extrabold text-xs text-gray-900 block">DASAN GREEN</span>
                                          <span className="text-[10px] text-gray-500 font-mono block">{greenHex}</span>
                                        </div>
                                      </div>
                                      <div className="p-3 bg-white rounded-xl border border-gray-150 space-y-2">
                                        <div className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: lGreenHex }} />
                                        <div>
                                          <span className="font-extrabold text-xs text-gray-900 block">Light Green</span>
                                          <span className="text-[10px] text-gray-500 font-mono block">{lGreenHex}</span>
                                        </div>
                                      </div>
                                      <div className="p-3 bg-white rounded-xl border border-gray-150 space-y-2">
                                        <div className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: charcoalHex }} />
                                        <div>
                                          <span className="font-extrabold text-xs text-gray-900 block">CHARCOAL</span>
                                          <span className="text-[10px] text-gray-500 font-mono block">{charcoalHex}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/facilities' ? (
                          /* 11. Facilities */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const intro = lines[0] || '연구개발에서 생산, 글로벌 시장 진출까지 유기적으로 연결된 다산제약의 핵심 거점입니다.';
                              const heroImg = lines[15] || '/global_infrastructure_highway.jpg';

                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <div>
                                      <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">글로벌 인프라 (Global Infrastructure)</h3>
                                      <p className="text-xs text-gray-500 mt-0.5">{intro}</p>
                                    </div>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full shrink-0">
                                      실시간 미리보기
                                    </span>
                                  </div>

                                  <div className="relative aspect-[21/8] rounded-xl overflow-hidden shadow-sm bg-slate-900">
                                    <img src={heroImg} alt="Facilities Hero" className="w-full h-full object-cover object-center" />
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                                    <div className="p-4 rounded-xl border border-gray-150 bg-white space-y-2 shadow-2xs">
                                      <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-teal-50 text-teal-600"><Building2 size={18} /></div>
                                        <div>
                                          <span className="text-[9px] text-gray-400 font-extrabold uppercase block">Seoul Office</span>
                                          <h5 className="font-extrabold text-xs text-gray-900">서울사무소</h5>
                                        </div>
                                      </div>
                                      <p className="text-[11px] text-gray-600 leading-relaxed font-normal">경영, 영업, 구매, 사업개발 등 미래 성장 전략 수립</p>
                                    </div>

                                    <div className="p-4 rounded-xl border border-gray-150 bg-white space-y-2 shadow-2xs">
                                      <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600"><Zap size={18} /></div>
                                        <div>
                                          <span className="text-[9px] text-gray-400 font-extrabold uppercase block">R&D Network</span>
                                          <h5 className="font-extrabold text-xs text-gray-900">R&D 네트워크</h5>
                                        </div>
                                      </div>
                                      <p className="text-[11px] text-gray-600 leading-relaxed font-normal">다산 중앙연구소(수원) 및 중국 심양연구소 운영</p>
                                    </div>

                                    <div className="p-4 rounded-xl border border-gray-150 bg-white space-y-2 shadow-2xs">
                                      <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600"><Factory size={18} /></div>
                                        <div>
                                          <span className="text-[9px] text-gray-400 font-extrabold uppercase block">Production Base</span>
                                          <h5 className="font-extrabold text-xs text-gray-900">글로벌 생산시설</h5>
                                        </div>
                                      </div>
                                      <p className="text-[11px] text-gray-600 leading-relaxed font-normal">아산 제1·2공장 및 중국 합작법인 글로벌 대량 생산 체제</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/location' ? (
                          /* 12. Location */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const l40 = lines[40]?.trim();
                              const l32 = lines[32]?.trim();
                              const heroImg = (l40 && (l40.startsWith('/') || l40.startsWith('http')))
                                ? l40
                                : (l32 && (l32.startsWith('/uploads/') || l32.startsWith('http')))
                                ? l32
                                : '/location_hero.jpg';

                              const locations = [
                                { name: lines[0] || '서울 사무실', subName: lines[1] || '경영총괄, 해외 영업본부, 마케팅 전략부서', address: lines[4] || '서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호', phone: lines[5] || '02-2627-5300' },
                                { name: lines[8] || '수원 중앙연구소', subName: lines[9] || 'DDS 제제 연구, 유기합성 연구', address: lines[12] || '경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호', phone: lines[13] || '031-546-8200' },
                                { name: lines[16] || '아산 제1공장', subName: lines[17] || '완제의약품 생산본부', address: lines[20] || '충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)', phone: lines[21] || '041-543-5311' },
                                { name: lines[24] || '아산 제2공장', subName: lines[25] || '최첨단 스마트 패키징 & 대량생산 라인', address: lines[28] || '충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)', phone: lines[29] || '041-428-9484' },
                                { name: lines[32] || '중국 선양연구소', subName: lines[33] || '중국 현지 R&D 센터', address: lines[36] || 'Room 310, Building F9, Shangshengou Village, Hunnan District, Shenyang, Liaoning, 중국 110179', phone: lines[37] || '-' }
                              ];

                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">찾아오시는 길 (Location)</h3>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                      실시간 미리보기
                                    </span>
                                  </div>

                                  <div className="relative aspect-[21/8] rounded-xl overflow-hidden shadow-sm bg-slate-900">
                                    <img src={heroImg} alt="Location Hero" className="w-full h-full object-cover object-center" />
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {locations.map((loc, idx) => (
                                      <div key={idx} className="p-4 rounded-xl border border-gray-150 bg-slate-50/60 hover:bg-white transition-all space-y-2 shadow-2xs">
                                        <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                                          <h5 className="font-extrabold text-xs sm:text-sm text-gray-900 flex items-center gap-1.5">
                                            <MapPin size={14} className="text-brand-green" />
                                            <span>{loc.name}</span>
                                          </h5>
                                          <span className="text-[10px] text-gray-500 font-medium">{loc.subName}</span>
                                        </div>
                                        <div className="text-[11px] text-gray-600 space-y-1 font-normal">
                                          <p><strong className="text-gray-800 font-semibold">주소:</strong> {loc.address}</p>
                                          <p><strong className="text-gray-800 font-semibold">전화:</strong> {loc.phone}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/esg/ethics' ? (
                          /* 13-A. ESG: 지속가능경영 */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
                              const title = parts[0] || '지속가능경영 (ESG Management)';
                              const heroImage = hasImg ? parts[1] : '/images/ESG.jpg';
                              const htmlBody = hasImg ? parts.slice(2).join('|') : parts.slice(1).join('|');
                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">{title}</h3>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                      실시간 미리보기
                                    </span>
                                  </div>
                                  {/* Hero Banner Visual */}
                                  <div className="relative aspect-[21/8] rounded-xl overflow-hidden shadow-sm bg-slate-900">
                                    <img src={heroImage} alt="ESG Hero Banner" className="w-full h-full object-cover object-center" />
                                  </div>
                                  {/* Rich Content: if HTML, render via dangerouslySetInnerHTML so tags like <div style="..."> render properly! */}
                                  {htmlBody && (htmlBody.includes('<p') || htmlBody.includes('<h') || htmlBody.includes('<div') || htmlBody.includes('<ul')) ? (
                                    <div 
                                      className="prose prose-sm max-w-none text-gray-800 leading-relaxed [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-black [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-sm sm:[&_h4]:text-base [&_h4]:font-bold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:text-xs sm:[&_p]:text-[13px] [&_p]:text-gray-600 [&_p]:leading-[1.8] [&_ul]:list-none [&_ul]:p-0"
                                      dangerouslySetInnerHTML={{ __html: htmlBody }}
                                    />
                                  ) : (
                                    <div className="space-y-4">
                                      {(htmlBody || '').split('\n\n').map((para: string, i: number) => (
                                        <p key={i} className="text-xs sm:text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">{para}</p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/esg/code-of-ethics' ? (
                          /* 13-C. ESG: 윤리강령 */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const hasImg = parts.length >= 3 && (parts[1].startsWith('/') || parts[1].startsWith('http'));
                              const title = parts[0] || '윤리 강령';
                              const heroImage = hasImg ? parts[1] : '/images/ethics_banner.jpg';
                              const htmlBody = hasImg ? parts.slice(2).join('|') : parts.slice(1).join('|') || DEFAULT_CODE_OF_ETHICS_HTML;
                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">{title}</h3>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                      실시간 미리보기
                                    </span>
                                  </div>
                                  {/* Hero Banner Visual */}
                                  <div className="relative aspect-[21/8] rounded-xl overflow-hidden shadow-sm bg-slate-900">
                                    <img src={heroImage} alt="Code of Ethics Banner" className="w-full h-full object-cover object-center" />
                                  </div>
                                  {/* Rich Content */}
                                  {htmlBody && (htmlBody.includes('<p') || htmlBody.includes('<h') || htmlBody.includes('<div') || htmlBody.includes('<ul')) ? (
                                    <div 
                                      className="prose prose-sm max-w-none text-gray-800 leading-relaxed [&_h4]:text-sm sm:[&_h4]:text-base [&_h4]:font-bold [&_h4]:text-gray-900 [&_p]:text-xs sm:[&_p]:text-[13px] [&_p]:text-gray-600 [&_p]:leading-[1.8] [&_ul]:list-none [&_ul]:p-0"
                                      dangerouslySetInnerHTML={{ __html: htmlBody }}
                                    />
                                  ) : (
                                    <div className="space-y-4">
                                      {(htmlBody || '').split('\n\n').map((para: string, i: number) => (
                                        <p key={i} className="text-xs sm:text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">{para}</p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        ) : (currentSubPath === 'about/esg/environment' || currentSubPath === 'about/esg/safety' || currentSubPath === 'about/esg/anti-corruption') ? (
                          /* 13-B. ESG: Policy Pages (Environment, Safety, Anti-corruption) */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const esgData = parseEsgData(staticContent, currentSubPath);

                              return (
                                <div className="space-y-6">
                                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">{esgData.title}</h3>
                                    <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                      실시간 미리보기
                                    </span>
                                  </div>

                                  {esgData.imageUrl && (
                                    <div className="relative aspect-[21/8] rounded-xl overflow-hidden shadow-sm bg-slate-900">
                                      <img src={esgData.imageUrl} alt="ESG Banner" className="w-full h-full object-cover object-center" />
                                    </div>
                                  )}

                                  <div className="space-y-2 border-l-4 border-emerald-600 pl-3.5 py-0.5">
                                    {esgData.statement && (esgData.statement.includes('<p') || esgData.statement.includes('<div') || esgData.statement.includes('<h')) ? (
                                      <div className="text-xs sm:text-sm font-semibold text-gray-900 leading-relaxed" dangerouslySetInnerHTML={{ __html: esgData.statement }} />
                                    ) : (
                                      <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-relaxed whitespace-pre-line">
                                        {esgData.statement}
                                      </p>
                                    )}
                                    {esgData.bridgeText && (
                                      <p className="text-[11px] sm:text-xs text-gray-600 font-normal">
                                        {esgData.bridgeText}
                                      </p>
                                    )}
                                  </div>

                                  <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                                    {esgData.items.map((item: string, idx: number) => (
                                      <div key={idx} className="flex items-start gap-3 py-3">
                                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                          {idx + 1}
                                        </span>
                                        <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal flex-1 whitespace-pre-line">
                                          {item}
                                        </p>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="text-center pt-2 space-y-1.5">
                                    <p className="text-xs font-semibold text-gray-400">{esgData.date}</p>
                                    <p className="text-sm font-black text-gray-900">{esgData.signerCompany}</p>
                                    <p className="text-xs font-bold text-gray-800">대표이사 <span className="font-black text-gray-900 ml-1">{esgData.signerName}</span></p>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/ir/announcement' ? (
                          /* 14. IR Announcement */
                          <div className="bg-white p-6 sm:p-8 rounded-2xl text-gray-800 shadow-sm border border-gray-150 space-y-6">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const title = parts[0] || '주주 중심 경영과 공정한 기업 가치 평가';
                              const desc = parts[1] || '다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.';
                              const dartUrl = parts[2] || 'https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EB%8B%A4%EC%82%B0%EC%A0%9C%EC%95%BD';

                              return (
                                <div className="space-y-6">
                                  <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-gray-100">
                                    <div className="flex items-center space-x-2 sm:space-x-3 text-brand-green">
                                      <LineChart size={22} className="flex-shrink-0" />
                                      <h4 className="text-xs sm:text-base md:text-lg font-bold whitespace-nowrap tracking-tight leading-tight">{title}</h4>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                        실시간 미리보기
                                      </span>
                                      {dartUrl && (
                                        <a
                                          href={dartUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold transition-colors border border-blue-200"
                                        >
                                          <Globe size={14} />
                                          <span>DART 공시 새 창 열기</span>
                                        </a>
                                      )}
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <p className="text-gray-600 text-[13px] sm:text-sm tracking-tight leading-[1.8] break-keep whitespace-pre-line mt-1">
                                      {desc.replace(/\.\s+/g, '.\n')}
                                    </p>
                                  </div>

                                  <div className="w-full py-2 bg-white">
                                    <div className="w-full overflow-x-auto [scrollbar-width:thin] pb-3">
                                      <div className="min-w-[650px] max-w-[715px] h-[745px] mx-auto border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] bg-white">
                                        <iframe
                                          src={dartUrl}
                                          name="IR"
                                          scrolling="yes"
                                          frameBorder="0"
                                          className="w-full h-full"
                                          allowFullScreen
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'about/ir/financial' ? (
                          /* 15. IR Financial */
                          <div className="bg-white p-6 sm:p-8 rounded-2xl text-gray-800 shadow-sm border border-gray-150 space-y-6">
                            {(() => {
                              const lines = (staticContent || '').split('\n');
                              const title = lines[0] || '주주 중심 경영과 공정한 기업 가치 평가';
                              const desc = lines[1] || '다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.';

                              let financialHeaders = ['2023년 (개별)', '2024년 (개별)', '2025년 (연결)'];
                              let salesRow = ['매출액', '79,275', '92,734', '110,191'];
                              let profitRow = ['영업이익', '2,389', '6,068', '338'];
                              let rdRow = ['R&D 투자액', '9,500', '12,000', '13,500'];

                              if (lines[2]) financialHeaders = lines[2].split('|').map(s => s.trim());
                              if (lines[3]) salesRow = lines[3].split('|').map(s => s.trim());
                              if (lines[4]) profitRow = lines[4].split('|').map(s => s.trim());
                              if (lines[5]) rdRow = lines[5].split('|').map(s => s.trim());

                              let consolidatedBS = [
                                ['유동자산', '42,060', '49,466', '67,118'],
                                ['비유동자산', '31,197', '38,595', '43,297'],
                                ['자산총계', '73,257', '88,061', '110,415'],
                                ['유동부채', '39,071', '42,281', '61,928'],
                                ['비유동부채', '11,223', '14,582', '12,099'],
                                ['부채총계', '50,294', '56,863', '74,028'],
                                ['자본금', '1,120', '1,120', '1,120'],
                                ['자본잉여금', '3,583', '3,583', '3,583'],
                                ['기타자본', '-7,762', '-7,771', '-7,776'],
                                ['이익잉여금', '26,152', '34,248', '39,645'],
                                ['비지배지분', '-131', '17', '-185'],
                                ['자본총계', '22,962', '31,198', '36,388']
                              ];

                              let separateBS = [
                                ['유동자산', '41,899', '49,031', '65,212'],
                                ['비유동자산', '31,032', '38,621', '45,426'],
                                ['자산총계', '72,931', '87,652', '110,637'],
                                ['유동부채', '38,309', '41,738', '61,197'],
                                ['비유동부채', '11,223', '14,582', '11,887'],
                                ['부채총계', '49,531', '56,320', '73,084'],
                                ['자본금', '1,120', '1,120', '1,120'],
                                ['자본잉여금', '3,583', '3,583', '3,583'],
                                ['기타자본', '-7,766', '-7,766', '-7,766'],
                                ['이익잉여금', '26,462', '34,395', '40,616'],
                                ['자본총계', '23,400', '31,333', '37,554']
                              ];

                              let consolidatedIS = [
                                ['매출액', '80,027', '93,817', '110,191'],
                                ['영업이익', '1,867', '6,161', '338'],
                                ['법인세차감전순이익', '46', '8,247', '3,238'],
                                ['당기순이익', '1,815', '8,035', '3,690']
                              ];

                              let separateIS = [
                                ['매출액', '79,275', '92,734', '106,877'],
                                ['영업이익', '2,389', '6,068', '1,399'],
                                ['법인세차감전순이익', '547', '8,150', '4,547'],
                                ['당기순이익', '2,316', '7,929', '4,937']
                              ];

                              for (let i = 0; i < 12; i++) {
                                if (lines[6 + i]) {
                                  consolidatedBS[i] = lines[6 + i].split('|').map(s => s.trim());
                                }
                              }
                              for (let i = 0; i < 11; i++) {
                                if (lines[18 + i]) {
                                  separateBS[i] = lines[18 + i].split('|').map(s => s.trim());
                                }
                              }
                              for (let i = 0; i < 4; i++) {
                                if (lines[29 + i]) {
                                  consolidatedIS[i] = lines[29 + i].split('|').map(s => s.trim());
                                }
                              }
                              for (let i = 0; i < 4; i++) {
                                if (lines[33 + i]) {
                                  separateIS[i] = lines[33 + i].split('|').map(s => s.trim());
                                }
                              }

                              return (
                                <div className="space-y-6">
                                  <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-gray-100">
                                    <div className="flex items-center space-x-2 sm:space-x-3 text-brand-green">
                                      <LineChart size={22} className="flex-shrink-0" />
                                      <h4 className="text-xs sm:text-base md:text-lg font-bold whitespace-nowrap tracking-tight leading-tight">{title}</h4>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                                        실시간 미리보기
                                      </span>
                                      <ExcelDownloadButton
                                        financialHeaders={financialHeaders}
                                        salesRow={salesRow}
                                        profitRow={profitRow}
                                        consolidatedBS={consolidatedBS}
                                        separateBS={separateBS}
                                        consolidatedIS={consolidatedIS}
                                        separateIS={separateIS}
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <p className="text-gray-600 text-[13px] sm:text-sm tracking-tight leading-[1.8] break-keep whitespace-pre-line mt-1">
                                      {desc.replace(/\.\s+/g, '.\n')}
                                    </p>
                                  </div>

                                  <div className="space-y-6">
                                    {/* Core Financial Summary Table */}
                                    <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-none">
                                      <table className="w-full text-xs text-left border-collapse">
                                        <thead className="bg-brand-green text-white uppercase">
                                          <tr>
                                            <th className="p-3 border-b border-r border-gray-400 font-bold">재무 항목 (단위: 백만원)</th>
                                            {financialHeaders.map((header, idx) => {
                                              const isLastCol = idx === financialHeaders.length - 1;
                                              return (
                                                <th key={idx} className={`p-3 border-b ${isLastCol ? '' : 'border-r'} border-gray-400 font-bold text-center`}>{header}</th>
                                              );
                                            })}
                                          </tr>
                                        </thead>
                                        <tbody className="text-gray-700 bg-white">
                                          <tr className="hover:bg-brand-green-light/20">
                                            <td className="p-3 border-b border-r border-gray-400 font-bold text-brand-green-dark">{salesRow[0] || '매출액'}</td>
                                            {financialHeaders.map((_, colIdx) => {
                                              const isLastCol = colIdx === financialHeaders.length - 1;
                                              return (
                                                <td key={colIdx} className={`p-3 border-b ${isLastCol ? '' : 'border-r'} border-gray-400 text-center font-medium`}>{salesRow[colIdx + 1] || ''}</td>
                                              );
                                            })}
                                          </tr>
                                          <tr className="hover:bg-brand-green-light/20">
                                            <td className="p-3 border-r border-gray-400 font-bold text-brand-green-dark">{profitRow[0] || '영업이익'}</td>
                                            {financialHeaders.map((_, colIdx) => {
                                              const isLastCol = colIdx === financialHeaders.length - 1;
                                              return (
                                                <td key={colIdx} className={`p-3 ${isLastCol ? '' : 'border-r'} border-gray-400 text-center font-medium`}>{profitRow[colIdx + 1] || ''}</td>
                                              );
                                            })}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* Detailed Interactive Financial Tables Component */}
                                    <DetailedFinancialTables
                                      consolidatedBS={consolidatedBS}
                                      separateBS={separateBS}
                                      consolidatedIS={consolidatedIS}
                                      separateIS={separateIS}
                                      years={financialHeaders}
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : currentSubPath === 'rd/intro' ? (
                          /* 16. RD Intro */
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            <RdIntroContent dbContent={staticContent} />
                          </div>
                        ) : currentSubPath === 'rd/activities' ? (
                          /* 17. RD Activities */
                          <div className="bg-white p-6 rounded-xl text-gray-800 space-y-4 shadow-sm border border-gray-150">
                            <RdActivitiesContent dbContent={staticContent} />
                          </div>
                        ) : currentSubPath === 'business/finished/news' ? (
                          /* 18. Business Finished News */
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
                        ) : (currentSubPath === 'business/api' || currentSubPath === 'business/api/raw' || currentSubPath === 'business/api/intermediates') ? (
                          /* 19. Business API */
                          <div className="bg-white p-6 sm:p-10 rounded-2xl text-gray-800 space-y-6 shadow-sm border border-gray-150 text-left">
                            <ApiRawContent dbContent={staticContent} />
                          </div>
                        ) : (currentSubPath === 'business/cdmo' ||
                             currentSubPath === 'business/cdmo/quality' || 
                             currentSubPath === 'business/cdmo/advantages' || 
                             currentSubPath === 'business/cdmo/logistics') ? (
                          /* 20. Business CDMO */
                          <div className="bg-white p-6 sm:p-10 rounded-2xl text-gray-800 space-y-6 shadow-sm border border-gray-150 text-left">
                            <CdmoContent dbContent={staticContent} />
                          </div>
                        ) : currentSubPath === 'contact/careers/talent' ? (
                          /* 21. Careers: Talent */
                          <div className="bg-white p-6 sm:p-10 rounded-2xl text-gray-800 space-y-6 shadow-sm border border-gray-150 text-left">
                            <TalentValuesInteractive isEnglish={false} dbContent={staticContent} />
                          </div>
                        ) : currentSubPath === 'contact/careers/process' ? (
                          /* 22. Careers: Process */
                          <div className="bg-white p-6 sm:p-10 rounded-2xl text-gray-800 space-y-6 shadow-sm border border-gray-150 text-left">
                            <CareerProcessAlternating isEnglish={false} dbContent={staticContent} />
                          </div>
                        ) : (
                          /* 23. Generic Fallback in White Card */
                          <div className="bg-white p-5 sm:p-7 rounded-2xl text-gray-800 shadow-sm border border-gray-150">
                            {(() => {
                              const parts = (staticContent || '').split('|');
                              const title = parts[0] || '';
                              const body = parts[1] || parts[0] || '(입력된 문구가 여기에 표시됩니다)';
                              
                              if (parts.length >= 2) {
                                return (
                                  <div className="space-y-3">
                                    <h5 className="font-black text-gray-900 text-base pb-2 border-b border-gray-100 whitespace-pre-wrap">{title.replace(/\\n/g, '\n')}</h5>
                                    {body && (body.includes('<p') || body.includes('<div') || body.includes('<h') || body.includes('<ul')) ? (
                                        <div className="text-xs sm:text-[13px] text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: body }} />
                                      ) : (
                                        <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">{body}</p>
                                      )}
                                  </div>
                                );
                              }
                              return body && (body.includes('<p') || body.includes('<div') || body.includes('<h') || body.includes('<ul')) ? (
                                <div className="text-xs sm:text-[13px] text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: body }} />
                              ) : (
                                <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Content Editor Form */}
                    <div className="lg:col-span-5 2xl:col-span-4 bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-sm space-y-4 min-w-0">
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
                    <div className="lg:col-span-7 2xl:col-span-8 bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 md:p-6 shadow-sm space-y-4 min-w-0">
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

              {/* Case Backup: Backup Settings (Super Admin Only) */}
              {currentSubPath === 'backup-settings' && currentUser?.role === 'super_admin' && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="text-sm font-extrabold text-white">
                      데이터베이스 및 첨부파일 백업
                    </h3>
                  </div>
                  <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      현재 데이터베이스의 모든 데이터(게시글, 문의 내역, 통계 등)를 백업할 수 있습니다. 
                      첨부파일을 포함한 <strong>전체 백업</strong>은 용량이 클 수 있으며, 데이터만 백업하는 <strong>DB 전용 백업</strong>은 매우 빠르고 가볍습니다.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          window.location.href = `/api/backup?type=full&t=${Date.now()}`;
                        }}
                        className="inline-flex items-center space-x-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-md shadow-brand-green/20"
                      >
                        <Download size={16} />
                        <span>전체 백업 (데이터 + 첨부파일 .zip)</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          window.location.href = `/api/backup?type=db_only&t=${Date.now()}`;
                        }}
                        className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
                      >
                        <Download size={16} />
                        <span>DB 파일만 백업 (데이터 .zip)</span>
                      </button>
                    </div>
                  </div>

                  {/* Backup Logs Table */}
                  <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-4 mt-8">
                    <h4 className="text-white font-bold text-sm">최근 백업 이력</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-300">
                        <thead className="text-xs text-gray-400 bg-white/5 border-b border-white/10">
                          <tr>
                            <th className="px-4 py-3 font-semibold rounded-tl-lg">일시</th>
                            <th className="px-4 py-3 font-semibold">관리자 (ID)</th>
                            <th className="px-4 py-3 font-semibold">백업 종류</th>
                            <th className="px-4 py-3 font-semibold rounded-tr-lg">IP 주소</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {backupLogs.length > 0 ? (
                            backupLogs.map((log: any, idx: number) => (
                              <tr key={idx} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3">{new Date(log.created_at).toLocaleString('ko-KR')}</td>
                                <td className="px-4 py-3">{log.name} ({log.username})</td>
                                <td className="px-4 py-3">
                                  {log.type === 'full' ? (
                                    <span className="px-2 py-1 bg-brand-green/20 text-brand-green rounded text-xs">전체 백업</span>
                                  ) : (
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">DB 전용 백업</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">
                                  {log.ip_address === '::1' ? '127.0.0.1' : log.ip_address}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                백업 기록이 없습니다.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Case H: Popups Management */}
              {currentSubPath === 'popups' && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="text-sm font-extrabold text-white">
                      팝업 관리
                    </h3>
                    <button
                      onClick={() => {
                        setFormMode('create');
                        setPopupTitle('');
                        setPopupContent('');
                        setPopupLinkUrl('');
                        setPopupStartDate('');
                        setPopupEndDate('');
                        setPopupIsActive(true);
                        setPopupWidth(400);
                        setPopupHeight(400);
                        setPopupTop(100);
                        setPopupLeft(100);
                        setShowFormModal(true);
                      }}
                      className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                    >
                      <Plus size={14} />
                      <span>신규 팝업 등록</span>
                    </button>
                  </div>

                  <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="px-5 py-4 w-[10%]">상태</th>
                            <th className="px-5 py-4 w-[35%]">제목</th>
                            <th className="px-5 py-4 w-[25%]">노출 기간</th>
                            <th className="px-5 py-4 w-[15%]">등록일</th>
                            <th className="px-5 py-4 w-[15%] text-right">관리</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                          {popups.length > 0 ? (
                            popups.map(p => (
                              <tr key={p.id} className="hover:bg-white/[0.04] border-b border-white/5 last:border-0 transition-colors">
                                <td className="px-5 py-4">
                                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase border ${p.is_active ? 'bg-brand-green/20 text-brand-green border-brand-green/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                                    {p.is_active ? '활성' : '비활성'}
                                  </span>
                                </td>
                                <td className="px-5 py-4 font-bold text-white">{p.title}</td>
                                <td className="px-5 py-4 text-xs text-gray-400">
                                  {p.start_date ? new Date(p.start_date).toLocaleDateString() : '무기한'} ~ <br/>
                                  {p.end_date ? new Date(p.end_date).toLocaleDateString() : '무기한'}
                                </td>
                                <td className="px-5 py-4 text-xs text-gray-500">
                                  {new Date(p.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-5 py-4 text-right space-x-2">
                                  <button
                                    onClick={() => {
                                      setFormMode('edit');
                                      setActiveItem(p);
                                      setPopupTitle(p.title);
                                      setPopupContent(p.content || '');
                                      setPopupLinkUrl(p.link_url || '');
                                      setPopupStartDate(p.start_date ? new Date(p.start_date).toISOString().slice(0, 10) : '');
                                      setPopupEndDate(p.end_date ? new Date(p.end_date).toISOString().slice(0, 10) : '');
                                      setPopupIsActive(!!p.is_active);
                                      setPopupWidth(p.width || 400);
                                      setPopupHeight(p.height || 400);
                                      setPopupTop(p.top_pos || 100);
                                      setPopupLeft(p.left_pos || 100);
                                      setShowFormModal(true);
                                    }}
                                    className="text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm('이 팝업을 삭제하시겠습니까?')) {
                                        try {
                                          const res = await fetch(`/api/management/popups?id=${p.id}`, { method: 'DELETE' });
                                          if (res.ok) fetchPopups();
                                        } catch (e) {
                                          console.error(e);
                                        }
                                      }
                                    }}
                                    className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="text-center py-12 text-gray-500 text-xs">
                                등록된 팝업이 없습니다.
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
                      onClick={() => {
                        setSelectedVisitorDate(null);
                        setShowVisitorModal(true);
                      }}
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
                      onClick={() => {
                        setInquiryCategoryFilter('all');
                        navigateTo('inquiries');
                      }}
                      className="bg-[#0a1120]/65 border border-white/10 rounded-2xl p-5 shadow-sm space-y-2 hover:border-rose-300 hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block group-hover:text-rose-500 transition-colors">1:1 문의 / 접수 내역</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-black text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]">{inquiries.length}</span>
                        <span className="text-[10px] text-gray-400 font-bold">건</span>
                      </div>
                      <p className="text-[10px] text-gray-400 group-hover:underline">문의 및 채용지원 내역 관리 이동</p>
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
                          onClick={() => navigateTo('business/finished/search')}
                          className="flex items-center justify-center flex-1 py-2 bg-white/5 hover:bg-brand-green/10 text-gray-300 hover:text-brand-green border border-white/10 hover:border-brand-green/30 rounded-lg transition-all cursor-pointer"
                        >
                          제품 {products.length}개
                        </button>
                        <button 
                          onClick={() => navigateTo('rd/pipeline')}
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
                                    onClick={() => {
                                      setSelectedVisitorDate(d.visit_date);
                                      setShowVisitorModal(true);
                                    }}
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
                          onClick={() => navigateTo('contact/inquiry/check')}
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
                              navigateTo('contact/inquiry/check');
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
        </main>

      </div>

      {/* 4. CRUD Modals */}
      {/* Phase Manager Modal */}
      {showPhaseManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none">
          <div className="bg-[#0a1120]/90 border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative text-white backdrop-blur-xl">
            <h3 className="text-lg font-bold">단계 설정</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPhaseName}
                  onChange={(e) => setNewPhaseName(e.target.value)}
                  placeholder="새로운 단계 이름 입력"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg outline-none p-2 text-sm text-white focus:border-brand-green"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPhase()}
                />
                <button
                  onClick={handleAddPhase}
                  className="bg-[#1F4E78] hover:bg-[#153a5b] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                >
                  추가
                </button>
              </div>

              <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                {editingPhases.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">등록된 단계가 없습니다.</div>
                ) : (
                  <ul className="divide-y divide-white/10">
                    {editingPhases.map((phase, idx) => (
                      <li 
                        key={phase} 
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center justify-between p-3 transition-colors cursor-grab active:cursor-grabbing select-none ${
                          draggedIndex === idx ? 'bg-white/10 opacity-50 border border-brand-green/30 rounded-lg' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical size={14} className="text-gray-500 cursor-grab" />
                          <span className="text-sm font-semibold">{phase}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMovePhase(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleMovePhase(idx, 'down')}
                            disabled={idx === editingPhases.length - 1}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                          >
                            ▼
                          </button>
                          <button
                            onClick={() => handleRemovePhase(phase)}
                            className="p-1 ml-2 text-gray-500 hover:text-red-450 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div 
                className="flex items-center justify-between p-3.5 border border-white/10 rounded-lg bg-white/5 cursor-pointer hover:bg-white/[0.08] transition-colors"
                onClick={() => setEditingHideProjectName(!editingHideProjectName)}
              >
                <div>
                  <span className="text-xs md:text-sm font-bold block text-white">프로젝트명 컬럼 숨기기</span>
                  <span className="text-[11px] text-gray-400">체크 시 차트 및 대시보드에서 '프로젝트명' 열을 숨깁니다.</span>
                </div>
                <input
                  type="checkbox"
                  checked={editingHideProjectName}
                  onChange={(e) => setEditingHideProjectName(e.target.checked)}
                  className="w-4.5 h-4.5 accent-brand-green cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <p className="text-xs text-gray-400">
                주의: 단계를 삭제하면 이미 해당 단계로 등록된 프로젝트의 차트 표출에 문제가 생길 수 있습니다. 가급적 삭제보다는 이름 변경(삭제 후 동일 위치에 추가)이나 새로운 단계 추가를 권장합니다.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                onClick={handleSavePhases}
                disabled={isSavingPhases}
                className="px-6 py-2 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-sm font-bold shadow-md transition-colors disabled:opacity-50"
              >
                {isSavingPhases ? '저장 중...' : '저장하기'}
              </button>
              <button
                onClick={() => setShowPhaseManager(false)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/10 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none">
          <div className="bg-[#0a1120]/90 border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative text-white backdrop-blur-xl">
            <h3 className="text-lg font-bold">분류 설정</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="새로운 분류 이름 입력 (예: 바이오의약품)"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg outline-none p-2 text-sm text-white focus:border-brand-green"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer"
                >
                  추가
                </button>
              </div>

              <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 max-h-64 overflow-y-auto">
                {editingCategories.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">등록된 분류가 없습니다.</div>
                ) : (
                  <ul className="divide-y divide-white/10">
                    {editingCategories.map((cat, idx) => (
                      <li 
                        key={cat} 
                        draggable={true}
                        onDragStart={(e) => handleCatDragStart(e, idx)}
                        onDragOver={(e) => handleCatDragOver(e, idx)}
                        onDragEnd={handleCatDragEnd}
                        className={`flex items-center justify-between p-3 transition-colors cursor-grab active:cursor-grabbing select-none ${
                          draggedCatIndex === idx ? 'bg-white/10 opacity-50 border border-brand-green/30 rounded-lg' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical size={14} className="text-gray-500 cursor-grab" />
                          <span className="text-sm font-semibold">{cat}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveCategory(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleMoveCategory(idx, 'down')}
                            disabled={idx === editingCategories.length - 1}
                            className="p-1 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            ▼
                          </button>
                          <button
                            onClick={() => handleRemoveCategory(cat)}
                            className="p-1 ml-2 text-gray-500 hover:text-red-450 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="text-xs text-gray-400">
                원하는 분류 명칭을 자율적으로 텍스트 입력하여 추가하거나 순서를 드래그/화살표 버튼으로 지정할 수 있습니다.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                onClick={handleSaveCategories}
                disabled={isSavingCategories}
                className="px-6 py-2 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-sm font-bold shadow-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSavingCategories ? '저장 중...' : '저장하기'}
              </button>
              <button
                onClick={() => setShowCategoryManager(false)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none">
          <div className="bg-[#0a1120]/90 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative text-white backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-green to-brand-cyan/50" />
            <h3 className="text-lg font-black text-white tracking-tight pb-2 border-b border-white/10">
              {currentSubPath === 'contact/newsroom/media' ? (formMode === 'create' ? '새 홍보사진 등록' : '홍보사진 수정') : formMode === 'create' ? '신규 데이터 등록' : '데이터 정보 수정'}
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
                      <option value="전문의약품" className="bg-[#0a1120] text-white">전문의약품</option>
                      <option value="일반의약품" className="bg-[#0a1120] text-white">일반의약품</option>
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
                        <option key={c} value={c} className="bg-[#0a1120] text-white">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">계열</label>
                    <input type="text" value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} placeholder="계열 (예: 순환기계)" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">성분명</label>
                    <input type="text" value={prodIngredient} onChange={(e) => setProdIngredient(e.target.value)} placeholder="성분명" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">함량</label>
                    <input type="text" value={prodContent} onChange={(e) => setProdContent(e.target.value)} placeholder="함량 (예: 75mg)" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">대조약</label>
                    <input type="text" value={prodReferenceDrug} onChange={(e) => setProdReferenceDrug(e.target.value)} placeholder="대조약" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">상세 효능/효과</label>
                    <textarea value={prodEfficacyDetail} onChange={(e) => setProdEfficacyDetail(e.target.value)} placeholder="상세 효능/효과" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold min-h-[80px]" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">성상</label>
                    <input type="text" value={prodAppearance} onChange={(e) => setProdAppearance(e.target.value)} placeholder="성상" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">성분/함량 상세</label>
                    <textarea value={prodIngredientDetail} onChange={(e) => setProdIngredientDetail(e.target.value)} placeholder="성분/함량 상세" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold min-h-[80px]" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">용법/용량</label>
                    <textarea value={prodUsageCapacity} onChange={(e) => setProdUsageCapacity(e.target.value)} placeholder="용법/용량" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold min-h-[80px]" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">저장방법</label>
                    <input type="text" value={prodStorageMethod} onChange={(e) => setProdStorageMethod(e.target.value)} placeholder="저장방법" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">포장단위</label>
                    <input type="text" value={prodPackagingUnit} onChange={(e) => setProdPackagingUnit(e.target.value)} placeholder="포장단위" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                  </div>
                  <div className="space-y-1 flex gap-4">
                    <div className="flex-1 space-y-1">
                      <label className="font-bold text-gray-400 block">보험코드</label>
                      <input type="text" value={prodInsuranceCode} onChange={(e) => setProdInsuranceCode(e.target.value)} placeholder="보험코드" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="font-bold text-gray-400 block">보험약가(원)</label>
                      <input type="number" value={prodInsurancePrice} onChange={(e) => setProdInsurancePrice(e.target.value === '' ? '' : Number(e.target.value))} placeholder="보험약가" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">의약정보/주의사항</label>
                    <textarea value={prodPrecautions} onChange={(e) => setProdPrecautions(e.target.value)} placeholder="의약정보/주의사항" className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold min-h-[80px]" />
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
                            const res = await fetch('/api/upload?removeBg=true', {
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
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-white">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={prodFileUrl} alt="Preview" className="w-full h-full object-contain p-1" />
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
                    <label className="font-bold text-gray-400 block">분류</label>
                    <select
                      value={pipeCategory}
                      onChange={(e) => setPipeCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    >
                      {dynamicCategories.map(cat => (
                        <option key={cat} value={cat} className="bg-[#0a1120] text-white">{cat}</option>
                      ))}
                      {pipeCategory && !dynamicCategories.includes(pipeCategory) && (
                        <option value={pipeCategory} className="bg-[#0a1120] text-white">{pipeCategory}</option>
                      )}
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
                    <label className="font-bold text-gray-400 block">적응증</label>
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
                    <label className="font-bold text-gray-400 block">단계</label>
                    <select
                      value={pipePhase}
                      onChange={(e) => setPipePhase(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    >
                      {dynamicPhases.map(ph => (
                        <option key={ph} value={ph} className="bg-[#0a1120] text-white">{ph}</option>
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

              {/* Media Room Form (홍보사진 전용) */}
              {currentSubPath === 'contact/newsroom/media' && (
                <div className="space-y-4 text-xs">
                  {/* Photo Upload Area */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-300 flex items-center space-x-1.5">
                      <span>홍보 사진 등록</span>
                      <span className="text-brand-green font-bold text-[11px]">(필수)</span>
                    </label>
                    <input
                      type="file"
                      id="media-photo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (!file.type.startsWith('image/')) {
                          alert('이미지 파일(JPG, PNG, WebP 등)만 업로드할 수 있습니다.');
                          return;
                        }

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
                            alert('사진 업로드에 실패했습니다.');
                          }
                        } catch (err) {
                          console.error('File upload error:', err);
                          alert('사진 업로드 중 오류가 발생했습니다.');
                        } finally {
                          setUploadingFile(false);
                        }
                      }}
                    />

                    {newsFileUrl ? (
                      <div className="rounded-2xl border border-brand-green/40 bg-white/[0.03] p-4 flex flex-col md:flex-row items-center gap-4">
                        <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-white/10 bg-black/50 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={newsFileUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2 w-full">
                          <p className="text-gray-300 font-semibold text-xs truncate max-w-md">
                            {newsFileName || '업로드된 사진'}
                          </p>
                          <div className="flex items-center space-x-2">
                            <label
                              htmlFor="media-photo-upload"
                              className="px-3 py-1.5 bg-brand-green/20 border border-brand-green/40 text-brand-green rounded-lg text-xs font-bold hover:bg-brand-green/30 cursor-pointer transition-colors"
                            >
                              {uploadingFile ? '업로드 중...' : '사진 변경'}
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setNewsFileUrl('');
                                setNewsFileName('');
                              }}
                              className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 cursor-pointer transition-colors"
                            >
                              사진 삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="media-photo-upload"
                        className="border-2 border-dashed border-white/20 hover:border-brand-green rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white/[0.02] hover:bg-brand-green/5 flex flex-col items-center justify-center space-y-2 group block"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-brand-green group-hover:scale-110 transition-all">
                          <UploadCloud size={20} />
                        </div>
                        <p className="text-xs font-bold text-gray-300 group-hover:text-brand-green transition-colors">
                          {uploadingFile ? '사진 업로드 중...' : '클릭하여 홍보사진 파일 선택 (JPG, PNG, WebP 등)'}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          권장 비율 16:10, 고해상도 이미지 권장
                        </p>
                      </label>
                    )}
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">
                      홍보자료 제목 <span className="text-brand-green font-bold text-[11px]">(필수)</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="예: 다산제약 최첨단 cGMP 스마트 생산시설 준공식"
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold"
                    />
                  </div>

                  {/* Description / Content (Optional) */}
                  <div className="space-y-1">
                    <label className="font-bold text-gray-400 block">
                      상세 설명 <span className="text-gray-500 font-normal text-[11px]">(선택 사항)</span>
                    </label>
                    <textarea
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      rows={4}
                      placeholder="사진에 대한 설명을 입력해주세요 (선택 사항)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl outline-none p-3 text-xs md:text-sm text-white focus:border-brand-green focus:bg-white/[0.07] transition-all font-semibold resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Standard News / Board Form */}
              {(currentSubPath === 'contact/newsroom/press' ||
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
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-white">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={newsFileUrl} alt="Preview" className="w-full h-full object-contain p-1" />
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
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-white">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={newsFileUrl} alt="Preview" className="w-full h-full object-contain p-1" />
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

              {/* Popups Form Fields */}
              {currentSubPath === 'popups' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">제목 <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={popupTitle}
                      onChange={e => setPopupTitle(e.target.value)}
                      className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all placeholder:text-gray-600"
                      placeholder="팝업 제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">내용 (에디터)</label>
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <RichTextEditor
                        value={popupContent}
                        onChange={setPopupContent}
                        placeholder="팝업 내용 또는 이미지를 입력하세요"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">연결 링크 URL (선택)</label>
                    <input
                      type="text"
                      value={popupLinkUrl}
                      onChange={e => setPopupLinkUrl(e.target.value)}
                      className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all placeholder:text-gray-600"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">노출 시작일 (선택)</label>
                      <CustomDatePicker
                        value={popupStartDate}
                        onChange={setPopupStartDate}
                        placeholder="시작일 (YYYY-MM-DD)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">노출 종료일 (선택)</label>
                      <CustomDatePicker
                        value={popupEndDate}
                        onChange={setPopupEndDate}
                        placeholder="종료일 (YYYY-MM-DD)"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">크기 (너비 x 높이)</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={popupWidth}
                          onChange={e => setPopupWidth(Number(e.target.value))}
                          placeholder="가로"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                        <input
                          type="number"
                          value={popupHeight}
                          onChange={e => setPopupHeight(Number(e.target.value))}
                          placeholder="세로"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">위치 (상단 x 좌측)</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={popupTop}
                          onChange={e => setPopupTop(Number(e.target.value))}
                          placeholder="Top"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                        <input
                          type="number"
                          value={popupLeft}
                          onChange={e => setPopupLeft(Number(e.target.value))}
                          placeholder="Left"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="popupIsActive"
                      checked={popupIsActive}
                      onChange={e => setPopupIsActive(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green bg-white/5"
                    />
                    <label htmlFor="popupIsActive" className="text-xs font-bold text-gray-300 cursor-pointer">
                      사용자 페이지에 즉시 노출 (활성화)
                    </label>
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
                    <th className="py-2.5 pl-4">방문 IP 목록</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(dashboardStats?.uniqueVisitors || [])
                    .filter((v: any) => !selectedVisitorDate || v.visit_date.endsWith(selectedVisitorDate.replace('/', '-')))
                    .map((v: any, idx: number) => (
                    <tr key={idx} className="text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-3 font-mono font-bold text-brand-cyan align-top">{v.visit_date}</td>
                      <td className="py-3 font-mono text-[10px] pl-4 space-y-1.5 max-w-[260px]">
                        <div className="space-y-1.5 flex flex-col">
                          {v.pc_ips && v.pc_ips.split(',').map((ip: string, i: number) => (
                            <div key={`pc-${i}`} className="flex items-center space-x-1.5">
                              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-[4px] text-[8px] font-black shrink-0 w-[46px] text-center">PC</span>
                              <span className="text-gray-300 w-28">{ip.trim()}</span>
                              <span className="text-gray-500 font-bold ml-1 text-right w-16">1명</span>
                            </div>
                          ))}
                          {v.mobile_ips && v.mobile_ips.split(',').map((ip: string, i: number) => (
                            <div key={`mob-${i}`} className="flex items-center space-x-1.5">
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-[4px] text-[8px] font-black shrink-0 w-[46px] text-center">모바일</span>
                              <span className="text-gray-300 w-28">{ip.trim()}</span>
                              <span className="text-gray-500 font-bold ml-1 text-right w-16">1명</span>
                            </div>
                          ))}
                          {!v.pc_ips && !v.mobile_ips && (
                            <span className="text-gray-500">-</span>
                          )}
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center space-x-1.5">
                          <span className="w-[46px] shrink-0"></span>
                          <span className="w-28"></span>
                          <span className="text-white font-bold ml-1 text-right w-16 whitespace-nowrap">
                            총 {v.visitor_count}명
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!dashboardStats?.uniqueVisitors || dashboardStats.uniqueVisitors.length === 0) && (
                    <tr>
                      <td colSpan={2} className="py-8 text-center text-gray-500">
                        방문 기록이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t border-white/20 bg-white/5">
                    <td className="py-4 font-bold text-gray-300 text-center">전체 합계</td>
                    <td className="py-4 pl-4">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-[46px] shrink-0"></span>
                        <span className="w-28"></span>
                        <span className="text-emerald-400 font-bold ml-1 text-right w-16 whitespace-nowrap">
                          총 {selectedVisitorDate
                            ? (dashboardStats?.uniqueVisitors || [])
                                .filter((v: any) => v.visit_date.endsWith(selectedVisitorDate.replace('/', '-')))
                                .reduce((sum: number, v: any) => sum + Number(v.visitor_count || 0), 0)
                            : (dashboardStats?.totalCount || 0)}명
                        </span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
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

      {/* Email Resend Modal */}
      {showResendModal && resendInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0b1329] border border-white/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-white animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Mail size={16} />
                </div>
                <h3 className="text-sm font-bold text-white">알림 메일 재발송</h3>
              </div>
              <button
                onClick={() => !isResendingEmail && setShowResendModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-white/5 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">제목</span>
                <span className="text-white font-semibold">{resendInquiry.subject}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">작성자 / 지원자</span>
                  <span className="text-gray-200">{resendInquiry.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">접수 일시</span>
                  <span className="text-gray-200">{new Date(resendInquiry.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 block">
                수신 이메일 주소 <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                value={resendTargetEmail}
                onChange={(e) => setResendTargetEmail(e.target.value)}
                placeholder="예: insa@dspharm.com, jssong@dspharm.com"
                disabled={isResendingEmail}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-emerald-500 text-xs text-white outline-none transition-all placeholder:text-gray-500 font-mono"
              />
              <p className="text-[11px] text-gray-400">
                쉼표(,)로 구분하여 여러 명의 수신자에게 동시에 발송할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-white/10">
              <button
                type="button"
                disabled={isResendingEmail}
                onClick={() => setShowResendModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold rounded-xl border border-white/10 transition-all cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                disabled={isResendingEmail || !resendTargetEmail.trim()}
                onClick={handleConfirmResendEmail}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-900/30"
              >
                {isResendingEmail ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>발송 중...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>지금 재발송하기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
