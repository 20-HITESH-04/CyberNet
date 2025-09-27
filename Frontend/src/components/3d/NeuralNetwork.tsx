import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  // Create neural network structure
  const layers = [
    { count: 4, x: -6 },
    { count: 6, x: -2 },
    { count: 6, x: 2 },
    { count: 3, x: 6 },
  ];

  const nodes = layers.flatMap((layer, layerIndex) =>
    Array.from({ length: layer.count }, (_, nodeIndex) => ({
      position: [
        layer.x,
        (nodeIndex - layer.count / 2) * 2,
        0,
      ] as [number, number, number],
      layerIndex,
      nodeIndex,
    }))
  );

  const connections = nodes.flatMap((node, nodeIndex) =>
    nodes
      .filter((otherNode) => otherNode.layerIndex === node.layerIndex + 1)
      .map((otherNode) => ({
        start: node.position,
        end: otherNode.position,
        key: `${nodeIndex}-${nodes.indexOf(otherNode)}`,
      }))
  );

  return (
    <group ref={groupRef} scale={0.5}>
      {/* Render connections using basic line geometry */}
      {connections.map((connection) => {
        const points = [
          new THREE.Vector3(...connection.start),
          new THREE.Vector3(...connection.end)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <primitive 
            key={connection.key} 
            object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
              color: "#00ffff", 
              transparent: true, 
              opacity: 0.6 
            }))} 
          />
        );
      })}
      
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <Sphere key={index} position={node.position} args={[0.2, 8, 8]}>
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};