'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none">
      {/* 20초 무한 반복 슬로우 구름 시네마그래프 영상 (부드러운 슬로우 모션 - 원본 복원) */}
      <video
        ref={videoRef}
        src="/main_clouds.mp4?v=original_restored"
        poster="/main_poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />
      {/* 어색한 수풀 경계선을 가려주는 나무 오버레이 패치 */}
      <img 
        src="/tree_patch.png" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-10 opacity-90"
      />

      {/* Soft cinematic left-side gradient to ensure text readability without altering original video beauty */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 via-[40%] to-transparent to-[72%] pointer-events-none z-10" />
    </div>
  );
}
