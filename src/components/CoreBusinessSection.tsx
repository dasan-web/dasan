'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface ActionLink {
  label: string;
  href: string;
  isPrimary?: boolean;
}

interface SlideItem {
  id: string;
  type: string;
  image: string;
  tag: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  href?: string;
  actionLinks?: ActionLink[];
}

export default function CoreBusinessSection() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const slides: SlideItem[] = [
    {
      id: 'factory',
      type: 'overview',
      image: '/core_business_factory.jpg',
      tag: isEnglish ? 'KEY VALUE CHAIN' : '전주기 인프라',
      title: isEnglish ? (
        <>
          Dasan Pharmaceutical has established a{' '}
          <strong className="font-black text-brand-green">Key Value Chain infrastructure</strong>{' '}
          across the entire pharmaceutical lifecycle from R&D to sales, securing high value-added business growth potential.
        </>
      ) : (
        <>
          다산제약은 연구개발(R&D)부터 판매까지 의약품 전 주기의<br className="hidden sm:block" />
          <strong className="font-black text-brand-green">Key Value Chain 인프라를 구축하여</strong><br className="hidden sm:block" />
          고부가가치 사업 성장성을 확보하고 있습니다.
        </>
      ),
    },
    {
      id: 'finished',
      type: 'detail',
      image: '/core_business_finished.webp',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'Finished Drugs' : '완제 의약품',
      desc: isEnglish ? (
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <p className="leading-relaxed">
            We establish a robust portfolio of high-efficacy prescription (ETC) and OTC pharmaceuticals centered on key therapeutic areas including cardiovascular, respiratory, gastrointestinal, and urological systems.
          </p>
          <p className="leading-relaxed">
            Through c-GMP-compliant advanced manufacturing facilities and rigorous quality control, we reliably produce and supply safe, high-quality medicines to healthcare institutions nationwide.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <p className="leading-relaxed">
            순환기, 호흡기, 소화기, 비뇨기 등 주요 만성질환 및 치료 영역을 중심으로 우수한 효능의 전문의약품(ETC)과 일반의약품(OTC) 제품 라인업을 구축하고 있습니다.
          </p>
          <p className="leading-relaxed">
            c-GMP 수준의 첨단 제조 시설과 엄격한 품질관리를 통해 안전하고 신뢰할 수 있는 고품질 의약품을 전국 의료기관 및 약국에 안정적으로 생산·공급합니다.
          </p>
        </div>
      ),
      href: `${basePath}/business/finished/search`,
      actionLinks: [
        {
          label: isEnglish ? 'Product Search Details' : '제품검색 자세히 보기',
          href: `${basePath}/business/finished/search`,
          isPrimary: true,
        },
        {
          label: isEnglish ? 'Product News Details' : '제품소식 자세히 보기',
          href: `${basePath}/business/finished/news`,
          isPrimary: false,
        },
      ],
    },
    {
      id: 'cmo',
      type: 'detail',
      image: '/core_business_cmo.jpg',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'Contract Finished Drug (CDMO)' : '수탁 완제 의약품 개발 (CDMO)',
      desc: isEnglish ? (
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <p className="leading-relaxed">
            Based on proprietary formulation platforms including Multi-Stra® and process optimization capabilities, we provide comprehensive one-stop CDMO solutions spanning formulation development, clinical batch manufacturing, and commercial mass production.
          </p>
          <p className="leading-relaxed">
            Equipped with German Glatt fluid-bed coaters and state-of-the-art automated packaging lines, we manufacture high-precision finished pharmaceuticals customized to our global and domestic partners' demands.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <p className="leading-relaxed">
            Multi-Stra® 등 다산제약만의 독자적인 특수 제형 제제기술과 공정 최적화 역량을 기반으로, 개량신약 및 제네릭 완제의약품의 개발부터 상업화 대량 생산까지 전 주기 원스톱 솔루션을 제공합니다.
          </p>
          <p className="leading-relaxed">
            독일 Glatt 유동층 코팅 설비와 최첨단 자동화 스마트 패키징 라인을 통해 국내외 파트너사의 다양한 요구에 부합하는 최고 품질의 의약품을 위탁 제조합니다.
          </p>
        </div>
      ),
      href: `${basePath}/business/cdmo`,
      actionLinks: [
        {
          label: isEnglish ? 'CDMO Details' : 'CDMO 자세히 보기',
          href: `${basePath}/business/cdmo`,
          isPrimary: true,
        },
      ],
    },
    {
      id: 'api',
      type: 'detail',
      image: '/core_business_api.jpg',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'API & Intermediate R&D' : '의약품 원료 및 중간체 연구개발',
      desc: isEnglish ? (
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <p className="leading-relaxed">
            We drive the research, development, and patent acquisition of high-value APIs and synthetic intermediates including prodrugs, managing global-standard DMF registrations with systematic regulatory precision.
          </p>
          <p className="leading-relaxed">
            Supported by high-precision analytical testing, rigorous QA systems, and a competitive global sourcing network, we deliver trusted, optimized API solutions to pharmaceutical manufacturers worldwide.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <p className="leading-relaxed">
            Prodrug를 비롯한 고부가가치 의약품 핵심 원료 및 합성 중간체의 연구개발과 독자적 특허 확보를 주도하며, 글로벌 규격의 신규 합성·수입 원료 DMF 등록을 체계적으로 관리합니다.
          </p>
          <p className="leading-relaxed">
            고정밀 분석 시험과 엄격한 품질보증 시스템, 경쟁력 있는 글로벌 소싱 네트워크를 바탕으로 국내외 완제의약품 제조사에 신뢰성 높은 최적의 API 솔루션을 공급합니다.
          </p>
        </div>
      ),
      href: `${basePath}/business/api/raw`,
      actionLinks: [
        {
          label: isEnglish ? 'API Details' : 'API 자세히 보기',
          href: `${basePath}/business/api/raw`,
          isPrimary: true,
        },
      ],
    },
    {
      id: 'rd',
      type: 'detail',
      image: '/core_business_rd.jpg',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'New Drug & Formulation Development, Clinical Research' : '신약 및 신제형개발, 임상연구',
      desc: isEnglish ? (
        <p className="leading-relaxed">
          From the discovery of innovative therapeutics such as small molecule novel compounds and RNA therapeutics to new formulation development, specialized formulation platforms, incrementally modified drugs, and clinical trials, Dasan Pharmaceutical is leading the advancement of human health, continuously investing in research and development.
        </p>
      ) : (
        <p className="leading-relaxed">
          저분자 신약 화합물, RNA치료제 개발과 같은 혁신 치료제 발굴부터, 신제형 개발, 특수제형플랫폼, 개량신약, 임상 시험까지 다산제약은 혁신적인 인류 건강 증진의 선두주자로, 지속적으로 연구개발에 투자하고 있습니다.
        </p>
      ),
      href: `${basePath}/rd/intro`,
      actionLinks: [
        {
          label: isEnglish ? 'R&D Activities Details' : '연구 활동 자세히 보기',
          href: `${basePath}/rd/activities`,
          isPrimary: true,
        },
        {
          label: isEnglish ? 'Pipeline Details' : '파이프라인 자세히 보기',
          href: `${basePath}/rd/pipeline`,
          isPrimary: false,
        },
      ],
    },
  ];

  const businessItems = [
    {
      id: 'finished',
      num: '1',
      title: isEnglish ? 'Finished Drugs' : '완제 의약품',
      targetSlide: 1,
    },
    {
      id: 'cmo',
      num: '2',
      title: isEnglish ? 'Contract Finished Drug (CDMO)' : '수탁 완제 의약품 개발 (CDMO)',
      targetSlide: 2,
    },
    {
      id: 'api',
      num: '3',
      title: isEnglish ? 'API & Intermediate R&D' : '의약품 원료 및 중간체 연구개발',
      targetSlide: 3,
    },
    {
      id: 'rd',
      num: '4',
      title: isEnglish ? 'New Drug & Formulation Development, Clinical Research' : '신약 및 신제형개발, 임상연구',
      targetSlide: 4,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgressKey((prev) => prev + 1);
  };

  const handleBackToOverview = () => {
    setIsReturning(true);
    goToSlide(0);
    setTimeout(() => setIsReturning(false), 400);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgressKey((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgressKey((prev) => prev + 1);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Raw Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Ultra-Smooth Physics Spring Easing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.1,
    restDelta: 0.001,
  });

  // 1. Line-by-line sequential fade-in (그림 1: 기술과 혁신으로 -> 건강한 내일을 만듭니다 -> DASAN 로고)
  const line1Opacity = useTransform(smoothProgress, [0.02, 0.12, 0.44, 0.54], [0, 1, 1, 0]);
  const line3Opacity = useTransform(smoothProgress, [0.12, 0.22, 0.44, 0.54], [0, 1, 1, 0]);
  const line2TextOpacity = useTransform(smoothProgress, [0.22, 0.32, 0.44, 0.54], [0, 1, 1, 0]);
  
  const hexOpacity = useTransform(smoothProgress, [0.22, 0.32, 0.68, 0.77], [0, 1, 1, 0]);
  const hexScale = useTransform(
    smoothProgress, 
    [0.0, 0.44, 0.56, 0.67, 0.77], 
    [1, 1, 3.2, 14, 50]
  );
  const hexX = useTransform(
    smoothProgress,
    [0.44, 0.58],
    ['0%', '-29.3%']
  );

  const hexFilter = useTransform(smoothProgress, (p) => {
    if (p <= 0.44) return 'brightness(1) saturate(1)';
    if (p >= 0.77) return 'brightness(2.2) saturate(0)';
    const t = (p - 0.44) / (0.77 - 0.44);
    const b = 1 + (2.2 - 1) * t;
    const s = 1 - t;
    return `brightness(${b.toFixed(3)}) saturate(${s.toFixed(3)})`;
  });

  // 2. Core Business section opacity & reveal (그림 2: 육각형이 화면을 채운 그 자리에 바로 등장!)
  const contentOpacity = useTransform(smoothProgress, [0.68, 0.86], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.68, 0.86], [35, 0]);
  const contentPointerEvents = useTransform(smoothProgress, (v) => (v > 0.70 ? 'auto' : 'none'));

  return (
    <section 
      id="core-business" 
      ref={containerRef}
      className="relative h-[290vh] font-pretendard select-none bg-white"
    >
      {/* Sticky Stage: Positioned directly below Header (Header is h-24 = 96px) so content is never clipped */}
      <div className="sticky top-24 h-[calc(100vh-6rem)] w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* ========================================================================= */}
        {/* 1. SCROLL-EXPANDING HEXAGON & 3-LINE SLOGAN LAYER (그림 1) */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6">
          <div className="flex flex-col items-center text-center max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl w-full">
            {/* 1. 기술과 혁신으로 */}
            <motion.h3 
              style={{ opacity: line1Opacity }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight"
            >
              {isEnglish ? 'Through Technology and Innovation,' : '기술과 혁신으로'}
            </motion.h3>

            {/* 2. DASAN 로고 */}
            <div className="relative select-none my-4 sm:my-5 lg:my-6 2xl:my-8 h-[42px] sm:h-[52px] md:h-[66px] lg:h-[78px] 2xl:h-[88px] aspect-[1024/388] flex items-center justify-center">
              <motion.div style={{ opacity: line2TextOpacity }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img src="/dasan_exact_text_layer.png" alt="DASAN Pharmaceutical" className="w-full h-full object-contain select-none pointer-events-none" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </motion.div>
              <motion.div 
                style={{ 
                  opacity: hexOpacity,
                  scale: hexScale,
                  x: hexX,
                  filter: hexFilter,
                  transformOrigin: '79.3% 50.4%',
                  willChange: 'transform, opacity, filter',
                  transform: 'translateZ(0)'
                }}
                className="absolute inset-0 w-full h-full pointer-events-none origin-[79.3%_50.4%]"
              >
                <img src="/dasan_exact_hex_layer.png" alt="DASAN Symbol" className="w-full h-full object-contain select-none pointer-events-none" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </motion.div>
            </div>

            {/* 3. 건강한 내일을 만듭니다. */}
            <motion.h3 
              style={{ opacity: line3Opacity }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight"
            >
              {isEnglish ? 'We create a healthier tomorrow.' : '건강한 내일을 만듭니다.'}
            </motion.h3>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. REVEALED CORE BUSINESS SECTION (그림 2) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ 
            opacity: contentOpacity, 
            y: contentY,
            pointerEvents: contentPointerEvents as any
          }}
          className="w-full px-6 md:px-16 lg:px-24 mx-auto z-30 my-auto py-1 sm:py-2"
        >
          {/* Section Headline */}
          <div className="mb-2 sm:mb-2.5 lg:mb-3 flex flex-col items-start">
            <div className="flex flex-col">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-brand-green tracking-tight">
                Core Business
              </h2>
              <div className="w-full h-1 bg-brand-green mt-1.5 rounded-full" />
            </div>
          </div>

        {/* Outer Relative Wrapper (Card stays 100% Full Width, Buttons float in Outer Margins) */}
        <div className="relative w-full">
          {/* Picture 1 Style: Left Navigation Arrow Button (<) Floated in Outer Margin */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute -left-4 sm:-left-5 md:-left-7 lg:-left-9 xl:-left-10 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-gray-700 hover:text-brand-green border border-gray-200/90 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
          </button>

          {/* Picture 1 Style: Right Navigation Arrow Button (>) Floated in Outer Margin */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute -right-4 sm:-right-5 md:-right-7 lg:-right-9 xl:-right-10 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-gray-700 hover:text-brand-green border border-gray-200/90 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
          </button>

          {/* Main Combined Card (100% Full Width & Completely Fixed Position & Dimensions on All Slides) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] border border-gray-200 shadow-[0_12px_36px_rgba(0,0,0,0.10),0_3px_12px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {currentSlide === 0 ? (
                /* Slide 1: Picture 1 Overview Layout (7 cols left, 5 cols right) */
                <motion.div
                  key="slide-overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 w-full lg:h-[490px] xl:h-[520px] 2xl:h-[560px]"
                >
                  {/* Left Column: Factory Image & Navy Banner (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col h-full overflow-hidden">
                    <div className="relative w-full aspect-[21/9] lg:aspect-auto flex-1 overflow-hidden bg-gray-100">
                      <img
                        src="/core_business_factory.jpg"
                        alt={isEnglish ? 'Dasan Pharmaceutical Asan Plant' : '다산제약 아산공장 전경'}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="bg-gray-200 px-6 sm:px-8 lg:px-10 xl:px-12 h-[105px] sm:h-[115px] lg:h-[120px] flex items-center shrink-0 border-t-2 border-brand-green relative overflow-hidden">
                      <p className="text-base sm:text-lg md:text-[19px] lg:text-[20px] xl:text-[22px] font-extrabold leading-snug sm:leading-normal text-gray-900 break-keep">
                        {slides[0].title}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Title & 3 Stacked Buttons (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between bg-white h-full">
                    <div className="px-6 sm:px-8 lg:px-10 xl:px-12 pt-4 sm:pt-5 lg:pt-6 pb-2 sm:pb-3">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[40px] font-black text-brand-blue tracking-tight break-keep leading-tight">
                        {isEnglish ? (
                          <span className="flex flex-col gap-1 sm:gap-2">
                            <span>Dasan Pharm&apos;s</span>
                            <span className="text-brand-green">Core Business</span>
                          </span>
                        ) : (
                          <span className="flex flex-col gap-1 sm:gap-2">
                            <span>다산제약의</span>
                            <span className="text-brand-green">주요 사업영역</span>
                          </span>
                        )}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-0 w-full mt-auto">
                      {businessItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => goToSlide(item.targetSlide)}
                          className="group relative w-full pl-6 sm:pl-8 lg:pl-10 xl:pl-12 pr-16 sm:pr-20 py-3 sm:py-3.5 lg:py-3.5 xl:py-4 flex items-center justify-between border-t border-gray-200 bg-white hover:bg-emerald-50/40 transition-all duration-300 ease-out cursor-pointer overflow-hidden text-left"
                        >
                          <div className="flex items-center gap-3 sm:gap-3.5 relative z-10">
                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-50 border border-emerald-200/60 text-brand-green font-bold text-[11px] sm:text-xs flex items-center justify-center font-mono transition-all duration-300 shrink-0">
                              {item.num}
                            </span>
                            <span className="text-base sm:text-lg lg:text-[18px] xl:text-[20px] font-bold tracking-tight break-keep text-gray-800 group-hover:text-brand-green transition-colors duration-300">
                              {item.title}
                            </span>
                          </div>

                          <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-gray-200 text-brand-green flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green group-hover:shadow-md transition-all duration-300 ease-out">
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Slides 2, 3, 4: Matching 7:5 Grid Size and Exactly Fixed Dimensions */
                <motion.div
                  key={`slide-${slides[currentSlide].id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 w-full lg:h-[490px] xl:h-[520px] 2xl:h-[560px]"
                >
                  {/* Left Column: 6 cols */}
                  <div className="lg:col-span-6 relative overflow-hidden bg-gray-100 min-h-[320px] sm:min-h-[380px] lg:min-h-full h-full">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title as string}
                      className="w-full h-full object-cover object-center absolute inset-0"
                    />
                  </div>

                  {/* Right Column: 6 cols */}
                  <div className="lg:col-span-6 relative pt-4 sm:pt-5 lg:pt-5 xl:pt-6 pb-5 sm:pb-6 lg:pb-7 xl:pb-8 px-4 sm:px-6 lg:px-6 xl:px-8 flex flex-col justify-between bg-white h-full min-h-[320px] sm:min-h-[380px] lg:min-h-full">
                    {/* Top Section: 4대 주요 사업영역 텍스트 버튼 & 처음 화면으로 가기 화살표 버튼 (한 줄 정렬, 막대그래프 스크롤바 완전 제거) */}
                    <div className="mb-3 sm:mb-4 flex items-center justify-between gap-1.5 sm:gap-2 w-full">
                      {/* 4대 주요 사업영역 텍스트 버튼 (한 줄로 다 보이게 정렬) */}
                      <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 flex-nowrap min-w-0 flex-1 overflow-x-auto no-scrollbar py-0.5">
                        {businessItems.map((item) => {
                          const isActive = currentSlide === item.targetSlide;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => goToSlide(item.targetSlide)}
                              className={`inline-flex items-center justify-center px-2 sm:px-2.5 xl:px-3 py-1 sm:py-1.5 rounded-full text-[10.5px] sm:text-[11px] lg:text-[11px] xl:text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer border select-none whitespace-nowrap shrink-0 shadow-none ${
                                isActive
                                  ? 'bg-brand-green text-white border-brand-green font-bold'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-green hover:text-brand-green hover:bg-emerald-50/40'
                              }`}
                            >
                              <span>{item.title}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 처음 화면으로 가기 화살표 디자인 버튼 (우측 상단 동일한 줄에 위치, 누르면 녹색 전환 및 처음 화면 이동) */}
                      <button
                        type="button"
                        onClick={handleBackToOverview}
                        aria-label={isEnglish ? 'Back to Overview' : '처음 화면으로 가기'}
                        className={`w-8 h-8 sm:w-8.5 sm:h-8.5 xl:w-9 xl:h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-none group cursor-pointer shrink-0 focus:outline-none relative ${
                          isReturning
                            ? 'bg-brand-green text-white border-brand-green scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-brand-green hover:text-white hover:border-brand-green active:scale-95'
                        }`}
                      >
                        <ArrowUp className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
                        
                        {/* Hover Tooltip (단일 툴팁만 깔끔하게 노출, 클릭 시 즉시 숨김, 하얀색 배경 및 검정색 글자) */}
                        <span className="absolute right-0 top-full mt-1.5 hidden group-hover:flex group-active:hidden items-center px-2.5 py-1 bg-white text-black border border-gray-200 text-[11px] font-semibold rounded-md whitespace-nowrap shadow-md pointer-events-none z-30 animate-fade-in">
                          {isEnglish ? 'Back to Overview' : '처음 화면으로 가기'}
                        </span>
                      </button>
                    </div>

                    <div className="my-auto">
                      {/* Sub-label */}
                      <div className="mb-2 sm:mb-2.5">
                        <span className="text-xs sm:text-base font-bold text-brand-green tracking-wider uppercase">
                          {slides[currentSlide].tag}
                        </span>
                      </div>

                      {/* Big Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black text-brand-blue tracking-tight leading-tight mb-3 sm:mb-4 break-keep">
                        {slides[currentSlide].title}
                      </h3>

                      {/* Description */}
                      <div className="text-sm sm:text-base lg:text-[15.5px] xl:text-[17px] text-gray-600 font-normal leading-relaxed break-keep">
                        {slides[currentSlide].desc}
                      </div>

                      {/* User Requested: 자세히 보기 링크 버튼들 (바깥쪽 테두리 회색 적용) */}
                      {slides[currentSlide].actionLinks && slides[currentSlide].actionLinks.length > 0 && (
                        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4 items-center">
                          {slides[currentSlide].actionLinks.map((link, lIdx) => (
                            <Link
                              key={lIdx}
                              href={link.href}
                              scroll={true}
                              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 border border-gray-300 text-gray-900 hover:bg-brand-green hover:text-white hover:border-brand-green text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 hover:shadow-green-glow group cursor-pointer shrink-0"
                            >
                              <span>{link.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Picture 1 Style: Bottom Slider Pagination Bars & Play/Pause Controller */}
        <div 
          className="mt-3 sm:mt-4 flex items-center justify-center gap-2.5 sm:gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {slides.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer relative bg-gray-200 ${
                  isActive
                    ? 'w-10 sm:w-12'
                    : 'w-7 sm:w-8 hover:bg-gray-300'
                }`}
              >
                {isActive && (
                  <div
                    key={`slide-progress-${currentSlide}-${progressKey}`}
                    onAnimationEnd={nextSlide}
                    className="absolute inset-y-0 left-0 bg-brand-green rounded-full"
                    style={{
                      animation: 'coreBusinessProgress 5s linear forwards',
                      animationPlayState: isPlaying && !isHovered ? 'running' : 'paused',
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* Pause / Play Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause auto slide' : 'Start auto slide'}
            className="ml-2 w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:text-brand-green hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current stroke-none" />
            ) : (
              <Play className="w-4 h-4 fill-current stroke-none ml-0.5" />
            )}
          </button>
        </div>

        <style>{`
          @keyframes coreBusinessProgress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
        </motion.div>
      </div>
    </section>
  );
}

