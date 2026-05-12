import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useState } from 'react'

export default function RequestLetter() {
  const shopItems = useGameStore((s) => s.shopItems)
  const isPurchased = shopItems.find(i => i.id === 'tic_tac_toe')?.purchased // Unlocked around here
  const [minimized, setMinimized] = useState(false)

  // We only show it if the user has reached a certain point or we can add a specific id for it
  // For now I'll just check if legend items are unlocked
  const show = shopItems.find(i => i.id === 'legend_oripov')?.locked === false

  if (!show) return null

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        position: 'fixed',
        right: '10%',
        bottom: '15%',
        width: '300px',
        background: '#fff9e6',
        color: '#222',
        padding: '20px',
        fontFamily: "'Space Mono', monospace",
        boxShadow: '0 10px 30px rgba(0,0,0,0.3), 5px 5px 0 #d4c4a8',
        zIndex: 350,
        borderRadius: '2px',
        border: '1px solid #d4c4a8',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '5px' }}>
        <span style={{ fontSize: '0.6rem', color: '#999' }}>STATIONARY — URGENT</span>
        <button onClick={() => setMinimized(!minimized)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>_</button>
      </div>
      
      {!minimized && (
        <>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '15px' }}>
            Dear Streamer,
          </div>
          <div style={{ fontSize: '0.75rem', lineHeight: 1.6 }}>
            Please make a video where you are playing <span style={{ textDecoration: 'underline' }}>Creepy Tale</span>. 
            The fans are waiting. The stimulation must continue.
            <br /><br />
            Best regards,<br />
            Rozmuhammad Baxtiyorov
          </div>
          <div style={{ marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '10px', fontSize: '0.6rem', color: '#888', fontStyle: 'italic' }}>
            Hand-delivered via the Void.
          </div>
        </>
      )}
    </motion.div>
  )
}
