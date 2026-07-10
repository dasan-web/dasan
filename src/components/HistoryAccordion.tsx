'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TimelineEvent {
  year: string;
  details: string[];
}

interface TimelineEra {
  eraTitle: string;
  eraSubtitle: string;
  events: TimelineEvent[];
}

export default function HistoryAccordion({ timelineData }: { timelineData: TimelineEra[] }) {
  // Let's make all of them open by default so it looks full, but they can be toggled smoothly.
  const [openEras, setOpenEras] = useState<boolean[]>(timelineData.map(() => true));

  const toggleEra = (index: number) => {
    setOpenEras(prev => {
      const newOpen = [...prev];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  return (
    <div className="relative max-w-4xl mx-auto z-10">
      {/* Vertical Line */}
      <div className="absolute left-[30px] md:left-[120px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent"></div>

      {timelineData.map((era, reversedIndex) => {
        const isOpen = openEras[reversedIndex];

        return (
          <div key={reversedIndex} className="mb-20 last:mb-0 relative group">
            {/* Era Header */}
            <div 
              className="flex items-center mb-10 cursor-pointer outline-none hover:opacity-90 transition-opacity"
              onClick={() => toggleEra(reversedIndex)}
            >
              {/* Circle on line */}
              <div className="absolute left-[30px] md:left-[120px] w-5 h-5 rounded-full bg-brand-green border-[4px] border-white shadow-sm -translate-x-[9.5px] z-10 group-hover:scale-125 transition-transform duration-300"></div>
              
              <div 
                className="ml-[60px] md:ml-[160px] bg-brand-green/5 border border-brand-green/20 px-5 py-3 rounded-2xl flex items-center flex-wrap animate-fade-in-up" 
                style={{animationDelay: (reversedIndex * 150 + 300) + 'ms'}}
              >
                <h4 className="text-lg md:text-xl font-black text-brand-green select-none flex items-center">
                  {era.eraTitle} <span className="font-medium text-gray-600 text-sm md:text-base ml-2 mr-4">| {era.eraSubtitle}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-brand-green transition-transform duration-500 ease-in-out ${isOpen ? '' : '-rotate-90'}`} 
                  />
                </h4>
              </div>
            </div>

            {/* Era Events (Smooth Accordion) */}
            <div 
              className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="space-y-8 pt-2 pb-4">
                  {era.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="relative flex flex-col md:flex-row items-start group/event hover:-translate-y-1 transition-transform duration-300">
                      
                      {/* Year */}
                      <div className="ml-[60px] md:ml-0 md:absolute md:left-0 md:w-[90px] md:text-right pt-[18px] md:pt-[22px]">
                        <span className="text-xl md:text-2xl font-extrabold text-gray-400 group-hover/event:text-brand-blue transition-colors duration-300 tracking-tight">{event.year}</span>
                      </div>

                      {/* Dot on line */}
                      <div className="absolute left-[30px] md:left-[120px] top-[26px] md:top-[30px] w-3 h-3 rounded-full bg-gray-300 border-[2px] border-white -translate-x-[5px] z-10 group-hover/event:bg-brand-blue group-hover/event:scale-[1.5] transition-all duration-300 shadow-sm"></div>

                      {/* Details */}
                      <div className="ml-[60px] md:ml-[160px] flex-1 bg-white border border-gray-100 p-5 md:p-6 rounded-2xl shadow-sm group-hover/event:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group-hover/event:border-brand-blue/20 transition-all duration-300 mt-2 md:mt-0">
                        <ul className="space-y-3">
                          {event.details.map((detail, dIndex) => {
                            const cleanDetail = detail.replace(/^•\s*/, '');
                            return (
                              <li key={dIndex} className="text-gray-600 leading-relaxed text-[15px] flex items-start">
                                <span className="text-brand-blue/40 mr-3 mt-1 font-bold text-lg leading-none">•</span>
                                <span className="font-medium">{cleanDetail}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
