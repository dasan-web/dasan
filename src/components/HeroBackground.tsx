'use client';

import React from 'react';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        poster="/poster_main.jpg"
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-95 pointer-events-none"
      >
        <source src="/20260818.mp4" type="video/mp4" />
      </video>
      
      {/* Premium clean overlay matching Dasan style (gradient from white for text contrast) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
      
      {/* Floating subtle ambient glow particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-10">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-green/10 blur-[80px] top-[10%] left-[60%] animate-float-slow" />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-brand-cyan/15 blur-[70px] bottom-[20%] left-[30%] animate-float-medium" />
      </div>
    </div>
  );
}
