import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  particleCount?: number;
  dprMax?: number;
};

function ParticleMesh({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollRef = useRef(0);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mix = Math.random();
      colors[i * 3] = 0.05 + mix * 0.2;
      colors[i * 3 + 1] = 0.5 + mix * 0.3;
      colors[i * 3 + 2] = 0.95 - mix * 0.2;
    }
    return { positions, colors };
  }, [count]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    mouseCurrent.current.x += (mouseTarget.current.x * 0.3 - mouseCurrent.current.x) * 0.04;
    mouseCurrent.current.y += (mouseTarget.current.y * 0.3 - mouseCurrent.current.y) * 0.04;

    const targetScroll = window.scrollY * 0.0002;
    scrollRef.current += (targetScroll - scrollRef.current) * 0.05;

    pointsRef.current.rotation.y += 0.0004;
    pointsRef.current.rotation.x += (mouseCurrent.current.y * 0.2 - pointsRef.current.rotation.x) * 0.01;
    pointsRef.current.rotation.z = mouseCurrent.current.x * 0.05;
    pointsRef.current.position.z = scrollRef.current * 5;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField({ particleCount = 1500, dprMax = 1 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handle = () => setVisible(window.scrollY < window.innerHeight * 4);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        dpr={[1, dprMax]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <ParticleMesh count={particleCount} />
      </Canvas>
    </div>
  );
}
