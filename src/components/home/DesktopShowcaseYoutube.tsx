'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureGallery() {
  // Replace this with your actual YouTube video ID
  const YOUTUBE_VIDEO_ID = "9PiNTBPI2-U"; // Example ID - replace with your video ID
  
  return (
    <section className="relative py-24 overflow-hidden">
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
              Your Very Own Sidekick!
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
              Whether you're watching lectures, gaming, or just browsing, your SoPet is there to keep you company and make every moment more fun.
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