'use client';

import React, { useState } from 'react';
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

  const techList = [
    {
      id: 'A',
      title: '경피 약물 전달 시스템 플랫폼 기술',
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
      subTitle: 'Drug Release Control Technology',
      icon: Sliders,
      image: '/rd_tech_release_control.jpg',
      imageAlt: '방출제어 서방형 펠렛 코팅 및 자동 용출 시험 시스템',
      desc: 'API를 Shell내에 포획하고, 일정 조건하에서 용해시켜 목적하는 위장관 내에서 활성성분이 방출되도록 설계하는 기술로서 약물의 체내 안정성을 향상하고 용해 및 방출 속도를 미세하게 조절해야 하는 방출제어(DR, SR, ER, CR, TR…) 특수 제품의 개발',
      tags: ['API Shell 포획 기술', '체내 안정성 향상', 'DR · SR · ER · CR · TR 맞춤 방출제어'],
      badgeColor: 'bg-emerald-700 text-white'
    },
    {
      id: 'D',
      title: '다중 약물 다층 정제 기술',
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
      subTitle: 'Polymer-Based Drug Solid Dispersion Technology',
      icon: Sparkles,
      image: '/rd_talent_global.jpg',
      imageAlt: '비정질 고체분산체 고분자 매질 및 초포화 흡수율 정밀 분석',
      desc: '본 기술은 API를 Polymer 매질 내에 분자 수준으로 분산시켜 고체분산체를 제조하는 제형 기술로서 목적하는 원료를 비정질(Amorphous) 상태를 안정화하며 약물 분자의 격자 에너지 제거를 통해 활성화 에너지를 낮추어 용해도를 개선한다. 또한 위장관 통과 내에서 초포화 상태를 유지하여 약물흡수를 증가시킴으로서 난용성 약물의 경구제 생체이용률 개선 제품 개발',
      tags: ['비정질(Amorphous) 분자 분산', '초포화 상태 흡수 증가', '난용성 약물 생체이용률 개선'],
      badgeColor: 'bg-teal-700 text-white'
    }
  ];

  return (
    <div className="w-full space-y-16 md:space-y-24 text-slate-800 font-pretendard">
      
      {/* ========================================================================= */}
      {/* 1. Hero & Vision Section & 와이드 시네마틱 비주얼 배너 */}
      {/* ========================================================================= */}
      <section className="space-y-8 pt-2">
        
        {/* Title Block */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-green text-xs md:text-sm font-bold tracking-wide">
            <Zap size={15} className="text-brand-green" />
            <span>CORE DDS PLATFORM TECHNOLOGY</span>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed w-full break-keep pt-1">
            다산제약은 차별화된 <strong className="font-bold text-slate-900 bg-emerald-50 px-1.5 py-0.5 rounded text-brand-green">DDS(약물전달시스템) 설계</strong>를 통해 <strong className="font-bold text-brand-green">Multi-Stra™</strong> 라는 특화된 핵심보유기술을 완성해 나가고 있습니다.
          </p>
        </div>

        {/* Cinematic Wide Visual Banner (rounded-[32px]) */}
        <div className="w-full aspect-[21/9] sm:aspect-[21/9] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-2xl bg-slate-900 border border-gray-100/90 relative group">
          <img 
            src="/rd_activities_hero.jpg" 
            alt="다산제약 첨단 DDS 제제 연구소" 
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
          
          {/* Floating Frosted Pill Info on Banner */}
          <div className="absolute inset-x-4 sm:inset-x-8 bottom-4 sm:bottom-6 flex flex-wrap items-center justify-between gap-3 text-white">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-300 uppercase tracking-widest block">
                Proprietary Drug Delivery System
              </span>
              <h3 className="text-sm sm:text-lg md:text-xl font-black text-white drop-shadow-sm">
                차별화된 제형 설계와 방출제어 기술의 집약체
              </h3>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <Sparkles size={14} className="text-brand-green" />
              <span>5대 핵심 플랫폼 기술 융합</span>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100/90 shadow-sm flex items-start space-x-3.5 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-brand-green flex items-center justify-center shrink-0 font-bold">
              <Zap size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">생체 이용률 향상</h4>
              <p className="text-xs text-slate-500 font-normal leading-normal">난용성 약물의 용해도 개선 및 흡수율 극대화</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100/90 shadow-sm flex items-start space-x-3.5 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0 font-bold">
              <Sliders size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">정밀 방출제어</h4>
              <p className="text-xs text-slate-500 font-normal leading-normal">DR, SR, ER, CR 등 목적 부위별 맞춤 방출</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100/90 shadow-sm flex items-start space-x-3.5 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-700 flex items-center justify-center shrink-0 font-bold">
              <Layers size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">복합제 상호작용 격리</h4>
              <p className="text-xs text-slate-500 font-normal leading-normal">다층정 설계를 통한 약물간 비호환성 억제</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 5대 핵심 플랫폼 기술 (A ~ E) [전용 사진 + 텍스트] 쇼케이스 */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="space-y-1">
            <div className="inline-flex flex-col items-start">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Multi-Stra™ 핵심 보유 기술
              </h2>
              <div className="w-full h-1.5 bg-brand-green mt-2 rounded-full" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal pt-1">
              독자적인 5대 플랫폼 기술 융합을 통해 개량신약 및 고부가가치 의약품 개발을 선도합니다.
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold text-brand-green bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full">
            TOTAL 5 TECHNOLOGIES
          </span>
        </div>

        <div className="space-y-8">
          {techList.map((item, index) => {
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
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Multi-Stra™ R&D Synergy Banner (Dark Deep Science Style) */}
      {/* ========================================================================= */}
      <section className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#091b30] via-[#0b2440] to-[#040e1a] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10">
        
        {/* Subtle Decorative Molecular Wave */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="100" stroke="rgba(0,180,120,0.4)" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="150" cy="150" r="60" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <circle cx="210" cy="150" r="8" fill="rgba(0,180,120,0.8)" />
            <circle cx="90" cy="150" r="8" fill="rgba(0,180,120,0.8)" />
            <circle cx="150" cy="90" r="8" fill="rgba(255,255,255,0.8)" />
            <circle cx="150" cy="210" r="8" fill="rgba(255,255,255,0.8)" />
          </svg>
        </div>

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
            <Dna size={14} className="text-emerald-300" />
            <span>Integrated Formulation Power</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
            혁신 제제 플랫폼 Multi-Stra™ 기반의 의약품 개발
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed break-keep">
            다산제약은 5대 핵심 플랫폼 기술을 유기적으로 융합하여 원료의약품의 한계를 극복하고, 환자의 복약 순응도와 치료 효과를 극대화하는 고부가가치 개량신약 개발을 지속하고 있습니다.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 text-center space-y-0.5">
              <span className="text-[11px] text-emerald-300 font-bold block">TDDS Platform</span>
              <p className="text-xs font-semibold text-white">경피 약물 전달</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 text-center space-y-0.5">
              <span className="text-[11px] text-emerald-300 font-bold block">Nanonization</span>
              <p className="text-xs font-semibold text-white">100nm 나노화</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 text-center space-y-0.5">
              <span className="text-[11px] text-emerald-300 font-bold block">Release Control</span>
              <p className="text-xs font-semibold text-white">방출 정밀제어</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 text-center space-y-0.5">
              <span className="text-[11px] text-emerald-300 font-bold block">Multilayer Tablet</span>
              <p className="text-xs font-semibold text-white">다층 복합정제</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

