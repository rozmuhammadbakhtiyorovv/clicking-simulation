import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function SoundToggle() {
  const mode = useGameStore((s) => s.soundMode)
  const setMode = useGameStore((s) => s.setSoundMode)

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-end'
    }}>
      <div style={{ fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em' }}>SOUND MODE</div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          onClick={() => setMode('max_dopamine')}
          style={{
            padding: '6px 12px',
            background: mode === 'max_dopamine' ? '#4facfe' : '#222',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontFamily: "'Space Mono', monospace"
          }}
        >
          MAX DOPAMINE (x1.2)
        </button>
        <button
          onClick={() => setMode('muted_sadness')}
          style={{
            padding: '6px 12px',
            background: mode === 'muted_sadness' ? '#ff0844' : '#222',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontFamily: "'Space Mono', monospace"
          }}
        >
          MUTED SADNESS (x0.5)
        </button>
      </div>
    </div>
  )
}
