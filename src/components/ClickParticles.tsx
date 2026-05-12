import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

interface ParticleProps {
  id: number
  x: number
  y: number
  hasLight: boolean
}

function Particle({ id, x, y, hasLight }: ParticleProps) {
  const removeParticle = useGameStore((s) => s.removeParticle)

  useEffect(() => {
    const t = setTimeout(() => removeParticle(id), 700)
    return () => clearTimeout(t)
  }, [])

  const colors = hasLight
    ? ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bb5', '#fff']
    : ['#fff', '#ccc', '#aaa']

  const color = colors[Math.floor(Math.random() * colors.length)]
  const angle = Math.random() * 360
  const dist = 30 + Math.random() * 60
  const dx = Math.cos((angle * Math.PI) / 180) * dist
  const dy = Math.sin((angle * Math.PI) / 180) * dist - 20

  return (
    <motion.div
      initial={{ x, y, opacity: 1, scale: 1 }}
      animate={{ x: x + dx, y: y + dy, opacity: 0, scale: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: 9999,
        top: 0, left: 0,
        marginLeft: '-3px',
        marginTop: '-3px',
        boxShadow: hasLight ? `0 0 6px ${color}` : 'none',
      }}
    />
  )
}

export default function ClickParticles() {
  const particles = useGameStore((s) => s.particles)
  const hasLight = useGameStore((s) => s.hasLight)

  return (
    <>
      {particles.slice(-30).map((p) => (
        <Particle key={p.id} id={p.id} x={p.x} y={p.y} hasLight={hasLight} />
      ))}
    </>
  )
}
