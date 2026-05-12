import { create } from 'zustand'

export type GamePhase = 'intro' | 'menu' | 'playing'

export interface ShopItem {
  id: string
  name: string
  description: string
  cost: number
  purchased: boolean
  locked: boolean
  autoClickRate?: number // clicks per second added
  emoji: string
  unlocks?: string[] // item ids this unlocks
}

export interface Achievement {
  id: string
  title: string
  description: string
  shown: boolean
}

export interface FloatingVideo {
  id: string
  youtubeId: string
  title: string
  x: number
  y: number
  width: number
  height: number
  autoClickRate: number
}

export interface ClickParticle {
  id: number
  x: number
  y: number
}

interface GameState {
  phase: GamePhase
  clicks: number
  totalClicks: number
  autoClickRate: number
  hasLight: boolean
  shopUnlocked: boolean
  sidebarOpen: boolean
  shopItems: ShopItem[]
  achievements: Achievement[]
  pendingAchievement: Achievement | null
  particles: ClickParticle[]
  particleCounter: number
  floatingVideos: FloatingVideo[]
  musicStarted: boolean
  isDay: boolean
  hasDayNight: boolean
  attentionMeter: number
  combo: number
  comboMultiplier: number
  soundMode: 'max_dopamine' | 'muted_sadness'
  specialButtons: { id: string; type: 'one_more' | 'trust_me'; x: number; y: number }[]
  mysteryBox: { x: number; y: number; active: boolean } | null
  lagActive: boolean
  cursorStyle: 'default' | 'gold' | 'neon' | 'crosshair' | 'overloaded'
  activeChaosSystems: string[]
  newsHeadline: string
  
  // Ending state
  gameEnded: boolean
  playerName: string

  // Actions
  setPhase: (phase: GamePhase) => void
  addClick: (x: number, y: number) => void
  unlockShop: () => void
  toggleSidebar: () => void
  purchaseItem: (id: string) => void
  dismissAchievement: () => void
  removeParticle: (id: number) => void
  tick: () => void
  startMusic: () => void
  toggleDayNight: () => void
  setCursorStyle: (style: 'default' | 'gold' | 'neon' | 'crosshair' | 'overloaded') => void
  updateAttention: (delta: number) => void
  setSoundMode: (mode: 'max_dopamine' | 'muted_sadness') => void
  spawnSpecialButton: (type: 'one_more' | 'trust_me') => void
  clickSpecialButton: (id: string) => void
  spawnMysteryBox: () => void
  clickMysteryBox: () => void
  triggerLag: (duration: number) => void
  addAchievement: (title: string, desc: string) => void
  setPlayerName: (name: string) => void
}

