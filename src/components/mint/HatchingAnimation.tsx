'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import type { DragState } from '@use-gesture/react';
import Lottie from 'lottie-react';
import hatchingAnimation from '@/assets/animations/hatching.json';
import Confetti from 'react-confetti';

interface HatchingAnimationProps {
  onComplete: () => void;
}

const HatchingAnimation: React.FC<HatchingAnimationProps> = ({ onComplete }) => {
  const [isHatching, setIsHatching] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [{ scale }, api] = useSpring(() => ({
    scale: 1,
    config: { mass: 1, tension: 200, friction: 20 },
  }));

  const bind = useDrag(
    ({ first }: DragState) => {
      if (first && !isHatching) {
        setIsHatching(true);
        api.start({
          scale: 0.95,
          onRest: () => {
            setShowConfetti(true);
            setTimeout(() => {
              onComplete();
            }, 3000);
          },
        });
      }
    },
    {
      filterTaps: true,
      pointer: { touch: true },
    }
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 to-black px-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h2 className="mb-8 text-3xl font-bold text-white">
          {isHatching ? "Your SoPet is hatching!" : "Tap to hatch your SoPet!"}
        </h2>

        <animated.div
          {...bind()}
          style={{ scale, touchAction: 'none' }}
          className="relative mx-auto w-64 cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {isHatching ? (
              <motion.div
                key="hatching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Lottie
                  animationData={hatchingAnimation}
                  loop={false}
                  className="h-64 w-64"
                />
              </motion.div>
            ) : (
              <motion.div
                key="egg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <div className="h-64 w-64 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-2xl" />
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-6xl">🥚</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </animated.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-gray-300"
        >
          {isHatching
            ? "The magic is happening..."
            : "Your unique SoPet is waiting to meet you!"}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HatchingAnimation; 