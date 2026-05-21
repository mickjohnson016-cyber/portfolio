import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      elementsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full min-h-screen py-20 md:py-24 max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center"
    >
      {/* Section Header */}
      <div
        ref={(el) => (elementsRef.current[0] = el)}
        className="mb-12 select-text"
      >
        <span className="font-space font-semibold text-[10px] tracking-widest text-[#00bfff] uppercase block mb-3">
          01 // ABOUT ME
        </span>

        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#f5f5f5] uppercase">
          FULLSTACK WEB & MOBILE DEVELOPER
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start select-text">
        {/* Left Content */}
        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="lg:col-span-2 flex flex-col gap-6 text-[#a0a0a0] font-sans text-sm md:text-base leading-relaxed"
        >
          <p className="text-white text-lg font-medium">
            I build modern websites, mobile applications, admin dashboards,
            and digital platforms with a strong focus on clean UI,
            responsiveness, and user experience.
          </p>

          <p>
            My main stack includes React, Next.js, Flutter, Node.js,
            JavaScript, TypeScript, and Java. I enjoy creating smooth,
            professional interfaces that feel modern and work well across
            all screen sizes.
          </p>

          <p>
            I work on frontend development, mobile app development,
            backend integration, API systems, dashboard interfaces,
            and modern UI design for real-world applications.
          </p>

          <p>
            I also focus on clean layouts, animations, structured code,
            and building interfaces that look premium while remaining
            fast, simple, and easy to use.
          </p>
        </div>

        {/* Technical Profile */}
        <div
          ref={(el) => (elementsRef.current[2] = el)}
          className="glass-panel p-7 rounded-3xl flex flex-col gap-5 border-white/5 bg-[#0f0f0f]/20 shadow-2xl"
        >
          <h3 className="font-space text-xs font-semibold uppercase tracking-widest text-[#f5f5f5] border-b border-white/5 pb-3">
            TECH STACK
          </h3>

          <div className="flex flex-col gap-4">
            <div>
              <span className="font-space text-[9px] text-[#505050] uppercase block">
                FRONTEND
              </span>

              <span className="font-display text-lg font-bold text-[#00ff88]">
                REACT / NEXT.JS / TYPESCRIPT
              </span>
            </div>

            <div>
              <span className="font-space text-[9px] text-[#505050] uppercase block">
                MOBILE
              </span>

              <span className="font-display text-lg font-bold text-[#f5f5f5]">
                FLUTTER / DART
              </span>
            </div>

            <div>
              <span className="font-space text-[9px] text-[#505050] uppercase block">
                BACKEND
              </span>

              <span className="font-display text-lg font-bold text-[#00bfff]">
                NODE.JS / JAVA / APIs
              </span>
            </div>

            <div>
              <span className="font-space text-[9px] text-[#505050] uppercase block">
                UI & ANIMATION
              </span>

              <span className="font-display text-lg font-bold text-[#f5f5f5]">
                GSAP / TAILWIND CSS / MODERN UI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 select-text">
        {/* Card 1 */}
        <div
          ref={(el) => (elementsRef.current[3] = el)}
          className="glass-card p-6 md:p-8 rounded-3xl"
        >
          <div className="text-[10px] font-space text-[#00ff88] mb-3">
            WEB DEVELOPMENT
          </div>

          <h4 className="font-display font-semibold text-base text-[#f5f5f5] mb-2">
            MODERN FRONTEND UI
          </h4>

          <p className="font-sans text-[13px] text-[#808080] leading-relaxed">
            Building responsive websites and frontend interfaces using
            React, Next.js, Tailwind CSS, and modern UI practices.
          </p>
        </div>

        {/* Card 2 */}
        <div
          ref={(el) => (elementsRef.current[4] = el)}
          className="glass-card p-6 md:p-8 rounded-3xl"
        >
          <div className="text-[10px] font-space text-[#00bfff] mb-3">
             MOBILE & BACKEND
          </div>

          <h4 className="font-display font-semibold text-base text-[#f5f5f5] mb-2">
            APPLICATION DEVELOPMENT
          </h4>

          <p className="font-sans text-[13px] text-[#808080] leading-relaxed">
            Creating mobile applications with Flutter and integrating
            backend systems, APIs, and scalable services using Node.js
            and Java.
          </p>
        </div>

        {/* Card 3 */}
        <div
          ref={(el) => (elementsRef.current[5] = el)}
          className="glass-card p-6 md:p-8 rounded-3xl"
        >
          <div className="text-[10px] font-space text-[#f5f5f5] mb-3">
             UI & EXPERIENCE
          </div>

          <h4 className="font-display font-semibold text-base text-[#f5f5f5] mb-2">
            CLEAN DIGITAL DESIGN
          </h4>

          <p className="font-sans text-[13px] text-[#808080] leading-relaxed">
            Designing smooth user experiences, clean layouts,
            modern dashboards, animations, and professional interfaces
            that feel polished and easy to use.
          </p>
        </div>
      </div>
    </section>
  );
}