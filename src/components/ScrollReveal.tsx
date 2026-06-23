'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export default function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  y = 60,
  duration = 1.2
}: ScrollRevealProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ 
        duration, 
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth easeOutExpo curve
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
