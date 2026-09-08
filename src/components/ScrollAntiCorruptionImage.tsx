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

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
