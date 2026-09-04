'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  lang?: 'ko' | 'en';
}

export default function ScrollEnvironmentImage({ lang = 'ko' }: Props) {
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
        {/* Environment Banner Photo */}
        <Image
          src="/images/environment_banner.png"
          alt={isEn ? "Dasan Pharmaceutical's Environmental Management Policy" : "다산제약 환경경영방침"}
          fill
          priority
          className="object-cover object-[center_bottom] sm:object-center"
        />

        {/* 좌측 텍스트 시인성을 위한 소프트 시네마틱 그라디언트 (우측 풍력발전기는 100% 선명하게 유지) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 via-[50%] to-transparent to-[80%] pointer-events-none z-0" />

        {/* 
          좌측 상단 영역 텍스트 배치
        */}
        <div className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none">
          <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-8 pointer-events-auto">
            <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6 text-left">

              {/* 반투명 플로팅 뱃지 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isEn ? 'Environmental Management & Eco-Friendly Process' : '환경경영 & 친환경 공정'}</span>
              </div>

              {/* 메인 타이틀 */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black text-white tracking-tight leading-[1.25] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
                {isEn 
                  ? 'Environmental Management for a Sustainable Future of Nature & Humanity' 
                  : '자연과 인류의 지속 가능한 미래를 위한 환경경영'}
              </h3>

              {/* 본문 텍스트 */}
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] text-white leading-[1.75] font-semibold break-keep tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {isEn ? (
                  <>
                    Dasan Pharmaceutical embraces environmental conservation as a core corporate value across all business operations, creating a clean and safe environment through eco-friendly processes and proactive pollution prevention.
                  </>
                ) : (
                  <>
                    다산제약은 모든 경영활동에서 환경보전을 기업의 핵심 가치로 삼고, 친환경적 공정과 철저한 환경오염 예방을 통해 깨끗하고 안전한 환경을 만들어갑니다.
                  </>
                )}
              </p>

              {/* 하단 핵심 키워드 칩 */}
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🌱 {isEn ? 'Eco-friendly Process' : '친환경 공정 & 기술 도입'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  ♻️ {isEn ? 'Resource Efficiency' : '자원 및 에너지 효율화'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🌍 {isEn ? 'Pollution Prevention' : '환경오염 사전 예방'}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
