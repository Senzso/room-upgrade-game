'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trophy } from 'lucide-react'
import { useGameStore } from '@/lib/store'
import { TradeType } from '@/types'
import { textFont } from '@/lib/fonts'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TRADE_CONFIGS = {
  safe: { color: 'bg-green-400 hover:bg-green-500 text-black', risk: 0.35, baseAmount: 15, winMultiplier: 1.2 },
  moderate: { color: 'bg-yellow-400 hover:bg-yellow-500 text-black', risk: 0.45, baseAmount: 30, winMultiplier: 1.5 },
  risky: { color: 'bg-orange-400 hover:bg-orange-500 text-black', risk: 0.55, baseAmount: 60, winMultiplier: 2 },
  yolo: { color: 'bg-red-400 hover:bg-red-500 text-black', risk: 0.65, baseAmount: 120, winMultiplier: 3 }
}

export function TradePanel() {
  const { balance, updateBalance, addTradeHistory, leaderboard, updateLeaderboard, isFirstTrade, setFirstTradeDone } = useGameStore()
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)

  const handleTrade = (type: TradeType) => {
    const config = TRADE_CONFIGS[type]
    let isWin: boolean
    let amount: number

    if (isFirstTrade) {
      isWin = true
      setFirstTradeDone()
    } else {
      isWin = Math.random() > 0.4 // 60% chance of winning
    }

    if (isWin) {
      amount = config.baseAmount * config.winMultiplier * (0.8 + Math.random() * 0.4) // 80% to 120% of base win
    } else {
      amount = -config.baseAmount * (0.8 + Math.random() * 0.4) // 80% to 120% of base loss
    }

    updateBalance(amount)
    addTradeHistory({
      id: Date.now().toString(),
      type,
      amount,
      timestamp: Date.now()
    })
    updateLeaderboard()
  }

  return (
    <div className="bg-[#1a1625] rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        {(Object.keys(TRADE_CONFIGS) as TradeType[]).map((type) => (
          <Button
            key={type}
            onClick={() => handleTrade(type)}
            className={`w-full ${TRADE_CONFIGS[type].color} ${textFont.className}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Trade
          </Button>
        ))}
      </div>

      <Dialog open={isLeaderboardOpen} onOpenChange={setIsLeaderboardOpen}>
        <DialogTrigger asChild>
          <Button 
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={() => updateLeaderboard()}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Show Leaderboard
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#1a1625] text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Top Traders</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-[#2a2435]">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-medium text-yellow-400">#{index + 1}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback>{entry.username[0]}</AvatarFallback>
                  </Avatar>
                  <span>{entry.username}</span>
                </div>
                <span className="text-yellow-400">{entry.netWorth.toFixed(2)} SOL</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-2 mt-4">
        <h3 className={`${textFont.className} text-lg text-white`}>Trading History</h3>
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {useGameStore((state) => state.tradeHistory).map((trade) => (
            <div 
              key={trade.id}
              className="bg-[#2a2435] p-2 rounded flex justify-between items-center"
            >
              <div>
                <span className="text-gray-400 text-sm">
                  {new Date(trade.timestamp).toLocaleTimeString()}
                </span>
                <p className="text-white capitalize">{trade.type} Trade</p>
              </div>
              <span className={trade.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {trade.amount >= 0 ? '+' : ''}{trade.amount.toFixed(2)} SOL
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

