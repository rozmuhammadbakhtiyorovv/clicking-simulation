import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

function MagneticButton({ btn, onClick }: { btn: any, onClick: (id: string) => void }) {
  const [posOffset, setPosOffset] = useState({ x: 0, y: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return
      const rect = btnRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 150) {
        // Magnetic effect: move toward or away
        const factor = btn.type === 'one_more' ? -20 : 10 // 'one_more' avoids, 'trust_me' attracts
        setPosOffset({
          x: (dx / dist) * factor,
          y: (dy / dist) * factor
        })
      } else {
        setPosOffset({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [btn.type])

  return (
    <motion.button
      ref={btnRef}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        x: posOffset.x,
        y: posOffset.y,
      }}
      onClick={() => onClick(btn.id)}
      style={{
        position: 'fixed',
        left: `${btn.x}%`,
        top: `${btn.y}%`,
        padding: '10px 20px',
        background: btn.type === 'one_more' ? '#4facfe' : '#ff0844',
        color: '#fff',
        border: '2px solid #fff',
        borderRadius: '4px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.8rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 600,
        boxShadow: '0 0 20px rgba(255,255,255,0.3)',
        transition: 'x 0.1s ease-out, y 0.1s ease-out'
      }}
    >
      {btn.type === 'one_more' ? 'JUST ONE MORE CLICK...' : 'TRUST ME, CLICK THIS'}
    </motion.button>
  )
}

export default function SpecialButtons() {
  const buttons = useGameStore((s) => s.specialButtons)
  const clickButton = useGameStore((s) => s.clickSpecialButton)

  return (
    <>
      {buttons.map((btn) => (
        <MagneticButton key={btn.id} btn={btn} onClick={clickButton} />
      ))}
    </>
  )
}
