'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpinePlayer } from '@esotericsoftware/spine-player';
import '@esotericsoftware/spine-player/dist/spine-player.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import Confetti
const Confetti = dynamic(() => import('react-confetti'), { 
  ssr: false,
  loading: () => null 
});

const SPINE_ASSETS = {
  json: '/new_hatch/Egg_01.json',
  atlas: '/new_hatch/Egg_01.atlas'
};

const PET_IMAGES = [
  '/pets/Pawling.png',
  '/pets/Scoops.png', 
  '/pets/Scaley.png',
  '/pets/Camo.png',
  '/pets/Cosmo.png',
  '/pets/Snug.png',
  '/pets/Beat.png',
]

const ANIMATIONS = {
  IDLE: '01_idling',
  BARK: '02_bark',
  ROTATE: '03_rotate_left_right',
  SWING_LEFT: '04_swing_left',
  SWING_RIGHT: '05_swing_right',
  SWING_LEFT2: '06_swing_left2',
  REVEAL: '07_reveal',
  IDLE_CRACK1: '01_idling_crack1',
  IDLE_CRACK2: '01_idling_crack2',
  IDLE_CRACK3: '01_idling_crack3',
  IDLE_CRACK4: '01_idling_crack4'
};

const IDLE_TIMEOUT = 6000;

// Utility functions
const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const preloadSpineAssets = async () => {
  try {
    const [jsonResponse, atlasResponse] = await Promise.all([
      fetch(SPINE_ASSETS.json),
      fetch(SPINE_ASSETS.atlas)
    ]);

    if (!jsonResponse.ok || !atlasResponse.ok) {
      throw new Error('Failed to load spine assets');
    }

    return await Promise.all([
      jsonResponse.json(),
      atlasResponse.text()
    ]);
  } catch (error) {
    console.error('Error preloading spine assets:', error);
    throw error;
  }
};

const preloadPetImages = async (isMobile: boolean) => {
  const imagesToLoad = isMobile ? PET_IMAGES.slice(0, 5) : PET_IMAGES;
  const loadedImages: string[] = [];

  for (const src of imagesToLoad) {
    try {
      await new Promise<string>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          loadedImages.push(src);
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    } catch (error) {
      console.error(`Failed to load image: ${src}`, error);
    }
  }

  return loadedImages;
};

