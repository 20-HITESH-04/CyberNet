import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FloatingShapes } from './FloatingShapes';
import { NeuralNetwork } from './NeuralNetwork';
import { ParticleField } from './ParticleField';

interface Scene3DProps {
  showNeuralNetwork?: boolean;
  showFloatingShapes?: boolean;
  showParticles?: boolean;
  className?: string;
}

export const Scene3D = ({
  showNeuralNetwork = true,
  showFloatingShapes = true,
  showParticles = true,
  className = "",
}: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        <directionalLight position={[0, 0, 5]} intensity={0.5} color="#8a2be2" />
        
        <Suspense fallback={null}>
          {showParticles && <ParticleField />}
          {showFloatingShapes && <FloatingShapes count={15} />}
          {showNeuralNetwork && <NeuralNetwork />}
        </Suspense>
      </Canvas>
    </div>
  );
};