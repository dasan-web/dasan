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

interface RdIntroContentProps {
  dbContent?: string | null;
}

export default function RdIntroContent({ dbContent }: RdIntroContentProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);

  const divisionList = [
    {
      id: 'A',
      name: '제제연구',
      subTitle: 'FORMULATION DIVISION',
      icon: Pill,
      image: '/core_business_api.jpg',
      imageAlt: '다산제약 제제연구 약물전달시스템 및 제형 설계',
      badgeColor: 'bg-emerald-600 text-white',
      leadDesc: '제제연구소는 의약품의 물리·화학적 특성과 약물의 방출 및 흡수 특성을 기반으로 다산제약만의 차별화된 제형 설계와 여러가지 방식의 약물전달시스템(DDS) 개발을 수행하고 있습니다.',
      detailDesc: '당사의 보유 기술을 융합한 Multistra®는 다양한 약물의 특성과 목표하는 약효 및 방출조절 특성에 적합한 제제기술의 집약체로서 새로운 제형의 제품이나 신규 복합제, 용량 개선 개량신약, 특수 방출제어 제제 등의 다양한 고부가가치 의약품 개발에 활용되고 있으며 이를 통해 다산제약만의 제품 차별화와 경쟁력 향상에 기여하고 있습니다.',
      subFields: [
        { title: '01. Multistra® 기반 DDS 기술', desc: '약물의 물리·화학적 특성에 맞춰 방출속도를 정밀 제어하고 최적의 제형을 설계하여 차별화된 개량신약을 개발합니다.' },
        { title: '02. 다양한 제형 및 복합제 개발', desc: '서로 다른 유효성분을 하나의 제형으로 구현하는 다층정 설계 및 서방화 기술로 복용 편의성을 획기적으로 개선합니다.' },
        { title: '03. 제제설계에서 상업생산까지', desc: 'Glatt사 Multilab® GPCG 유동층 코팅 및 HATA 다층정 타정기를 활용하여 Lab Scale부터 상업생산까지 재현성을 확보합니다.' },
        { title: '04. 과학적 분석을 통한 최적화', desc: 'HPLC, GC, DSC 열분석, 입도분석 및 Automated Dissolution 시스템을 통해 고도화된 품질특성을 검증합니다.' },
      ]
    },
    {
      id: 'B',
      name: '합성연구',
      subTitle: 'SYNTHESIS DIVISION',
      icon: FlaskConical,
      image: '/rd_synthesis_lab.jpg',
      imageAlt: '다산제약 합성연구 유기합성 및 고순도 API 공정 개발',
      badgeColor: 'bg-teal-700 text-white',
      leadDesc: '합성연구소는 유기합성 기술을 기반으로 원료의약품 및 의약품 개발에 필요한 핵심 합성기술과 공정기술을 연구합니다.',
      detailDesc: '신약의 후보물질, 지식재산권 확보와 특허 전략을 고려한 차별화된 원료의약품(염변경, 결정형변경, Pro-drug)을 설계하고 고도화된 공정기술을 적용한 불순물 발생 억제 제품 등을 개발하고 상용화하는 최적의 합성공정 개발 체계를 구축하고 있습니다.',
      subFields: [
        { title: '01. 프로세스 디자인 (Process Design)', desc: '신규 후보물질의 합성경로 설계부터 공정 최적화, Scale-up 및 기술이전에 이르기까지 재현성 높은 공정을 확립합니다.' },
        { title: '02. 차별화된 원료의약품 개발', desc: '신규염(Salt), 결정형(Polymorph) 변경 및 Pro-drug 설계를 통해 유해 불순물을 억제하고 특허 전략을 확보합니다.' },
        { title: '03. Lab에서 Commercial Scale까지', desc: '30L~50L Pilot-scale 다목적 반응 시스템을 활용하여 공정변수를 최적화하고 상업생산 안정성을 확보합니다.' },
        { title: '04. 고순도 원료의약품 공정개발', desc: '합성단계별 불순물 생성을 체계적으로 억제하여 최종 제품의 안전성과 유효성을 보장하는 고순도 API를 제조합니다.' },
      ]
    }
  ];

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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pt-4 items-start w-full">
          {/* Left Title Column */}
          <div className="w-auto lg:w-[170px] xl:w-[190px] shrink-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
              중앙 연구소
            </h2>
          </div>

          {/* Right Description Column (Original Texts 100% Preserved, expanded width) */}
          <div className="flex-1 w-full space-y-5 text-sm sm:text-base md:text-[16.5px] text-slate-600 leading-relaxed font-normal break-keep">
            <p>
              다산제약의 중앙연구소는 50여명의 석·박사급 연구인력을 중심으로 합성연구소와 제제연구소의 유기적인 협력체계를 구축하고 있습니다.
              <br />
              유기합성 기술을 기반으로 한 원료의약품(API) 개발부터 자사의 Multistra® 기술을 활용한 특화된 약물전달시스템(DDS) 적용 완제품 개발까지의 의약품 개발 전 과정을 아우르는 종합의약품 연구개발 역량을 확보하고 있습니다.
            </p>
            <p>
              또한 연구소 내에 30L 규모 Pilot-scale의 다목적 합성 반응 시스템과 유동층 과립제조 및 코팅이 가능한 Multilab® GPCG 시스템과 다층정 타정기 등의 제조설비와 LC-MS/MS, Differential Scanning Calorimetry, Laser Diffraction Particle Size Analyzer, Automated Flow-Through Cell Dissolution System 등의 첨단 분석 시스템을 활용하여 고도화된 의약품 연구를 수행하고 있습니다.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green block">Research Power</span>
                <p className="font-bold text-slate-900 text-[11px] sm:text-[13px] leading-tight break-keep">50여명 이상의 석·박사 연구진</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug break-keep">신약발굴부터 임상실험까지<br />의약품 전주기 개발</p>
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
            <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
              <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                약물의 용해도와 방출 속도를 조절하는 제제 기술 개발
              </h3>
              <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
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
            <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
              <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                유기합성 기반 고순도 원료의약품(API) 및 신규염 개발
              </h3>
              <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
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
            <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
              <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                첨단 분석 시스템을 통한 과학적 품질 검증 및 최적화
              </h3>
              <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
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
            <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
              <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                국내외 석학 초빙 및 학술 연구를 통한 역량 강화
              </h3>
              <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
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
            <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
              <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                글로벌 연수 및 오픈 이노베이션을 통한 경쟁력 확보
              </h3>
              <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
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
            <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/25 text-white transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-black/55 shadow-md">
              <h3 className="text-[13px] sm:text-[14px] lg:text-[14.5px] xl:text-[15px] font-bold leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap">
                첨단 파일럿 연구 시설 및 합성 생산 인프라
              </h3>
              <p className="text-xs sm:text-[12.5px] text-white/90 font-normal drop-shadow-xs max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-500 ease-out overflow-hidden leading-tight whitespace-nowrap">
                Pilot 다목적 반응기 및 첨단 제제 생산 설비 완비
              </p>
            </div>
          </div>
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
              함께 만드는 혁신
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed break-keep max-w-4xl">
              제제연구소와 합성연구소의 유기적인 협력을 바탕으로 후보물질 도출부터 고부가가치 의약품 상용화까지 독보적인 연구 시너지를 창출합니다.
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
