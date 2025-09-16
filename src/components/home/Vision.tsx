import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import SpinePet from '../SpinePlayer';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Vision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    // Fade in content with stagger
    gsap.fromTo(
      content.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Parallax effect for the image
    gsap.to(image, {
      y: -50,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-black to-purple-900/20 pt-24 pb-8"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.1),transparent_70%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left side - Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
              Our Vision
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-300">
            To create digital pets that truly feel alive — pets that coexist with you in your digital world. We built SoPets to exist on both desktop and mobile, so your little guy is always by your side, whether you're working, socializing, gaming, or just chilling.
            </p>
            
          </div>

          {/* Right side - Interactive Image */}
          <div ref={imageRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-square">
              {/* Background image */}
              <div className="absolute inset-0 z-10 overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/gearisland_bg.png")' }} />
              </div>
              {/* Floating pet animation */}
              <div className="absolute left-1/2 top-1/2 z-20 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/3">
                <SpinePet
                  jsonUrl="/spine/Dragon_Pink.json"
                  atlasUrl="/spine/Dragon_Pink.atlas"
                  initialAnimation="idle"
                  clickSequence={['excited', 'idle']}
                  className="spine-player-hover"
                />
              </div>
              {/* Decorative circle */}
              <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
              {/* Device icons */}
              <div className="absolute left-0 top-0 transition-all duration-300 hover:scale-110 hover:text-purple-400">
                <FaDesktop className="h-16 w-16 text-white/30" />
              </div>
              <div className="absolute bottom-0 right-0 transition-all duration-300 hover:scale-110 hover:text-purple-400">
                <FaMobileAlt className="h-16 w-16 text-white/30" />
              </div>
              <div className="absolute right-0 top-0 transition-all duration-300 hover:scale-110 hover:text-purple-400">
                <FaTabletAlt className="h-16 w-16 text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision; 