import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/** Nebula dust particles */
function NebulaDust({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      // Purple/blue/cyan nebula colors
      const t = Math.random();
      col[i * 3] = 0.3 + t * 0.4;     // R
      col[i * 3 + 1] = 0.1 + t * 0.3; // G
      col[i * 3 + 2] = 0.6 + t * 0.4; // B
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.008;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/** Orbiting ring — like a galaxy arm */
function GalaxyRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI * 0.35 + Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
    ref.current.rotation.z = state.clock.elapsedTime * 0.03;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[3, 0.008, 16, 200]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
    </mesh>
  );
}

function GalaxyRing2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI * 0.5 + Math.cos(state.clock.elapsedTime * 0.06) * 0.08;
    ref.current.rotation.z = -state.clock.elapsedTime * 0.02;
  });
  return (
    <mesh ref={ref} position={[1, -0.5, -4]}>
      <torusGeometry args={[2.2, 0.006, 16, 150]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.1} />
    </mesh>
  );
}

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <Stars radius={100} depth={60} count={4000} factor={4} saturation={0.8} fade speed={0.8} />
        <NebulaDust />
        <GalaxyRing />
        <GalaxyRing2 />
      </Canvas>
      {/* Cosmic gradient overlays */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, hsla(270, 80%, 30%, 0.15) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 30%, hsla(220, 90%, 40%, 0.1) 0%, transparent 45%)",
        }}
      />
    </div>
  );
};

export default HeroBackground;
