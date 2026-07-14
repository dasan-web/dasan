'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  
  // 뷰포트 기준 왼쪽 여백을 계산하여 영상을 화면 정중앙에 100vw로 배치하기 위함
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setOffsetLeft(-rect.left);
      }
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // 애니메이션 시작 시점을 뷰포트 최상단이 아닌, 화면 상단에서 20vh 내려온 지점(영상이 온전히 보이는 시점)으로 설정합니다.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20vh", "end end"]
  });

  // 가로 50vw, 세로 40vh의 온전한 형태에서 화면 전체(100vw, 100vh)로 확장
  const width = useTransform(scrollYProgress, [0, 1], ['50vw', '100vw']);
  const height = useTransform(scrollYProgress, [0, 1], ['40vh', '100vh']);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['3rem', '0rem']);
  
  // 확장이 진행됨에 따라 영상 전체를 위로 끌어올려(-20vh), 결과적으로 상단 고정 메뉴까지 완전히 덮어버리도록 설계
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '-20vh']);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] mb-[calc(40vh+4rem)]">
      {/* 
        영상이 화면 중앙 부근(top-[20vh])에 도달했을 때 딱 걸리게(sticky) 만듭니다.
        이때 영상은 잘리지 않고 온전히 다 보이는 상태(그림2)입니다.
      */}
      <div 
        className="sticky top-[20vh] h-[40vh] flex justify-center items-start overflow-visible z-[9999]"
        style={{ 
          width: '100vw', 
          transform: `translateX(${offsetLeft}px)` 
        }}
      >
        <motion.div 
          style={{ width, height, borderRadius, y }}
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
  );
}
