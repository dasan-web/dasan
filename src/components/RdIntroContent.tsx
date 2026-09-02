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
  Dna
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RdIntroContentProps {
  dbContent?: string | null;
}

export default function RdIntroContent({ dbContent }: RdIntroContentProps) {
  const [expandedSynthesis, setExpandedSynthesis] = useState(false);
  const [expandedFormulation, setExpandedFormulation] = useState(false);

  return (
    <div className="w-full space-y-20 md:space-y-28 text-slate-800 font-pretendard">
      
      {/* ========================================================================= */}
      {/* 1. 그림 1 형식: Hero Vision & Video Banner & 중앙연구소 소개 */}
      {/* ========================================================================= */}
      <section className="space-y-10 md:space-y-12">
        {/* Top Left-aligned Main Headline */}
        <div className="text-left space-y-4 pt-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-green text-xs md:text-sm font-bold tracking-wide">
            <Sparkles size={15} className="text-brand-green" />
            <span>CENTRAL RESEARCH INSTITUTE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-tight">
            다산제약은 글로벌 경쟁력을 갖춘 연구소로 거듭납니다.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-normal leading-relaxed w-full">
            연구개발(R&D)부터 판매까지의 전주기 인프라를 바탕으로 차별화된 제제 기술과 고부가가치 사업 성장성을 확보하고 있습니다.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-4 items-start">
          {/* Left Title Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="inline-flex flex-col items-start">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                중앙 연구소
              </h2>
              <div className="w-full h-1.5 bg-brand-green mt-2 rounded-full" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium pt-1">
              Central R&D Center — Mecca of Innovative New Drugs
            </p>
          </div>

          {/* Right Description Column (Original Texts 100% Preserved) */}
          <div className="lg:col-span-8 space-y-5 text-sm sm:text-base md:text-[16.5px] text-slate-600 leading-relaxed font-normal break-keep">
            <p>
              다산제약의 중앙연구소는 <strong className="font-bold text-slate-900 bg-emerald-50/80 text-brand-green px-1.5 py-0.5 rounded">50여명의 석·박사급 연구인력</strong>을 중심으로 합성연구소와 제제연구소의 유기적인 협력체계를 구축하고 있습니다. 유기합성 기술을 기반으로 한 원료의약품(API) 개발부터 자사의 <strong className="font-bold text-slate-900 bg-emerald-50/80 text-brand-green px-1.5 py-0.5 rounded">Multistra® 기술</strong>을 활용한 특화된 약물전달시스템(DDS) 적용 완제품 개발까지의 의약품 개발 전 과정을 아우르는 종합의약품 연구개발 역량을 확보하고 있습니다.
            </p>
            <p>
              또한 연구소 내에 30L 규모 Pilot-scale의 다목적 합성 반응 시스템과 유동층 과립제조 및 코팅이 가능한 Multilab® GPCG 시스템과 다층정 타정기 등의 제조설비와 LC-MS/MS, Differential Scanning Calorimetry, Laser Diffraction Particle Size Analyzer, Automated Flow-Through Cell Dissolution System 등의 첨단 분석 시스템을 활용하여 고도화된 의약품 연구를 수행하고 있습니다.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green block">Research Power</span>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">50여 명 석·박사진</p>
                <p className="text-[11px] text-slate-500">합성 & 제제 유기적 협력</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green block">DDS Platform</span>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">Multistra® 플랫폼</p>
                <p className="text-[11px] text-slate-500">원료부터 DDS 완제품</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green block">Pilot Facility</span>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">30L Pilot & GPCG</p>
                <p className="text-[11px] text-slate-500">다목적 합성 & 코팅설비</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green block">Analytics</span>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">LC-MS/MS & DSC</p>
                <p className="text-[11px] text-slate-500">정밀 용출·입도 분석</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. 그림 2 형식: 첨단 과학의 선도 (3-Card Grid with Glass Frosted Overlays) */}
      {/* ========================================================================= */}
      <section className="space-y-7">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Atom size={20} className="text-brand-green" />
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider">Advanced Science</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            첨단 과학의 선도
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            다산제약만의 독자적인 제제 기술과 첨단 장비를 통해 고부가가치 개량신약 및 원료의약품을 개발합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Drug Delivery System & Release Control */}
          <div className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
            <img 
              src="/core_business_api.jpg" 
              alt="약물의 용해도와 방출 속도를 조절하는 제제 기술 개발" 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Frosted Glass Floating Caption Overlay */}
            <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4 p-4 sm:p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/30 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/45 shadow-md">
              <h3 className="text-sm sm:text-base font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                약물의 용해도와 방출 속도를 조절하는 제제 기술 개발
              </h3>
              <p className="text-xs text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-relaxed">
                Multistra® 기반 서방형·복합제 제제 설계 및 방출제어 기술
              </p>
            </div>
          </div>

          {/* Card 2: High Purity API & Synthesis Route */}
          <div className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
            <img 
              src="/core_business_cmo.jpg" 
              alt="유기합성 기반 고순도 원료의약품 및 신규염 개발" 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Frosted Glass Floating Caption Overlay */}
            <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4 p-4 sm:p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/30 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/45 shadow-md">
              <h3 className="text-sm sm:text-base font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                유기합성 기반 고순도 원료의약품(API) 및 신규염 개발
              </h3>
              <p className="text-xs text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-relaxed">
                특허 회피 및 불순물 억제를 고려한 차별화된 합성공정 설계
              </p>
            </div>
          </div>

          {/* Card 3: Quality Analysis & Precision Science */}
          <div className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
            <img 
              src="/core_business_finished.png" 
              alt="첨단 분석 시스템을 통한 과학적 품질 검증 및 최적화" 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Frosted Glass Floating Caption Overlay */}
            <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4 p-4 sm:p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/30 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/45 shadow-md">
              <h3 className="text-sm sm:text-base font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                첨단 분석 시스템을 통한 과학적 품질 검증 및 최적화
              </h3>
              <p className="text-xs text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-relaxed">
                LC-MS/MS, DSC, 입도 및 자동 용출시험을 통한 엄격한 평가
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. 그림 3 형식: 인재 육성 및 연구 인프라 (3-Card Grid with Glass Frosted Overlays) */}
      {/* ========================================================================= */}
      <section className="space-y-7">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className="text-brand-green" />
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider">Talent & Infrastructure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            인재 육성 및 연구 인프라
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            석·박사급 전문 인재 육성과 첨단 파일럿 시설 투자를 통해 미래 바이오 제약 산업을 이끌어갈 역량을 강화합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Academic Seminar & Keynote */}
          <div className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
            <img 
              src="/rd_talent_seminar.jpg" 
              alt="국내외 석학 초빙 및 학술 연구를 통한 역량 강화" 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Frosted Glass Floating Caption Overlay */}
            <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4 p-4 sm:p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/30 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/45 shadow-md">
              <h3 className="text-sm sm:text-base font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                국내외 석학 초빙 및 학술 연구를 통한 역량 강화
              </h3>
              <p className="text-xs text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-relaxed">
                50여 명 연구진의 지속적인 전문 교육 및 세미나 역량 지원
              </p>
            </div>
          </div>

          {/* Card 2: Global Network & Partnership */}
          <div className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
            <img 
              src="/rd_talent_global.jpg" 
              alt="글로벌 연수 및 오픈 이노베이션을 통한 경쟁력 확보" 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Frosted Glass Floating Caption Overlay */}
            <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4 p-4 sm:p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/30 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/45 shadow-md">
              <h3 className="text-sm sm:text-base font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                글로벌 연수 및 오픈 이노베이션을 통한 경쟁력 확보
              </h3>
              <p className="text-xs text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-relaxed">
                글로벌 규격 R&D 및 국내외 제약 바이오 파트너십 구축
              </p>
            </div>
          </div>

          {/* Card 3: Pilot Facility & Research Infrastructure */}
          <div className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 border border-gray-100 cursor-pointer">
            <img 
              src="/rd_infra_pilot.jpg" 
              alt="첨단 파일럿 연구 시설 및 합성 생산 인프라" 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Frosted Glass Floating Caption Overlay */}
            <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-4 sm:bottom-4 p-4 sm:p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/30 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/45 shadow-md">
              <h3 className="text-sm sm:text-base font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                첨단 파일럿 연구 시설 및 합성 생산 인프라
              </h3>
              <p className="text-xs text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-relaxed">
                Pilot 다목적 반응기 및 첨단 제제 생산 설비 완비
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 그림 4 형식: 함께 만드는 혁신 (Clean Light Luxury Bio-Tech Layout) */}
      {/* ========================================================================= */}
      <section className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-emerald-50/40 via-slate-50 to-teal-50/30 text-slate-800 p-6 sm:p-10 lg:p-12 shadow-md border border-emerald-100/80">
        
        {/* Subtle Decorative Geometric / Molecular Wave */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-30 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50,0 Q 150,150 50,300 T 50,600" stroke="rgba(0,180,120,0.15)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
            <path d="M 120,0 Q 20,150 120,300 T 120,600" stroke="rgba(0,180,120,0.1)" strokeWidth="2" fill="none" />
            <circle cx="50" cy="150" r="12" fill="rgba(0,180,120,0.08)" />
            <circle cx="120" cy="300" r="16" fill="rgba(0,180,120,0.1)" />
            <circle cx="50" cy="450" r="12" fill="rgba(0,180,120,0.08)" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Division Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 border border-emerald-200 text-brand-green text-xs font-bold tracking-wider uppercase shadow-xs">
                <Dna size={14} className="text-brand-green" />
                <span>R&D Synergy</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 tracking-tight leading-snug">
                함께 만드는 혁신
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed break-keep">
                제제연구소와 합성연구소의 유기적인 협력을 바탕으로 후보물질 도출부터 고부가가치 의약품 상용화까지 독보적인 연구 시너지를 창출합니다.
              </p>
            </div>

            {/* Synergy Highlights */}
            <div className="space-y-3 pt-4 border-t border-emerald-100">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green border border-emerald-100 flex items-center justify-center font-bold">
                  <Layers size={17} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">제제연구팀</h4>
                  <p className="text-[11px] text-slate-500">Multistra® DDS & 복합제 개발</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center font-bold">
                  <FlaskConical size={17} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">합성연구팀</h4>
                  <p className="text-[11px] text-slate-500">고순도 API & 신규염 공정 설계</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Stacked Clean Luxury Cards */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. 제제연구팀 Card (Original Text Preserved) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-200 transition-all duration-300 shadow-sm hover:shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-brand-green flex items-center justify-center shadow-xs">
                    <Layers size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-brand-green uppercase tracking-widest block">Formulation Division</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">제제연구팀</h3>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedFormulation(!expandedFormulation)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-brand-green border border-slate-200/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{expandedFormulation ? '상세 접기' : '세부 연구분야'}</span>
                  {expandedFormulation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Main Description */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal space-y-2.5 break-keep">
                <p>
                  제제연구소는 의약품의 물리·화학적 특성과 약물의 방출 및 흡수 특성을 기반으로 다산제약만의 차별화된 제형 설계와 여러가지 방식의 약물전달시스템(DDS) 개발을 수행하고 있습니다.
                </p>
                <p>
                  당사의 보유 기술을 융합한 <strong className="font-bold text-brand-green bg-emerald-50 px-1 py-0.5 rounded">Multistra®</strong>는 다양한 약물의 특성과 목표하는 약효 및 방출조절 특성에 적합한 제제기술의 집약체로서 새로운 제형의 제품이나 신규 복합제, 용량 개선 개량신약, 특수 방출제어 제제 등의 다양한 고부가가치 의약품 개발에 활용되고 있으며 이를 통해 다산제약만의 제품 차별화와 경쟁력 향상에 기여하고 있습니다.
                </p>
              </div>

              {/* Collapsible 4 Detailed Sub-Sections */}
              <AnimatePresence>
                {expandedFormulation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 border-t border-slate-100 space-y-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-brand-green block">01. Multistra® 기반 DDS 기술</span>
                        <p className="text-slate-600 leading-relaxed">
                          약물의 물리·화학적 특성에 맞춰 방출속도를 정밀 제어하고 최적의 제형을 설계하여 차별화된 개량신약을 개발합니다.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-brand-green block">02. 다양한 제형 및 복합제 개발</span>
                        <p className="text-slate-600 leading-relaxed">
                          서로 다른 유효성분을 하나의 제형으로 구현하는 다층정 설계 및 서방화 기술로 복용 편의성을 획기적으로 개선합니다.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-brand-green block">03. 제제설계에서 상업생산까지</span>
                        <p className="text-slate-600 leading-relaxed">
                          Glatt사 Multilab® GPCG 유동층 코팅 및 HATA 다층정 타정기를 활용하여 Lab Scale부터 상업생산까지 재현성을 확보합니다.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-brand-green block">04. 과학적 분석을 통한 최적화</span>
                        <p className="text-slate-600 leading-relaxed">
                          HPLC, GC, DSC 열분석, 입도분석 및 Automated Dissolution 시스템을 통해 고도화된 품질특성을 검증합니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. 합성연구팀 Card (Original Text Preserved) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-200 transition-all duration-300 shadow-sm hover:shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center shadow-xs">
                    <FlaskConical size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest block">Synthesis Division</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">합성연구팀</h3>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedSynthesis(!expandedSynthesis)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{expandedSynthesis ? '상세 접기' : '세부 연구분야'}</span>
                  {expandedSynthesis ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Main Description */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal space-y-2.5 break-keep">
                <p>
                  합성연구소는 유기합성 기술을 기반으로 원료의약품 및 의약품 개발에 필요한 핵심 합성기술과 공정기술을 연구합니다.
                </p>
                <p>
                  신약의 후보물질, 지식재산권 확보와 특허 전략을 고려한 차별화된 원료의약품(염변경, 결정형변경, Pro-drug…)을 설계하고 고도화된 공정기술을 적용한 불순물 발생 억제 제품 등을 개발하고 상용화하는 최적의 합성공정 개발 체계를 구축하고 있습니다.
                </p>
              </div>

              {/* Collapsible 4 Detailed Sub-Sections */}
              <AnimatePresence>
                {expandedSynthesis && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 border-t border-slate-100 space-y-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-teal-700 block">01. 프로세스 디자인 (Process Design)</span>
                        <p className="text-slate-600 leading-relaxed">
                          신규 후보물질의 합성경로 설계부터 공정 최적화, Scale-up 및 기술이전에 이르기까지 재현성 높은 공정을 확립합니다.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-teal-700 block">02. 차별화된 원료의약품 개발</span>
                        <p className="text-slate-600 leading-relaxed">
                          신규염(Salt), 결정형(Polymorph) 변경 및 Pro-drug 설계를 통해 유해 불순물을 억제하고 특허 전략을 확보합니다.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-teal-700 block">03. Lab에서 Commercial Scale까지</span>
                        <p className="text-slate-600 leading-relaxed">
                          30L~50L Pilot-scale 다목적 반응 시스템을 활용하여 공정변수를 최적화하고 상업생산 안정성을 확보합니다.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="font-bold text-teal-700 block">04. 고순도 원료의약품 공정개발</span>
                        <p className="text-slate-600 leading-relaxed">
                          합성단계별 불순물 생성을 체계적으로 억제하여 최종 제품의 안전성과 유효성을 보장하는 고순도 API를 제조합니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
