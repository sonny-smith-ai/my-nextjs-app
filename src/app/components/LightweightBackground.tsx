'use client'

export function LightweightBackground() {
  return (
    <>
      {/* Lightweight CSS-only background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30 animate-pulse" />
        
        {/* Floating CSS orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-bounce" 
             style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-lg animate-bounce" 
             style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-bounce" 
             style={{ animationDelay: '4s', animationDuration: '10s' }} />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-cyan-500/10 rounded-full blur-lg animate-bounce" 
             style={{ animationDelay: '1s', animationDuration: '7s' }} />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Performance indicator for debugging */}
      <div className="fixed bottom-4 right-4 z-50 text-xs text-white/50 font-mono">
        Lightweight Mode
      </div>
    </>
  )
}