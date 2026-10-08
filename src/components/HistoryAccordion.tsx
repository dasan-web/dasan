'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  details: string[];
}

interface TimelineEra {
  eraTitle: string;
  eraSubtitle: string;
  events: TimelineEvent[];
}

interface HistoryAccordionProps {
  timelineData: TimelineEra[];
  isEn?: boolean;
}

function getCategories(item: string, isEn = false): string[] {
  const cats: string[] = [];
  const text = item.toLowerCase();

  if (isEn) {
    if (/certified|iso|kgmp|bgmp|inno-biz|clean|license|approved|selected|project/.test(text)) cats.push('Certifications');
    if (/award|commendation|tower|champion|success company|promising|sme administrator/.test(text)) cats.push('Awards');
    if (/plant|center|logistics|completed|opened|relocated|expanded|eco-factory/.test(text)) cats.push('Infrastructure');
    if (/r&d|research|synthetic|central r&d|corporate r&d/.test(text)) cats.push('R&D');
    if (/global|export|china|shenyang|joint venture/.test(text)) cats.push('Global');
    if (/established|changed|venture|workplace|youth-friendly|organization/.test(text)) cats.push('Organization');
    if (/revenue|sales|export tower|\$7m|\$3m|krw|billion/.test(text)) cats.push('Sales');
  } else {
    if (/인증|iso|kgmp|bgmp|inno-biz|clean|허가|인가|선정|인증 획득/.test(text)) cats.push('인증');
    if (/수상|표창|장관상|장관표창|수출탑|우수기업인상|유공|성공기업|청장상/.test(text)) cats.push('수상');
    if (/공장|완공|준공|물류센터|생태공장|이전|개소|연구소/.test(text)) cats.push('인프라');
    if (/연구소|r&d|합성연구소|중앙연구소|심양연구소|기업부설연구소/.test(text)) cats.push('R&D');
    if (/글로벌|수출|중국|안휘|심양|합작법인/.test(text)) cats.push('글로벌');
    if (/설립|사명 변경|합작법인|일자리|청년친화|조직/.test(text)) cats.push('조직');
    if (/매출|억 원|수출탑|억/.test(text)) cats.push('매출');
  }

  return cats;
}

function filterTimeline(data: TimelineEra[], categoryKey: string, isEn = false): TimelineEra[] {
  if (categoryKey === '전체' || categoryKey === 'All') {
    return data;
  }

  const filteredEras: TimelineEra[] = [];

  data.forEach(era => {
    const filteredEvents: TimelineEvent[] = [];

    era.events.forEach(event => {
      const matchedDetails: string[] = [];

      event.details.forEach(detailStr => {
        const clean = detailStr.replace(/^•\s*/, '');
        const subItems = clean.split('/').map(s => s.trim()).filter(Boolean);
        const matchingSubItems = subItems.filter(sub => {
          const cats = getCategories(sub, isEn);
          return cats.includes(categoryKey);
        });

        if (matchingSubItems.length > 0) {
          matchedDetails.push(matchingSubItems.join(' / '));
        }
      });

      if (matchedDetails.length > 0) {
        filteredEvents.push({
          ...event,
          details: matchedDetails
        });
      }
    });

    if (filteredEvents.length > 0) {
      filteredEras.push({
        ...era,
        events: filteredEvents
      });
    }
  });

  return filteredEras;
}

