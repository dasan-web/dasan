'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, Pill, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export interface ProductItem {
  id: number;
  name: string;
  englishName?: string;
  type: string;
  efficacy: string;
  file_url?: string | null;
  file_name?: string | null;
  ingredient?: string | null;
  appearance?: string | null;
}

interface MainProductShowcaseProps {
  initialProducts?: ProductItem[];
}

const defaultProducts: ProductItem[] = [
  {
    id: 1,
    name: '클피그렐정 75mg',
    englishName: 'CLPIGREL 75mg',
    type: '전문의약품',
    efficacy: '동맥경화용제',
    ingredient: '클로피도그렐황산염 (Clopidogrel Bisulfate)',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: '/images/products/showcase_clpigrel.png'
  },
  {
    id: 7,
    name: '트윈액트정',
    englishName: 'TWINACT',
    type: '전문의약품',
    efficacy: '혈압강하제',
    ingredient: '암로디핀, 텔미사르탄',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: '/images/products/showcase_twinact.png'
  },
  {
    id: 8,
    name: '디스포지정',
    englishName: 'DISPOSE',
    type: '전문의약품',
    efficacy: '혈압강하제',
    ingredient: '암로디핀, 발사르탄',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: '/images/products/showcase_disforge.png'
  },
  {
    id: 9,
    name: '세비텐션정',
    englishName: 'SEVITENSION',
    type: '전문의약품',
    efficacy: '혈압강하제',
    ingredient: '암로디핀, 올메사르탄',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: '/images/products/showcase_sevitension.png'
  },
  {
    id: 26,
    name: '프리투스정 50mg',
    englishName: 'PRETUS 50mg',
    type: '전문의약품',
    efficacy: '호흡기관용약',
    ingredient: '프란루카스트수화물',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: '/images/products/showcase_pretus.png'
  }
];

// 5개 제품 사진의 바닥 접지선(Baseline)을 100% 일직선으로 정렬한 쇼케이스 전용 이미지 매핑
const getShowcaseImageUrl = (product: ProductItem) => {
  if (product.name.includes('클피그렐')) return '/images/products/showcase_clpigrel.png';
  if (product.name.includes('트윈액트')) return '/images/products/showcase_twinact.png';
  if (product.name.includes('디스포지')) return '/images/products/showcase_disforge.png';
  if (product.name.includes('세비텐션')) return '/images/products/showcase_sevitension.png';
  if (product.name.includes('프리투스')) return '/images/products/showcase_pretus.png';
  return product.file_url;
};

