'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

interface Trait {
  category: string;
  name: string;
  description: string;
  preview: string;
}

interface TraitCategory {
  name: string;
  traits: Trait[];
}

const traitCategories: TraitCategory[] = [
  {
    name: 'Species',
    traits: [
      { category: 'Species', name: 'Dragon', description: 'Majestic and powerful', preview: '🐉' },
      { category: 'Species', name: 'Phoenix', description: 'Eternal and radiant', preview: '🦅' },
      { category: 'Species', name: 'Unicorn', description: 'Magical and pure', preview: '🦄' },
    ],
  },
  {
    name: 'Element',
    traits: [
      { category: 'Element', name: 'Fire', description: 'Passionate and energetic', preview: '🔥' },
      { category: 'Element', name: 'Water', description: 'Calm and adaptable', preview: '💧' },
      { category: 'Element', name: 'Nature', description: 'Growing and nurturing', preview: '🌿' },
    ],
  },
  {
    name: 'Personality',
    traits: [
      { category: 'Personality', name: 'Playful', description: 'Always ready for fun', preview: '😊' },
      { category: 'Personality', name: 'Mysterious', description: 'Deep and enigmatic', preview: '🌙' },
      { category: 'Personality', name: 'Brave', description: 'Courageous and bold', preview: '⚔️' },
    ],
  },
];

interface PetCustomizerProps {
  onComplete: (selectedTraits: Record<string, Trait>) => void;
}

const PetCustomizer: React.FC<PetCustomizerProps> = ({ onComplete }) => {
  const [selectedTraits, setSelectedTraits] = useState<Record<string, Trait>>({});
  const [{ rotation }, api] = useSpring(() => ({
    rotation: 0,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const handleTraitSelect = (trait: Trait) => {
    setSelectedTraits(prev => ({
      ...prev,
      [trait.category]: trait,
    }));
    api.start({ rotation: rotation.get() + 360 });
  };

  const isComplete = Object.keys(selectedTraits).length === traitCategories.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black p-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Customize Your SoPet
          </h2>
          <p className="mb-12 text-gray-300">
            Choose your pet's traits carefully - they will define its unique personality!
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Preview Section */}
          <div className="rounded-xl bg-white/5 p-6 backdrop-blur-lg">
            <h3 className="mb-4 text-xl font-semibold text-white">Preview</h3>
            <animated.div
              style={{
                transform: rotation.to(r => `rotate(${r}deg)`),
              }}
              className="aspect-square rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8"
            >
              <div className="flex h-full flex-col items-center justify-center space-y-4">
                {Object.values(selectedTraits).map((trait) => (
                  <motion.div
                    key={trait.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl"
                  >
                    {trait.preview}
                  </motion.div>
                ))}
                {Object.keys(selectedTraits).length === 0 && (
                  <p className="text-center text-gray-400">
                    Select traits to preview your SoPet
                  </p>
                )}
              </div>
            </animated.div>
          </div>

          {/* Traits Selection */}
          <div className="space-y-8">
            {traitCategories.map((category) => (
              <div key={category.name} className="rounded-xl bg-white/5 p-6 backdrop-blur-lg">
                <h3 className="mb-4 text-xl font-semibold text-white">
                  {category.name}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.traits.map((trait) => (
                    <motion.button
                      key={trait.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTraitSelect(trait)}
                      className={`w-full rounded-lg p-4 text-left transition-colors ${
                        selectedTraits[category.name]?.name === trait.name
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <div className="mb-2 text-3xl">{trait.preview}</div>
                      <div className="font-semibold">{trait.name}</div>
                      <div className="text-sm opacity-80">{trait.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => isComplete && onComplete(selectedTraits)}
            className={`rounded-full px-8 py-3 text-lg font-semibold transition-all ${
              isComplete
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isComplete}
          >
            {isComplete ? 'Create My SoPet' : 'Select All Traits to Continue'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PetCustomizer; 