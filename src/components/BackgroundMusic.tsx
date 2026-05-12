import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../store/gameStore'

const PLAYLIST = [
  '/sounds/Beethoven - Moonlight Sonata (FULL).mp3',
  '/sounds/Camille Saint-Saëns - Danse Macabre.mp3',
  '/sounds/Erik Satie - Gymnopédie No.1.mp3'
]

export default function BackgroundMusic() {
  const musicStarted = useGameStore((s) => s.musicStarted)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(PLAYLIST[currentTrackIndex])
    audio.volume = 0.4
    audioRef.current = audio

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length)
    }

    audio.addEventListener('ended', handleEnded)

    if (musicStarted) {
      audio.play().catch((err) => console.warn('Audio play failed:', err))
    }

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audio.src = ''
    }
  }, [currentTrackIndex, musicStarted])

  return null
}
