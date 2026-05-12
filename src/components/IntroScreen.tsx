import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

const CREDITS = [
  { text: 'A game by', delay: 0.5, size: '1rem', opacity: 0.5 },
  { text: 'Rozmuhammad Baxtiyorov', delay: 1.2, size: '2.4rem', opacity: 1, font: 'bebas' },
  { text: '———', delay: 2.0, size: '1rem', opacity: 0.3 },
  { text: 'Written across 47 sleepless nights', delay: 2.5, size: '0.85rem', opacity: 0.45 },
  { text: '11,482 lines of code', delay: 3.1, size: '0.85rem', opacity: 0.45 },
  { text: 'Fueled by caffeine and existential dread', delay: 3.7, size: '0.85rem', opacity: 0.45 },
  { text: '———', delay: 4.4, size: '1rem', opacity: 0.3 },
  { text: 'STIMULATION ENGINE', delay: 5.0, size: '3rem', opacity: 1, font: 'bebas', glow: true },
]

export default function IntroScreen() {
  const setPhase = useGameStore((s) => s.setPhase)
  const [showSkip, setShowSkip] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 1500)
    const doneTimer = setTimeout(() => {
      setDone(true)
      setTimeout(() => setPhase('menu'), 1200)
    }, 7500)
    return () => {
      clearTimeout(skipTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  const skip = () => {
    setDone(true)
    setTimeout(() => setPhase('menu'), 600)
  }

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="intro"
          style={{
            position: 'fixed', inset: 0,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
            gap: '12px',
            fontFamily: "'Space Mono', monospace",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {CREDITS.map((credit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: credit.opacity, y: 0 }}
              transition={{ delay: credit.delay, duration: 0.9, ease: 'easeOut' }}
              style={{
                color: '#fff',
                fontSize: credit.size,
                fontFamily: credit.font === 'bebas' ? "'Bebas Neue', cursive" : "'Space Mono', monospace",
                letterSpacing: credit.font === 'bebas' ? '0.08em' : '0.15em',
                textAlign: 'center',
                textShadow: credit.glow ? '0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.2)' : 'none',
              }}
            >
              {credit.text}
            </motion.div>
          ))}

          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                whileHover={{ opacity: 1 }}
                onClick={skip}
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  right: '32px',
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                }}
              >
                SKIP →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
