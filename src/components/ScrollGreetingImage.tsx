'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  lang?: 'ko' | 'en';
}

export default function ScrollGreetingImage({ lang = 'ko' }: Props) {
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
        {/* CEO Greeting Banner Photo (Clean original image only) */}
        <Image
          src="/images/greeting_banner.jpg"
          alt={isEn ? "Dasan Pharmaceutical CEO Greeting" : "다산제약 대표이사 인사말"}
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
