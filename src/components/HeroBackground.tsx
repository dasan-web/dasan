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
      {/* 24초 무한 반복 슬로우 뭉게구름 시네마그래프 영상 (밝은 하늘 & 대형 뭉게구름) */}
      <video
        ref={videoRef}
        src="/main_clouds.mp4?v=bright_slow_clouds"
        poster="/main.png"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Soft cinematic left-side gradient to ensure text readability without altering original video beauty */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 via-[40%] to-transparent to-[72%] pointer-events-none z-10" />
    </div>
  );
}
