'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Dynamically import components with SSR disabled
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });
const HatchedDragon = dynamic(() => import('@/components/mint/HatchedDragon'), { ssr: false });
const SpineEgg = dynamic(() => import('@/components/mint/SpineEgg'), { ssr: false });

type MintingStep = 'auth' | 'hatching' | 'complete';

const MintPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState<MintingStep>('auth');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [isDragonLoaded, setIsDragonLoaded] = useState(false);

  // Add createPet function
  const createPet = async (userId: string, userEmail: string) => {
    try {
      console.log('Starting pet creation process...');
      
      // Generate a random number between 0 and 13 for pet selection
      const petNumber = Math.floor(Math.random() * 14);
      const petImage = `/pets/pet_${petNumber}.png`;

      console.log('Generated random pet:', { petNumber, petImage });

      // Create the pet in Supabase
      const { data, error } = await supabase
        .from('pets')
        .insert([
          {
            id: uuidv4(),
            user_id: userId,
            name: `Pet #${Math.floor(Math.random() * 1000)}`,
            image: petImage,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      console.log('Pet created successfully:', data);
    } catch (err) {
      console.error('Error in pet creation process:', err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (session && step === 'auth') {
      setStep('hatching');
    }
  }, [session, step]);

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  const handleHatchComplete = () => {
            setStep('complete');
            setShowConfetti(true);
            
            // Create pet when hatching completes
            if (session?.user?.id && session?.user?.email) {
              console.log('Starting hatching completion process...', {
                userId: session.user.id,
                userEmail: session.user.email
              });
              createPet(session.user.id, session.user.email);
            } else {
              console.error('Missing user data:', { session });
            }
            
            // Set flag in localStorage when hatching is complete
            localStorage.setItem('petJustHatched', 'true');
            // Hide confetti after 5 seconds
            setTimeout(() => setShowConfetti(false), 5000);
  };

  const renderAuthStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center space-y-8"
    >
      <h2 className="text-3xl font-bold text-white">Begin Your Journey Together</h2>
      <p className="text-center text-gray-300">
        Sign in to start your adventure and meet your new companion
      </p>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center space-x-2 rounded-lg bg-white px-6 py-3 text-gray-800 shadow-lg transition-all hover:shadow-xl"
        >
          <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="h-5 w-5"
          />
        <span>Continue with Google</span>
      </button>
    </motion.div>
  );

  const renderHatchingStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center space-y-8 md:space-y-12 text-center px-4 md:px-0"
    >
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Your Pet is Ready to Hatch!
        </h2>
        <p className="text-base md:text-lg text-gray-300">
          Tap the egg to help your pet break free
        </p>
      </div>
      <div className="flex justify-center items-center w-full overflow-visible -mt-8 md:mt-0">
        <SpineEgg onComplete={handleHatchComplete} className="transform-gpu" />
      </div>
      <div className="hidden">
        <HatchedDragon preload onLoad={() => setIsDragonLoaded(true)} />
      </div>
    </motion.div>
  );

  const renderCompleteStep = () => {
    return (
      <div className="flex min-h-[700px] w-full flex-col items-center justify-center relative">
        {showConfetti && (
          <div className="fixed inset-0 z-[40]">
            <Confetti
              width={window.innerWidth * 1.2}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
              tweenDuration={4000}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 h-[600px] w-full z-[50]"
        >
          <HatchedDragon className="w-full h-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center z-[50]"
        >
          <h1 className="mb-4 text-4xl font-bold text-white">
            Congratulations!
          </h1>
          <p className="mb-8 text-xl text-white/80">
            Your SoPet has hatched successfully!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/explore')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-visible bg-gradient-to-b from-purple-900/20 via-black to-black py-12 md:py-24">
      {/* Background animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl overflow-visible">
        <AnimatePresence mode="wait">
          {step === 'auth' && renderAuthStep()}
          {step === 'hatching' && renderHatchingStep()}
          {step === 'complete' && renderCompleteStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MintPage; 