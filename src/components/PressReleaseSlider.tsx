'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, X, Calendar, Eye, Newspaper, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

interface NewsCard {
  id: number;
  image: string;
  title: string;
  date: string;
  content?: string;
  views?: number;
}

const newsCards: NewsCard[] = [
  {
    id: 1,
    image: '/press_exhibition.png',
    title: "다산제약, 과학기술정보통신부 '우수 기업부설연구소' 지정",
    date: '2025.12.23',
    content: "다산제약이 과학기술정보통신부로부터 '우수 기업부설연구소'로 지정되었습니다. 연구 역량과 우수한 R&D 환경을 바탕으로 차세대 제제 기술 혁신을 선도하겠습니다.",
    views: 142
  },
  {
    id: 2,
    image: '/press_factory.png',
    title: "다산제약, 코스닥 상장 '청신호'... 130억 규모 프리IPO 유치",
    date: '2025.12.23',
    content: "다산제약이 성공적인 코스닥 시장 상장을 위해 130억원 규모의 프리IPO 유치에 성공하였습니다. 이를 바탕으로 글로벌 CDMO 역량을 대폭 강화할 계획입니다.",
    views: 289
  },
  {
    id: 3,
    image: '/press_ceo.png',
    title: "다산제약, '참 좋은 중소기업' 기술혁신 분야 중기부 장관상 수상",
    date: '2025.12.10',
    content: "다산제약이 중소벤처기업부가 주최하는 '참 좋은 중소기업' 시상식에서 독자적인 제제 기술 혁신 성과를 인정받아 장관상을 수상하는 영예를 안았습니다.",
    views: 195
  },
  {
    id: 4,
    image: '/press_exhibition.png',
    title: "다산제약, CPHI Worldwide 2025 참가... 글로벌 CDMO 파트너십 확대",
    date: '2025.10.15',
    content: "유럽 최대 제약 바이오 박람회에 참가하여 다산제약의 특화된 제제 기술(DDS) 및 글로벌 CDMO 서비스를 홍보하고 파트너십을 체결하였습니다.",
    views: 310
  },
  {
    id: 5,
    image: '/press_factory.png',
    title: "다산제약 제2공장 스마트 GMP 자동화 생산설비 증설 준공",
    date: '2025.08.20',
    content: "글로벌 규격에 부합하는 최첨단 스마트 생산 라인을 완공하여 생산 능력을 2배 이상 확대하고 고품질 의약품 공급 체계를 구축하였습니다.",
    views: 245
  },
  {
    id: 6,
    image: '/press_ceo.png',
    title: "다산제약, 혁신 신약 서방성 복합제 국내 특허 등록 완료",
    date: '2025.06.12',
    content: "독자적인 마이크로 펠렛 코팅 기술을 적용한 차세대 서방형 복합제 제제에 대한 특허 등록을 완료하여 기술 경쟁력을 확고히 하였습니다.",
    views: 180
  }
];

interface DBNewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
  file_url?: string | null;
  file_name?: string | null;
}

interface PressReleaseSliderProps {
  initialNews?: DBNewsItem[];
}

