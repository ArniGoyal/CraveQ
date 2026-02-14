import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface RuneCircleProps {
  radius: number;
  rotationSpeed?: number;
  opacity?: number;
  runeCount?: number;
}

export const RuneCircle = ({ 
  radius, 
  rotationSpeed = 0.1, 
  opacity = 0.6,
  runeCount = 12 
}: RuneCircleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Alchemical symbols
  const runes = ['☿', '♃', '♄', '♂', '♀', '☉', '☽', '⊕', '♅', '♆', '⚶', '⚷'];
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <Ring args={[radius - 0.05, radius, 64]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#00ff88" transparent opacity={opacity * 0.5} />
      </Ring>
      
      {/* Inner ring */}
      <Ring args={[radius * 0.85 - 0.03, radius * 0.85, 64]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#00ff88" transparent opacity={opacity * 0.3} />
      </Ring>
      
      {/* Rune symbols */}
      {Array.from({ length: runeCount }).map((_, i) => {
        const angle = (i / runeCount) * Math.PI * 2;
        const x = Math.cos(angle) * (radius * 0.92);
        const y = Math.sin(angle) * (radius * 0.92);
        
        return (
          <Text
            key={i}
            position={[x, y, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
            fontSize={0.15}
            color="#00ff88"
            anchorX="center"
            anchorY="middle"
          >
            {runes[i % runes.length]}
          </Text>
        );
      })}
      
      {/* Corner markers */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <mesh key={`marker-${i}`} position={[x, y, 0]}>
            <circleGeometry args={[0.08, 6]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};

interface MagicCircleProps {
  position?: [number, number, number];
  scale?: number;
}

export const MagicCircle = ({ position = [0, 0, 0], scale = 1 }: MagicCircleProps) => {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = -state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group position={position} scale={scale}>
      <group ref={outerRef}>
        <RuneCircle radius={3} rotationSpeed={0.05} opacity={0.4} runeCount={16} />
      </group>
      <group ref={innerRef}>
        <RuneCircle radius={2.2} rotationSpeed={-0.08} opacity={0.5} runeCount={12} />
      </group>
      <RuneCircle radius={1.5} rotationSpeed={0.12} opacity={0.6} runeCount={8} />
    </group>
  );
};

export default MagicCircle;
