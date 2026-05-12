import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import HUD from './HUD'
import ShopSidebar from './ShopSidebar'
import AchievementPopup from './AchievementPopup'
import FloatingVideoWidget from './FloatingVideoWidget'
import DayNightCycle from './DayNightCycle'
import ClickParticles from './ClickParticles'
import AttentionMeter from './AttentionMeter'
import NewsTicker from './NewsTicker'
import BrainRotGenerator from './BrainRotGenerator'
import RequestLetter from './RequestLetter'
import MysteryBox from './MysteryBox'
import SpecialButtons from './SpecialButtons'
import ComboDisplay from './ComboDisplay'
import LagOverlay from './LagOverlay'
import SoundToggle from './SoundToggle'
import DecisionPopup from './DecisionPopup'
import EndingSequence from './EndingSequence'

export function ColorfulBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      background: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #080808 100%)',
      overflow: 'hidden'
    }}>
      {/* Animated glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '40vw',
          height: '40vw',
          background: 'rgba(79, 172, 254, 0.2)',
          filter: 'blur(100px)',
          borderRadius: '50%'
        }}
      />
    </div>
  )
}

function FloatingPrompt() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#4facfe',
        fontFamily: "'Space Mono', monospace",
        textAlign: 'center',
        pointerEvents: 'none'
      }}
    >
      <div style={{ fontSize: '0.8rem', letterSpacing: '0.3em', marginBottom: '8px' }}>[ INITIATE CLICK SEQUENCE ]</div>
      <span style={{ fontSize: '0.55rem', opacity: 0.5 }}>ANYWHERE</span>
    </motion.div>
  )
}

export default function GameScreen() {
  const addClick = useGameStore((s) => s.addClick)
  const tick = useGameStore((s) => s.tick)
  const toggleDayNight = useGameStore((s) => s.toggleDayNight)
  const hasDayNight = useGameStore((s) => s.hasDayNight)
  const floatingVideos = useGameStore((s) => s.floatingVideos)
  const attention = useGameStore((s) => s.attentionMeter)
  const activeSystems = useGameStore((s) => s.activeChaosSystems)
  const combo = useGameStore((s) => s.combo)
  const lagActive = useGameStore((s) => s.lagActive)

  const tickRef = useRef(tick)
  tickRef.current = tick

  // Main game loop
  useEffect(() => {
    const interval = setInterval(() => tickRef.current(), 50)
    return () => clearInterval(interval)
  }, [])

  // Day/Night Timer
  useEffect(() => {
    if (!hasDayNight) return
    const interval = setInterval(() => {
      toggleDayNight()
    }, 50000)
    return () => clearInterval(interval)
  }, [hasDayNight, toggleDayNight])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('iframe') || target.closest('[data-no-click]')) return
    
    // Simulate lag if active
    if (lagActive) {
      setTimeout(() => addClick(e.clientX, e.clientY), 300)
    } else {
      addClick(e.clientX, e.clientY)
    }
  }, [addClick, lagActive])

  const getScreenShake = () => {
    if (combo >= 30) return [0, -5, 5, -5, 5, 0]
    return 0
  }

  return (
    <motion.div
      animate={{ 
        opacity: 1,
        x: getScreenShake(),
        filter: combo >= 30 ? 'contrast(1.5) brightness(1.2)' : 'none'
      }}
      whileTap={{ scale: 0.995, transition: { duration: 0.05 } }}
      transition={{ duration: 1.5 }}
      onClick={handleClick}
      style={{
        position: 'fixed', inset: 0,
        background: '#000',
        cursor: 'none', // We'll use a custom cursor
        zIndex: 0,
        overflow: 'hidden',
        filter: attention === 0 ? 'contrast(2) brightness(0.5) hue-rotate(90deg) blur(1px)' : 'none',
        transition: 'filter 0.5s ease-in-out'
      }}
    >
      <ColorfulBackground />
      <DayNightCycle />
      
      {/* Core Chaos Components */}
      <MysteryBox />
      <SpecialButtons />
      <ComboDisplay />
      <LagOverlay />
      <SoundToggle />
      <DecisionPopup />
      <EndingSequence />
      <BrainRotGenerator />
      <NewsTicker />
      <RequestLetter />

      {/* Multiplier Display */}
      {activeSystems.includes('overload_system') && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            position: 'fixed',
            top: '80px',
            left: '24px',
            fontFamily: "'Bebas Neue', cursive",
            fontSize: '2rem',
            color: '#ff0844',
            zIndex: 100
          }}
        >
          {combo >= 30 ? 'HYPER COMBO' : 'STIMULATION ACTIVE'}
        </motion.div>
      )}

      {/* Floating videos */}
      {floatingVideos.map((v) => (
        <FloatingVideoWidget key={v.id} video={v} />
      ))}

      {/* HUD & UI */}
      <HUD />
      <AttentionMeter />
      <ShopSidebar />
      <ClickParticles />
      <AchievementPopup />
      
      {attention === 100 && activeSystems.length === 0 && <FloatingPrompt />}

      {/* Custom Cursor Layer */}
      <CustomCursor />
    </motion.div>
  )
}

function CustomCursor() {
  const cursorStyle = useGameStore(s => s.cursorStyle)
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = document.getElementById('custom-cursor')
      if (el) {
        el.style.left = e.clientX + 'px'
        el.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      id="custom-cursor"
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        pointerEvents: 'none',
        zIndex: 9999,
        marginLeft: '-10px',
        marginTop: '-10px',
        transition: 'transform 0.1s ease-out',
        mixBlendMode: 'difference'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        background: cursorStyle === 'gold' ? '#FFD700' : '#fff',
        borderRadius: '50%',
        boxShadow: cursorStyle === 'gold' ? '0 0 15px #FFD700' : 'none'
      }} />
      {cursorStyle === 'overloaded' && (
         <motion.div
           animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
           transition={{ duration: 0.5, repeat: Infinity }}
           style={{
             position: 'absolute', inset: -10, border: '2px solid #ff0844', borderRadius: '50%'
           }}
         />
      )}
    </div>
  )
}
