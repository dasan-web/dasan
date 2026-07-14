'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollVideo() {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 뷰포트 기준 왼쪽 여백을 계산하여 영상을 화면 정중앙에 100vw로 배치하기 위함
  useEffect(() => {
    const updatePosition = () => {
      if (scrollTargetRef.current) {
        const rect = scrollTargetRef.current.getBoundingClientRect();
        setOffsetLeft(-rect.left);
      }
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const { scrollY } = useScroll();

  // 스크롤 위치를 실시간으로 감지하여, 영상이 화면의 25% 지점 이상 올라오면 즉시 전체 확대를 실행(트리거)합니다.
  useMotionValueEvent(scrollY, "change", () => {
    if (scrollTargetRef.current) {
      const rect = scrollTargetRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.25) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    }
  });

  return (
    <div className="relative w-full mb-16 z-[9999]">
      {/* 
        스크롤 기준이 되는 컨테이너. 
        너무 길지 않게 150vh로 줄여서 사용자가 한두 번의 스크롤만으로 자연스럽게 다음 내용으로 넘어갈 수 있게 합니다.
      */}
      <div ref={scrollTargetRef} className="h-[150vh] w-full">
        <div 
          className="sticky top-[20vh] h-[40vh] flex justify-center items-start overflow-visible"
          style={{ 
            width: '100vw', 
            transform: `translateX(${offsetLeft}px)` 
          }}
        >
          <motion.div 
            animate={{
              width: isExpanded ? '100vw' : '50vw',
              height: isExpanded ? '100vh' : '40vh',
              borderRadius: isExpanded ? '0rem' : '3rem',
              y: isExpanded ? '-20vh' : '0vh'
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="overflow-hidden shadow-2xl bg-black"
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
        </div>
      </div>
      
      {/* 텍스트가 겹치지 않고 자연스럽게 밀려 내려가도록 하는 동적 스페이서 역시 상태에 따라 0.8초간 부드럽게 커집니다. */}
      <motion.div 
        animate={{ height: isExpanded ? '40vh' : '0vh' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full" 
      />
    </div>
  );
}
