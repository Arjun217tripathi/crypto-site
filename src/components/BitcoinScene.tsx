"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text, Box } from "@react-three/drei";
import { useRef } from "react";

function Coin() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh rotation={[0, 0, 0]}>
                <cylinderGeometry args={[2, 2, 0.4, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    metalness={1}
                    roughness={0.1}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                />
                <Text
                    position={[0, 0, 0.21]}
                    fontSize={1.5}
                    color="#000000"
                    font="/fonts/Outfit-Bold.ttf" // Optional: using a font here
                    anchorX="center"
                    anchorY="middle"
                >
                    B
                </Text>
                <Text
                    position={[0, 0, -0.21]}
                    fontSize={1.5}
                    color="#000000"
                    rotation={[0, Math.PI, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    B
                </Text>
            </mesh>
        </Float>
    );
}

export default function BitcoinScene() {
    return (
        <div className="w-full h-[500px]">
            <Canvas
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                camera={{ position: [0, 0, 8], fov: 40 }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={1} />
                <Coin />
            </Canvas>
        </div>
    );
}
