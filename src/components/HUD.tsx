import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function HUD() {
  const clicks = useGameStore((s) => s.clicks)
  const totalClicks = useGameStore((s) => s.totalClicks)
  const autoClickRate = useGameStore((s) => s.autoClickRate)
  const shopUnlocked = useGameStore((s) => s.shopUnlocked)
  const toggleSidebar = useGameStore((s) => s.toggleSidebar)
  const sidebarOpen = useGameStore((s) => s.sidebarOpen)
  const hasLight = useGameStore((s) => s.hasLight)

  return (
    <>
      {/* Top right counter */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '24px',
        fontFamily: "'Space Mono', monospace",
        textAlign: 'right',
        zIndex: 300,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: hasLight ? '#fff' : 'rgba(255,255,255,0.9)',
          fontFamily: "'Bebas Neue', cursive",
          letterSpacing: '0.04em',
          textShadow: hasLight ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
          lineHeight: 1,
        }}>
          {Math.floor(clicks).toLocaleString()}
        </div>
        <div style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.2em', marginTop: '2px' }}>
          CLICKS
        </div>
        {autoClickRate > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '0.15em', marginTop: '4px' }}
          >
            +{autoClickRate}/sec AUTO
          </motion.div>
        )}
      </div>

      {/* Bottom purchase tab */}
      <AnimatePresence>
        {shopUnlocked && (
          <motion.button
            key="shop-tab"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: sidebarOpen ? '324px' : '24px',
              transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'rgba(10,10,10,0.97)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              padding: '12px 20px',
              cursor: 'pointer',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              zIndex: 600,
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            <span>{sidebarOpen ? '◀' : '▶'}</span>
            UPGRADES
          </motion.button>
        )}
      </AnimatePresence>

      {/* Total clicks small display */}
      {totalClicks > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '28px',
          right: '24px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6rem',
          color: '#333',
          letterSpacing: '0.15em',
          zIndex: 300,
          pointerEvents: 'none',
        }}>
          {Math.floor(totalClicks).toLocaleString()} TOTAL
        </div>
      )}
    </>
  )
}
