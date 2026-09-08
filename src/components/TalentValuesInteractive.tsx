'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export interface TalentItem {
  letter: string;
  word: string;
  desc: string;
  color: string;
  lightBg: string;
  borderTint: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  glowColor: string;
}

const TALENT_ITEMS_KO: TalentItem[] = [
  {
    letter: 'D',
    word: 'Detail',
    desc: '업무의 시작부터 마지막 순간까지 최고의 완성도를 추구한다.',
    color: '#0284c7', // Sky blue
    lightBg: 'bg-sky-50/80',
    borderTint: 'border-sky-200',
    badgeBg: 'bg-sky-600',
    badgeBorder: 'border-sky-500',
    textColor: 'text-sky-600',
    glowColor: 'rgba(2, 132, 199, 0.35)',
  },
  {
    letter: 'A',
    word: 'Active',
    desc: '능동적으로 업무를 수행하고 상호 협력한다.',
    color: '#16a34a', // Emerald green
    lightBg: 'bg-emerald-50/80',
    borderTint: 'border-emerald-200',
    badgeBg: 'bg-emerald-600',
    badgeBorder: 'border-emerald-500',
    textColor: 'text-emerald-600',
    glowColor: 'rgba(22, 163, 74, 0.35)',
  },
  {
    letter: 'S',
    word: 'Smart',
    desc: '전문지식을 보유하고 합리적으로 판단한다.',
    color: '#7c3aed', // Purple / Violet
    lightBg: 'bg-violet-50/80',
    borderTint: 'border-violet-200',
    badgeBg: 'bg-violet-600',
    badgeBorder: 'border-violet-500',
    textColor: 'text-violet-600',
    glowColor: 'rgba(124, 58, 237, 0.35)',
  },
  {
    letter: 'A',
    word: 'Action',
    desc: '강력한 추진력을 바탕으로 목표한 바를 이뤄낸다.',
    color: '#ea580c', // Orange
    lightBg: 'bg-orange-50/80',
    borderTint: 'border-orange-200',
    badgeBg: 'bg-orange-600',
    badgeBorder: 'border-orange-500',
    textColor: 'text-orange-600',
    glowColor: 'rgba(234, 88, 12, 0.35)',
  },
  {
    letter: 'N',
    word: 'New thinking',
    desc: '고정관념을 버리고 창의적인 변화를 주도한다.',
    color: '#db2777', // Pink / Rose
    lightBg: 'bg-pink-50/80',
    borderTint: 'border-pink-200',
    badgeBg: 'bg-pink-600',
    badgeBorder: 'border-pink-500',
    textColor: 'text-pink-600',
    glowColor: 'rgba(219, 39, 119, 0.35)',
  },
];

const TALENT_ITEMS_EN: TalentItem[] = [
  {
    letter: 'D',
    word: 'Detail',
    desc: 'Pursuing the highest perfection from start to finish of every task.',
    color: '#0284c7',
    lightBg: 'bg-sky-50/80',
    borderTint: 'border-sky-200',
    badgeBg: 'bg-sky-600',
    badgeBorder: 'border-sky-500',
    textColor: 'text-sky-600',
    glowColor: 'rgba(2, 132, 199, 0.35)',
  },
  {
    letter: 'A',
    word: 'Active',
    desc: 'Proactively carrying out duties and collaborating with team members.',
    color: '#16a34a',
    lightBg: 'bg-emerald-50/80',
    borderTint: 'border-emerald-200',
    badgeBg: 'bg-emerald-600',
    badgeBorder: 'border-emerald-500',
    textColor: 'text-emerald-600',
    glowColor: 'rgba(22, 163, 74, 0.35)',
  },
  {
    letter: 'S',
    word: 'Smart',
    desc: 'Possessing professional expertise and making rational judgments.',
    color: '#7c3aed',
    lightBg: 'bg-violet-50/80',
    borderTint: 'border-violet-200',
    badgeBg: 'bg-violet-600',
    badgeBorder: 'border-violet-500',
    textColor: 'text-violet-600',
    glowColor: 'rgba(124, 58, 237, 0.35)',
  },
  {
    letter: 'A',
    word: 'Action',
    desc: 'Achieving goals based on strong drive and execution power.',
    color: '#ea580c',
    lightBg: 'bg-orange-50/80',
    borderTint: 'border-orange-200',
    badgeBg: 'bg-orange-600',
    badgeBorder: 'border-orange-500',
    textColor: 'text-orange-600',
    glowColor: 'rgba(234, 88, 12, 0.35)',
  },
  {
    letter: 'N',
    word: 'New thinking',
    desc: 'Overcoming fixed ideas to lead creative and meaningful change.',
    color: '#db2777',
    lightBg: 'bg-pink-50/80',
    borderTint: 'border-pink-200',
    badgeBg: 'bg-pink-600',
    badgeBorder: 'border-pink-500',
    textColor: 'text-pink-600',
    glowColor: 'rgba(219, 39, 119, 0.35)',
  },
];

