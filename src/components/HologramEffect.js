import { Canvas, useThree } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";

const HologramEarth = () => {
  // Load textures
  const earthTexture = useLoader(TextureLoader, "/image/clouds-holo.jpg");
  const bumpMap = useLoader(TextureLoader, "/image/rain-holo.jpg");
  const glowTexture = useLoader(TextureLoader, "/image/sun-holo.jpg");

  const canvasRef = useRef();
  const [screenshot, setScreenshot] = useState(null);

  // Function to capture a screenshot
  const captureScreenshot = () => {
    if (!canvasRef.current) return;
    const gl = canvasRef.current.gl;
    const canvas = gl.domElement;
    const dataURL = canvas.toDataURL("image/png");
    setScreenshot(dataURL);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 3] }}
        gl={{ preserveDrawingBuffer: true }} // Fix screenshot capture
        style={{ width: "100%", height: "100vh", display: "block" }} // Fix aspect ratio
      >
        {/* Background Effects */}
        <Stars radius={150} depth={50} count={5000} factor={4} fade />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />

        {/* Earth Sphere */}
        <mesh rotation={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} /> {/* Corrected sphere shape */}
          <meshStandardMaterial map={earthTexture} bumpMap={bumpMap} bumpScale={0.05} />
        </mesh>

        {/* Holographic Glow Effect */}
        <mesh scale={1.6}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            map={glowTexture}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            opacity={0.3}
            transparent
            color={"#00FFFF"}
          />
        </mesh>

        {/* Camera Controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Capture Screenshot Button */}
      <button
        onClick={captureScreenshot}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Capture Screenshot
      </button>

      {/* Display the Captured Image */}
      {screenshot && (
        <div style={{ marginTop: "20px" }}>
          <h3>Captured Screenshot:</h3>
          <img
            src={screenshot}
            alt="Captured Earth Hologram"
            style={{ width: "300px", border: "2px solid #00FFFF" }}
          />
        </div>
      )}
    </div>
  );
};

export default HologramEarth;