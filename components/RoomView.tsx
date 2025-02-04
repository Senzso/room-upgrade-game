'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useGameStore } from '@/lib/store'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RoomItem } from '@/types'
import { itemUpgrades } from '@/lib/items'

export function RoomView() {
  const { items, updateItem, balance, updateBalance } = useGameStore()
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const roomRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.DragEvent, item: RoomItem) => {
    setIsDragging(true)
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const itemData = JSON.parse(e.dataTransfer.getData('text/plain')) as RoomItem
    
    if (roomRef.current) {
      const roomRect = roomRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(
        e.clientX - roomRect.left - 40,
        roomRect.width - 80
      ))
      const y = Math.max(0, Math.min(
        e.clientY - roomRect.top - 40,
        roomRect.height - 80
      ))

      updateItem(itemData.id, {
        position: { x, y }
      })
    }
    setIsDragging(false)
  }

  const handleUpgrade = (itemId: string) => {
    const item = items.find(i => i.id === itemId)
    if (item && balance >= 1250 && item.type !== 'desk') {
      const upgrades = itemUpgrades[item.type][item.side]
      if (item.level < upgrades.length) {
        updateItem(itemId, { 
          level: item.level + 1,
          image: upgrades[item.level]
        })
        updateBalance(-1250)
      }
    }
  }

  const handleSideChange = (itemId: string, newSide: 'left' | 'right') => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      const upgrades = itemUpgrades[item.type]?.[newSide]
      if (upgrades) {
        updateItem(itemId, { 
          side: newSide,
          image: upgrades[item.level - 1] || item.image
        })
      }
    }
  }

  const selectedItem = items.find(item => item.id === selectedItemId)
  const canUpgrade = selectedItem && selectedItem.type !== 'desk' && 
    selectedItem.level < (itemUpgrades[selectedItem.type]?.[selectedItem.side]?.length || 1)

  return (
    <div className="bg-[#1a1625] rounded-lg p-4">
      <div 
        ref={roomRef}
        className={`
          relative w-full h-[400px] bg-[#0a0a0a] rounded-lg overflow-hidden
          ${isDragging ? 'border-2 border-dashed border-yellow-400' : ''}
        `}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Image 
          src="/Room estructure.png"
          alt="Room"
          layout="fill"
          objectFit="contain"
          priority
        />
        
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: item.position.x,
              top: item.position.y,
              cursor: 'move',
              zIndex: selectedItemId === item.id ? 10 : 1,
              border: selectedItemId === item.id ? '2px solid #FFD700' : 'none'
            }}
            onClick={() => setSelectedItemId(item.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragEnd={handleDragEnd}
          >
            <Image 
              src={item.image || "/placeholder.svg"}
              alt={item.type}
              width={80}
              height={80}
              className="pointer-events-none"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <Button
          onClick={() => selectedItemId && handleSideChange(selectedItemId, 'left')}
          variant="outline"
          size="icon"
          className={`rounded-full ${
            selectedItem && selectedItem.side !== 'left'
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedItemId || selectedItem?.side === 'left'}
        >
          <ArrowLeftCircle className="h-6 w-6" />
        </Button>
        {selectedItemId && selectedItem?.type !== 'desk' && (
          <Button
            onClick={() => selectedItemId && handleUpgrade(selectedItemId)}
            variant="outline"
            className={`px-4 ${
              canUpgrade && balance >= 1250
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!canUpgrade || balance < 1250}
          >
            Upgrade (1250 SOL)
          </Button>
        )}
        <Button
          onClick={() => selectedItemId && handleSideChange(selectedItemId, 'right')}
          variant="outline"
          size="icon"
          className={`rounded-full ${
            selectedItem && selectedItem.side !== 'right'
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedItemId || selectedItem?.side === 'right'}
        >
          <ArrowRightCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

