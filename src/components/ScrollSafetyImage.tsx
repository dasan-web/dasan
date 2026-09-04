'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  lang?: 'ko' | 'en';
}

export default function ScrollSafetyImage({ lang = 'ko' }: Props) {
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
        {/* Safety Banner Photo */}
        <Image
          src="/images/safety_banner.jpg"
          alt={isEn ? "Dasan Pharmaceutical's Health & Safety Policy" : "다산제약 안전보건경영방침"}
          fill
          priority
          className="object-cover object-center"
        />

        {/* 좌측 텍스트 시인성을 위한 소프트 시네마틱 그라디언트 (우측 의약품 패키징은 100% 선명하게 유지) */}
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
                <span>{isEn ? 'Health & Safety Management & Human Dignity' : '안전보건경영 & 인간존중'}</span>
              </div>

              {/* 메인 타이틀 */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black text-white tracking-tight leading-[1.25] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
                {isEn 
                  ? 'A Workplace Prioritizing Human Dignity, Health & Safety Above All' 
                  : '생명 존중과 안전을 최우선으로 하는 일터'}
              </h3>

              {/* 본문 텍스트 */}
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] text-white leading-[1.75] font-semibold break-keep tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {isEn ? (
                  <>
                    Dasan Pharmaceutical places the health and safety of all workers as the highest priority in management, creating a safe and healthy workplace through rigorous management systems and continuous prevention.
                  </>
                ) : (
                  <>
                    다산제약은 함께 일하는 모든 사람의 생명과 안전을 경영의 최우선 가치로 삼고, 철저한 안전보건 관리체계 구축과 예방 활동을 통해 안심하고 일할 수 있는 건강한 일터를 만들어갑니다.
                  </>
                )}
              </p>

              {/* 하단 핵심 키워드 칩 */}
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🛡️ {isEn ? 'Safety-First Policy' : '안전보건 최우선 경영'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🏥 {isEn ? 'Health & Response System' : '보건대응 및 건강증진체계'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🤝 {isEn ? 'Joint Safety Culture' : '노사가 함께하는 안전문화'}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