export default function PressReleaseSlider({ initialNews }: PressReleaseSliderProps) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const defaultImages = [
    '/press_exhibition.png',
    '/press_factory.png',
    '/press_ceo.png'
  ];

  // Combine database news items with default fallback news
  const dbCards = (initialNews && initialNews.length > 0)
    ? initialNews.map((item, index) => ({
        id: item.id,
        image: item.file_url || defaultImages[index % defaultImages.length],
        title: item.title,
        date: new Date(item.created_at)
          .toLocaleDateString('ko-KR')
          .replace(/\. /g, '.')
          .replace(/\.$/, ''),
        content: item.content,
        views: item.views
      }))
    : [];

  const cards: NewsCard[] = [...dbCards];
  const fallbackCards = newsCards.filter(
    defaultCard => !dbCards.some(dbCard => dbCard.title === defaultCard.title)
  );
  for (const fb of fallbackCards) {
    cards.push(fb);
  }

  const cardsPerPage = 3;
  const total = cards.length;

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

  const visibleCards = useMemo(() => {
    const visible = [];
    if (total === 0) return [];
    const count = Math.min(cardsPerPage, total);
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % total;
      visible.push(cards[idx]);
    }
    return visible;
  }, [cards, startIndex, total, cardsPerPage]);

  return (
    <section id="press-release" className="pt-10 pb-14 md:pt-14 md:pb-20 bg-white relative font-pretendard">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">
        
        {/* Section Header */}
        <ScrollReveal y={50} duration={1.2}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-brand-green tracking-tight">
                Press Release
              </h2>
              <div className="w-full h-1.5 bg-brand-green mt-2" />
            </div>

            <div className="flex items-center gap-3">
              {/* Navigation Arrows (Prev / Next Buttons) */}
              {total > cardsPerPage && (
                <div className="flex items-center gap-1.5 mr-1">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 hover:border-brand-green text-gray-500 hover:text-brand-green hover:bg-brand-green/5 flex items-center justify-center transition-colors duration-200 cursor-pointer bg-white shadow-2xs"
                    aria-label={isEnglish ? "Previous slide" : "이전 페이지"}
                    title={isEnglish ? "Previous" : "이전 페이지"}
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 hover:border-brand-green text-gray-500 hover:text-brand-green hover:bg-brand-green/5 flex items-center justify-center transition-colors duration-200 cursor-pointer bg-white shadow-2xs"
                    aria-label={isEnglish ? "Next slide" : "다음 페이지"}
                    title={isEnglish ? "Next" : "다음 페이지"}
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              )}

              {/* View All Button */}
              <Link
                href={`${basePath}/contact/newsroom/press`}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white text-xs lg:text-sm font-semibold rounded-full transition-colors duration-300 hover:shadow-green-glow group cursor-pointer"
              >
                <span>{isEnglish ? 'View All' : '전체보기'}</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Visual Animated Press Cards Grid (3 Columns) with Smooth Page Slide */}
        <ScrollReveal delay={0.15} y={60} duration={1.2}>
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={startIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 45 : dir < 0 ? -45 : 0,
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                      ease: [0.25, 1, 0.5, 1],
                    },
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -45 : dir < 0 ? 45 : 0,
                    opacity: 0,
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 1, 0.5, 1],
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
              >
                {visibleCards.map((card, idx) => (
                  <motion.div
                    key={`${card.id}-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: idx * 0.03 }}
                    onClick={() => setSelectedCard(card)}
                    className="relative bg-white rounded-3xl overflow-hidden border border-gray-200/90 hover:border-brand-green transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,137,83,0.22)] flex flex-col justify-between cursor-pointer group shadow-xs p-5 sm:p-6"
                    style={{ minHeight: '380px' }}
                  >
                  {/* Expanding Circle Background Ripple Effect (Slower, ultra-smooth gradual wave) */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-green scale-0 opacity-0 group-hover:scale-[26] group-hover:opacity-100 transition-all duration-[2200ms] ease-out origin-center pointer-events-none z-0"
                    aria-hidden="true"
                  />

                  {/* Top Content Area */}
                  <div className="relative z-10">
                    {/* Badge, Icon & Date Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-2xl bg-gray-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-[1500ms] shadow-2xs">
                          <Newspaper className="w-4.5 h-4.5 text-brand-green group-hover:text-white transition-colors duration-[1500ms]" />
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-brand-green group-hover:bg-white text-white group-hover:text-brand-green shadow-2xs transition-all duration-[1500ms]">
                          PRESS
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-white/90 font-medium transition-colors duration-[1500ms]">
                        <Calendar className="w-3.5 h-3.5 text-brand-green group-hover:text-white transition-colors duration-[1500ms]" />
                        <span>{card.date}</span>
                      </div>
                    </div>

                    {/* Press Image / Photo Thumbnail */}
                    {card.image && (
                      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-100 border border-gray-100 group-hover:border-white/25 transition-all duration-500 shadow-2xs">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                      </div>
                    )}

                    {/* News Headline Title (2 lines max) */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-white leading-snug tracking-tight transition-colors duration-[1500ms] line-clamp-2 mb-2">
                      {card.title}
                    </h3>

                    {/* Short Description Preview */}
                    <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/85 font-normal leading-relaxed line-clamp-2 mb-2 transition-colors duration-[1500ms]">
                      {card.content ? card.content.replace(/<[^>]*>/g, '') : ''}
                    </p>
                  </div>

                  {/* Bottom Date & Action Area */}
                  <div className="relative z-10 pt-4 mt-4 flex items-end justify-between">
                    {/* Date indicator in normal state */}
                    <div className="text-gray-400 group-hover:text-white/80 transition-colors duration-[1500ms]">
                      <span className="text-2xl font-black text-gray-900 group-hover:text-white transition-colors duration-[1500ms] block leading-none">
                        {card.date ? card.date.split('-')[2] || card.date.split('.')[2] || '01' : '01'}
                      </span>
                      <span className="text-[11px] font-medium block mt-1">
                        {card.date ? `${card.date.split('-')[0] || card.date.split('.')[0]}.${card.date.split('-')[1] || card.date.split('.')[1]}` : ''}
                      </span>
                    </div>

                    {/* Normal State: subtle arrow link */}
                    <span className="text-xs font-bold text-brand-green group-hover:opacity-0 transition-opacity duration-300 inline-flex items-center gap-1 pr-1">
                      {isEnglish ? 'Read Press' : '상세보기'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Corner White Concentric Cutout Notch with Floating Black Circle Action Button */}
                  <div className="absolute bottom-0 right-0 w-[112px] h-[112px] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-[1000ms] ease-out z-30 overflow-hidden transform scale-90 group-hover:scale-100 origin-bottom-right">
                    {/* SVG Concentric Arc Notch */}
                    <svg className="w-full h-full" viewBox="0 0 112 112" fill="none">
                      <path
                        d="M 112,16 C 112,26 96,38 76,38 A 38 38 0 0 0 38,76 C 38,96 26,112 16,112 L 112,112 Z"
                        fill="white"
                      />
                    </svg>
                    
                    {/* Floating Black Circle Action Button with Dynamic Scale Effect */}
                    <div
                      className="absolute w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg transform scale-85 group-hover:scale-105 active:scale-95 transition-all duration-[700ms] ease-out"
                      style={{ right: '12px', bottom: '12px' }}
                    >
                      <ArrowRight className="w-5 h-5 stroke-[2.4] transition-transform duration-[700ms] group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

      </div>

      {/* Modern Detail View Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-1 space-y-5">
                {/* Modal Header */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                  <span className="bg-brand-green text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    PRESS RELEASE
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {selectedCard.date}
                  </span>
                  <span className="text-xs text-brand-green font-semibold bg-brand-green/10 px-2.5 py-0.5 rounded-full ml-auto">
                    {isEnglish ? 'Views' : '조회수'} {selectedCard.views || 0}
                  </span>
                </div>

                {/* Modal Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  {selectedCard.title}
                </h3>

                {/* Optional Modal Image */}
                {selectedCard.image && (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xs border border-gray-100">
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Modal Content */}
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line py-3 px-4 bg-gray-50/80 rounded-2xl border border-gray-100 font-normal">
                  {selectedCard.content ? selectedCard.content.replace(/<[^>]*>/g, '') : ''}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`${basePath}/contact/newsroom/press`}
                  className="text-xs sm:text-sm font-bold text-brand-green hover:underline inline-flex items-center gap-1"
                >
                  {isEnglish ? 'Go to Newsroom' : '보도자료 게시판 바로가기'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setSelectedCard(null)}
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
