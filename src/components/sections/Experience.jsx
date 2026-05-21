import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Experience() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);
  const itemsRef = useRef([]);

  const positions = [
    {
      period: '',
      role: 'FULLSTACK & MOBILE DEVELOPER',
      company: 'FREELANCE / PERSONAL PROJECTS',
      desc: 'Building modern React websites, Flutter mobile apps, and backend systems with Node.js and Java. Focused on clean UI, smooth user experience, responsive layouts, and scalable application structure.',
    },
    {
      period: '',
      role: 'FRONTEND & UI DEVELOPER',
      company: 'WEB DEVELOPMENT PROJECTS',
      desc: 'Designed and developed responsive user interfaces using React, Tailwind CSS, and modern frontend tools. Worked on dashboard systems, animations, reusable components, and interactive web experiences.',
    },
    {
      period: '',
      role: 'BACKEND & API DEVELOPER',
      company: 'SOFTWARE PROJECTS',
      desc: 'Created backend APIs and application logic using Node.js and Java. Integrated authentication systems, real-time features, databases, and optimized application performance for production-ready projects.',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Dynamic vertical progress line fill on scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      // Staggered fades for timeline rows
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="w-full min-h-screen py-20 md:py-24 max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="mb-16 select-text">
        <span className="font-space font-semibold text-[10px] tracking-widest text-[#00bfff] uppercase block mb-3">
          
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#f5f5f5] uppercase">
          What I Do
        </h2>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full flex flex-col gap-16 select-text">
        {/* Base Timeline Track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
        
        {/* Progress Track */}
        <div
          ref={progressLineRef}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-[#00ff88] origin-top -translate-x-1/2"
        />

        {/* Timeline Rows */}
        {positions.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full md:gap-12 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Center Bullet */}
              <div
                className="absolute left-6 md:left-1/2 top-2 md:top-auto w-3 h-3 rounded-full border bg-[#050505] -translate-x-1/2 z-20 flex items-center justify-center transition-all duration-300 hover:scale-125"
                style={{ borderColor: isLeft ? '#00ff88' : '#00bfff' }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: isLeft ? '#00ff88' : '#00bfff' }}
                />
              </div>

              {/* Data Card */}
              <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                <div className="glass-panel p-8 rounded-[2rem] border-white/5 bg-[#0f0f0f]/10 relative group hover:border-[#00ff88]/20 transition-all duration-500">
                  
                  {/* Period */}
                  <span className="font-space text-[10px] font-bold text-[#808080] tracking-widest block mb-2">
                    {item.period}
                  </span>
                  
                  {/* Role */}
                  <h3 className="font-display font-bold text-lg md:text-xl text-[#f5f5f5] tracking-tight uppercase group-hover:text-[#00ff88] transition-colors duration-300">
                    {item.role}
                  </h3>
                  
                  {/* Company */}
                  <span className="font-space text-[11px] font-semibold text-[#00bfff] tracking-wide block mt-1 mb-4">
                    {item.company}
                  </span>
                  
                  {/* Description */}
                  <p className={`font-sans text-xs md:text-sm text-[#808080] leading-relaxed max-w-md ${
                    isLeft ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'
                  }`}>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}