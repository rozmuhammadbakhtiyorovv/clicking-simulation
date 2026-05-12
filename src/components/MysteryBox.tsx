import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function MysteryBox() {
  const box = useGameStore((s) => s.mysteryBox)
  const clickBox = useGameStore((s) => s.clickMysteryBox)

  if (!box || !box.active) return null

  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      onClick={clickBox}
      style={{
        position: 'fixed',
        left: `${box.x}%`,
        top: `${box.y}%`,
        fontSize: '3rem',
        cursor: 'pointer',
        zIndex: 600,
        filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
      }}
    >
      🎁
    </motion.div>
  )
}
