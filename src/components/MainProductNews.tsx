'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  FileText, 
  Calendar, 
  X, 
  Download,
  Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { sampleNewsItems, ProductNewsItem } from '@/components/ProductNewsBoard';

export interface DBNewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
  file_url?: string | null;
  file_name?: string | null;
  image?: string;
}

interface MainProductNewsProps {
  initialItems?: ProductNewsItem[];
  initialPressNews?: DBNewsItem[];
}

const defaultPressCards: DBNewsItem[] = [
  {
    id: 1,
    category: 'press',
    image: '/press_exhibition.png',
    title: "다산제약, 과학기술정보통신부 2026 우수 기업부설연구소 신규 지정",
    created_at: '2026-06-25',
    content: "다산제약이 과학기술정보통신부 주관 2026년도 우수 기업부설연구소(ECR)로 최종 지정되었습니다. 이번 지정을 통해 다산제약의 독자적인 약물전달시스템(DDS) 연구 및 제제 기술 혁신을 인정받았으며, 지속적인 글로벌 R&D 투자를 통해 파이프라인 개발을 가속화할 방침입니다.",
    views: 142
  },
  {
    id: 2,
    category: 'press',
    image: '/press_factory.png',
    title: "흔한 DDS, CDMO? 류형선 대표 \"정밀화 제어 기술 차별화\"",
    created_at: '2026-06-24',
    content: "흔한 DDS, CDMO? 류형선 대표 \"정밀화 제어 기술 차별화\" 인터뷰... 단순 위탁 생산이 아닌 정밀 제어 DDS 기술 중심의 고부가가치 CDMO 타깃으로, 올해 연말 예비심사 청구와 함께 글로벌 공급 확대를 본격 추진합니다.",
    views: 289
  },
  {
    id: 3,
    category: 'press',
    image: '/press_ceo.png',
    title: "다산제약, 창립 30주년 맞는 2026년 시무식 통해 실행 과제 발표",
    created_at: '2026-06-24',
    content: "다산제약이 창립 30주년을 맞아 2026년 시무식을 개최하고 지속성장을 위한 핵심 실행 과제를 선포하였습니다. 지난해 달성한 매출 1,000억원을 기반으로 AI 기반 스마트 연구 및 제조 고도화, 책임경영 강화를 적극 실천합니다.",
    views: 195
  },
  {
    id: 4,
    category: 'press',
    image: '/press_exhibition.png',
    title: "다산제약, CPHI Worldwide 2025 참가... 글로벌 CDMO 파트너십 확대",
    created_at: '2025-10-15',
    content: "유럽 최대 제약 바이오 박람회 CPHI에 참가하여 다산제약의 특화된 제제 기술(DDS) 및 완제 CDMO 경쟁력을 홍보하고 글로벌 제약사들과의 파트너십 계약을 추진하였습니다.",
    views: 310
  },
  {
    id: 5,
    category: 'press',
    image: '/press_factory.png',
    title: "다산제약 제2공장 스마트 GMP 자동화 생산설비 증설 준공",
    created_at: '2025-08-20',
    content: "글로벌 규격에 부합하는 최첨단 스마트 GMP 자동화 라인을 구축하여 고품질 의약품 생산 능력을 기존 대비 대폭 확충하고 안정적인 의약품 공급 기반을 마련하였습니다.",
    views: 245
  },
  {
    id: 6,
    category: 'press',
    image: '/press_ceo.png',
    title: "다산제약, 혁신 신약 서방성 복합제 국내 특허 등록 완료",
    created_at: '2025-06-12',
    content: "독자적인 마이크로 펠렛 다층 코팅 기술을 적용한 차세대 서방형 복합 제형에 대한 국내 특허 등록을 완료함으로써 글로벌 기술 경쟁력을 입증하였습니다.",
    views: 180
  }
];