export default function HistoryAccordion({ timelineData, isEn = false }: HistoryAccordionProps) {
  const categories = isEn ? [
    { id: 'All', label: 'All' },
    { id: 'Certifications', label: 'Certifications' },
    { id: 'Awards', label: 'Awards' },
    { id: 'Infrastructure', label: 'Infrastructure' },
    { id: 'R&D', label: 'R&D' },
    { id: 'Global', label: 'Global' },
    { id: 'Organization', label: 'Organization' },
    { id: 'Sales', label: 'Sales' },
  ] : [
    { id: '전체', label: '전체' },
    { id: '인증', label: '인증' },
    { id: '수상', label: '수상' },
    { id: '인프라', label: '인프라' },
    { id: 'R&D', label: 'R&D' },
    { id: '글로벌', label: '글로벌' },
    { id: '조직', label: '조직' },
    { id: '매출', label: '매출' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(isEn ? 'All' : '전체');

  // Filtered timeline data according to active category
  const filteredTimeline = useMemo(() => {
    return filterTimeline(timelineData, selectedCategory, isEn);
  }, [timelineData, selectedCategory, isEn]);

  // Keep eras open by default
  const [openEras, setOpenEras] = useState<boolean[]>(timelineData.map(() => true));

  const toggleEra = (index: number) => {
    setOpenEras(prev => {
      const newOpen = [...prev];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    // Expand all eras on category change
    setOpenEras(timelineData.map(() => true));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto z-10">
      {/* Category Filter Buttons (그림 1 '전체보기' 버튼 디자인 100% 반영: 둥근 알약, border-gray-300, 폰트, hover & active) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 md:mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer select-none active:scale-95 border ${
                isActive
                  ? 'bg-brand-green text-white border-brand-green shadow-green-glow font-bold'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-brand-green hover:text-white hover:border-brand-green hover:shadow-green-glow'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Timeline Section */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[30px] md:left-[120px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent"></div>

        {filteredTimeline.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            {isEn ? 'No timeline events found for this category.' : '해당 카테고리의 연혁 항목이 없습니다.'}
          </div>
        ) : (
          filteredTimeline.map((era, reversedIndex) => {
            const isOpen = openEras[reversedIndex] !== false;

            return (
              <div key={`${selectedCategory}-${reversedIndex}`} className="mb-12 md:mb-14 last:mb-0 relative group">
                {/* Era Header */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center mb-5 md:mb-6 cursor-pointer outline-none hover:opacity-90 transition-opacity"
                  onClick={() => toggleEra(reversedIndex)}
                >
                  {/* Circle on line */}
                  <div className="absolute left-[30px] md:left-[120px] w-5 h-5 rounded-full bg-brand-green border-[4px] border-white shadow-sm -translate-x-[9.5px] z-10 group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <div 
                    className="ml-[60px] md:ml-[160px] bg-brand-green/5 border border-brand-green/20 px-5 py-2.5 rounded-2xl flex items-center flex-wrap"
                  >
                    <h4 className="text-lg md:text-xl font-black text-brand-green select-none flex items-center">
                      {era.eraTitle}
                      <ChevronDown 
                        className={`w-5 h-5 text-brand-green transition-transform duration-500 ease-in-out ml-3 ${isOpen ? '' : '-rotate-90'}`} 
                      />
                    </h4>
                  </div>
                </motion.div>

                {/* Era Events (Smooth Accordion) */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 md:space-y-5 pt-1 pb-2">
                      {era.events.map((event, eventIndex) => (
                        <motion.div 
                          key={`${selectedCategory}-${event.year}-${eventIndex}`}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.8, delay: (eventIndex % 4) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="relative flex flex-col md:flex-row items-start group/event hover:-translate-y-0.5 transition-transform duration-300">
                          
                            {/* Year */}
                            <div className="ml-[60px] md:ml-0 md:absolute md:left-0 md:w-[90px] md:text-right pt-0.5 md:pt-0.5">
                              <span className="text-xl md:text-2xl font-extrabold text-gray-400 group-hover/event:text-brand-blue transition-colors duration-300 tracking-tight">
                                {event.year}
                              </span>
                            </div>

                            {/* Dot on line */}
                            <div className="absolute left-[30px] md:left-[120px] top-[9px] md:top-[11px] w-3 h-3 rounded-full bg-gray-300 border-[2px] border-white -translate-x-[5px] z-10 group-hover/event:bg-brand-blue group-hover/event:scale-[1.5] transition-all duration-300 shadow-sm"></div>

                            {/* Details */}
                            <div className="ml-[60px] md:ml-[160px] pl-5 flex-1 transition-all duration-300 mt-1 md:mt-0 pt-0.5 md:pt-0.5 pb-2">
                              <ul className="space-y-1.5">
                                {event.details.map((detail, dIndex) => {
                                  const cleanDetail = detail.replace(/^•\s*/, '');
                                  return (
                                    <li key={dIndex} className="text-gray-600 leading-relaxed text-[15px] flex items-start">
                                      <span className="font-medium">{cleanDetail}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
