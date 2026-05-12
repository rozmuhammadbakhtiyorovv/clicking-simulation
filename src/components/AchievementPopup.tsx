import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function AchievementPopup() {
  const pendingAchievement = useGameStore((s) => s.pendingAchievement)
  const dismissAchievement = useGameStore((s) => s.dismissAchievement)
  const purchaseItem = useGameStore((s) => s.purchaseItem)
  const clicks = useGameStore((s) => s.clicks)
  const shopUnlocked = useGameStore((s) => s.shopUnlocked)

  const handlePurchaseShop = () => {
    purchaseItem('shop_unlock')
    dismissAchievement()
  }

  const canAfford = clicks >= 10

  return (
    <AnimatePresence>
      {pendingAchievement && (
        <motion.div
          initial={{ y: -120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -120, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9000,
            background: 'rgba(10, 10, 10, 0.97)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '4px',
            padding: '20px 28px',
            minWidth: '340px',
            maxWidth: '420px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
            fontFamily: "'Space Mono', monospace",
          }}
        >
          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: '#888',
            marginBottom: '8px',
          }}>
            ⚡ ACHIEVEMENT UNLOCKED
          </div>

          <div style={{
            fontSize: '1.1rem',
            color: '#fff',
            fontWeight: 700,
            marginBottom: '8px',
            letterSpacing: '0.02em',
          }}>
            {pendingAchievement.title}
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: '#aaa',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}>
            {pendingAchievement.description}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {!shopUnlocked && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchaseShop}
                disabled={!canAfford}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: canAfford ? '#fff' : '#222',
                  color: canAfford ? '#000' : '#555',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: canAfford ? 'pointer' : 'not-allowed',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                }}
              >
                PURCHASE SHOP — 10 clicks
              </motion.button>
            )}
            <button
              onClick={dismissAchievement}
              style={{
                padding: '10px 16px',
                background: 'transparent',
                color: '#555',
                border: '1px solid #333',
                borderRadius: '2px',
                cursor: 'pointer',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
              }}
            >
              LATER
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
