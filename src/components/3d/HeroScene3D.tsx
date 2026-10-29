import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Edges, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  dprMax?: number;
  onLoaded?: () => void;
};

type RoofProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
  color?: string;
};

function PremiumAtmosphere({ active }: { active: boolean }) {
  const atmosphereRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * (active ? 0.16 : 0.012);
      atmosphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.025;
    }
  });

  return (
    <group ref={atmosphereRef}>
      <group position={[0, 0, -4.6]}>
        <Sparkles count={26} scale={[15, 8, 2]} size={2.6} speed={0.18} opacity={0.78} color="#dcecff" />
        <Sparkles count={12} scale={[13, 7, 1]} size={3.7} speed={0.1} opacity={0.58} color="#f1e6ca" />
      </group>
      <Sparkles count={8} position={[-5.4, 0.4, -0.6]} scale={[3.6, 8, 8]} size={2.9} speed={0.26} opacity={0.76} color="#dcecff" />
      <Sparkles count={8} position={[5.4, 0.4, -0.6]} scale={[3.6, 8, 8]} size={2.9} speed={0.26} opacity={0.76} color="#dcecff" />
      <Sparkles count={6} position={[0, 4.2, -0.7]} scale={[11, 2.2, 7]} size={3} speed={0.22} opacity={0.66} color="#dcecff" />
      <Sparkles count={5} position={[0, -3.3, -0.6]} scale={[11, 1.8, 7]} size={2.7} speed={0.18} opacity={0.6} color="#f1e6ca" />
    </group>
  );
}

function ArchitecturalBackdrop() {
  return null;
}

function RoofPlane({ position, rotation, size, color = '#344d5c' }: RoofProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} metalness={0.38} roughness={0.64} />
        <Edges color="#b7d0d8" threshold={14} />
      </mesh>
    </group>
  );
}

function Window({ position, width = 0.78, height = 1.15, rotation = [0, 0, 0] }: { position: [number, number, number]; width?: number; height?: number; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[width, height, 0.07]} />
        <meshStandardMaterial color="#31586b" metalness={0.18} roughness={0.3} emissive="#245a76" emissiveIntensity={0.42} />
        <Edges color="#f2c875" threshold={10} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.035, height - 0.08, 0.025]} />
        <meshBasicMaterial color="#f0dfb6" />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[width - 0.08, 0.035, 0.025]} />
        <meshBasicMaterial color="#f0dfb6" />
      </mesh>
    </group>
  );
}

function Porch({ warmLightRef }: { warmLightRef: React.RefObject<THREE.PointLight> }) {
  return (
    <group>
      <mesh position={[0, -1.4, 2.42]}>
        <boxGeometry args={[6.35, 0.2, 1.55]} />
        <meshStandardMaterial color="#cbd0ca" roughness={0.75} />
        <Edges color="#81919b" threshold={14} />
      </mesh>
      <mesh position={[0, 0.6, 2.42]}>
        <boxGeometry args={[6.65, 0.2, 1.65]} />
        <meshStandardMaterial color="#f0efe5" roughness={0.62} />
        <Edges color="#a4b2b4" threshold={14} />
      </mesh>
      {[-2.85, -1.15, 1.15, 2.85].map((x) => (
        <mesh key={x} position={[x, -0.42, 2.42]}>
          <boxGeometry args={[0.16, 2.05, 0.16]} />
          <meshStandardMaterial color="#f0efe5" roughness={0.58} />
        </mesh>
      ))}
      <mesh position={[0, -0.96, 3.18]}>
        <boxGeometry args={[6.15, 0.08, 0.08]} />
        <meshBasicMaterial color="#f2c875" />
      </mesh>
      <pointLight ref={warmLightRef} position={[0, 0.35, 2.9]} color="#f3a115" intensity={0.75} distance={5} />
    </group>
  );
}

