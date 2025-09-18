'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureGallery() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* <h2 className="text-4xl font-bold text-white lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300 mb-8">
            SoPets Desktop (Open Beta Live Now!)
          </h2> */}
          
          {/* Moved content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            More Companions on the Way 📱
            
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
            In the near future, you can connect with friends to welcome new SoPets. Each meeting is a chance to uncover a cozy surprise.
            </p>
          </motion.div>
        </div>

        {/* Video Container */}
        <div className="relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[16/9] mb-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/features/tap_to_collect.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}