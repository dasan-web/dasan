'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Layers, FileText, ArrowUpRight, Calendar, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { sampleNewsItems, ProductNewsItem } from '@/components/ProductNewsBoard';

interface MainProductNewsProps {
  initialItems?: ProductNewsItem[];
}

export default function MainProductNews({ initialItems }: MainProductNewsProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedModalItem, setSelectedModalItem] = useState<ProductNewsItem | null>(null);

  const allItems = initialItems && initialItems.length > 0 ? initialItems : sampleNewsItems;

  const categories = [
    { label: isEnglish ? 'All' : '전체', value: '전체' },
    { label: isEnglish ? 'New Product' : '신제품', value: '신제품' },
    { label: isEnglish ? 'Regulatory' : '허가변경', value: '허가변경' },
    { label: isEnglish ? 'Pill Spec' : '낱알변경', value: '낱알변경' },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === '전체') return allItems;
    return allItems.filter(item => item.category === activeCategory);
  }, [allItems, activeCategory]);

  const cardsPerPage = 3;
  const total = filteredItems.length;

  const handlePrev = () => {
    if (total <= cardsPerPage) return;
    setDirection(-1);
    setStartIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    if (total <= cardsPerPage) return;
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % total);
  };

  const visibleItems = useMemo(() => {
    if (total === 0) return [];
    const count = Math.min(cardsPerPage, total);
    const items = [];
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % total;
      items.push(filteredItems[idx]);
    }
    return items;
  }, [filteredItems, startIndex, total, cardsPerPage]);

  const getCategoryMeta = (category: string) => {
    switch (category) {
      case '신제품':
        return {
          label: isEnglish ? 'New Product' : '신제품',
          badgeBg: 'bg-[#84bd00] text-white',
          themeGradient: 'from-[#84bd00]/20 via-emerald-400/10 to-gray-50',
          icon: <Sparkles className="w-6 h-6 text-[#84bd00]" />,
          borderHover: 'hover:border-[#84bd00]/60',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(132,189,0,0.15)]',
        };
      case '허가변경':
        return {
          label: isEnglish ? 'Regulatory' : '허가변경',
          badgeBg: 'bg-brand-green text-white',
          themeGradient: 'from-brand-green/20 via-teal-400/10 to-gray-50',
          icon: <ShieldCheck className="w-6 h-6 text-brand-green" />,
          borderHover: 'hover:border-brand-green/60',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(0,137,83,0.15)]',
        };
      case '낱알변경':
        return {
          label: isEnglish ? 'Pill Spec' : '낱알변경',
          badgeBg: 'bg-teal-600 text-white',
          themeGradient: 'from-teal-500/20 via-cyan-400/10 to-gray-50',
          icon: <Layers className="w-6 h-6 text-teal-600" />,
          borderHover: 'hover:border-teal-500/60',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)]',
        };
      default:
        return {
          label: isEnglish ? 'Other Notice' : '기타변경',
          badgeBg: 'bg-slate-700 text-white',
          themeGradient: 'from-slate-500/15 via-gray-400/10 to-gray-50',
          icon: <FileText className="w-6 h-6 text-slate-600" />,
          borderHover: 'hover:border-slate-400/60',
          glow: 'group-hover:shadow-[0_20px_40px_rgba(100,116,139,0.12)]',
        };
    }
  };

  return (
    <section id="product-news" className="scroll-mt-36 md:scroll-mt-40 pt-2 pb-14 md:pt-4 md:pb-20 bg-white relative font-pretendard">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">
        
        {/* Section Header with Category Tabs */}
        <ScrollReveal y={50} duration={1.2}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
            <div className="flex flex-col">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-green tracking-tight">
                Product News
              </h2>
              <div className="w-full h-1.5 bg-brand-green mt-2 rounded-full" />
            </div>

            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              {/* Slider Arrows (Prev / Next Page Buttons) */}
              {total > cardsPerPage && (
                <div className="flex items-center gap-1.5 mr-1">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 hover:border-brand-green text-gray-500 hover:text-brand-green hover:bg-brand-green/5 flex items-center justify-center transition-colors duration-200 cursor-pointer bg-white shadow-2xs"
                    aria-label={isEnglish ? "Previous page" : "이전 페이지"}
                    title={isEnglish ? "Previous" : "이전 페이지"}
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 hover:border-brand-green text-gray-500 hover:text-brand-green hover:bg-brand-green/5 flex items-center justify-center transition-colors duration-200 cursor-pointer bg-white shadow-2xs"
                    aria-label={isEnglish ? "Next page" : "다음 페이지"}
                    title={isEnglish ? "Next" : "다음 페이지"}
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              )}

              {/* View All Button */}
              <Link
                href={`${basePath}/business/finished/news`}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white text-xs lg:text-sm font-semibold rounded-full transition-colors duration-300 hover:shadow-green-glow group cursor-pointer shrink-0"
              >
                <span>{isEnglish ? 'View All' : '전체보기'}</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Premium Wide Cards Grid with Smooth Book-like Page Slide Transition */}
        <ScrollReveal delay={0.15} y={60} duration={1.2}>
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${activeCategory}-${startIndex}`}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? '50%' : dir < 0 ? '-50%' : 0,
                    opacity: 0,
                    scale: 0.98,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1], // Ultra-smooth magazine page turn easing
                    },
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? '-50%' : dir < 0 ? '50%' : 0,
                    opacity: 0,
                    scale: 0.98,
                    transition: {
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
              >
                {visibleItems.map((item, idx) => {
                  const meta = getCategoryMeta(item.category);
                  return (
                    <div
                      key={`${item.id}-${idx}`}
                      onClick={() => setSelectedModalItem(item)}
                      className="relative bg-white rounded-3xl overflow-hidden border border-gray-200/90 hover:border-brand-green transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,137,83,0.22)] flex flex-col justify-between cursor-pointer group shadow-xs p-6 sm:p-7"
                      style={{ minHeight: '340px' }}
                    >
                      {/* Expanding Circle Background Effect (Fades out to white as it shrinks) */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-green scale-0 opacity-0 group-hover:scale-[25] group-hover:opacity-100 transition-all duration-700 ease-out origin-center pointer-events-none z-0"
                        aria-hidden="true"
                      />

                      {/* Top Header: Badge, Date & Icon */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-2xl bg-gray-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-500">
                              {React.cloneElement(meta.icon as React.ReactElement<any>, {
                                className: "w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-500"
                              })}
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-2xs group-hover:bg-white group-hover:text-brand-green transition-all duration-500 ${meta.badgeBg}`}>
                              {meta.label}
                            </span>
                            {item.isNew && (
                              <span className="bg-amber-400 text-gray-900 font-extrabold text-[10px] px-1.5 py-0.5 rounded shadow-2xs">
                                NEW
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-white/90 font-medium transition-colors duration-500">
                            <Calendar className="w-3.5 h-3.5 text-brand-green group-hover:text-white transition-colors duration-500" />
                            <span>{item.date.replace(/-/g, '.')}</span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-3">
                          {/* Title (2 lines max) */}
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-white leading-snug tracking-tight transition-colors duration-500 line-clamp-2">
                            {item.title}
                          </h3>

                          {/* Short Summary (2 lines) */}
                          <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/85 leading-relaxed line-clamp-2 font-normal transition-colors duration-500">
                            {item.content || (isEnglish ? 'Detailed information regarding this formulation notice.' : '다산제약의 주요 의약품 및 제제 변경 관련 안내사항입니다.')}
                          </p>
                        </div>
                      </div>

                      {/* Footer Row (Aligned to far right) */}
                      <div className="relative z-10 pt-5 mt-6 border-t border-gray-100 group-hover:border-white/20 flex items-center justify-end transition-colors duration-500">
                        <span className="text-xs font-bold text-brand-green group-hover:text-white inline-flex items-center gap-1 group-hover:translate-x-1 transition-all duration-500">
                          {isEnglish ? 'View Notice' : '상세보기'}
                          <ArrowRight className="w-3.5 h-3.5 text-brand-green group-hover:text-white transition-colors duration-500" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

      </div>

      {/* Quick View Interactive Modal */}
      <AnimatePresence>
        {selectedModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalItem(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-1 space-y-5">
                {/* Modal Header */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${getCategoryMeta(selectedModalItem.category).badgeBg}`}>
                    {getCategoryMeta(selectedModalItem.category).label}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {selectedModalItem.date.replace(/-/g, '.')}
                  </span>
                  <span className="text-xs text-brand-green font-semibold bg-brand-green/10 px-2.5 py-0.5 rounded-full ml-auto">
                    {isEnglish ? 'Views' : '조회수'} {selectedModalItem.views || 0}
                  </span>
                </div>

                {/* Modal Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  {selectedModalItem.title}
                </h3>

                {/* Modal Content */}
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line py-3 px-4 bg-gray-50/80 rounded-2xl border border-gray-100 font-normal">
                  {selectedModalItem.content || (isEnglish ? 'Detailed content for this product notice.' : '본 제품소식에 대한 세부 내용입니다.')}
                </div>

                {/* Attachment Link */}
                {selectedModalItem.file_name && (
                  <div className="pt-2 flex justify-start">
                    <a
                      href={selectedModalItem.file_url || '#'}
                      download={selectedModalItem.file_name}
                      onClick={(e) => {
                        if (!selectedModalItem.file_url) {
                          e.preventDefault();
                          alert(isEnglish ? 'File download is ready.' : '첨부파일 다운로드 준비 중입니다.');
                        }
                      }}
                      className="inline-flex items-center space-x-2 text-xs sm:text-sm text-brand-green bg-brand-green/10 hover:bg-brand-green/20 px-4 py-2.5 rounded-xl border border-brand-green/30 transition-colors font-bold shadow-2xs"
                    >
                      <Download className="w-4 h-4 text-brand-green" />
                      <span>{selectedModalItem.file_name}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`${basePath}/business/finished/news`}
                  className="text-xs sm:text-sm font-bold text-brand-green hover:underline inline-flex items-center gap-1"
                >
                  {isEnglish ? 'Go to Product News Board' : '제품소식 게시판 바로가기'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setSelectedModalItem(null)}
                  className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  {isEnglish ? 'Close' : '닫기'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
