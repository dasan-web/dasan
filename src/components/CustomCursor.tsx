'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const [cursorType, setCursorType] = useState<'default' | 'clickable' | 'text' | 'hidden'>('default');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (cursorType === 'hidden') {
        setCursorType('default');
      }
    };

    // Track scroll direction based on page scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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

    // Detect hovered element type
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Restores standard cursor for text fields/inputs for typing ease
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' || 
        target.closest('input') || 
        target.closest('textarea') ||
        target.closest('select') ||
        target.isContentEditable
      ) {
        setCursorType('text');
        return;
      }

      // Detect clickable elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');

      if (isClickable) {
        setCursorType('clickable');
      } else {
        setCursorType('default');
      }
    };

    // Hide custom cursor when mouse leaves browser window
    const handleMouseLeave = () => {
      setCursorType('hidden');
    };

    // Apply global CSS to hide default cursor, except for inputs and textareas
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.innerHTML = `
      body, a, button, [role="button"], .cursor-pointer {
        cursor: none !important;
      }
      input, textarea, select, [contenteditable="true"] {
        cursor: auto !important;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      // Clean up style and events
      const el = document.getElementById('custom-cursor-style');
      if (el) el.remove();

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorType]);

  if (!isMounted || cursorType === 'hidden' || cursorType === 'text') return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translate3d(-50%, -50%, 0)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <AnimatePresence mode="wait">
        {cursorType === 'clickable' ? (
          // Clickable State: small green dot
          <motion.div
            key="clickable"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-3.5 h-3.5 bg-brand-green rounded-full shadow-md"
          />
        ) : (
          // Default State: scroll mouse indicator
          <motion.div
            key="default"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center select-none"
          >
            {/* Mouse Outline */}
            <div className="w-5.5 h-9.5 border-2 border-brand-green bg-white/80 rounded-full flex justify-center p-1.5 shadow-sm backdrop-blur-xs">
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
                className="w-1.5 h-1.5 bg-brand-green rounded-full"
              />
            </div>

            {/* Scroll Direction Text */}
            <span 
              className="text-[9px] tracking-widest font-black text-brand-green uppercase mt-1 bg-white/90 px-1.5 py-0.5 rounded shadow-xs border border-gray-100"
              style={{
                textShadow: '0 1px 2px rgba(255,255,255,0.8)'
              }}
            >
              {scrollDir === 'down' ? 'SCROLL DOWN' : 'SCROLL UP'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
