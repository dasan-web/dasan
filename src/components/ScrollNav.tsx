'use client';

import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: '소개' },
  { id: 'core-tech', label: '핵심기술' },
  { id: 'press-release', label: '보도자료' }
];

export default function ScrollNav() {
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
      el.scrollIntoView({ behavior: 'smooth' });
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
                <span className={`absolute w-6 h-6 rounded-full animate-ping duration-1000 pointer-events-none left-0 top-0 ${
                  section.id === 'hero' ? 'bg-brand-green/20 border border-brand-green/35' :
                  section.id === 'core-tech' ? 'bg-yellow-500/20 border border-yellow-500/35' :
                  'bg-red-500/20 border border-red-500/35'
                }`} />
              )}
              {/* Core dot */}
              <span 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-350 ${
                  isActive 
                    ? (
                      section.id === 'hero' ? 'bg-brand-green scale-125 shadow-green-glow' :
                      section.id === 'core-tech' ? 'bg-yellow-400 scale-125 shadow-[0_0_8px_rgba(250,204,21,0.6)]' :
                      'bg-red-500 scale-125 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                    )
                    : (
                      section.id === 'hero' ? 'bg-brand-green/40 hover:bg-brand-green hover:scale-110' :
                      section.id === 'core-tech' ? 'bg-yellow-400/40 hover:bg-yellow-400 hover:scale-110' :
                      'bg-red-500/40 hover:bg-red-500 hover:scale-110'
                    )
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
