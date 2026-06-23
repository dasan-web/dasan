'use client';

import React, { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for smooth spring animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 60, damping: 25, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      
      // Calculate normalized position from center (-0.5 to 0.5)
      const moveX = (clientX / width - 0.5) * -25; // max 25px offset opposite to cursor
      const moveY = (clientY / height - 0.5) * -25;
      
      x.set(moveX);
      y.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        onCanPlay={(e) => {
          e.currentTarget.playbackRate = 0.75; // 75% speed is much smoother than 50% on browsers
        }}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-95"
      >
        <source src="/20260619.mp4" type="video/mp4" />
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
