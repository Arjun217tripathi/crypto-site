"use client";

import * as THREE from 'three';
import { useMemo } from 'react';

const vertexShader = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;

float noise(vec3 p) {
  return sin(p.x) * sin(p.y) * sin(p.z);
}

void main() {
  vUv = uv;
  vNormal = normal;
  vPosition = position;

  float n = noise(position + uTime * 0.15);
  vec3 displaced = position + normal * n * 0.02;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;

void main() {
  vec3 purple = vec3(0.75, 0.3, 1.0);
  vec3 cyan   = vec3(0.2, 0.8, 1.0);
  vec3 pink   = vec3(1.0, 0.4, 0.7);
  vec3 yellow = vec3(1.0, 0.9, 0.3);

  float flowY = sin(vUv.y * 6.0 + uTime * 0.6) * 0.5 + 0.5;
  float flowX = sin(vUv.x * 4.0 + uTime * 0.4) * 0.5 + 0.5;

  vec3 color = mix(purple, cyan, flowY);
  color = mix(color, pink, flowX);
  color = mix(color, yellow, smoothstep(0.8, 1.0, flowY));

  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(normalize(vNormal), viewDir), 2.5);
  color += fresnel * 0.35;

  float alpha = 0.85;

  gl_FragColor = vec4(color, alpha);
}
`;

export const CryptechoMaterial = () => {
    const material = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
    }), []);

    return <primitive object={material} attach="material" />;
};
