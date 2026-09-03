'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Leaf, 
  Users, 
  Scale, 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Quote, 
  Sparkles,
  Globe2
} from 'lucide-react';

interface Props {
  lang?: 'ko' | 'en';
}

export default function ESGEthicsSection({ lang = 'ko' }: Props) {
  const isEn = lang === 'en';

  return (
    <div className="w-full bg-white font-pretendard text-[#111] animate-fade-in-up">
      
      {/* 1. ESG 경영 비전 (Slogan) */}
      <section className="mb-20 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isEn ? '1. ESG Vision & Slogan' : '1. ESG 경영 비전 (Slogan)'}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-[34px] font-black text-gray-900 tracking-tight leading-[1.3] mb-6">
          {isEn ? 'Dasan Pharmaceutical\'s Promise to Heal Tomorrow with Righteous Management' : '바른 경영으로 내일을 치유하는 다산제약의 약속'}
        </h3>

        {/* Vision Statement Box */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f8faf9] via-white to-[#f0fdf4]/50 border border-emerald-100/90 p-6 sm:p-10 md:p-12 shadow-xs transition-all duration-300 hover:shadow-md hover:border-emerald-200">
          <div className="absolute top-4 right-6 text-emerald-600/10 pointer-events-none select-none">
            <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="w-10 h-1 bg-brand-green rounded-full mb-6"></div>
            <p className="text-base sm:text-lg md:text-[19px] text-gray-700 leading-[1.85] font-normal break-keep tracking-[-0.015em]">
              다산제약은 창업이념인 <strong className="font-bold text-gray-900">&apos;애민(愛民)&apos;</strong> 정신을 바탕으로, 환경(E)을 생각하는 친환경 공정, 사회(S)와 상생하는 안전한 일터, 투명하고 올바른 지배구조(G)를 구축하여 지속 가능한 헬스케어 미래를 열어갑니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 핵심 영역별 추진 성과 (ESG Pillars) */}
      <section className="mb-20 sm:mb-24">
        <div className="flex flex-col mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider w-fit mb-3">
            <span>{isEn ? '2. Core ESG Pillars' : '2. 핵심 영역별 추진 성과 (ESG Pillars)'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            ESG 핵심 3대 영역별 실천 과제
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mt-2 font-normal">
            환경(E), 사회(S), 지배구조(G) 전 과정에 걸쳐 투명하고 책임 있는 지속가능경영을 이행하고 있습니다.
          </p>
        </div>

        {/* 3 Large Pillars Cards Grid */}
        <div className="grid grid-cols-1 gap-8">

          {/* Pillar E: Environmental */}
          <div className="group rounded-3xl border border-emerald-100 bg-white p-6 sm:p-9 transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_12px_32px_rgba(16,185,129,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400"></div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Environmental
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    친환경 경영 (E)
                  </h4>
                </div>
              </div>

              <Link 
                href="/about/esg/environment" 
                className="inline-flex items-center gap-2 self-start lg:self-center px-4 py-2 rounded-full bg-emerald-50/80 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200/80 text-xs sm:text-sm font-bold transition-all duration-200 group/btn shadow-2xs"
              >
                <span>환경경영방침 바로가기</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </Link>
            </div>

            {/* Core Quote */}
            <div className="bg-[#fcfdfd] border-l-4 border-emerald-500 p-4 sm:p-5 rounded-r-2xl mb-6">
              <p className="text-[15px] sm:text-[16px] text-gray-800 font-medium leading-relaxed break-keep">
                인류의 건강을 지키는 시작은 건강한 지구를 만드는 것에서 출발합니다 다산제약은 환경 영향을 최소화하는 친환경 생산 생태계를 조성하고 있습니다
              </p>
            </div>

            {/* Key Action Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="break-keep">
                  <strong className="font-bold text-gray-900">ISO 14001(환경경영시스템) 인증 획득</strong> : 글로벌 기준에 부합하는 환경경영 체계를 체계적으로 운영하고 있습니다.
                </div>
              </div>

              <div className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="break-keep">
                  <strong className="font-bold text-gray-900">스마트생태공장 구축</strong> : 환경부·한국환경공단 지원 사업에 선정되어 오염물질 배출 저감, 에너지 효율 제고 등 친환경 제조 인프라 고도화를 실천하고 있습니다.
                </div>
              </div>
            </div>
          </div>

          {/* Pillar S: Social */}
          <div className="group rounded-3xl border border-blue-100 bg-white p-6 sm:p-9 transition-all duration-300 hover:border-blue-300 hover:shadow-[0_12px_32px_rgba(59,130,246,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400"></div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Social
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    사회적 책임 및 안전 경영 (S)
                  </h4>
                </div>
              </div>

              <Link 
                href="/about/esg/safety" 
                className="inline-flex items-center gap-2 self-start lg:self-center px-4 py-2 rounded-full bg-blue-50/80 hover:bg-blue-600 text-blue-800 hover:text-white border border-blue-200/80 text-xs sm:text-sm font-bold transition-all duration-200 group/btn shadow-2xs"
              >
                <span>안전보건경영방침 바로가기</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </Link>
            </div>

            {/* Core Quote */}
            <div className="bg-[#fbfdff] border-l-4 border-blue-500 p-4 sm:p-5 rounded-r-2xl mb-6">
              <p className="text-[15px] sm:text-[16px] text-gray-800 font-medium leading-relaxed break-keep">
                임직원의 안전이 곧 품질의 근간이며, 임직원의 성장이 곧 기업의 경쟁력입니다 다산제약은 모두가 안전하고 행복한 상생의 가치를 실현합니다
              </p>
            </div>

            {/* Key Action Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="break-keep">
                  <strong className="font-bold text-gray-900">ISO 45001(안전보건경영시스템) 인증 획득</strong> : 현장의 위험 요인을 선제적으로 관리하고 예방하여 &apos;중대재해 Zero&apos;의 안전한 작업 환경을 유지합니다.
                </div>
              </div>

              <div className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="break-keep">
                  <strong className="font-bold text-gray-900">일하기 좋은 일터 지향</strong> : 청년친화 강소기업 및 좋은 일자리 기업 선정을 바탕으로, 안전하고 일과 삶이 조화를 이루는 건강한 조직 문화를 만들어갑니다.
                </div>
              </div>
            </div>
          </div>

          {/* Pillar G: Governance */}
          <div className="group rounded-3xl border border-indigo-100 bg-white p-6 sm:p-9 transition-all duration-300 hover:border-indigo-300 hover:shadow-[0_12px_32px_rgba(99,102,241,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Governance
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    투명하고 투철한 정도 경영 (G)
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-start lg:self-center flex-wrap">
                <Link 
                  href="/about/esg/anti-corruption" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50/80 hover:bg-rose-600 text-rose-800 hover:text-white border border-rose-200/80 text-xs sm:text-sm font-bold transition-all duration-200 group/btn shadow-2xs"
                >
                  <span>부패방지방침 바로가기</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Link>
                <Link 
                  href="/about/esg/code-of-ethics" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 hover:bg-indigo-600 text-indigo-800 hover:text-white border border-indigo-200/80 text-xs sm:text-sm font-bold transition-all duration-200 group/btn shadow-2xs"
                >
                  <span>윤리강령 바로가기</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Core Quote */}
            <div className="bg-[#fcfcff] border-l-4 border-indigo-500 p-4 sm:p-5 rounded-r-2xl mb-6">
              <p className="text-[15px] sm:text-[16px] text-gray-800 font-medium leading-relaxed break-keep">
                다산(茶山) 정약용 선생의 &apos;실사구시&apos; 정신을 계승하여 공리공론이 아닌, 투명하고 청렴한 경영 프로세스로 시장의 신뢰를 증명합니다.
              </p>
            </div>

            {/* Key Action Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="break-keep">
                  <strong className="font-bold text-gray-900">ISO 37001(부패방지경영시스템) 인증 획득</strong> : 전사적인 부패방지 방침과 윤리경영 체계를 확립하여 리스크를 철저히 통제하고 투명한 거래 문화를 주도합니다.
                </div>
              </div>

              <div className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-gray-600 leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="break-keep">
                  <strong className="font-bold text-gray-900">K-ESG 지표 공식 만족</strong> : 한국형 ESG 가이드라인(K-ESG) 기준을 충족하는 지배구조 체계와 공시 역량을 확보하여, 상장 기업에 걸맞은 주주 가치 극대화와 투명 경영을 이어갑니다.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. ESG 인증 현황 (Certifications) */}
      <section className="pt-6 border-t border-gray-100">
        <div className="flex flex-col mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider w-fit mb-3">
            <span>{isEn ? '3. ESG Certifications' : '3. ESG 인증 현황 (Certifications)'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            공인된 지속가능경영 표준 인증
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mt-2 font-normal">
            국제 표준(ISO) 및 정부 가이드라인을 엄격히 준수하여 공신력 있는 인증을 획득하였습니다.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: ISO 14001 */}
          <div className="group relative bg-gradient-to-b from-white to-[#fbfdfc] border border-gray-200/80 rounded-3xl p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 shadow-2xs group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <Globe2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 mb-2">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Environment
              </span>
              <h5 className="text-2xl font-black text-gray-900 tracking-tight pt-1">
                ISO 14001
              </h5>
              <p className="text-sm font-semibold text-gray-600 leading-snug">
                환경경영시스템 인증
              </p>
            </div>

            <div className="w-full pt-4 mt-3 border-t border-gray-100 text-xs text-gray-400 font-medium">
              친환경 생산 인프라 체계
            </div>
          </div>

          {/* Card 2: ISO 45001 */}
          <div className="group relative bg-gradient-to-b from-white to-[#fbfdff] border border-gray-200/80 rounded-3xl p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-5 shadow-2xs group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2 mb-2">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-100">
                Health &amp; Safety
              </span>
              <h5 className="text-2xl font-black text-gray-900 tracking-tight pt-1">
                ISO 45001
              </h5>
              <p className="text-sm font-semibold text-gray-600 leading-snug">
                안전보건경영시스템 인증
              </p>
            </div>

            <div className="w-full pt-4 mt-3 border-t border-gray-100 text-xs text-gray-400 font-medium">
              중대재해 Zero 안전 작업장
            </div>
          </div>

          {/* Card 3: ISO 37001 */}
          <div className="group relative bg-gradient-to-b from-white to-[#fffbfb] border border-gray-200/80 rounded-3xl p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-rose-400 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-5 shadow-2xs group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2 mb-2">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider bg-rose-50/80 px-2.5 py-0.5 rounded-full border border-rose-100">
                Anti-Corruption
              </span>
              <h5 className="text-2xl font-black text-gray-900 tracking-tight pt-1">
                ISO 37001
              </h5>
              <p className="text-sm font-semibold text-gray-600 leading-snug">
                부패방지경영시스템 인증
              </p>
            </div>

            <div className="w-full pt-4 mt-3 border-t border-gray-100 text-xs text-gray-400 font-medium">
              투명한 윤리경영 리스크 통제
            </div>
          </div>

          {/* Card 4: K-ESG */}
          <div className="group relative bg-gradient-to-b from-white to-[#fbfaff] border border-gray-200/80 rounded-3xl p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-5 shadow-2xs group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2 mb-2">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50/80 px-2.5 py-0.5 rounded-full border border-indigo-100">
                Governance
              </span>
              <h5 className="text-2xl font-black text-gray-900 tracking-tight pt-1">
                K-ESG
              </h5>
              <p className="text-sm font-semibold text-gray-600 leading-snug">
                한국형 ESG 지표만족
              </p>
            </div>

            <div className="w-full pt-4 mt-3 border-t border-gray-100 text-xs text-gray-400 font-medium">
              국가 표준 가이드라인 충족
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
