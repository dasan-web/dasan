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
      activeColor: 'bg-white border-2 border-gray-400 shadow-md',
      inactiveColor: 'bg-white/80 border border-gray-300 shadow-2xs hover:bg-white hover:border-gray-500',
      pingColor: 'bg-white/40 border border-gray-300'
    },
    { 
      id: 'products', 
      label: isEnglish ? 'Product List' : '제품리스트',
      activeColor: 'bg-[#FACC15] shadow-[0_0_12px_rgba(250,204,21,0.7)]',
      inactiveColor: 'bg-[#FACC15]/40 hover:bg-[#FACC15]',
      pingColor: 'bg-[#FACC15]/30 border border-amber-400/40'
    },
    { 
      id: 'product-news', 
      label: isEnglish ? 'News & Media' : '뉴스 & 소식',
      activeColor: 'bg-brand-green shadow-green-glow',
      inactiveColor: 'bg-brand-green/40 hover:bg-brand-green',
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
      const headerOffset = 140;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-0 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-4 select-none pr-1">
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
