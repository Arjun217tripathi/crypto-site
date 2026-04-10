"use client";

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense, useMemo } from 'react';
import { Environment, Float } from '@react-three/drei';
import { CryptechoMaterial } from './CryptechoMaterial';

function Blob() {
    const meshRef = useRef<THREE.Mesh>(null!);

    // Using explicit geometry from request
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, 10), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
            meshRef.current.position.y = Math.sin(t * 0.4) * 0.03;

            // Access the material's uniform safely
            const material = meshRef.current.material as THREE.ShaderMaterial;
            if (material && material.uniforms && material.uniforms.uTime) {
                material.uniforms.uTime.value = t;
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh ref={meshRef} geometry={geometry}>
                <CryptechoMaterial />
            </mesh>
        </Float>
    );
}

export default function CryptechoBlob() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 40 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={0.6} />
                    <pointLight position={[-5, -5, 5]} intensity={0.4} color="#B56CFF" />
                    <Environment preset="studio" />
                    <Blob />
                </Suspense>
            </Canvas>
        </div>
    );
}
