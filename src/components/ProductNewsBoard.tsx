'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Download, Sparkles } from 'lucide-react';

export interface ProductNewsItem {
  id: number;
  category: '신제품' | '허가변경' | '낱알변경' | '기타변경' | string;
  title: string;
  date: string;
  views: number;
  content?: string;
  file_url?: string | null;
  file_name?: string | null;
  isNew?: boolean;
}

interface ProductNewsBoardProps {
  initialItems?: ProductNewsItem[];
  isEnglish?: boolean;
}

// Sample dataset for Dasan Pharmaceuticals product news
export const sampleNewsItems: ProductNewsItem[] = [
  {
    id: 1,
    category: '신제품',
    title: "고혈압·이상지질혈증 3복합 개량신약 '피마스탄플러스정' 식약처 품목허가 획득 및 공식 출시",
    date: '2026-08-12',
    views: 428,
    isNew: true,
    content: `다산제약 독자 DDS(약물전달시스템) 서방성 과립 특허 기술이 적용된 고혈압·이상지질혈증 3복합 개량신약 '피마스탄플러스정'의 식품의약품안전처 품목허가가 최종 승인되어 시판을 개시합니다.

■ 제품 특장점
- 1일 1회 복용으로 복약 순응도 향상 및 정제 크기 소형화 구현
- 자체 특허 코팅 기술을 통해 복합 성분 간 방출 속도 최적화
- Clinical Phase III 연구를 통해 안전성 및 유효성 데이터 입증

■ 공급 포장 단위: 30정/병, 300정/병
■ 문의처: 다산제약 완제영업본부 (02-2627-5300)`,
    file_name: '피마스탄플러스정_제품소개서_및_성상안내.pdf'
  },
  {
    id: 2,
    category: '허가변경',
    title: "'다산 엠파글리플로진/메트포르민 서방정 10/1000mg' 용법·용량 및 사용상의 주의사항 개정 안내",
    date: '2026-08-05',
    views: 612,
    content: `식품의약품안전처의 SGLT-2 억제제 계열 안전성 평가 결과에 따른 허가사항 변경 지시 반영 안내입니다.

1. 변경 품목: 다산 엠파글리플로진/메트포르민 서방정 10/1000mg
2. 주요 개정 사항:
  - 효능·효과: 제2형 당뇨병 환자 중 신기능 저하(eGFR 45mL/min/1.73m² 이상) 환자 투여 기준 정비
  - 용법·용량: 투여 개시 및 중단 시 신장 기능 모니터링 주기 명시
  - 사용상의 주의사항: 수술 전 투여 중지 기간 및 체액 감소 관련 경고 문구 정밀화
3. 변경 적용일: 2026년 8월 5일 자 배포분부터 순차 적용`,
    file_name: '엠파글리플로진_메트포르민_허가변경대조표.pdf'
  },
  {
    id: 3,
    category: '낱알변경',
    title: "'다산 펠로디핀 서방정 5mg' 정제 식별 마킹(DS 5 -> DS-P5) 및 성상 안내",
    date: '2026-07-28',
    views: 389,
    content: `완제의약품 처방 및 조제 오투약 방지 및 시각 인식성 개선을 위해 '다산 펠로디핀 서방정 5mg'의 낱알 식별 표기가 아래와 같이 변경되어 출하됩니다.

- 제품명: 다산 펠로디핀 서방정 5mg
- 기존 식별: 전면 [DS 5] (음각)
- 변경 식별: 전면 [DS-P5] (음각 가독성 강화)
- 정제 모양 및 색상: 기존과 동일 (원형 분홍색 서방정)
- 적용 제조번호: Batch No. 260701 제조분부터 적용`,
    file_name: '펠로디핀서방정5mg_낱알식별_변경안내문.pdf'
  },
  {
    id: 4,
    category: '신제품',
    title: "만성 소화불량 개선 개량신약 '모사프리드 서방정 15mg' 신규 제형 런칭",
    date: '2026-07-19',
    views: 520,
    isNew: true,
    content: `위장관 운동조절제 모사프리드 서방형 15mg 제형이 다산제약중앙연구소의 이중층 타정 기술을 통해 새롭게 출시되었습니다. 기존 1일 3회 복용을 1일 1회로 단축하여 환자의 편의성을 대폭 높였습니다.`
  },
  {
    id: 5,
    category: '허가변경',
    title: "'다산 펙소페나딘염산염정 120mg' 신장애 환자 투여 기준 및 이상반응 반영",
    date: '2026-07-11',
    views: 745,
    content: `항히스타민제 펙소페나딘염산염정 120mg의 사용상의 주의사항 개정 건 안내입니다. 신장 장애 환자에서의 초기 용량 조절 권고사항이 추가되었습니다.`
  },
  {
    id: 6,
    category: '기타변경',
    title: "완제의약품 소박스 잉크젯 바코드 마킹 위치 표준화 및 외부 라벨 디자인 리뉴얼",
    date: '2026-06-30',
    views: 310,
    content: `아산 제2공장 스마트 물류 패키징 오토메이션 라인 도입에 따라 소박스 측면 2D 바코드 및 제조번호/유효기한 잉크젯 표시 위치가 하단 표준 위치로 일원화됩니다.`
  },
  {
    id: 7,
    category: '허가변경',
    title: "'다산 로수바스타틴/에제티미브 복합제' 약물상호작용 및 기저질환자 주의사항 개정",
    date: '2026-06-22',
    views: 890,
    content: `이상지질혈증 치료제 로수바스타틴/에제티미브 복합제의 병용 투여 시 주의 약물 목록 및 간 기능 모니터링 수칙이 최신 임상 가이드라인에 맞춰 업데이트 되었습니다.`
  },
  {
    id: 8,
    category: '낱알변경',
    title: "'다산 레바미피드정 100mg' 조제 편의성 향상을 위한 양면 십자 분할선 추가",
    date: '2026-06-15',
    views: 452,
    content: `약국 조제 작업 시 정제 분할 용이성을 위해 다산 레바미피드정 100mg 표면에 양면 십자 분할선(Cross score)이 새롭게 적용되었습니다.`
  },
  {
    id: 9,
    category: '신제품',
    title: "제2형 당뇨병 복합제 '다파글리플로진/시타글립틴 10/100mg' 식약처 허가 취득",
    date: '2026-06-02',
    views: 935,
    content: `SGLT-2 억제제와 DPP-4 억제제 성분을 결합한 강력한 당뇨 복합제 '다파시타정 10/100mg'의 국내 품목 허가가 완료되었습니다.`
  },
  {
    id: 10,
    category: '기타변경',
    title: "아산 완제의약품 스마트 포장 라인 도입에 따른 PTP 알루미늄 재질 강화 안내",
    date: '2026-05-20',
    views: 610,
    content: `PTP 블리스터 포장 알루미늄 힐링 필름 재질이 습기 및 차광성에 더욱 우수한 수입 최고급 알루미늄 호일로 업그레이드됩니다.`
  },
  {
    id: 11,
    category: '허가변경',
    title: "'다산 세레콕시브 캡슐 200mg' 심혈관계 위험성 관련 사용상의 주의사항 업데이트",
    date: '2026-05-08',
    views: 940,
    content: `소염진통제 세레콕시브 캡슐 200mg 허가사항 변경 대조표 및 사용자 주의 문구가 개정되어 반영되었습니다.`
  },
  {
    id: 12,
    category: '낱알변경',
    title: "'다산 실로스타졸 서방정 100mg' PTP 블리스터 포장 낱알 식별 표기 변경",
    date: '2026-04-25',
    views: 470,
    content: `실로스타졸 서방정 PTP 포장재 전면에 표기되는 낱알 식별 타이포그래피가 더욱 명확하고 큰 폰트로 가독성이 향상되었습니다.`
  },
  {
    id: 13,
    category: '허가변경',
    title: "'다산 아토르바스타틴정 20mg' 효능·효과 항 근육병증 위험군 주의사항 반영",
    date: '2026-04-14',
    views: 350,
    content: `아토르바스타틴정 20mg 허가 변경 지시 반영 건으로, 고용량 투여 시 근육 관련 이상반응 모니터링 문구가 명시되었습니다.`
  },
  {
    id: 14,
    category: '기타변경',
    title: "병포장 완제의약품 실리카겔 단일 캡슐 적용 및 방습 성능 강화 안내",
    date: '2026-03-30',
    views: 290,
    content: `용기 병포장 제품 내부 건조제(Silica gel)가 파손 위험 없는 의약품 전용 식용 등급 캡슐형 건조제로 전환되었습니다.`
  },
  {
    id: 15,
    category: '신제품',
    title: "SGLT-2 억제제 계열 '다산 엠파글리플로진정 10mg' 신규 라인업 추가 공급",
    date: '2026-03-18',
    views: 710,
    content: `당뇨병 및 심혈관계 위험 감소 효능을 인정받은 엠파글리플로진 10mg 단일제가 시판 라인업에 추가되었습니다.`
  }
];

