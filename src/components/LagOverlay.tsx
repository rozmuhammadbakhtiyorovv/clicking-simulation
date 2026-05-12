import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function LagOverlay() {
  const lagActive = useGameStore((s) => s.lagActive)

  if (!lagActive) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0,0,0,0.1)',
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(2px)'
    }}>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.1, repeat: Infinity }}
        style={{
          fontFamily: "'Space Mono', monospace",
          color: '#ff0844',
          fontSize: '2rem',
          fontWeight: 'bold',
          background: '#000',
          padding: '10px 20px',
          border: '4px solid #ff0844'
        }}
      >
        SYSTEM LAG DETECTED... [+BONUS]
      </motion.div>
    </div>
  )
}
