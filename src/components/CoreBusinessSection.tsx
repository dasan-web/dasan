'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function CoreBusinessSection() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const slides = [
    {
      id: 'factory',
      type: 'overview',
      image: '/core_business_factory.jpg',
      tag: isEnglish ? 'KEY VALUE CHAIN' : '전주기 인프라',
      title: isEnglish ? (
        <>
          Dasan Pharmaceutical has established a{' '}
          <strong className="font-black text-white">Key Value Chain infrastructure</strong>{' '}
          across the entire pharmaceutical lifecycle from R&D to sales, securing high value-added business growth potential.
        </>
      ) : (
        <>
          다산제약은 연구개발(R&D)부터 판매까지 의약품 전 주기의<br className="hidden sm:block" />
          <strong className="font-black text-white">Key Value Chain 인프라를 구축하여</strong><br className="hidden sm:block" />
          고부가가치 사업 성장성을 확보하고 있습니다.
        </>
      ),
    },
    {
      id: 'finished',
      type: 'detail',
      image: '/core_business_finished.png',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'Proprietary Finished Drug Business' : '자사 완제 의약품 사업',
      desc: isEnglish
        ? 'Establishing, producing, and supplying an excellent portfolio of ethical and OTC drugs centered on cardiovascular, respiratory, and urological systems.'
        : '순환기, 호흡기, 비뇨기 중심의 우수한 제품 라인업 구축 및 생산 판매',
      href: `${basePath}/business/finished/search`,
    },
    {
      id: 'cmo',
      type: 'detail',
      image: '/core_business_cmo.jpg',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'Contract Finished Drug (CMO) Business' : '수탁 완제 의약품 (CMO) 사업',
      desc: isEnglish
        ? 'Contract manufacturing of ethical pharmaceuticals through proprietary formulation technology and process optimization.'
        : '독자적인 제제기술 및 공정 최적화를 통한 전문의약품 수탁 생산',
      href: `${basePath}/business/cdmo`,
    },
    {
      id: 'api',
      type: 'detail',
      image: '/core_business_api.jpg',
      tag: isEnglish ? 'Core Business' : '주요 사업영역',
      title: isEnglish ? 'API & Intermediate Business' : '의약품 핵심 원료 및 중간체 사업',
      desc: isEnglish
        ? 'Development and patent acquisition of key APIs and intermediates, with DMF registration and quality control for new synthetic and imported materials.'
        : '의약품 핵심 원료 및 중간체 개발 및 특허 확보, 신규 합성 및 신규 수입 원료 DMF등록 관리',
      href: `${basePath}/business/api/raw`,
    },
  ];

  const businessItems = [
    {
      id: 'finished',
      title: isEnglish ? 'Proprietary Finished Drug Business' : '자사 완제 의약품 사업',
      targetSlide: 1,
      bgClass: 'bg-[#f1f5f9] text-gray-900 hover:brightness-[0.98]',
      arrowColor: 'text-gray-900',
    },
    {
      id: 'cmo',
      title: isEnglish ? 'Contract Finished Drug (CMO) Business' : '수탁 완제 의약품 (CMO) 사업',
      targetSlide: 2,
      bgClass: 'bg-[#cbd5e1] text-gray-900 hover:brightness-[0.98]',
      arrowColor: 'text-gray-900',
    },
    {
      id: 'api',
      title: isEnglish ? 'API & Intermediate Business' : '의약품 핵심 원료 및 중간체 사업',
      targetSlide: 3,
      bgClass: 'bg-[#8594a6] text-gray-900 hover:brightness-[0.98]',
      arrowColor: 'text-gray-900',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSlide]);

  return (
    <section id="core-business" className="pt-20 sm:pt-28 md:pt-32 lg:pt-36 pb-14 md:pb-20 bg-white relative font-pretendard">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 flex flex-col items-start"
        >
          <div className="flex flex-col">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-brand-green tracking-tight">
              Core Business
            </h2>
            <div className="w-full h-1.5 bg-brand-green mt-2 rounded-full" />
          </div>
        </motion.div>

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
            className="w-full bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden"
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
                  className="grid grid-cols-1 lg:grid-cols-12 w-full lg:h-[620px] xl:h-[640px]"
                >
                  {/* Left Column: Factory Image & Navy Banner (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col h-full overflow-hidden">
                    <div className="relative w-full aspect-[21/9] lg:aspect-auto flex-1 overflow-hidden bg-gray-100 group">
                      <img
                        src="/core_business_factory.jpg"
                        alt={isEnglish ? 'Dasan Pharmaceutical Asan Plant' : '다산제약 아산공장 전경'}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="bg-[#1F4E78] px-6 sm:px-8 lg:px-10 xl:px-12 py-4 sm:py-5 lg:py-5.5 flex items-center shrink-0">
                      <p className="text-base sm:text-lg lg:text-[19px] xl:text-[21px] font-bold leading-snug sm:leading-relaxed text-white break-keep">
                        {slides[0].title}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Title & 3 Stacked Buttons (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between bg-white h-full">
                    <div className="px-6 sm:px-8 lg:px-10 xl:px-12 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-5">
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[56px] 2xl:text-[62px] font-black text-gray-900 tracking-tight break-keep">
                        {isEnglish ? (
                          <span className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                            <span>Dasan Pharm&apos;s</span>
                            <span className="text-gray-900">Core Business Areas</span>
                          </span>
                        ) : (
                          <span className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                            <span>다산제약의</span>
                            <span className="text-gray-900">주요 사업영역</span>
                          </span>
                        )}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-0 w-full mt-auto">
                      {businessItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentSlide(item.targetSlide)}
                          className={`group relative w-full pl-6 sm:pl-8 lg:pl-10 xl:pl-12 pr-24 sm:pr-28 py-6 sm:py-7 lg:py-8 xl:py-8.5 flex items-center justify-between transition-all duration-300 ease-out cursor-pointer overflow-hidden text-left ${item.bgClass}`}
                        >
                          <span className="relative z-10 text-xl sm:text-2xl lg:text-[24px] xl:text-[27px] 2xl:text-[29px] font-medium tracking-tight break-keep text-gray-900">
                            {item.title}
                          </span>

                          <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-brand-green flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300 ease-out">
                              <ArrowRight className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.5] text-brand-green transition-transform duration-300 group-hover:translate-x-0.5" />
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
                  className="grid grid-cols-1 lg:grid-cols-12 w-full lg:h-[620px] xl:h-[640px]"
                >
                  {/* Left Column: 7 cols (Edge-to-edge full height matching Slide 1 left bounds perfectly) */}
                  <div className="lg:col-span-7 relative overflow-hidden bg-gray-100 min-h-[320px] sm:min-h-[380px] lg:min-h-full h-full group">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title as string}
                      className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Right Column: 5 cols (Matching Slide 1 right bounds perfectly) */}
                  <div className="lg:col-span-5 relative p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-white h-full min-h-[320px] sm:min-h-[380px] lg:min-h-full">
                    {/* Top Right Corner Action Button: Click to return to Overview (Picture 2) */}
                    <button
                      onClick={() => setCurrentSlide(0)}
                      aria-label="주요 사업영역 전체보기"
                      className="absolute top-6 sm:top-8 lg:top-10 right-6 sm:right-8 lg:right-10 w-11 h-11 rounded-full flex items-center justify-center text-gray-700 hover:text-brand-green hover:bg-gray-100/80 transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none"
                    >
                      <ArrowUpRight className="w-7 h-7 stroke-[2.2]" />
                    </button>

                    {/* Sub-label */}
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-[#1F4E78] tracking-wider uppercase mb-3 sm:mb-4">
                      {slides[currentSlide].tag}
                    </span>

                    {/* Big Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-gray-900 tracking-tight leading-tight mb-4 sm:mb-6 break-keep">
                      {slides[currentSlide].title}
                    </h3>

                    {/* Description */}
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-normal leading-relaxed break-keep">
                      {slides[currentSlide].desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Picture 1 Style: Bottom Slider Pagination Bars & Play/Pause Controller */}
        <div className="mt-8 flex items-center justify-center gap-2.5 sm:gap-3">
          {slides.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-10 sm:w-12 bg-black'
                    : 'w-7 sm:w-8 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}

          {/* Pause / Play Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause auto slide' : 'Start auto slide'}
            className="ml-2 w-7 h-7 rounded-full flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current stroke-none" />
            ) : (
              <Play className="w-4 h-4 fill-current stroke-none ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