// Generate dynamic extended items up to 175 total items
for (let i = 16; i <= 175; i++) {
  const categoriesList: Array<'신제품' | '허가변경' | '낱알변경' | '기타변경'> = ['허가변경', '낱알변경', '신제품', '기타변경'];
  const cat = categoriesList[i % 4];
  const year = 2026 - Math.floor(i / 30);
  const month = String(12 - ((i * 5) % 12)).padStart(2, '0');
  const day = String(28 - (i % 25)).padStart(2, '0');
  const views = Math.floor(100 + ((i * 43) % 850));

  let title = '';
  if (cat === '신제품') {
    const drugs = ['몬테루카스트', '글리메피리드', '세포티암', '시타글립틴', '클로피도그렐'];
    title = `[신제품] 다산 ${drugs[i % drugs.length]} 서방정 신규 규격 출시 및 전국 공급 안내`;
  } else if (cat === '허가변경') {
    const drugs = ['로수바스타틴', '발사르탄', '세레콕시브', '아세클로페낙', '올메사르탄'];
    title = `[허가변경] '다산 ${drugs[i % drugs.length]}정' 효능·효과 및 용법용량 변경 대조표 안내`;
  } else if (cat === '낱알변경') {
    const drugs = ['테네리글립틴', '아목시실린', '레보플록사신', '도네페질'];
    title = `[낱알변경] '다산 ${drugs[i % drugs.length]}정' 정제 음각 마킹 식별 표기 개정 안내`;
  } else {
    title = `[기타변경] 완제의약품 용기·포장재 첨부문서 표준 규격 업데이트 (${i}차)`;
  }

  sampleNewsItems.push({
    id: i,
    category: cat,
    title,
    date: `${year}-${month === '00' ? '01' : month}-${day === '00' ? '05' : day}`,
    views,
    content: `본 공지는 다산제약 완제의약품 ${cat} 관련 최신 세부 안내 사항입니다.\n추가 문의는 다산제약 완제사업부(02-2627-5300)로 직접 연락 주시기 바랍니다.`
  });
}

