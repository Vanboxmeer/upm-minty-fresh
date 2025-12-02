import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text3D, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

// Particle system for data flow
function DataParticles({ count = 1000 }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create particles in a sphere distribution
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Vibrant colors
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.5 + Math.random() * 0.5;
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = 0.5 + Math.random() * 0.5;
      } else {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1.0;
      }
    }
    
    return { positions, colors };
  }, [count]);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
      
      // Animate particles
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.getElapsedTime() + i) * 0.001;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.positions.length / 3}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesPosition.colors.length / 3}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Central hub sphere
function CentralHub() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Glow effect */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}

// Service node orbs
function ServiceNode({ position, color, label }: { position: [number, number, number], color: string, label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.2;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[0.5, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.4}
          />
        </Sphere>
        
        {/* Outer glow */}
        <Sphere args={[0.6, 16, 16]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.3 : 0.15}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </Float>
  );
}

// Connection lines between nodes
function Connections() {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const connections = useMemo(() => {
    const points = [];
    const center = new THREE.Vector3(0, 0, 0);
    
    // Define service node positions
    const nodePositions = [
      new THREE.Vector3(-3, 2, 0),
      new THREE.Vector3(3, 2, 0),
      new THREE.Vector3(0, -2.5, 0),
      new THREE.Vector3(-2, -1, 2),
      new THREE.Vector3(2, -1, 2),
    ];
    
    // Connect all nodes to center
    nodePositions.forEach(pos => {
      points.push(center.x, center.y, center.z);
      points.push(pos.x, pos.y, pos.z);
    });
    
    // Connect some nodes to each other
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (Math.random() > 0.5) {
          points.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          points.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }
    
    return new Float32Array(points);
  }, []);
  
  useFrame((state) => {
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });
  
  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={connections.length / 3}
          array={connections}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// Energy pulses traveling along connections
function EnergyPulses() {
  const pulsesRef = useRef<THREE.Points>(null);
  const [pulseData] = useState(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = 0;
      
      colors[i * 3] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.3;
      colors[i * 3 + 2] = 1.0;
      
      speeds[i] = 0.5 + Math.random() * 1;
    }
    
    return { positions, colors, speeds };
  });
  
  useFrame((state) => {
    if (pulsesRef.current) {
      const positions = pulsesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < pulseData.speeds.length; i++) {
        const i3 = i * 3;
        const angle = (i / pulseData.speeds.length) * Math.PI * 2 + time * pulseData.speeds[i];
        const radius = 2 + Math.sin(time * 0.5 + i) * 0.5;
        
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius;
        positions[i3 + 2] = Math.sin(time + i) * 0.5;
      }
      
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={pulsesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={pulseData.positions.length / 3}
          array={pulseData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={pulseData.colors.length / 3}
          array={pulseData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} angle={0.3} intensity={1} color="#ec4899" />
      
      <CentralHub />
      
      <ServiceNode position={[-3, 2, 0]} color="#06b6d4" label="KOL" />
      <ServiceNode position={[3, 2, 0]} color="#8b5cf6" label="Press" />
      <ServiceNode position={[0, -2.5, 0]} color="#ec4899" label="Media" />
      <ServiceNode position={[-2, -1, 2]} color="#10b981" label="Growth" />
      <ServiceNode position={[2, -1, 2]} color="#f59e0b" label="Network" />
      
      <Connections />
      <EnergyPulses />
      <DataParticles count={800} />
      
      <Environment preset="night" />
    </>
  );
}

const AnimatedServicesHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-primary animate-pulse">Loading 3D Scene...</div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      
      {/* Subtle labels */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-xs text-primary/60 font-medium">Drag to explore • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default AnimatedServicesHero;
