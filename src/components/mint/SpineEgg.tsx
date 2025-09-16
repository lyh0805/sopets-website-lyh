'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SpinePlayer } from '@esotericsoftware/spine-player';
import gsap from 'gsap';

interface SpineEggProps {
  onComplete: () => void;
  className?: string;
}

const SPINE_ASSETS = {
  json: '/spine/Egg_01.json',
  atlas: '/spine/Egg_01.atlas',
  png: '/spine/Egg_01.png'
};

const ANIMATIONS = [
  "01_idling",
  "02_bark",
  "03_rotate_left_right",
  "04_swing_left",
  "05_swing_right",
  "06_swing_left2"
];

// Preload spine assets
const preloadAssets = async () => {
  try {
    const assets = await Promise.all([
      fetch(SPINE_ASSETS.json).then(r => r.json()),
      fetch(SPINE_ASSETS.atlas).then(r => r.text()),
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = reject;
        img.src = SPINE_ASSETS.png;
      })
    ]);
    console.log('Spine assets preloaded successfully');
    return true;
  } catch (err) {
    console.error('Error preloading spine assets:', err);
    return false;
  }
};

const SpineEgg: React.FC<SpineEggProps> = ({ onComplete, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<SpinePlayer | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadSpineAnimation = async () => {
      if (!containerRef.current) return;

      try {
        console.log('Loading spine animation files...');
        
        // Preload assets before creating the spine player
        await preloadAssets();
        
        // Create spine player instance
        playerRef.current = new SpinePlayer(containerRef.current, {
          jsonUrl: SPINE_ASSETS.json,
          atlasUrl: SPINE_ASSETS.atlas,
          preserveDrawingBuffer: true,
          alpha: true,
          backgroundColor: '#00000000',
          showControls: false,
          premultipliedAlpha: true, // Add this for better performance
          success: (player) => {
            console.log('Spine player loaded successfully');
            setIsLoading(false);
            
            // Set initial animation
            try {
              const animationState = player.animationState;
              if (!animationState) {
                throw new Error('Animation state is null');
              }
              animationState.setAnimation(0, ANIMATIONS[0], true);
              console.log('Initial animation set:', ANIMATIONS[0]);
            } catch (err) {
              console.error('Error setting initial animation:', err);
              setLoadError('Failed to set initial animation');
            }
          },
          error: (err) => {
            console.error('Error loading spine player:', err);
            setLoadError('Failed to load animation');
            setIsLoading(false);
          }
        });

        // Debug: Log available animations
        setTimeout(() => {
          if (playerRef.current?.skeleton) {
            console.log('Available animations:', 
              playerRef.current.skeleton.data.animations.map(a => a.name)
            );
          }
        }, 1000);

      } catch (err) {
        console.error('Error initializing spine player:', err);
        setLoadError('Failed to initialize animation');
        setIsLoading(false);
      }
    };

    loadSpineAnimation();

    return () => {
      if (playerRef.current) {
        console.log('Disposing spine player...');
        playerRef.current.dispose();
      }
    };
  }, []);

  const handleClick = () => {
    if (isLoading || loadError || !playerRef.current) return;

    const nextStep = currentStep + 1;
    if (nextStep >= ANIMATIONS.length) {
      console.log('Animation sequence complete');
      onComplete();
      return;
    }

    try {
      const player = playerRef.current;
      const nextAnimation = ANIMATIONS[nextStep];
      
      console.log('Playing animation:', nextAnimation);
      const animationState = player.animationState;
      if (!animationState) {
        throw new Error('Animation state is null');
      }
      
      // Set the next animation without looping
      animationState.setAnimation(0, nextAnimation, false);
      
      // Add a completion listener to return to idle
      animationState.addListener({
        complete: (entry) => {
          if (entry.animation?.name === nextAnimation) {
            console.log('Animation complete, returning to idle');
            // Remove the listener to prevent memory leaks
            animationState.clearListeners();
            
            if (nextStep === ANIMATIONS.length - 1) {
              // If this was the final animation, trigger completion
              console.log('Final animation complete, triggering hatch');
              onComplete();
            } else {
              // Otherwise, return to idle animation
              animationState.setAnimation(0, ANIMATIONS[0], true);
            }
          }
        }
      });

      // Visual feedback
      gsap.to(containerRef.current, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });

      setCurrentStep(nextStep);
    } catch (err) {
      console.error('Error playing animation:', err);
      setLoadError('Failed to play animation');
    }
  };

  if (loadError) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-red-500">
          {loadError}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div 
        ref={containerRef} 
        onClick={handleClick}
        className="w-[800px] h-[800px] cursor-pointer flex items-center justify-center md:scale-50 scale-[0.35] -my-[250px] md:-my-[150px]"
        style={{ 
          opacity: isLoading ? 0.5 : 1,
        }}
      />
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
        </div>
      ) : (
        <div className="text-center text-gray-300 w-full px-4">
          {currentStep < ANIMATIONS.length - 1 ? (
            <span className="text-lg md:text-xl">
              {`${ANIMATIONS.length - currentStep - 1} more taps to hatch!`}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SpineEgg; 