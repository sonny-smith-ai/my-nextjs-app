'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'

function GlassOrb({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={16}
        resolution={512}
        transmission={1}
        roughness={0.1}
        thickness={1.5}
        ior={1.4}
        chromaticAberration={0.1}
        anisotropy={0.1}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.1}
      />
    </mesh>
  )
}

function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Text
      ref={textRef}
      position={[0, 0, -2]}
      fontSize={0.8}
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="/fonts/SF-Pro-Display-Medium.woff"
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      Think Different
    </Text>
  )
}

function LiquidGlassScene() {
  const orbPositions: [number, number, number][] = [
    [-3, 0, 0],
    [3, 0, 0],
    [0, 2, -1],
    [0, -2, 1],
    [-1.5, 1, -0.5],
    [1.5, -1, 0.5],
  ]

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingText />
      {orbPositions.map((position, index) => (
        <GlassOrb key={index} position={position} />
      ))}
    </>
  )
}

export function LiquidGlass() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <LiquidGlassScene />
      </Canvas>
    </div>
  )
}