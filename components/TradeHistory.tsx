'use client'

import { TradeHistory as TradeHistoryType } from '../types'

interface TradeHistoryProps {
  history: TradeHistoryType[]
}

export default function TradeHistory({ history }: TradeHistoryProps) {
  return (
    <div className="bg-[#1a1625] p-4 rounded-lg">
      <h3 className="font-pixel text-lg text-white mb-4">Trading History</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {history.map((trade) => (
          <div 
            key={trade.id} 
            className="flex justify-between items-center p-2 rounded bg-[#2a2435]"
          >
            <div>
              <span className="text-gray-400 text-sm">
                {new Date(trade.timestamp).toLocaleTimeString()}
              </span>
              <p className="text-white capitalize">{trade.type} Trade</p>
            </div>
            <span className={trade.amount >= 0 ? 'text-green-500' : 'text-red-500'}>
              {trade.amount >= 0 ? '+' : ''}{trade.amount.toFixed(2)} SOL
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

