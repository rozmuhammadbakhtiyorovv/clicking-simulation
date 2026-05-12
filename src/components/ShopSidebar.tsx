import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function ShopSidebar() {
  const sidebarOpen = useGameStore((s) => s.sidebarOpen)
  const shopItems = useGameStore((s) => s.shopItems)
  const clicks = useGameStore((s) => s.clicks)
  const purchaseItem = useGameStore((s) => s.purchaseItem)
  const toggleSidebar = useGameStore((s) => s.toggleSidebar)
  const shopUnlocked = useGameStore((s) => s.shopUnlocked)

  const visibleItems = shopItems.filter((i) => i.id !== 'shop_unlock')

  return (
    <AnimatePresence>
      {shopUnlocked && sidebarOpen && (
        <motion.div
          key="sidebar"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          style={{
            position: 'fixed',
            left: 0, top: 0, bottom: 0,
            width: '300px',
            background: 'rgba(8, 8, 8, 0.97)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Space Mono', monospace",
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '0.6rem', color: '#555', letterSpacing: '0.25em', marginBottom: '4px' }}>
                UPGRADE TERMINAL
              </div>
              <div style={{ fontSize: '1.2rem', color: '#fff', fontFamily: "'Bebas Neue', cursive", letterSpacing: '0.05em' }}>
                THE SHOP
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              style={{
                background: 'none', border: '1px solid #333', color: '#666',
                width: '32px', height: '32px', cursor: 'pointer',
                borderRadius: '2px', fontSize: '1rem', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Balance */}
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.2em' }}>BALANCE</span>
              <span style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
                {Math.floor(clicks).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {visibleItems.map((item) => {
              const canAfford = clicks >= item.cost && !item.purchased && !item.locked
              const isLocked = item.locked

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isLocked ? 0.35 : 1, x: 0 }}
                  style={{
                    padding: '10px 14px',
                    marginBottom: '6px',
                    border: `1px solid ${item.purchased ? 'rgba(255,255,255,0.15)' : isLocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '3px',
                    background: item.purchased ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {item.purchased && (
                    <div style={{
                      position: 'absolute', top: '8px', right: '8px',
                      fontSize: '0.6rem', color: '#555', letterSpacing: '0.15em',
                    }}>
                      ✓ OWNED
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.85rem', color: isLocked ? '#444' : '#ddd',
                        fontWeight: 700, marginBottom: '2px', letterSpacing: '0.03em',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}>
                        <span>{isLocked ? '🔒 LOCKED' : item.name}</span>
                        {!isLocked && (
                          <span style={{ fontSize: '0.7rem', color: '#888' }}>
                            {item.cost.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {!isLocked && (
                        <div style={{
                          fontSize: '0.72rem', color: '#888', lineHeight: 1.5,
                          marginBottom: '10px',
                        }}>
                          {item.description}
                        </div>
                      )}

                      {/* Animated Card Preview for Day/Night Cycle */}
                      {item.id === 'day_night_cycle' && !isLocked && !item.purchased && (
                        <div style={{
                          width: '100%', height: '80px', background: '#1a1a2e',
                          borderRadius: '4px', marginBottom: '12px', overflow: 'hidden',
                          position: 'relative', border: '1px solid #333'
                        }}>
                          <div style={{
                            position: 'absolute', inset: 0, 
                            background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                            opacity: 0.2
                          }} />
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', background: '#FFD700', borderRadius: '50%' }}
                          />
                          <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.6rem', color: '#fff', opacity: 0.6 }}>DRAWN STYLE PREVIEW</div>
                        </div>
                      )}

                      {item.autoClickRate && !isLocked && (
                        <div style={{
                          fontSize: '0.65rem', color: '#aaa', marginBottom: '10px',
                        }}>
                          +{item.autoClickRate} clicks/sec
                        </div>
                      )}

                      {!item.purchased && !isLocked && (
                        <motion.button
                          whileHover={canAfford ? { scale: 1.02 } : {}}
                          whileTap={canAfford ? { scale: 0.97 } : {}}
                          onClick={() => canAfford && purchaseItem(item.id)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: canAfford ? '#fff' : 'rgba(255,255,255,0.05)',
                            color: canAfford ? '#000' : '#444',
                            border: canAfford ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '2px',
                            cursor: canAfford ? 'pointer' : 'not-allowed',
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                          }}
                        >
                          {canAfford ? `BUY — ${item.cost.toLocaleString()} CLICKS` : `${item.cost.toLocaleString()} CLICKS NEEDED`}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
