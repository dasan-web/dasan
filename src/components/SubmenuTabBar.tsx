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
  const [coords, setCoords] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const [hoverCoords, setHoverCoords] = useState<{ left: number; width: number; opacity: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [hiddenSlugs, setHiddenSlugs] = useState<string[]>([]);
  const pathname = usePathname();
  const isEnglish = pathname ? pathname.startsWith('/en') : false;
  const basePath = isEnglish ? '/en' : '';

  useEffect(() => {
    fetch('/api/navigation/hidden', { cache: 'no-store' })
      .then(res => res.json())
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

  // Update active coords on mount or route change
  useEffect(() => {
    if (activeRef.current) {
      const activeEl = activeRef.current;
      setCoords({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [currentPath, filteredSubMenus]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    setHoverCoords({
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoverCoords(null);
  };

  const currentCoords = hoverCoords || coords;

  return (
    <div className="w-full overflow-x-auto pb-3 mt-4 scroll-smooth">
      <div 
        ref={containerRef}
        className="relative flex flex-nowrap items-center md:justify-center gap-x-8 min-w-max mx-auto px-4 select-none animate-fade-in whitespace-nowrap"
      >
        {/* Sliding Underline Indicator */}
        <div
          className="absolute bottom-[-1px] h-[3px] bg-brand-green transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            left: `${currentCoords.left}px`,
            width: `${currentCoords.width}px`,
            opacity: currentCoords.opacity,
          }}
        />

      {filteredSubMenus.map((sub) => {
        const isActive = currentPath === sub.link;
        const isEnglishBtn = sub.link === '#english' || sub.name === '영문';

        if (isEnglishBtn) {
          return (
            <button
              key={sub.enName || sub.name}
              onMouseEnter={(e) => {
                // Mimic Link ref behavior for the hover indicator
                const el = e.currentTarget;
                setHoverCoords({
                  left: el.offsetLeft,
                  width: el.offsetWidth,
                  opacity: 1,
                });
              }}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                alert('영문 홈페이지 준비 중입니다.');
              }}
              className="relative pb-2 text-xs md:text-sm font-bold tracking-tight text-center transition-all duration-300 active:scale-95 text-gray-400 hover:text-brand-blue cursor-pointer focus:outline-none"
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
            className={`relative pb-2 text-xs md:text-sm font-bold tracking-tight text-center transition-all duration-300 active:scale-95 ${
              isActive
                ? 'text-brand-green'
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
