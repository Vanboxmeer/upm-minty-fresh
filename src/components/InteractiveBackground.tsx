import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ mousePosition }) => {
  const meshRef = useRef<THREE.Points>(null);
  const lineRefs = useRef<THREE.Line[]>([]);
  const { viewport } = useThree();
  
  // Generate random particles
  const particles = useMemo(() => {
    const temp = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * viewport.width * 2;
      temp[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      temp[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, [viewport]);

  // Generate connections between nearby particles
  const connections = useMemo(() => {
    const lines: Array<[number, number, number, number, number, number]> = [];
    for (let i = 0; i < particles.length; i += 3) {
      const x1 = particles[i];
      const y1 = particles[i + 1];
      const z1 = particles[i + 2];
      
      for (let j = i + 3; j < particles.length; j += 3) {
        const x2 = particles[j];
        const y2 = particles[j + 1];
        const z2 = particles[j + 2];
        
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
        if (distance < 3 && lines.length < 100) {
          lines.push([x1, y1, z1, x2, y2, z2]);
        }
      }
    }
    return lines;
  }, [particles]);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Add subtle floating motion
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        positions[i] += Math.cos(state.clock.elapsedTime + i) * 0.0005;
        
        // Mouse attraction effect
        const mouseX = (mousePosition.x / window.innerWidth - 0.5) * viewport.width;
        const mouseY = -(mousePosition.y / window.innerHeight - 0.5) * viewport.height;
        
        const dx = mouseX - positions[i];
        const dy = mouseY - positions[i + 1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
          const force = (5 - distance) / 5;
          positions[i] += dx * force * 0.002;
          positions[i + 1] += dy * force * 0.002;
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Particles */}
      <Points ref={meshRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      
      {/* Connection lines */}
      {connections.map((line, index) => (
        <Line
          key={index}
          points={[
            [line[0], line[1], line[2]], 
            [line[3], line[4], line[5]]
          ]}
          color="#3b82f6"
          opacity={0.3}
          transparent
          lineWidth={0.5}
        />
      ))}
    </group>
  );
};

const FloatingGeometry: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.2;
      
      // Subtle mouse following
      const mouseX = (mousePosition.x / window.innerWidth - 0.5) * 2;
      const mouseY = -(mousePosition.y / window.innerHeight - 0.5) * 2;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX * 0.5, 0.02);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY * 0.5, 0.02);
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 1, -2]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshBasicMaterial 
        color="#3b82f6" 
        transparent 
        opacity={0.1} 
        wireframe 
      />
    </mesh>
  );
};

const InteractiveBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <ParticleSystem mousePosition={mousePosition} />
        <FloatingGeometry mousePosition={mousePosition} />
        
        {/* Additional floating elements */}
        <mesh position={[-3, -2, -1]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.1} wireframe />
        </mesh>
        
        <mesh position={[3, 2, -3]}>
          <octahedronGeometry args={[0.7]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} wireframe />
        </mesh>
      </Canvas>
    </div>
  );
};

export default InteractiveBackground;