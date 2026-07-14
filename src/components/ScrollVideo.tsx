'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 뷰포트 기준 왼쪽 여백을 계산하여 확장 시 100vw를 꽉 채우도록 함
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setOffsetLeft(rect.left);
      }
    };
    
    // 초기 로딩 후 한 번 더 계산되도록 약간의 지연을 줌
    setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const { scrollY } = useScroll();

  // 스크롤 위치를 실시간 감지하여 상단에서 일정 지점 이상 스크롤되면 즉시 확대
  useMotionValueEvent(scrollY, "change", () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // 컨테이너가 화면 중간(약 30vh)쯤 도달했을 때 확대
      if (rect.top <= window.innerHeight * 0.3) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    }
  });

  return (
    <div ref={containerRef} className="relative w-full mb-16 z-[90] h-[400px]">
      <motion.div 
        animate={{
          width: isExpanded ? '100vw' : '100%',
          height: isExpanded ? '80vh' : '400px',
          borderRadius: isExpanded ? '0rem' : '2rem',
          x: isExpanded ? -offsetLeft : 0,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="overflow-hidden shadow-2xl bg-black relative z-[90]"
      >
        <video 
          className="w-full h-full object-cover" 
          src="/20260714.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        />
      </motion.div>
      {/* 
        영상이 80vh로 커졌을 때 아래 콘텐츠가 부드럽게 밀려 내려가도록 
        스페이서의 높이를 영상의 증가분만큼 채워줍니다.
      */}
      <motion.div 
        animate={{ height: isExpanded ? 'calc(80vh - 400px)' : '0px' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full" 
      />
    </div>
  );
}
