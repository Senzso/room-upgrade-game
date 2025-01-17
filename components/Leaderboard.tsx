'use client'

import { useState } from 'react'
import { LeaderboardEntry } from '../types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from 'lucide-react'

interface LeaderboardProps {
  entries: LeaderboardEntry[]
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const sortedEntries = [...entries].sort((a, b) => b.netWorth - a.netWorth)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
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
          {sortedEntries.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded bg-[#2a2435]">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium text-yellow-500">#{index + 1}</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>{entry.username[0]}</AvatarFallback>
                </Avatar>
                <span>{entry.username}</span>
              </div>
              <span className="text-yellow-500">{entry.netWorth.toFixed(2)} SOL</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

