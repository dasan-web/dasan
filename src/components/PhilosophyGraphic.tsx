'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { LucideIcon, ShieldCheck, Lightbulb, Users, HandHeart, Smile } from 'lucide-react';

export default function PhilosophyGraphic() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en') ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Directly link the long green line to vertical scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 85%'],
  });

  const smoothPathLength = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  });

  // Long flowing S-curve ribbon path (viewBox 0 0 1000 1800)
  // Connects:
  // (500, 80) 애민정신
  // -> (250, 360) 01. 정도경영 (Left)
  // -> (750, 680) 02. 도전과 창의 (Right)
  // -> (250, 1000) 03. 소통과 협력 (Left)
  // -> (750, 1320) 04. 사회적 공헌 (Right)
  // -> (500, 1485) 05. 행복경영 육각형 상단 수평면 (Center Bottom)
  const ribbonPath =
    'M 500 80 C 500 200, 250 240, 250 360 C 250 500, 750 540, 750 680 C 750 820, 250 860, 250 1000 C 250 1140, 750 1180, 750 1320 C 750 1440, 500 1440, 500 1545';

  const steps = [
    {
      num: '01',
      title: isEnglish ? 'Ethical Management' : '정도경영',
      cardTitle: isEnglish ? 'Ethical Management' : '정도 경영',
      desc: isEnglish
        ? 'Establishing market and customer trust by adhering to transparent and upright standards.'
        : '투명하고 올바른 기준을 준수하며 시장과 고객의 신뢰를 구축합니다.',
      icon: ShieldCheck,
      side: 'left' as const,
      yPercent: '20.0%', // 360 / 1800
      xPercent: '25.0%', // 250 / 1000
      threshold: 0.152,
    },
    {
      num: '02',
      title: isEnglish ? 'Challenge & Creativity' : '도전과 창의',
      cardTitle: isEnglish ? 'Challenge & Creativity' : '도전과 창의',
      desc: isEnglish
        ? 'Pioneering new possibilities through continuous R&D innovation and specialized formulation technology.'
        : '끊임없는 R&D 혁신과 차별화된 제제기술로 새로운 가능성을 개척합니다.',
      icon: Lightbulb,
      side: 'right' as const,
      yPercent: '37.7%', // 680 / 1800
      xPercent: '75.0%', // 750 / 1000
      threshold: 0.393,
    },
    {
      num: '03',
      title: isEnglish ? 'Communication & Collaboration' : '소통과 협력',
      cardTitle: isEnglish ? 'Communication & Collaboration' : '소통과 협력',
      desc: isEnglish
        ? 'Pursuing mutual growth with partner companies and organic cooperation among members.'
        : '구성원 간의 유기적인 협업과 파트너사와의 상생을 추구합니다.',
      icon: Users,
      side: 'left' as const,
      yPercent: '55.5%', // 1000 / 1800
      xPercent: '25.0%', // 250 / 1000
      threshold: 0.635,
    },
    {
      num: '04',
      title: isEnglish ? 'Social Contribution' : '사회적 공헌',
      cardTitle: isEnglish ? 'Social Contribution' : '사회적 공헌',
      desc: isEnglish
        ? 'Contributing to a healthy and happy society based on the value of respect for life.'
        : '생명 존중의 가치를 바탕으로 건강하고 행복한 사회를 만드는 데 기여합니다.',
      icon: HandHeart,
      side: 'right' as const,
      yPercent: '73.3%', // 1320 / 1800
      xPercent: '75.0%', // 750 / 1000
      threshold: 0.876,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1040px] mx-auto mt-12 sm:mt-16 mb-4 select-none px-2 sm:px-4"
      translate="no"
    >

      {/* Main Long Vertical Canvas (viewBox 0 0 1000 1800) */}
      <div className="relative w-full aspect-[1000/1800] p-4 sm:p-8 overflow-hidden">

        {/* ------------------------------------------------------------------ */}
        {/* SVG LAYER: Long Connecting Ribbon from Start down to the Hexagon   */}
        {/* ------------------------------------------------------------------ */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1000 1800"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Monochromatic Green Gradient: Light Green -> Deep Green */}
            <linearGradient id="long-green-ribbon" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="25%" stopColor="#4ade80" />
              <stop offset="55%" stopColor="#16a34a" />
              <stop offset="85%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            {/* Glowing Drop Shadow Filter */}
            <filter id="ribbon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.45" />
              <feDropShadow dx="0" dy="3" stdDeviation="12" floodColor="#15803d" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* 1. Subtle Ambient Guide Track (Faint track indicating the full length) */}
          <path
            d={ribbonPath}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />

          {/* 2. Hidden Reference Path for Real-time Length Measurement */}
          <path
            ref={pathRef}
            d={ribbonPath}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />

          {/* 3. The Dynamic Long Flowing Green Ribbon (Solid flat single color: no 3D) */}
          <motion.path
            d={ribbonPath}
            fill="none"
            stroke="#16a34a"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: smoothPathLength,
            }}
          />
        </svg>

        {/* ------------------------------------------------------------------ */}
        {/* START: 애민 정신 (愛民精神) - Top Center (y: 80 / 1800 = 4.44%)      */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '4.44%' }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 rounded-full bg-slate-100 text-slate-800 border-2 border-slate-300 shadow-sm select-none whitespace-nowrap shrink-0">
            <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-900 leading-none whitespace-nowrap shrink-0">
              {isEnglish ? 'Aemin (Love for the People)' : '愛民 (애민) 정신'}
            </h3>

            <div className="w-[1px] h-4 bg-slate-300 shrink-0 mx-0.5 sm:mx-1" />

            <span className="text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap shrink-0">
              {isEnglish ? 'The Root of Dasan, Love for the People' : '신뢰의 뿌리, 백성을 사랑하는 마음'}
            </span>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* STEPS 01 ~ 04: One by One along the Long Green Ribbon              */}
        {/* ------------------------------------------------------------------ */}
        {steps.map((step) => (
          <StepNode
            key={step.num}
            step={step}
            smoothPathLength={smoothPathLength}
          />
        ))}

        {/* ------------------------------------------------------------------ */}
        {/* STEP 05 (FINAL DESTINATION): 행복경영 DASAN (맨 아래 - 육각형)       */}
        {/* Coords: (500, 1640) => left: 50%, top: 90.5%                      */}
        {/* ------------------------------------------------------------------ */}
        <HexagonBadge
          smoothPathLength={smoothPathLength}
          isEnglish={isEnglish}
        />
      </div>

    </div>
  );
}