export default function MainProductShowcase({ initialProducts }: MainProductShowcaseProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const rawProducts = (initialProducts && initialProducts.length > 0)
    ? initialProducts
    : defaultProducts;

  // Real-time keyword filtering for instant live feedback
  const filteredProducts = useMemo(() => {
    const trimmed = searchKeyword.trim();
    if (!trimmed) return rawProducts;

    // 초성 및 단독 자모(예: 'ㄴ', 'ㄱ', 'ㅏ' 등)만 입력된 경우 검색 필터링을 하지 않고 기본 제품 목록 유지
    const isOnlyJamo = /^[ㄱ-ㅎㅏ-ㅣ\s]+$/.test(trimmed);
    if (isOnlyJamo) return rawProducts;

    const q = trimmed.toLowerCase();
    return rawProducts.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.englishName?.toLowerCase().includes(q) ||
      p.efficacy?.toLowerCase().includes(q) ||
      p.ingredient?.toLowerCase().includes(q) ||
      p.type?.toLowerCase().includes(q)
    );
  }, [rawProducts, searchKeyword]);

  const cardsPerPage = 5;
  const total = filteredProducts.length;

  const handlePrev = () => {
    if (total <= cardsPerPage) return;
    setStartIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    if (total <= cardsPerPage) return;
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchKeyword.trim();
    const isOnlyJamo = /^[ㄱ-ㅎㅏ-ㅣ\s]+$/.test(trimmed);
    if (trimmed && !isOnlyJamo) {
      router.push(`${basePath}/business/finished/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`${basePath}/business/finished/search`);
    }
  };



  const visibleProducts = useMemo(() => {
    if (total === 0) return [];
    const count = Math.min(cardsPerPage, total);
    const items = [];
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % total;
      items.push(filteredProducts[idx]);
    }
    return items;
  }, [filteredProducts, startIndex, total, cardsPerPage]);

  return (
    <section 
      id="products" 
      className="scroll-mt-28 py-12 md:py-16 bg-white relative font-pretendard select-none"
    >
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">
        

        {/* Section Headline Area with Integrated Search Bar */}
        <ScrollReveal y={50} duration={1.1}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 sm:mb-10">
            <div>
              {/* 그림2 스타일: PRODUCT LIST 타이틀 및 하단 녹색 바 */}
              <div className="flex flex-col mb-3.5 w-fit">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-green tracking-tight">
                  PRODUCT LIST
                </h2>
                <div className="w-full h-1.5 bg-brand-green mt-2 rounded-full" />
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 lg:whitespace-nowrap">
                {isEnglish 
                  ? 'Dasan Pharmaceutical creates healthy and happy lives for humanity.' 
                  : '다산제약은 인류의 건강과 행복한 삶을 완성합니다.'}
              </p>
            </div>

            {/* Clean Seamless Search Input Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full lg:w-96 xl:w-[420px] bg-gray-50/90 hover:bg-white focus-within:bg-white border border-gray-200/90 focus-within:border-brand-green focus-within:ring-4 focus-within:ring-brand-green/10 rounded-full px-4 py-2.5 sm:py-3 transition-all duration-300 shadow-2xs focus-within:shadow-md shrink-0"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-400 focus-within:text-brand-green shrink-0 mr-2.5 transition-colors" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setStartIndex(0);
                }}
                placeholder={isEnglish ? "Search product or ingredient..." : "제품명 또는 효능군을 검색하세요"}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none pr-2"
              />
              {searchKeyword && (
                <button
                  type="button"
                  onClick={() => setSearchKeyword('')}
                  className="text-gray-400 hover:text-gray-600 p-1 mr-1 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-brand-green hover:bg-brand-green-dark text-white rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold transition-all hover:shadow-xs active:scale-95 shrink-0 cursor-pointer"
              >
                {isEnglish ? 'Search' : '검색'}
              </button>
            </form>
          </div>
        </ScrollReveal>

        {/* Seamless Borderless Clean Product Cards */}
        <ScrollReveal y={60} duration={1.2} delay={0.15}>
          <div className="relative flex items-center pt-2 pb-2">
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-gray-50/60 rounded-3xl border border-dashed border-gray-200">
                <Search className="w-10 h-10 text-gray-300 mb-3" />
                <p className="text-sm sm:text-base font-bold text-gray-700">
                  {isEnglish ? `No products found matching "${searchKeyword}"` : `"${searchKeyword}"에 대한 검색 결과가 없습니다.`}
                </p>
                <p className="text-xs text-gray-400 mt-1 mb-4">
                  {isEnglish ? 'Try searching by a different name or ingredient.' : '다른 제품명이나 효능군으로 검색해 보세요.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchKeyword('')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:text-brand-green hover:border-brand-green transition-colors cursor-pointer"
                >
                  {isEnglish ? 'Clear Search' : '검색어 초기화'}
                </button>
              </div>
            ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 items-end">
              {visibleProducts.map((product) => {
                const isHovered = hoveredId === product.id;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    className="h-full relative"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Link
                      href={`${basePath}/business/finished/search/${product.id}`}
                      className={`block rounded-3xl transition-all duration-400 cursor-pointer relative overflow-hidden bg-white ${
                        isHovered
                          ? 'shadow-[0_24px_50px_rgba(0,137,83,0.16)] -translate-y-8 z-30'
                          : 'shadow-[0_8px_24px_rgba(0,0,0,0.04)] z-10'
                      }`}
                      style={{ height: '400px', backgroundColor: '#ffffff' }}
                    >
                      {/* Top Info Area (Cleanly positioned at top zone on hover) */}
                      <div 
                        className={`p-5 transition-all duration-300 flex flex-col justify-start absolute top-0 left-0 right-0 z-20 ${
                          isHovered 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                      >
                        {/* Hashtag Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className="text-[11px] font-bold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                            #{product.type === '전문의약품' ? (isEnglish ? 'ETC' : '전문의약품') : (isEnglish ? 'OTC' : '일반의약품')}
                          </span>
                          <span className="text-[11px] font-bold text-[#84bd00] bg-[#84bd00]/10 px-2.5 py-0.5 rounded-full">
                            #{product.efficacy}
                          </span>
                        </div>

                        {/* Bold Product Name */}
                        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1 mb-1 group-hover:text-brand-green">
                          {isEnglish ? (product.englishName || product.name) : product.name}
                        </h3>

                        {/* Appearance / Trait Description */}
                        <p className="text-[11.5px] text-gray-500 font-normal line-clamp-2 leading-relaxed">
                          {product.appearance || product.ingredient || (isEnglish ? 'Dasan high-potency formulation' : '다산제약 고품질 완제의약품')}
                        </p>
                      </div>

                      {/* Product Image Area (100% Perfectly Aligned to Exact Same Horizontal Baseline) */}
                      <div className="w-full flex items-end justify-center pb-6 sm:pb-8 absolute left-0 right-0 bottom-0 pointer-events-none">
                        {(() => {
                          const imgUrl = getShowcaseImageUrl(product);
                          return imgUrl && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(imgUrl) ? (
                            <img
                              src={imgUrl}
                              alt={product.name}
                              className="w-full max-w-[280px] h-auto object-contain transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-300 group-hover:text-brand-green transition-colors">
                              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-3">
                                <Pill className="w-10 h-10 stroke-[1.5] text-brand-green/70" />
                              </div>
                              <span className="text-[11px] font-black tracking-widest text-gray-400">
                                {product.name.split(' ')[0]}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            )}

            {/* Right Navigation Action & View More */}
            <div className="hidden xl:flex flex-col items-center justify-center pl-8 shrink-0">
              <Link
                href={`${basePath}/business/finished/search`}
                className="w-14 h-14 rounded-full bg-white hover:bg-brand-green text-brand-green hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:scale-110 active:scale-95 group mb-3 cursor-pointer border border-gray-150"
                aria-label="View more products"
              >
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={`${basePath}/business/finished/search`}
                className="text-xs font-bold text-gray-700 hover:text-brand-green transition-colors whitespace-nowrap tracking-tight"
              >
                {isEnglish ? 'View More' : '제품 더보기'}
              </Link>
            </div>

          </div>

          {/* Mobile & Tablet Slider Controls */}
          <div className="mt-6 flex items-center justify-between xl:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white hover:bg-brand-green text-gray-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white hover:bg-brand-green text-gray-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              href={`${basePath}/business/finished/search`}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand-green text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>{isEnglish ? 'View All Products' : '전체보기'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
    );
  }
