'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PetCardProps {
  name: string;
  image: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description?: string;
  index?: number;
}

const rarityColors = {
  Common: 'from-gray-500 to-gray-600',
  Rare: 'from-blue-500 to-blue-600',
  Epic: 'from-purple-500 to-purple-600',
  Legendary: 'from-yellow-500 to-orange-500',
};

const rarityGlow = {
  Common: 'shadow-gray-500/20',
  Rare: 'shadow-blue-500/30',
  Epic: 'shadow-purple-500/40',
  Legendary: 'shadow-yellow-500/50',
};

export default function InteractivePetCard({ 
  name, 
  image, 
  rarity = 'Common', 
  description,
  index = 0 
}: PetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsClicked(true)}
      onTap={() => setTimeout(() => setIsClicked(false), 150)}
      className="group relative"
    >
      <motion.div
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          z: 10
        }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80
          border border-gray-700/50 backdrop-blur-sm cursor-pointer
          transition-all duration-300 ${rarityGlow[rarity]}
          ${isHovered ? 'shadow-2xl border-purple-500/30' : ''}
        `}
      >
        {/* Rarity Border Glow */}
        <div 
          className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 bg-gradient-to-r ${rarityColors[rarity]} p-[1px]
          `}
        >
          <div className="w-full h-full bg-gray-900/90 rounded-2xl" />
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Rarity Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`
              absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold
              bg-gradient-to-r ${rarityColors[rarity]} text-white shadow-lg
            `}
          >
            {rarity}
          </motion.div>

          {/* Pet Image Container */}
          <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-xl">
            {/* Shimmer Effect */}
            <div className={`
              absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent 
              via-white/20 to-transparent transition-transform duration-1000
              ${isHovered ? 'translate-x-full' : ''}
            `} />
            
            {/* Pet Image */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain filter drop-shadow-lg"
                sizes="128px"
              />
            </motion.div>

            {/* Floating Particles */}
            {isHovered && (
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
                      bg-gradient-to-r ${rarityColors[rarity]}
                    `}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pet Name */}
          <motion.h3
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-white text-center mb-2"
          >
            {name}
          </motion.h3>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                height: isHovered ? 'auto' : 0 
              }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 text-sm text-center overflow-hidden"
            >
              {description}
            </motion.p>
          )}

          {/* Interactive Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex justify-center space-x-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
            >
              View Details
            </motion.button>
          </motion.div>
        </div>

        {/* Click Ripple Effect */}
        {isClicked && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
          />
        )}
      </motion.div>
    </motion.div>
  );
}