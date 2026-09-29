'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Atom, 
  Sliders, 
  Layers, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Dna,
  ShieldCheck
} from 'lucide-react';
import { useMemo } from 'react';
import { parseRdActivitiesData } from '@/lib/rdActivities';

interface RdActivitiesContentProps {
  dbContent?: string | null;
}

export default function RdActivitiesContent({ dbContent }: RdActivitiesContentProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>('all');

  const data = useMemo(() => parseRdActivitiesData(dbContent), [dbContent]);

  const techIcons: Record<string, any> = {
    A: Activity,
    B: Atom,
    C: Sliders,
    D: Layers,
    E: Sparkles,
  };

  const techList = useMemo(() => {
    return (data.techList || []).map((t) => ({
      ...t,
      icon: techIcons[t.id] || Sparkles,
    }));
  }, [data.techList]);

  const displayedTechList = selectedTech === 'all'
    ? techList
    : techList.filter(item => item.id === selectedTech);

  return (
    <div className="w-full space-y-16 md:space-y-24 text-slate-800 font-pretendard">
      
      {/* ========================================================================= */}
      {/* 1. Hero & Vision Section (클린 타이틀 + 대형 볼드 텍스트) */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-2">
        {/* Title Block */}
        <div className="flex flex-col items-start space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-tight sm:leading-[1.3] w-full break-keep whitespace-pre-line">
            {data.heroTitle}
          </h1>
        </div>

        {/* 와이드 시네마틱 비주얼 배너 (텍스트 오버레이 없이 연구소 고화질 실사 그대로 노출) */}
        <div className="w-full aspect-[21/9] sm:aspect-[21/9] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-xl bg-slate-900 border border-gray-100/90 relative group">
          <img 
            src="/rd_activities_hero.jpg?v=3" 
            alt="다산제약 첨단 DDS 제제 연구소 - 정밀 용액 제제 분석 연구" 
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. Multi-Stra™ 제제 플랫폼 배너 & 5대 기술 컨트롤러 */}
      {/* ========================================================================= */}
      <section id="core-technologies" className="space-y-6">
        <div className="relative w-full text-slate-800 py-1 sm:py-2">
          {/* Subtle Decorative Molecular Wave (neutral light gray) */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="150" cy="150" r="100" stroke="rgba(203,213,225,0.6)" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="150" cy="150" r="60" stroke="rgba(203,213,225,0.7)" strokeWidth="1.5" />
              <circle cx="210" cy="150" r="7" fill="rgba(203,213,225,0.8)" />
              <circle cx="90" cy="150" r="7" fill="rgba(203,213,225,0.8)" />
              <circle cx="150" cy="90" r="7" fill="rgba(203,213,225,0.8)" />
              <circle cx="150" cy="210" r="7" fill="rgba(203,213,225,0.8)" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-5 w-full">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {data.platformTitle}
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed break-keep max-w-4xl whitespace-pre-line">
              {data.platformDesc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 pt-3">
              {/* 전체 보기 버튼 */}
              <button 
                type="button"
                onClick={() => setSelectedTech('all')}
                className={`px-2 sm:px-2.5 py-3.5 sm:py-4 rounded-2xl border shadow-2xs text-center space-y-1.5 transition-all cursor-pointer group ${
                  selectedTech === 'all' 
                    ? 'bg-emerald-50 border-brand-green ring-2 ring-brand-green/20' 
                    : 'bg-white/95 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="h-5 flex items-center justify-center">
                  <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] text-brand-green font-bold uppercase tracking-wider whitespace-nowrap">
                    VIEW ALL
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] font-bold text-slate-800 leading-tight whitespace-nowrap">전체 보기</p>
              </button>

              {/* A. TDDS */}
              <button 
                type="button"
                onClick={() => setSelectedTech('A')}
                className={`px-2 sm:px-2.5 py-3.5 sm:py-4 rounded-2xl border shadow-2xs text-center space-y-1.5 transition-all cursor-pointer group ${
                  selectedTech === 'A' 
                    ? 'bg-emerald-50 border-brand-green ring-2 ring-brand-green/20' 
                    : 'bg-white/95 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-brand-green text-white text-[10.5px] font-black flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                    A
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] font-bold text-slate-800 leading-tight whitespace-nowrap">경피 약물 전달</p>
              </button>

              {/* B. Nanonization */}
              <button 
                type="button"
                onClick={() => setSelectedTech('B')}
                className={`px-2 sm:px-2.5 py-3.5 sm:py-4 rounded-2xl border shadow-2xs text-center space-y-1.5 transition-all cursor-pointer group ${
                  selectedTech === 'B' 
                    ? 'bg-emerald-50 border-brand-green ring-2 ring-brand-green/20' 
                    : 'bg-white/95 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-brand-green text-white text-[10.5px] font-black flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                    B
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] font-bold text-slate-800 leading-tight whitespace-nowrap">100nm 나노화</p>
              </button>

              {/* C. Release Control */}
              <button 
                type="button"
                onClick={() => setSelectedTech('C')}
                className={`px-2 sm:px-2.5 py-3.5 sm:py-4 rounded-2xl border shadow-2xs text-center space-y-1.5 transition-all cursor-pointer group ${
                  selectedTech === 'C' 
                    ? 'bg-emerald-50 border-brand-green ring-2 ring-brand-green/20' 
                    : 'bg-white/95 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-brand-green text-white text-[10.5px] font-black flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                    C
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] font-bold text-slate-800 leading-tight whitespace-nowrap">방출 정밀제어</p>
              </button>

              {/* D. Multilayer Tablet */}
              <button 
                type="button"
                onClick={() => setSelectedTech('D')}
                className={`px-2 sm:px-2.5 py-3.5 sm:py-4 rounded-2xl border shadow-2xs text-center space-y-1.5 transition-all cursor-pointer group ${
                  selectedTech === 'D' 
                    ? 'bg-emerald-50 border-brand-green ring-2 ring-brand-green/20' 
                    : 'bg-white/95 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-brand-green text-white text-[10.5px] font-black flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                    D
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] font-bold text-slate-800 leading-tight whitespace-nowrap">다층 복합정제</p>
              </button>

              {/* E. Solid Dispersion */}
              <button 
                type="button"
                onClick={() => setSelectedTech('E')}
                className={`px-2 sm:px-2.5 py-3.5 sm:py-4 rounded-2xl border shadow-2xs text-center space-y-1.5 transition-all cursor-pointer group ${
                  selectedTech === 'E' 
                    ? 'bg-emerald-50 border-brand-green ring-2 ring-brand-green/20' 
                    : 'bg-white/95 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-brand-green text-white text-[10.5px] font-black flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                    E
                  </span>
                </div>
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] font-bold text-slate-800 leading-tight whitespace-nowrap">약물 고체분산체</p>
              </button>
            </div>
          </div>
        </div>

        {/* Technology Cards Grid / Stack with AnimatePresence */}
        <div className="space-y-6 pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTech}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {displayedTechList.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredId === item.id;
                const isEven = index % 2 === 1;

                return (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`group relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] border transition-all duration-500 bg-white ${
                      isHovered 
                        ? 'border-emerald-300 shadow-xl -translate-y-1' 
                        : 'border-slate-200/80 shadow-sm hover:border-slate-300'
                    }`}
                  >
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                      
                      {/* Photo Column (5 cols) */}
                      <div className={`lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-100 border border-gray-100 shadow-sm ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <img 
                          src={item.image} 
                          alt={item.imageAlt} 
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Text Description Column (7 cols) */}
                      <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        
                        {/* Header with Alphabet Badge */}
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-2xl ${item.badgeColor} font-black text-lg flex items-center justify-center shadow-md shrink-0`}>
                            {item.id}
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="text-lg sm:text-xl md:text-[22px] font-extrabold text-slate-900 tracking-tight leading-snug">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Original Detailed Description (100% Preserved) */}
                        <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed font-normal break-keep">
                          {item.desc}
                        </p>

                        {/* Key Technology Tags */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                          {item.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/80 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-brand-green transition-colors"
                            >
                              <CheckCircle2 size={13} className="text-brand-green" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}

