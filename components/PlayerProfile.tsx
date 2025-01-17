'use client'

import { useGameStore } from '@/lib/store'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { shortenAddress } from '@/lib/wallet'
import { textFont, titleFont } from '@/lib/fonts'

export function PlayerProfile() {
  const { address, username, balance, netWorth, borrowed } = useGameStore()

  return (
    <div className="bg-[#1a1625] rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12 bg-yellow-400">
          <AvatarImage src="https://files.idyllic.app/files/static/1889331?width=256&optimizer=image" />
          <AvatarFallback className={titleFont.className}>
            {username?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className={`${textFont.className} text-lg text-white`}>
            {username}
          </h3>
          <p className="text-sm text-gray-400">
            {address ? shortenAddress(address) : ''}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-300">Balance:</span>
          <span className="text-yellow-400 font-medium">
            {balance.toFixed(2)} SOL
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Net Worth:</span>
          <span className="text-yellow-400 font-medium">
            {netWorth.toFixed(2)} SOL
          </span>
        </div>
        {borrowed > 0 && (
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-red-400">Borrowed:</span>
              <span className="text-red-400">{borrowed} SOL</span>
            </div>
            <div className="h-2 bg-gray-800 rounded mt-1">
              <div 
                className="h-full bg-blue-500 rounded transition-all duration-300"
                style={{ width: `${Math.min((balance / borrowed) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

