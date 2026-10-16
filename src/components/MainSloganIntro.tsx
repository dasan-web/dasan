'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface MainSloganIntroProps {
  isEnglish?: boolean;
}

export default function MainSloganIntro({ isEnglish: isEnglishProp }: MainSloganIntroProps) {
  const pathname = usePathname();
  const isEnglish = isEnglishProp !== undefined ? isEnglishProp : pathname?.startsWith('/en');

  const containerRef = useRef<HTMLDivElement>(null);

  // Raw Scroll Progress within this section
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

  // 1. Line-by-line sequential fade-in
  // 1번: 기술과 혁신으로 (가장 먼저 서서히 등장)
  const line1Opacity = useTransform(smoothProgress, [0.03, 0.15, 0.52, 0.65], [0, 1, 1, 0]);

  // 2번: 건강한 내일을 만듭니다. (두 번째로 서서히 등장)
  const line3Opacity = useTransform(smoothProgress, [0.15, 0.28, 0.52, 0.65], [0, 1, 1, 0]);

  // 3번: DASAN 로고 (세 번째로 중앙에 서서히 등장)
  // 3-1) 글자 부분: 세 번째로 서서히 등장 후 0.52부터 페이드아웃
  const line2TextOpacity = useTransform(smoothProgress, [0.28, 0.40, 0.52, 0.65], [0, 1, 1, 0]);

  // 3-2) 그림 부분(육각형): 서서히 등장 후 스크롤 시 중앙으로 이동하며 점점 밝아지면서 단독 확대
  const hexOpacity = useTransform(smoothProgress, [0.28, 0.40, 0.88, 0.98], [0, 1, 1, 0]);
  const hexScale = useTransform(
    smoothProgress,
    [0.0, 0.52, 0.66, 0.80, 0.95],
    [1, 1, 3.5, 15, 55]
  );
  const hexX = useTransform(
    smoothProgress,
    [0.52, 0.68],
    ['0%', '-29.3%']
  );

  // 육각형이 커지면서 색이 밝아져 순백색으로 자연스럽게 전환
  const hexFilter = useTransform(smoothProgress, (p) => {
    if (p <= 0.52) return 'brightness(1) saturate(1)';
    if (p >= 0.95) return 'brightness(2.2) saturate(0)';
    const t = (p - 0.52) / (0.95 - 0.52);
    const b = 1 + (2.2 - 1) * t;
    const s = 1 - t;
    return `brightness(${b.toFixed(3)}) saturate(${s.toFixed(3)})`;
  });

  return (
    <section 
      id="slogan"
      ref={containerRef}
      className="relative h-[220vh] font-pretendard select-none bg-white"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* ========================================================================= */}
        {/* SCROLL-EXPANDING HEXAGON & 3-LINE SLOGAN LAYER */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6">
          
          {/* Main Slogan: 3-Tier Layout */}
          <div 
            className="flex flex-col items-center text-center max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl w-full"
          >
            {/* 1. 기술과 혁신으로 */}
            <motion.h3 
              style={{ opacity: line1Opacity }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight"
            >
              {isEnglish ? 'Through Technology and Innovation,' : '기술과 혁신으로'}
            </motion.h3>

            {/* 2. DASAN 로고 (글자 + 육각형 심볼) */}
            <div 
              className="relative select-none my-4 sm:my-5 lg:my-6 2xl:my-8 h-[42px] sm:h-[52px] md:h-[66px] lg:h-[78px] 2xl:h-[88px] aspect-[1024/388] flex items-center justify-center"
            >
              {/* 2-1. DASAN Typography (글자: 제자리 페이드아웃) */}
              <motion.div 
                style={{ opacity: line2TextOpacity }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <img
                  src="/dasan_exact_text_layer.png"
                  alt="DASAN Pharmaceutical"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </motion.div>

              {/* 2-2. DASAN Symbol Mark (육각형 심볼: 단독 중앙 이동 및 화면 가득 확대) */}
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
                <img
                  src="/dasan_exact_hex_layer.png"
                  alt="DASAN Symbol"
                  className="w-full h-full object-contain select-none pointer-events-none"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
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

      </div>
    </section>
  );
}
