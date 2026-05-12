import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { BRAIN_ROT_PHRASES } from '../data/chaosData'

export default function BrainRotGenerator() {
  const activeSystems = useGameStore((s) => s.activeChaosSystems)
  const [phrase, setPhrase] = useState('')
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (!activeSystems.includes('brain_rot_gen')) return
    
    const interval = setInterval(() => {
      setPhrase(BRAIN_ROT_PHRASES[Math.floor(Math.random() * BRAIN_ROT_PHRASES.length)])
      setKey(prev => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [activeSystems])

  if (!activeSystems.includes('brain_rot_gen')) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: [0.5, 1.2, 1], opacity: [0, 1, 0], rotate: 10 }}
          transition={{ duration: 1.5, times: [0, 0.2, 1] }}
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            color: '#fff',
            textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(79, 172, 254, 0.8)',
            textAlign: 'center',
            maxWidth: '80%'
          }}
        >
          {phrase}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
