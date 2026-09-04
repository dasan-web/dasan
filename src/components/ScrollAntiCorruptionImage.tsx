'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  lang?: 'ko' | 'en';
}

export default function ScrollAntiCorruptionImage({ lang = 'ko' }: Props) {
  const isEn = lang === 'en';

  return (
    <div className="w-full relative mb-16 sm:mb-20">
      <div 
        style={{
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
        }}
        className="relative min-h-[560px] sm:min-h-[620px] lg:h-[660px] overflow-hidden bg-slate-900 shadow-sm"
      >
        {/* Anti-Corruption Banner Photo */}
        <Image
          src="/images/anticorruption_banner.png"
          alt={isEn ? "Dasan Pharmaceutical's Anti-Corruption Policy" : "다산제약 부패방지방침"}
          fill
          priority
          className="object-cover object-center"
        />

        {/* 좌측 텍스트 시인성을 위한 소프트 시네마틱 그라디언트 (우측 피규어 및 오브제는 100% 선명하게 유지) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 via-[50%] to-transparent to-[85%] pointer-events-none z-0" />

        {/* 
          좌측 상단 영역 텍스트 배치
        */}
        <div className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none">
          <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-8 pointer-events-auto">
            <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6 text-left">

              {/* 반투명 플로팅 뱃지 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isEn ? 'Transparent Governance & Anti-Corruption' : '투명경영 & 부패방지'}</span>
              </div>

              {/* 메인 타이틀 */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black text-white tracking-tight leading-[1.25] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
                {isEn 
                  ? 'Anti-Corruption Management Building a Transparent Future on Integrity & Trust' 
                  : '정직과 신뢰로 투명한 미래를 여는 부패방지경영'}
              </h3>

              {/* 본문 텍스트 */}
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] text-white leading-[1.75] font-semibold break-keep tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {isEn ? (
                  <>
                    Dasan Pharmaceutical strictly complies with fair and transparent procedures across all operations, practicing zero-tolerance against corruption and bribery to grow as a trusted global healthcare leader.
                  </>
                ) : (
                  <>
                    다산제약은 사업 추진 전 과정에서 공정하고 투명한 절차를 준수하며, 어떠한 부패 행위도 용납하지 않는 무관용 원칙을 바탕으로 신뢰받는 제약 바이오 기업으로 도약합니다.
                  </>
                )}
              </p>

              {/* 하단 핵심 키워드 칩 */}
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  ⚖️ {isEn ? 'Zero Tolerance Policy' : '부패 및 부정청탁 무관용 원칙'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  📜 {isEn ? 'Global Compliance Practice' : '글로벌 준법·윤리경영 실천'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🔒 {isEn ? 'Whistleblower Protection' : '제보자 기밀보호 및 공정성 확립'}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