interface Props {
  isEnglish?: boolean;
}

export default function TalentValuesInteractive({ isEnglish = false }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = isEnglish ? TALENT_ITEMS_EN : TALENT_ITEMS_KO;

  const svgContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const originDotRef = useRef<HTMLDivElement>(null);

  // Dynamic coordinates for pixel-perfect connection
  const [lineCoords, setLineCoords] = useState<
    { startX: number; originY: number; targetX: number; targetY: number }[]
  >([
    { startX: 8, originY: 190, targetX: 84, targetY: 34 },
    { startX: 8, originY: 190, targetX: 84, targetY: 112 },
    { startX: 8, originY: 190, targetX: 84, targetY: 190 },
    { startX: 8, originY: 190, targetX: 84, targetY: 268 },
    { startX: 8, originY: 190, targetX: 84, targetY: 346 },
  ]);
  const [originY, setOriginY] = useState<number>(190);
  const [originX, setOriginX] = useState<number>(8);

  const updatePositions = useCallback(() => {
    if (!svgContainerRef.current) return;
    const svgRect = svgContainerRef.current.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    // Computed Origin X and Y
    let computedOriginY = svgRect.height / 2;
    let computedOriginX = 8;

    if (originDotRef.current) {
      const dotRect = originDotRef.current.getBoundingClientRect();
      computedOriginY = dotRect.top + dotRect.height / 2 - svgRect.top;
      computedOriginX = Math.max(8, dotRect.right - svgRect.left + 8);
    }

    setOriginX(computedOriginX);
    setOriginY(computedOriginY);

    const newCoords = items.map((_, idx) => {
      const cardEl = cardRefs.current[idx];
      const pillEl = pillRefs.current[idx];

      let targetY = (idx + 0.5) * (svgRect.height / 5);
      let targetX = svgRect.width;

      if (pillEl) {
        const pillRect = pillEl.getBoundingClientRect();
        targetY = pillRect.top + pillRect.height / 2 - svgRect.top;
      } else if (cardEl) {
        const cardRect = cardEl.getBoundingClientRect();
        targetY = cardRect.top + cardRect.height / 2 - svgRect.top;
      }

      if (cardEl) {
        const cardRect = cardEl.getBoundingClientRect();
        targetX = cardRect.left - svgRect.left;
      }

      return {
        startX: computedOriginX,
        originY: computedOriginY,
        targetX,
        targetY,
      };
    });

    setLineCoords(newCoords);
  }, [items]);

  useEffect(() => {
    updatePositions();
    const t1 = setTimeout(updatePositions, 60);
    const t2 = setTimeout(updatePositions, 200);
    const t3 = setTimeout(updatePositions, 600);

    window.addEventListener('resize', updatePositions);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updatePositions();
      });
      if (svgContainerRef.current) ro.observe(svgContainerRef.current);
      if (cardsContainerRef.current) ro.observe(cardsContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updatePositions);
      if (ro) ro.disconnect();
    };
  }, [updatePositions]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* 1. Clean Left-Aligned Philosophy Section (No Outer Border, No Bold) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full space-y-6 pt-2 pb-2 text-left"
      >
        {/* Top Header (Left-aligned) */}
        <div className="space-y-2.5 border-b border-gray-100 pb-5">
          <h3 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-gray-900 tracking-tight leading-snug">
            {isEnglish 
              ? 'Great Medicine Comes from Great People' 
              : '좋은 의약품은 결국 좋은 사람에게서 나옵니다'}
          </h3>
        </div>

        {/* Body Text (Left-aligned, NO BOLD) */}
        <div className="space-y-4 text-base md:text-[16px] text-gray-600 leading-[1.9] font-normal break-keep">
          {isEnglish ? (
            <>
              <p>
                Dasan Pharmaceutical was founded on the philosophy of &apos;Aemin (Love for the People)&apos; inspired by Dasan Jeong Yak-yong, the greatest practical scholar of the Joseon Dynasty, researching and developing pharmaceuticals for humanity&apos;s health and happy life.
                <br />
                Believing that good medicine ultimately comes from good people, we expect the same sincerity and principles from the colleagues who join us.
              </p>
              <p>
                &apos;Innovating Today for a Healthier Tomorrow&apos;, we believe that innovation today for a healthier tomorrow is only possible when such individuals come together.
                <br />
                Dasan Pharmaceutical awaits talented individuals who resonate with this value and wish to grow together with us.
              </p>
            </>
          ) : (
            <>
              <p>
                다산제약은 조선 최고의 실학자 다산 정약용 선생의 &apos;애민(愛民)&apos; 정신을 창업이념으로 삼아, 인류의 건강과 행복한 삶을 위한 의약품을 연구하고 만들어 왔습니다.
                <br />
                좋은 의약품은 결국 좋은 사람에게서 나온다는 믿음으로, 저희는 함께 일할 동료에게도 같은 진심과 원칙을 기대합니다.
              </p>
              <p>
                &apos;Innovating Today for a Healthier Tomorrow&apos;, 건강한 내일을 위한 오늘의 혁신은 이런 사람들이 모였을 때 비로소 가능하다고 믿습니다.
                <br />
                다산제약은 이 가치에 공감하고 함께 성장해 나갈 인재를 기다립니다.
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* 2. Blue Box Section: Interactive Color-coded DASAN Diagram */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="w-full bg-white rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-100 shadow-[0_6px_30px_rgba(0,0,0,0.04)] relative"
      >
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4 md:gap-4 lg:gap-6 relative">
          
          {/* Left: Color-coded Interactive DASAN Logo (Pure Clean - No Background/Border) */}
          <div className="flex flex-col items-center justify-center min-w-[170px] sm:min-w-[190px] text-center py-2 self-center shrink-0">
            {/* 5 Letters clickable / hoverable */}
            <div ref={originDotRef} className="flex items-center justify-center space-x-1 sm:space-x-1.5 py-1">
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                const isAnyActive = activeIndex !== null;
                return (
                  <button
                    key={idx}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    className="relative px-1 py-1 focus:outline-none group/letter transition-all duration-300 cursor-pointer"
                    title={`${item.letter} : ${item.word}`}
                  >
                    <span 
                      className={`text-4xl sm:text-5xl font-black tracking-tight block transition-all duration-300 ${
                        isActive 
                          ? 'scale-125 -translate-y-1' 
                          : isAnyActive 
                          ? 'opacity-35 scale-95' 
                          : 'opacity-90 hover:scale-110'
                      }`}
                      style={{ 
                        color: item.color,
                        textShadow: isActive ? `0 0 16px ${item.glowColor}` : 'none'
                      }}
                    >
                      {item.letter}
                    </span>

                    {/* Active Underline Dot */}
                    {isActive && (
                      <motion.span 
                        layoutId="activeDot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.glowColor}` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* English Hover Guide (Clean - No Background/Border) */}
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium select-none tracking-wide">
              <svg 
                className="w-3.5 h-3.5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
              <span>Hover your cursor</span>
            </div>
          </div>

          {/* Center: Dynamic SVG Branch Lines (Pixel-perfect auto-aligning to each pill badge) */}
          <div 
            ref={svgContainerRef}
            className="hidden md:flex relative self-stretch w-20 md:w-24 shrink-0 pointer-events-none items-center justify-center"
          >
            <svg className="w-full h-full overflow-visible" fill="none">
              {/* Origin Circle */}
              <circle 
                cx={originX} 
                cy={originY} 
                r={6} 
                className="transition-colors duration-300"
                fill={activeIndex !== null ? items[activeIndex].color : '#64ad55'} 
              />
              <circle 
                cx={originX} 
                cy={originY} 
                r={11} 
                className="transition-colors duration-300 animate-pulse"
                fill={activeIndex !== null ? `${items[activeIndex].color}33` : 'rgba(100,173,85,0.2)'} 
              />

              {/* 5 Branch Lines accurately pointing to each card's center-left */}
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                const isAnyActive = activeIndex !== null;
                const strokeColor = isActive ? item.color : isAnyActive ? '#e2e8f0' : item.color;
                const strokeWidth = isActive ? 3.5 : 2;
                const strokeOpacity = isActive ? 1 : isAnyActive ? 0.3 : 0.65;

                const pos = lineCoords[idx] ?? {
                  startX: originX,
                  originY: originY,
                  targetX: 80,
                  targetY: 34 + idx * 76,
                };

                const dx = pos.targetX - pos.startX;
                const cp1x = pos.startX + dx * 0.45;
                const cp1y = pos.originY;
                const cp2x = pos.targetX - dx * 0.45;
                const cp2y = pos.targetY;
                const d = `M ${pos.startX} ${pos.originY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pos.targetX} ${pos.targetY}`;

                return (
                  <g key={idx}>
                    {/* Branch line */}
                    <path 
                      d={d} 
                      stroke={strokeColor} 
                      strokeWidth={strokeWidth} 
                      strokeLinecap="round" 
                      opacity={strokeOpacity}
                      className="transition-all duration-300 ease-out"
                      style={{
                        filter: isActive ? `drop-shadow(0 0 6px ${item.glowColor})` : 'none'
                      }}
                    />

                    {/* Precise Terminal Connector Dot at the Card Edge */}
                    <circle 
                      cx={pos.targetX} 
                      cy={pos.targetY} 
                      r={isActive ? 4 : 2.5} 
                      fill={strokeColor}
                      opacity={strokeOpacity}
                      className="transition-all duration-300"
                    />
                    {isActive && (
                      <circle 
                        cx={pos.targetX} 
                        cy={pos.targetY} 
                        r={8} 
                        fill={`${item.color}33`}
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right: 5 Value Cards with Cross-Highlight */}
          <div ref={cardsContainerRef} className="flex-1 w-full space-y-2.5">
            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              const isAnyActive = activeIndex !== null;

              return (
                <div 
                  key={idx}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className={`p-3 sm:px-5 sm:py-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer transition-all duration-300 border ${
                    isActive 
                      ? `${item.lightBg} ${item.borderTint} shadow-md` 
                      : isAnyActive 
                      ? 'bg-white border-transparent opacity-40' 
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  {/* Word Pill Badge */}
                  <div 
                    ref={(el) => { pillRefs.current[idx] = el; }}
                    className={`min-w-[135px] sm:w-[150px] h-10 rounded-full flex items-center justify-center px-4 transition-all duration-300 border-2 ${
                      isActive 
                        ? `${item.badgeBg} ${item.badgeBorder} text-white scale-105 shadow-sm` 
                        : `bg-white ${item.badgeBorder}`
                    }`}
                    style={{
                      boxShadow: isActive ? `0 4px 14px ${item.glowColor}` : 'none'
                    }}
                  >
                    <span className={`text-[15px] font-bold tracking-tight text-center transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      <span 
                        className={`font-black text-base transition-colors duration-300 ${
                          isActive ? 'text-white' : item.textColor
                        }`}
                      >
                        {item.letter}
                      </span>
                      {item.word.slice(1)}
                    </span>
                  </div>

                  {/* Description Text */}
                  <div className={`text-sm md:text-[15px] leading-relaxed break-keep flex-1 transition-all duration-300 ${
                    isActive 
                      ? 'text-gray-900 font-bold' 
                      : 'text-gray-700 font-medium'
                  }`}>
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
