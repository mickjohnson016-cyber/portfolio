import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import Experience from './Experience.jsx';

export default function Scene() {
  const [dpr, setDpr] = useState(1.5); // Default to 1.5, scale down/up based on performance
  const [performanceLevel, setPerformanceLevel] = useState('high'); // 'high' | 'low'

  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-[#050505] overflow-hidden pointer-events-none select-none">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <PerformanceMonitor 
          onIncline={() => { setDpr(2); setPerformanceLevel('high'); }} 
          onDecline={() => { setDpr(1); setPerformanceLevel('low'); }} 
        >
          <Suspense fallback={null}>
            <Experience performanceLevel={performanceLevel} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
