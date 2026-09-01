'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, Pill, Sparkles, Search, X } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
    file_url: 'https://res.cloudinary.com/ewrop4wj/image/upload/v1787794594/dasan/uqxcob5pcllnowke6b45.jpg'
  },
  {
    id: 7,
    name: '트윈액트정',
    englishName: 'TWINACT',
    type: '전문의약품',
    efficacy: '혈압강하제',
    ingredient: '암로디핀, 텔미사르탄',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: 'https://res.cloudinary.com/ewrop4wj/image/upload/v1787706038/dasan/sc2joxcggm56nhzyuptw.png'
  },
  {
    id: 8,
    name: '디스포지정',
    englishName: 'DISPOSE',
    type: '전문의약품',
    efficacy: '혈압강하제',
    ingredient: '암로디핀, 발사르탄',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: 'https://res.cloudinary.com/ewrop4wj/image/upload/v1788224026/dasan/disforge_tab_transparent_v2.png'
  },
  {
    id: 9,
    name: '세비텐션정',
    englishName: 'SEVITENSION',
    type: '전문의약품',
    efficacy: '혈압강하제',
    ingredient: '암로디핀, 올메사르탄',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: 'https://res.cloudinary.com/ewrop4wj/image/upload/v1787706049/dasan/wivflmfegd2cew9uodco.png'
  },
  {
    id: 26,
    name: '프리투스정 50mg',
    englishName: 'PRETUS 50mg',
    type: '전문의약품',
    efficacy: '호흡기관용약',
    ingredient: '프란루카스트수화물',
    appearance: '흰색 또는 지정색의 원형/타원형 필름코팅정',
    file_url: 'https://res.cloudinary.com/ewrop4wj/image/upload/v1787719444/dasan/y9jlxn6rtc70x7a4okvz.png'
  }
];

