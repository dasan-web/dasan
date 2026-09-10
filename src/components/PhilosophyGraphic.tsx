'use client';

import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { LucideIcon, ShieldCheck, Lightbulb, Users, HandHeart, Smile } from 'lucide-react';

interface StepItem {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  xPercent: string;
  xPos: number;
}

export default function PhilosophyGraphic() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en') ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Directly link stream progress to vertical scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Animation timelines along smoothProgress (0 to 1)
  // 1. Upper branch: Single trunk from 애민정신 splits into 4 streams (0.05 -> 0.35)
  const upperStreamProgress = useTransform(smoothProgress, [0.05, 0.35], [0, 1]);

  // 2. 4 Horizontal Circles light up (0.28 -> 0.52)
  const circlesProgress = useTransform(smoothProgress, [0.28, 0.52], [0, 1]);
  const horizontalRibbonProgress = useTransform(smoothProgress, [0.30, 0.55], [0, 1]);

  // 3. Lower branch: 4 streams exit and converge into ONE at (500, 630) (0.45 -> 0.75)
  const lowerStreamProgress = useTransform(smoothProgress, [0.45, 0.75], [0, 1]);

  // 4. Merged single stream enters 행복경영 (0.70 -> 0.88)
  const mergedStemProgress = useTransform(smoothProgress, [0.70, 0.88], [0, 1]);

  // 5. Hexagon badge illuminates (0.82 -> 1.00)
  const hexagonProgress = useTransform(smoothProgress, [0.82, 1.0], [0, 1]);

  // 4 Core Management Philosophies - strictly horizontal at the same Y level
  // Center coordinates in viewBox 0 0 1000 880:
  // Y = 320 for all 4 circles
  // X = 135, 378, 622, 865
  const steps: StepItem[] = [
    {
      num: '01',
      title: isEnglish ? 'Ethical Management' : '정도경영',
      desc: isEnglish
        ? 'Establishing market and customer trust by adhering to transparent and upright standards.'
        : '투명하고 올바른 기준을 준수하며 시장과 고객의 신뢰를 구축합니다.',
      icon: ShieldCheck,
      xPercent: '13.5%',
      xPos: 135,
    },
    {
      num: '02',
      title: isEnglish ? 'Challenge & Creativity' : '도전과 창의',
      desc: isEnglish
        ? 'Pioneering new possibilities through continuous R&D innovation and specialized formulation technology.'
        : '끊임없는 R&D 혁신과 차별화된 제제기술로 새로운 가능성을 개척합니다.',
      icon: Lightbulb,
      xPercent: '37.8%',
      xPos: 378,
    },
    {
      num: '03',
      title: isEnglish ? 'Communication & Collaboration' : '소통과 협력',
      desc: isEnglish
        ? 'Pursuing mutual growth with partner companies and organic cooperation among members.'
        : '구성원 간의 유기적인 협업과 파트너사와의 상생을 추구합니다.',
      icon: Users,
      xPercent: '62.2%',
      xPos: 622,
    },
    {
      num: '04',
      title: isEnglish ? 'Social Contribution' : '사회적 공헌',
      desc: isEnglish
        ? 'Contributing to a healthy and happy society based on the value of respect for life.'
        : '생명 존중의 가치를 바탕으로 건강하고 행복한 사회를 만드는 데 기여합니다.',
      icon: HandHeart,
      xPercent: '86.5%',
      xPos: 865,
    },
  ];

  // SVG Paths in viewBox 0 0 1000 880:
  // Top: 애민정신 bottom center at (500, 95)
  // Split point at (500, 160)
  // Circle tops at Y = 252 (R = 68, center Y = 320)
  const upperPaths = [
    'M 500 95 L 500 160 C 500 220, 135 195, 135 252',
    'M 500 95 L 500 160 C 500 220, 378 205, 378 252',
    'M 500 95 L 500 160 C 500 220, 622 205, 622 252',
    'M 500 95 L 500 160 C 500 220, 865 195, 865 252',
  ];

  // Horizontal ribbon connecting the 4 circles through their centers (Y = 320)
  const horizontalRibbonPath = 'M 135 320 L 865 320';

  // Lower streams exiting below description cards (Y = 515) and merging into (500, 630)
  const lowerPaths = [
    'M 135 515 C 135 580, 500 565, 500 630',
    'M 378 515 C 378 580, 500 575, 500 630',
    'M 622 515 C 622 580, 500 575, 500 630',
    'M 865 515 C 865 580, 500 565, 500 630',
  ];

  // Single unified stream from merge point (500, 630) into 행복경영 Hexagon top (500, 715)
  const mergedStemPath = 'M 500 630 L 500 715';

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1080px] mx-auto mt-6 sm:mt-10 mb-4 select-none px-2 sm:px-4"
      translate="no"
    >
      {/* Canvas with proportional responsive aspect ratio [1000/880] */}
      <div className="relative w-full aspect-[1000/980] sm:aspect-[1000/910] md:aspect-[1000/880] overflow-visible">

        {/* ------------------------------------------------------------------ */}
        {/* SVG LAYER: Water Streams (Gray Base Tracks + Active Green Flow)    */}
        {/* ------------------------------------------------------------------ */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1000 880"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 1. Underlying Gray Base Tracks (기존 은은한 연회색 안내선 #e2e8f0) */}
          {/* Upper 1-to-4 Split Tracks */}
          {upperPaths.map((d, i) => (
            <path
              key={`upper-base-${i}`}
              d={d}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          ))}

          {/* Horizontal Connection Ribbon behind the 4 circles */}
          <path
            d={horizontalRibbonPath}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Lower 4-to-1 Merge Tracks */}
          {lowerPaths.map((d, i) => (
            <path
              key={`lower-base-${i}`}
              d={d}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          ))}

          {/* Merged Single Trunk into Hexagon */}
          <path
            d={mergedStemPath}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* 2. Active Green Streams (생동감 넘치는 녹색 물줄기 #16a34a) */}
          {/* Upper: 1 single stream from 애민정신 splits into 4 streams */}
          {upperPaths.map((d, i) => (
            <motion.path
              key={`upper-active-${i}`}
              d={d}
              fill="none"
              stroke="#16a34a"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: upperStreamProgress }}
            />
          ))}

          {/* Horizontal Connecting Ribbon behind the 4 circles (그림처럼 연결) */}
          <motion.path
            d={horizontalRibbonPath}
            fill="none"
            stroke="#16a34a"
            strokeWidth="12"
            strokeLinecap="round"
            style={{ pathLength: horizontalRibbonProgress }}
          />

          {/* Lower: 4 streams exit downwards and converge into (500, 630) */}
          {lowerPaths.map((d, i) => (
            <motion.path
              key={`lower-active-${i}`}
              d={d}
              fill="none"
              stroke="#16a34a"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: lowerStreamProgress }}
            />
          ))}

          {/* Bottom: The 4 streams unite into ONE single stream into 행복경영 */}
          <motion.path
            d={mergedStemPath}
            fill="none"
            stroke="#16a34a"
            strokeWidth="14"
            strokeLinecap="round"
            style={{ pathLength: mergedStemProgress }}
          />

          {/* Merge Convergence Node at (500, 630) */}
          <circle cx="500" cy="630" r="10" fill="#e2e8f0" />
          <motion.circle
            cx="500"
            cy="630"
            r="10"
            fill="#16a34a"
            style={{
              opacity: useTransform(lowerStreamProgress, [0.85, 1], [0, 1]),
              scale: useTransform(lowerStreamProgress, [0.85, 1], [0.8, 1.2]),
            }}
          />
        </svg>

        {/* ------------------------------------------------------------------ */}
        {/* START: 애민 정신 (愛民精神) - Top Center (y: 65 / 880 = 7.4%)        */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '7.4%' }}
          initial={{ opacity: 0, y: -18, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 sm:gap-3.5 px-4 sm:px-7 py-2 sm:py-2.5 rounded-full bg-slate-50 text-slate-800 border-2 border-slate-200 shadow-sm select-none whitespace-nowrap shrink-0 hover:shadow-md transition-shadow">
            <h3 className="text-xs sm:text-base md:text-lg font-black text-gray-900 leading-none whitespace-nowrap shrink-0">
              {isEnglish ? 'Aemin (Love for the People)' : '愛民 (애민) 정신'}
            </h3>

            <div className="w-[1px] h-3.5 sm:h-4 bg-slate-300 shrink-0 mx-0.5" />

            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap shrink-0">
              {isEnglish ? 'The Root of Dasan, Love for the People' : '신뢰의 뿌리, 백성을 사랑하는 마음'}
            </span>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* MIDDLE: 4대 경영철학 (4 Horizontal Circles at EXACT SAME Y = 36.4%) */}
        {/* 01. 정도경영 | 02. 도전과 창의 | 03. 소통과 협력 | 04. 사회적 공헌     */}
        {/* ------------------------------------------------------------------ */}
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isHovered = activeNode === idx;

          return (
            <React.Fragment key={step.num}>
              {/* Circular Node (그림처럼 나란히 같은 위치: top: 36.4%) */}
              <motion.div
                className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: step.xPercent, top: '36.4%' }}
                onMouseEnter={() => setActiveNode(idx)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => setActiveNode(activeNode === idx ? null : idx)}
              >
                <div
                  className={`relative w-[78px] h-[78px] sm:w-[118px] sm:h-[118px] md:w-[146px] md:h-[146px] rounded-full bg-white flex flex-col items-center justify-center p-1.5 sm:p-3 text-center select-none shadow-[0_6px_22px_rgba(0,0,0,0.07)] transition-all duration-300 border-[3.5px] sm:border-[4.5px] md:border-[5.5px] ${
                    isHovered
                      ? 'border-[#16a34a] scale-105 shadow-[0_10px_28px_rgba(22,163,74,0.22)]'
                      : 'border-[#16a34a] hover:scale-105'
                  }`}
                >
                  {/* SVG Animated Border Wave Effect */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
                  >
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      style={{ pathLength: circlesProgress }}
                    />
                  </svg>

                  {/* Inner Content matching media_1789014786052.png */}
                  <div className="relative z-20 flex flex-col items-center justify-center">
                    {/* Icon */}
                    <div className="text-[#16a34a] mb-0.5 sm:mb-1 transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 stroke-[2.2]" />
                    </div>

                    {/* Number: 01, 02, 03, 04 in Green */}
                    <span className="text-[10px] sm:text-xs md:text-[13px] font-black tracking-widest text-[#16a34a] leading-none mb-0.5">
                      {step.num}
                    </span>

                    {/* Title: 정도경영, 도전과 창의, 소통과 협력, 사회적 공헌 in Bold Black */}
                    <h4 className="text-[9.5px] sm:text-[13px] md:text-[15.5px] font-black text-gray-900 leading-tight tracking-tight text-center whitespace-nowrap">
                      {step.title}
                    </h4>
                  </div>
                </div>
              </motion.div>

              {/* Description Card (각 원형 노드 바로 아래 동일한 수평선상: top: 52.8%) */}
              <motion.div
                className="absolute z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 w-[22%] max-w-[225px]"
                style={{ left: step.xPercent, top: '53.0%' }}
                onMouseEnter={() => setActiveNode(idx)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div
                  className={`w-full bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-3.5 border transition-all duration-300 text-center shadow-xs ${
                    isHovered
                      ? 'border-[#16a34a] shadow-md bg-emerald-50/40 -translate-y-0.5'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <p className="text-[9px] sm:text-[11px] md:text-[12.5px] font-medium text-gray-700 leading-snug sm:leading-relaxed break-keep">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* ------------------------------------------------------------------ */}
        {/* BOTTOM: 행복경영 DASAN (맨 아래 - 4개 물줄기가 하나로 모이는 종착지)   */}
        {/* Coords: (500, 790) => left: 50%, top: 88.5%                        */}
        {/* ------------------------------------------------------------------ */}
        <HexagonBadge
          smoothPathLength={hexagonProgress}
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
  // Hexagon background starts as white (#ffffff) and turns softly tinted as the descending unified line fills it
  const hexagonBg = useTransform(
    smoothPathLength,
    [0.75, 1.0],
    ['#ffffff', '#f8fafc']
  );

  // Border progress: emerald green border fills from top center down both sides to bottom center
  const borderProgress = useTransform(
    smoothPathLength,
    [0.6, 1.0],
    [0, 1]
  );

  const borderOpacity = useTransform(
    smoothPathLength,
    [0.55, 0.65],
    [0, 1]
  );

  return (
    <motion.div
      className="absolute z-30 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: '50%', top: '88.5%' }}
      initial={{ opacity: 0, y: 35, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Hexagon Badge with Gray Border and Drop Shadow (SVG Polygon) */}
      <div className="relative flex items-center justify-center w-[150px] h-[130px] sm:w-[195px] sm:h-[170px] md:w-[230px] md:h-[200px] select-none hover:scale-105 transition-transform duration-300 cursor-default">
        <svg
          viewBox="0 0 230 200"
          className="absolute inset-0 w-full h-full overflow-visible"
          style={{ filter: 'drop-shadow(0px 8px 20px rgba(100, 116, 139, 0.18))' }}
        >
          {/* Base Hexagon Polygon (White -> Soft Gray background, Gray border #cbd5e1) */}
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
            stroke="#16a34a"
            strokeWidth="4.5"
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
            stroke="#16a34a"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: borderProgress,
              opacity: borderOpacity,
            }}
          />
        </svg>

        {/* Inner Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 sm:px-4">
          {/* Happiness Icon */}
          <div className="text-[#16a34a] mb-0.5 sm:mb-1 flex items-center justify-center">
            <Smile className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.2]" />
          </div>

          {/* Main Title: 행복경영 */}
          <h3 className="text-gray-900 font-black text-xs sm:text-lg md:text-xl lg:text-2xl tracking-tight leading-tight">
            {isEnglish ? 'Happiness Management' : '행복경영'}
          </h3>

          {/* Brand Logo Text: DASAN */}
          <span className="text-[#16a34a] font-black text-[10px] sm:text-xs md:text-sm tracking-widest mt-0.5">
            DASAN
          </span>
        </div>
      </div>
    </motion.div>
  );
}
