import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function TicTacToe() {
  const activeSystems = useGameStore((s) => s.activeChaosSystems)
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [pos, setPos] = useState({ x: 100, y: 150 })

  if (!activeSystems.includes('tic_tac_toe')) return null

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return squares.every(s => s) ? 'Draw' : null
  }

  const handleClick = (i: number) => {
    if (winner || board[i]) return
    const newBoard = [...board]
    newBoard[i] = 'X'
    setBoard(newBoard)
    setIsXNext(false)
    const win = calculateWinner(newBoard)
    if (win) setWinner(win)
  }

  // Basic AI move
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board.map((s, i) => s === null ? i : null).filter(i => i !== null) as number[]
        if (emptyIndices.length > 0) {
          const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
          const newBoard = [...board]
          newBoard[move] = 'O'
          setBoard(newBoard)
          setIsXNext(true)
          const win = calculateWinner(newBoard)
          if (win) setWinner(win)
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isXNext, winner, board])

  const reset = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: '220px',
        background: 'rgba(15, 15, 20, 0.95)',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '12px',
        zIndex: 400,
        fontFamily: "'Space Mono', monospace",
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.6rem', color: '#888' }}>TIC TAC TOE</span>
        <button onClick={reset} style={{ background: 'none', border: 'none', color: '#4facfe', fontSize: '0.6rem', cursor: 'pointer' }}>RESET</button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '4px',
        background: '#333',
        padding: '4px',
        borderRadius: '4px'
      }}>
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              height: '50px',
              background: '#15151a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: cell === 'X' ? '#4facfe' : '#ff0844',
              cursor: winner || cell ? 'default' : 'pointer'
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div style={{ 
          marginTop: '10px', 
          textAlign: 'center', 
          fontSize: '0.8rem', 
          color: winner === 'X' ? '#4facfe' : winner === 'O' ? '#ff0844' : '#fff' 
        }}>
          {winner === 'Draw' ? "IT'S A DRAW" : winner === 'X' ? 'YOU WIN!' : 'AI WINS'}
        </div>
      )}
    </motion.div>
  )
}
