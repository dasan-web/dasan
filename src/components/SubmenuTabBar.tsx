'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface SubMenu {
  name: string;
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
    <div 
      ref={containerRef}
      className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-4 max-w-full border-b border-gray-100 pb-3 select-none animate-fade-in px-4 w-full"
    >
      {/* Sliding Underline Indicator */}
      <div
        className="absolute bottom-[8px] h-[3px] bg-brand-green rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          left: `${currentCoords.left}px`,
          width: `${currentCoords.width}px`,
          opacity: currentCoords.opacity,
        }}
      />

      {filteredSubMenus.map((sub) => {
        const isActive = currentPath === sub.link;
        const isEnglish = sub.link === '#english' || sub.name === '영문';

        if (isEnglish) {
          return (
            <button
              key={sub.name}
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
              className="relative pb-3 text-xs md:text-sm font-bold tracking-tight text-center transition-all duration-300 active:scale-95 text-gray-400 hover:text-brand-blue cursor-pointer focus:outline-none"
            >
              {sub.name}
            </button>
          );
        }

        return (
          <Link
            key={sub.name}
            href={sub.link}
            ref={isActive ? activeRef : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative pb-3 text-xs md:text-sm font-bold tracking-tight text-center transition-all duration-300 active:scale-95 ${
              isActive
                ? 'text-brand-green'
                : 'text-gray-400 hover:text-brand-blue'
            }`}
          >
            {sub.name}
          </Link>
        );
      })}
    </div>
  );
}
