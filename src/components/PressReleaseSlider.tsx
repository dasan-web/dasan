'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowRight, X } from 'lucide-react';
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
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const defaultImages = [
    '/press_exhibition.png',
    '/press_factory.png',
    '/press_ceo.png'
  ];

  // Combine database news items with default fallback news to make sure we always have enough items to show
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

  // Display exactly 3 cards total: dbCards first, then fill up with default cards
  const cards: NewsCard[] = [...dbCards];
  if (cards.length < 3) {
    const fallbackCards = newsCards.filter(
      defaultCard => !dbCards.some(dbCard => dbCard.title === defaultCard.title)
    );
    for (const fb of fallbackCards) {
      if (cards.length >= 3) break;
      cards.push(fb);
    }
  } else {
    cards.splice(3);
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getVisibleCards = () => {
    const visible = [];
    const total = cards.length;
    if (total === 0) return [];
    const count = Math.min(3, total);
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % total;
      visible.push(cards[idx]);
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  const renderLinkedText = (text: string) => {
    if (!text) return '';
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green hover:underline break-all font-bold"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <section className="pt-6 pb-6 md:pt-8 md:pb-8 bg-white relative">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">
        {/* Header line */}
        <ScrollReveal y={50} duration={1.2}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-pretendard font-semibold text-brand-green tracking-tight">
                Press Release
              </h2>
              <div className="w-full h-1.5 bg-brand-green mt-2" />
            </div>
            <Link
              href="/contact/newsroom/press"
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white text-xs lg:text-sm font-pretendard font-semibold rounded-full transition-all duration-300 hover:shadow-green-glow hover:-translate-y-0.5 group cursor-pointer"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
        {/* Carousel Container */}
        <ScrollReveal delay={0.2} y={80} duration={1.3}>
          <div className="relative flex items-center">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute -left-4 md:-left-8 lg:-left-12 xl:-left-12 z-20 w-10 h-10 lg:w-11 lg:h-11 bg-gray-50 border border-gray-150 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-white transition-all duration-200 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            {/* Cards Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10 overflow-hidden pt-2 pb-4">
              {visibleCards.map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  onClick={() => setSelectedCard(card)}
                  className="bg-[#F8F9FA] rounded-3xl overflow-hidden border border-gray-150/60 transition-all duration-300 flex flex-col h-full group cursor-pointer hover:shadow-md hover:-translate-y-0.5 border-b-4 border-b-brand-green/80 border-r-4 border-r-brand-green/80"
                >
                  {/* Text Content Area */}
                  <div className="p-8 flex-grow flex flex-col justify-between min-h-[220px] lg:min-h-[260px]">
                    <div className="space-y-4">
                      <h3 className="font-bold text-base lg:text-lg text-gray-800 line-clamp-2 group-hover:text-brand-green transition-colors leading-snug text-left">
                        {card.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-500 line-clamp-4 leading-relaxed text-left font-medium">
                        {card.content ? card.content.replace(/<[^>]*>/g, '') : ''}
                      </p>
                    </div>
                    <span className="text-[11px] lg:text-xs text-gray-400 font-extrabold font-mono text-left block mt-6">
                      {card.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute -right-4 md:-right-8 lg:-right-12 xl:-right-12 z-20 w-10 h-10 lg:w-11 lg:h-11 bg-gray-50 border border-gray-150 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-white transition-all duration-200 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal for viewing news details */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh] border border-gray-150"
            >
              {/* Close Icon Top Right */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all z-20 cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="relative p-8 pb-5 bg-white flex-shrink-0 text-left space-y-3">
                <span className="text-[10px] font-black text-brand-green border border-brand-green/30 bg-brand-green-light px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  보도자료
                </span>
                <h3 className="text-gray-900 text-xl sm:text-2xl font-black leading-snug tracking-tight pr-8">
                  {selectedCard.title}
                </h3>
              </div>

              {/* Meta Info Row */}
              <div className="px-8 flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-gray-100 font-semibold font-mono flex-shrink-0">
                <span>{isEnglish ? "Date: " : "등록일: "}{selectedCard.date}</span>
                {selectedCard.views !== undefined && (
                  <span>{isEnglish ? "Views: " : "조회수: "}{selectedCard.views}</span>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto space-y-6 text-left flex-1 bg-gray-50/30">
                {/* Article Image rendered centered without stretching/cropping */}
                {selectedCard.image && (
                  <div className="w-full flex justify-center py-4 bg-white rounded-xl border border-gray-100 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedCard.image}
                      alt="Article"
                      className="max-h-[350px] sm:max-h-[450px] w-auto object-contain rounded-lg border border-gray-150/70"
                    />
                  </div>
                )}
                
                {/* Content rendering */}
                <div 
                  className="rich-text-content text-gray-700 text-sm sm:text-base leading-relaxed font-semibold pt-1"
                  dangerouslySetInnerHTML={{ __html: selectedCard.content || '' }}
                />
              </div>

              {/* Footer Button */}
              <div className="p-5 px-8 border-t border-gray-100 bg-white flex justify-end flex-shrink-0">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-8 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-xs lg:text-sm font-bold rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
