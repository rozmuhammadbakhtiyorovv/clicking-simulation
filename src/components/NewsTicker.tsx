import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { FAKE_NEWS } from '../data/chaosData'

export default function NewsTicker() {
  const activeSystems = useGameStore((s) => s.activeChaosSystems)
  const [headline, setHeadline] = useState(FAKE_NEWS[0])

  useEffect(() => {
    if (!activeSystems.includes('ai_news')) return
    
    const interval = setInterval(() => {
      setHeadline(FAKE_NEWS[Math.floor(Math.random() * FAKE_NEWS.length)])
    }, 10000)

    return () => clearInterval(interval)
  }, [activeSystems])

  if (!activeSystems.includes('ai_news')) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '30px',
      background: '#ff0844',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      fontFamily: "'Space Mono', monospace",
      borderTop: '2px solid #fff'
    }}>
      <div style={{
        background: '#000',
        color: '#fff',
        padding: '0 15px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '0.7rem',
        zIndex: 2,
        boxShadow: '5px 0 10px rgba(0,0,0,0.5)'
      }}>
        BREAKING NEWS
      </div>
      
      <motion.div
        key={headline}
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        style={{
          whiteSpace: 'nowrap',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 500,
          paddingLeft: '20px'
        }}
      >
        {headline.toUpperCase()} — {headline.toUpperCase()} — {headline.toUpperCase()}
      </motion.div>
    </div>
  )
}
