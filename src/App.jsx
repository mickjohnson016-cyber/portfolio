import useSmoothScroll from './hooks/useSmoothScroll.js';
import Scene from './canvas/Scene.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Projects from './components/sections/Projects.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import AiWorkflow from './components/sections/AiWorkflow.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  // Initialize Lenis + GSAP ScrollTrigger ticker connection
  useSmoothScroll();

  return (
    <div className="relative w-full min-h-screen bg-[#050505] selection:bg-[#00ff88]/30 overflow-x-hidden">
      {/* Film Grain Cinematic Noise Overlay */}
      <div className="noise-overlay" />

      {/* Layer 1: Immersive 3D background WebGL Canvas */}
      <Scene />

      {/* Layer 2: Glassmorphic Nav header */}
      <Navbar />

      {/* Layer 3: Main scrolling DOM content wrapper */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Sections */}
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <AiWorkflow />
        <Contact />
      </main>
    </div>
  );
}
