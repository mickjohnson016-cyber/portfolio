import { Mail } from 'lucide-react';

const Github = ({ size = 14, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Instagram = ({ size = 14, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 w-full z-50 px-4 pointer-events-none select-none flex justify-center">
      <div className="flex items-center gap-4 md:gap-6 glass-panel px-5 md:px-6 py-2 rounded-full shadow-2xl shadow-black/95 pointer-events-auto border border-white/5 bg-[#0a0a0a]/75 backdrop-blur-md">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="font-display font-medium text-[11px] md:text-xs tracking-widest text-[#f5f5f5] group-hover:text-[#00bfff] transition-colors duration-300">
            DARKEMPIRE
          </span>
        </a>

        {/* Vertical Divider */}
        <span className="w-[1px] h-3 bg-white/10" />

        {/* Social Icons (GitHub, Instagram, Mail) */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <a
            href="https://github.com/mickjohnson016-cyber"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-[#00bfff] transition-all duration-300"
            title="GitHub"
          >
            <Github size={12} />
          </a>
          <a
            href="https://www.instagram.com/darkempire001"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-[#00bfff] transition-all duration-300"
            title="Instagram"
          >
            <Instagram size={12} />
          </a>
          <a
            href="mailto:mickjohnson016@gmail.com"
            className="w-7 h-7 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-[#00bfff] transition-all duration-300"
            title="Email"
          >
            <Mail size={12} />
          </a>
        </div>

        {/* Vertical Divider */}
        <span className="w-[1px] h-3 bg-white/10" />

        {/* Contact CTA Button */}
        <a
          href="#contact"
          className="px-3.5 py-1 rounded-full border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-[9px] font-space font-bold uppercase tracking-widest text-white/90 hover:text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
