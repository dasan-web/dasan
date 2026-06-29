'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollIndicator() {
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide the indicator if scrolled past 150px
      if (currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Detect scroll direction based on page scroll position
      if (currentScrollY > lastScrollY) {
        setScrollDir('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDir('up');
      }

      lastScrollY = currentScrollY;
    };

    // Detect scroll direction based on mouse wheel event
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setScrollDir('down');
      } else if (e.deltaY < 0) {
        setScrollDir('up');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, y: 10, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 10, x: '-50%' }}
          transition={{ duration: 0.3 }}
          href={scrollDir === 'down' ? '#core-tech' : '#'}
          onClick={(e) => {
            if (scrollDir === 'up') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 left-1/2 flex flex-col items-center space-y-1.5 z-10 cursor-pointer hover:text-brand-green group"
        >
          {/* Mouse Outline */}
          <div className="w-5.5 h-9.5 border-2 border-gray-650 group-hover:border-brand-green rounded-full flex justify-center p-1.5 transition-colors">
            {/* Scroll wheel dot */}
            <motion.div
              animate={
                scrollDir === 'down'
                  ? { y: [0, 10, 0] }
                  : { y: [10, 0, 10] }
              }
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 bg-gray-650 group-hover:bg-brand-green rounded-full transition-colors"
            />
          </div>

          {/* Dynamic Scroll Text */}
          <span className="text-[9.5px] tracking-widest font-pretendard font-normal text-gray-650 group-hover:text-brand-green uppercase transition-colors">
            {scrollDir === 'down' ? 'SCROLL DOWN' : 'SCROLL UP'}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
