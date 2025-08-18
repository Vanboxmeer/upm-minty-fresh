import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated blockchain nodes
function BlockchainNodes() {
  const meshRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);

  // Create cube positions for blockchain nodes
  const cubePositions = useMemo(() => [
    [-4, 2, -10] as [number, number, number], [0, 3, -15] as [number, number, number], [4, 1, -12] as [number, number, number],
    [-6, -1, -20] as [number, number, number], [2, -2, -18] as [number, number, number], [6, 0, -25] as [number, number, number],
    [-3, 4, -30] as [number, number, number], [1, 2, -28] as [number, number, number], [5, -1, -32] as [number, number, number],
    [-8, 0, -35] as [number, number, number], [0, -3, -40] as [number, number, number], [8, 1, -38] as [number, number, number]
  ], []);

  // Animation loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.children.forEach((child, index) => {
        child.rotation.x += delta * 0.5;
        child.rotation.y += delta * 0.3;
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002;
      });
    }
    
    // Move camera forward based on scroll
    const scrollY = window.scrollY;
    const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
    state.camera.position.z = 5 - scrollProgress * 30;
  });

  return (
    <>
      {/* Blockchain nodes */}
      <group ref={meshRef}>
        {cubePositions.map((position, index) => (
          <mesh key={index} position={position}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial 
              color="#6366f1" 
              wireframe 
              transparent 
              opacity={0.6} 
            />
          </mesh>
        ))}
      </group>

      {/* Connection lines */}
      <group ref={linesRef}>
        {cubePositions.slice(0, -1).map((position, index) => {
          if (Math.random() > 0.5) return null; // Random connections
          const nextPosition = cubePositions[index + 1];
          
          return (
            <line key={`line-${index}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    position[0], position[1], position[2],
                    nextPosition[0], nextPosition[1], nextPosition[2]
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
            </line>
          );
        })}
      </group>
    </>
  );
}

// Floating particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  // Generate random particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;     // x
      positions[i + 1] = (Math.random() - 0.5) * 50;  // y
      positions[i + 2] = Math.random() * -100 - 10;   // z
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      // Subtle floating motion
      particlesRef.current.rotation.y += delta * 0.1;
      
      // Move particles based on scroll
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += scrollProgress * 0.1; // Move particles forward
        
        // Reset particles that have moved too far
        if (positions[i + 2] > 10) {
          positions[i + 2] = -100;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={particlesRef} positions={particlePositions}>
      <PointMaterial 
        color="#a855f7" 
        size={0.1} 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  );
}

const BlockchainBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        <BlockchainNodes />
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default BlockchainBackground;