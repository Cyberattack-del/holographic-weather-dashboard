import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const HologramEffect = () => {
  const mountRef = useRef(null);
  const requestRef = useRef(null); // Animation frame reference
  const rendererRef = useRef(null); // Store renderer reference

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return; // Prevent errors if mountRef is null

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Create a WebGL renderer and store it in the ref
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Save renderer instance

    // Create a single rotating globe with a BLUE wireframe outline
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: "cyan",       // Inner fill color
      wireframe: true,      // Enable wireframe mode
      wireframeLinewidth: 2, // (Doesn't work in WebGL, but keeping for reference)
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Create an extra wireframe with blue outline
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: "blue",        // Blue outline
      wireframe: true,
    });

    const wireframeGlobe = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(wireframeGlobe);

    // Add lighting
    const light = new THREE.PointLight("white", 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      globe.rotation.y += 0.005;
      wireframeGlobe.rotation.y += 0.005; // Ensure both rotate together
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();
    // Cleanup function to properly dispose of renderer and prevent duplicate instances
    return () => {
      cancelAnimationFrame(requestRef.current); // Stop animation
      if (rendererRef.current) {
        rendererRef.current.dispose(); // Dispose renderer safely
        if (mount.contains(rendererRef.current.domElement)) {
          mount.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default HologramEffect;