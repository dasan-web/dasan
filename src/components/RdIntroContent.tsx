'use client';

import React, { useState } from 'react';
import { 
  FlaskConical, 
  Layers, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  Atom, 
  Dna,
  Pill
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useMemo } from 'react';
import { parseRdIntroData } from '@/lib/rdIntro';

interface RdIntroContentProps {
  dbContent?: string | null;
}

export default function RdIntroContent({ dbContent }: RdIntroContentProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);

  const data = useMemo(() => parseRdIntroData(dbContent), [dbContent]);

  const divisionList = useMemo(() => {
    return (data.divisions || []).map((div) => {
      const isDivA = div.id === 'A';
      return {
        ...div,
        icon: isDivA ? Pill : FlaskConical,
        image: isDivA ? '/core_business_api.jpg' : '/rd_synthesis_lab.jpg',
        imageAlt: isDivA 
          ? '다산제약 제제연구 약물전달시스템 및 제형 설계' 
          : '다산제약 합성연구 유기합성 및 고순도 API 공정 개발',
        badgeColor: isDivA ? 'bg-emerald-600 text-white' : 'bg-teal-700 text-white',
      };
    });
  }, [data.divisions]);

  const displayedDivisions = selectedDivision === 'all'
    ? divisionList
    : divisionList.filter(item => item.id === selectedDivision);

  return (
    <div className="w-full space-y-20 md:space-y-28 text-slate-800 font-pretendard">
      
      {/* ========================================================================= */}
      {/* 1. 그림 1 형식: Hero Vision & Video Banner & 중앙연구소 소개 */}
      {/* ========================================================================= */}
      <section className="space-y-10 md:space-y-12">
        {/* Top Left-aligned Main Headline */}
        <div className="text-left space-y-4 pt-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-tight whitespace-pre-line">
            {data.heroTitle}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-normal leading-relaxed w-full whitespace-pre-line">
            {data.heroSubtitle}
          </p>
        </div>

        {/* Central Rounded Cinematic Banner */}
        <div className="w-full aspect-[21/9] sm:aspect-[21/9] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-2xl bg-black border border-gray-100/90 relative group">
          <img 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            src="/poster_rd.jpg"
            alt="DASAN Pharmaceutical R&D CENTER"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 2-Column Central Research Institute Overview */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pt-4 items-start w-full">
          {/* Left Title Column */}
          <div className="w-auto lg:w-[170px] xl:w-[190px] shrink-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
              {data.centerTitle}
            </h2>
          </div>

          {/* Right Description Column (Original Texts 100% Preserved, expanded width) */}
          <div className="flex-1 w-full space-y-5 text-sm sm:text-base md:text-[16.5px] text-slate-600 leading-relaxed font-normal break-keep">
            <p className="whitespace-pre-line">
              {data.centerDesc1}
            </p>
            {data.centerDesc2 && (
              <p className="whitespace-pre-line">
                {data.centerDesc2}
              </p>
            )}

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              {data.features.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green block">{feat.category}</span>
                  <p className="font-bold text-slate-900 text-[11px] sm:text-[13px] leading-tight break-keep">{feat.title}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug break-keep whitespace-pre-line">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. 그림 2 형식: 첨단 과학의 선도 (3-Card Grid with Glass Frosted Overlays) */}
      {/* ========================================================================= */}
      <section className="space-y-7">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.scienceSectionTitle}
          </h2>
          <p className="text-sm text-slate-500 font-normal whitespace-pre-line">
            {data.scienceSectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.scienceCards.map((card, cIdx) => {
            const fallbackImgs = ['/core_business_api.jpg', '/core_business_cmo.jpg', '/core_business_finished.png'];
            const cardImg = card.image || fallbackImgs[cIdx % fallbackImgs.length];
            return (
              <div key={cIdx} className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
                <img 
                  src={cardImg} 
                  alt={card.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[1.12] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                
                {/* Frosted Glass Floating Caption Overlay */}
                <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
                  <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. 그림 3 형식: 인재 육성 및 연구 인프라 (3-Card Grid with Glass Frosted Overlays) */}
      {/* ========================================================================= */}
      <section className="space-y-7">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.infraSectionTitle}
          </h2>
          <p className="text-sm text-slate-500 font-normal whitespace-pre-line">
            {data.infraSectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.infraCards.map((card, idx) => {
            const fallbackImgs = ['/rd_talent_seminar.jpg', '/rd_talent_global.jpg', '/rd_infra_pilot.jpg'];
            const cardImg = card.image || fallbackImgs[idx % fallbackImgs.length];
            return (
              <div key={idx} className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
                <img 
                  src={cardImg} 
                  alt={card.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Frosted Glass Floating Caption Overlay */}
                <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
                  <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 함께 만드는 혁신 (R&D Synergy) */}
      {/* ========================================================================= */}
      <section id="rd-synergy" className="space-y-6">
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
              {data.synergySectionTitle}
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed break-keep max-w-4xl whitespace-pre-line">
              {data.synergySectionDesc}
            </p>
          </div>
        </div>

        {/* Division Cards Stack with AnimatePresence */}
        <div className="space-y-6 pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDivision}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {displayedDivisions.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredDivision === item.id;
                const isEven = index % 2 === 1;

                return (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setHoveredDivision(item.id)}
                    onMouseLeave={() => setHoveredDivision(null)}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Text Description Column (7 cols) */}
                      <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        
                        {/* Header with Division Icon */}
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${item.id === 'A' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' : 'bg-teal-50 text-teal-700 border border-teal-200/80'} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                            <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                              {item.name}
                            </h3>
                          </div>
                        </div>

                        {/* Description Paragraphs */}
                        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal space-y-2 break-keep">
                          <p>{item.leadDesc}</p>
                          <p>{item.detailDesc}</p>
                        </div>

                        {/* 4 Detailed Sub-Fields */}
                        <div className="pt-3 border-t border-slate-100">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                            {item.subFields.map((field, fIdx) => (
                              <div key={fIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                                <span className="font-bold text-brand-green block">{field.title}</span>
                                <p className="text-[11.5px] text-slate-600 leading-relaxed">{field.desc}</p>
                              </div>
                            ))}
                          </div>
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
