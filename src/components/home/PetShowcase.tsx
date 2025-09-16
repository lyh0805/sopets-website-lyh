'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Pet {
  id: string;
  name: string;
  description: string;
  image: string;
  background: string;
  traits: string[];
}

const samplePets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    description: 'A mystical creature that glows in the moonlight',
    image: '/pets/pet_0.png',
    background: '/necroland_bg.png',
    traits: ['Magical', 'Nocturnal', 'Friendly'],
  },
  {
    id: '2',
    name: 'Spark',
    description: 'An energetic spirit that brings joy wherever it goes',
    image: '/pets/pet_1.png',
    background: '/gearisland_bg.png',
    traits: ['Energetic', 'Playful', 'Social'],
  },
  {
    id: '3',
    name: 'Aurora',
    description: 'A celestial being born from the northern lights',
    image: '/pets/pet_2.png',
    background: '/candyclouds_bg.png',
    traits: ['Ethereal', 'Graceful', 'Wise'],
  },
];

const PetCard = ({ pet }: { pet: Pet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Link href="/explore">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={pet.background}
            alt="Background"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Pet Image */}
        <div className="relative z-10 aspect-square overflow-hidden">
          <motion.div
            animate={isHovered ? { y: -10 } : { y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={pet.image}
              alt={pet.name}
              width={400}
              height={400}
              className="h-full w-full object-contain p-8 drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6"
            >
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-2 text-xl font-bold text-white"
              >
                {pet.name}
              </motion.h3>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 text-sm text-gray-300"
              >
                {pet.description}
              </motion.p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {pet.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                  >
                    {trait}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always visible name when not hovered */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 p-6 pt-12"
            >
              <h3 className="text-xl font-bold text-white">{pet.name}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

const PetShowcase = () => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Featured Pets
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-300">
            Meet some of our magical companions. Each SoPet is unique with its own personality and traits!
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {samplePets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/explore" className="group inline-flex items-center justify-center">
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl">
              <span className="relative z-10">Explore More Pets!</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PetShowcase; 