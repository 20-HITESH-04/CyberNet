import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapesProps {
  count?: number;
}

export const FloatingShapes = ({ count = 20 }: FloatingShapesProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const position: [number, number, number] = [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ];
        
        const shapeType = Math.floor(Math.random() * 3);
        const color = ['#00ffff', '#8a2be2', '#ff00ff'][Math.floor(Math.random() * 3)];
        const size = 0.5 + Math.random() * 0.5;
        
        return (
          <Float
            key={i}
            speed={1 + Math.random() * 2}
            rotationIntensity={0.5 + Math.random() * 0.5}
            floatIntensity={0.5 + Math.random() * 0.5}
          >
            {shapeType === 0 && (
              <Sphere position={position} args={[size, 16, 16]}>
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.6}
                  emissive={color}
                  emissiveIntensity={0.2}
                />
              </Sphere>
            )}
            {shapeType === 1 && (
              <Box position={position} args={[size, size, size]}>
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.6}
                  emissive={color}
                  emissiveIntensity={0.2}
                />
              </Box>
            )}
            {shapeType === 2 && (
              <Octahedron position={position} args={[size, 0]}>
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.6}
                  emissive={color}
                  emissiveIntensity={0.2}
                />
              </Octahedron>
            )}
          </Float>
        );
      })}
    </group>
  );
};