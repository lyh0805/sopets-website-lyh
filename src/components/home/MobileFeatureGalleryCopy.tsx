'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const features = [
  {
    id: 0,
    title: 'Tap to Collect',
    description: 'Tap your phone with friends to breed new eggs, unlock bonuses, and grow your collection together.',
    media: {
      type: 'video',
      src: '/features/TapToConnect_converted.mp4'
    }
  },
  {
    id: 1,
    title: 'Collect Rare Breeds',
    description: 'Each SoPet has a unique personality that shapes how it interacts with you and the world around it.',
    media: {
      type: 'video',
      src: '/features/Personality_converted.mp4'
    }
  },
  {
    id: 2,
    title: 'Complete All Collections',
    description: 'Tap to collect to complete collectible sets, and unlock new islands to expand your world.',
    media: {
      type: 'image',
      src: '/features/PetCollection.png'
    }
  },
  {
    id: 3,
    title: 'Cross-Device Companionship',
    description: 'Your SoPets live across your devices — desktop and mobile — so they\'re always by your side, no matter where you are.',
    media: {
      type: 'video',
      src: '/features/DesktopPet_converted.mp4'
    }
  }
];

export default function FeatureGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  
  const currentFeature = features[currentIndex];
  const SLIDE_DURATION = 7000; // 7 seconds per slide
  const PROGRESS_INTERVAL = 50; // Update every 50ms for smoother animation
  const PROGRESS_STEP = 100 / (SLIDE_DURATION / PROGRESS_INTERVAL);

  // Auto advance to next slide
  const goToNext = () => {
    const nextIndex = currentIndex === features.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    setProgress(0);
  };

  // Manual navigation
  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? features.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Progress timer
  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Don't start timer if paused
    if (isPaused) {
      return;
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + PROGRESS_STEP;
        
        if (newProgress >= 100) {
          // Progress complete, go to next slide
          setTimeout(goToNext, 0);
          return 100;
        }
        
        return newProgress;
      });
    }, PROGRESS_INTERVAL);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
            SoPets Mobile (Coming Soon!)
          </h2>
        </div>

        {/* Feature Showcase */}
        <div 
          className="relative rounded-xl overflow-hidden group aspect-[4/3] lg:aspect-[16/9]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Media Layer */}
          <AnimatePresence mode="wait">
            {currentFeature.media.type === 'image' ? (
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentFeature.media.src}
                  alt={currentFeature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px"
                  priority
                />
              </motion.div>
            ) : (
              <motion.video
                key={currentFeature.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={currentFeature.media.src} type="video/mp4" />
              </motion.video>
            )}
          </AnimatePresence>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

          {/* Content Layer */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            {/* Top Section (Timeline Progress & Dots) */}
            <div className="w-full">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-purple-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ 
                    duration: 0.05, 
                    ease: "linear",
                    type: "tween"
                  }}
                />
              </div>
              <div className="flex space-x-2">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-purple-500 w-4' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Section (Title & Description) */}
            <div className="max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    {currentFeature.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 line-clamp-3 lg:line-clamp-none">
                    {currentFeature.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}