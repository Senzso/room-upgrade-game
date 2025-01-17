import { ItemType, RoomItem } from '../types'

export const initialItems: RoomItem[] = [
  { type: 'bed', image: 'https://i.postimg.cc/P5FXXG7d/bed-1-left.png', level: 1, position: { x: 50, y: 300 } },
  { type: 'chair', image: 'https://i.postimg.cc/FzZvwwc5/Chair-1-left.png', level: 1, position: { x: 200, y: 400 } },
  { type: 'desk', image: 'https://i.postimg.cc/KjJX0BSm/Desk-1-left.png', level: 1, position: { x: 300, y: 400 } },
  // Add more initial items here
]

const itemUpgrades: Record<ItemType, string[]> = {
  bed: ['https://i.postimg.cc/P5FXXG7d/bed-1-left.png', 'https://i.postimg.cc/mrzbhXxC/bed-2-left.png'],
  chair: ['https://i.postimg.cc/FzZvwwc5/Chair-1-left.png', 'https://i.postimg.cc/MK6q1K2W/chair-2-left.png'],
  desk: ['https://i.postimg.cc/KjJX0BSm/Desk-1-left.png'],
  lamp: ['https://i.postimg.cc/y6Pz64J2/Lamp.png'],
  mirror: ['https://i.postimg.cc/MK32R7mD/Mirror-1-left.png', 'https://i.postimg.cc/sgBFJMnR/mirror-2-left.png'],
  shelving: ['https://i.postimg.cc/1XR2VXg2/shelving-1-left.png', 'https://i.postimg.cc/C1s9KkKb/shelving-2-left.png', 'https://i.postimg.cc/RVF2M3xn/shelving-3-left.png'],
  tv: ['https://i.postimg.cc/GmTNyZ2L/tv-left-1.png'],
  closet: ['https://i.postimg.cc/VkTwyqS6/Closet-1-left.png', 'https://i.postimg.cc/3wvT3kpZ/closet-2-left.png'],
  couch: ['https://i.postimg.cc/761rTjKG/couch-1-left.png'],
  books: ['https://i.postimg.cc/wvDgQ1jB/Books-1-only-right.png']
}

export function upgradeItem(items: RoomItem[], itemType: ItemType): RoomItem[] | null {
  const itemIndex = items.findIndex(item => item.type === itemType)
  if (itemIndex === -1) return null

  const item = items[itemIndex]
  const upgrades = itemUpgrades[itemType]

  if (item.level < upgrades.length) {
    const newItems = [...items]
    newItems[itemIndex] = {
      ...item,
      image: upgrades[item.level],
      level: item.level + 1
    }
    return newItems
  }

  return null
}

export function downgradeItem(items: RoomItem[], itemType: ItemType): RoomItem[] | null {
  const itemIndex = items.findIndex(item => item.type === itemType)
  if (itemIndex === -1) return null

  const item = items[itemIndex]
  const upgrades = itemUpgrades[itemType]

  if (item.level > 1) {
    const newItems = [...items]
    newItems[itemIndex] = {
      ...item,
      image: upgrades[item.level - 2],
      level: item.level - 1
    }
    return newItems
  }

  return null
}

