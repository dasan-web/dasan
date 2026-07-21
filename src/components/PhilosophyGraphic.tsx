'use client';

import React from 'react';

export default function PhilosophyGraphic() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[450px] md:max-w-[700px] aspect-square mx-auto my-16 select-none overflow-visible" translate="no">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-gray-100 opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-gray-50 opacity-50 pointer-events-none" />

      {/* Center Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-[160px] h-[160px] md:w-[220px] md:h-[220px] rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark shadow-[0_20px_40px_rgba(22,163,74,0.3)] group">
        <div className="absolute inset-0 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-white font-black text-xl md:text-2xl tracking-tight z-10 drop-shadow-sm">행복경영</h3>
        <p className="text-white/80 font-bold text-xs md:text-sm mt-1 tracking-wider z-10">DASAN</p>
      </div>

      {/* 4 Orbital Nodes */}
      {/* 1. Top Node: 정도경영 */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '100ms' }} suppressHydrationWarning>
        <div className="w-[115px] h-[115px] md:w-[150px] md:h-[150px] rounded-full bg-white/90 backdrop-blur-md border-double border-[6px] border-brand-green/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center transition-transform hover:scale-105">
          <strong suppressHydrationWarning translate="no" className="text-brand-green font-bold text-[10px] md:text-xs mb-1 tracking-widest uppercase">Trust</strong>
          <span className="text-gray-800 font-black text-sm md:text-base">정도경영</span>
        </div>
      </div>

      {/* 2. Bottom Node: 사회적 공헌 */}
      <div className="absolute top-[88%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '300ms' }} suppressHydrationWarning>
        <div className="w-[115px] h-[115px] md:w-[150px] md:h-[150px] rounded-full bg-white/90 backdrop-blur-md border-double border-[6px] border-brand-blue/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center transition-transform hover:scale-105">
          <strong suppressHydrationWarning translate="no" className="text-brand-blue font-bold text-[10px] md:text-xs mb-1 tracking-widest uppercase">Social</strong>
          <span className="text-gray-800 font-black text-sm md:text-base">사회적 공헌</span>
        </div>
      </div>

      {/* 3. Left Node: 도전과 창의 */}
      <div className="absolute top-1/2 left-[12%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '200ms' }} suppressHydrationWarning>
        <div className="w-[115px] h-[115px] md:w-[150px] md:h-[150px] rounded-full bg-white/90 backdrop-blur-md border-double border-[6px] border-brand-cyan/40 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center transition-transform hover:scale-105">
          <strong suppressHydrationWarning translate="no" className="text-brand-cyan font-bold text-[10px] md:text-xs mb-1 tracking-widest uppercase">Challenge</strong>
          <span className="text-gray-800 font-black text-sm md:text-base">도전과 창의</span>
        </div>
      </div>

      {/* 4. Right Node: 소통과 협력 */}
      <div className="absolute top-1/2 left-[88%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '400ms' }} suppressHydrationWarning>
        <div className="w-[115px] h-[115px] md:w-[150px] md:h-[150px] rounded-full bg-white/90 backdrop-blur-md border-double border-[6px] border-brand-teal/40 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center transition-transform hover:scale-105">
          <strong suppressHydrationWarning translate="no" className="text-brand-teal font-bold text-[8.5px] md:text-[10px] mb-1 tracking-wider uppercase">Collaboration</strong>
          <span className="text-gray-800 font-black text-sm md:text-base">소통과 협력</span>
        </div>
      </div>

      {/* Connecting Flow Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.03))' }}>
        <defs>
          <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <g className="origin-center animate-[spin_40s_linear_infinite]">
          {/* Solid circle connecting the nodes */}
          <circle 
            cx="50%" 
            cy="50%" 
            r="38%" 
            fill="none" 
            stroke="url(#line-gradient-1)" 
            strokeWidth="1.5" 
          />
          
          {/* 4 Arrows placed at 45, 135, 225, 315 degrees */}
          {/* 45 degrees */}
          <g className="origin-center rotate-45">
            <svg x="50%" y="12%" overflow="visible">
              <path d="M -5,-5 L 5,0 L -5,5 L -3,0 Z" fill="#94a3b8" />
            </svg>
          </g>
          {/* 135 degrees */}
          <g className="origin-center rotate-[135deg]">
            <svg x="50%" y="12%" overflow="visible">
              <path d="M -5,-5 L 5,0 L -5,5 L -3,0 Z" fill="#94a3b8" />
            </svg>
          </g>
          {/* 225 degrees */}
          <g className="origin-center rotate-[225deg]">
            <svg x="50%" y="12%" overflow="visible">
              <path d="M -5,-5 L 5,0 L -5,5 L -3,0 Z" fill="#94a3b8" />
            </svg>
          </g>
          {/* 315 degrees */}
          <g className="origin-center rotate-[315deg]">
            <svg x="50%" y="12%" overflow="visible">
              <path d="M -5,-5 L 5,0 L -5,5 L -3,0 Z" fill="#94a3b8" />
            </svg>
          </g>
        </g>
      </svg>
    </div>
  );
}
