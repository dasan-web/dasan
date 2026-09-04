'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function HeroBackground() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    // Initial start
    if (video1Ref.current) {
      video1Ref.current.play().catch(() => {});
    }
  }, []);

  // Transition from Video 1 -> Video 2
  const transitionTo2 = useCallback(() => {
    if (isTransitioningRef.current) return;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    isTransitioningRef.current = true;
    v2.currentTime = 0;
    v2.play()
      .then(() => {
        setActiveVideo(2);
        setTimeout(() => {
          if (v1) {
            v1.pause();
            v1.currentTime = 0;
          }
          isTransitioningRef.current = false;
        }, 1200);
      })
      .catch(() => {
        isTransitioningRef.current = false;
      });
  }, []);

  // Transition from Video 2 -> Video 1
  const transitionTo1 = useCallback(() => {
    if (isTransitioningRef.current) return;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    isTransitioningRef.current = true;
    v1.currentTime = 0;
    v1.play()
      .then(() => {
        setActiveVideo(1);
        setTimeout(() => {
          if (v2) {
            v2.pause();
            v2.currentTime = 0;
          }
          isTransitioningRef.current = false;
        }, 1200);
      })
      .catch(() => {
        isTransitioningRef.current = false;
      });
  }, []);

  const handleTimeUpdate1 = () => {
    const v1 = video1Ref.current;
    if (!v1 || activeVideo !== 1 || isTransitioningRef.current) return;

    // Trigger crossfade 1.4s before video ends
    if (v1.duration && v1.currentTime >= v1.duration - 1.4) {
      transitionTo2();
    }
  };

  const handleTimeUpdate2 = () => {
    const v2 = video2Ref.current;
    if (!v2 || activeVideo !== 2 || isTransitioningRef.current) return;

    // Trigger crossfade 1.4s before video ends
    if (v2.duration && v2.currentTime >= v2.duration - 1.4) {
      transitionTo1();
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none">
      {/* Primary Video */}
      <video
        ref={video1Ref}
        src="/mainF.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate1}
        onEnded={transitionTo2}
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-1000 ease-in-out ${
          activeVideo === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Secondary Buffer Video */}
      <video
        ref={video2Ref}
        src="/mainF.mp4"
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate2}
        onEnded={transitionTo1}
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-1000 ease-in-out ${
          activeVideo === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Soft cinematic left-side gradient to ensure text readability without altering original video beauty */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 via-[40%] to-transparent to-[72%] pointer-events-none z-10" />
    </div>
  );
}
