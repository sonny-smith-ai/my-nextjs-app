'use client'

import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: 'subtle' | 'medium' | 'strong'
  hover?: boolean
}

export function GlassCard({ 
  children, 
  className = '', 
  variant = 'medium',
  hover = true 
}: GlassCardProps) {
  const variants = {
    subtle: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    strong: 'bg-white/20 backdrop-blur-lg border-white/30'
  }

  const hoverClass = hover 
    ? 'hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-1' 
    : ''

  return (
    <div className={`
      ${variants[variant]}
      border border-solid
      rounded-xl
      shadow-xl shadow-black/10
      transition-all duration-500 ease-out
      ${hoverClass}
      ${className}
    `}>
      <div className="relative">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl pointer-events-none" />
        
        {/* Rim light effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 rounded-xl opacity-50 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export function GlassSection({ 
  children, 
  className = '',
  frosted = false 
}: { 
  children: ReactNode
  className?: string
  frosted?: boolean 
}) {
  return (
    <section className={`
      relative
      ${frosted ? 'bg-black/20 backdrop-blur-xl' : 'bg-transparent'}
      ${className}
    `}>
      {frosted && (
        <>
          {/* Frosted glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/10 pointer-events-none" />
          
          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}