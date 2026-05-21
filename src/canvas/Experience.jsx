import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import FloatingParticles from './components/FloatingParticles.jsx';
import Workstation from './components/Workstation.jsx';

export default function Experience({ performanceLevel = 'high' }) {
  const { camera } = useThree();
  const pointLight1 = useRef();
  const pointLight2 = useRef();

  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));

  // Subtle natural camera motion driven by the mouse (parallax context)
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 1.2;
      const y = (event.clientY / window.innerHeight - 0.5) * 1.2;
      targetPosition.current.set(x, -y, 8);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Frame tick updates for dynamic lighting pulsations and camera parallax
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    
    // Smoothly interpolate camera position for parallax without GC overhead
    camera.position.lerp(targetPosition.current, 0.05);
    
    // Pulsate the point light coordinates and intensities slightly for cinematic micro-movements
    if (pointLight1.current) {
      pointLight1.current.position.x = Math.sin(elapsed * 0.45) * 3 + 2;
      pointLight1.current.position.y = Math.cos(elapsed * 0.3) * 2 + 2;
    }
    if (pointLight2.current) {
      pointLight2.current.position.x = Math.cos(elapsed * 0.35) * 3 - 2;
      pointLight2.current.position.y = Math.sin(elapsed * 0.4) * 2 - 2;
    }
  });

  return (
    <>
      {/* Soft atmospheric depth fog to naturally fade geometries */}
      <fog attach="fog" args={['#050505', 4, 15]} />

      {/* Minimalistic premium lighting rig */}
      <ambientLight intensity={0.15} />
      
      {/* Dynamic Primary Accent Light: Neon Green */}
      <pointLight
        ref={pointLight1}
        position={[3, 3, 2]}
        color="#00ff88"
        intensity={25}
        distance={15}
        decay={2}
      />
      
      {/* Dynamic Secondary Accent Light: Soft Blue */}
      <pointLight
        ref={pointLight2}
        position={[-3, -3, 2]}
        color="#00bfff"
        intensity={35}
        distance={18}
        decay={2}
      />

      {/* Ambient float particles representing space dust/energy */}
      <FloatingParticles count={performanceLevel === 'high' ? 250 : 100} />

      {/* Premium cinematic 3D workstation (right side hero) */}
      <Workstation performanceLevel={performanceLevel} />

      {/* Premium Cinematic Post-Processing Effects (Subtle and High-End) */}
      <EffectComposer disableNormalPass multisampling={0}>
        {/* Cinematic depth blur: Soft focus on the center SystemsGlobe */}
        {performanceLevel === 'high' && (
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.03}
            bokehScale={1.5}
            height={480}
          />
        )}
        
        {/* Subtle, expensive bloom to make glowing lines feel alive, not blown out */}
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur={performanceLevel === 'high'}
        />
        
        {/* Extremely fine organic grain noise overlay */}
        <Noise opacity={0.015} />
        
        {/* Ambient shadow gradient at viewport corners */}
        <Vignette eskil={false} offset={0.5} darkness={0.45} />
        
        {/* Softest chromatic fringe distortion at screen borders */}
        {performanceLevel === 'high' && (
          <ChromaticAberration offset={[0.0008, 0.0008]} />
        )}
      </EffectComposer>
    </>
  );
}
