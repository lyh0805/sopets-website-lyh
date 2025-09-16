'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SpinePlayer } from '@esotericsoftware/spine-player';
import '@esotericsoftware/spine-player/dist/spine-player.css';

type AnimationName = 'excited' | 'flying' | 'hungry_sad' | 'idle' | 'munching' | 'petting' | 'sleeping';

interface SpinePetProps {
  jsonUrl: string;
  atlasUrl: string;
  initialAnimation?: AnimationName;
  clickSequence?: [AnimationName, AnimationName];
  skin?: string;
  loop?: boolean;
  className?: string;
  onLoad?: () => void;
}

const SpinePet: React.FC<SpinePetProps> = ({
  jsonUrl,
  atlasUrl,
  initialAnimation = 'idle',
  clickSequence,
  skin = 'default',
  loop = true,
  className = '',
  onLoad,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<SpinePlayer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationName>(initialAnimation);

  useEffect(() => {
    if (!containerRef.current) return;

    const player = new SpinePlayer(containerRef.current, {
      jsonUrl,
      atlasUrl,
      animation: initialAnimation,
      skin,
      alpha: true,
      backgroundColor: '#00000000',
      showControls: false,
      preserveDrawingBuffer: false,
      premultipliedAlpha: true,
      success: () => {
        // Reset root bone rotation and scale
        const skeleton = player.skeleton;
        if (skeleton) {
          const rootBone = skeleton.getRootBone();
          if (rootBone) {
            rootBone.rotation = 0;
            rootBone.scaleX = 1;
            rootBone.scaleY = 1;
          }
          // Reset all bones to ensure proper orientation
          skeleton.bones.forEach(bone => {
            if (bone.data.name === 'ch') {
              bone.rotation = -3.41; // Default rotation for main character bone
            } else {
              bone.rotation = bone.data.rotation;
            }
          });
          skeleton.setToSetupPose();
        }
        setIsLoaded(true);
        onLoad?.();
      },
    });

    playerRef.current = player;

    return () => {
      player.dispose();
    };
  }, [jsonUrl, atlasUrl, initialAnimation, skin, loop, onLoad]);

  const playAnimation = (animation: AnimationName, returnToAnimation?: AnimationName) => {
    const player = playerRef.current;
    if (!player?.animationState || !isLoaded) return;

    try {
      const animationState = player.animationState;
      // Reset root bone before playing new animation
      const skeleton = player.skeleton;
      if (skeleton) {
        const rootBone = skeleton.getRootBone();
        if (rootBone) {
          rootBone.rotation = 0;
          rootBone.scaleX = 1;
          rootBone.scaleY = 1;
        }
        skeleton.setToSetupPose();
      }
      // Set the new animation
      animationState.setAnimation(0, animation, false);
      setCurrentAnimation(animation);

      // Queue up the return animation
      if (returnToAnimation) {
        animationState.addAnimation(0, returnToAnimation, true, 0);
        setCurrentAnimation(returnToAnimation);
      }
    } catch (error) {
      console.error('Error playing animation:', error);
    }
  };

  const handleClick = () => {
    if (!isLoaded) return;

    if (clickSequence) {
      // Use custom animation sequence
      playAnimation(clickSequence[0], clickSequence[1]);
    } else {
      // Default behavior
      switch (currentAnimation) {
        case 'idle':
          playAnimation('petting', 'idle');
          break;
        case 'hungry_sad':
          playAnimation('munching', 'idle');
          break;
        case 'sleeping':
          playAnimation('excited', 'idle');
          break;
        default:
          playAnimation('idle', undefined);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`spine-player ${className}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label="Interactive pet animation - click to interact"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    />
  );
};

export default SpinePet; 