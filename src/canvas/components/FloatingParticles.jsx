import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingParticles({ count = 250 }) {
  const meshRef = useRef();

  // Pre-generate random particle positions using Float32Array for raw WebGL performance
  const [positions, sizes] = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const scale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Uniform random coordinates in a wide volume around the camera viewport
      coords[i * 3] = (Math.random() - 0.5) * 16;     // X-axis [-8, 8]
      coords[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y-axis [-5, 5]
      coords[i * 3 + 2] = (Math.random() - 0.5) * 12; // Z-axis [-6, 6]
      
      scale[i] = Math.random() * 0.08 + 0.01;         // Radial size of each dot
    }
    return [coords, scale];
  }, [count]);

  // Framer loop tick to smoothly float and drift the particle system
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      // Subtle multi-axis rotation to mimic suspended atmospheric dust
      meshRef.current.rotation.y = time * 0.015;
      meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;
      meshRef.current.position.y = Math.sin(time * 0.15) * 0.08; // Gentle fluid vertical drift
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* High-performance shader material representing small glowing particles */}
      <pointsMaterial
        size={0.04}
        color="#00bfff"
        transparent
        opacity={0.35}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
