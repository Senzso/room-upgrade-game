import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ItemType, RoomItem, TradeHistory, LeaderboardEntry } from '@/types'

const generateRandomUsername = () => {
  const prefixes = ['sol', 'crypto', 'hodl', 'moon', 'degen', 'whale', 'bull', 'bear']
  const suffixes = ['master', 'wizard', 'king', 'queen', 'guru', 'ninja', 'pro', 'boss']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  const number = Math.floor(Math.random() * 1000)
  return `${prefix}${suffix}${number}`
}

const generateRandomNetWorth = () => {
  return Math.floor(Math.random() * (438 - 343) + 343)
}

const generateRandomLeaderboard = (): LeaderboardEntry[] => {
  const entries: LeaderboardEntry[] = Array.from({ length: 10 }, () => ({
    username: generateRandomUsername(),
    avatar: "https://files.idyllic.app/files/static/1889331?width=256&optimizer=image",
    netWorth: generateRandomNetWorth()
  }))
  return entries.sort((a, b) => b.netWorth - a.netWorth)
}

interface GameState {
  address: string | null
  username: string | null
  balance: number
  netWorth: number
  items: RoomItem[]
  tradeHistory: TradeHistory[]
  isGameOver: boolean
  leaderboard: LeaderboardEntry[]
  lastLeaderboardUpdate: number

  setWallet: (address: string) => void
  setUsername: (username: string) => void
  updateBalance: (amount: number) => void
  addTradeHistory: (trade: TradeHistory) => void
  addItem: (item: Omit<RoomItem, 'id'>) => void
  updateItem: (itemId: string, updates: Partial<RoomItem>) => void
  removeItem: (itemId: string) => void
  setGameOver: (isOver: boolean) => void
  reset: () => void
  updateLeaderboard: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      address: null,
      username: null,
      balance: 10,
      netWorth: 10,
      items: [
        {
          id: 'desk-default',
          type: 'desk',
          image: 'https://i.postimg.cc/KjJX0BSm/Desk-1-left.png',
          level: 1,
          position: { x: 450, y: 200 }, // Updated position: more right (450) and lower (200)
          side: 'left',
          cost: 0
        }
      ],
      tradeHistory: [],
      isGameOver: false,
      leaderboard: generateRandomLeaderboard(),
      lastLeaderboardUpdate: Date.now(),

      setWallet: (address) => set({ address }),
      
      setUsername: (username) => set({ username }),
      
      updateBalance: (amount) => set((state) => {
        const newBalance = state.balance + amount
        
        if (newBalance <= 0) {
          return {
            ...state,
            balance: 0,
            isGameOver: true
          }
        }

        return {
          ...state,
          balance: newBalance,
          netWorth: state.netWorth + amount
        }
      }),

      addTradeHistory: (trade) => set((state) => ({
        tradeHistory: [trade, ...state.tradeHistory].slice(0, 50)
      })),

      addItem: (item) => set((state) => ({
        items: [...state.items, { ...item, id: `${item.type}-${Date.now()}` }],
        balance: state.balance - item.cost,
        netWorth: state.netWorth + (item.cost * 0.8)
      })),

      updateItem: (itemId, updates) => set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      })),

      removeItem: (itemId) => set((state) => {
        const item = state.items.find(i => i.id === itemId)
        if (!item) return state

        return {
          items: state.items.filter(i => i.id !== itemId),
          balance: state.balance + (item.cost * 0.5),
          netWorth: state.netWorth - (item.cost * 0.3)
        }
      }),
      
      setGameOver: (isOver) => set({ isGameOver: isOver }),
      
      reset: () => set({
        address: null,
        username: null,
        balance: 10,
        netWorth: 10,
        items: [
          {
            id: 'desk-default',
            type: 'desk',
            image: 'https://i.postimg.cc/KjJX0BSm/Desk-1-left.png',
            level: 1,
            position: { x: 450, y: 200 }, // Updated position: more right (450) and lower (200)
            side: 'left',
            cost: 0
          }
        ],
        tradeHistory: [],
        isGameOver: false,
        leaderboard: generateRandomLeaderboard(),
        lastLeaderboardUpdate: Date.now()
      }),

      updateLeaderboard: () => set((state) => {
        const now = Date.now()
        if (now - state.lastLeaderboardUpdate < 5000) {
          return state
        }

        const updatedLeaderboard = state.leaderboard.map(entry => ({
          ...entry,
          netWorth: Math.max(343, Math.min(438, entry.netWorth * (1 + (Math.random() * 0.2 - 0.1))))
        }))

        const userEntry: LeaderboardEntry = {
          username: state.username || 'Player',
          avatar: "https://files.idyllic.app/files/static/1889331?width=256&optimizer=image",
          netWorth: state.netWorth
        }

        updatedLeaderboard.push(userEntry)
        updatedLeaderboard.sort((a, b) => b.netWorth - a.netWorth)

        return { 
          leaderboard: updatedLeaderboard.slice(0, 10),
          lastLeaderboardUpdate: now
        }
      })
    }),
    {
      name: 'solife-storage'
    }
  )
)

