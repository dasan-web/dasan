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
      {/* Soft cinematic left-side gradient to ensure text readability without altering original photo beauty */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 via-[40%] to-transparent to-[72%] pointer-events-none z-10" />
    </div>
  );
}