export default function MainProductShowcase({ initialProducts }: MainProductShowcaseProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  // Raw Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 120fps Ultra-Smooth Physics Spring Easing (Zero jank / Zero stutter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 22,
    mass: 0.15,
    restDelta: 0.001,
  });

  // Hexagonal Pill Vector Scale: 1.0 (Exact 1:1 Responsive Lockup) up to 75.0 (Full 4K Ultra-HD Viewport Coverage)
  const pillScale = useTransform(
    smoothProgress, 
    [0, 0.2, 0.5, 0.8, 0.98], 
    [1, 2.5, 9, 28, 75]
  );
  const sloganOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0]);
  const pillOpacity = useTransform(smoothProgress, [0, 0.85, 0.98], [1, 1, 0]);
  
  // Hexagon Border Color: Turns lighter and seamlessly transitions to pure white at max expansion!
  const hexagonBorderColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.55, 0.85, 0.96],
    ['#8ec31f', '#a6d83a', '#d2f094', '#f1fae0', '#ffffff']
  );
  
  // Debossed DASAN text fades out gracefully as the hexagon begins zooming
  const dasanDebossOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0]);
  
  // Pure white expanding canvas inside hexagon to fill the entire red box
  const expandingLensOpacity = useTransform(smoothProgress, [0.06, 0.35, 0.85, 0.98], [0, 0.85, 1, 0]);
  
  // Products section opacity & reveal (Smooth gradual fade-in)
  const productsOpacity = useTransform(smoothProgress, [0.55, 0.92], [0, 1]);
  const productsY = useTransform(smoothProgress, [0.55, 0.92], [20, 0]);
  const productsPointerEvents = useTransform(smoothProgress, (v) => (v > 0.58 ? 'auto' : 'none'));

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
      ref={containerRef}
      className="relative h-[250vh] font-pretendard select-none bg-white"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* ========================================================================= */}
        {/* 1. SCROLL-EXPANDING HEXAGON & 3-LINE SLOGAN LAYER */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6">
          
          {/* Main Slogan: 3-Tier Layout with Symmetrically Balanced Vertical Spacing (Mobile to 4K Responsive) */}
          <div className="flex flex-col items-center text-center max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl w-full">
            
            {/* Row 1: 기술과 혁신으로 (Fades with sloganOpacity) */}
            <motion.h3 
              style={{ opacity: sloganOpacity }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight"
            >
              {isEnglish ? 'Through Technology and Innovation,' : '기술과 혁신으로'}
            </motion.h3>

            {/* Row 2: DASAN Master CI Lockup (100.00% Exact Master Brand Blueprint) */}
            <div className="relative select-none my-5 sm:my-7 lg:my-8 2xl:my-12 3xl:my-16 h-11 sm:h-13 lg:h-16 2xl:h-22 3xl:h-28 aspect-[1024/388]">
              
              {/* 1. DASAN Pharmaceutical Text (Master Blueprint: x=0, y=76, w=614, h=298) */}
              <motion.div 
                style={{ opacity: sloganOpacity }}
                className="absolute left-0 top-[19.59%] w-[60.0%] h-[76.8%] flex items-center justify-center select-none"
              >
                <img
                  src="/dasan_ci_text_authentic.png"
                  alt="DASAN Pharmaceutical"
                  className="w-full h-full object-contain select-none"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </motion.div>

              {/* 2. High-Definition Vector SVG 3D Hexagonal Pill (Master Blueprint: x=607, y=16, w=410, h=360) */}
              <div 
                className="absolute left-[59.28%] top-[4.12%] w-[40.04%] h-[92.78%] flex items-center justify-center"
              >
                <motion.div
                  style={{ 
                    scale: pillScale,
                    opacity: pillOpacity,
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)'
                  }}
                  className="relative w-full h-full flex items-center justify-center origin-center pointer-events-none z-30"
                >
                  <svg 
                    viewBox="0 0 410 360" 
                    className="w-full h-full overflow-visible select-none"
                    shapeRendering="geometricPrecision"
                  >
                    <defs>
                      {/* Realistic Tablet Drop Shadow */}
                      <filter id="pillShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.10" />
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.06" />
                      </filter>

                      {/* 3D Tablet Dome (Convex spherical gradient) */}
                      <radialGradient id="tabletDomeGrad" cx="38%" cy="28%" r="68%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="45%" stopColor="#f8fafc" />
                        <stop offset="80%" stopColor="#edf2f7" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                      </radialGradient>

                      {/* Bevel Rim Upper Reflection Gradient */}
                      <linearGradient id="bevelLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.25" />
                      </linearGradient>

                      {/* Bevel Rim Lower Shadow Gradient */}
                      <linearGradient id="bevelDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#64748b" stopOpacity="0.35" />
                      </linearGradient>

                      {/* Upper Surface Specular Gloss / Coating Sheen */}
                      <linearGradient id="glossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* 1. Outer Hexagon Frame Line (Brand Green Frame) */}
                    <motion.polygon
                      points="102.5,4 307.5,4 406,180 307.5,356 102.5,356 4,180"
                      style={{ fill: hexagonBorderColor }}
                      strokeLinejoin="round"
                    />

                    {/* 2. Outer Chamfered Bevel Rim (깎인 3D 모서리) */}
                    <polygon
                      points="114,20 296,20 384,180 296,340 114,340 26,180"
                      fill="url(#bevelLightGrad)"
                      stroke="url(#bevelDarkGrad)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />

                    {/* 3. Inner 3D Convex Tablet Body with Ambient Shadow */}
                    <polygon
                      points="124,34 286,34 368,180 286,326 124,326 42,180"
                      fill="url(#tabletDomeGrad)"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      filter="url(#pillShadow)"
                    />

                    {/* 4. Upper Surface Specular Coating Sheen (정제 표면 은은한 광택) */}
                    <path
                      d="M 130 42 L 280 42 L 356 174 C 270 138 140 138 54 174 Z"
                      fill="url(#glossGrad)"
                      opacity="0.8"
                      pointerEvents="none"
                    />

                    {/* 5. Realistic Debossed DSPHARM Engraving (실제 정제 금형 음각 프레스 각인) */}
                    <motion.g style={{ opacity: dasanDebossOpacity }}>
                      {/* Bottom Light Reflection (1px 아래 밝은 빛) */}
                      <text
                        x="205"
                        y="192.5"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        fontWeight="900"
                        fontSize="38"
                        letterSpacing="2.5"
                        fontFamily="sans-serif"
                        className="select-none"
                        opacity="0.9"
                      >
                        DSPHARM
                      </text>
                      {/* Top Inner Shadow (1px 위 깊은 그림자) */}
                      <text
                        x="205"
                        y="189.5"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#1e293b"
                        fontWeight="900"
                        fontSize="38"
                        letterSpacing="2.5"
                        fontFamily="sans-serif"
                        className="select-none"
                        opacity="0.5"
                      >
                        DSPHARM
                      </text>
                      {/* Core Debossed Text Body */}
                      <text
                        x="205"
                        y="191"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#475569"
                        fontWeight="900"
                        fontSize="38"
                        letterSpacing="2.5"
                        fontFamily="sans-serif"
                        className="select-none"
                      >
                        DSPHARM
                      </text>
                    </motion.g>

                    {/* 6. Pure White Expanding Canvas for Full Viewport Scroll Transition */}
                    <motion.polygon
                      points="102.5,0 307.5,0 410,180 307.5,360 102.5,360 0,180"
                      fill="#ffffff"
                      style={{ opacity: expandingLensOpacity }}
                    />
                  </svg>
                </motion.div>
              </div>

            </div>

            {/* Row 3: 건강한 내일을 만듭니다. (Fades with sloganOpacity) */}
            <motion.h3 
              style={{ opacity: sloganOpacity }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight"
            >
              {isEnglish ? 'We create a healthier tomorrow.' : '건강한 내일을 만듭니다.'}
            </motion.h3>

          </div>

        </div>


        {/* ========================================================================= */}
        {/* 2. REVEALED PRODUCTS SHOWCASE SECTION */}
        {/* ========================================================================= */}
        <motion.div
          style={{ 
            opacity: productsOpacity, 
            y: productsY,
            pointerEvents: productsPointerEvents as any
          }}
          className="w-full px-6 md:px-16 lg:px-24 mx-auto z-30"
        >
          {/* Section Headline Area with Integrated Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 sm:mb-10">
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-green mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#84bd00]" />
                {isEnglish ? 'Product' : 'PRODUCT'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 lg:whitespace-nowrap">
                {isEnglish 
                  ? 'Dasan Pharmaceutical creates healthy and happy lives for humanity.' 
                  : '다산제약은 인류의 건강과 행복한 삶을 완성합니다.'}
              </h2>
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

          {/* Seamless Borderless Clean Product Cards */}
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
                      className={`block rounded-3xl transition-all duration-400 cursor-pointer relative overflow-hidden ${
                        isHovered
                          ? 'bg-white shadow-[0_24px_50px_rgba(0,137,83,0.16)] -translate-y-8 z-30'
                          : 'bg-white/95 hover:bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] z-10'
                      }`}
                      style={{ height: '360px' }}
                    >
                      {/* Top Info Area (Slides down on hover) */}
                      <div 
                        className={`p-6 transition-all duration-400 flex flex-col justify-start absolute top-0 left-0 right-0 z-20 ${
                          isHovered 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 -translate-y-6 pointer-events-none'
                        }`}
                      >
                        {/* Hashtag Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          <span className="text-[11px] font-bold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                            #{product.type === '전문의약품' ? (isEnglish ? 'ETC' : '전문의약품') : (isEnglish ? 'OTC' : '일반의약품')}
                          </span>
                          <span className="text-[11px] font-bold text-[#84bd00] bg-[#84bd00]/10 px-2.5 py-0.5 rounded-full">
                            #{product.efficacy}
                          </span>
                        </div>

                        {/* Bold Product Name */}
                        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-brand-green">
                          {isEnglish ? (product.englishName || product.name) : product.name}
                        </h3>

                        {/* Appearance / Trait Description */}
                        <p className="text-[11.5px] text-gray-600 font-normal line-clamp-2 leading-relaxed">
                          {product.appearance || product.ingredient || (isEnglish ? 'Dasan high-potency formulation' : '다산제약 고품질 완제의약품')}
                        </p>
                      </div>

                      {/* Product Image Area (Seamless & Clean) */}
                      <div 
                        className={`w-full flex items-center justify-center p-4 transition-all duration-400 absolute left-0 right-0 bottom-0 ${
                          isHovered 
                            ? 'h-[200px] scale-95' 
                            : 'h-full scale-100'
                        }`}
                      >
                        {product.file_url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(product.file_url) ? (
                          <img
                            src={product.file_url}
                            alt={product.name}
                            className="max-h-[190px] w-auto max-w-[85%] object-contain transition-transform duration-400"
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
                        )}
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
        </motion.div>

      </div>
    </section>
  );
}
