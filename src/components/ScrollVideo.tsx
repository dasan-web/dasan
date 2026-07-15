'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollVideo() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [initialTop, setInitialTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandedRef = useRef(false);
  const [expandedScrollY, setExpandedScrollY] = useState(0);
  
  // 뷰포트 기준 왼쪽 여백 및 상단 절대 위치를 계산하여 확장 시 100vw를 꽉 채우고 상단을 덮도록 함
  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current) {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        const rect = triggerRef.current.getBoundingClientRect();
        setOffsetLeft(rect.left);
        setInitialTop(rect.top + window.scrollY);
        // 페이지 진입 시 이미 스크롤이 내려가 있거나 해상도가 작아서 화면 상단에 가까우면 바로 확대 상태로 초기화
        if (rect.top <= window.innerHeight * 0.3) {
          isExpandedRef.current = true;
          setIsExpanded(true);
          setExpandedScrollY(window.scrollY);
        }
      }
    };
    
    // 초기 로딩 후 한 번 더 계산되도록 약간의 지연을 줌
    setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const { scrollY } = useScroll();

  // 스크롤 위치를 실시간 감지하여 상단에서 일정 지점 이상 스크롤되면 즉시 확대
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // 컨테이너가 화면 중간(약 30vh)쯤 도달했을 때 확대
      if (rect.top <= window.innerHeight * 0.3) {
        if (!isExpandedRef.current) {
          isExpandedRef.current = true;
          setIsExpanded(true);
          setExpandedScrollY(latest); // 확대되는 순간의 스크롤 위치 저장
        }
      } else {
        if (isExpandedRef.current) {
          isExpandedRef.current = false;
          setIsExpanded(false);
        }
      }
    }
  });

  return (
    <div ref={triggerRef} className="w-full flex flex-col">
      <motion.div 
        ref={containerRef} 
        // 전체화면 시 상단 헤더(z-50)를 완전히 덮어버릴 수 있도록 z-index를 90으로 상향
        className="relative w-full mb-16 z-[90]"
        // 확대되는 순간의 뷰포트 최상단에 정확히 일치하도록 marginTop 동적 계산
        animate={{ marginTop: isExpanded ? `${expandedScrollY - initialTop}px` : '0px' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div 
          initial={{ height: '400px', width: '100%', borderRadius: '2rem' }}
          animate={{
            width: isExpanded ? '100vw' : '100%',
            // 화면 전체를 완전히 덮되, 영상 원본 비율(16:9)이 깨져서 위아래가 잘리지 않도록 동적 픽셀 높이 계산
            height: isExpanded ? (windowHeight > 0 ? `${Math.max(windowHeight, windowWidth * 9 / 16)}px` : '100vh') : '400px',
            borderRadius: isExpanded ? '0rem' : '2rem',
            x: isExpanded ? -offsetLeft : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="overflow-hidden shadow-2xl bg-black relative z-[40]"
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
      </motion.div>
    </div>
  );
}
