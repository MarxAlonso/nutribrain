"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Octahedron, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function HeartModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.1;
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Rings representing vessels */}
      {[0, 1, 2].map((i) => (
        <Torus key={i} args={[1.2, 0.05, 16, 100]} rotation={[Math.PI / (i + 1), 0, 0]}>
          <meshStandardMaterial color="#fca5a5" opacity={0.3} transparent />
        </Torus>
      ))}
    </group>
  );
}

function NeuronModel() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 20; i++) {
      const radius = 2;
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      p.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(angle),
        radius * Math.sin(phi) * Math.sin(angle),
        radius * Math.cos(phi)
      ));
    }
    return p;
  }, []);

  return (
    <group>
      <Sphere args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </Sphere>
      {points.map((p, i) => (
        <Line key={i} points={[new THREE.Vector3(0,0,0), p]} color="#10b981" lineWidth={1} transparent opacity={0.4} />
      ))}
      {points.map((p, i) => (
        <Sphere key={`s-${i}`} position={p} args={[0.1, 16, 16]}>
           <meshStandardMaterial color="#34d399" />
        </Sphere>
      ))}
    </group>
  );
}

function DNAModel() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime();
  });

  const steps = 20;
  const elements = useMemo(() => {
     return Array.from({ length: steps }).map((_, i) => {
       const y = (i - steps / 2) * 0.3;
       const angle = i * 0.5;
       return { y, angle };
     });
  }, []);

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <group key={i} position={[0, el.y, 0]} rotation={[0, el.angle, 0]}>
          <Sphere position={[1, 0, 0]} args={[0.15, 16, 16]}>
            <meshStandardMaterial color="#3b82f6" />
          </Sphere>
          <Sphere position={[-1, 0, 0]} args={[0.15, 16, 16]}>
            <meshStandardMaterial color="#60a5fa" />
          </Sphere>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 2]} />
            <meshStandardMaterial color="white" opacity={0.2} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CrystalModel() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Octahedron args={[1, 0]}>
        <MeshWobbleMaterial factor={0.4} speed={1} color="#f59e0b" metalness={0.9} roughness={0.1} />
      </Octahedron>
    </Float>
  );
}

function DefenseModel() {
  return (
    <group>
      <Sphere args={[1, 32, 32]}>
        <MeshDistortMaterial speed={2} distort={0.3} color="#6366f1" />
      </Sphere>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         <meshStandardMaterial color="#818cf8" />
      </Torus>
    </group>
  );
}

export default function ThreeModelViewer({ type }: { type: string }) {
  return (
    <div className="w-full h-[300px] md:h-[400px] bg-slate-950/20 rounded-3xl border border-white/5 relative overflow-hidden my-8 shadow-inner">
      <div className="absolute top-4 left-6 z-10">
         <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/30 px-2 py-1 rounded">Visualizador Bio-Médico 3D</span>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <CenterContent type={type} />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

function CenterContent({ type }: { type: string }) {
  switch (type) {
    case 'heart': return <HeartModel />;
    case 'neuron': return <NeuronModel />;
    case 'growth': return <DNAModel />;
    case 'crystal': return <CrystalModel />;
    case 'defense': return <DefenseModel />;
    default: return <HeartModel />;
  }
}
