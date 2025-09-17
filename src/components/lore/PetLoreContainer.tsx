import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PetLoreContainerProps {
  petName: string;
  petSubtitle: string;
  petImage: string;
  petDescription: string;
  accentColor?: 'purple' | 'pink' | 'emerald' | 'blue';
  imageSize?: 'small' | 'medium' | 'large' | 'xl' | 'xxl';
  imageTranslate?: { x: number; y: number };
  titleTranslate?: { x: number; y: number };
  subtitleTranslate?: { x: number; y: number };
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

const PetLoreContainer: React.FC<PetLoreContainerProps> = ({
  petName,
  petSubtitle,
  petImage,
  petDescription,
  accentColor = 'purple',
  imageSize = 'large',
  imageTranslate = { x: 0, y: 0 },
  titleTranslate = { x: 0, y: 0 },
  subtitleTranslate = { x: 0, y: 0 },
  rarity = 'Legendary',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile tap to toggle description
  const handleMobileClick = () => {
    if (isMobile) {
      setShowDescription(!showDescription);
    }
  };

  // Enhanced color theme configurations
  const colorThemes = {
    purple: {
      gradient: 'from-purple-900/20 via-black to-black',
      border: 'border-purple-500/30',
      hoverBorder: 'border-purple-400/60',
      titleColor: 'text-purple-300',
      titleHoverColor: 'text-white',
      rarityGradient: 'from-purple-500 to-purple-600',
      glowColor: 'shadow-purple-500/30',
      shimmer: 'from-transparent via-purple-300/20 to-transparent'
    },
    pink: {
      gradient: 'from-pink-900/20 via-black to-black',
      border: 'border-pink-500/30',
      hoverBorder: 'border-pink-400/60',
      titleColor: 'text-pink-300',
      titleHoverColor: 'text-white',
      rarityGradient: 'from-pink-500 to-pink-600',
      glowColor: 'shadow-pink-500/30',
      shimmer: 'from-transparent via-pink-300/20 to-transparent'
    },
    emerald: {
      gradient: 'from-emerald-900/20 via-black to-black',
      border: 'border-emerald-500/30',
      hoverBorder: 'border-emerald-400/60',
      titleColor: 'text-emerald-300',
      titleHoverColor: 'text-white',
      rarityGradient: 'from-emerald-500 to-emerald-600',
      glowColor: 'shadow-emerald-500/30',
      shimmer: 'from-transparent via-emerald-300/20 to-transparent'
    },
    blue: {
      gradient: 'from-blue-900/20 via-black to-black',
      border: 'border-blue-500/30',
      hoverBorder: 'border-blue-400/60',
      titleColor: 'text-blue-300',
      titleHoverColor: 'text-white',
      rarityGradient: 'from-blue-500 to-blue-600',
      glowColor: 'shadow-blue-500/30',
      shimmer: 'from-transparent via-blue-300/20 to-transparent'
    }
  };

  // Image size configurations
  const imageSizes = {
    small: 'w-32 h-32 max-w-32 max-h-32',
    medium: 'w-48 h-48 max-w-48 max-h-48',
    large: 'w-64 h-64 max-w-64 max-h-64',
    xl: 'w-80 h-80 max-w-80 max-h-80',
    xxl: 'w-96 h-96 max-w-96 max-h-96',
  };

  const theme = colorThemes[accentColor];
  const sizeClasses = imageSizes[imageSize];

  // Determine if we should show description based on device type
  const shouldShowDescription = isMobile ? showDescription : isHovered;

  return (
    <motion.div
      className={`
        relative w-80 h-96 bg-gradient-to-b ${theme.gradient} rounded-lg 
        border ${(isHovered && !isMobile) || (isMobile && showDescription) ? theme.hoverBorder : theme.border} 
        p-6 cursor-pointer overflow-hidden transition-all duration-300
        ${(isHovered && !isMobile) || (isMobile && showDescription) ? `shadow-2xl ${theme.glowColor}` : 'shadow-lg'}
      `}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTapStart={() => setIsClicked(true)}
      onTap={() => {
        setTimeout(() => setIsClicked(false), 150);
        handleMobileClick();
      }}
      whileHover={!isMobile ? { 
        scale: 1.02,
        rotateY: 2,
        z: 10
      } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Rarity Border Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 
          bg-gradient-to-r ${theme.rarityGradient} p-[1px]
          ${(isHovered && !isMobile) || (isMobile && showDescription) ? 'opacity-100' : ''}
        `}
      >
        <div className="w-full h-full bg-black/90 rounded-lg" />
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />

      {/* Rarity Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`
          absolute top-3 right-3 z-30 px-2 py-1 rounded-full text-xs font-semibold
          bg-gradient-to-r ${theme.rarityGradient} text-white shadow-lg
        `}
      >
        {rarity}
      </motion.div>

      {/* Mobile tap indicator */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showDescription ? 0 : 0.6 }}
          className="absolute bottom-3 left-3 z-30 text-white/60 text-xs"
        >
          Tap to {showDescription ? 'show video' : 'read more'}
        </motion.div>
      )}

      {/* Shimmer Effect on Hover/Touch */}
      <div className={`
        absolute inset-0 -translate-x-full transition-transform duration-1000 z-20
        bg-gradient-to-r ${theme.shimmer}
        ${shouldShowDescription ? 'translate-x-full' : ''}
      `} />
      
      <AnimatePresence mode="wait">
        {!shouldShowDescription ? (
          // Default state: Show image with title and subtitle
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-full flex flex-col z-20"
          >
            {/* Image with custom sizing and translation */}
            <div className="flex-1 relative mb-4 flex items-center justify-center">
              {/* Floating Particles on Hover */}
              {shouldShowDescription && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 0,
                        scale: 0,
                        x: Math.random() * 100,
                        y: Math.random() * 100
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: -20
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className={`
                        absolute w-1 h-1 rounded-full 
                        bg-gradient-to-r ${theme.rarityGradient}
                      `}
                    />
                  ))}
                </div>
              )}

              <motion.img
                src={petImage}
                alt={petName}
                className={`${sizeClasses} object-contain filter drop-shadow-lg`}
                style={{
                  transform: `translate(${imageTranslate.x}px, ${imageTranslate.y}px)`
                }}
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Title and subtitle */}
            <div className="text-center">
              <motion.h3 
                className="text-2xl font-bold text-white mb-2"
                style={
                  titleTranslate ? {
                    transform: `translate(${titleTranslate.x}px, ${titleTranslate.y}px)`
                  } : undefined
                }
                whileHover={!isMobile ? { scale: 1.05 } : {}}
              >
                {petName}
              </motion.h3>
              <p 
                className={`text-lg ${theme.titleColor}`}
                style={
                  subtitleTranslate ? {
                    transform: `translate(${subtitleTranslate.x}px, ${subtitleTranslate.y}px)`
                  } : undefined
                }
              >
                {petSubtitle}
              </p>
            </div>
          </motion.div>
        ) : (
          // Hovered/Tapped state: Show description with enhanced animations
          <motion.div
            key="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative h-full flex flex-col justify-center items-center text-center z-20 px-4"
          >
            {/* Enhanced Title */}
            <motion.h3 
              className={`text-3xl font-bold ${theme.titleHoverColor} mb-3`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {petName}
            </motion.h3>
            
            {/* Enhanced Subtitle */}
            <motion.p 
              className={`text-xl ${theme.titleColor} mb-6`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {petSubtitle}
            </motion.p>
            
            {/* Enhanced Description with scroll */}
            <motion.div 
              className="max-w-xs overflow-y-auto max-h-48 custom-scrollbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-300 text-sm leading-relaxed">
                {petDescription}
              </p>
            </motion.div>

            {/* Interactive Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 flex justify-center space-x-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  px-3 py-1 text-xs rounded-full border transition-colors
                  bg-${accentColor}-500/20 text-${accentColor}-300 
                  border-${accentColor}-500/30 hover:bg-${accentColor}-500/30
                `}
              >
                Learn More
              </motion.button>
              
              {/* Mobile-specific back button */}
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDescription(false);
                  }}
                  className="px-3 py-1 text-xs rounded-full border transition-colors bg-gray-500/20 text-gray-300 border-gray-500/30 hover:bg-gray-500/30"
                >
                  Back
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Ripple Effect */}
      {isClicked && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-lg bg-white/20 pointer-events-none z-30"
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
      `}</style>
    </motion.div>
  );
};

export default PetLoreContainer;