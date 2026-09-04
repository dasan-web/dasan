'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Leaf, 
  Users, 
  Scale, 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Globe2,
  Building2,
  ChevronRight
} from 'lucide-react';

interface Props {
  lang?: 'ko' | 'en';
}

export default function ESGEthicsSection({ lang = 'ko' }: Props) {
  const isEn = lang === 'en';

  return (
    <div className="w-full bg-white font-pretendard text-slate-800 animate-fade-in-up">
      
      {/* 2. 핵심 영역별 추진 성과 (대형 사진 중심 비주얼 쇼케이스) */}
      <section className="mb-20 sm:mb-28">
        <div className="flex flex-col mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider w-fit mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-green" />
            <span>{isEn ? '2. Core ESG Pillars' : '2. 핵심 영역별 추진 성과'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Action Tasks by 3 Core ESG Pillars' : 'ESG 핵심 3대 영역별 실천 과제'}
          </h3>
          <p className="text-sm sm:text-base text-slate-500 mt-2.5 font-normal max-w-3xl">
            {isEn 
              ? 'We implement transparent and responsible sustainability management across Environment, Social, and Governance with large-scale high-tech infrastructure.'
              : '환경(E), 사회(S), 지배구조(G) 전 과정에 걸쳐 투명하고 책임 있는 지속가능경영을 이행하며, 첨단 현장 중심의 실천을 이어가고 있습니다.'}
          </p>
        </div>

        {/* 3 Grand Alternating Photo Showcase Cards */}
        <div className="space-y-12 sm:space-y-16">

          {/* Pillar E: Environmental (Photo Left) */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Grand Photo Showcase */}
              <div className="relative lg:col-span-5 xl:col-span-5 h-80 sm:h-96 md:h-[440px] lg:h-auto min-h-[360px] lg:min-h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src="/esg_environment_leaf.png"
                  alt={isEn ? "Dasan Pharmaceutical Eco-friendly Environmental Management" : "다산제약 친환경 생태 경영"}
                  fill
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Area */}
              <div className="lg:col-span-7 xl:col-span-7 p-7 sm:p-9 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Leaf className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                          Pillar 01 · Environmental
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isEn ? 'Eco-friendly Management (E)' : '친환경 경영 (E)'}
                        </h4>
                      </div>
                    </div>

                    <Link 
                      href="/about/esg/environment" 
                      className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-full bg-slate-900 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 group/btn shadow-xs hover:shadow-md"
                    >
                      <span>{isEn ? 'Environment Policy' : '환경경영방침 바로가기'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                  {/* Core Statement Quote */}
                  <div className="bg-slate-50 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-2xl mb-6">
                    <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 font-medium leading-relaxed break-keep">
                      {isEn 
                        ? 'Protecting human health begins with creating a healthy planet. Dasan Pharmaceutical is building an eco-friendly manufacturing ecosystem that minimizes environmental impact.'
                        : '인류의 건강을 지키는 시작은 건강한 지구를 만드는 것에서 출발합니다. 다산제약은 환경 영향을 최소화하는 친환경 생산 생태계를 조성하고 있습니다.'}
                    </p>
                  </div>

                  {/* Action Bullets */}
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed group/item">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="break-keep">
                        <strong className="font-bold text-slate-900">{isEn ? 'ISO 14001 Certification' : 'ISO 14001(환경경영시스템) 인증 획득'}</strong> : {isEn ? 'Systematically operating an environmental management system meeting global standards.' : '글로벌 기준에 부합하는 환경경영 체계를 체계적으로 운영하고 있습니다.'}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed group/item">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="break-keep">
                        <strong className="font-bold text-slate-900">{isEn ? 'Smart Eco-Factory Construction' : '스마트생태공장 구축'}</strong> : {isEn ? 'Selected for the Ministry of Environment support project, reducing pollutants and enhancing energy efficiency.' : '환경부·한국환경공단 지원 사업에 선정되어 오염물질 배출 저감, 에너지 효율 제고 등 친환경 제조 인프라 고도화를 실천하고 있습니다.'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Dasan Eco-Protection Initiative</span>
                  <span className="text-emerald-700 font-bold">100% Green Compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar S: Social (Photo Right - Alternating Rhythm) */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-sky-300 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Content Area (Left on Desktop) */}
              <div className="lg:col-span-7 xl:col-span-7 order-2 lg:order-1 p-7 sm:p-9 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-sky-700 uppercase tracking-widest">
                          Pillar 02 · Social &amp; Safety
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isEn ? 'Social Responsibility & Safety (S)' : '사회적 책임 및 안전 경영 (S)'}
                        </h4>
                      </div>
                    </div>

                    <Link 
                      href="/about/esg/safety" 
                      className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-full bg-slate-900 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 group/btn shadow-xs hover:shadow-md"
                    >
                      <span>{isEn ? 'Safety Policy' : '안전보건경영방침 바로가기'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                  {/* Core Statement Quote */}
                  <div className="bg-slate-50 border-l-4 border-sky-600 p-4 sm:p-5 rounded-r-2xl mb-6">
                    <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 font-medium leading-relaxed break-keep">
                      {isEn 
                        ? 'Employee safety is the foundation of quality, and employee growth is corporate competitiveness. Dasan Pharmaceutical realizes shared value where everyone is safe and happy.'
                        : '임직원의 안전이 곧 품질의 근간이며, 임직원의 성장이 곧 기업의 경쟁력입니다. 다산제약은 모두가 안전하고 행복한 상생의 가치를 실현합니다.'}
                    </p>
                  </div>

                  {/* Action Bullets */}
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed group/item">
                      <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-sky-700 group-hover/item:bg-sky-600 group-hover/item:text-white transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="break-keep">
                        <strong className="font-bold text-slate-900">{isEn ? 'ISO 45001 Certification' : 'ISO 45001(안전보건경영시스템) 인증 획득'}</strong> : {isEn ? 'Proactively identifying hazards to maintain a "Zero Severe Accidents" workplace.' : '현장의 위험 요인을 선제적으로 관리하고 예방하여 \'중대재해 Zero\'의 안전한 작업 환경을 유지합니다.'}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed group/item">
                      <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-sky-700 group-hover/item:bg-sky-600 group-hover/item:text-white transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="break-keep">
                        <strong className="font-bold text-slate-900">{isEn ? 'Great Workplace Culture' : '일하기 좋은 일터 지향'}</strong> : {isEn ? 'Selected as Youth-Friendly Hidden Champion, promoting work-life balance and healthy organizational culture.' : '청년친화 강소기업 및 좋은 일자리 기업 선정을 바탕으로, 안전하고 일과 삶이 조화를 이루는 건강한 조직 문화를 만들어갑니다.'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Dasan People &amp; Safety Culture</span>
                  <span className="text-sky-700 font-bold">Zero Severe Accidents</span>
                </div>
              </div>

              {/* Grand Photo Showcase (Right on Desktop) */}
              <div className="relative lg:col-span-5 xl:col-span-5 order-1 lg:order-2 h-80 sm:h-96 md:h-[440px] lg:h-auto min-h-[360px] lg:min-h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src="/esg_social_hands.png"
                  alt={isEn ? "Dasan Pharmaceutical Social Responsibility and Shared Value" : "다산제약 사회적 책임 및 상생 가치"}
                  fill
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

            </div>
          </div>

          {/* Pillar G: Governance (Photo Left) */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Grand Photo Showcase */}
              <div className="relative lg:col-span-5 xl:col-span-5 h-80 sm:h-96 md:h-[440px] lg:h-auto min-h-[360px] lg:min-h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src="/esg_governance_lab.png"
                  alt={isEn ? "Dasan Pharmaceutical Advanced Quality & Governance Production" : "다산제약 정도경영 및 첨단 제조·품질 관리 인프라"}
                  fill
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Area */}
              <div className="lg:col-span-7 xl:col-span-7 p-7 sm:p-9 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Scale className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                          Pillar 03 · Governance &amp; Ethics
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isEn ? 'Transparent Governance (G)' : '투명하고 투철한 정도 경영 (G)'}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Link 
                        href="/about/esg/anti-corruption" 
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-200 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-2xs"
                      >
                        <span>{isEn ? 'Anti-Corruption' : '부패방지방침'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link 
                        href="/about/esg/code-of-ethics" 
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-indigo-700 text-white text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-xs hover:shadow-md"
                      >
                        <span>{isEn ? 'Code of Ethics' : '윤리강령 바로가기'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Core Statement Quote */}
                  <div className="bg-slate-50 border-l-4 border-indigo-600 p-4 sm:p-5 rounded-r-2xl mb-6">
                    <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 font-medium leading-relaxed break-keep">
                      {isEn 
                        ? 'Inheriting the spirit of "Seeking Truth from Facts" from scholar Jeong Yak-yong (Dasan), we prove market trust not through empty slogans, but through transparent and upright governance processes.'
                        : '다산(茶山) 정약용 선생의 \'실사구시\' 정신을 계승하여 공리공론이 아닌, 투명하고 청렴한 경영 프로세스로 시장의 신뢰를 증명합니다.'}
                    </p>
                  </div>

                  {/* Action Bullets */}
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed group/item">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-700 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="break-keep">
                        <strong className="font-bold text-slate-900">{isEn ? 'ISO 37001 Certification' : 'ISO 37001(부패방지경영시스템) 인증 획득'}</strong> : {isEn ? 'Establishing an anti-corruption and ethical management system to rigorously control risks.' : '전사적인 부패방지 방침과 윤리경영 체계를 확립하여 리스크를 철저히 통제하고 투명한 거래 문화를 주도합니다.'}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed group/item">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-700 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="break-keep">
                        <strong className="font-bold text-slate-900">{isEn ? 'Meeting K-ESG Indicators' : 'K-ESG 지표 공식 만족'}</strong> : {isEn ? 'Securing governance standards meeting the Korean ESG guidelines to maximize shareholder value.' : '한국형 ESG 가이드라인(K-ESG) 기준을 충족하는 지배구조 체계와 공시 역량을 확보하여, 상장 기업에 걸맞은 주주 가치 극대화와 투명 경영을 이어갑니다.'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Dasan Righteous Governance Framework</span>
                  <span className="text-indigo-700 font-bold">100% Truth &amp; Integrity</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ESG 인증 현황 (공인 표준 인증 아이콘 카드) */}
      <section className="pt-10 border-t border-slate-200/80">
        <div className="flex flex-col mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider w-fit mb-3">
            <Award className="w-3.5 h-3.5 text-brand-green" />
            <span>{isEn ? '3. ESG Certifications & Standards' : '3. 공인 표준 인증 현황'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Certified Sustainable Management Standards' : '공인된 지속가능경영 표준 인증'}
          </h3>
          <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
            {isEn 
              ? 'Dasan Pharmaceutical has acquired authoritative certifications by strictly complying with international ISO standards and government guidelines.'
              : '국제 표준(ISO) 및 국가 가이드라인을 엄격히 준수하여 획득한 공신력 있는 인증 체계입니다.'}
          </p>
        </div>

        {/* 4 Premium Insignia Cards with Dedicated Domain Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 01: ISO 14001 (Deep Sage Emerald Theme) */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-500" />
            
            {/* Ambient Corner Glow on Hover */}
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />

            <div>
              {/* Header: Index & Category Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black tracking-widest text-slate-300 group-hover:text-emerald-600 transition-colors duration-300">
                  01
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70 uppercase tracking-wider">
                  Environment
                </span>
              </div>

              {/* Blue Box Icon: Globe2 */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 group-hover:scale-105 transition-all duration-300 mb-5 shadow-2xs">
                <Globe2 className="w-7 h-7" />
              </div>

              {/* Title & Subtitle */}
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                ISO 14001
              </h5>
              <div className="text-sm font-bold text-emerald-950 mb-2.5">
                {isEn ? 'Environmental Management' : '환경경영시스템 인증'}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Eco-friendly manufacturing processes and systematic energy/waste management.' 
                  : '친환경 제조 생태계 구축 및 체계적인 오염물질·에너지 저감 관리 기준 충족'}
              </p>
            </div>

            {/* Bottom Proof Tag */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-emerald-700 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? 'Global ISO Accredited' : '국제표준 친환경 공인'}</span>
            </div>
          </div>

          {/* Card 02: ISO 45001 (Oceanic Navy Theme) */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-600 to-cyan-500" />

            {/* Ambient Corner Glow on Hover */}
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-sky-500/5 group-hover:bg-sky-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />

            <div>
              {/* Header: Index & Category Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black tracking-widest text-slate-300 group-hover:text-sky-600 transition-colors duration-300">
                  02
                </span>
                <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200/70 uppercase tracking-wider">
                  Health &amp; Safety
                </span>
              </div>

              {/* Blue Box Icon: ShieldCheck */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-sky-700 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 group-hover:scale-105 transition-all duration-300 mb-5 shadow-2xs">
                <ShieldCheck className="w-7 h-7" />
              </div>

              {/* Title & Subtitle */}
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                ISO 45001
              </h5>
              <div className="text-sm font-bold text-sky-950 mb-2.5">
                {isEn ? 'Occupational Health & Safety' : '안전보건경영시스템 인증'}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Proactive hazard prevention and maintaining zero severe industrial accidents.' 
                  : '사업장 위험 요인 선제적 예방 및 임직원 생명·안전을 최우선하는 체계 확보'}
              </p>
            </div>

            {/* Bottom Proof Tag */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-sky-700 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
              <span>{isEn ? 'Zero Hazard Workplace' : '중대재해 Zero 작업장'}</span>
            </div>
          </div>

          {/* Card 03: ISO 37001 (Refined Warm Bronze Theme) */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 to-orange-500" />

            {/* Ambient Corner Glow on Hover */}
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />

            <div>
              {/* Header: Index & Category Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black tracking-widest text-slate-300 group-hover:text-amber-600 transition-colors duration-300">
                  03
                </span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/70 uppercase tracking-wider">
                  Integrity &amp; Ethics
                </span>
              </div>

              {/* Blue Box Icon: ShieldAlert */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-amber-700 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 group-hover:scale-105 transition-all duration-300 mb-5 shadow-2xs">
                <ShieldAlert className="w-7 h-7" />
              </div>

              {/* Title & Subtitle */}
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                ISO 37001
              </h5>
              <div className="text-sm font-bold text-amber-950 mb-2.5">
                {isEn ? 'Anti-Bribery Management' : '부패방지경영시스템 인증'}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Strict anti-corruption policy and transparent corporate ethics framework.' 
                  : '투명하고 청렴한 거래 규정 준수 및 비윤리적 리스크를 원천 통제하는 시스템'}
              </p>
            </div>

            {/* Bottom Proof Tag */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-amber-700 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{isEn ? 'Global Ethical Standard' : '클린 윤리경영 표준'}</span>
            </div>
          </div>

          {/* Card 04: K-ESG (Deep Charcoal Indigo Theme) */}
          <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-slate-700" />

            {/* Ambient Corner Glow on Hover */}
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors duration-500 blur-2xl pointer-events-none" />

            <div>
              {/* Header: Index & Category Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black tracking-widest text-slate-300 group-hover:text-indigo-600 transition-colors duration-300">
                  04
                </span>
                <span className="text-[11px] font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/70 uppercase tracking-wider">
                  Governance
                </span>
              </div>

              {/* Blue Box Icon: Award */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 group-hover:scale-105 transition-all duration-300 mb-5 shadow-2xs">
                <Award className="w-7 h-7" />
              </div>

              {/* Title & Subtitle */}
              <h5 className="text-2xl font-black text-slate-900 tracking-tight mb-1.5">
                K-ESG
              </h5>
              <div className="text-sm font-bold text-indigo-950 mb-2.5">
                {isEn ? 'Korean ESG Guidelines' : '한국형 ESG 가이드라인'}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Official compliance with government K-ESG indicators and transparent disclosures.' 
                  : '정부 공식 K-ESG 가이드라인 충족 및 주주 가치 극대화를 위한 공시 체계 이행'}
              </p>
            </div>

            {/* Bottom Proof Tag */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-700 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isEn ? 'National Standard Benchmark' : '국가 표준 지표 충족'}</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
