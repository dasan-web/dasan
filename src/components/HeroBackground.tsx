'use client';

import React from 'react';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white select-none">
      <img 
        src="/main.png" 
        alt="Dasan Background"
        className="w-full h-full object-cover object-center pointer-events-none"
      />
      
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
