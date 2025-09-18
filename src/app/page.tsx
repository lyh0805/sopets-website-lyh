'use client';
import React from 'react';
import Hero from '@/components/home/Hero';
import Vision from '@/components/home/Vision';
import DesktopShowcase from '@/components/home/DesktopShowcase';
import MobileShowcase from '@/components/home/MobileShowcase';
import LatestDevelopments from '@/components/home/LatestDevelopments';
import HatchingPreview from '@/components/home/HatchingPreview';
import Timeline from '@/components/home/Timeline';
import SectionDivider from '@/components/home/SectionDivider';
import FloatingParticles from '@/components/ui/FloatingParticles';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Section 1: Hero - Black with subtle particles */}
      <div className="relative bg-black overflow-hidden">
        <FloatingParticles 
          count={15} 
          color="rgba(147, 51, 234, 0.2)"
          maxSize={3}
          minSize={1}
        />
        <div className="relative z-10">
          <Hero />
        </div>
      </div>

      {/* Section 2: Desktop Features - Black with glass effects */}
      <div className="relative bg-black overflow-hidden">
        <FloatingParticles 
          count={12} 
          color="rgba(147, 51, 234, 0.15)"
          maxSize={2}
          minSize={0.5}
        />
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        </div>
        <div className="relative z-10">
          <DesktopShowcase />
        </div>
      </div>

      {/* Section 3: Mobile Features - Purple with enhanced interactivity */}
      <div className="relative bg-gradient-to-b from-purple-900/20 via-purple-900/20 to-purple-900/20 overflow-hidden">
        <FloatingParticles 
          count={30} 
          color="rgba(168, 85, 247, 0.3)"
          maxSize={4}
          minSize={1}
        />
        {/* Dynamic background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <MobileShowcase />
        </div>
      </div>

      {/* Section 4: Hatching Preview - Black with interactive elements */}
      <div className="relative bg-black overflow-hidden">
        <FloatingParticles 
          count={20} 
          color="rgba(147, 51, 234, 0.25)"
          maxSize={3}
          minSize={1}
        />
        {/* Ambient glow effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <HatchingPreview />
        </div>
      </div>

      {/* Section 5: Timeline - Purple with enhanced visual hierarchy */}
      <div className="relative bg-gradient-to-b from-purple-900/20 via-purple-900/20 to-purple-900/20 overflow-hidden">
        <FloatingParticles 
          count={35} 
          color="rgba(168, 85, 247, 0.4)"
          maxSize={6}
          minSize={2}
        />
        {/* Timeline-specific background enhancements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl" />
          <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Timeline />
        </div>
      </div>

      {/* Section 6: Vision - Purple with enhanced particles */}
      <div className="relative bg-gradient-to-b from-purple-900/20 via-purple-900/20 to-purple-900/20 overflow-hidden">
        <FloatingParticles 
          count={25} 
          color="rgba(168, 85, 247, 0.4)"
          maxSize={5}
          minSize={2}
        />
        <div className="relative z-10">
          <Vision />
        </div>
      </div>



      {/* Section 7: Latest Developments - Black with final flourish */}
      <div className="relative bg-black overflow-hidden">
        <FloatingParticles 
          count={18} 
          color="rgba(147, 51, 234, 0.3)"
          maxSize={4}
          minSize={1}
        />
        {/* Final section ambient effects */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-t from-purple-900/30 to-transparent" />
        </div>
        <div className="relative z-10">
          <LatestDevelopments />
        </div>
      </div>

      {/* Global Enhancement: Scroll-based parallax elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle background stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Scroll indicator for enhanced UX */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 opacity-75 hover:opacity-100 transition-opacity">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        /* Animated Black Background */
        @keyframes pulseBlack {
          0%, 100% { 
            background: linear-gradient(135deg, #000000 0%, #1a0a2e 25%, #000000 50%, #0f0514 75%, #000000 100%);
          }
          25% { 
            background: linear-gradient(135deg, #1a0a2e 0%, #000000 25%, #16213e 50%, #000000 75%, #1a0a2e 100%);
          }
          50% { 
            background: linear-gradient(135deg, #0f0514 0%, #16213e 25%, #000000 50%, #1a0a2e 75%, #0f0514 100%);
          }
          75% { 
            background: linear-gradient(135deg, #000000 0%, #0f0514 25%, #1a0a2e 50%, #16213e 75%, #000000 100%);
          }
        }

        /* Animated Purple Background */
        @keyframes pulsePurple {
          0%, 100% { 
            background: linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(124, 58, 237, 0.15) 25%, rgba(147, 51, 234, 0.25) 50%, rgba(168, 85, 247, 0.1) 75%, rgba(88, 28, 135, 0.2) 100%);
          }
          25% { 
            background: linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(147, 51, 234, 0.2) 25%, rgba(168, 85, 247, 0.15) 50%, rgba(196, 125, 249, 0.1) 75%, rgba(124, 58, 237, 0.25) 100%);
          }
          50% { 
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(168, 85, 247, 0.2) 25%, rgba(196, 125, 249, 0.15) 50%, rgba(88, 28, 135, 0.25) 75%, rgba(147, 51, 234, 0.3) 100%);
          }
          75% { 
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(196, 125, 249, 0.15) 25%, rgba(88, 28, 135, 0.3) 50%, rgba(124, 58, 237, 0.2) 75%, rgba(168, 85, 247, 0.2) 100%);
          }
        }

        .animated-bg-black {
          background-size: 200% 200%;
          animation: pulseBlack 20s ease-in-out infinite;
        }

        .animated-bg-purple {
          background-size: 200% 200%;
          animation: pulsePurple 25s ease-in-out infinite;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced focus states for accessibility */
        *:focus-visible {
          outline: 2px solid #a855f7;
          outline-offset: 2px;
        }
      `}</style>
    </main>
  );
}