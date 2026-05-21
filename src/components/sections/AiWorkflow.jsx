import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Shield, Cpu, Layers } from 'lucide-react';

export default function AiWorkflow() {
  const sectionRef = useRef(null);
  const leftSideRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Elegant staggered fade and shift for the left text elements
      gsap.fromTo(
        leftSideRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Card-specific scroll behaviors (fade-in + parallax shifts)
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // 1. Initial Reveal animation
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // 2. High-FPS, GPU-accelerated Parallax shift on scroll
        // Alternate speeds between cards to create visual depth and layering
        const parallaxSpeed = index % 2 === 0 ? -40 : -20;
        gsap.to(card, {
          y: parallaxSpeed,
          ease: 'none',
          force3D: true, // Forces GPU rendering (translate3d)
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai-workflow"
      ref={sectionRef}
      className="w-full min-h-screen py-24 md:py-28 max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center overflow-hidden"
    >
      {/* Light background glow - extremely subtle (2% opacity) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-[#00ff88]/2 blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[250px] translate-x-1/2 -translate-y-1/2 bg-[#00bfff]/2 blur-[130px]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start select-text">
        
        {/* Left Side: Editorial context and mindset */}
        <div
          ref={leftSideRef}
          className="lg:col-span-5 flex flex-col items-start text-left lg:sticky lg:top-32"
        >
          <span className="font-space font-semibold text-[10px] tracking-widest text-[#00bfff] uppercase block mb-3">
            04 // AI CO-ENGINEERING
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-[#f5f5f5] uppercase mb-6">
            Intelligent<br />
            Workflow.
          </h2>

          <p className="font-sans text-sm md:text-[15px] text-[#a0a0a0] leading-relaxed mb-6 max-w-md">
            AI is an exceptional accelerator, but it cannot substitute for deep engineering fundamentals. My architecture integrates advanced AI tooling directly into the dev loop—automating setup, scripting UI parameters, and testing edge cases.
          </p>

          <p className="font-sans text-xs md:text-sm text-[#808080] leading-relaxed mb-8 max-w-md">
            By shifting high-frequency boilerplate tasks to automated synthesis, my mental bandwidth is preserved for what truly matters: structural integrity, database safety policies, secure ledger mechanisms, and building highly polished user experiences.
          </p>

          {/* Understated telemetry data box (Vercel/Linear style) */}
          <div className="w-full max-w-sm rounded-xl border border-white/5 bg-[#0a0a0a]/50 p-4 font-mono text-[9px] text-[#606060] flex flex-col gap-2">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#808080]">ENV // CO-PILOT.SYSTEM</span>
              <span className="text-[#00ff88] animate-pulse">● ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span>CONTEXT_LIMIT:</span>
              <span className="text-white/80">128K TOKENS</span>
            </div>
            <div className="flex justify-between">
              <span>PROMPT_STRATEGY:</span>
              <span className="text-white/80">CHAIN_OF_THOUGHT // STRICT_JSON</span>
            </div>
            <div className="flex justify-between">
              <span>TARGET_CONFIDENCE:</span>
              <span className="text-[#00bfff]">&gt;= 98.7%</span>
            </div>
          </div>
        </div>

        {/* Right Side: High-fidelity matte workflow panels */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          
          {/* Card 1: Prompt Architecture */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl shadow-black/80 will-change-transform group hover:border-[#00ff88]/15 transition-all duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cpu size={14} className="text-[#00ff88]" />
                <span className="font-display font-semibold text-xs tracking-wide text-[#f5f5f5] uppercase">
                  PROMPT_CORE.YAML
                </span>
              </div>
              <span className="font-space text-[8px] font-bold text-[#808080] tracking-widest uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                SCHEMA
              </span>
            </div>

            <p className="font-sans text-[11px] md:text-xs text-[#808080] leading-relaxed">
              Highly structured context prompts dictate behavior boundaries, forcing the LLM to output production-ready scripts.
            </p>

            <div className="w-full bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-[#808080] leading-relaxed overflow-x-auto select-none">
              <div className="text-white/40"><span className="text-[#00bfff]">role</span>: <span className="text-white">"architect.core.engine"</span></div>
              <div className="text-white/40"><span className="text-[#00bfff]">context_window</span>: <span className="text-[#00ff88]">128000</span></div>
              <div className="text-white/40"><span className="text-[#00bfff]">directives</span>:</div>
              <div className="pl-4 text-white/40">- <span className="text-white">enforce_strict_typescript</span>: <span className="text-[#00ff88]">true</span></div>
              <div className="pl-4 text-white/40">- <span className="text-white">validate_inputs_before_compile</span>: <span className="text-[#00ff88]">true</span></div>
              <div className="pl-4 text-white/40">- <span className="text-white">optimize_query_paths</span>: <span className="text-white">"indexed_only"</span></div>
              <div className="text-white/40"><span className="text-[#00bfff]">response_format</span>: <span className="text-[#00ff88]">"RFC_8259_JSON"</span></div>
            </div>
          </div>

          {/* Card 2: Typed API Contracts */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl shadow-black/80 will-change-transform group hover:border-[#00bfff]/15 transition-all duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-[#00bfff]" />
                <span className="font-display font-semibold text-xs tracking-wide text-[#f5f5f5] uppercase">
                  contracts.ts
                </span>
              </div>
              <span className="font-space text-[8px] font-bold text-[#808080] tracking-widest uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                TYPING
              </span>
            </div>

            <p className="font-sans text-[11px] md:text-xs text-[#808080] leading-relaxed">
              Synthesized models map directly to strict runtime type safety networks to eliminate runtime payload failures.
            </p>

            <div className="w-full bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-[#808080] leading-relaxed overflow-x-auto select-none">
              <div>
                <span className="text-[#00ff88]">export interface</span> <span className="text-white">AIAssistedPayload</span>&lt;<span className="text-[#00bfff]">T</span>&gt; &#123;
              </div>
              <div className="pl-4">
                <span className="text-white">generatedAt</span>: <span className="text-[#00bfff]">string</span>;
              </div>
              <div className="pl-4">
                <span className="text-white">tokensUsed</span>: <span className="text-[#00bfff]">number</span>;
              </div>
              <div className="pl-4">
                <span className="text-white">confidence</span>: <span className="text-[#00bfff]">number</span>; <span className="text-[#606060]">// &gt;= 0.95</span>
              </div>
              <div className="pl-4">
                <span className="text-white">data</span>: <span className="text-[#00bfff]">T</span>;
              </div>
              <div>&#125;</div>
            </div>
          </div>

          {/* Card 3: Database & Security Integrity */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl shadow-black/80 will-change-transform group hover:border-[#00ff88]/15 transition-all duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={14} className="text-[#00ff88]" />
                <span className="font-display font-semibold text-xs tracking-wide text-[#f5f5f5] uppercase">
                  rls_policies.sql
                </span>
              </div>
              <span className="font-space text-[8px] font-bold text-[#808080] tracking-widest uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                SECURITY
              </span>
            </div>

            <p className="font-sans text-[11px] md:text-xs text-[#808080] leading-relaxed">
              Row-Level Security policies are strictly declared to separate AI-accelerated queries from real tenant validation.
            </p>

            <div className="w-full bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-[#808080] leading-relaxed overflow-x-auto select-none">
              <div>
                <span className="text-[#00ff88]">ALTER TABLE</span> <span className="text-white">public.user_ledger</span> <span className="text-[#00ff88]">ENABLE ROW LEVEL SECURITY</span>;
              </div>
              <br />
              <div>
                <span className="text-[#00ff88]">CREATE POLICY</span> <span className="text-white">"read_own_transactions"</span>
              </div>
              <div className="pl-4">
                <span className="text-[#00ff88]">ON</span> <span className="text-white">public.user_ledger</span>
              </div>
              <div className="pl-4">
                <span className="text-[#00ff88]">FOR SELECT TO</span> <span className="text-[#00bfff]">authenticated</span>
              </div>
              <div className="pl-4">
                <span className="text-[#00ff88]">USING</span> (auth.uid() = user_id);
              </div>
            </div>
          </div>

          {/* Card 4: Orchestration & Docker */}
          <div
            ref={(el) => (cardsRef.current[3] = el)}
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl shadow-black/80 will-change-transform group hover:border-[#00bfff]/15 transition-all duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layers size={14} className="text-[#00bfff]" />
                <span className="font-display font-semibold text-xs tracking-wide text-[#f5f5f5] uppercase">
                  deploy.yml
                </span>
              </div>
              <span className="font-space text-[8px] font-bold text-[#808080] tracking-widest uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                OPS
              </span>
            </div>

            <p className="font-sans text-[11px] md:text-xs text-[#808080] leading-relaxed">
              Automated pipelines deploy built assets safely to staging systems, validating the structural builds before release.
            </p>

            <div className="w-full bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-[#808080] leading-relaxed overflow-x-auto select-none">
              <div className="text-white/40"><span className="text-[#00bfff]">name</span>: <span className="text-white">"production_deploy"</span></div>
              <div className="text-white/40"><span className="text-[#00bfff]">on</span>:</div>
              <div className="pl-4 text-white/40"><span className="text-[#00bfff]">push</span>:</div>
              <div className="pl-8 text-white/40"><span className="text-[#00bfff]">branches</span>: [ <span className="text-white">"main"</span> ]</div>
              <div className="text-white/40"><span className="text-[#00bfff]">jobs</span>:</div>
              <div className="pl-4 text-white/40"><span className="text-[#00bfff]">deploy</span>:</div>
              <div className="pl-8 text-white/40"><span className="text-[#00bfff]">runs-on</span>: <span className="text-white">"ubuntu-latest"</span></div>
              <div className="pl-8 text-white/40"><span className="text-[#00bfff]">steps</span>:</div>
              <div className="pl-12 text-white/40">- <span className="text-[#00bfff]">name</span>: <span className="text-white">"Validate Build Assets"</span></div>
              <div className="pl-14 text-white/40"><span className="text-[#00bfff]">run</span>: <span className="text-white">"npm run build --all"</span></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
