'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Users, 
  Globe2, 
  CheckCircle2, 
  Dna,
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollVideo from '@/components/ScrollVideo';

interface ApiRawContentProps {
  dbContent?: string | null;
}

export default function ApiRawContent({ dbContent }: ApiRawContentProps) {
  const [hoveredNum, setHoveredNum] = useState<string | null>(null);

  const sections = [
    {
      num: '01',
      title: 'Innovative API Development',
      subTitle: '혁신적인 원료의약품 개발',
      shortName: '혁신 원료 개발',
      icon: Sparkles,
      badgeColor: 'bg-emerald-600 text-white',
      intro: '차별화된 원료가 의약품의 새로운 가치를 만듭니다.',
      body: 'Prodrug 및 고부가가치 원료의약품을 비롯하여 최신 제약 기술을 적용한 차별화된 API 개발을 추진합니다.\n다산제약이 보유한 제제·연구개발 역량과 원료 개발 경험을 연결하여 고객의 제품 경쟁력을 높이고 글로벌 시장 진출을 지원합니다.',
    },
    {
      num: '02',
      title: 'Quality First',
      subTitle: '품질을 최우선으로',
      shortName: '품질 최우선',
      icon: ShieldCheck,
      badgeColor: 'bg-teal-700 text-white',
      intro: '품질은 선택이 아니라 신뢰의 기준입니다.',
      body: '의약품의 출발점인 원료부터 엄격한 품질 기준을 적용합니다.\n원료 선정, 제조, 시험 및 공급 단계에 이르기까지 체계적인 품질관리 시스템을 기반으로 안전성과 일관성을 확보하고, 고객이 신뢰할 수 있는 원료 파트너가 되겠습니다.',
    },
    {
      num: '03',
      title: 'Sustainable API',
      subTitle: '지속가능한 미래를 위한 원료',
      shortName: '지속가능 원료',
      icon: Leaf,
      badgeColor: 'bg-emerald-700 text-white',
      intro: '환경을 고려한 의약품 개발은 미래 경쟁력의 시작입니다.',
      body: '효율적인 제조공정과 친환경적인 원료 및 생산기술을 지속적으로 검토하고 도입하여 환경 부담을 줄이는 원료의약품 사업을 추구합니다.\n품질과 생산성뿐만 아니라 지속가능성까지 고려한 API 개발을 통해 더 나은 제약 산업의 미래를 만들어갑니다.',
    },
    {
      num: '04',
      title: 'Partnership for Success',
      subTitle: '고객과 함께 성장하는 파트너',
      shortName: '성장 파트너십',
      icon: Users,
      badgeColor: 'bg-teal-800 text-white',
      intro: 'Supplier가 아닌, 성공을 함께 설계하는 Partner.',
      body: '다산제약 원료사업부는 단순한 원료 공급을 넘어 고객의 개발 단계와 사업 전략을 이해하는 장기적인 파트너십을 추구합니다.\n개발 초기의 원료 검토부터 상업화 이후의 안정적인 공급까지 고객의 프로젝트에 필요한 최적의 솔루션을 함께 만들어갑니다.',
    },
    {
      num: '05',
      title: 'Global Supply Network',
      subTitle: '안정적인 글로벌 공급 네트워크',
      shortName: '글로벌 공급망',
      icon: Globe2,
      badgeColor: 'bg-emerald-800 text-white',
      intro: 'Global Network. Reliable Supply.',
      body: '중국사업본부를 기반으로 중국을 비롯하여 일본, 인도 등 주요 제약 시장의 다양한 제조사 및 파트너와 장기간 구축해온 글로벌 네트워크를 보유하고 있습니다.\n검증된 해외 파트너와의 협력과 공급망 다변화를 통해 원료의 안정적인 조달과 지속적인 공급을 지원하며, 국내외 시장 환경 변화에 유연하게 대응할 수 있는 글로벌 API 공급 체계를 구축하고 있습니다.',
    }
  ];

  return (
    <div className="w-full space-y-16 md:space-y-24 text-slate-800 font-pretendard">
      
      {/* ========================================================================= */}
      {/* 1. Header & Vision Section */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col items-start space-y-4">


          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
              원료를 넘어, 의약품의 새로운 가능성을 만듭니다.
            </h1>
          </div>

          <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-1 font-normal w-full">
            <p className="break-keep lg:whitespace-nowrap">
              다산제약은 축적된 의약품 개발 경험과 차별화된 기술력을 기반으로 고품질 원료의약품(API)을 개발하고 공급합니다.
            </p>
            <p className="break-keep lg:whitespace-nowrap">
              Prodrug를 비롯한 고부가가치 원료 개발부터 안정적인 글로벌 소싱, 품질관리 및 공급망 구축까지 고객의 의약품 개발과 사업화를 위한 통합적인 API 솔루션을 제공합니다.
            </p>
          </div>
        </div>

        {/* Video Banner (API.mp4) with Scroll-Expansion Effect */}
        <div className="w-full pt-2">
          <ScrollVideo src="/API.mp4?v=2" poster="/poster_api.jpg" />
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
            원료의약품 핵심 경쟁력
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            원료의약품 개발부터 글로벌 공급망까지, 다산제약이 약속하는 5가지 핵심 가치입니다.
          </p>
        </div>

        {/* 5 Core Feature Cards Grid */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isHovered = hoveredNum === sec.num;
              const isCard05 = sec.num === '05';

              if (isCard05) {
                return (
                  <motion.div
                    key={sec.num}
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
                  key={sec.num}
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
