import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useEffect, useState } from 'react'

export default function DayNightCycle() {
  const isDay = useGameStore((s) => s.isDay)
  const hasDayNight = useGameStore((s) => s.hasDayNight)
  
  if (!hasDayNight) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
        transition: 'background 5s ease-in-out',
        background: isDay 
          ? 'linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%)' 
          : 'linear-gradient(to bottom, #0B1026 0%, #1B2735 100%)'
      }}
    >
      <AnimatePresence mode="wait">
        {isDay ? <DayElements key="day" /> : <NightElements key="night" />}
      </AnimatePresence>
    </motion.div>
  )
}

function DayElements() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {/* Hand-drawn Sun */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '120px',
          height: '120px',
        }}
      >
        <svg viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 20px #FFD700)' }}>
          <circle cx="50" cy="50" r="30" fill="#FFD700" stroke="#FFA500" strokeWidth="2" strokeDasharray="4 2" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="50" y1="10" x2="50" y2="0"
              transform={`rotate(${i * 30} 50 50)`}
              stroke="#FFD700" strokeWidth="4" strokeLinecap="round"
            />
          ))}
        </svg>
      </motion.div>

      {/* Clouds */}
      <Cloud delay={0} top="20%" left="-10%" />
      <Cloud delay={5} top="15%" left="-20%" />
      <Cloud delay={2} top="30%" left="-15%" />
    </motion.div>
  )
}

function NightElements() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {/* Hand-drawn Moon */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          width: '100px',
          height: '100px',
        }}
      >
        <svg viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))' }}>
          <path 
            d="M50 20 A30 30 0 1 0 80 50 A22 22 0 1 1 50 20" 
            fill="#F0F0F0" 
            stroke="#DDD" 
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <Star key={i} />
      ))}

      {/* Shooting Stars */}
      <ShootingStar />
    </motion.div>
  )
}

function Cloud({ delay, top, left }: { delay: number, top: string, left: string }) {
  return (
    <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: '200vw' }}
      transition={{ duration: 40, repeat: Infinity, delay, ease: "linear" }}
      style={{ position: 'absolute', top, left, width: '150px', opacity: 0.8 }}
    >
      <svg viewBox="0 0 100 60">
        <path 
          d="M10 40 Q10 20 30 20 Q35 10 50 10 Q65 10 70 20 Q90 20 90 40 Q90 50 70 50 L30 50 Q10 50 10 40" 
          fill="white" 
          stroke="#eee" 
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  )
}

function Star() {
  const [pos] = useState({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5
  })

  return (
    <motion.div
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: pos.delay }}
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        width: pos.size,
        height: pos.size,
        background: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 5px white'
      }}
    />
  )
}

function ShootingStar() {
  const [key, setKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setKey(prev => prev + 1)
    }, 8000 + Math.random() * 10000)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key={key}
        initial={{ x: '110vw', y: '0vh', opacity: 1 }}
        animate={{ x: '-10vw', y: '50vh', opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          width: '100px',
          height: '2px',
          background: 'linear-gradient(to right, white, transparent)',
          transform: 'rotate(-25deg)',
          zIndex: 0
        }}
      />
    </AnimatePresence>
  )
}
