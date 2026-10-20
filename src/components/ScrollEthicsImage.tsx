'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  lang?: 'ko' | 'en';
  imageUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

export default function ScrollEthicsImage({ lang = 'ko', imageUrl, heroTitle, heroSubtitle }: Props) {
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
        <Image
          src={imageUrl || "/images/ethics_banner.jpg"}
          alt={isEn ? "Dasan Pharmaceutical's Code of Ethics" : "다산제약 윤리강령"}
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 via-[50%] to-transparent to-[85%] pointer-events-none z-0" />

        <div className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none">
          <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-8 pointer-events-auto">
            <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6 text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black text-white tracking-tight leading-[1.25] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
                {isEn 
                  ? 'Global Highest Standard of Ethical Consciousness & Transparency' 
                  : (heroTitle || '글로벌 최고 수준의 윤리의식과 투명경영')}
              </h3>

              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] text-white leading-[1.75] font-semibold break-keep tracking-[-0.015em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] whitespace-pre-line">
                {isEn ? (
                  <>
                    Dasan Pharmaceutical prioritizes integrity, fairness, and responsibility across all business endeavors, fully complying with domestic and international regulations to forge a trustworthy and sustainable future.
                  </>
                ) : (
                  heroSubtitle || '다산제약은 모든 사업 활동에서 정직성, 공정성, 책임감을 최우선 가치로 삼고, 국내외 법규와 국제 표준을 철저히 준수하며 신뢰받는 미래를 만들어갑니다.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
