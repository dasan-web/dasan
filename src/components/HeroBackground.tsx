'use client';

import React from 'react';

const VIDEO_SRC = '/main_clouds.mp4?v=original_restored';
const POSTER_SRC = '/main_poster.webp';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none">
      {/* 잔잔하고 우아한 원본 안개 호수 구름 영상 (dasan-sigma.vercel.app 참조) */}
      <video
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* 어색한 수풀 경계선을 가려주는 나무 오버레이 패치 (초경량 24KB WebP) */}
      <img 
        src="/tree_patch.webp" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-10 opacity-90"
      />

      {/* Soft cinematic left-side gradient to ensure text readability without altering original video beauty */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 via-[40%] to-transparent to-[72%] pointer-events-none z-10" />
    </div>
  );
}
