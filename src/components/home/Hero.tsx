'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const petRef = useRef<HTMLDivElement>(null);

  const [isPetActive, setIsPetActive] = useState(false);
  const [currentGif, setCurrentGif] = useState('dragon_naive-sleeping.gif');
  const [isPetVisible, setIsPetVisible] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const form = formRef.current;
    const pet = petRef.current;

    if (!section || !content || !bg || !logo || !text || !form) return;

    // Intersection Observer to track when Hero section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPetVisible(entry.isIntersecting);
      },
      {
        threshold: 0.75, // Hide pet when less than 10% of Hero is visible
        rootMargin: '-50px 0px -50px 0px' // Add some margin for better UX
      }
    );

    observer.observe(section);

    if (!pet) return;

    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(bg,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    )
    .fromTo(logo,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.5"
    )
    .fromTo(text,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.7"
    )
    .fromTo(form,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(pet,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.3"
    );

    // Parallax effect on scroll
    gsap.to(bg, {
      yPercent: 30,
      scale: 1.1,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        scrub: true
      }
    });

    // Content fade out on scroll
    gsap.to(content, {
      yPercent: -5,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "bottom center",
        scrub: true
      }
    });

    // Pet parallax effect - moves slightly with scroll
    if (pet) {
      gsap.to(pet, {
        yPercent: -10,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          scrub: true
        }
      });
    }

    // Mouse move effect for subtle background parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bg, {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // Handle pet interaction - works for both hover (desktop) and touch (mobile)
  const handlePetStart = () => {
    setIsPetActive(true);
    setCurrentGif('dragon_naive-petting.gif');
  };

  const handlePetEnd = () => {
    setIsPetActive(false);
    setCurrentGif('dragon_naive-attempt_to_fly.gif');
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling when touching the pet
    handlePetStart();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handlePetEnd();
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/Splashart_noLOGO.jpg"
          alt="SoPets magical world"
          fill
          sizes="100vw"
          className="object-cover object-right"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      {/* Interactive Pet */}
      {isPetVisible && (
        <div 
          ref={petRef}
          className="fixed bottom-10 left-8 z-20 cursor-pointer select-none"
          // Desktop hover events
          onMouseEnter={handlePetStart}
          onMouseLeave={handlePetEnd}
          // Mobile touch events
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd} // Handle when touch is interrupted
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-24 h-24 md:w-32 md:h-32"
          >
            <Image
              src={`/${currentGif}`}
              alt="SoPet companion"
              fill
              className="object-contain"
              unoptimized // Important for GIFs to animate properly
              draggable={false} // Prevent dragging on mobile
            />
            {/* Visual feedback for active state */}
            {isPetActive && (
              <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-xl animate-pulse" />
            )}
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[calc(100vh-5rem)] flex items-center sm:items-center md:items-center">
        <div ref={contentRef} className="max-w-xl mt-[-20vh] sm:mt-0 md:mt-0">
          <div ref={logoRef} className="mb-4 sm:mb-6 max-w-[280px] sm:max-w-[350px]">
            <Image
              src="/sopets_logo.png"
              alt="SoPets"
              width={192}
              height={64}
              priority
              className="w-full h-auto"
            />
          </div>
          
          <div ref={textRef} className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 font-semibold mb-2">
              A little friend for your screen 
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              SoPets are gentle digital pets that keep you company while you work, study, or relax. Like a cozy plant on your desk, your SoPet brings calm, warmth, and joy to your digital world.
            </p>
          </div>

          <form 
            ref={formRef}
            className="relative flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
          </form>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-0 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            onClick={() => window.open('https://discord.com/invite/V3YneV4Wzs', '_blank')}
          >
            <span className="flex items-center justify-center">
              Join Our Community!
            </span>
          </motion.button>
          <p className="mt-2 text-sm text-gray-400 pl-2">
            * Claim rewards and interact with other players!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;