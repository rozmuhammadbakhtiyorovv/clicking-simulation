import { AnimatePresence } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import IntroScreen from './components/IntroScreen'
import MenuScreen from './components/MenuScreen'
import GameScreen from './components/GameScreen'
import BackgroundMusic from './components/BackgroundMusic'
import './App.css'

export default function App() {
  const phase = useGameStore((s) => s.phase)
  const startMusic = useGameStore((s) => s.startMusic)
  const musicStarted = useGameStore((s) => s.musicStarted)
  const cursorStyle = useGameStore((s) => s.cursorStyle)

  const handleFirstClick = () => {
    if (!musicStarted) startMusic()
  }

  const getCursor = () => {
    if (phase !== 'playing') return 'default'
    if (cursorStyle === 'gold') return 'url("https://cur.cursors-4u.net/games/gam-4/gam373.cur"), auto'
    if (cursorStyle === 'neon') return 'crosshair'
    return 'pointer'
  }

  return (
    <div 
      onClick={handleFirstClick}
      style={{ 
        width: '100vw', height: '100vh', 
        overflow: 'hidden', background: '#000',
        cursor: getCursor()
      }}
    >
      <AnimatePresence mode="wait">
        {phase === 'intro' && <IntroScreen key="intro" />}
        {phase === 'menu' && <MenuScreen key="menu" />}
        {phase === 'playing' && <GameScreen key="playing" />}
      </AnimatePresence>
      <BackgroundMusic />
    </div>
  )
}
