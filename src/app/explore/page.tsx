'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ErrorBoundary from '../../components/ErrorBoundary';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Pet {
  id: string;
  name: string;
  description: string;
  image: string;
  background: string;
  traits: string[];
  rarity: string;
}

const backgrounds = [
  '/candyclouds_bg.png',
  '/tropicalisland_bg.png',
  '/necroland_bg.png',
  '/gearisland_bg.png'
];

const petNames = [
  'Luna', 'Spark', 'Aurora', 'Blaze', 'Crystal', 'Echo', 'Frost', 'Glow',
  'Harmony', 'Iris', 'Jade', 'Kite', 'Lotus', 'Mist', 'Nova', 'Orion'
];

const descriptions = [
  'A mystical creature that glows in the moonlight',
  'An energetic spirit that brings joy wherever it goes',
  'A celestial being born from the northern lights',
  'A fiery companion with a warm heart',
  'A crystalline being that radiates pure energy',
  'A mysterious entity that echoes ancient wisdom',
  'A frost-touched creature with a gentle soul',
  'A radiant being that illuminates the darkness',
  'A harmonious spirit that brings peace',
  'A rainbow-touched creature of pure light',
  'A nature spirit with healing powers',
  'A wind-born companion that soars high',
  'A serene being with blooming potential',
  'A misty phantom with ethereal grace',
  'A cosmic entity born from stardust',
  'A constellation spirit with celestial power'
];

const rarityLevels = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const traitPool = [
  'Magical', 'Friendly', 'Playful', 'Wise', 'Brave', 'Gentle', 'Energetic',
  'Mysterious', 'Graceful', 'Protective', 'Curious', 'Loyal', 'Creative', 'Peaceful'
];

const generateRandomTraits = () => {
  const shuffled = [...traitPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const explorePets: Pet[] = Array.from({ length: 16 }, (_, i) => {
  // Ensure each background is used at least once in the first 4 pets
  const backgroundIndex = i < 4 ? i : Math.floor(Math.random() * backgrounds.length);
  return {
    id: (i + 1).toString(),
    name: petNames[i],
    description: descriptions[i],
    image: `/pets/pet_${i % 14}.png`,
    background: backgrounds[backgroundIndex],
    traits: generateRandomTraits(),
    rarity: rarityLevels[Math.floor(Math.random() * rarityLevels.length)]
  };
});

const PetCard = ({ pet, index }: { pet: Pet; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { 
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={pet.background}
          alt={`${pet.name}'s background`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Pet Image */}
      <div className="relative z-10 aspect-square overflow-hidden">
        <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-110">
          <Image
            src={pet.image}
            alt={pet.name}
            width={400}
            height={400}
            className="h-full w-full object-contain p-8 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Pet Info Overlay */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white">{pet.name}</h3>
          <span className="px-3 py-1 text-sm font-semibold text-white bg-purple-500/50 rounded-full backdrop-blur-sm">
                {pet.rarity}
              </span>
        </div>
        <p className="mb-4 text-sm text-gray-300">{pet.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
              {pet.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                >
                  {trait}
                </span>
              ))}
        </div>
        <div className="flex items-center justify-end">
          <button className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600 transition-colors">
            Coming Soon
              </button>
        </div>
      </div>

      {/* Always visible name when not hovered */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 p-6 transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{pet.name}</h3>
          <span className="px-3 py-1 text-sm font-semibold text-white bg-purple-500/50 rounded-full backdrop-blur-sm">
                {pet.rarity}
              </span>
            </div>
      </div>
    </div>
  );
};

const ExplorePage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Animate header
    gsap.fromTo(headerRef.current,
      { 
        opacity: 0,
        y: -50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    );
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900/20 via-black to-black">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-lg text-gray-300">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-purple-900/20 via-black to-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4 sm:text-5xl">
              Explore SoPets
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover our collection of unique digital companions. Each SoPet comes with its own personality, traits, and a touch of magic.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {explorePets.map((pet, index) => (
              <PetCard key={pet.id} pet={pet} index={index} />
            ))}
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default ExplorePage; 