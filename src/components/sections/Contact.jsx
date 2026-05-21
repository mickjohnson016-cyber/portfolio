import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);
  const pressureRef = useRef(null);

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

    // ===== PRESSURE TEXT EFFECT =====
    const dist = (a, b) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getAttr = (d, m, min, max) => {
      const v = max - Math.abs((max * d) / m);
      return Math.max(min, v + min);
    };

    const el = pressureRef.current;
    if (!el) return;

    const text = el.dataset.text || '';
    const chars = text.split('');

    const title = document.createElement('h1');
    title.className = 'pressure-title flex';
    title.style.fontFamily = 'Compressa VF';

    const spans = chars.map((ch) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      title.appendChild(s);
      return s;
    });

    el.innerHTML = '';
    el.appendChild(title);

    const mouse = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };

    const center = () => {
      const r = el.getBoundingClientRect();
      mouse.x = r.left + r.width / 2;
      mouse.y = r.top + r.height / 2;
      cursor.x = mouse.x;
      cursor.y = mouse.y;
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      let fs = r.width / (chars.length / 2);

      fs = Math.max(fs, 40);

      title.style.fontSize = `${fs}px`;
    };

    const onMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    center();
    resize();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);

    let raf;

    const animate = () => {
      mouse.x += (cursor.x - mouse.x) / 15;
      mouse.y += (cursor.y - mouse.y) / 15;

      const r = title.getBoundingClientRect();
      const max = r.width / 2;

      spans.forEach((span) => {
        const b = span.getBoundingClientRect();

        const c = {
          x: b.x + b.width / 2,
          y: b.y + b.height / 2,
        };

        const d = dist(mouse, c);

        const wdth = Math.floor(getAttr(d, max, 5, 200));
        const wght = Math.floor(getAttr(d, max, 100, 900));
        const italVal = getAttr(d, max, 0, 1).toFixed(2);

        span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
      });

      raf = requestAnimationFrame(animate);
    };

    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
      }
    );

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full min-h-screen py-20 md:py-24 max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center overflow-hidden"
    >
      {/* Section Header */}
      <div
        ref={(el) => (elementsRef.current[0] = el)}
        className="mb-12 select-text"
      >
        <span className="font-space font-semibold text-[10px] tracking-widest text-[#00bfff] uppercase block mb-3">
          05 // GET IN TOUCH
        </span>

        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#f5f5f5] uppercase">
          Let&apos;s Build Something Real
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start select-text">
        {/* Left Side */}
        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          <p className="font-sans text-sm text-[#a0a0a0] leading-relaxed max-w-sm">
            Open for freelance projects, creative collaborations,
            frontend engineering, mobile app development, and modern
            interactive web experiences.
          </p>

          <div className="glass-panel p-5 rounded-2xl border-white/5 bg-[#0f0f0f]/15 flex items-center gap-4">
            <ShieldCheck
              className="text-[#00bfff] shrink-0"
              size={24}
            />

            <div>
              <span className="font-space text-[9px] font-bold text-[#808080] tracking-widest block uppercase">
                RESPONSE TIME
              </span>

              <span className="font-sans text-xs text-[#a0a0a0] leading-relaxed">
                Usually replies within 24 hours.
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:yourmail@gmail.com"
              className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-[#00bfff]/30 bg-white/[0.01] hover:bg-[#00bfff]/5 transition-all duration-300 group"
            >
              <div className="flex flex-col">
                <span className="font-space text-[9px] text-[#505050] uppercase">
                  EMAIL
                </span>

                <span className="font-space text-xs font-semibold text-[#f5f5f5] group-hover:text-[#00bfff] transition-colors duration-300">
                  mickjohnson016@gmail.com
                </span>
              </div>

              <ArrowUpRight
                size={16}
                className="text-[#505050] group-hover:text-[#00bfff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </a>

            <a
              href="https://github.com/mickjohnson016-cyber"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-[#00bfff]/30 bg-white/[0.01] hover:bg-[#00bfff]/5 transition-all duration-300 group"
            >
              <div className="flex flex-col">
                <span className="font-space text-[9px] text-[#505050] uppercase">
                  GITHUB
                </span>

                <span className="font-space text-xs font-semibold text-[#f5f5f5] group-hover:text-[#00bfff] transition-colors duration-300">
                  github.com/mickjohnson016-cyber
                </span>
              </div>

              <ArrowUpRight
                size={16}
                className="text-[#505050] group-hover:text-[#00bfff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </a>
          </div>
        </div>

        {/* Form */}
        <form
          ref={(el) => (elementsRef.current[2] = el)}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-space text-[9px] font-semibold text-[#808080] tracking-widest uppercase">
                YOUR NAME
              </label>

              <input
                type="text"
                className="w-full bg-white/[0.02] border border-white/5 focus:border-[#00bfff]/30 rounded-xl px-4 py-3 font-sans text-xs text-[#f5f5f5] focus:outline-none transition-colors duration-300"
                placeholder="Enter name..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-space text-[9px] font-semibold text-[#808080] tracking-widest uppercase">
                YOUR EMAIL
              </label>

              <input
                type="email"
                className="w-full bg-white/[0.02] border border-white/5 focus:border-[#00bfff]/30 rounded-xl px-4 py-3 font-sans text-xs text-[#f5f5f5] focus:outline-none transition-colors duration-300"
                placeholder="Enter email..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-[9px] font-semibold text-[#808080] tracking-widest uppercase">
              YOUR MESSAGE
            </label>

            <textarea
              rows={5}
              className="w-full bg-white/[0.02] border border-white/5 focus:border-[#00bfff]/30 rounded-xl px-4 py-3 font-sans text-xs text-[#f5f5f5] focus:outline-none transition-colors duration-300 resize-none"
              placeholder="Write message..."
            />
          </div>

          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="self-start flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-[#fafafa] text-black font-space font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Send Message
            <Send size={12} />
          </button>
        </form>
      </div>

      {/* ===== PRESSURE FOOTER ===== */}
      <div
        ref={(el) => (elementsRef.current[3] = el)}
        className="relative mt-32 pt-16 border-t border-white/5"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[700px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-[#00bfff]/10 blur-[140px]" />
        </div>

        {/* Pressure text */}
        <div className="w-full flex justify-center items-center overflow-hidden">
          <div
            ref={pressureRef}
            data-text="LET'S CREATE"
            className="pressure w-full"
          />
        </div>

        {/* Footer */}
        <footer className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 font-space text-[9px] text-[#505050] tracking-widest uppercase select-none">
          <span>© 2026 NICHOLAS JUSTICE</span>
          <span>REACT • FLUTTER • NODE • JAVA</span>
        </footer>
      </div>

      {/* ===== LOCAL STYLES ===== */}
      <style jsx>{`
        @font-face {
          font-family: 'Compressa VF';
          src: url('https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2')
            format('woff2');
          font-style: normal;
          font-display: swap;
        }

        .pressure {
          width: min(1100px, 100%);
          height: 220px;
          display: grid;
          place-items: center;
        }

        .pressure-title {
          margin: 0;
          width: 100%;
          text-align: center;
          user-select: none;
          white-space: nowrap;
          text-transform: uppercase;
          font-weight: 100;
          line-height: 0.9;
          transform-origin: center top;
          color: #dff3ff;
          text-shadow:
            0 0 18px rgba(0, 191, 255, 0.35),
            0 0 40px rgba(0, 120, 255, 0.25);
        }

        .pressure-title.flex {
          display: flex;
          justify-content: space-between;
        }

        .pressure-title span {
          display: inline-block;
        }

        @media (max-width: 768px) {
          .pressure {
            height: 140px;
          }
        }
      `}</style>
    </section>
  );
}