function HexagonBadge({
  smoothPathLength,
  isEnglish,
}: {
  smoothPathLength: MotionValue<number>;
  isEnglish: boolean;
}) {
  // Hexagon background starts as white (#ffffff) and turns gray (#f1f5f9) as the descending line touches it
  const hexagonBg = useTransform(
    smoothPathLength,
    [0.96, 0.995],
    ['#ffffff', '#f1f5f9']
  );

  // Border progress: emerald-500 (#10b981) border fills from top center down both sides to bottom center
  const borderProgress = useTransform(
    smoothPathLength,
    [0.96, 1.0],
    [0, 1]
  );

  const borderOpacity = useTransform(
    smoothPathLength,
    [0.958, 0.962],
    [0, 1]
  );

  return (
    <motion.div
      className="absolute z-30 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: '50%', top: '90.5%' }}
      initial={{ opacity: 0, y: 70, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hexagon Badge with Gray Border and Drop Shadow (SVG Polygon) */}
      <div className="relative flex items-center justify-center w-[185px] h-[160px] sm:w-[235px] sm:h-[205px] md:w-[275px] md:h-[240px] select-none hover:scale-105 transition-transform duration-500 cursor-default">
        <svg
          viewBox="0 0 230 200"
          className="absolute inset-0 w-full h-full overflow-visible"
          style={{ filter: 'drop-shadow(0px 8px 18px rgba(100, 116, 139, 0.22))' }}
        >
          {/* Base Hexagon Polygon (White -> Gray background, Gray border) */}
          <motion.polygon
            points="57.5,4 172.5,4 226,100 172.5,196 57.5,196 4,100"
            style={{ fill: hexagonBg }}
            stroke="#cbd5e1"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Left half emerald green border: flows from top center (115, 4) down to bottom center (115, 196) */}
          <motion.path
            d="M 115 4 L 57.5 4 L 4 100 L 57.5 196 L 115 196"
            fill="none"
            stroke="#10b981"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: borderProgress,
              opacity: borderOpacity,
            }}
          />

          {/* Right half emerald green border: flows from top center (115, 4) down to bottom center (115, 196) */}
          <motion.path
            d="M 115 4 L 172.5 4 L 226 100 L 172.5 196 L 115 196"
            fill="none"
            stroke="#10b981"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: borderProgress,
              opacity: borderOpacity,
            }}
          />
        </svg>

        {/* Inner Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-6">
          {/* Happiness Icon */}
          <div className="text-[#16a34a] mb-1 sm:mb-1.5 flex items-center justify-center">
            <Smile className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[2.2]" />
          </div>

          {/* Main Title: 행복경영 */}
          <h3 className="text-gray-900 font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight leading-tight">
            {isEnglish ? 'Happiness Management' : '행복경영'}
          </h3>

          {/* Brand Logo Text: DASAN */}
          <span className="text-[#16a34a] font-black text-xs sm:text-sm md:text-lg tracking-widest mt-0.5 sm:mt-1">
            DASAN
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface StepItem {
  num: string;
  title: string;
  cardTitle: string;
  desc: string;
  icon: LucideIcon;
  side: 'left' | 'right';
  yPercent: string;
  xPercent: string;
  threshold: number;
}

