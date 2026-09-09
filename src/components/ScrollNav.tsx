'use client';

import React, { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';

export default function ScrollNav() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  const sections = [
    { 
      id: 'hero', 
      label: isEnglish ? 'Intro' : '소개',
      activeColor: 'bg-white border-2 border-gray-400 shadow-[0_0_12px_rgba(255,255,255,0.9)] ring-2 ring-gray-400/50',
      inactiveColor: 'bg-white/70 border border-gray-400/60 shadow-2xs hover:bg-white',
      pingColor: 'bg-white/40 border border-gray-300'
    },
    { 
      id: 'core-business', 
      label: isEnglish ? 'Core Business' : '주요 사업영역',
      activeColor: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] ring-2 ring-amber-300',
      inactiveColor: 'bg-amber-400/60 hover:bg-amber-400',
      pingColor: 'bg-amber-400/30 border border-amber-300'
    },
    { 
      id: 'products', 
      label: isEnglish ? 'Product List' : '제품리스트',
      activeColor: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)] ring-2 ring-red-400',
      inactiveColor: 'bg-red-500/60 hover:bg-red-500',
      pingColor: 'bg-red-500/30 border border-red-400'
    },
    { 
      id: 'product-news', 
      label: isEnglish ? 'News (Press, Product)' : '뉴스(보도자료,제품소식)',
      activeColor: 'bg-brand-green shadow-green-glow ring-2 ring-green-400',
      inactiveColor: 'bg-brand-green/60 hover:bg-brand-green',
      pingColor: 'bg-brand-green/25 border border-brand-green/35'
    }
  ];

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // run once initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      let targetTop: number;
      if (id === 'products') {
        // 제품리스트 섹션(320vh 스크롤 애니메이션) 클릭 시, 
        // 텍스트/알약 줌 애니메이션이 완료되어 제품 리스트가 완전히 보이는 지점으로 부드럽게 이동
        const elTop = el.getBoundingClientRect().top + window.pageYOffset;
        targetTop = elTop + (el.offsetHeight - window.innerHeight) * 0.92;
      } else {
        const headerOffset = 140;
        targetTop = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      }

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-0 md:right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-4 select-none pr-1">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <div 
            key={section.id} 
            className="group relative flex items-center justify-end"
          >
            {/* Hover Tooltip Label */}
            <span 
              onClick={() => scrollToSection(section.id)}
              className="absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-black text-brand-blue bg-white border border-gray-150 shadow-sm opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap cursor-pointer hover:text-brand-green"
            >
              {section.label}
            </span>

            {/* Glowing Interactive Dot Indicator */}
            <button
              onClick={() => scrollToSection(section.id)}
              aria-label={`Scroll to ${section.label}`}
              className="relative w-6 h-6 flex items-center justify-center focus:outline-none cursor-pointer"
            >
              {/* Outer Pulsing Glow Circle for Active Section */}
              {isActive && (
                <span className={`absolute w-6 h-6 rounded-full animate-ping duration-1000 pointer-events-none left-0 top-0 ${section.pingColor}`} />
              )}
              {/* Core dot with customized colors */}
              <span 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-350 ${
                  isActive 
                    ? `${section.activeColor} scale-125`
                    : `${section.inactiveColor} hover:scale-110`
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
