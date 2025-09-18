'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FeatureGallery() {
  // Replace this with the up to date YouTube video ID
  const YOUTUBE_VIDEO_ID = "HGfT8zqZWxg";
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Static Pet in Top Left */}
      <div className="relative top-[170px] right-[-70px] z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          className="w-24 h-24 md:w-32 md:h-32 cursor-pointer group"
        >
          <div className="relative w-full h-full">
            <Image
              src="dragon_naive-flying.gif"
              alt="SoPet companion"
              fill
              className="object-contain transition-all duration-300"
              unoptimized // Important for GIFs to animate properly
            />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Moved content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Always There, Just for You 🌿
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
              During long study sessions, cozy gaming nights, or quiet browsing, your SoPet moves gently across your screen — a small, reassuring friend who's always nearby. Interact when you want, or simply enjoy their calming presence in the background.
            </p>
          </motion.div>
        </div>
        {/* YouTube Video Container */}
        <div className="relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[16/9] mb-8 bg-gray-900">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&showinfo=0`}
            title="SoPets Desktop Guide"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}