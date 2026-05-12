import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function ComboDisplay() {
  const combo = useGameStore((s) => s.combo)
  
  if (combo < 5) return null

  const getScale = () => {
    if (combo >= 30) return 1.5
    if (combo >= 10) return 1.2
    return 1
  }

  const getColor = () => {
    if (combo >= 30) return '#ff0844'
    if (combo >= 10) return '#ffb400'
    return '#fff'
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      pointerEvents: 'none'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={combo}
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: getScale(), opacity: 1, y: 0 }}
          exit={{ scale: 2, opacity: 0 }}
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: '4rem',
            color: getColor(),
            textShadow: `0 0 20px ${getColor()}88`,
            letterSpacing: '0.1em'
          }}
        >
          {combo} COMBO
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
