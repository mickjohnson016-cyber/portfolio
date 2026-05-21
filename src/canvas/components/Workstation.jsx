import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Workstation({ performanceLevel = 'high' }) {
  const groupRef = useRef();
  const monitorRef = useRef();
  const scanLineRef = useRef();
  const holoPanel1Ref = useRef();
  const holoPanel2Ref = useRef();
  const holoPanel3Ref = useRef();
  const node1Ref = useRef();
  const node2Ref = useRef();
  const node3Ref = useRef();

  // Mutable interaction targets — zero React re-renders
  const target = useRef({
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
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

  // Shared materials — allocated once, reused across meshes
  const materials = useMemo(() => ({
    darkMetal: new THREE.MeshStandardMaterial({
      color: '#0a0a0a',
      metalness: 0.9,
      roughness: 0.3,
    }),
    darkMetalMatte: new THREE.MeshStandardMaterial({
      color: '#0c0c0c',
      metalness: 0.8,
      roughness: 0.4,
    }),
    screenSurface: new THREE.MeshBasicMaterial({
      color: '#020a12',
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    }),
    edgeGlow: new THREE.MeshBasicMaterial({
      color: '#00ff88',
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    }),
    scanLine: new THREE.MeshBasicMaterial({
      color: '#00bfff',
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    keyboardGlow: new THREE.MeshBasicMaterial({
      color: '#00ff88',
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
    holoBlue: new THREE.MeshBasicMaterial({
      color: '#00bfff',
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
    holoGreen: new THREE.MeshBasicMaterial({
      color: '#00ff88',
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
    holoBlueSubtle: new THREE.MeshBasicMaterial({
      color: '#00bfff',
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
    nodeGreen: new THREE.MeshBasicMaterial({ color: '#00ff88' }),
    nodeBlue: new THREE.MeshBasicMaterial({ color: '#00bfff' }),
    orbitRing: new THREE.MeshBasicMaterial({
      color: '#00bfff',
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    trackpad: new THREE.MeshStandardMaterial({
      color: '#111111',
      metalness: 0.85,
      roughness: 0.35,
    }),
  }), []);

  // Pre-create reusable geometries
  const geometries = useMemo(() => ({
    deskSlab: new THREE.BoxGeometry(3.2, 0.04, 1.4, 1, 1, 1),
    deskEdge: new THREE.BoxGeometry(3.2, 0.008, 0.008, 1, 1, 1),
    deskLeg: new THREE.BoxGeometry(0.04, 0.8, 0.04, 1, 1, 1),
    monitorFrame: new THREE.BoxGeometry(2.6, 1.3, 0.03, 1, 1, 1),
    monitorScreen: new THREE.PlaneGeometry(2.5, 1.2, 1, 1),
    monitorScanLine: new THREE.PlaneGeometry(2.5, 0.003, 1, 1),
    monitorStand: new THREE.BoxGeometry(0.03, 0.4, 0.03, 1, 1, 1),
    keyboardBody: new THREE.BoxGeometry(1.2, 0.03, 0.45, 1, 1, 1),
    keyboardGlowPlane: new THREE.PlaneGeometry(1.3, 0.5, 1, 1),
    trackpad: new THREE.BoxGeometry(0.4, 0.01, 0.3, 1, 1, 1),
    holoPanel1: new THREE.PlaneGeometry(0.6, 0.9, 1, 1),
    holoPanel2: new THREE.PlaneGeometry(0.5, 0.7, 1, 1),
    holoPanel3: new THREE.PlaneGeometry(0.8, 0.5, 1, 1),
    dataNode: new THREE.OctahedronGeometry(0.05, 0),
    orbitRing: new THREE.TorusGeometry(0.8, 0.002, 8, 48),
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;

    // --- Scroll parallax ---
    const scrollParallaxY = -target.current.scrollY * 0.003;
    const scrollRotationX = target.current.scrollY * 0.001;

    // --- Mouse parallax (subtle tilt) ---
    const mouseRotY = target.current.mouseX * 0.08;
    const mouseRotX = -target.current.mouseY * 0.06;

    // --- Zero-gravity float ---
    const floatY = Math.sin(t * 0.6) * 0.08;

    // --- Apply to group via lerp (factor 0.04 for cinematic weight) ---
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -0.3 + floatY + scrollParallaxY,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.25 + mouseRotY,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRotX + scrollRotationX,
      0.04
    );

    // --- Monitor subtle hover offset ---
    if (monitorRef.current) {
      monitorRef.current.position.y = 0.85 + Math.sin(t * 0.8) * 0.03;
    }

    // --- Scan line sweep (ping-pong top to bottom) ---
    if (scanLineRef.current && performanceLevel === 'high') {
      const sweep = Math.sin(t * 0.3) * 0.55;
      scanLineRef.current.position.y = sweep;
    }

    // --- Holographic panel drift ---
    if (holoPanel1Ref.current) {
      holoPanel1Ref.current.position.y = 0.6 + Math.sin(t * 0.5) * 0.04;
    }
    if (holoPanel2Ref.current && performanceLevel === 'high') {
      holoPanel2Ref.current.position.x = 1.7 + Math.cos(t * 0.4) * 0.03;
    }
    if (holoPanel3Ref.current && performanceLevel === 'high') {
      holoPanel3Ref.current.position.y = 0.4 + Math.sin(t * 0.35) * 0.03;
    }

    // --- Data node orbits ---
    if (performanceLevel === 'high') {
      const orbitR = 1.6;
      if (node1Ref.current) {
        node1Ref.current.position.x = Math.cos(t * 0.3) * orbitR;
        node1Ref.current.position.z = Math.sin(t * 0.3) * orbitR;
        node1Ref.current.position.y = 0.6 + Math.sin(t * 0.2) * 0.1;
      }
      if (node2Ref.current) {
        node2Ref.current.position.x = Math.cos(t * 0.3 + 2.1) * orbitR * 0.8;
        node2Ref.current.position.z = Math.sin(t * 0.3 + 2.1) * orbitR * 0.8;
        node2Ref.current.position.y = 0.5 + Math.cos(t * 0.25) * 0.08;
      }
      if (node3Ref.current) {
        node3Ref.current.position.x = Math.cos(t * 0.3 + 4.2) * orbitR * 1.1;
        node3Ref.current.position.z = Math.sin(t * 0.3 + 4.2) * orbitR * 1.1;
        node3Ref.current.position.y = 0.7 + Math.sin(t * 0.18) * 0.12;
      }
    }
  });

  return (
    <group ref={groupRef} position={[2.8, -0.3, 0]}>

      {/* === LAYER A: DESK === */}
      {/* Desk surface */}
      <mesh geometry={geometries.deskSlab} material={materials.darkMetal} position={[0, 0, 0]} />
      {/* Front edge glow strip — Bloom will pick this up */}
      <mesh geometry={geometries.deskEdge} material={materials.edgeGlow} position={[0, 0.025, 0.7]} />
      {/* Desk legs */}
      <mesh geometry={geometries.deskLeg} material={materials.darkMetal} position={[-1.4, -0.42, 0.5]} />
      <mesh geometry={geometries.deskLeg} material={materials.darkMetal} position={[1.4, -0.42, 0.5]} />

      {/* === LAYER B: FLOATING MONITOR === */}
      <group ref={monitorRef} position={[0, 0.85, -0.2]}>
        {/* Monitor frame */}
        <mesh geometry={geometries.monitorFrame} material={materials.darkMetal} />
        {/* Monitor screen surface */}
        <mesh geometry={geometries.monitorScreen} material={materials.screenSurface} position={[0, 0, 0.016]} />
        {/* Scan line — sweeps vertically for "alive" feel */}
        {performanceLevel === 'high' && (
          <mesh ref={scanLineRef} geometry={geometries.monitorScanLine} material={materials.scanLine} position={[0, 0, 0.017]} />
        )}
        {/* Thin stand bar connecting to desk */}
        <mesh geometry={geometries.monitorStand} material={materials.darkMetal} position={[0, -0.85, 0.1]} />
      </group>

      {/* === LAYER C: KEYBOARD & TRACKPAD === */}
      {/* Keyboard body */}
      <mesh geometry={geometries.keyboardBody} material={materials.darkMetalMatte} position={[0, 0.035, 0.45]} />
      {/* Keyboard underglow — soft green pool beneath */}
      <mesh
        geometry={geometries.keyboardGlowPlane}
        material={materials.keyboardGlow}
        position={[0, 0.005, 0.45]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {/* Trackpad */}
      <mesh geometry={geometries.trackpad} material={materials.trackpad} position={[0.7, 0.025, 0.5]} />

      {/* === LAYER D: HOLOGRAPHIC UI PANELS === */}
      {/* Left holo panel */}
      <mesh
        ref={holoPanel1Ref}
        geometry={geometries.holoPanel1}
        material={materials.holoBlue}
        position={[-1.6, 0.6, 0.1]}
        rotation={[0, 0.3, 0]}
      />
      {/* Right holo panel (high perf only) */}
      {performanceLevel === 'high' && (
        <mesh
          ref={holoPanel2Ref}
          geometry={geometries.holoPanel2}
          material={materials.holoGreen}
          position={[1.7, 0.5, 0.15]}
          rotation={[0, -0.25, 0]}
        />
      )}
      {/* Rear holo panel (high perf only) */}
      {performanceLevel === 'high' && (
        <mesh
          ref={holoPanel3Ref}
          geometry={geometries.holoPanel3}
          material={materials.holoBlueSubtle}
          position={[0.5, 0.4, -0.6]}
          rotation={[0.1, 0.15, 0]}
        />
      )}

      {/* === LAYER E: AMBIENT FLOATING COMPONENTS === */}
      {performanceLevel === 'high' && (
        <>
          {/* Orbiting data nodes */}
          <mesh ref={node1Ref} geometry={geometries.dataNode} material={materials.nodeGreen} position={[1.6, 0.6, 0]} />
          <mesh ref={node2Ref} geometry={geometries.dataNode} material={materials.nodeBlue} position={[-1.2, 0.5, 0.5]} />
          <mesh ref={node3Ref} geometry={geometries.dataNode} material={materials.nodeGreen} position={[0, 0.7, 1.5]} />
          {/* Orbit ring */}
          <mesh geometry={geometries.orbitRing} material={materials.orbitRing} position={[0, 0.6, 0]} rotation={[Math.PI / 2.5, 0.1, 0]} />
        </>
      )}

      {/* === LIGHTING (LOCAL TO WORKSTATION) === */}
      {/* Desk spotlight — cinematic moody pool from above-right */}
      {performanceLevel === 'high' && (
        <spotLight
          position={[1.5, 2.5, 1.5]}
          angle={0.4}
          penumbra={0.8}
          intensity={15}
          color="#ffffff"
          distance={8}
          castShadow={false}
          target-position={[0, 0, 0]}
        />
      )}
      {/* Monitor rim backlight — subtle blue halo */}
      <pointLight
        position={[0, 0.85, -0.5]}
        intensity={5}
        color="#00bfff"
        distance={4}
        decay={2}
        castShadow={false}
      />
    </group>
  );
}
