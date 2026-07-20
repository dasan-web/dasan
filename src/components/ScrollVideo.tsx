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
  const [isReady, setIsReady] = useState(false);
  const canExpandRef = useRef(false);

  // 뷰포트 기준 왼쪽 여백 및 상단 절대 위치를 계산하여 확장 시 100vw를 꽉 채우고 상단을 덮도록 함
  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current) {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        const rect = triggerRef.current.getBoundingClientRect();
        setOffsetLeft(rect.left);
        setInitialTop(rect.top + window.scrollY);
        setIsReady(true);
      }
    };
    
    // 초기 로딩 후 한 번 더 계산되도록 약간의 지연을 줌
    setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);

    // 탭 클릭 등 라우트 이동 시 이전 페이지의 스크롤 위치가 남아있어 
    // 즉시 확대 애니메이션이 실행되는 것을 방지하기 위해 500ms 동안 확대 차단
    const timer = setTimeout(() => {
      canExpandRef.current = true;
    }, 500);

    return () => {
      window.removeEventListener('resize', updatePosition);
      clearTimeout(timer);
    };
  }, []);

  const { scrollY } = useScroll();

  // 스크롤 위치를 실시간 감지하여 상단에서 일정 지점 이상 스크롤되면 즉시 확대
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!canExpandRef.current) return; // 초기 로딩 중 애니메이션 방지

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // 컨테이너 상단이 헤더 밑(약 120px)으로 올라갈 때 확대
      if (rect.top <= 120) {
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

  let currentPadding = 24;
  if (windowWidth >= 1024) currentPadding = 96;
  else if (windowWidth >= 768) currentPadding = 64;

  const unexpandedWidth = windowWidth > 0 ? (windowWidth - currentPadding * 2) : 1200;
  // 사용자가 요청한 1200x500 크기를 적용합니다.
  const unexpandedHeight = 500;

  // 가운데 정렬을 위한 x 좌표 이동값 계산
  const centerOffsetX = windowWidth > 0 ? (windowWidth - unexpandedWidth) / 2 - offsetLeft : 0;

  // 브라우저 크기 계산 전에는 애니메이션(너비 변동)을 방지하기 위해 빈 영역 렌더링
  if (windowWidth === 0) {
    return (
      <div ref={triggerRef} className="w-full flex flex-col mb-16" style={{ height: '500px' }}></div>
    );
  }

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
          initial={{ height: `${unexpandedHeight}px`, width: '100%', borderRadius: '2rem', border: '1px solid #E5E7EB' }}
          animate={{
            width: isExpanded ? '100vw' : (windowWidth > 0 ? `${unexpandedWidth}px` : '100%'),
            // 화면 전체를 완전히 덮되, 영상 원본 비율(16:9)이 깨져서 위아래가 잘리지 않도록 동적 픽셀 높이 계산
            height: isExpanded ? (windowHeight > 0 ? `${Math.max(windowHeight, windowWidth * 9 / 16)}px` : '100vh') : `${unexpandedHeight}px`,
            borderRadius: isExpanded ? '0rem' : '2rem',
            border: isExpanded ? '0px solid transparent' : '1px solid #E5E7EB',
            x: isExpanded ? -offsetLeft : centerOffsetX,
          }}
          transition={{ duration: isReady ? 0.6 : 0, ease: "easeInOut" }}
          className="overflow-hidden shadow-2xl bg-black relative z-[40]"
        >
          <video 
            className={`w-full h-full object-cover`} 
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
