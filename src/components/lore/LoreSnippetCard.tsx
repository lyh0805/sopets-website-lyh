'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LoreSnippetCardProps {
  title: string;
  content: React.ReactNode;
  mediaSrc?: string;
  mediaType?: 'video' | 'image';
  accentColor?: 'purple' | 'pink' | 'emerald' | 'blue' | 'red' | 'indigo';
  className?: string;
}

const LoreSnippetCard: React.FC<LoreSnippetCardProps> = ({
  title,
  content,
  mediaSrc,
  mediaType = 'video',
  accentColor = 'purple',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const colorThemes = {
    purple: {
      gradient: 'from-purple-950/20 via-black/40 to-purple-900/30',
      border: 'border-purple-500/20',
      hoverBorder: 'border-purple-400/60',
      titleColor: 'text-purple-300',
      glowColor: 'shadow-purple-500/30',
    },
    pink: {
      gradient: 'from-pink-950/20 via-black/40 to-purple-900/30',
      border: 'border-pink-500/20',
      hoverBorder: 'border-pink-400/60',
      titleColor: 'text-pink-300',
      glowColor: 'shadow-pink-500/30',
    },
    emerald: {
      gradient: 'from-emerald-950/20 via-black/40 to-green-900/30',
      border: 'border-emerald-500/20',
      hoverBorder: 'border-emerald-400/60',
      titleColor: 'text-emerald-300',
      glowColor: 'shadow-emerald-500/30',
    },
    blue: {
      gradient: 'from-blue-950/20 via-black/40 to-cyan-900/30',
      border: 'border-blue-500/20',
      hoverBorder: 'border-blue-400/60',
      titleColor: 'text-blue-300',
      glowColor: 'shadow-blue-500/30',
    },
    red: {
      gradient: 'from-red-950/20 via-black/40 to-orange-900/30',
      border: 'border-red-500/20',
      hoverBorder: 'border-red-400/60',
      titleColor: 'text-red-300',
      glowColor: 'shadow-red-500/30',
    },
    indigo: {
      gradient: 'from-indigo-950/20 via-black/40 to-purple-900/30',
      border: 'border-indigo-500/20',
      hoverBorder: 'border-indigo-400/60',
      titleColor: 'text-indigo-300',
      glowColor: 'shadow-indigo-500/30',
    }
  };

  const theme = colorThemes[accentColor];

  const renderMedia = () => {
    if (!mediaSrc) return null;

    if (mediaType === 'video') {
      return (
        <div 
          className={`
            absolute inset-0 z-10 transition-opacity duration-500
            ${isHovered ? 'opacity-20' : 'opacity-100'}
          `}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={mediaSrc} type="video/mp4" />
          </video>
          
          {/* Video overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>
      );
    } else {
      return (
        <div 
          className={`
            absolute inset-0 z-10 transition-opacity duration-500
            ${isHovered ? 'opacity-20' : 'opacity-100'}
          `}
        >
          <Image
            src={mediaSrc}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            priority
          />
          
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>
      );
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title above the card */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`text-4xl font-bold ${theme.titleColor} text-center`}
      >
        {title}
      </motion.h2>

      {/* Card container */}
      <motion.div
        className={`
          relative rounded-3xl overflow-hidden cursor-pointer
          border ${isHovered ? theme.hoverBorder : theme.border}
          transition-all duration-300
          ${isHovered ? `shadow-2xl ${theme.glowColor}` : 'shadow-lg'}
          min-h-[500px] w-full
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Media Background */}
        {renderMedia()}

        {/* Background gradient when no media */}
        {!mediaSrc && (
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
        )}

        {/* Loading placeholder for images */}
        {mediaSrc && mediaType === 'image' && !imageLoaded && (
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-20 h-full min-h-[500px]">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              // Default state: Show media with minimal overlay
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full flex items-center justify-center p-8"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="text-white/80 text-lg font-medium bg-black/40 px-6 py-3 rounded-lg backdrop-blur-sm"
                  >
                    Hover to reveal the story
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              // Hovered state: Show content with full background
              <motion.div
                key="hovered"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full p-8 bg-black/90 backdrop-blur-sm"
              >
                {/* Content background */}
                <div className={`h-full rounded-2xl bg-gradient-to-br ${theme.gradient} p-8 overflow-y-auto`}>
                  <div className="prose prose-2xl prose-invert max-w-none text-center">
                    {content}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style jsx>{`
        /* Custom scrollbar styling */
        .prose::-webkit-scrollbar {
          width: 6px;
        }
        .prose::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .prose::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.6);
          border-radius: 3px;
        }
        .prose::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.8);
        }
      `}</style>
    </div>
  );
};

export default LoreSnippetCard;