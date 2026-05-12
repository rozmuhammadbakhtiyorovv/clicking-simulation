import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useState } from 'react'

export default function MenuScreen() {
  const setPhase = useGameStore((s) => s.setPhase)
  const startMusic = useGameStore((s) => s.startMusic)
  const [clicked, setClicked] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (clicked) return
    setClicked(true)
    startMusic()

    // Create ripple burst effect
    setTimeout(() => setPhase('playing'), 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      onClick={handleClick}
      style={{
        position: 'fixed', inset: 0,
        background: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: 100,
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      <motion.div
        animate={clicked ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', position: 'relative' }}
      >
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            color: '#fff',
            letterSpacing: '0.05em',
            lineHeight: 1,
            textShadow: '0 0 60px rgba(255,255,255,0.15)',
          }}
        >
          JUST CLICK
        </motion.div>

        <motion.div
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem',
            color: '#666',
            letterSpacing: '0.3em',
            marginTop: '24px',
          }}
        >
          ANYWHERE · ANYTIME · FOREVER
        </motion.div>
      </motion.div>

      {/* Corner decoration */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.65rem',
        color: '#333',
        letterSpacing: '0.2em',
      }}>
        STIMULATION ENGINE v1.0
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </motion.div>
  )
}
