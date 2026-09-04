'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  lang?: 'ko' | 'en';
}

export default function ScrollPromiseImage({ lang = 'ko' }: Props) {
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
        {/* Promise.png Photo - 확대 및 크기 애니메이션 없이 처음부터 즉시 고정 표시 */}
        <Image
          src="/Promise.png"
          alt={isEn ? "Dasan Pharmaceutical's Sustainable ESG Promise" : "다산제약 지속가능 ESG 약속"}
          fill
          priority
          className="object-cover object-center sm:object-[center_right]"
        />

        {/* 
          사용자가 지정한 사진 좌측 상단 영역에 텍스트 배치
          (손가락을 가리지 않고 좌측 상단 배경에 쏙 들어가도록 items-start 및 상단 패딩 적용)
        */}
        <div className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none">
          <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-8 pointer-events-auto">
            <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6 text-left">

              {/* 반투명 플로팅 뱃지 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isEn ? 'Vision & Founding Spirit' : '경영비전 & 창업이념'}</span>
              </div>

              {/* 메인 타이틀 */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black text-white tracking-tight leading-[1.25] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
                {isEn 
                  ? 'Dasan Pharmaceutical\'s Promise to Heal Tomorrow with Righteous Management' 
                  : '바른 경영으로 내일을 치유하는 다산제약의 약속'}
              </h3>

              {/* 본문 텍스트 */}
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] text-white leading-[1.75] font-semibold break-keep tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {isEn ? (
                  <>
                    Based on our founding philosophy of &apos;Aemin (Loving the People)&apos;, Dasan Pharmaceutical establishes eco-friendly processes for the environment (E), a safe and co-prosperous workplace for society (S), and transparent, righteous governance (G) to open a sustainable future for healthcare.
                  </>
                ) : (
                  <>
                    다산제약은 창업이념인 &apos;애민(愛民)&apos; 정신을 바탕으로, 환경(E)을 생각하는 친환경 공정, 사회(S)와 상생하는 안전한 일터, 투명하고 올바른 지배구조(G)를 구축하여 지속 가능한 헬스케어 미래를 열어갑니다.
                  </>
                )}
              </p>

              {/* 하단 핵심 키워드 칩 */}
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🌱 {isEn ? 'Eco-friendly Green' : '친환경 생태'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  🤝 {isEn ? 'Shared Growth' : '사회적 상생'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                  ⚖️ {isEn ? 'Righteous Governance' : '투명 정도경영'}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
