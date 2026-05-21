import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SystemsGlobe() {
  const groupRef = useRef();
  const outerSphereRef = useRef();
  const innerSphereRef = useRef();

  // Keep mouse and scroll targets in mutable memory to avoid React rendering cycles
  const target = useRef({
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to [-0.5, 0.5] range
      target.current.mouseX = (event.clientX / window.innerWidth) - 0.5;
      target.current.mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const handleScroll = () => {
      target.current.scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      // Default cinematic constant rotations
      outerSphereRef.current.rotation.y = time * 0.04;
      outerSphereRef.current.rotation.x = time * 0.015;
      
      innerSphereRef.current.rotation.y = -time * 0.06;
      innerSphereRef.current.rotation.z = time * 0.02;

      // Mouse & Scroll Parallax: smooth mathematical interpolation (lerp)
      // As user scrolls down, push the globe up and rotate it towards them
      const scrollParallaxY = -target.current.scrollY * 0.0035;
      const scrollRotationX = target.current.scrollY * 0.0015;
      
      const targetX = target.current.mouseX * 0.8;
      const targetY = -target.current.mouseY * 0.8 + scrollParallaxY;

      // Slowly float up and down to create a zero-gravity feel
      const floatY = Math.sin(time * 0.8) * 0.15;

      // Apply highly smoothed changes (lerp) for supreme fluid kinetics
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + 1.2, 0.05); // Offset to the right of the text
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatY, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, target.current.scrollY * 0.001, 0.05);

      // Mutate group rotation based on scroll offsets
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, scrollRotationX, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {/* Outer Low-Poly Triangulated Wireframe (Accent Green) */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[1.8, 2]} /> {/* Low segment count for clean lines */}
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Glow Node Points on Outer Sphere Vertices */}
      <points>
        <icosahedronGeometry args={[1.8, 2]} />
        <pointsMaterial
          color="#00ff88"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Inner Dense Wireframe Core (Accent Blue) */}
      <mesh ref={innerSphereRef}>
        <icosahedronGeometry args={[1.2, 3]} /> {/* Higher density for intricate center */}
        <meshBasicMaterial
          color="#00bfff"
          wireframe
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner Core Vertex Particles */}
      <points>
        <icosahedronGeometry args={[1.2, 3]} />
        <pointsMaterial
          color="#00bfff"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Outer Orbit Ring representing tech system bounds */}
      <mesh rotation={[Math.PI / 2.3, 0.1, 0]}>
        <torusGeometry args={[2.5, 0.004, 8, 64]} />
        <meshBasicMaterial
          color="#00bfff"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Small floating orbit node */}
      <mesh position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#00ff88" />
      </mesh>
    </group>
  );
}
