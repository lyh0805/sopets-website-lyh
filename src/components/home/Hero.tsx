'use client';

import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const form = formRef.current;

    if (!section || !content || !bg || !logo || !text || !form) return;

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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/splash.png"
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

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[calc(100vh-5rem)] flex items-center">
        <div ref={contentRef} className="max-w-xl">
          <div ref={logoRef} className="mb-6 max-w-[350px]">
            <Image
              src="/sopets_logo.png"
              alt="SoPets"
              width={192}
              height={64}
              priority
              className="w-full h-auto"
            />
          </div>
          
          <div ref={textRef} className="mb-8">
            <h2 className="text-xl text-gray-300 md:text-2xl font-semibold mb-2">
              A little friend for your screen 
            </h2>
            <p className="text-lg text-gray-400 md:text-xl">
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
            className="mt-0 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
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

// Email sign-up and handling code for future reference
// const [email, setEmail] = useState('');
// const [isSubmitted, setIsSubmitted] = useState(false);
// const [isValid, setIsValid] = useState(true);

// const validateEmail = (email: string) => {
//   return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
// };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
  
//   if (!validateEmail(email)) {
//     setIsValid(false);
//     return;
//   }
  
//   setIsValid(true);
//   setIsSubmitted(true);
//   setTimeout(() => {
//     setIsSubmitted(false);
//     setEmail('');
//   }, 3000);
// };

export default Hero;