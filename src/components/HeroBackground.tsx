'use client';

import React from 'react';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900 select-none">
      {/* Toned down, high-contrast, richer forest image */}
      <img 
        src="/main.png" 
        alt="Dasan Background"
        className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.08] saturate-[1.05] pointer-events-none"
      />
      
      {/* Subtle darkening overlay across the whole image to tone it down */}
      <div className="absolute inset-0 bg-slate-950/15 pointer-events-none z-10" />

      {/* Clean text backdrop gradient: crisp white behind text on the left, smoothly clearing out to reveal the rich toned-down forest on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-[36%] to-transparent to-[65%] pointer-events-none z-10" />
      
      {/* Floating subtle ambient glow particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 z-10">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-green/15 blur-[90px] top-[10%] left-[60%] animate-float-slow" />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-brand-cyan/15 blur-[80px] bottom-[20%] left-[30%] animate-float-medium" />
      </div>
    </div>
  );
}
