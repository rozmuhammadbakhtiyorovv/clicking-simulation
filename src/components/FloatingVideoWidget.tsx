import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import type { FloatingVideo } from '../store/gameStore'

interface Props {
  video: FloatingVideo
}

export default function FloatingVideoWidget({ video }: Props) {
  const [pos, setPos] = useState({ x: (window.innerWidth * video.x) / 100, y: (window.innerHeight * video.y) / 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const dragStart = useRef<{ mx: number; my: number; px: number; py: number } | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }

    const handleMove = (me: MouseEvent) => {
      if (!dragStart.current) return
      setPos({
        x: dragStart.current.px + (me.clientX - dragStart.current.mx),
        y: dragStart.current.py + (me.clientY - dragStart.current.my),
      })
    }
    const handleUp = () => {
      setIsDragging(false)
      dragStart.current = null
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 400,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          background: 'rgba(10,10,10,0.95)',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.65rem',
          color: '#888',
          letterSpacing: '0.1em',
        }}
      >
        <span>⠿ {video.title.toUpperCase()}</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ color: '#555', fontSize: '0.6rem' }}>+{video.autoClickRate}/s</span>
          <button
            onClick={() => setMinimized(!minimized)}
            style={{
              background: 'none', border: 'none', color: '#666',
              cursor: 'pointer', fontSize: '0.8rem', padding: '0 2px',
              fontFamily: 'monospace',
            }}
          >
            {minimized ? '□' : '—'}
          </button>
        </div>
      </div>

      {/* Video */}
      {!minimized && (
        <div style={{ position: 'relative', pointerEvents: isDragging ? 'none' : 'auto' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${video.youtubeId}&controls=1&modestbranding=1`}
            width={video.width}
            height={video.height}
            style={{ display: 'block', border: 'none' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
          {/* drag shield so dragging doesn't interfere with iframe */}
          {isDragging && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 10,
              cursor: 'grabbing',
            }} />
          )}
        </div>
      )}
    </motion.div>
  )
}
