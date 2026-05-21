"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

import {
  siCss,
  siDocker,
  siGit,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siOdoo,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
} from "simple-icons";

const SKILLS = [
  [siJavascript, siTypescript, siHtml5, siCss, siTailwindcss],
  [siPython, siReact, siNextdotjs, siVuedotjs, siNodedotjs],
  [siPhp, siOdoo, siPostgresql, siDocker, siGit],
];

const GAP = 0.52;
const KEY_SIZE = 0.40;
const BASE_HEIGHT = 0.05;
const CAP_HEIGHT = 0.09;
const TOP_INSET = 0.04;
const TOP_SIZE = KEY_SIZE - TOP_INSET * 2;

function makeRoundedRectShape(
  width,
  depth,
  radius
) {
  const shape = new THREE.Shape();
  const w = width / 2;
  const d = depth / 2;

  shape.moveTo(-w + radius, -d);
  shape.lineTo(w - radius, -d);
  shape.quadraticCurveTo(w, -d, w, -d + radius);
  shape.lineTo(w, d - radius);
  shape.quadraticCurveTo(w, d, w - radius, d);
  shape.lineTo(-w + radius, d);
  shape.quadraticCurveTo(-w, d, -w, d - radius);
  shape.lineTo(-w + radius, d);
  shape.quadraticCurveTo(-w, -d, -w + radius, -d);

  return shape;
}

function darkenColor(hex, factor = 0.35) {
  const c = new THREE.Color(hex);
  c.multiplyScalar(factor);
  return c;
}

// ── Web Audio API: tactile keypress click sound ──
let audioCtx = null;

function playKeyClick() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.value = 800;

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (_) {
    // Silently fail if audio is not available
  }
}

function createChassisGeometry() {
  // The chassis spans perfectly to encase the 3x5 keyboard layout with an organic margin
  const shape = makeRoundedRectShape(2.7, 1.7, 0.1);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });

  geometry.rotateX(-Math.PI / 2);
  geometry.center();

  return geometry;
}

function makeIconTexture(
  svgPath,
  color,
  size = 256
) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  // Centers and scales the icon Path2D
  const scale = size / 36;
  ctx.translate(size / 2, size / 2);
  ctx.scale(scale, scale);
  ctx.translate(-12, -12);

  ctx.fillStyle = color;
  ctx.fill(new Path2D(svgPath));

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

// Helper to determine text/logo contrast color based on the brand's background hex color
function getContrastColor(hexColor) {
  if (hexColor === "000000") return "#ffffff";

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 2), 16);
  const b = parseInt(hexColor.substring(4, 2), 16);

  // Classic YIQ formula with custom threshold for soft/medium hues (e.g. purple, light blue)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#111111" : "#ffffff";
}