// Finger tap overlay component
// Alternative approach using Tailwind classes and conditional positioning
const FingerTapOverlay = ({ show, onTap, isMobile }: { 
  show: boolean; 
  onTap: () => void; 
  isMobile: boolean; 
}) => {
  // Ring sizes
  const ringSize = isMobile ? 'w-20 h-20' : 'w-32 h-32';
  const innerSize = isMobile ? 'w-12 h-12' : 'w-20 h-20';
    
  // Create positioning classes based on device type
  const positionClasses = isMobile 
    ? 'absolute inset-0 flex items-center justify-center -translate-x-7 -translate-y-10' // -translate-y-24 = -96px
    : 'absolute inset-0 flex items-center justify-center -translate-y-34'; // -translate-y-32 = -128px

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${positionClasses} pointer-events-none z-20`}
        >
          {/* Pulsing ring around tap area */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute ${ringSize} rounded-full border-4 border-white/50`}
          />
          
          {/* Inner pulsing circle */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className={`absolute ${innerSize} rounded-full bg-white/20`}
          />
          
          {/* Invisible clickable area */}
          <div
            className="absolute inset-0 cursor-pointer pointer-events-auto"
            onClick={onTap}
            onTouchStart={(e) => {
              e.preventDefault();
              onTap();
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EggHatchingSection = () => {
  // Core state
  const [tapCount, setTapCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [randomPet, setRandomPet] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Asset loading
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Device detection
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // New state for finger tap overlay
  const [showFingerPrompt, setShowFingerPrompt] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<SpinePlayer | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const promptTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const hasStartedInteractionRef = useRef(false);
  const preloadedPets = useRef<string[]>([]);

  // Window resize handling
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth < 768);
    }, 250);

    // Initial setup
    setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Asset preloading
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        setLoadingProgress(10);
        await preloadSpineAssets();
        setLoadingProgress(50);
        
        const loadedPets = await preloadPetImages(isMobile);
        preloadedPets.current = loadedPets;
        setLoadingProgress(90);
        
        setAssetsPreloaded(true);
        setLoadingProgress(100);
      } catch (error) {
        console.error('Error during preload:', error);
        setError('Failed to load assets');
      }
    };

    preloadAssets();
  }, [isMobile]);

  // Spine player initialization
  useEffect(() => {
    if (!assetsPreloaded || !containerRef.current) return;

    try {
      const player = new SpinePlayer(containerRef.current, {
        jsonUrl: SPINE_ASSETS.json,
        atlasUrl: SPINE_ASSETS.atlas,
        animation: ANIMATIONS.IDLE,
        alpha: true,
        backgroundColor: '#00000000',
        preserveDrawingBuffer: false,
        showControls: false,
        premultipliedAlpha: true,
        viewport: {
          padLeft: "0%",
          padRight: "0%",
          padTop: "0%",
          padBottom: "0%",
          x: -400,
          y: -400,
          width: 2000,
          height: 2000
        },
        success: () => {
          setIsLoading(false);
          startIdleTimer();
          startPromptTimer();
          
          if (player.skeleton) {
            const scale = isMobile ? 0.8 : 1.0;
            player.skeleton.scaleX = scale;
            player.skeleton.scaleY = scale;
            
            const containerWidth = containerRef.current!.clientWidth;
            const containerHeight = containerRef.current!.clientHeight;
            
            player.skeleton.x = containerWidth / 2 + 250;
            player.skeleton.y = containerHeight / 2 + 150;
          }
        },
        error: (err) => {
          console.error('Spine player error:', err);
          setError('Failed to initialize animation');
          setIsLoading(false);
        }
      });

      playerRef.current = player;

      return () => {
        if (idleTimerRef.current) {
          clearTimeout(idleTimerRef.current);
        }
        if (promptTimerRef.current) {
          clearTimeout(promptTimerRef.current);
        }
        player.dispose();
      };
    } catch (err) {
      console.error('Error initializing spine player:', err);
      setError('Failed to initialize animation');
      setIsLoading(false);
    }
  }, [assetsPreloaded, isMobile]);

  // Animation sequence handler
  const playAnimationSequence = async (
    animation: string,
    returnToAnimation: string = ANIMATIONS.IDLE,
    loop: boolean = false
  ) => {
    if (!playerRef.current?.animationState || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    const animState = playerRef.current.animationState;

    try {
      animState.clearTracks();
      animState.setAnimation(0, animation, loop);
      
      if (!loop) {
        await new Promise<void>((resolve) => {
          const listener = {
            complete: () => {
              if (returnToAnimation) {
                animState.setAnimation(0, returnToAnimation, true);
              }
              animState.removeListener(listener);
              resolve();
            }
          };
          animState.addListener(listener);
        });
      }
    } catch (err) {
      console.error('Animation error:', err);
      setError('Failed to play animation');
    } finally {
      isAnimatingRef.current = false;
    }
  };

  // Idle timer
  const startIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    
    if (!hasStartedInteractionRef.current) {
      idleTimerRef.current = setTimeout(() => {
        if (!isAnimatingRef.current) {
          playAnimationSequence(ANIMATIONS.BARK, ANIMATIONS.IDLE).then(() => {
            if (!hasStartedInteractionRef.current) {
              startIdleTimer();
            }
          });
        }
      }, IDLE_TIMEOUT);
    }
  };

  // Finger prompt timer
  const startPromptTimer = () => {
    if (promptTimerRef.current) {
      clearTimeout(promptTimerRef.current);
    }
    
    if (tapCount < 5) { // Keep showing until all 5 taps are done
      promptTimerRef.current = setTimeout(() => {
        if (tapCount < 5) {
          setShowFingerPrompt(true);
          // Hide prompt after 5 seconds and restart timer
          setTimeout(() => {
            setShowFingerPrompt(false);
            if (tapCount < 5) {
              startPromptTimer();
            }
          }, 5000);
        }
      }, hasStartedInteractionRef.current ? 1000 : 2000); // Faster intervals after first tap
    }
  };

  // Generate random pet
  const generateRandomPet = () => {
    if (preloadedPets.current.length === 0) return PET_IMAGES[0];
    const randomIndex = Math.floor(Math.random() * preloadedPets.current.length);
    return preloadedPets.current[randomIndex];
  };

  // Handle completion
  const handleCompletion = () => {
    setIsComplete(true);
    setShowConfetti(true);
    setRandomPet(generateRandomPet());
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // Tap handler
  const handleTap = async () => {
    if (isAnimatingRef.current || isComplete) return;
    
    if (!hasStartedInteractionRef.current) {
      hasStartedInteractionRef.current = true;
      setShowFingerPrompt(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    } else {
      // On subsequent taps, temporarily hide the prompt
      setShowFingerPrompt(false);
    }
    
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    try {
      switch (newTapCount) {
        case 1:
          // idling -> tap -> bark -> idling_crack1
          await playAnimationSequence(ANIMATIONS.BARK, ANIMATIONS.IDLE_CRACK1);
          // Restart prompt timer for next tap
          startPromptTimer();
          break;
        case 2:
          // idling_crack1 -> tap -> rotate_left_right -> idling_crack2
          await playAnimationSequence(ANIMATIONS.ROTATE, ANIMATIONS.IDLE_CRACK2);
          // Restart prompt timer for next tap
          startPromptTimer();
          break;
        case 3:
          // idling_crack2 -> tap -> swing_left -> idling_crack3
          await playAnimationSequence(ANIMATIONS.SWING_LEFT, ANIMATIONS.IDLE_CRACK3);
          // Restart prompt timer for next tap
          startPromptTimer();
          break;
        case 4:
          // idling_crack3 -> tap -> swing_right -> idling_crack4
          await playAnimationSequence(ANIMATIONS.SWING_RIGHT, ANIMATIONS.IDLE_CRACK4);
          // Restart prompt timer for next tap
          startPromptTimer();
          break;
        case 5:
          // Final tap - clear all timers
          // idling_crack4 -> tap -> swing_left2 -> reveal
          if (promptTimerRef.current) {
            clearTimeout(promptTimerRef.current);
            promptTimerRef.current = null;
          }
          setShowFingerPrompt(false);
          await playAnimationSequence(ANIMATIONS.SWING_LEFT2, '');
          setTimeout(() => {
            playAnimationSequence(ANIMATIONS.REVEAL, '', false).then(handleCompletion);
          }, 1000);
          break;
      }
    } catch (error) {
      console.error('Animation error:', error);
      setError('Failed to play animation');
    }
  };

  if (error) {
    return (
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 p-8 bg-red-500/10 rounded-lg">
            <p className="text-red-500">Something went wrong. Please try again.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Only show when not complete */}
        <AnimatePresence>
          {!isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
                Something is Waiting For You Inside ✨
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                Each gentle tap below brings you closer to meeting a SoPet — a tiny friend ready to brighten your day.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading overlay */}
        {!assetsPreloaded && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-white/70">Loading your egg...</p>
          </div>
        )}

        {/* Main content */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key="hatching"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative bg-transparent rounded-lg overflow-visible"
                  style={{ 
                    aspectRatio: '1',
                    minHeight: '400px'
                  }}
                >
                  <div 
                    ref={containerRef}
                    onClick={handleTap}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      handleTap();
                    }}
                    className="absolute inset-0 cursor-pointer"
                    style={{ 
                      opacity: isLoading ? 0.5 : 1,
                      transition: 'opacity 0.3s ease-in-out',
                    }}
                  />
                  
                  {/* Finger tap overlay - Now includes isMobile prop */}
                  <FingerTapOverlay 
                    show={showFingerPrompt && !isLoading && tapCount < 5} 
                    onTap={handleTap}
                    isMobile={isMobile}
                  />
                  
                  {isLoading && assetsPreloaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center text-center px-4 py-8"
                >
                  {showConfetti && !isMobile && (
                    <Confetti
                      width={windowSize.width}
                      height={windowSize.height}
                      recycle={false}
                      numberOfPieces={200}
                      gravity={0.3}
                      tweenDuration={4000}
                    />
                  )}
                  
                  {/* Success content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                      Your little friend is here 🌿
                    </h2>
                    <p className="text-lg md:text-xl text-white/80">
                      Your SoPet has hatched — ready to bring calm and companionship to your screen.
                    </p>
                  </motion.div>
                  
                  {/* Pet reveal */}
                  {randomPet && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative w-48 h-48 md:w-64 md:h-64 mb-8"
                    >
                      <Image
                        src={randomPet}
                        alt="Your new SoPet"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  )}
                  
                  {/* Action button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.getElementById("hunters-bloodlines");
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        // Fallback: navigate to lore page if not on same page
                        window.location.href = '/lore#hunters-bloodlines';
                      }
                    }}
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl text-sm md:text-base font-semibold"
                  >
                    Meet The Other SoPets!
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EggHatchingSection;