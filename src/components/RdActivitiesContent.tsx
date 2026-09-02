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

interface RdActivitiesContentProps {
  dbContent?: string | null;
}

export default function RdActivitiesContent({ dbContent }: RdActivitiesContentProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>('all');

  const techList = [
    {
      id: 'A',
      title: '경피 약물 전달 시스템 플랫폼 기술',
      shortTitle: '경피 약물 전달 (TDDS)',
      subTitle: 'Transdermal Drug Delivery System',
      icon: Activity,
      image: '/rd_tech_tdds.jpg',
      imageAlt: '마이크로니들 및 실리콘 중합체 경피 약물 전달 시스템',
      desc: '자체 특허를 보유한 실리콘 중합체로서 높은 생체 적합성 및 흡수율, 침투율을 확보한 기술로서 연고제 또는 마이크로니들과 융합하여 경피제로 개발',
      tags: ['자체 특허 실리콘 중합체', '높은 생체적합성 & 침투율', '마이크로니들 융합 경피제'],
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'B',
      title: '약물 나노화 기술',
      shortTitle: '약물 나노화 (Nanonization)',
      subTitle: 'Stabilized Drug Nanonization Technology',
      icon: Atom,
      image: '/rd_tech_nanonization.jpg',
      imageAlt: '100nm 균질 입자 나노 에멀전 및 레이저 산란 분석',
      desc: 'Polymer 및 Surfactant를 이용하여 약물간의 Aggergation을 차단하고 완벽하게 Despersion된 과립물을 제조하는 기술로서 100nm 수준의 균질한 입자도의 과립물을 통한 약물의 용해도와 생체 이용률을 향상시킨 제품 개발',
      tags: ['100nm 균질 입자도', '약물 응집(Aggregation) 차단', '용해도 및 생체이용률 극대화'],
      badgeColor: 'bg-teal-600 text-white'
    },
    {
      id: 'C',
      title: '약물 방출 조절 기술',
      shortTitle: '약물 방출 조절 (Release Control)',
      subTitle: 'Drug Release Control Technology',
      icon: Sliders,
      image: '/rd_tech_release_control.jpg?v=3',
      imageAlt: '방출제어 서방형 펠렛 코팅 및 자동 용출 시험 시스템',
      desc: 'API를 Shell내에 포획하고, 일정 조건하에서 용해시켜 목적하는 위장관 내에서 활성성분이 방출되도록 설계하는 기술로서 약물의 체내 안정성을 향상하고 용해 및 방출 속도를 미세하게 조절해야 하는 방출제어(DR, SR, ER, CR, TR…) 특수 제품의 개발',
      tags: ['API Shell 포획 기술', '체내 안정성 향상', 'DR · SR · ER · CR · TR 맞춤 방출제어'],
      badgeColor: 'bg-emerald-700 text-white'
    },
    {
      id: 'D',
      title: '다중 약물 다층 정제 기술',
      shortTitle: '다중 다층 정제 (Multilayer)',
      subTitle: 'Multiple-Drug Multilayer Tablet Technology',
      icon: Layers,
      image: '/rd_tech_multilayer.jpg',
      imageAlt: '물리적 층간 분리 다층정(이중정/삼중정) 타정 성형 기술',
      desc: '정제의 각 층에 서로 다른 약물을 물리적으로 분리하여 탑재하는 기술로서 약물간의 비호환성에 대한 상호작용을 격리를 통해 억제하고 서로 다른 약물 방출 조절 기술(IR+SR, IR+TR…)이 접목된 복합제형 개발',
      tags: ['물리적 층간 분리 탑재', '약물 비호환성 상호작용 억제', 'IR+SR / IR+TR 복합제형'],
      badgeColor: 'bg-cyan-700 text-white'
    },
    {
      id: 'E',
      title: '고분자 기반 약물 고체분산체 기술',
      shortTitle: '약물 고체분산체 (Solid Dispersion)',
      subTitle: 'Polymer-Based Drug Solid Dispersion Technology',
      icon: Sparkles,
      image: '/rd_talent_global.jpg',
      imageAlt: '비정질 고체분산체 고분자 매질 및 초포화 흡수율 정밀 분석',
      desc: '본 기술은 API를 Polymer 매질 내에 분자 수준으로 분산시켜 고체분산체를 제조하는 제형 기술로서 목적하는 원료를 비정질(Amorphous) 상태를 안정화하며 약물 분자의 격자 에너지 제거를 통해 활성화 에너지를 낮추어 용해도를 개선한다. 또한 위장관 통과 내에서 초포화 상태를 유지하여 약물흡수를 증가시킴으로서 난용성 약물의 경구제 생체이용률 개선 제품 개발',
      tags: ['비정질(Amorphous) 분자 분산', '초포화 상태 흡수 증가', '난용성 약물 생체이용률 개선'],
      badgeColor: 'bg-teal-700 text-white'
    }
  ];

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
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-green text-xs md:text-sm font-bold tracking-wide">
            <Zap size={15} className="text-brand-green" />
            <span>CORE DDS PLATFORM TECHNOLOGY</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-tight sm:leading-[1.3] w-full break-keep">
            다산제약은 차별화된 DDS(약물전달시스템) 설계를 통해 <br className="hidden sm:block" />
            Multi-Stra™ 라는 특화된 핵심보유기술을 완성해 나가고 있습니다.
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
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-brand-green text-xs font-bold tracking-wider uppercase shadow-2xs">
              <Dna size={14} className="text-brand-green" />
              <span>Integrated Formulation Power</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              혁신 제제 플랫폼 Multi-Stra™ 기반의 의약품 개발
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed break-keep max-w-4xl">
              다산제약은 5대 핵심 플랫폼 기술을 유기적으로 융합하여 원료의약품의 한계를 극복하고, 환자의 복약 순응도와 치료 효과를 극대화하는 고부가가치 개량신약 개발을 지속하고 있습니다.
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
                  <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] text-brand-green font-bold uppercase tracking-tight whitespace-nowrap">
                    TDDS Platform
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
                  <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] text-brand-green font-bold uppercase tracking-tight whitespace-nowrap">
                    Nanonization
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
                  <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] text-brand-green font-bold uppercase tracking-tight whitespace-nowrap">
                    Release Control
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
                  <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] text-brand-green font-bold uppercase tracking-tight whitespace-nowrap">
                    Multilayer Tablet
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
                  <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] text-brand-green font-bold uppercase tracking-tight whitespace-nowrap">
                    Solid Dispersion
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Corner Tag */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
                          TECH {item.id}
                        </div>
                      </div>

                      {/* Text Description Column (7 cols) */}
                      <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        
                        {/* Header with Alphabet Badge */}
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-2xl ${item.badgeColor} font-black text-lg flex items-center justify-center shadow-md shrink-0`}>
                            {item.id}
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green block">
                              {item.subTitle}
                            </span>
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

