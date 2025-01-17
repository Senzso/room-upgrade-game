'use client'

import { useState, useEffect } from 'react'
import { GameState, Player, TradeHistory, LeaderboardEntry } from './types'
import WalletConnect from './components/WalletConnect'
import UserSetup from './components/UserSetup'
import PlayerProfile from './components/PlayerProfile'
import Leaderboard from './components/Leaderboard'
import TradeHistory from './components/TradeHistory'
import Game from './components/Game'

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { username: "SOL_Wizard", avatar: "/placeholder.svg", netWorth: 100.5 },
  { username: "Degen_Trader", avatar: "/placeholder.svg", netWorth: 85.2 },
  { username: "Diamond_Hands", avatar: "/placeholder.svg", netWorth: 75.8 },
]

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    player: null,
    isConnected: false,
    borrowed: 0,
    isGameOver: false,
    tradeHistory: []
  })

  const handleWalletConnect = async () => {
    // Mock wallet connection - replace with actual Phantom wallet connection
    setGameState(prev => ({ ...prev, isConnected: true }))
  }

  const handleUserSetup = (username: string) => {
    const newPlayer: Player = {
      address: '0x1234...5678', // Replace with actual wallet address
      username,
      avatar: `/placeholder.svg?text=${username[0]}`,
      balance: 10,
      netWorth: 10,
      items: []
    }
    setGameState(prev => ({ ...prev, player: newPlayer }))
  }

  const handleTrade = (type: TradeHistory['type'], amount: number) => {
    if (!gameState.player) return

    const newTrade: TradeHistory = {
      id: Date.now().toString(),
      type,
      amount,
      timestamp: Date.now()
    }

    setGameState(prev => ({
      ...prev,
      player: prev.player ? {
        ...prev.player,
        balance: prev.player.balance + amount,
        netWorth: prev.player.netWorth + amount
      } : null,
      tradeHistory: [newTrade, ...prev.tradeHistory]
    }))
  }

  if (!gameState.isConnected) {
    return <WalletConnect onConnect={handleWalletConnect} />
  }

  if (!gameState.player) {
    return <UserSetup onComplete={handleUserSetup} />
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-pixel text-yellow-500 mb-8">SOLife: Solana Trading Simulator</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-4">
            <PlayerProfile player={gameState.player} />
            <Leaderboard entries={MOCK_LEADERBOARD} />
            <TradeHistory history={gameState.tradeHistory} />
          </div>
          <div className="col-span-3">
            <Game 
              gameState={gameState}
              onTrade={handleTrade}
              setGameState={setGameState}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

