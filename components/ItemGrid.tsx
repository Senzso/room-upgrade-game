'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store'
import { textFont } from '@/lib/fonts'
import { useState } from 'react'

const availableItems = [
  { type: 'bed', cost: 5, image: { left: 'https://i.postimg.cc/P5FXXG7d/bed-1-left.png', right: 'https://i.postimg.cc/fyZZ2MVf/bed-1-right.png' } },
  { type: 'chair', cost: 3, image: { left: 'https://i.postimg.cc/FzZvwwc5/Chair-1-left.png', right: 'https://i.postimg.cc/1RcygVdC/Chair-1-right.png' } },
  { type: 'lamp', cost: 2, image: { left: 'https://i.postimg.cc/y6Pz64J2/Lamp.png', right: 'https://i.postimg.cc/y6Pz64J2/Lamp.png' } },
  { type: 'mirror', cost: 4, image: { left: 'https://i.postimg.cc/MK32R7mD/Mirror-1-left.png', right: 'https://i.postimg.cc/R0fjjj5s/Mirror-1-right.png' } },
  { type: 'shelving', cost: 6, image: { left: 'https://i.postimg.cc/1XR2VXg2/shelving-1-left.png', right: 'https://i.postimg.cc/90xSd2ZM/shelving-1-right.png' } },
  { type: 'tv', cost: 8, image: { left: 'https://i.postimg.cc/GmTNyZ2L/tv-left-1.png', right: 'https://i.postimg.cc/26rXgyxy/tv-right-1.png' } },
  { type: 'closet', cost: 7, image: { left: 'https://i.postimg.cc/VkTwyqS6/Closet-1-left.png', right: 'https://i.postimg.cc/8zsGnKz9/Closet-1-right.png' } },
  { type: 'couch', cost: 10, image: { left: 'https://i.postimg.cc/761rTjKG/couch-1-left.png', right: 'https://i.postimg.cc/GtcwPzfM/couch-1-right.png' } },
  { type: 'books', cost: 1, image: { left: 'https://i.postimg.cc/wvDgQ1jB/Books-1-only-right.png', right: 'https://i.postimg.cc/wvDgQ1jB/Books-1-only-right.png' } },
  { type: 'tv-stand', cost: 5, image: { left: 'https://i.postimg.cc/s2FL9wQp/tv-stand-1-left.png', right: 'https://i.postimg.cc/YS1sXYYT/tv-stand-1-right.png' } },
  { type: 'wall-shelving', cost: 4, image: { left: 'https://i.postimg.cc/gjBSw-DbL/wall-shelving-1-left.png', right: 'https://i.postimg.cc/ryhYY8Ry/wall-shelving-1-right.png' } }
]

export function ItemGrid() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const { balance, addItem } = useGameStore()

  const handleSelect = (itemType: string) => {
    setSelectedItems(prev => 
      prev.includes(itemType) 
        ? prev.filter(type => type !== itemType)
        : [...prev, itemType]
    )
  }

  const totalCost = selectedItems.reduce((sum, type) => 
    sum + (availableItems.find(item => item.type === type)?.cost || 0), 
    0
  )

  const handlePurchase = () => {
    selectedItems.forEach(type => {
      const item = availableItems.find(item => item.type === type)
      if (item) {
        addItem({
          type: item.type,
          image: item.type === 'books' 
            ? 'https://i.postimg.cc/KYMZmVqj/Books-1-left.png'  // Changed to start with left side
            : item.image.left,
          level: 1,
          position: { x: 0, y: 0 },
          side: 'left',
          cost: item.cost
        })
      }
    })
    setSelectedItems([])
  }

  return (
    <div className="bg-[#1a1625] rounded-lg p-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {availableItems.map((item) => (
          <div key={item.type} className="bg-[#2a2435] p-3 rounded-lg">
            <Image
              src={item.image.left || "/placeholder.svg"}
              alt={item.type}
              width={80}
              height={80}
              className="mx-auto"
            />
            <p className={`${textFont.className} text-center mt-2 text-yellow-400`}>
              Cost: {item.cost} SOL
            </p>
            <Button
              onClick={() => handleSelect(item.type)}
              className={`w-full mt-2 ${
                selectedItems.includes(item.type)
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {selectedItems.includes(item.type) ? 'Selected' : 'Select'}
            </Button>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="bg-[#2a2435] p-4 rounded-lg">
          <h3 className={`${textFont.className} text-lg mb-2 text-yellow-400`}>Selected Items</h3>
          <div className="space-y-2">
            {selectedItems.map(type => {
              const item = availableItems.find(i => i.type === type)
              return (
                <div key={type} className="flex justify-between text-yellow-400">
                  <span>{type}</span>
                  <span>{item?.cost} SOL</span>
                </div>
              )
            })}
            <div className="border-t border-yellow-400/30 pt-2 mt-2">
              <div className="flex justify-between text-yellow-400">
                <span>Total:</span>
                <span>{totalCost} SOL</span>
              </div>
              <Button
                onClick={handlePurchase}
                disabled={balance < totalCost}
                className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                Purchase Selected Items
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

