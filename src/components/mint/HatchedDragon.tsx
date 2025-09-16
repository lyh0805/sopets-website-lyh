'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HatchedDragonProps {
  className?: string;
  preload?: boolean;
  onLoad?: () => void;
}

export default function HatchedDragon({ 
  className = '', 
  preload = false,
  onLoad 
}: HatchedDragonProps): JSX.Element {
  const [petImage, setPetImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Generate a random pet number between 0 and 13
    const petNumber = Math.floor(Math.random() * 14);
    const image = `/pets/pet_${petNumber}.png`;
    setPetImage(image);
    setIsVisible(true);
          onLoad?.();
  }, [onLoad]);

  const handleTap = () => {
    if (!isAnimating) {
    setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <div 
      className={`relative flex items-center justify-center w-full h-full ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      {petImage && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: isAnimating ? [0, -5, 5, -5, 5, 0] : 0,
            y: isAnimating ? [0, -20, 0] : 0
          }}
          transition={{ 
            duration: isAnimating ? 1 : 0.5,
            type: "spring",
            stiffness: 200
          }}
          className="relative w-96 h-96 cursor-pointer"
          onClick={handleTap}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={petImage}
            alt="Your SoPet"
            fill
            className="object-contain"
            onLoad={() => setIsVisible(true)}
            priority
          />
        </motion.div>
      )}
    </div>
  );
} 