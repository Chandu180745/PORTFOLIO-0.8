import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CubeData {
  position: [number, number, number];
  rotSpeed: [number, number, number];
  fallSpeed: number;
  scale: number;
  opacity: number;
}

/** A single rotating, falling cube */
function FallingCube({ data }: { data: CubeData }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    ref.current.rotation.x += data.rotSpeed[0];
    ref.current.rotation.y += data.rotSpeed[1];
    ref.current.rotation.z += data.rotSpeed[2];

    ref.current.position.y -= data.fallSpeed;
    if (ref.current.position.y < -10) ref.current.position.y = 10;

    ref.current.position.x = data.position[0] + Math.sin(t * 0.4 + data.position[2]) * 0.4;
  });

  return (
    <mesh ref={ref} position={data.position} scale={data.scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={data.opacity}
        wireframe
      />
    </mesh>
  );
}

/** Multiple falling cubes scene */
function CubesScene({ count = 40 }: { count?: number }) {
  const cubes = useMemo<CubeData[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12 - 3,
      ] as [number, number, number],
      rotSpeed: [
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.008,
      ] as [number, number, number],
      fallSpeed: 0.004 + Math.random() * 0.01,
      scale: 0.15 + Math.random() * 0.55,
      opacity: 0.06 + Math.random() * 0.1,
    }));
  }, [count]);

  return (
    <>
      {cubes.map((cube, i) => (
        <FallingCube key={i} data={cube} />
      ))}
    </>
  );
}

/** Global floating cubes background overlay */
const FloatingCubes = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      <CubesScene />
    </Canvas>
  </div>
);

export default FloatingCubes;