function StepNode({
  step,
  smoothPathLength,
}: {
  step: StepItem;
  smoothPathLength: MotionValue<number>;
}) {
  const Icon = step.icon;
  const t = step.threshold;

  // As the green line touches the outer edge and enters the circle, smoothly fill with the top button's light gray (#f1f5f9 / slate-100)
  const circleBg = useTransform(
    smoothPathLength,
    [t - 0.025, t + 0.015],
    ['#ffffff', '#f1f5f9']
  );

  const iconColor = useTransform(
    smoothPathLength,
    [t - 0.025, t + 0.015],
    ['#16a34a', '#15803d']
  );

  const numColor = useTransform(
    smoothPathLength,
    [t - 0.025, t + 0.015],
    ['#16a34a', '#15803d']
  );

  const titleColor = useTransform(
    smoothPathLength,
    [t - 0.025, t + 0.015],
    ['#111827', '#0f172a']
  );

  const ringShadow = useTransform(
    smoothPathLength,
    [t - 0.025, t + 0.015],
    [
      '0 8px 24px -4px rgba(0, 0, 0, 0.06)',
      '0 12px 28px -4px rgba(0, 0, 0, 0.12)',
    ]
  );

  const circleScale = useTransform(
    smoothPathLength,
    [t - 0.03, t, t + 0.025],
    [1, 1.08, 1.03]
  );

  // Border progress: emerald-500 (#10b981) border fills from top to bottom symmetrically
  const borderProgress = useTransform(
    smoothPathLength,
    [t - 0.025, t + 0.015],
    [0, 1]
  );

  const borderOpacity = useTransform(
    smoothPathLength,
    [t - 0.027, t - 0.024],
    [0, 1]
  );

  // Description text card: fades in and slides in smoothly when line reaches the node
  const textOpacity = useTransform(
    smoothPathLength,
    [t - 0.015, t + 0.035],
    [0, 1]
  );

  const textTranslateX = useTransform(
    smoothPathLength,
    [t - 0.015, t + 0.035],
    [step.side === 'left' ? -18 : 18, 0]
  );

  return (
    <React.Fragment>
      {/* Central Orbital Node Circle on the Line */}
      <motion.div
        className="absolute z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-default pointer-events-auto"
        style={{ left: step.xPercent, top: step.yPercent }}
      >
        <motion.div
          style={{
            backgroundColor: circleBg,
            boxShadow: ringShadow,
            scale: circleScale,
          }}
          className="relative w-[105px] h-[105px] sm:w-[145px] sm:h-[145px] md:w-[168px] md:h-[168px] rounded-full flex flex-col items-center justify-center p-2 sm:p-3 text-center select-none hover:scale-110 transition-transform duration-300 overflow-visible"
        >
          {/* SVG Animated Border Layer */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
          >
            {/* Base gray border before line reaches */}
            <circle
              cx="50"
              cy="50"
              r="47.5"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="4.5"
            />

            {/* Left half emerald green border: flows from top (50, 2.5) down to bottom (50, 97.5) */}
            <motion.path
              d="M 50 2.5 A 47.5 47.5 0 0 0 50 97.5"
              fill="none"
              stroke="#10b981"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                pathLength: borderProgress,
                opacity: borderOpacity,
              }}
            />

            {/* Right half emerald green border: flows from top (50, 2.5) down to bottom (50, 97.5) */}
            <motion.path
              d="M 50 2.5 A 47.5 47.5 0 0 1 50 97.5"
              fill="none"
              stroke="#10b981"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                pathLength: borderProgress,
                opacity: borderOpacity,
              }}
            />
          </svg>

          {/* Inner Content */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <motion.div style={{ color: iconColor }}>
              <Icon size={30} className="mb-1 sm:mb-1.5 sm:scale-110" />
            </motion.div>

            <motion.span
              style={{ color: numColor }}
              className="text-[11px] sm:text-[13px] md:text-[14px] font-black tracking-widest uppercase"
            >
              {step.num}
            </motion.span>

            <motion.h4
              style={{ color: titleColor }}
              className="text-[14px] sm:text-[18px] md:text-[21px] font-black leading-tight"
            >
              {step.title}
            </motion.h4>
          </div>
        </motion.div>
      </motion.div>

      {/* Description Text Card positioned beside the Circle */}
      <motion.div
        className={`absolute z-20 flex items-center -translate-y-1/2 ${
          step.side === 'left'
            ? 'left-[40%] sm:left-[38%] md:left-[36%]'
            : 'right-[40%] sm:right-[38%] md:right-[36%]'
        } max-w-[56%] sm:max-w-[54%] md:max-w-[50%] pointer-events-auto`}
        style={{
          top: step.yPercent,
          opacity: textOpacity,
          x: textTranslateX,
        }}
      >
        <div className="w-full bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
          <p className="text-[11.5px] sm:text-[14px] md:text-[15.5px] font-semibold text-gray-700 leading-snug sm:leading-relaxed break-keep">
            {step.desc}
          </p>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

