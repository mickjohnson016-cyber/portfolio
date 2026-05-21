import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useSmoothScroll() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with high-end, premium physics parameters
    const lenis = new Lenis({
      duration: 1.4,
      lerp: 0.07, // Subtle, slow-dissolve momentum scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cubic-out physics
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Update ScrollTrigger on every smooth scroll tick
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Seamlessly tie Lenis animation frame requests directly into GSAP's optimized ticker loop
    const tick = (time) => {
      lenis.raf(time * 1000); // Sync seconds to milliseconds conversion
    };
    
    gsap.ticker.add(tick);
    
    // Avoid desync lag adjustments during scroll operations
    gsap.ticker.lagSmoothing(0);

    // Graceful teardown
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
