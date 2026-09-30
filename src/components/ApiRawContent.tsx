'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Users, 
  Globe2, 
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollVideo from '@/components/ScrollVideo';
import { parseBusinessApiData } from '@/lib/businessApi';

interface ApiRawContentProps {
  dbContent?: string | null;
  isPreview?: boolean;
}

const cardMeta = [
  { icon: Sparkles, badgeColor: 'bg-emerald-600 text-white' },
  { icon: ShieldCheck, badgeColor: 'bg-teal-700 text-white' },
  { icon: Leaf, badgeColor: 'bg-emerald-700 text-white' },
  { icon: Users, badgeColor: 'bg-teal-800 text-white' },
  { icon: Globe2, badgeColor: 'bg-emerald-800 text-white' }
];

export default function ApiRawContent({ dbContent, isPreview = false }: ApiRawContentProps) {
  const [hoveredNum, setHoveredNum] = useState<string | null>(null);
  const data = parseBusinessApiData(dbContent);

  const sections = data.cards.map((card, idx) => ({
    ...card,
    icon: cardMeta[idx]?.icon || Sparkles,
    badgeColor: cardMeta[idx]?.badgeColor || 'bg-emerald-600 text-white'
  }));

  return (
    <div className="w-full space-y-16 md:space-y-24 text-slate-800 font-pretendard">
      
      {/* ========================================================================= */}
      {/* 1. Header & Vision Section */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col items-start space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
              {data.title}
            </h1>
          </div>

          <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-1 font-normal w-full">
            <p className="break-keep whitespace-pre-line">
              {data.desc1}
            </p>
            <p className="break-keep whitespace-pre-line">
              {data.desc2}
            </p>
          </div>
        </div>

        {/* Video Banner (API.mp4) with Scroll-Expansion Effect */}
        <div className="w-full pt-2">
          <ScrollVideo src="/API.mp4?v=2" poster="/poster_api.jpg" isPreview={isPreview} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 5대 핵심 가치 컨트롤러 버튼 & 내비게이션 바 */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {data.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            {data.sectionDesc}
          </p>
        </div>

        {/* 5 Core Feature Cards Grid */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sections.map((sec, idx) => {
              const isHovered = hoveredNum === sec.num;
              const isCard05 = idx === 4 || sec.num === '05';

              if (isCard05) {
                return (
                  <motion.div
                    key={sec.num || idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredNum(sec.num)}
                    onMouseLeave={() => setHoveredNum(null)}
                    className={`md:col-span-2 group relative p-7 sm:p-9 lg:p-10 rounded-[28px] border transition-all duration-300 bg-white ${
                      isHovered
                        ? 'border-emerald-400 shadow-xl -translate-y-1'
                        : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                      {/* 05 Left Column (5 cols) */}
                      <div className="md:col-span-5 space-y-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-green/30 group-hover:text-brand-green transition-colors font-mono tracking-tight shrink-0">
                            {sec.num}
                          </span>
                          <h3 className="text-xl sm:text-2xl md:text-[23px] font-black text-brand-green tracking-tight break-keep">
                            {sec.subTitle}
                          </h3>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100/90 text-slate-900 flex items-start gap-2.5 shadow-2xs">
                          <Quote size={16} className="text-brand-green shrink-0 mt-0.5" />
                          <p className="text-sm font-bold leading-snug">
                            {sec.intro}
                          </p>
                        </div>
                      </div>

                      {/* 05 Right Column (7 cols) */}
                      <div className="md:col-span-7 flex flex-col justify-center h-full">
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line break-keep font-normal">
                          {sec.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Standard Cards (01, 02, 03, 04)
              return (
                <motion.div
                  key={sec.num || idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredNum(sec.num)}
                  onMouseLeave={() => setHoveredNum(null)}
                  className={`group relative p-7 sm:p-8 rounded-[28px] border transition-all duration-300 bg-white flex flex-col justify-between ${
                    isHovered
                      ? 'border-emerald-400 shadow-xl -translate-y-1'
                      : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Header: Number & Subtitle */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-green/30 group-hover:text-brand-green transition-colors font-mono tracking-tight shrink-0">
                        {sec.num}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-[23px] font-black text-brand-green tracking-tight break-keep">
                        {sec.subTitle}
                      </h3>
                    </div>

                    {/* Highlight Quote Box */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100/90 text-slate-900 flex items-start gap-2.5 shadow-2xs">
                      <Quote size={16} className="text-brand-green shrink-0 mt-0.5" />
                      <p className="text-sm font-bold leading-snug">
                        {sec.intro}
                      </p>
                    </div>

                    {/* Body Description */}
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line break-keep font-normal">
                      {sec.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

    </div>
  );
}
