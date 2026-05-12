import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function DecisionPopup() {
  const [active, setActive] = useState(false)
  const addClick = useGameStore(s => s.addClick)
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.005) setActive(true)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleChoice = (type: string) => {
    if (type === 'dopamine') {
      // Logic for double dopamine would go here, for now just a reward
      for(let i=0; i<10; i++) addClick(window.innerWidth/2, window.innerHeight/2)
    }
    setActive(false)
  }

  return (
    <AnimatePresence>
      {active && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '400px',
              background: '#111',
              border: '2px solid #4facfe',
              padding: '30px',
              textAlign: 'center',
              fontFamily: "'Space Mono', monospace"
            }}
          >
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>URGENT DECISION REQUIRED</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handleChoice('quit')}
                style={{ padding: '15px', background: '#222', color: '#666', border: '1px solid #333', cursor: 'not-allowed' }}
              >
                QUIT GAME FOREVER (NOT RECOMMENDED)
              </button>
              <button
                onClick={() => handleChoice('dopamine')}
                style={{ padding: '15px', background: '#4facfe', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
              >
                DOUBLE DOPAMINE FOR 10 SECONDS
              </button>
              <button
                onClick={() => handleChoice('ignore')}
                style={{ padding: '15px', background: 'none', color: '#888', border: '1px solid #444', cursor: 'pointer' }}
              >
                IGNORE THIS POPUP
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
