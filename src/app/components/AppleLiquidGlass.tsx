'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GlassMorphSphere({ position, scale = 1, speed = 1 }: { 
  position: [number, number, number]
  scale?: number
  speed?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2
    }
  })

  const geometry = useMemo(() => new THREE.SphereGeometry(scale, 128, 128), [scale])

  return (
    <Float speed={speed} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          samples={32}
          resolution={1024}
          transmission={0.95}
          roughness={0.05}
          thickness={scale * 0.8}
          ior={1.33}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.8}
          temporalDistortion={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  )
}

function LiquidBlob({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#4fc3f7"
          transparent
          opacity={0.3}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function BackgroundGradient() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[20, 20, 1]}>
      <planeGeometry />
      <meshBasicMaterial>
        <primitive object={new THREE.Color('#1a1a2e')} attach="color" />
      </meshBasicMaterial>
    </mesh>
  )
}

function AppleLiquidGlassScene() {
  // Create an array of spheres with Apple-like positioning
  const sphereConfigs = useMemo(() => [
    { position: [-4, 1, -2] as [number, number, number], scale: 0.8, speed: 0.8 },
    { position: [4, -1, -1] as [number, number, number], scale: 1.2, speed: 1.2 },
    { position: [0, 3, -3] as [number, number, number], scale: 0.6, speed: 0.6 },
    { position: [-2, -2, 1] as [number, number, number], scale: 1.0, speed: 1.0 },
    { position: [3, 2, -0.5] as [number, number, number], scale: 0.9, speed: 0.9 },
    { position: [-1, 0, 2] as [number, number, number], scale: 0.7, speed: 1.1 },
  ], [])

  const liquidBlobs = useMemo(() => [
    { position: [-6, -3, -5] as [number, number, number] },
    { position: [6, 4, -4] as [number, number, number] },
    { position: [0, -5, -6] as [number, number, number] },
  ], [])

  return (
    <>
      <BackgroundGradient />
      <Environment preset="city" background={false} />
      
      {/* Sophisticated lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4fc3f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e91e63" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} />
      
      {/* Glass spheres with transmission */}
      {sphereConfigs.map((config, index) => (
        <GlassMorphSphere
          key={`sphere-${index}`}
          position={config.position}
          scale={config.scale}
          speed={config.speed}
        />
      ))}
      
      {/* Liquid distortion blobs */}
      {liquidBlobs.map((blob, index) => (
        <LiquidBlob key={`blob-${index}`} position={blob.position} />
      ))}
    </>
  )
}

export function AppleLiquidGlass() {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          precision: "highp"
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <AppleLiquidGlassScene />
      </Canvas>
    </div>
  )
}