const INITIAL_ITEMS: ShopItem[] = [
  // SECTION 1: BASIC CONTENT
  {
    id: 'day_night_cycle',
    name: 'Day & Night Cycle',
    description: 'A hand-drawn sky that cycles every 50 seconds.',
    cost: 50,
    purchased: false,
    locked: false,
    emoji: '🌞',
    unlocks: ['subway_surfers'],
  },
  {
    id: 'subway_surfers',
    name: 'Subway Surfers',
    description: 'Tiny endless gameplay in corner. +5 clicks/sec',
    cost: 500,
    purchased: false,
    locked: true,
    autoClickRate: 5,
    emoji: '🏃',
    unlocks: ['family_guy'],
  },
  {
    id: 'family_guy',
    name: 'Family Guy Clips',
    description: 'Random funny clips materializing. +15 clicks/sec',
    cost: 2500,
    purchased: false,
    locked: true,
    autoClickRate: 15,
    emoji: '📺',
    unlocks: ['slime_asmr'],
  },
  {
    id: 'slime_asmr',
    name: 'Slime ASMR',
    description: 'Crunchy slime stretching sounds. +40 clicks/sec',
    cost: 10000,
    purchased: false,
    locked: true,
    autoClickRate: 40,
    emoji: '🫧',
    unlocks: ['lofi_beats'],
  },
  {
    id: 'lofi_beats',
    name: 'Lofi Beats',
    description: 'Calm music for "focus". +100 clicks/sec',
    cost: 35000,
    purchased: false,
    locked: true,
    autoClickRate: 100,
    emoji: '🎧',
    unlocks: ['tiktok_feed'],
  },
  {
    id: 'tiktok_feed',
    name: 'TikTok Feed',
    description: 'Infinite vertical scrolling chaos. +250 clicks/sec',
    cost: 100000,
    purchased: false,
    locked: true,
    autoClickRate: 250,
    emoji: '📱',
    unlocks: ['stock_panic'],
  },
  {
    id: 'stock_panic',
    name: 'Stock Market Panic',
    description: 'Fake crypto prices flashing. +500 clicks/sec',
    cost: 250000,
    purchased: false,
    locked: true,
    autoClickRate: 500,
    emoji: '📉',
    unlocks: ['notification_flood', 'mystery_box'],
  },

  // SECTION 2: CHAOS SYSTEMS
  {
    id: 'mystery_box',
    name: 'Mystery Box Spawner',
    description: 'Enables random rewarding gift boxes.',
    cost: 500000,
    purchased: false,
    locked: true,
    emoji: '🎁',
  },
  {
    id: 'notification_flood',
    name: 'Notification Flood',
    description: 'Every click generates fake alerts. Multiplier x2',
    cost: 1000000,
    purchased: false,
    locked: true,
    emoji: '🔔',
    unlocks: ['attention_meter'],
  },
  {
    id: 'attention_meter',
    name: 'Attention Span Meter',
    description: 'A decreasing bar. Don\'t let it hit zero! Multiplier x2',
    cost: 5000000,
    purchased: false,
    locked: true,
    emoji: '📊',
    unlocks: ['brain_rot_gen'],
  },
  {
    id: 'brain_rot_gen',
    name: 'Brain Rot Generator',
    description: 'Procedural nonsense generator. Multiplier x2',
    cost: 15000000,
    purchased: false,
    locked: true,
    emoji: '🧠',
    unlocks: ['chaos_buttons', 'ai_news'],
  },
  {
    id: 'ai_news',
    name: 'AI Generated News',
    description: 'Fake breaking news ticker. +1000 clicks/sec',
    cost: 25000000,
    purchased: false,
    locked: true,
    autoClickRate: 1000,
    emoji: '🗞️',
  },
  {
    id: 'chaos_buttons',
    name: 'Chaos Buttons',
    description: 'Unlocks "One More Click" and "Trust Me" popups.',
    cost: 50000000,
    purchased: false,
    locked: true,
    emoji: '🔘',
    unlocks: ['overload_system', 'keyboard_smash'],
  },
  {
    id: 'keyboard_smash',
    name: 'Keyboard Smash',
    description: 'Loud typing noises on every click. +2500 clicks/sec',
    cost: 75000000,
    purchased: false,
    locked: true,
    autoClickRate: 2500,
    emoji: '⌨️',
  },
  {
    id: 'overload_system',
    name: 'Overload Combo System',
    description: 'Massive multiplier for active systems.',
    cost: 150000000,
    purchased: false,
    locked: true,
    emoji: '⚡',
    unlocks: ['minecraft_parkour'],
  },

  // SECTION 3: STORY & LEGENDS
  {
    id: 'minecraft_parkour',
    name: 'Minecraft Parkour',
    description: 'AI voice reading Reddit stories. +10000 clicks/sec',
    cost: 500000000,
    purchased: false,
    locked: true,
    autoClickRate: 10000,
    emoji: '⛏️',
    unlocks: ['legend_kuplinov'],
  },
  {
    id: 'legend_kuplinov',
    name: 'LEGEND: Kuplinov',
    description: 'Creepy Tale play-through. +50000 clicks/sec',
    cost: 2500000000,
    purchased: false,
    locked: true,
    autoClickRate: 50000,
    emoji: '👹',
    unlocks: ['legend_oripov'],
  },
  {
    id: 'legend_oripov',
    name: 'LEGEND: Oripov Play',
    description: 'The ultimate stimulation. +150000 clicks/sec',
    cost: 10000000000,
    purchased: false,
    locked: true,
    autoClickRate: 150000,
    emoji: '🎰',
    unlocks: ['golden_cub'],
  },
  {
    id: 'golden_cub',
    name: 'THE GOLDEN CUB',
    description: 'The final piece of the puzzle. End it all.',
    cost: 50000000000,
    purchased: false,
    locked: true,
    emoji: '🏆',
  },
]

