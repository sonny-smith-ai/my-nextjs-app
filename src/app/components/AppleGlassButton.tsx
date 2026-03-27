'use client'

import { ReactNode, useState } from 'react'

interface AppleGlassButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function AppleGlassButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}: AppleGlassButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary: {
      base: 'bg-white/10 border-white/20 text-white shadow-lg shadow-black/20',
      hover: 'hover:bg-white/20 hover:border-white/30 hover:shadow-xl hover:shadow-blue-500/20',
      active: 'active:bg-white/25 active:scale-95'
    },
    secondary: {
      base: 'bg-black/10 border-white/15 text-white shadow-md shadow-black/10',
      hover: 'hover:bg-black/20 hover:border-white/25 hover:shadow-lg hover:shadow-purple-500/10',
      active: 'active:bg-black/30 active:scale-95'
    },
    accent: {
      base: 'bg-blue-500/20 border-blue-400/30 text-blue-100 shadow-lg shadow-blue-500/20',
      hover: 'hover:bg-blue-500/30 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/30',
      active: 'active:bg-blue-500/40 active:scale-95'
    }
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  }

  const currentVariant = variants[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        relative
        backdrop-blur-lg
        border border-solid
        font-medium
        transition-all duration-300 ease-out
        transform-gpu
        will-change-transform
        disabled:opacity-50 disabled:cursor-not-allowed
        ${currentVariant.base}
        ${!disabled ? currentVariant.hover : ''}
        ${!disabled ? currentVariant.active : ''}
        ${sizes[size]}
        ${isPressed && !disabled ? 'scale-95' : ''}
        ${className}
      `}
      style={{
        background: disabled ? 'rgba(255,255,255,0.05)' : undefined,
      }}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-inherit pointer-events-none opacity-70" />
      
      {/* Rim lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 rounded-inherit pointer-events-none" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Hover shimmer effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer rounded-inherit" />
      </div>
    </button>
  )
}