export default function MainProductNews({ initialItems, initialPressNews }: MainProductNewsProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  // Tab State: 'productNews' or 'pressRelease'
  const [activeTab, setActiveTab] = useState<'productNews' | 'pressRelease'>('productNews');
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedModalItem, setSelectedModalItem] = useState<any | null>(null);

  // Check initial hash on mount (e.g. #press-release)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#press-release') {
      setActiveTab('pressRelease');
    }
  }, []);

  // Product news data
  const allProductItems = initialItems && initialItems.length > 0 ? initialItems : sampleNewsItems;

  const categories = [
    { label: isEnglish ? 'All' : '전체', value: '전체' },
    { label: isEnglish ? 'New Product' : '신제품', value: '신제품' },
    { label: isEnglish ? 'Regulatory' : '허가변경', value: '허가변경' },
    { label: isEnglish ? 'Pill Spec' : '낱알변경', value: '낱알변경' },
  ];

  const filteredProductItems = useMemo(() => {
    if (activeCategory === '전체') return allProductItems;
    return allProductItems.filter(item => item.category === activeCategory);
  }, [allProductItems, activeCategory]);

  // Press news data
  const pressItems = useMemo(() => {
    const raw = initialPressNews && initialPressNews.length > 0 ? initialPressNews : defaultPressCards;
    return raw.map((item, idx) => ({
      id: item.id || idx + 1,
      category: 'press',
      title: item.title,
      date: item.created_at
        ? (item.created_at instanceof Date
            ? item.created_at.toISOString().substring(0, 10).replace(/-/g, '.')
            : String(item.created_at).substring(0, 10).replace(/-/g, '.'))
        : '2026.06.25',
      content: item.content,
      views: item.views || 0,
      file_name: item.file_name,
      file_url: item.file_url,
      image: item.image,
      isNew: idx === 0
    }));
  }, [initialPressNews]);

  // Current active items based on activeTab
  const currentItems = activeTab === 'productNews' ? filteredProductItems : pressItems;
  const cardsPerPage = 3;
  const total = currentItems.length;

  const handlePrev = () => {
    if (total <= cardsPerPage) return;
    setDirection(-1);
    setStartIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    if (total <= cardsPerPage) return;
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % total);
  };

  const visibleItems = useMemo(() => {
    if (total === 0) return [];
    const count = Math.min(cardsPerPage, total);
    const items = [];
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % total;
      items.push(currentItems[idx]);
    }
    return items;
  }, [currentItems, startIndex, total, cardsPerPage]);

  const getCategoryMeta = (category: string) => {
    switch (category) {
      case '신제품':
        return {
          label: isEnglish ? 'New Product' : '신제품',
          badgeBg: 'bg-[#84bd00] text-white',
          icon: <Sparkles className="w-6 h-6 text-[#84bd00]" />,
        };
      case '허가변경':
        return {
          label: isEnglish ? 'Regulatory' : '허가변경',
          badgeBg: 'bg-brand-green text-white',
          icon: <ShieldCheck className="w-6 h-6 text-brand-green" />,
        };
      case '낱알변경':
        return {
          label: isEnglish ? 'Pill Spec' : '낱알변경',
          badgeBg: 'bg-teal-600 text-white',
          icon: <Layers className="w-6 h-6 text-teal-600" />,
        };
      case 'press':
      case '보도자료':
        return {
          label: isEnglish ? 'Press Release' : '보도자료',
          badgeBg: 'bg-brand-green text-white',
          icon: <Newspaper className="w-6 h-6 text-brand-green" />,
        };
      default:
        return {
          label: isEnglish ? 'Notice' : '소식',
          badgeBg: 'bg-slate-700 text-white',
          icon: <FileText className="w-6 h-6 text-slate-600" />,
        };
    }
  };

  return (
    <section id="product-news" className="scroll-mt-36 md:scroll-mt-40 pt-4 pb-14 md:pt-6 md:pb-20 bg-white relative font-pretendard">
      {/* Anchor for #press-release so direct links still scroll here */}
      <div id="press-release" className="absolute -top-36 left-0 pointer-events-none" />

      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">
        
        {/* Section Header with Main Tabs */}
        <ScrollReveal y={50} duration={1.2}>
          <div className="flex flex-col mb-4 sm:mb-5 gap-4">
            {/* Top Row: NEWS Title (그림3 형태) & Controls (Arrows & View All) */}
            <div className="flex items-center justify-between gap-5">
              <div className="flex flex-col">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-green tracking-tight">
                  NEWS
                </h2>
                <div className="w-full h-1.5 bg-brand-green mt-2 rounded-full" />
              </div>

              {/* Controls on Right: Arrows & View All */}
              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                {/* Slider Arrows (Prev / Next Page Buttons) */}
                {total > cardsPerPage && (
                  <div className="flex items-center gap-1.5 mr-1">
                    <button
                      onClick={handlePrev}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 hover:border-brand-green text-gray-500 hover:text-brand-green hover:bg-brand-green/5 flex items-center justify-center transition-colors duration-200 cursor-pointer bg-white shadow-2xs"
                      aria-label={isEnglish ? "Previous page" : "이전 페이지"}
                      title={isEnglish ? "Previous" : "이전 페이지"}
                    >
                      <ChevronLeft className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 hover:border-brand-green text-gray-500 hover:text-brand-green hover:bg-brand-green/5 flex items-center justify-center transition-colors duration-200 cursor-pointer bg-white shadow-2xs"
                      aria-label={isEnglish ? "Next page" : "다음 페이지"}
                      title={isEnglish ? "Next" : "다음 페이지"}
                    >
                      <ChevronRight className="w-4.5 h-4.5" />
                    </button>
                  </div>
                )}

                {/* View All Button */}
                <Link
                  href={
                    activeTab === 'productNews' 
                      ? `${basePath}/business/finished/news` 
                      : `${basePath}/contact/newsroom/press`
                  }
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white text-xs lg:text-sm font-semibold rounded-full transition-colors duration-300 hover:shadow-green-glow group cursor-pointer shrink-0"
                >
                  <span>{isEnglish ? 'View All' : '전체보기'}</span>
                  <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Bottom Row: 탭 (Product News / Press Release) + Category Chips (가로막대 제거) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
              <div className="flex items-center gap-6 sm:gap-8">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('productNews');
                    setStartIndex(0);
                    setDirection(0);
                  }}
                  className={`text-lg sm:text-xl font-bold transition-colors duration-200 cursor-pointer ${
                    activeTab === 'productNews'
                      ? 'text-brand-green'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Product
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('pressRelease');
                    setStartIndex(0);
                    setDirection(0);
                  }}
                  className={`text-lg sm:text-xl font-bold transition-colors duration-200 cursor-pointer ${
                    activeTab === 'pressRelease'
                      ? 'text-brand-green'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Press Release
                </button>
              </div>

              {/* Category sub-filter chips for Product News */}
              {activeTab === 'productNews' && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setActiveCategory(cat.value);
                        setStartIndex(0);
                        setDirection(0);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        activeCategory === cat.value
                          ? 'bg-brand-green text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Modern Wide Cards Grid with Smooth Book-like Page Slide Transition */}
        <ScrollReveal delay={0.15} y={60} duration={1.2}>
          <div className="relative">
            {/* Left Side Floating Prev Button (Compact & Positioned cleanly outside) */}
            {total > cardsPerPage && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute -left-3 sm:-left-6 md:-left-9 lg:-left-12 xl:-left-[52px] top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green hover:bg-brand-green/5 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer z-30 group"
                aria-label={isEnglish ? "Previous slide" : "이전"}
                title={isEnglish ? "Previous" : "이전"}
              >
                <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>
            )}

            {/* Right Side Floating Next Button (Compact & Positioned cleanly outside) */}
            {total > cardsPerPage && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute -right-3 sm:-right-6 md:-right-9 lg:-right-12 xl:-right-[52px] top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green hover:bg-brand-green/5 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer z-30 group"
                aria-label={isEnglish ? "Next slide" : "다음"}
                title={isEnglish ? "Next" : "다음"}
              >
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            )}

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${activeTab}-${activeCategory}-${startIndex}`}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? '40%' : dir < 0 ? '-40%' : 0,
                      opacity: 0,
                      scale: 0.98,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? '-40%' : dir < 0 ? '40%' : 0,
                      opacity: 0,
                      scale: 0.98,
                      transition: {
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                  {visibleItems.map((item, idx) => {
                    const meta = getCategoryMeta(item.category);
                    const dateStr = item.date || '2026.06.25';
                    const dateParts = dateStr.includes('-') ? dateStr.split('-') : dateStr.split('.');
                    const yearMonth = dateParts.length >= 2 ? `${dateParts[0]}.${dateParts[1]}` : '2026.06';
                    const day = dateParts.length >= 3 ? dateParts[2] : '25';
                    const plainContent = item.content ? item.content.replace(/<[^>]*>/g, '').trim() : '';

                    return (
                      <div
                        key={`${activeTab}-${item.id}-${idx}`}
                        onClick={() => setSelectedModalItem(item)}
                        className="relative bg-[#f8f9fa] rounded-3xl overflow-hidden transition-all duration-300 border border-gray-200/80 hover:border-transparent hover:shadow-none shadow-xs flex flex-col justify-between cursor-pointer group p-6 sm:p-7"
                        style={{ minHeight: '340px' }}
                      >
                        {/* Expanding Circle Background Ripple Effect */}
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-green scale-0 opacity-0 group-hover:scale-[26] group-hover:opacity-100 transition-all duration-[2200ms] ease-out origin-center pointer-events-none z-0"
                          aria-hidden="true"
                        />

                        {/* Top Header: Badge, Date & Icon */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-2xl bg-white group-hover:bg-white/20 flex items-center justify-center transition-colors duration-[1500ms] shadow-2xs">
                                {React.cloneElement(meta.icon as React.ReactElement<any>, {
                                  className: "w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-[1500ms]"
                                })}
                              </div>
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-2xs group-hover:bg-white group-hover:text-brand-green transition-all duration-[1500ms] ${meta.badgeBg}`}>
                                {meta.label}
                              </span>
                              {item.isNew && (
                                <span className="bg-amber-400 text-gray-900 font-extrabold text-[10px] px-1.5 py-0.5 rounded shadow-2xs">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-white/90 font-medium transition-colors duration-[1500ms]">
                              <Calendar className="w-3.5 h-3.5 text-brand-green group-hover:text-white transition-colors duration-[1500ms]" />
                              <span>{dateStr.replace(/-/g, '.')}</span>
                            </div>
                          </div>

                          {/* Title & Description */}
                          <div className="space-y-3">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-white leading-snug tracking-tight transition-colors duration-[1500ms] line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/85 leading-relaxed line-clamp-3 font-normal transition-colors duration-[1500ms]">
                              {plainContent}
                            </p>
                          </div>
                        </div>

                      {/* Bottom Footer: Big Date & Arrow Link */}
                      <div className="relative z-10 pt-5 mt-6 flex items-end justify-between border-t border-gray-100/80 group-hover:border-white/20 transition-colors duration-[1500ms]">
                        <div className="text-gray-400 group-hover:text-white/80 transition-colors duration-[1500ms]">
                          <span className="text-2xl font-black text-gray-900 group-hover:text-white transition-colors duration-[1500ms] block leading-none">
                            {day}
                          </span>
                          <span className="text-[11px] font-medium block mt-1">
                            {yearMonth}
                          </span>
                        </div>

                        {/* Normal State: subtle arrow link */}
                        <span className="text-xs font-bold text-brand-green group-hover:opacity-0 transition-opacity duration-300 inline-flex items-center gap-1 pr-1">
                          {isEnglish ? 'View Notice' : '상세보기'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Concentric Cutout Notch with Floating Black Circle Action Button */}
                      <div className="absolute bottom-0 right-0 w-[112px] h-[112px] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-[1000ms] ease-out z-30 overflow-hidden transform scale-90 group-hover:scale-100 origin-bottom-right">
                        <svg className="w-full h-full" viewBox="0 0 112 112" fill="none">
                          <path
                            d="M 112,16 C 112,26 96,38 76,38 A 38 38 0 0 0 38,76 C 38,96 26,112 16,112 L 112,112 Z"
                            fill="white"
                          />
                        </svg>
                        
                        <div
                          className="absolute w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg transform scale-85 group-hover:scale-105 active:scale-95 transition-all duration-[700ms] ease-out"
                          style={{ right: '12px', bottom: '12px' }}
                        >
                          <ArrowRight className="w-5 h-5 stroke-[2.4] transition-transform duration-[700ms] group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ScrollReveal>

      </div>

      {/* Quick View Interactive Modal */}
      <AnimatePresence>
        {selectedModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalItem(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-1 space-y-5">
                {/* Modal Header */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${getCategoryMeta(selectedModalItem.category).badgeBg}`}>
                    {getCategoryMeta(selectedModalItem.category).label}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {selectedModalItem.date ? selectedModalItem.date.replace(/-/g, '.') : ''}
                  </span>
                  <span className="text-xs text-brand-green font-semibold bg-brand-green/10 px-2.5 py-0.5 rounded-full ml-auto">
                    {isEnglish ? 'Views' : '조회수'} {selectedModalItem.views || 0}
                  </span>
                </div>

                {/* Modal Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  {selectedModalItem.title}
                </h3>

                {/* Optional Image for Press Release */}
                {selectedModalItem.image && (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                    <img
                      src={selectedModalItem.image}
                      alt={selectedModalItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Modal Content */}
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line py-3 px-4 bg-gray-50/80 rounded-2xl border border-gray-100 font-normal">
                  {selectedModalItem.content || (isEnglish ? 'Detailed content for this notice.' : '본 소식에 대한 세부 내용입니다.')}
                </div>

                {/* Attachment Link */}
                {selectedModalItem.file_name && (
                  <div className="pt-2 flex justify-start">
                    <a
                      href={selectedModalItem.file_url || '#'}
                      download={selectedModalItem.file_name}
                      onClick={(e) => {
                        if (!selectedModalItem.file_url) {
                          e.preventDefault();
                          alert(isEnglish ? 'File download is ready.' : '첨부파일 다운로드 준비 중입니다.');
                        }
                      }}
                      className="inline-flex items-center space-x-2 text-xs sm:text-sm text-brand-green bg-brand-green/10 hover:bg-brand-green/20 px-4 py-2.5 rounded-xl border border-brand-green/30 transition-colors font-bold shadow-2xs"
                    >
                      <Download className="w-4 h-4 text-brand-green" />
                      <span>{selectedModalItem.file_name}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={
                    activeTab === 'productNews'
                      ? `${basePath}/business/finished/news`
                      : `${basePath}/contact/newsroom/press`
                  }
                  className="text-xs sm:text-sm font-bold text-brand-green hover:underline inline-flex items-center gap-1"
                >
                  {activeTab === 'productNews'
                    ? (isEnglish ? 'Go to Product News Board' : '제품소식 게시판 바로가기')
                    : (isEnglish ? 'Go to Press Newsroom' : '보도자료 게시판 바로가기')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setSelectedModalItem(null)}
                  className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  {isEnglish ? 'Close' : '닫기'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
