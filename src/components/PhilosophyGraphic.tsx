'use client';

import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { LucideIcon, Scale, Lightbulb, Users, HandHeart, Layers } from 'lucide-react';

interface StepItem {
  num: string;
  title: string;
  desc: string;
  descLines: string[];
  icon: LucideIcon;
  xPercent: string;
  xPos: number;
}

export default function PhilosophyGraphic() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en') ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Scroll-linked stream progress: Starts earlier so cards fan out while comfortably in view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 85%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 20,
    restDelta: 0.001,
  });

  // Compressed, smooth animation timeline along smoothProgress (0 to 1)
  // 1. Stem 1 (애민정신 -> 4대 경영 철학): [0.01 ~ 0.06]
  const stem1Progress = useTransform(smoothProgress, [0.01, 0.06], [0, 1]);
  const stem1Opacity = useTransform(smoothProgress, [0.01, 0.05], [0, 1]);

  // 1.5. 4대 경영 철학 Badge: [0.02 ~ 0.06]
  const badgeOpacity = useTransform(smoothProgress, [0.02, 0.06], [0, 1]);
  const badgeScale = useTransform(smoothProgress, [0.02, 0.06], [0.92, 1.0]);

  // 2. Stem 2 (4대 경영 철학 -> 분기점): [0.06 ~ 0.11]
  const stem2Progress = useTransform(smoothProgress, [0.06, 0.11], [0, 1]);
  const stem2Opacity = useTransform(smoothProgress, [0.06, 0.10], [0, 1]);

  // 2.6. MASTER CARD ("4대 경영 철학" unified card at center): [0.04 ~ 0.16]
  const masterCardOpacity = useTransform(smoothProgress, [0.04, 0.08, 0.11, 0.16], [0, 1, 1, 0]);
  const masterCardScale = useTransform(smoothProgress, [0.04, 0.08, 0.11, 0.16], [0.92, 1.0, 1.0, 0.94]);
  const masterCardPointerEvents = useTransform(smoothProgress, (v) => (v <= 0.11 ? 'auto' : 'none'));
  const masterCardDisplay = useTransform(masterCardOpacity, (v) => (v <= 0.001 ? 'none' : 'flex'));

  // 3. STAGE 1: 물줄기 4개 분기 & 4개 카드가 중앙에서 4개 위치로 펼쳐짐: [0.11 ~ 0.22]
  const upperStreamProgress = useTransform(smoothProgress, [0.11, 0.22], [0, 1]);
  const upperStreamOpacity = useTransform(smoothProgress, [0.11, 0.22], [0.45, 1.0]);

  const fourCardsOpacity = useTransform(smoothProgress, [0.11, 0.16], [0, 1]);
  const fourCardsScale = useTransform(smoothProgress, [0.11, 0.20], [0.95, 1.0]);
  const fourCardsDisplay = useTransform(fourCardsOpacity, (v) => (v <= 0.001 ? 'none' : 'flex'));

  const card1X = useTransform(smoothProgress, [0.11, 0.22], ['50%', '14.4%']);
  const card2X = useTransform(smoothProgress, [0.11, 0.22], ['50%', '38.2%']);
  const card3X = useTransform(smoothProgress, [0.11, 0.22], ['50%', '61.8%']);
  const card4X = useTransform(smoothProgress, [0.11, 0.22], ['50%', '85.6%']);
  const cardXPositions = [card1X, card2X, card3X, card4X];

  const fourCardsPointerEvents = useTransform(smoothProgress, (v) => (v < 0.20 ? 'none' : 'auto'));

  // 4. STAGE 2: 4개 카드가 펼쳐짐과 동시에 아래 단체 사진이 자연스럽게 안착: [0.14 ~ 0.24]
  // 스크롤 지연(대기 구간)을 제거하여 적은 스크롤로도 사진과 카드가 즉각 표시되도록 최적화
  const funnelProgress = useTransform(smoothProgress, [0.14, 0.24], [0, 1]);
  const funnelOpacity = useTransform(funnelProgress, [0, 1], [0, 1]);
  const funnelScale = useTransform(funnelProgress, [0, 1], [0.95, 1.0]);

  // 5. STAGE 3: 타원형 림 및 화살표 전개: [0.24 ~ 0.40]
  const greenOpacity = useTransform(smoothProgress, [0.24, 0.28], [0, 1]);
  const funnelPathD = useTransform(
    smoothProgress,
    [0.24, 0.27, 0.31, 0.36, 0.40],
    [
      // 타원 외곽선에 완벽히 일치 (순수 타원 모양 유지)
      'M 540.0 1256.1 A 755 280 0 0 0 1260.0 1256.1 L 1260.0 1317.7 C 1182.4 1337.2, 1060.0 1352.1, 1060.0 1352.1 Q 1060.0 1352.1, 1060.0 1352.1 L 1060.0 1352.1 Q 1060.0 1352.1, 1060.0 1352.1 L 925.0 1359.8 Q 900.0 1360.0, 875.0 1359.8 L 740.0 1352.1 Q 740.0 1352.1, 740.0 1352.1 L 740.0 1352.1 Q 740.0 1352.1, 740.0 1352.1 C 740.0 1352.1, 617.6 1337.2, 540.0 1317.7 Z',
      // 타원형 그대로 100% 매끄러운 타원 모양 유지
      'M 540.0 1256.1 A 755 280 0 0 0 1260.0 1256.1 L 1260.0 1317.7 C 1182.4 1337.2, 1060.0 1352.1, 1060.0 1352.1 Q 1060.0 1352.1, 1060.0 1352.1 L 1060.0 1352.1 Q 1060.0 1352.1, 1060.0 1352.1 L 925.0 1359.8 Q 900.0 1360.0, 875.0 1359.8 L 740.0 1352.1 Q 740.0 1352.1, 740.0 1352.1 L 740.0 1352.1 Q 740.0 1352.1, 740.0 1352.1 C 740.0 1352.1, 617.6 1337.2, 540.0 1317.7 Z',
      // 타원에서 부드럽게 유기적인 볼록 곡선으로 화살표 전개 시작
      'M 540.0 1256.1 A 755 280 0 0 0 1260.0 1256.1 L 1260.0 1317.7 C 1182.4 1340.0, 1060.0 1370.0, 1060.0 1410.0 Q 1060.0 1415.0, 1065.0 1415.0 L 1075.0 1415.0 Q 1078.0 1415.0, 1078.0 1420.0 L 925.0 1425.0 Q 900.0 1435.0, 875.0 1425.0 L 722.0 1420.0 Q 722.0 1415.0, 725.0 1415.0 L 735.0 1415.0 Q 740.0 1415.0, 740.0 1410.0 C 740.0 1370.0, 617.6 1340.0, 540.0 1317.7 Z',
      // 화살표 줄기 형성 및 촉 확장
      'M 540.0 1256.1 A 755 280 0 0 0 1260.0 1256.1 L 1260.0 1317.7 C 1182.4 1338.0, 1060.0 1420.0, 1060.0 1485.0 Q 1060.0 1500.0, 1075.0 1500.0 L 1120.0 1500.0 Q 1125.0 1500.0, 1125.0 1512.0 L 925.0 1560.0 Q 900.0 1575.0, 875.0 1560.0 L 675.0 1512.0 Q 675.0 1500.0, 680.0 1500.0 L 725.0 1500.0 Q 740.0 1500.0, 740.0 1485.0 C 740.0 1420.0, 617.6 1338.0, 540.0 1317.7 Z',
      // 최종 화살표 완벽 완성
      'M 540.0 1256.1 A 755 280 0 0 0 1260.0 1256.1 L 1260.0 1317.7 C 1182.4 1337.2, 1060.0 1430.0, 1060.0 1530.0 Q 1060.0 1555.0, 1085.0 1555.0 L 1185.0 1555.0 Q 1190.0 1555.0, 1190.0 1569.0 L 925.0 1750.0 Q 900.0 1765.0, 875.0 1750.0 L 610.0 1569.0 Q 610.0 1555.0, 615.0 1555.0 L 715.0 1555.0 Q 740.0 1555.0, 740.0 1530.0 C 740.0 1430.0, 617.6 1337.2, 540.0 1317.7 Z',
    ]
  );
  const dasanY = useTransform(smoothProgress, [0.26, 0.40], [1360, 1630]);
  const dasanTextOpacity = useTransform(smoothProgress, [0.33, 0.38], [0, 1]);

  // 6. STAGE 4: 행복경영 텍스트 안착: [0.38 ~ 0.45]
  const haengbokOpacity = useTransform(smoothProgress, [0.38, 0.45], [0, 1]);
  const haengbokScale = useTransform(smoothProgress, [0.38, 0.45], [0.88, 1.0]);
  const haengbokY = useTransform(smoothProgress, [0.38, 0.41, 0.45], [20, -3, 0]);

  // 4 Core Management Philosophies
  // Aligned to match oval photo tips (X=145, X=1655): 260 (14.4%), 687 (38.2%), 1113 (61.8%), 1540 (85.6%)
  const steps: StepItem[] = [
    {
      num: '01',
      title: isEnglish ? 'Ethical Management' : '정도경영',
      desc: isEnglish
        ? 'Establishing market and customer trust by adhering to transparent and upright standards.'
        : '투명하고 올바른 기준을 준수하며 시장과 고객의 신뢰를 구축합니다.',
      descLines: isEnglish
        ? [
            'Adhering to transparent',
            'and upright standards,',
            'building lasting trust',
            'with valued customers.',
          ]
        : [
            '투명하고 올바른 기준을',
            '준수하며 시장과 고객의',
            '신뢰를 구축합니다.',
          ],
      icon: Scale,
      xPercent: '14.4%',
      xPos: 260,
    },
    {
      num: '02',
      title: isEnglish ? 'Challenge & Creativity' : '도전과 창의',
      desc: isEnglish
        ? 'Pioneering new possibilities through continuous R&D innovation and specialized formulation technology.'
        : '끊임없는 R&D 혁신과 차별화된 제제기술로 새로운 가능성을 개척합니다.',
      descLines: isEnglish
        ? [
            'Pioneering possibilities',
            'through continuous R&D',
            'and specialized',
            'formulation technology.',
          ]
        : [
            '끊임없는 R&D 혁신과',
            '차별화된 제제기술로',
            '새 가능성을 개척합니다.',
          ],
      icon: Lightbulb,
      xPercent: '38.2%',
      xPos: 687,
    },
    {
      num: '03',
      title: isEnglish ? 'Communication & Collaboration' : '소통과 협력',
      desc: isEnglish
        ? 'Pursuing mutual growth with partner companies and organic cooperation among members.'
        : '구성원 간의 유기적인 협업과 파트너사와의 상생을 추구합니다.',
      descLines: isEnglish
        ? [
            'Pursuing mutual growth',
            'with partner companies',
            'and organic cooperation',
            'among all members.',
          ]
        : [
            '구성원 간의 유기적인',
            '협업과 파트너사와의',
            '상생을 추구합니다.',
          ],
      icon: Users,
      xPercent: '61.8%',
      xPos: 1113,
    },
    {
      num: '04',
      title: isEnglish ? 'Social Contribution' : '사회적 공헌',
      desc: isEnglish
        ? 'Contributing to a healthy and happy society based on the value of respect for life.'
        : '생명 존중의 가치를 바탕으로 건강하고 행복한 사회를 만드는 데 기여합니다.',
      descLines: isEnglish
        ? [
            'Devoted to human life,',
            'building a healthier',
            'and happier society',
            'for all people.',
          ]
        : [
            '생명 존중의 가치를',
            '바탕으로 건강하고',
            '행복한 사회에 기여합니다.',
          ],
      icon: HandHeart,
      xPercent: '85.6%',
      xPos: 1540,
    },
  ];

  // 1. Stem 1: Bottom of 애민정신 pill (900, 95) -> Enters seamlessly into top of '4대 경영 철학' (900, 250)
  const stem1Path = 'M 900 95 L 900 250';

  // 2. Stem 2: Emerges from bottom of '4대 경영 철학' (900, 265) -> Branch point (900, 362)
  const stem2Path = 'M 900 265 L 900 362';

  // 3. Upper Delta: Branch point (900, 360) -> 4 organic curves fanning out directly from single origin -> Tops of 4 cards (X_i, 610)
  const upperBranches = [
    {
      d: 'M 900 360 C 820 410, 480 445, 330 480 C 270 495, 260 540, 260 610',
      grad: 'url(#vUpperStreamGrad)',
    },
    {
      d: 'M 900 360 C 880 430, 687 480, 687 610',
      grad: 'url(#vUpperStreamGrad)',
    },
    {
      d: 'M 900 360 C 920 430, 1113 480, 1113 610',
      grad: 'url(#vUpperStreamGrad)',
    },
    {
      d: 'M 900 360 C 980 410, 1320 445, 1470 480 C 1530 495, 1540 540, 1540 610',
      grad: 'url(#vUpperStreamGrad)',
    },
  ];



  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[880px] lg:max-w-[980px] xl:max-w-[1060px] mx-auto mt-2 sm:mt-4 mb-4 sm:mb-6 pb-2 select-none px-2 sm:px-4"
      translate="no"
    >
      {/* Canvas with proportional responsive aspect ratio [1800/1980] */}
      <div className="relative w-full aspect-[1800/1980] overflow-visible">

        {/* ------------------------------------------------------------------ */}
        {/* SVG LAYER: Water Streams (Soft/Light at top -> Rich/Deep at 4 cards) */}
        {/* ------------------------------------------------------------------ */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1800 1980"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Stem 1 Gradient: 40% -> 50% tint equivalent (from 애민정신 to 4대 경영 철학) */}
            <linearGradient id="vStem1Grad" x1="0" y1="95" x2="0" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a2dab7" />
              <stop offset="100%" stopColor="#8cd4a4" />
            </linearGradient>

            {/* Stem 2 & Upper Delta Branches: Smooth unified vertical gradient */}
            {/* Starts from soft light green (#8cd4a4) at badge exit (y=265), maintains #8cd4a4 through branch origin (y=360), */}
            {/* then gracefully enriches to brand green (#16a34a) as it reaches the 4 cards (y=610). */}
            {/* 100% opaque solid colors prevent any dark alpha multiplication at the branch junction. */}
            <linearGradient id="vUpperStreamGrad" x1="0" y1="265" x2="0" y2="610" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8cd4a4" />
              <stop offset="28%" stopColor="#8cd4a4" />
              <stop offset="55%" stopColor="#48b770" />
              <stop offset="80%" stopColor="#25aa58" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>

          {/* Stem 1: From 애민정신 down to 4대 경영 철학 */}
          <motion.path
            d={stem1Path}
            fill="none"
            stroke="url(#vStem1Grad)"
            strokeWidth="18"
            strokeLinecap="round"
            style={{
              pathLength: stem1Progress,
              opacity: stem1Opacity,
            }}
          />

          {/* Stem 2: From 4대 경영 철학 down to Branch point */}
          <motion.path
            d={stem2Path}
            fill="none"
            stroke="url(#vUpperStreamGrad)"
            strokeWidth="18"
            strokeLinecap="butt"
            style={{
              pathLength: stem2Progress,
              opacity: stem2Opacity,
            }}
          />

          {/* Upper Delta: 4 curved water streams flowing to 4 cards */}
          {/* Group-level opacity ensures isolated buffer compositing without alpha stacking at the fork */}
          <motion.g style={{ opacity: upperStreamOpacity }}>
            {upperBranches.map((item, i) => (
              <motion.path
                key={`upper-active-${i}`}
                d={item.d}
                fill="none"
                stroke="url(#vUpperStreamGrad)"
                strokeWidth="18"
                strokeLinecap="butt"
                style={{
                  pathLength: upperStreamProgress,
                }}
              />
            ))}
          </motion.g>
        </svg>

        {/* ------------------------------------------------------------------ */}
        {/* 1. START: 애민 정신 (愛民精神) - Top Center (y: 80 / 1980 = 4.0%)    */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '4.0%' }}
          initial={{ opacity: 0, y: -18, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-slate-50 text-slate-800 border-2 border-slate-200 shadow-md select-none whitespace-nowrap shrink-0 hover:shadow-lg transition-shadow">
            <h3
              className={`font-black text-gray-900 leading-none whitespace-nowrap shrink-0 ${
                isEnglish
                  ? 'text-[7.5px] sm:text-[9.5px] md:text-[11.5px] lg:text-[13px] xl:text-[14.5px]'
                  : 'text-[10px] sm:text-[13.5px] md:text-[16px] lg:text-[18.5px] xl:text-[21px]'
              }`}
            >
              {isEnglish ? 'Aemin (Love for the People)' : '愛民 (애민) 정신'}
            </h3>

            <div className="w-[1.5px] h-3.5 sm:h-4.5 md:h-5 lg:h-5.5 bg-slate-300 shrink-0 mx-1 sm:mx-1.5" />

            <span className="text-[9px] sm:text-xs md:text-sm lg:text-[14.5px] font-semibold text-gray-600 whitespace-nowrap shrink-0">
              {isEnglish ? 'The Root of Dasan, Love for the People' : '신뢰의 뿌리, 백성을 사랑하는 마음'}
            </span>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* 2. 4대 경영 철학 Badge - Appears gradually as water flows down       */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          style={{
            left: '50%',
            top: '13.0%',
            opacity: badgeOpacity,
            scale: badgeScale,
          }}
        >
          <div className="px-4 sm:px-6 md:px-7 py-1 sm:py-1.5 md:py-2 rounded-full bg-white/95 border-2 border-slate-300 shadow-sm backdrop-blur-sm flex items-center justify-center select-none">
            <span
              className={`font-black text-gray-900 tracking-tight whitespace-nowrap ${
                isEnglish
                  ? 'text-[7.5px] sm:text-[9.5px] md:text-[11.5px] lg:text-[13px] xl:text-[14.5px]'
                  : 'text-[10px] sm:text-[13.5px] md:text-[16px] lg:text-[18.5px] xl:text-[21px]'
              }`}
            >
              {isEnglish ? '4 Major Management Philosophies' : '4대 경영 철학'}
            </span>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* 2.8. MASTER CARD: "4대 경영 철학" Representative Card at Center    */}
        {/* Displayed during Stage 1 [0.22 ~ 0.35], then divides into 4 cards  */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-[35]"
          style={{
            left: '50%',
            top: '37.1%',
            opacity: masterCardOpacity,
            scale: masterCardScale,
            pointerEvents: masterCardPointerEvents,
            display: masterCardDisplay,
          }}
        >
          <div className="relative w-[58px] sm:w-[88px] md:w-[112px] lg:w-[148px] xl:w-[164px] min-h-[66px] sm:min-h-[96px] md:min-h-[120px] lg:min-h-[146px] xl:min-h-[158px] rounded-xl sm:rounded-2xl md:rounded-[1.15rem] overflow-hidden select-none bg-white border-2 border-slate-300 shadow-md transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-between p-1.5 sm:p-2.5 md:p-3 text-center">
              {/* Card Top: Title (Top pill removed as requested) */}
              <div className="flex flex-col items-center w-full pt-0.5">
                <h4
                  className={`font-black text-gray-900 leading-tight tracking-tight whitespace-nowrap ${
                    isEnglish
                      ? 'text-[7px] sm:text-[9px] md:text-[11px] lg:text-[12.5px] xl:text-[14px]'
                      : 'text-[9px] sm:text-[12px] md:text-[14px] lg:text-[16.5px] xl:text-[18.5px]'
                  }`}
                >
                  {isEnglish ? '4 Major Philosophies' : '4대 경영 철학'}
                </h4>
              </div>

              {/* Card Center: 4-Core Icon */}
              <div className="w-6 h-6 sm:w-7.5 sm:h-7.5 md:w-8.5 md:h-8.5 lg:w-9.5 lg:h-9.5 xl:w-10.5 xl:h-10.5 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-[#16a34a] shadow-inner my-0.5">
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 stroke-[2.2]" />
              </div>

              {/* Card Bottom: 4 Philosophies Summary */}
              <div className="flex flex-col items-center w-full pb-0.5">
                <p
                  className={`font-black text-gray-900 leading-tight tracking-tight text-center ${
                    isEnglish
                      ? 'text-[5px] sm:text-[6.5px] md:text-[8px] lg:text-[9.5px] xl:text-[11px]'
                      : 'text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13.5px] whitespace-nowrap'
                  }`}
                >
                  {isEnglish ? 'Integrity · Challenge · Synergy · Care' : '정도 · 창의 · 협력 · 공헌'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. 4 CARDS: 4대 경영철학 (정도경영 | 도전과 창의 | 소통과 협력 | 사회적 공헌) */}
        {/* Appear gradually as water streams flow into each card              */}
        {/* 3D Flip from left to right on hover (그림 1 -> 그림 2)             */}
        {/* ------------------------------------------------------------------ */}
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isHovered = activeNode === idx;
          const cardX = cardXPositions[idx];

          return (
            <motion.div
              key={step.num}
              className={`absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                isHovered ? 'z-40' : 'z-30'
              }`}
              style={{
                left: cardX,
                top: '37.1%',
                opacity: fourCardsOpacity,
                scale: fourCardsScale,
                pointerEvents: fourCardsPointerEvents,
                display: fourCardsDisplay,
              }}
              onMouseEnter={() => setActiveNode(idx)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(activeNode === idx ? null : idx)}
            >
              {/* 3D Perspective Container */}
              <div
                className="relative w-[58px] sm:w-[88px] md:w-[112px] lg:w-[148px] xl:w-[164px] h-[66px] sm:h-[96px] md:h-[120px] lg:h-[146px] xl:h-[158px] select-none"
                style={{ perspective: 1200 }}
              >
                {/* 3D Flipping Card Body: Flips from Left to Right (rotateY: 0 -> 180) */}
                <motion.div
                  className="w-full h-full relative"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  initial={false}
                  animate={{
                    rotateY: isHovered ? 180 : 0,
                    scale: isHovered ? 1.05 : 1.0,
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  {/* 1. FRONT FACE (그림 1: 상단은 불투명 화이트로 물줄기 투과 완벽 차단, 하단은 반투명 글래스 유지) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl md:rounded-[1.15rem] bg-gradient-to-b from-white from-35% via-white/85 via-60% to-white/50 backdrop-blur-[1px] border-2 border-slate-300/80 shadow-lg flex flex-col items-center justify-center gap-0.5 sm:gap-1 md:gap-1.5 p-1 sm:p-1.5 md:p-2 text-center overflow-hidden transition-colors"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                    }}
                  >
                    {/* Card Top: Title with subtle protective white glow */}
                    <div className="flex flex-col items-center w-full">
                      <h4
                        className={`font-black text-gray-950 leading-tight tracking-tight whitespace-nowrap drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] ${
                          isEnglish
                            ? 'text-[7px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14.5px]'
                            : 'text-[9px] sm:text-[12.5px] md:text-[15px] lg:text-[17px] xl:text-[19px]'
                        }`}
                      >
                        {step.title}
                      </h4>
                    </div>

                    {/* Card Center: Icon with subtle protective white glow */}
                    <div className="text-[#16a34a] flex items-center justify-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                      <Icon className="w-3.5 h-3.5 sm:w-5.5 sm:h-5.5 md:w-6.5 md:h-6.5 lg:w-7.5 lg:h-7.5 xl:w-9 xl:h-9 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* 2. BACK FACE (그림 2: 선명한 에메랄드 그린 배경, 고대비 순백색 텍스트, 흐림 없는 또렷한 가독성) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl md:rounded-[1.15rem] bg-[#19934c] border-2 sm:border-[3px] border-[#137a3d] shadow-xl shadow-emerald-950/30 flex flex-col items-center justify-center p-1 sm:p-1.5 md:p-2 text-center overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(1px)',
                    }}
                  >
                    {/* Title in Crisp Pure White */}
                    <h4
                      className={`text-white font-black leading-tight tracking-tight mb-1 sm:mb-1.5 md:mb-2 text-center whitespace-nowrap ${
                        isEnglish
                          ? 'text-[7.5px] sm:text-[9.5px] md:text-[11px] lg:text-[13px] xl:text-[14.5px]'
                          : 'text-[9px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]'
                      }`}
                    >
                      {step.title}
                    </h4>

                    {/* Description in Crisp Extrabold White - Clean & Legible */}
                    <div className="w-full text-center px-1 sm:px-1.5 md:px-2 space-y-0.5 sm:space-y-1">
                      {step.descLines.map((line, lIdx) => (
                        <p
                          key={lIdx}
                          className={`text-white font-extrabold leading-tight whitespace-nowrap tracking-tighter text-center ${
                            isEnglish
                              ? 'text-[5.5px] sm:text-[7px] md:text-[8px] lg:text-[9.5px] xl:text-[10.5px]'
                              : 'text-[6px] sm:text-[7.5px] md:text-[9px] lg:text-[10.5px] xl:text-[11.5px]'
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}

        {/* ------------------------------------------------------------------ */}
        {/* 4. BOTTOM: Native Vector 3D Funnel with Team Photo, 행복경영 & DASAN */}
        {/* Directly beneath the 4 cards (top: 47.8% in 1800x1720)             */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: funnelOpacity,
            scale: funnelScale,
            transformOrigin: '50% 60%',
          }}
        >
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Native SVG 3D Funnel & Arrow Vector Shape in 1800x1980 Canvas */}
            <svg
              viewBox="0 0 1800 1980"
              className="w-full h-full overflow-visible select-none drop-shadow-[0_20px_40px_rgba(15,23,42,0.12)] pointer-events-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Drop Shadows */}
                <filter id="vRingShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#064e20" floodOpacity="0.16" />
                </filter>
                <filter id="vArrowShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#064e20" floodOpacity="0.22" />
                </filter>
                <filter id="vTextShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
                </filter>

                {/* Arrow Body Gradient: Continuous gradient across entire 1010-1765 height */}
                <linearGradient id="vArrowBodyGrad" x1="0" y1="1010" x2="0" y2="1765" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#60c080" />
                  <stop offset="25%" stopColor="#4fb572" />
                  <stop offset="55%" stopColor="#3fa864" />
                  <stop offset="85%" stopColor="#2f9d55" />
                  <stop offset="100%" stopColor="#24934a" />
                </linearGradient>

                {/* Oval Clip Path for Team Photo - Fixed 100% full coverage of outer ellipse */}
                <clipPath id="vPhotoClip">
                  <ellipse cx="900" cy="1010" rx="755" ry="280" />
                </clipPath>

                {/* Clip strictly to lower half y >= 1010 so no tails can ever peek above photo equator during motion */}
                <clipPath id="vBottomHalfClip">
                  <rect x="0" y="1010" width="1800" height="970" />
                </clipPath>
              </defs>

              {/* Ambient Backdrop Glow */}
              <ellipse cx="900" cy="1010" rx="745" ry="280" fill="#22c55e" opacity="0.06" filter="blur(35px)" />

              {/* 1. LAYER 1: Base Drop Shadow behind Photo */}
              <g filter="url(#vRingShadow)">
                <ellipse cx="900" cy="1010" rx="755" ry="280" fill="#ffffff" />
              </g>

              {/* 2. LAYER 2: 타원은 사진 아래 온전히 고정되고, 스크롤을 내리면 타원에서 화살표까지 부드럽게 흘러내리듯 연결 */}
              <g clipPath="url(#vBottomHalfClip)">
                <motion.g filter="url(#vArrowShadow)" style={{ opacity: greenOpacity }}>
                  {/* 1. 타원 테두리 림 (스크롤 초기에는 사진만 노출, 스크롤을 더 내리면 온전한 타원 모양으로 등장) */}
                  <path
                    d="
                      M 145 1010
                      A 755 280 0 0 0 1655 1010
                      A 755 350 0 0 1 145 1010
                      Z
                    "
                    fill="url(#vArrowBodyGrad)"
                  />

                  {/* 2. 타원형 바닥에서 화살표로 매끄럽게 연결되어 흘러나오는 경로 */}
                  <motion.path
                    d={funnelPathD}
                    fill="url(#vArrowBodyGrad)"
                  />

                  {/* Crisp White Vector Typography: DASAN inside Arrow */}
                  <motion.text
                    x="900"
                    y={dasanY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontFamily="'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    fontWeight="900"
                    fontSize="54"
                    letterSpacing="3px"
                    filter="url(#vTextShadow)"
                    style={{ opacity: dasanTextOpacity }}
                  >
                    DASAN
                  </motion.text>
                </motion.g>
              </g>

              {/* 3. LAYER 3: 테두리에 맞춘 사진 (그대로 고정, 100% 채움) */}
              <g clipPath="url(#vPhotoClip)">
                <image
                  href="/funnel_team_meeting.png"
                  x="145"
                  y="730"
                  width="1510"
                  height="560"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>

              {/* 5. LAYER 5: 행복경영 Typography Below Arrow Tip (Reveals at the very end of scroll) */}
              <motion.g
                style={{
                  opacity: haengbokOpacity,
                  scale: haengbokScale,
                  y: haengbokY,
                  transformOrigin: '900px 1825px',
                }}
              >
                <text
                  x="900"
                  y="1825"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#22a058"
                  fontFamily="'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  fontWeight="900"
                  fontSize={isEnglish ? 38 : 66}
                  letterSpacing={isEnglish ? '-0.5px' : '-1.5px'}
                >
                  {isEnglish ? 'Happiness Management' : '행복경영'}
                </text>
              </motion.g>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
