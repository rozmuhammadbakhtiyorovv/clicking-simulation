import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function AttentionMeter() {
  const attention = useGameStore((s) => s.attentionMeter)
  const activeSystems = useGameStore((s) => s.activeChaosSystems)
  
  if (!activeSystems.includes('attention_meter')) return null

  const getColor = () => {
    if (attention > 60) return '#4facfe'
    if (attention > 30) return '#f6d365'
    return '#ff0844'
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '300px',
      zIndex: 100,
      fontFamily: "'Space Mono', monospace",
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '0.65rem', color: '#fff', letterSpacing: '0.2em' }}>ATTENTION SPAN</span>
        <span style={{ fontSize: '0.65rem', color: getColor() }}>{Math.ceil(attention)}%</span>
      </div>
      
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '3px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
      }}>
        <motion.div
          animate={{ 
            width: `${attention}%`,
            backgroundColor: getColor(),
            boxShadow: `0 0 15px ${getColor()}`
          }}
          transition={{ type: 'spring', damping: 20 }}
          style={{ height: '100%' }}
        />
      </div>

      {attention < 20 && (
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            fontSize: '0.6rem',
            color: '#ff0844',
            textAlign: 'center',
            marginTop: '8px',
            letterSpacing: '0.1em'
          }}
        >
          CRITICAL FOCUS DEPLETION
        </motion.div>
      )}
    </div>
  )
}
