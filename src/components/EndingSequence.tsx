import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function EndingSequence() {
  const gameEnded = useGameStore(s => s.gameEnded)
  const [step, setStep] = useState('cub') // 'cub' | 'name' | 'note'
  const [name, setName] = useState('')
  const setPlayerName = useGameStore(s => s.setPlayerName)
  
  useEffect(() => {
    if (gameEnded) {
      const audio = new Audio('/sounds/winning_song.mp3')
      audio.volume = 0.8
      audio.play().catch(e => console.error(e))
    }
  }, [gameEnded])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setPlayerName(name)
      setStep('note')
    }
  }

  if (!gameEnded) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 5000,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: "'Space Mono', monospace"
    }}>
      <AnimatePresence mode="wait">
        {step === 'cub' && (
          <motion.div
            key="cub"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 2 }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ['drop-shadow(0 0 10px #FFD700)', 'drop-shadow(0 0 50px #FFD700)', 'drop-shadow(0 0 10px #FFD700)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '12rem', marginBottom: '40px' }}
            >
              🏆
            </motion.div>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '4rem', letterSpacing: '0.2em', color: '#FFD700' }}>THE GOLDEN CUB</h1>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setStep('name')}
              style={{
                marginTop: '40px',
                padding: '15px 40px',
                background: '#FFD700',
                color: '#000',
                border: 'none',
                borderRadius: '2px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '1rem',
                letterSpacing: '0.1em'
              }}
            >
              CLAIM YOUR REWARD
            </motion.button>
          </motion.div>
        )}

        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', letterSpacing: '0.1em' }}>ENTER YOUR NAME, STREAMER</h2>
            <form onSubmit={handleNameSubmit}>
              <input
                autoFocus
                type="text"
                placeholder="YOUR NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: '2px solid #FFD700',
                  color: '#FFD700',
                  fontSize: '2.5rem',
                  textAlign: 'center',
                  outline: 'none',
                  width: '400px',
                  marginBottom: '40px',
                  fontFamily: "'Bebas Neue', cursive"
                }}
              />
              <br />
              <button
                type="submit"
                style={{
                  padding: '12px 30px',
                  background: '#FFD700',
                  color: '#000',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'inherit'
                }}
              >
                UNVEIL THE MESSAGE
              </button>
            </form>
          </motion.div>
        )}

        {step === 'note' && (
          <motion.div
            key="note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            style={{ 
              maxWidth: '800px', 
              textAlign: 'left', 
              lineHeight: 1.6,
              padding: '60px',
              border: '1px solid rgba(255,215,0,0.2)',
              background: 'rgba(10,10,10,0.8)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ marginBottom: '30px', fontSize: '1.2rem', fontWeight: 'bold', color: '#FFD700' }}>
              Dear {name},
            </div>
            
            <div style={{ fontSize: '0.95rem', color: '#ddd', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>I hope this message finds you well.</p>
              
              <p>
                I am a big fan of your content and really enjoy your videos. I would like to kindly request if you could consider playing and making a video about the game series <strong>Creepy Tale</strong>, including Creepy Tale 1, 2, and 3.
              </p>
              
              <p>
                Also, I would like to sincerely thank you for playing my game. It was a demo version, and I really appreciate that you took the time to try it and share it with your audience.
              </p>
              
              <p>
                I believe your viewers would really enjoy your unique reactions and storytelling style while playing these games. The series has an interesting and dark fairytale atmosphere that fits your content very well.
              </p>
              
              <p>Thank you very much for your time and for the amazing videos you create. I hope you will consider this suggestion.</p>
              
              <div style={{ marginTop: '20px' }}>
                Best regards,<br />
                <span style={{ color: '#FFD700', fontWeight: 'bold' }}>Rozmuhammad Baxtiyorov</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div style={{ 
              marginTop: '50px', 
              paddingTop: '20px', 
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em' }}>SOFTWARE ENGINEER SOCIALS</div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="https://t.me/rozmuhammad_bakhtiyorov" target="_blank" rel="noreferrer" style={{ color: '#4facfe', fontSize: '0.75rem', textDecoration: 'none' }}>
                  TELEGRAM
                </a>
                <a href="https://www.instagram.com/rozmuhammad1223/" target="_blank" rel="noreferrer" style={{ color: '#e1306c', fontSize: '0.75rem', textDecoration: 'none' }}>
                  INSTAGRAM
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6 }}
              style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '0.5rem', color: '#333' }}
            >
              F5 TO RESET
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
