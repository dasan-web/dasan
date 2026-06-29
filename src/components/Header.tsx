'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { navigationData } from '@/lib/navigation';

export default function Header() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/management')) {
    return null;
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileGrand, setActiveMobileGrand] = useState<string | null>(null);
  const [activeMobileMajor, setActiveMobileMajor] = useState<string | null>(null);
  const [activeGrand, setActiveGrand] = useState<string | null>(null);
  const [hoveredGrand, setHoveredGrand] = useState<string | null>(null);

  const [hiddenSlugs, setHiddenSlugs] = useState<string[]>([]);

  // Fetch hidden menus on mount
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

  // Filter GNB menu dynamically based on DB hidden state
  const getFilteredNavigation = () => {
    return navigationData
      .filter(grand => {
        const relativeGrandLink = grand.link.replace(/^\//, '');
        return !hiddenSlugs.includes(relativeGrandLink);
      })
      .map(grand => {
        const filteredMajors = grand.majors
          .map(major => {
            const filteredSubMenus = major.subMenus.filter(sub => {
              const relativeLink = sub.link.replace(/^\//, '');
              return !hiddenSlugs.includes(relativeLink);
            });
            return { ...major, subMenus: filteredSubMenus };
          })
          .filter(major => major.subMenus.length > 0);
        return { ...grand, majors: filteredMajors };
      })
      .filter(grand => grand.majors.length > 0);
  };

  const filteredNavigation = getFilteredNavigation();

  // Close menus and log visit on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);

    if (!pathname.startsWith('/management')) {
      fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pathname }),
      }).catch(err => console.error('Failed to log visit:', err));
    }
  }, [pathname]);

  const handleEnglishClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('영문 홈페이지 준비 중입니다. / English website is under preparation.');
  };

  return (
    <>
      <header
        className="w-full bg-white border-b border-gray-100 shadow-sm z-50 sticky top-0 relative"
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-brand-green origin-left z-50"
          style={{ scaleX }}
        />
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-24">
            {/* Logo: Hexagon Icon + DASAN | PHARMACEUTICAL */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img
                  src="/dasan_logo_new_1.png"
                  alt="다산제약"
                  className="h-9 lg:h-11 w-auto bg-white"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </Link>
            </div>

            {/* Desktop Navigation ( GNB ) */}
            <nav 
              className="hidden lg:flex space-x-14 h-full"
              onMouseLeave={() => setHoveredGrand(null)}
            >
              {filteredNavigation.map((grand) => {
                const colCount = grand.majors.length;
                
                // 각 대메뉴별 시작점/끝점 정렬 클래스 지정
                const alignClass = '-left-6 origin-top-left';

                const isActive = pathname.startsWith(grand.link);
                const isHighlighted = hoveredGrand === grand.name || (hoveredGrand === null && isActive);

                return (
                  <div
                     key={grand.name}
                     className="relative flex items-center h-full group"
                     onMouseEnter={() => setHoveredGrand(grand.name)}
                  >
                      <Link
                        href={grand.link}
                        onClick={() => setActiveGrand(activeGrand === grand.name ? null : grand.name)}
                        className={`text-[17px] lg:text-[19px] xl:text-[20px] font-pretendard font-medium tracking-tight transition-colors py-2 relative hover:text-brand-green ${isHighlighted ? 'text-brand-green' : 'text-[#221d1e]'}`}
                      >
                      {grand.name}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-green transform origin-left transition-transform duration-300 group-hover:scale-x-100 ${
                        isHighlighted ? 'scale-x-100' : 'scale-x-0'
                      }`} />
                    </Link>

                    {/* Localized Dropdown Menu Wrapper with Hover Bridge (CSS Hover - Aligned) */}
                    <div
                      className={`absolute top-20 ${alignClass} pt-4 z-50 ${activeGrand===grand.name ? 'opacity-100 visible pointer-events-auto translate-y-0' : 'opacity-0 invisible pointer-events-none translate-y-2'} group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300 ease-out`}
                      style={{
                        width: colCount === 1 ? '240px' : colCount === 2 ? '480px' : '700px'
                      }}
                    >
                      <div
                        className="w-full bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 text-gray-900 shadow-xl shadow-slate-900/5"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                          gap: '1.5rem'
                        }}
                      >
                        {grand.majors.map((major) => (
                          <div key={major.name} className="flex flex-col space-y-2 group">
                            <Link
                              href={major.subMenus[0]?.link || '#'}
                              onClick={() => {
                                setActiveGrand(null);
                                setHoveredGrand(null);
                              }}
                            >
                              <h3 className="text-sm lg:text-[15px] xl:text-[16px] font-extrabold uppercase tracking-wider text-gray-800 border-b border-gray-100 pb-1.5 text-left hover:text-brand-green group-hover:text-brand-green cursor-pointer">
                                {major.name}
                              </h3>
                            </Link>
                            <ul className="space-y-1.5 text-left">
                              {major.subMenus.map((sub) => (
                                <li key={sub.name}>
                                  {sub.link.startsWith('#') ? (
                                    <a
                                      href={sub.link}
                                      onClick={(e) => {
                                        handleEnglishClick(e);
                                        setActiveGrand(null);
                                        setHoveredGrand(null);
                                      }}
                                      className="text-gray-550 hover:text-brand-green text-[13px] lg:text-[14px] xl:text-[15px] font-semibold transition-colors block py-0.5 hover:translate-x-1 duration-200 transform"
                                    >
                                      {sub.name}
                                    </a>
                                  ) : (
                                    <Link
                                      href={sub.link}
                                      onClick={() => {
                                        setActiveGrand(null);
                                        setHoveredGrand(null);
                                      }}
                                      className={`text-gray-550 hover:text-brand-green text-[13px] lg:text-[14px] xl:text-[15px] font-semibold transition-colors block py-0.5 hover:translate-x-1 duration-200 transform ${
                                        pathname === sub.link ? 'text-brand-green font-bold' : ''
                                      }`}
                                    >
                                      {sub.name}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Language & Search utility */}
             <div 
              className="hidden lg:flex items-center space-x-6 text-sm lg:text-[15px] font-semibold text-gray-500"
            >
              {/* KOR | ENG */}
              <div className="flex items-center space-x-1.5 font-pretendard font-medium text-[#221d1e]">
                <span className="cursor-pointer">KOR</span>
                <span className="text-gray-300">|</span>
                <a href="#" onClick={handleEnglishClick} className="hover:text-brand-green transition-colors">ENG</a>
              </div>


            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Accordion) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-24 border-b border-gray-100">
            <span className="text-lg font-bold tracking-wider text-brand-green">
              DASAN MENU
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
            {filteredNavigation.map((grand) => {
              const isGrandActive = activeMobileGrand === grand.name;
              return (
                <div key={grand.name} className="border-b border-gray-50 pb-2">
                  {/* Level 0 Menu Button */}
                  <button
                    onClick={() =>
                      setActiveMobileGrand(isGrandActive ? null : grand.name)
                    }
                    className="flex items-center justify-between w-full py-3 px-2 text-gray-800 font-bold hover:text-brand-green text-left rounded-md transition-colors"
                  >
                    <span>{grand.name}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isGrandActive ? 'rotate-180 text-brand-green' : ''
                      }`}
                    />
                  </button>

                  {/* Level 1 Menu Area */}
                  <div
                    className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ${
                      isGrandActive ? 'max-h-[800px] mt-2 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {grand.majors.map((major) => {
                      const isMajorActive = activeMobileMajor === major.name;
                      return (
                        <div key={major.name} className="py-1">
                          <button
                            onClick={() =>
                              setActiveMobileMajor(isMajorActive ? null : major.name)
                            }
                            className="flex items-center justify-between w-full py-2 px-2 text-gray-600 text-sm font-semibold hover:text-brand-green text-left"
                          >
                            <span>{major.name}</span>
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-300 ${
                                isMajorActive ? 'rotate-180 text-brand-teal' : ''
                              }`}
                            />
                          </button>

                          {/* Level 2 Menu Area */}
                          <div
                            className={`pl-4 space-y-1 overflow-hidden transition-all duration-200 ${
                              isMajorActive ? 'max-h-[300px] mt-1 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            {major.subMenus.map((sub) => (
                              <React.Fragment key={sub.name}>
                                {sub.link.startsWith('#') ? (
                                  <a
                                    href={sub.link}
                                    onClick={(e) => {
                                      handleEnglishClick(e);
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center space-x-1.5 py-2 px-2 text-gray-500 hover:text-brand-green text-xs transition-colors"
                                  >
                                    <ChevronRight size={10} />
                                    <span>{sub.name}</span>
                                  </a>
                                ) : (
                                  <Link
                                    href={sub.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center space-x-1.5 py-2 px-2 text-gray-500 hover:text-brand-green text-xs transition-colors ${
                                      pathname === sub.link ? 'text-brand-green font-bold' : ''
                                    }`}
                                  >
                                    <ChevronRight size={10} />
                                    <span>{sub.name}</span>
                                  </Link>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Utilities */}
          <div className="p-6 border-t border-gray-150 bg-gray-50">
            <button
              onClick={(e) => {
                handleEnglishClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green text-sm font-semibold transition-colors bg-white"
            >
              <Globe size={16} />
              <span>English / 영문 홈페이지</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
