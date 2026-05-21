import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import KeyboardCard from '@/components/hero/KeyboardCard';

export default function Hero() {
  const sectionRef = useRef(null);
  const titleLinesRef = useRef([]);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    gsap.set([titleLinesRef.current, descRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30,
      force3D: true,
    });

    tl.to(titleLinesRef.current, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 1.2,
      delay: 0.4,
    })
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, '-=0.8')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.7');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-20 gap-8 md:gap-12"
    >
      {/* Left — Content */}
      <div className="w-full md:w-1/2 flex items-center justify-start z-10">
        <div className="max-w-xl flex flex-col items-start text-left select-text">
          {/* Heading */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#f5f5f5] mb-6">
            <span
              ref={(el) => (titleLinesRef.current[0] = el)}
              className="block will-change-transform"
            >
              Fullstack
            </span>
            <span
              ref={(el) => (titleLinesRef.current[1] = el)}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#a0a0a0] to-[#f5f5f5] will-change-transform"
            >
              Developer
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="font-sans text-sm md:text-base text-[#808080] leading-relaxed max-w-md mb-8 will-change-transform"
          >
            I build modern web and mobile applications with clean UI, smooth interactions, and scalable architecture. Focused on React, Flutter, Node.js, and TypeScript.
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap gap-3 items-center will-change-transform"
          >
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-full bg-white text-black font-space font-semibold text-[11px] uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 text-white/80 hover:text-white font-space font-semibold text-[11px] uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Right — WebGL Scene Container */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-[calc(100vh-5rem)] relative will-change-transform z-10">
        <KeyboardCard />
      </div>
    </section>
  );
}