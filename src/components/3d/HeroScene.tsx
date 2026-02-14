import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { DopamineMolecule } from './DopamineMolecule';
import { MagicCircle } from './MagicRunes';

const SceneContent = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00a8ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#00ff88"
      />
      
      {/* Main molecule */}
      <group position={[0, 0.5, 0]}>
        <DopamineMolecule />
      </group>
      
      {/* Background magic circle */}
      <group position={[0, 0, -3]} rotation={[0, 0, 0]}>
        <MagicCircle scale={1.2} />
      </group>
      
      <Environment preset="night" />
    </>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
