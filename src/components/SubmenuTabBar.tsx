'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubMenu {
  name: string;
  enName?: string;
  link: string;
}

interface SubmenuTabBarProps {
  subMenus: SubMenu[];
  currentPath: string;
}

export default function SubmenuTabBar({ subMenus, currentPath }: SubmenuTabBarProps) {
  const [coords, setCoords] = useState<{ left: number; top: number; width: number; opacity: number }>({ left: 0, top: 0, width: 0, opacity: 0 });
  const [hoverCoords, setHoverCoords] = useState<{ left: number; top: number; width: number; opacity: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [hiddenSlugs, setHiddenSlugs] = useState<string[]>(['business/finished/pharmacy']);
  const pathname = usePathname();
  const isEnglish = pathname ? pathname.startsWith('/en') : false;
  const basePath = isEnglish ? '/en' : '';

  useEffect(() => {
    fetch('/api/navigation/hidden', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) return null;
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) return res.json();
        return null;
      })
      .then(data => {
        if (data && Array.isArray(data.hiddenKeys)) {
          setHiddenSlugs(data.hiddenKeys);
        }
      })
      .catch(err => console.error('Failed to load hidden menus:', err));
  }, []);

  const filteredSubMenus = useMemo(() => {
    return subMenus.filter(sub => {
      const relativeLink = sub.link.replace(/^\//, '');
      return !hiddenSlugs.includes(relativeLink);
    });
  }, [subMenus, hiddenSlugs]);

  // Update active coords
  const updateCoords = () => {
    if (activeRef.current) {
      const activeEl = activeRef.current;
      setCoords({
        left: activeEl.offsetLeft,
        top: activeEl.offsetTop + activeEl.offsetHeight - 2,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    updateCoords();
    
    const observer = new ResizeObserver(() => {
      updateCoords();
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    window.addEventListener('resize', updateCoords);
    return () => {
      window.removeEventListener('resize', updateCoords);
      observer.disconnect();
    };
  }, [currentPath, filteredSubMenus]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const el = e.currentTarget;
    setHoverCoords({
      left: el.offsetLeft,
      top: el.offsetTop + el.offsetHeight - 2,
      width: el.offsetWidth,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoverCoords(null);
  };

  const currentCoords = hoverCoords || coords;

  if (filteredSubMenus.length === 0) return null;

  return (
    <div className="w-full mt-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-x-hidden">
      <div 
        ref={containerRef}
        className="relative flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-8 gap-y-2 max-w-5xl mx-auto px-2 sm:px-4 select-none animate-fade-in"
      >
        {/* Sliding Underline Indicator */}
        <div
          className="absolute h-[2.5px] bg-brand-green transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
          style={{
            left: `${currentCoords.left}px`,
            top: `${currentCoords.top}px`,
            width: `${currentCoords.width}px`,
            opacity: currentCoords.opacity,
          }}
        />

        {filteredSubMenus.map((sub) => {
          const isActive = currentPath === sub.link || (currentPath === '/business/api' && sub.link === '/business/api/raw');
          const isEnglishBtn = sub.link === '#english' || sub.name === '영문';

          if (isEnglishBtn) {
            return (
              <button
                key={sub.enName || sub.name}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  alert('영문 홈페이지 준비 중입니다.');
                }}
                className="relative pb-1 text-[11px] sm:text-xs md:text-sm font-bold tracking-tight text-center transition-all duration-300 active:scale-95 text-gray-400 hover:text-brand-blue cursor-pointer focus:outline-none whitespace-nowrap"
              >
                {sub.enName || sub.name}
              </button>
            );
          }

          return (
            <Link
              key={isEnglish ? (sub.enName || sub.name) : sub.name}
              href={`${basePath}${sub.link}`}
              ref={isActive ? activeRef : null}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`relative pb-1 text-[11px] sm:text-xs md:text-sm font-bold tracking-tight text-center transition-all duration-300 active:scale-95 whitespace-nowrap ${
                isActive
                  ? 'text-brand-green font-extrabold'
                  : 'text-gray-400 hover:text-brand-blue'
              }`}
            >
              {isEnglish ? (sub.enName || sub.name) : sub.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