function Gable({ position, width, height, rotation = [0, 0, 0] }: { position: [number, number, number]; width: number; height: number; rotation?: [number, number, number] }) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(0, height);
  shape.lineTo(width / 2, 0);
  shape.closePath();

  return (
    <mesh position={position} rotation={rotation}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color="#b7c7c9" roughness={0.84} />
      <Edges color="#ffffff" threshold={10} />
    </mesh>
  );
}

function ReadyNotifier({ onReady }: { onReady?: () => void }) {
  const triggered = useRef(false);
  useFrame(() => {
    if (!triggered.current && onReady) {
      triggered.current = true;
      onReady();
    }
  });
  return null;
}

function ReferenceHouse({ autoRotate }: { autoRotate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const houseScale = Math.min(1.04, Math.max(0.84, viewport.width / 10.2));
  const warmLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.07;
    if (warmLightRef.current) warmLightRef.current.intensity = 0.72 + Math.sin(state.clock.elapsedTime * 1.5) * 0.07;
  });

  return (
    <group ref={groupRef} rotation={[0.02, -0.3, 0]} scale={houseScale}>
      <mesh position={[0, -1.62, 0]}>
        <boxGeometry args={[7.7, 0.28, 5.2]} />
        <meshStandardMaterial color="#405967" metalness={0.32} roughness={0.66} />
        <Edges color="#8ca7b3" threshold={14} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[6.8, 2.65, 4.25]} />
        <meshStandardMaterial color="#b8c8ca" roughness={0.82} />
        <Edges color="#dce2dc" threshold={15} />
      </mesh>
      <mesh position={[-2.55, -0.48, -0.05]}>
        <boxGeometry args={[1.45, 2.35, 3.65]} />
        <meshStandardMaterial color="#a8bcc0" roughness={0.86} />
        <Edges color="#d4ded9" threshold={15} />
      </mesh>

      <RoofPlane position={[0, 1.62, 1.15]} rotation={[0.54, 0, 0]} size={[7.3, 0.16, 2.75]} color="#243b48" />
      <RoofPlane position={[0, 1.62, -1.15]} rotation={[-0.54, 0, 0]} size={[7.3, 0.16, 2.75]} color="#1d303b" />
      <RoofPlane position={[-2.55, 1.34, 0.95]} rotation={[0.54, 0, 0]} size={[1.85, 0.14, 2.4]} color="#1e3340" />
      <RoofPlane position={[-2.55, 1.34, -0.95]} rotation={[-0.54, 0, 0]} size={[1.85, 0.14, 2.4]} color="#182933" />
      <RoofPlane position={[0, 1.98, 1.25]} rotation={[0.62, 0, 0]} size={[2.25, 0.14, 1.8]} color="#2c4756" />
      <RoofPlane position={[0, 1.98, -1.25]} rotation={[-0.62, 0, 0]} size={[2.25, 0.14, 1.8]} color="#223744" />

      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[7.32, 0.14, 0.18]} />
        <meshStandardMaterial color="#f0dfb6" metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.68, 0]}>
        <boxGeometry args={[2.26, 0.12, 0.16]} />
        <meshStandardMaterial color="#f0dfb6" metalness={0.45} roughness={0.4} />
      </mesh>

      <Gable position={[-3.41, 1.0, 0]} width={4.25} height={1.38} rotation={[0, -Math.PI / 2, 0]} />
      <Gable position={[3.41, 1.0, 0]} width={4.25} height={1.38} rotation={[0, Math.PI / 2, 0]} />
      <Gable position={[0, 1.45, 2.13]} width={1.9} height={1.22} />
      <Gable position={[0, 1.45, -2.13]} width={1.9} height={1.22} rotation={[0, Math.PI, 0]} />

      <mesh position={[-2.25, 1.62, -0.48]}>
        <boxGeometry args={[0.62, 1.7, 0.7]} />
        <meshStandardMaterial color="#9eaaa9" roughness={0.82} />
        <Edges color="#bdc5c1" threshold={14} />
      </mesh>
      <mesh position={[-2.25, 2.47, -0.48]}>
        <boxGeometry args={[0.8, 0.12, 0.86]} />
        <meshStandardMaterial color="#536873" roughness={0.72} />
      </mesh>

      <Window position={[-2.55, -0.04, 2.12]} width={0.9} height={1.2} />
      <Window position={[2.55, -0.04, 2.12]} width={0.9} height={1.2} />
      <Window position={[-0.9, 1.58, 2.18]} width={0.72} height={0.95} />
      <Window position={[0.9, 1.58, 2.18]} width={0.72} height={0.95} />
      <Window position={[0, 2.08, 2.2]} width={0.72} height={0.62} />
      <Window position={[-3.29, -0.05, 0.65]} width={0.82} height={1.15} rotation={[0, Math.PI / 2, 0]} />
      <Window position={[-3.29, -0.05, -0.95]} width={0.82} height={1.15} rotation={[0, Math.PI / 2, 0]} />
      <Window position={[3.29, -0.05, 0.65]} width={0.82} height={1.15} rotation={[0, -Math.PI / 2, 0]} />
      <Window position={[3.29, -0.05, -0.95]} width={0.82} height={1.15} rotation={[0, -Math.PI / 2, 0]} />
      <Window position={[-2.25, -0.04, -2.16]} width={0.9} height={1.2} rotation={[0, Math.PI, 0]} />
      <Window position={[2.25, -0.04, -2.16]} width={0.9} height={1.2} rotation={[0, Math.PI, 0]} />
      <Window position={[0, 1.55, -2.18]} width={0.72} height={0.85} rotation={[0, Math.PI, 0]} />
      <mesh position={[0, -0.62, 2.2]}>
        <boxGeometry args={[0.95, 1.75, 0.1]} />
        <meshStandardMaterial color="#38647a" metalness={0.16} roughness={0.3} emissive="#287294" emissiveIntensity={0.46} />
        <Edges color="#f2c875" threshold={10} />
      </mesh>
      <mesh position={[0.38, -0.62, 2.26]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshBasicMaterial color="#f3a115" />
      </mesh>
      <mesh position={[0, -0.62, -2.2]}>
        <boxGeometry args={[0.95, 1.75, 0.1]} />
        <meshStandardMaterial color="#38647a" metalness={0.16} roughness={0.3} emissive="#287294" emissiveIntensity={0.46} />
        <Edges color="#f2c875" threshold={10} />
      </mesh>
      <mesh position={[-0.38, -0.62, -2.26]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshBasicMaterial color="#f3a115" />
      </mesh>

      <Porch warmLightRef={warmLightRef} />
    </group>
  );
}

export default function HeroScene3D({ dprMax = 1.5, onLoaded }: Props) {
  const [interacting, setInteracting] = useState(false);

  return (
    <div
      className="w-full h-full"
      onMouseDown={() => setInteracting(true)}
      onMouseUp={() => setInteracting(false)}
      onMouseLeave={() => setInteracting(false)}
      onTouchStart={() => setInteracting(true)}
      onTouchEnd={() => setInteracting(false)}
    >
      <Canvas
        camera={{ position: [8.6, 4.8, 10.8], fov: 43 }}
        dpr={[1, dprMax]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.88} color="#dcecff" />
        <directionalLight position={[5, 9, 7]} intensity={1.62} color="#d7ebf5" />
        <directionalLight position={[-5, 4, -4]} intensity={0.42} color="#f3a115" />
        <ArchitecturalBackdrop />
        <PremiumAtmosphere active={interacting} />
        <ReferenceHouse autoRotate={!interacting} />
        <ReadyNotifier onReady={onLoaded} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3.35}
          maxPolarAngle={Math.PI / 1.82}
          rotateSpeed={0.42}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
