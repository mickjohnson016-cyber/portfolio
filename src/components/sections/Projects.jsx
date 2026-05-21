import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Projects() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  const projects = [
    {
      id: '01',
      title: 'FINTECH ADMIN DASHBOARD',
      category: 'WEB DEVELOPMENT // FINTECH',
      tech: ['REACT', 'TYPESCRIPT', 'TAILWIND', 'SUPABASE'],
      desc: 'A modern fintech admin dashboard built for managing users, transactions, support tickets, analytics, and system activity with a clean responsive interface.',
      color: '#00ff88',
    },
    {
      id: '02',
      title: 'MOBILE FINTECH APP',
      category: 'FLUTTER DEVELOPMENT // MOBILE',
      tech: ['FLUTTER', 'DART', 'FIREBASE', 'REST API'],
      desc: 'A cross-platform fintech mobile application focused on smooth user experience, wallet integration, authentication, and fast real-time performance.',
      color: '#00bfff',
    },
    {
      id: '03',
      title: 'FULLSTACK WEB SYSTEMS',
      category: 'BACKEND & FRONTEND DEVELOPMENT',
      tech: ['NODE.JS', 'JAVA', 'MYSQL', 'NEXT.JS'],
      desc: 'Custom fullstack web applications with secure APIs, authentication systems, responsive frontend interfaces, and scalable backend architecture.',
      color: '#ffffff',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalPanels = projects.length;
    const horizontalScrollLength = (totalPanels - 1) * 100;

    const ctx = gsap.context(() => {
      gsap.to(horizontalRef.current, {
        x: () => `-${horizontalScrollLength}vw`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${horizontalRef.current.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#050505]"
    >
      <div className="h-screen flex items-center overflow-hidden">
        {/* Header */}
        <div className="absolute left-6 md:left-12 top-24 z-20 select-text">
          <span className="font-space font-semibold text-[10px] tracking-widest text-[#00bfff] uppercase block mb-3">
            02 // FEATURED WORK
          </span>

          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-[#f5f5f5] uppercase">
            Real Projects & Development Work
          </h2>
        </div>

        {/* Horizontal Cards */}
        <div
          ref={horizontalRef}
          className="flex flex-row flex-nowrap items-center h-full pl-[10vw] pr-[20vw] gap-[10vw]"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[80vw] md:w-[65vw] shrink-0 h-[60vh] flex flex-col md:flex-row items-center justify-between glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-[#0f0f0f]/20 relative select-text overflow-hidden"
            >
              {/* Glow Accent */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                  background: project.color,
                }}
              />

              {/* Left Content */}
              <div className="w-full md:w-3/5 flex flex-col items-start gap-4 z-10">
                <span className="font-space font-semibold text-[10px] tracking-widest text-[#505050] uppercase">
                  {project.category}
                </span>

                <h3 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#f5f5f5] uppercase flex items-center gap-4">
                  <span
                    className="text-xs font-space font-semibold px-2 py-1 rounded border"
                    style={{
                      borderColor: `${project.color}33`,
                      color: project.color,
                      backgroundColor: `${project.color}0d`,
                    }}
                  >
                    {project.id}
                  </span>

                  {project.title}
                </h3>

                <p className="font-sans text-sm md:text-base text-[#9a9a9a] leading-relaxed max-w-xl">
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="font-space text-[10px] tracking-widest uppercase text-[#d0d0d0] border border-white/10 bg-white/[0.03] px-4 py-2 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Visual */}
              <div className="hidden md:flex w-[30%] aspect-square items-center justify-center relative">
                {/* Outer Ring */}
                <div
                  className="absolute inset-0 rounded-full border border-dashed animate-[spin_30s_linear_infinite]"
                  style={{
                    borderColor: `${project.color}22`,
                  }}
                />

                {/* Inner Ring */}
                <div
                  className="absolute w-[75%] h-[75%] rounded-full border animate-[spin_20s_linear_infinite_reverse]"
                  style={{
                    borderColor: `${project.color}18`,
                  }}
                />

                {/* Core */}
                <div
                  className="w-24 h-24 rounded-full border flex items-center justify-center font-space text-xs tracking-widest font-semibold"
                  style={{
                    borderColor: `${project.color}55`,
                    color: project.color,
                    background: 'rgba(10,10,10,0.85)',
                    boxShadow: `0 0 40px -12px ${project.color}`,
                  }}
                >
                  PROJECT
                </div>

                {/* Floating Dot */}
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: project.color,
                    boxShadow: `0 0 20px ${project.color}`,
                    top: '20%',
                    left: '25%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}