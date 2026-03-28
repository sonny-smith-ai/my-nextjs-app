'use client'

import { useState, useEffect } from 'react'

interface PerformanceInfo {
  isMobile: boolean
  isLowEnd: boolean
  supportsWebGL: boolean
  deviceMemory?: number
  hardwareConcurrency: number
}

export function usePerformanceDetection(): PerformanceInfo {
  const [performance, setPerformance] = useState<PerformanceInfo>({
    isMobile: false,
    isLowEnd: false,
    supportsWebGL: false,
    hardwareConcurrency: 1,
  })

  useEffect(() => {
    // Mobile detection
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768

    // Device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory || 4

    // CPU cores
    const hardwareConcurrency = navigator.hardwareConcurrency || 1

    // WebGL support detection
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    const supportsWebGL = !!gl

    // Low-end device heuristics
    const isLowEnd = 
      deviceMemory <= 2 || 
      hardwareConcurrency <= 2 || 
      !supportsWebGL ||
      isMobile

    setPerformance({
      isMobile,
      isLowEnd,
      supportsWebGL,
      deviceMemory,
      hardwareConcurrency,
    })

    // Cleanup
    if (gl && 'getExtension' in gl) {
      const loseContext = gl.getExtension('WEBGL_lose_context')
      if (loseContext) {
        loseContext.loseContext()
      }
    }
  }, [])

  return performance
}