const VIDEO_MAP: Record<string, { youtubeId: string; title: string; defaultSize: [number, number] }> = {
  subway_surfers: { youtubeId: 'f6Z0pM5937s', title: 'Subway Surfers', defaultSize: [180, 110] },
  family_guy: { youtubeId: 'mn-Tlb_wfjc', title: 'Family Guy', defaultSize: [210, 130] },
  slime_asmr: { youtubeId: '6nkxr6am7q8', title: 'Slime ASMR', defaultSize: [180, 110] },
  lofi_beats: { youtubeId: 'lTRiuFIWV54', title: 'Lofi Beats', defaultSize: [200, 120] },
  tiktok_feed: { youtubeId: 'lt1zVG2ySsw', title: 'TikTok Feed', defaultSize: [160, 280] },
  stock_panic: { youtubeId: 'EWr130cZxP4', title: 'Stock Panic', defaultSize: [240, 140] },
  minecraft_parkour: { youtubeId: 'UO2_xCnB_to', title: 'Minecraft Parkour', defaultSize: [200, 120] },
  legend_oripov: { youtubeId: '_RY4nsE6hfg', title: 'Oripov Play', defaultSize: [300, 170] },
  legend_kuplinov: { youtubeId: 'i16k_x7l8uk', title: 'Kuplinov Creepy', defaultSize: [300, 170] },
}

const VIDEO_POSITIONS = [
  { x: 80, y: 15 },
  { x: 55, y: 65 },
  { x: 70, y: 40 },
  { x: 30, y: 20 },
]
let videoPositionIndex = 0

const smashAudio = new Audio('https://www.soundjay.com/communication/typewriter-key-1.mp3')
smashAudio.volume = 0.3

