import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Skills() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      rowsRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
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

  const corePillars = [
    {
      index: '01',
      title: 'Frontend Web Development',
      description:
        'Building modern responsive web applications using React, Next.js, TypeScript, and TailwindCSS with clean UI structure and smooth user experience.',
      tools: [
        'React',
        'Next.js',
        'TypeScript',
        'TailwindCSS',
        'JavaScript',
        'Responsive UI',
      ],
    },
    {
      index: '02',
      title: 'Mobile App Development',
      description:
        'Developing cross-platform mobile applications with Flutter and Firebase focused on performance, authentication, and clean mobile interfaces.',
      tools: [
        'Flutter',
        'Dart',
        'Firebase',
        'REST API',
        'Mobile UI',
        'App Optimization',
      ],
    },
    {
      index: '03',
      title: 'Backend & APIs',
      description:
        'Creating backend systems, authentication flows, admin dashboards, and API integrations using Node.js, Java, Supabase, and modern database structures.',
      tools: [
        'Node.js',
        'Java',
        'Supabase',
        'MySQL',
        'Authentication',
        'API Integration',
      ],
    },
    {
      index: '04',
      title: 'Creative Development',
      description:
        'Designing interactive user experiences with animations, smooth scrolling, modern layouts, and cinematic frontend effects for professional portfolio interfaces.',
      tools: [
        'GSAP',
        'Three.js',
        'Framer Motion',
        'UI Animation',
        'Creative UI',
        'Modern Design',
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full min-h-screen py-20 md:py-24 max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="mb-14 select-text">
        <span className="font-space font-semibold text-[10px] tracking-widest text-[#00bfff] uppercase block mb-3">
          03 // SKILLS & TECHNOLOGIES
        </span>

        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#f5f5f5] uppercase">
          What I Build
        </h2>
      </div>

      {/* Skills Cards */}
      <div className="w-full flex flex-col gap-5 select-text">
        {corePillars.map((pillar, index) => (
          <div
            key={pillar.index}
            ref={(el) => (rowsRef.current[index] = el)}
            className="w-full glass-panel p-6 md:p-8 rounded-[2rem] border-white/5 bg-[#0f0f0f]/10 flex flex-col md:flex-row gap-5 md:gap-10 items-start justify-between group transition-all duration-500 hover:bg-white/[0.02] hover:border-white/10"
          >
            {/* Left */}
            <div className="w-full md:w-1/3 flex items-center gap-5">
              <span className="font-space text-xs font-semibold text-[#505050] border border-white/5 rounded-full w-8 h-8 flex items-center justify-center bg-white/5">
                {pillar.index}
              </span>

              <h3 className="font-display font-bold text-lg md:text-xl text-[#f5f5f5] tracking-tight group-hover:text-[#00bfff] transition-colors duration-300">
                {pillar.title}
              </h3>
            </div>

            {/* Center */}
            <div className="w-full md:w-2/5 font-sans text-xs md:text-sm text-[#808080] leading-relaxed">
              {pillar.description}
            </div>

            {/* Right */}
            <div className="w-full md:w-1/4 flex flex-wrap gap-2 justify-start md:justify-end">
              {pillar.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-space text-[9px] font-semibold tracking-wider text-[#a0a0a0] bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded transition-colors duration-300 group-hover:border-[#00bfff]/20 group-hover:text-[#00bfff]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}