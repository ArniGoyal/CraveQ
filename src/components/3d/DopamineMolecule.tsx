import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AtomProps {
  position: [number, number, number];
  color: string;
  size: number;
  glowIntensity?: number;
}

const GlowingAtom = ({ position, color, size, glowIntensity = 1 }: AtomProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.001;
    }
  });

  return (
    <group position={position}>
      {/* Core atom */}
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 * glowIntensity}
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {/* Outer glow */}
      <Sphere args={[size * 1.5, 16, 16]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15 * glowIntensity}
        />
      </Sphere>
    </group>
  );
};

interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

const Bond = ({ start, end, color = "#00ff88" }: BondProps) => {
  const ref = useRef<THREE.Mesh>(null);
  
  const { position, rotation, length } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midpoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();
    
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    
    return {
      position: midpoint.toArray() as [number, number, number],
      rotation: [euler.x, euler.y, euler.z] as [number, number, number],
      length,
    };
  }, [start, end]);

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.05, 0.05, length, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ff88"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const DopamineMolecule = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  // Simplified dopamine-like molecular structure
  const atoms: { pos: [number, number, number]; color: string; size: number }[] = [
    // Benzene ring (simplified)
    { pos: [0, 0, 0], color: "#00ff88", size: 0.25 },
    { pos: [0.8, 0.5, 0], color: "#00ff88", size: 0.25 },
    { pos: [0.8, 1.3, 0], color: "#00ff88", size: 0.25 },
    { pos: [0, 1.8, 0], color: "#00ff88", size: 0.25 },
    { pos: [-0.8, 1.3, 0], color: "#00ff88", size: 0.25 },
    { pos: [-0.8, 0.5, 0], color: "#00ff88", size: 0.25 },
    // Hydroxyl groups (oxygen - red/orange glow)
    { pos: [-1.5, 0, 0], color: "#ff6b35", size: 0.2 },
    { pos: [-1.5, 1.8, 0], color: "#ff6b35", size: 0.2 },
    // Ethylamine chain
    { pos: [1.6, 0, 0], color: "#00ff88", size: 0.25 },
    { pos: [2.4, -0.5, 0], color: "#00ff88", size: 0.25 },
    // Nitrogen (blue glow)
    { pos: [3.2, -0.2, 0], color: "#00a8ff", size: 0.28 },
  ];

  const bonds: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], // Benzene ring
    [5, 6], [4, 7], // Hydroxyl connections
    [1, 8], [8, 9], [9, 10], // Ethylamine chain
  ];

  return (
    <group ref={groupRef} scale={0.8}>
      <FloatingParticles />
      
      {/* Render bonds */}
      {bonds.map(([startIdx, endIdx], i) => (
        <Bond
          key={`bond-${i}`}
          start={atoms[startIdx].pos}
          end={atoms[endIdx].pos}
          color="#00ff88"
        />
      ))}
      
      {/* Render atoms */}
      {atoms.map((atom, i) => (
        <GlowingAtom
          key={`atom-${i}`}
          position={atom.pos}
          color={atom.color}
          size={atom.size}
          glowIntensity={1.2}
        />
      ))}
      
      {/* Ambient glow sphere */}
      <Sphere args={[4, 32, 32]} position={[1, 0.9, 0]}>
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.02}
        />
      </Sphere>
    </group>
  );
};

export default DopamineMolecule;