export default function ProductNewsBoard({
  initialItems = sampleNewsItems,
  isEnglish = false,
}: ProductNewsBoardProps) {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // Search state
  const [searchField, setSearchField] = useState<string>('제목');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Expanded row ID
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Category filter tabs
  const categories = useMemo(() => {
    if (isEnglish) {
      return [
        { label: 'All', value: '전체' },
        { label: 'New Product', value: '신제품' },
        { label: 'Regulatory Changes', value: '허가변경' },
        { label: 'Pill Spec Changes', value: '낱알변경' },
        { label: 'Other Changes', value: '기타변경' },
      ];
    }
    return [
      { label: '전체', value: '전체' },
      { label: '신제품', value: '신제품' },
      { label: '허가변경', value: '허가변경' },
      { label: '낱알변경', value: '낱알변경' },
      { label: '기타변경', value: '기타변경' },
    ];
  }, [isEnglish]);

  // Filtered dataset
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      if (selectedCategory !== '전체' && item.category !== selectedCategory) {
        return false;
      }

      if (!searchQuery.trim()) return true;

      const q = searchQuery.trim().toLowerCase();
      if (searchField === '제목') {
        return item.title.toLowerCase().includes(q);
      } else if (searchField === '내용') {
        return (item.content || '').toLowerCase().includes(q);
      } else if (searchField === '구분') {
        return item.category.toLowerCase().includes(q);
      } else {
        return (
          item.title.toLowerCase().includes(q) ||
          (item.content || '').toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
    });
  }, [initialItems, selectedCategory, searchField, searchQuery]);

  // Pagination calculations
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleCategoryClick = (catValue: string) => {
    setSelectedCategory(catValue);
    setCurrentPage(1);
    setExpandedId(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRowClick = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setExpandedId(null);
    }
  };

  // 10-page slider window
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  // Category Pill Badge Generator (Using Exact Dasan Logo Colors)
  const renderCategoryBadge = (category: string) => {
    switch (category) {
      case '신제품':
        return (
          <span className="inline-flex items-center gap-1 bg-[#84bd00] text-white font-extrabold px-2.5 py-0.5 rounded-full text-xs shadow-2xs">
            <Sparkles className="w-3 h-3 text-white" />
            {isEnglish ? 'New' : '신제품'}
          </span>
        );
      case '허가변경':
        return (
          <span className="inline-flex items-center bg-brand-green/10 text-brand-green border border-brand-green/30 font-bold px-2.5 py-0.5 rounded-full text-xs">
            {isEnglish ? 'Regulatory' : '허가변경'}
          </span>
        );
      case '낱알변경':
        return (
          <span className="inline-flex items-center bg-teal-50 text-teal-800 border border-teal-200/70 font-semibold px-2.5 py-0.5 rounded-full text-xs">
            {isEnglish ? 'Pill Spec' : '낱알변경'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center bg-gray-100 text-gray-700 border border-gray-200 font-semibold px-2.5 py-0.5 rounded-full text-xs">
            {category}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto py-2 animate-fade-in-up font-sans text-gray-800">
      
      {/* 1. Category Filter: Dasan Corporate Green Pill Chips */}
      <div className="flex items-center flex-wrap gap-2 md:gap-2.5 mb-6">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? 'bg-brand-green text-white font-bold shadow-xs scale-[1.02]'
                  : 'bg-gray-100/90 text-gray-600 hover:bg-brand-green/10 hover:text-brand-green border border-gray-200/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 2. Total Info & Search Bar Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
        {/* Left: Total Count Info */}
        <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84bd00] animate-pulse"></span>
          <span className="font-semibold text-gray-800">
            Total: <strong className="text-brand-green font-extrabold text-sm md:text-base">{totalItems}</strong>건
          </span>
          <span className="text-gray-400 font-normal text-xs">
            [{currentPage}/{totalPages}]
          </span>
        </div>

        {/* Right: Search Controls */}
        <div className="flex items-center space-x-2">
          {/* Select Dropdown */}
          <div className="relative">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="appearance-none border border-gray-200 rounded-full bg-white pl-4 pr-8 py-2 text-xs md:text-sm font-medium text-gray-700 hover:border-brand-green focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all cursor-pointer shadow-2xs"
            >
              <option value="제목">{isEnglish ? 'Title' : '제목'}</option>
              <option value="내용">{isEnglish ? 'Content' : '내용'}</option>
              <option value="구분">{isEnglish ? 'Category' : '구분'}</option>
              <option value="전체">{isEnglish ? 'All' : '전체'}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-green w-3.5 h-3.5 pointer-events-none" />
          </div>

          {/* Search Input Box */}
          <div className="relative w-48 sm:w-60 md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={isEnglish ? 'Enter search keyword' : '검색어를 입력해주세요'}
              className="w-full border border-gray-200 rounded-full bg-white pl-4 pr-9 py-2 text-xs md:text-sm text-gray-800 placeholder-gray-400 hover:border-brand-green focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all shadow-2xs"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-green w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3. Main Notice Table (Matching 그림2 / PressList Board Style) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse border-t-2 border-t-brand-green text-sm text-left">
          {/* Table Header: Light Gray Background with Gray-700 Text */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 text-xs md:text-sm font-bold">
              <th className="py-4 px-4 text-center w-[10%]">
                {isEnglish ? 'No.' : '번호'}
              </th>
              <th className="py-4 px-5 text-left w-[60%]">
                {isEnglish ? 'Title' : '제목'}
              </th>
              <th className="py-4 px-4 text-center w-[18%]">
                {isEnglish ? 'Date' : '등록일'}
              </th>
              <th className="py-4 px-4 text-center w-[12%]">
                {isEnglish ? 'Views' : '조회수'}
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-14 text-center text-gray-400 text-xs md:text-sm">
                  {isEnglish ? 'No product news found.' : '검색 조건에 해당되는 제품소식이 없습니다.'}
                </td>
              </tr>
            ) : (
              paginatedItems.map((item, index) => {
                const isExpanded = expandedId === item.id;
                const itemNumber = totalItems - ((currentPage - 1) * itemsPerPage + index);
                return (
                  <React.Fragment key={item.id}>
                    {/* Row Item */}
                    <tr
                      onClick={() => handleRowClick(item.id)}
                      className="hover:bg-gray-50/50 transition-colors text-gray-700 cursor-pointer border-b border-gray-100"
                    >
                      <td className="py-4.5 px-4 text-center font-medium text-xs md:text-sm text-gray-400">
                        {itemNumber}
                      </td>
                      <td className="py-4.5 px-5 text-left">
                        <div className="flex items-center justify-between font-semibold text-brand-blue hover:text-brand-green transition-colors text-xs md:text-sm leading-snug">
                          <span className="flex-1 pr-3 flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.isNew && (
                              <span className="text-[10px] bg-[#74b816] text-white font-bold px-1.5 py-0.2 rounded uppercase shrink-0">
                                NEW
                              </span>
                            )}
                          </span>
                          {isExpanded ? (
                            <ChevronDown size={16} className="text-brand-green flex-shrink-0 rotate-180 transition-transform duration-200" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-400 flex-shrink-0 transition-transform duration-200" />
                          )}
                        </div>
                      </td>
                      <td className="py-4.5 px-4 text-center text-xs md:text-sm text-gray-500 font-medium whitespace-nowrap">
                        {item.date.replace(/-/g, '.')}
                      </td>
                      <td className="py-4.5 px-4 text-center text-xs md:text-sm text-gray-400 font-medium">
                        {item.views}
                      </td>
                    </tr>

                    {/* Accordion Detail View Row */}
                    {isExpanded && (
                      <tr className="bg-gray-50/30">
                        <td colSpan={4} className="py-6 px-6 md:px-8 text-gray-700 text-xs md:text-sm leading-relaxed border-b border-gray-150">
                          <div className="bg-white p-5 md:p-6 rounded-lg border border-gray-100 shadow-sm animate-fade-in space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                              <div className="flex items-center space-x-2">
                                {renderCategoryBadge(item.category)}
                                <span className="text-xs text-gray-400 font-medium pl-2">{item.date.replace(/-/g, '.')}</span>
                              </div>
                              <span className="text-xs text-brand-green font-semibold bg-brand-green/10 px-2.5 py-1 rounded-full border border-brand-green/20">
                                {isEnglish ? 'Views' : '조회수'}: {item.views}
                              </span>
                            </div>

                            <h4 className="font-bold text-brand-blue text-sm md:text-base leading-snug">
                              {item.title}
                            </h4>

                            <div className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line py-1 bg-gray-50/60 p-4 rounded-xl border border-gray-100">
                              {item.content || (isEnglish ? 'Detailed content for this notice.' : '본 제품소식에 대한 세부 내용입니다.')}
                            </div>

                            {item.file_name && (
                              <div className="pt-3 border-t border-gray-100 flex justify-start">
                                <a
                                  href={item.file_url || '#'}
                                  download={item.file_name}
                                  onClick={(e) => {
                                    if (!item.file_url) {
                                      e.preventDefault();
                                      alert(isEnglish ? 'File download ready.' : '첨부파일 다운로드 안내입니다.');
                                    }
                                  }}
                                  className="inline-flex items-center space-x-2 text-xs md:text-sm text-gray-600 hover:text-brand-green bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-lg border border-gray-200 transition-colors font-semibold shadow-2xs"
                                >
                                  <Download className="w-4 h-4 text-brand-green" />
                                  <span>{item.file_name}</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Navigation */}
      <div className="mt-8 flex items-center justify-center space-x-2 sm:space-x-3 text-xs md:text-sm text-gray-400 font-medium select-none">
        {/* First Page Button */}
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors"
          title="첫 페이지"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Prev Page Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors"
          title="이전 페이지"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-2 md:space-x-3 px-1">
          {pageNumbers.map((num) => {
            const isCurrent = num === currentPage;
            return (
              <button
                key={num}
                onClick={() => goToPage(num)}
                className={`px-1.5 py-0.5 transition-colors ${
                  isCurrent
                    ? 'text-brand-green font-extrabold relative after:content-[""] after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-3.5 after:h-[2.5px] after:bg-brand-green'
                    : 'text-gray-600 hover:text-brand-green font-normal'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors"
          title="다음 페이지"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors"
          title="마지막 페이지"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