function Keycap({
  icon,
  position,
}) {
  const group = useRef(null);
  const baseMesh = useRef(null);
  const topMaterial = useRef(null);
  const baseMaterial = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Spring physics state for Y position (enables overshoot bounce on release)
  const spring = useRef({ pos: 0, vel: 0 });

  const brandColor = `#${icon.hex}`;
  const contrastColor = useMemo(() => getContrastColor(icon.hex), [icon.hex]);
  const baseColor = useMemo(() => darkenColor(brandColor, 0.35), [brandColor]);

  const texture = useMemo(
    () => makeIconTexture(icon.path, contrastColor),
    [icon.path, contrastColor]
  );

  const baseGeometry = useMemo(() => new THREE.BoxGeometry(KEY_SIZE, BASE_HEIGHT, KEY_SIZE), []);
  const capGeometry = useMemo(() => new THREE.BoxGeometry(TOP_SIZE, CAP_HEIGHT, TOP_SIZE), []);

  useFrame((_, delta) => {
    if (!group.current) return;

    const dt = Math.min(delta, 0.05);

    // ── Spring-driven Y position ──
    // Pressed: push down fast | Hover: lift up | Idle: rest
    const targetY = pressed ? -0.04 : hovered ? 0.015 : 0;

    // Press = stiff + high damping (fast snap down, no bounce)
    // Release/hover = moderate stiffness + low damping (overshoot bounce)
    const stiffness = pressed ? 1200 : 400;
    const damping = pressed ? 50 : 14;

    const force = (targetY - spring.current.pos) * stiffness;
    spring.current.vel += (force - spring.current.vel * damping) * dt;
    spring.current.pos += spring.current.vel * dt;

    group.current.position.y = spring.current.pos;

    // ── Scale: subtle compression on press ──
    const targetScale = pressed ? 0.97 : 1;
    const scaleLerp = pressed ? 0.3 : 0.12;
    const s = THREE.MathUtils.lerp(group.current.scale.x, targetScale, scaleLerp);
    group.current.scale.set(s, s, s);

    // ── Base depth compression on press (key sinks into chassis) ──
    if (baseMesh.current) {
      const targetBaseScaleY = pressed ? 0.45 : 1;
      baseMesh.current.scale.y = THREE.MathUtils.lerp(
        baseMesh.current.scale.y,
        targetBaseScaleY,
        pressed ? 0.3 : 0.15
      );
    }

    // ── Top cap emissive brightness ──
    if (topMaterial.current) {
      const targetEmissive = pressed ? 0.12 : hovered ? 0.2 : 0.05;
      topMaterial.current.emissiveIntensity = THREE.MathUtils.lerp(
        topMaterial.current.emissiveIntensity,
        targetEmissive,
        0.15
      );
    }

    // ── Base ledge subtle glow on hover ──
    if (baseMaterial.current) {
      const targetBaseEmissive = hovered ? 0.06 : 0;
      baseMaterial.current.emissiveIntensity = THREE.MathUtils.lerp(
        baseMaterial.current.emissiveIntensity,
        targetBaseEmissive,
        0.12
      );
    }
  });

  const capCenterY = BASE_HEIGHT / 2 + CAP_HEIGHT / 2;
  const iconY = BASE_HEIGHT / 2 + CAP_HEIGHT + 0.001;

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    setPressed(false);
    document.body.style.cursor = 'auto';
  }, []);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    setPressed(true);
    playKeyClick();
  }, []);

  const handlePointerUp = useCallback(() => {
    setPressed(false);
  }, []);

  return (
    <group position={position} ref={group}>
      {/* Base ledge — darker, full-size, visible side edges create depth */}
      <mesh
        ref={baseMesh}
        geometry={baseGeometry}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <meshPhysicalMaterial
          ref={baseMaterial}
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Top cap — brand color, inset to create crisp keycap ledge */}
      <mesh
        geometry={capGeometry}
        position={[0, capCenterY, 0]}
        castShadow
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <meshPhysicalMaterial
          ref={topMaterial}
          color={brandColor}
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          emissive={brandColor}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Icon on top surface */}
      <mesh
        position={[0, iconY, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[0.20, 0.20]} />

        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Keyboard() {
  const group = useRef(null);
  const chassisGeometry = useMemo(() => createChassisGeometry(), []);

  useFrame((state) => {
    if (!group.current) return;

    // Subtle float tilt/rotation inside the hero section card
    group.current.rotation.y =
      Math.PI * 0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;

    group.current.rotation.x = 0.35;

    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
  });

  return (
    <group ref={group} scale={[1.4, 1.4, 1.4]}>
      {/* Dark charcoal solid keyboard base/chassis */}
      <mesh
        geometry={chassisGeometry}
        position={[0, -0.11, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#161616"
          roughness={0.65}
          metalness={0.2}
          clearcoat={0.1}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Recessed bezel/inner shadow pocket plane */}
      <mesh
        position={[0, 0.021, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.55, 1.55]} />
        <meshStandardMaterial
          color="#0b0b0b"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {SKILLS.map((rowItems, rowIndex) => {
        return rowItems.map((icon, colIndex) => {
          const x = (colIndex - 2) * GAP;
          const z = (rowIndex - 1) * GAP;

          return (
            <Keycap
              key={icon.slug}
              icon={icon}
              position={[x, 0, z]}
            />
          );
        });
      })}
    </group>
  );
}

function FrozenKeyboard() {
  const group = useRef(null);
  const chassisGeometry = useMemo(() => createChassisGeometry(), []);

  return (
    <group ref={group} scale={[1.4, 1.4, 1.4]} rotation={[0.35, Math.PI * 0.12, 0]} position={[0, 0, 0]}>
      {/* Dark charcoal solid keyboard base/chassis */}
      <mesh
        geometry={chassisGeometry}
        position={[0, -0.11, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#161616"
          roughness={0.65}
          metalness={0.2}
          clearcoat={0.1}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Recessed bezel/inner shadow pocket plane */}
      <mesh
        position={[0, 0.021, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.55, 1.55]} />
        <meshStandardMaterial
          color="#0b0b0b"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {SKILLS.map((rowItems, rowIndex) => {
        return rowItems.map((icon, colIndex) => {
          const x = (colIndex - 2) * GAP;
          const z = (rowIndex - 1) * GAP;

          return (
            <Keycap
              key={icon.slug}
              icon={icon}
              position={[x, 0, z]}
            />
          );
        });
      })}
    </group>
  );
}

export default function KeyboardCard() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas
        shadows
        camera={{ position: [0, 3, 6], fov: 35 }}
      >
        <Environment resolution={64}>
          <Lightformer
            intensity={2}
            position={[0, 5, 5]}
            scale={[10, 10, 1]}
          />

          <Lightformer
            intensity={1}
            position={[-5, 1, 1]}
            scale={[10, 10, 1]}
          />
        </Environment>

        <ambientLight intensity={0.4} />

        {/* Shadow-casting Directional Light for extremely premium, soft key shadows */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0005}
        />

        <Keyboard />
      </Canvas>
    </div>
  );
}