let comboTimer: any = null

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'intro',
  clicks: 0,
  totalClicks: 0,
  autoClickRate: 0,
  hasLight: false,
  shopUnlocked: false,
  sidebarOpen: false,
  shopItems: INITIAL_ITEMS,
  achievements: [],
  pendingAchievement: null,
  floatingVideos: [],
  particles: [],
  particleCounter: 0,
  musicStarted: false,
  isDay: true,
  hasDayNight: false,
  attentionMeter: 100,
  combo: 0,
  comboMultiplier: 1,
  soundMode: 'max_dopamine',
  specialButtons: [],
  mysteryBox: null,
  lagActive: false,
  cursorStyle: 'default',
  activeChaosSystems: [],
  newsHeadline: 'SYSTEM INITIALIZED: CLICK TO START',
  gameEnded: false,
  playerName: '',

  setPhase: (phase) => set({ phase }),

  addClick: (x, y) => {
    const state = get()
    if (state.gameEnded) return

    // Unlock shop logic
    if (state.totalClicks >= 10 && !state.shopUnlocked) {
      set({ 
        shopUnlocked: true, 
        sidebarOpen: true,
        pendingAchievement: {
          id: 'first_ten',
          title: '✨ Void Access',
          description: 'You have clicked 10 times. The Shop is now open.',
          shown: false
        }
      })
    }

    // Combo Logic
    const newCombo = state.combo + 1
    if (comboTimer) clearTimeout(comboTimer)
    comboTimer = setTimeout(() => {
      set({ combo: 0, comboMultiplier: 1 })
    }, 1500)

    let multi = state.comboMultiplier
    if (newCombo >= 30) multi = 4
    else if (newCombo >= 10) multi = 2
    
    // Sound multiplier
    if (state.soundMode === 'muted_sadness') multi *= 0.5
    else multi *= 1.2

    const newClicks = state.clicks + multi
    const newTotal = state.totalClicks + multi
    const particleId = state.particleCounter + 1

    // Achievement Spam
    if (Math.random() < 0.05) {
      const titles = ["Clicked 1 time 😐", "Still here?", "Pro Clicker", "Dopamine Junkie", "Button Masher"]
      const title = titles[Math.floor(Math.random() * titles.length)]
      get().addAchievement(title, "Keep going for more chaos.")
    }

    const newParticles = [...state.particles, { id: particleId, x, y }]

    if (state.activeChaosSystems.includes('keyboard_smash') && state.soundMode === 'max_dopamine') {
      smashAudio.currentTime = 0
      smashAudio.play().catch(() => {})
    }

    set({
      clicks: newClicks,
      totalClicks: newTotal,
      particles: newParticles,
      particleCounter: particleId,
      combo: newCombo,
      comboMultiplier: multi,
    })
  },

  unlockShop: () => set({ shopUnlocked: true, sidebarOpen: true }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  purchaseItem: (id) => {
    const state = get()
    const item = state.shopItems.find((i) => i.id === id)
    if (!item || item.purchased || item.locked || state.clicks < item.cost) return

    if (id === 'golden_cub') {
      set({
        gameEnded: true,
        activeChaosSystems: [],
        floatingVideos: [],
        particles: [],
        specialButtons: [],
        mysteryBox: null,
        sidebarOpen: false,
        autoClickRate: 0,
        combo: 0,
        comboMultiplier: 1
      })
      return
    }

    const newClicks = state.clicks - item.cost
    let newItems = state.shopItems.map((i) => {
      if (i.id === id) return { ...i, purchased: true }
      if (item.unlocks?.includes(i.id)) return { ...i, locked: false }
      return i
    })

    let hasLight = state.hasLight
    let floatingVideos = [...state.floatingVideos]
    let autoClickRate = state.autoClickRate

    if (id === 'day_night_cycle') set({ hasDayNight: true })

    if ([
      'notification_flood', 
      'attention_meter', 
      'brain_rot_gen', 
      'overload_system', 
      'keyboard_smash',
      'ai_news',
      'mystery_box',
      'chaos_buttons',
      'lag_system'
    ].includes(id)) {
      set((s) => ({ activeChaosSystems: [...s.activeChaosSystems, id] }))
    }

    if (id === 'gold_cursor') set({ cursorStyle: 'gold' })

    const videoInfo = VIDEO_MAP[id]
    if (videoInfo && item.autoClickRate) {
      const pos = VIDEO_POSITIONS[videoPositionIndex % VIDEO_POSITIONS.length]
      videoPositionIndex++
      floatingVideos.push({
        id,
        youtubeId: videoInfo.youtubeId,
        title: videoInfo.title,
        x: pos.x,
        y: pos.y,
        width: videoInfo.defaultSize[0],
        height: videoInfo.defaultSize[1],
        autoClickRate: item.autoClickRate,
      })
    }

    if (item.autoClickRate) autoClickRate += item.autoClickRate

    set({
      clicks: newClicks,
      shopItems: newItems,
      hasLight,
      floatingVideos,
      autoClickRate,
    })

    if (state.soundMode === 'max_dopamine') {
      const audio = new Audio('https://www.soundjay.com/buttons/button-3.mp3')
      audio.volume = 0.4
      audio.play().catch(() => {})
    }
  },

  dismissAchievement: () => set({ pendingAchievement: null }),
  removeParticle: (id) => set((s) => ({ particles: s.particles.filter((p) => p.id !== id) })),

  tick: () => {
    const state = get()
    if (state.phase !== 'playing' || state.gameEnded) return

    // Idle Chaos & Events
    if (state.activeChaosSystems.includes('mystery_box') && Math.random() < 0.01) {
      get().spawnMysteryBox()
    }
    if (state.activeChaosSystems.includes('chaos_buttons') && Math.random() < 0.005) {
      get().spawnSpecialButton(Math.random() > 0.5 ? 'one_more' : 'trust_me')
    }
    if (state.activeChaosSystems.includes('lag_system') && Math.random() < 0.001) {
      get().triggerLag(2000)
    }

    let attentionDelta = 0
    if (state.activeChaosSystems.includes('attention_meter')) {
      attentionDelta = -0.05 * (1 + state.activeChaosSystems.length * 0.2)
    }

    let multiplier = state.comboMultiplier
    if (state.activeChaosSystems.includes('notification_flood')) multiplier *= 2
    if (state.activeChaosSystems.includes('attention_meter')) multiplier *= 2
    if (state.activeChaosSystems.includes('brain_rot_gen')) multiplier *= 2
    
    if (state.activeChaosSystems.includes('overload_system')) {
      multiplier *= (1 + state.activeChaosSystems.length * 0.5)
    }

    if (state.autoClickRate > 0) {
      set((s) => ({ 
        clicks: s.clicks + (s.autoClickRate * multiplier) / 20, 
        totalClicks: s.totalClicks + (s.autoClickRate * multiplier) / 20,
        attentionMeter: Math.max(0, s.attentionMeter + attentionDelta),
      }))
    } else {
      set((s) => ({
        attentionMeter: Math.max(0, s.attentionMeter + attentionDelta),
      }))
    }
  },

  startMusic: () => set({ musicStarted: true }),
  toggleDayNight: () => set((s) => ({ isDay: !s.isDay })),
  setCursorStyle: (style) => set({ cursorStyle: style }),
  updateAttention: (delta) => set((s) => ({ attentionMeter: Math.min(100, Math.max(0, s.attentionMeter + delta)) })),
  
  setSoundMode: (mode) => set({ soundMode: mode }),
  spawnSpecialButton: (type) => {
    const id = Math.random().toString(36).substr(2, 9)
    set(s => ({
      specialButtons: [...s.specialButtons, { id, type, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]
    }))
  },
  clickSpecialButton: (id) => {
    const state = get()
    const btn = state.specialButtons.find(b => b.id === id)
    if (!btn) return
    const reward = btn.type === 'one_more' ? 500 : (Math.random() > 0.5 ? 2000 : -1000)
    set(s => ({
      clicks: Math.max(0, s.clicks + reward),
      specialButtons: s.specialButtons.filter(b => b.id !== id)
    }))
  },
  spawnMysteryBox: () => {
    if (get().mysteryBox?.active) return
    set({ mysteryBox: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, active: true } })
  },
  clickMysteryBox: () => {
    const rewards = ['coins', 'chaos', 'lag', 'virus']
    const choice = rewards[Math.floor(Math.random() * rewards.length)]
    if (choice === 'coins') set(s => ({ clicks: s.clicks + 5000 }))
    if (choice === 'lag') get().triggerLag(3000)
    set({ mysteryBox: null })
  },
  triggerLag: (duration) => {
    if (!get().activeChaosSystems.includes('lag_system')) return
    set({ lagActive: true })
    setTimeout(() => {
      set({ lagActive: false, clicks: get().clicks + 10000 }) // Survival bonus
    }, duration)
  },
  addAchievement: (title, desc) => {
    set({ pendingAchievement: { id: Math.random().toString(), title, description: desc, shown: false } })
  },
  setPlayerName: (name) => set({ playerName: name })
}))
