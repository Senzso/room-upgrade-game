'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/store'
import { PlayerProfile } from './PlayerProfile'
import { TradePanel } from './TradePanel'
import { RoomView } from './RoomView'
import { ItemGrid } from './ItemGrid'
import { titleFont } from '@/lib/fonts'

export function Game() {
  const router = useRouter()
  const { address, username, isGameOver, reset } = useGameStore()

  useEffect(() => {
    if (!address) {
      router.push('/')
    } else if (!username) {
      router.push('/setup')
    }
  }, [address, username, router])

  const gameContent = useMemo(() => {
    if (!address || !username) {
      return null
    }

 return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4">
        <div className="max-w-[1600px] mx-auto">
          <h1 className={`${titleFont.className} text-4xl text-yellow-400 mb-8 flex items-center`}>
            <img
              src="/logo.png"
              alt="Solana Trading Simulator Logo"
              className="h-10 w-auto mr-3" // Adjust the height as needed
            />
            Solana Trading Simulator
          </h1>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-6">
              <PlayerProfile />
              <TradePanel />
            </div>
            
            <div className="col-span-3 space-y-6">
              <RoomView />
              <ItemGrid />
            </div>
          </div>
        </div>
      </div>
    )
  }, [address, username])

  if (isGameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center space-y-4">
          <h1 className={`${titleFont.className} text-4xl text-red-500`}>
            Game Over!
          </h1>
          <p className="text-gray-400">You're on the street now.</p>
          <button
            onClick={reset}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg hover:bg-yellow-500"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return gameContent
}

