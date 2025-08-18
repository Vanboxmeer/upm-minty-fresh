import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BlockchainBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    cubes?: THREE.Mesh[];
    lines?: THREE.Line[];
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create blockchain network elements
    const cubes: THREE.Mesh[] = [];
    const lines: THREE.Line[] = [];
    
    // Create connected cube network
    const positions = [
      [-4, 2, -10], [0, 3, -15], [4, 1, -12],
      [-6, -1, -20], [2, -2, -18], [6, 0, -25],
      [-3, 4, -30], [1, 2, -28], [5, -1, -32],
      [-8, 0, -35], [0, -3, -40], [8, 1, -38]
    ];

    // Create cubes (blockchain blocks)
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x6366f1, 
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    positions.forEach((pos, index) => {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(pos[0], pos[1], pos[2]);
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(cube);
      cubes.push(cube);
    });

    // Create connecting lines (blockchain connections)
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3
    });

    // Connect nearby cubes with lines
    for (let i = 0; i < cubes.length - 1; i++) {
      if (Math.random() > 0.4) { // Random connections for organic look
        const points = [];
        points.push(cubes[i].position);
        points.push(cubes[i + 1].position);
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
        lines.push(line);
      }
    }

    // Add some connecting lines between random cubes
    for (let i = 0; i < 8; i++) {
      const cube1 = cubes[Math.floor(Math.random() * cubes.length)];
      const cube2 = cubes[Math.floor(Math.random() * cubes.length)];
      
      if (cube1 !== cube2) {
        const distance = cube1.position.distanceTo(cube2.position);
        if (distance < 15) { // Only connect nearby cubes
          const points = [cube1.position, cube2.position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
          lines.push(line);
        }
      }
    }

    // Add particles for depth
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions3 = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions3[i] = (Math.random() - 0.5) * 100;     // x
      positions3[i + 1] = (Math.random() - 0.5) * 50;  // y
      positions3[i + 2] = Math.random() * -100 - 10;   // z
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions3, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.1,
      transparent: true,
      opacity: 0.4
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Store references
    sceneRef.current = { scene, camera, renderer, cubes, lines };

    // Scroll-based animation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
      
      // Move camera forward through the network
      camera.position.z = 5 - scrollProgress * 30;
      
      // Rotate cubes based on scroll
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.005 + scrollProgress * 0.01;
        cube.rotation.y += 0.005 + scrollProgress * 0.01;
        cube.rotation.z += 0.003 + scrollProgress * 0.007;
        
        // Slight position shift for depth effect
        cube.position.x += Math.sin(scrollProgress * Math.PI + index) * 0.01;
        cube.position.y += Math.cos(scrollProgress * Math.PI + index) * 0.01;
      });

      // Animate particle positions
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += scrollProgress * 0.1; // Move particles forward
        
        // Reset particles that have moved too far
        if (positions[i + 2] > 10) {
          positions[i + 2] = -100;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
    };

    // Animation loop
    const animate = () => {
      // Subtle automatic rotation when not scrolling
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.002;
        
        // Subtle floating motion
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      cubes.forEach(cube => {
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach(material => material.dispose());
        } else {
          cube.material.dispose();
        }
      });
      
      lines.forEach(line => {
        line.geometry.dispose();
        if (Array.isArray(line.material)) {
          line.material.forEach(material => material.dispose());
        } else {
          line.material.dispose();
        }
      });
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ zIndex: -1 }}
    />
  );
};

export default BlockchainBackground;