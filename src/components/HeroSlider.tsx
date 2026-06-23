'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  btnText: string;
  btnLink: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Happy Ones Make a Healthy World.',
    subTitle: '행복한 사람들이 건강한 세상을 만듭니다.',
    description: '다산제약은 독자적인 연구 인프라와 신약 파이프라인 연구개발을 통해 차세대 바이오 테크놀로지를 선도합니다.',
    btnText: '파이프라인 보기',
    btnLink: '/rd/pipeline',
    gradient: 'from-brand-dark via-brand-dark/90 to-brand-blue',
  },
  {
    id: 2,
    title: 'Global Standard CDMO Partner',
    subTitle: '글로벌 기준의 차별화된 위탁 개발 생산 솔루션',
    description: '고난도 고형제 생산 기술과 선진 품질 보증 시스템을 통해 국내외 파트너사에게 신뢰할 수 있는 가치를 전달합니다.',
    btnText: 'CDMO 강점 확인',
    btnLink: '/business/cdmo/advantages',
    gradient: 'from-brand-blue via-brand-dark/95 to-slate-900',
  },
  {
    id: 3,
    title: 'Sustainable ESG Management',
    subTitle: '환경과 사회를 생각하는 기업의 책임경영',
    description: '다산제약은 윤리경영, 환경경영, 안전보건경영을 핵심 가치로 정립하여 더욱 밝고 지속 가능한 미래를 구축해 나갑니다.',
    btnText: 'ESG 경영 방침',
    btnLink: '/about/esg/ethics',
    gradient: 'from-slate-900 via-brand-blue/90 to-brand-dark',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
      6000
    );
    return () => resetTimeout();
  }, [current]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-brand-dark flex items-center">
      {/* Dynamic Background Gradients / Animations */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className={`absolute inset-0 bg-gradient-to-r ${slides[current].gradient}`}
          />
        </AnimatePresence>
        
        {/* Animated Tech Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#00d4b2_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Highlight Tag */}
              <span className="inline-block text-brand-teal text-xs font-bold tracking-widest uppercase border border-brand-teal/40 px-3 py-1 rounded-full mb-6">
                DASAN PHARMACEUTICAL
              </span>

              {/* Title & Subtitle */}
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                {slides[current].title}
              </h1>
              <p className="text-xl md:text-2xl font-bold text-gray-200 mb-6">
                {slides[current].subTitle}
              </p>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                {slides[current].description}
              </p>

              {/* Action Button */}
              <Link
                href={slides[current].btnLink}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-teal to-brand-cyan hover:from-brand-teal/95 hover:to-brand-cyan/95 text-brand-dark font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-brand-teal/20 transition-all duration-300 group"
              >
                <span>{slides[current].btnText}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-12 right-4 sm:right-6 lg:right-8 z-20 flex space-x-3">
        <button
          onClick={handlePrev}
          className="p-3.5 rounded-lg border border-white/20 hover:border-brand-teal text-white hover:text-brand-teal backdrop-blur-sm bg-white/5 transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="p-3.5 rounded-lg border border-white/20 hover:border-brand-teal text-white hover:text-brand-teal backdrop-blur-sm bg-white/5 transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-4 sm:left-6 lg:left-8 z-20 flex items-center space-x-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(idx)}
            className="flex flex-col space-y-1.5 focus:outline-none"
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === idx ? 'w-10 bg-brand-teal' : 'w-3 bg-white/30'
              }`}
            />
          </button>
        ))}
        <span className="text-xs text-white/50 font-mono ml-2">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
