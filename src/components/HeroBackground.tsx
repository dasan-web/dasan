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
    </div>
  );
}
