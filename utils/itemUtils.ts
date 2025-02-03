import { ItemType, RoomItem } from '../types'

export const initialItems: RoomItem[] = [
  { type: 'bed', image: 'https://i.postimg.cc/P5FXXG7d/bed-1-left.png', level: 1, position: { x: 50, y: 300 } },
  { type: 'chair', image: 'https://i.postimg.cc/FzZvwwc5/Chair-1-left.png', level: 1, position: { x: 200, y: 400 } },
  { type: 'desk', image: 'https://i.postimg.cc/KjJX0BSm/Desk-1-left.png', level: 1, position: { x: 300, y: 400 } },
  // Add more initial items here
]

export const itemUpgrades: Record<ItemType, { left: string[]; right: string[] }> = {
  bed: {
    left: ["/images/bed-1-left.png", "/images/bed-2-left.png"],
    right: ["/images/bed-1-right.png", "/images/bed-2-right.png"],
  },
  chair: {
    left: ["/images/Chair-1-left.png", "/images/chair-2-left.png"],
    right: ["/images/Chair-1-right.png", "/images/chair-2-right.png"],
  },
  desk: {
    left: ["/images/Desk-1-left.png"],
    right: ["/images/Desk-1-right.png"],
  },
  lamp: {
    left: ["/images/Lamp.png"],
    right: ["/images/Lamp.png"],
  },
  mirror: {
    left: ["/images/Mirror-1-left.png", "/images/mirror-2-left.png"],
    right: ["/images/Mirror-1-right.png", "/images/mirror-2-right.png"],
  },
  shelving: {
    left: ["/images/shelving-1-left.png", "/images/shelving-2-left.png", "/images/shelving-3-left.png"],
    right: ["/images/shelving-1-right.png", "/images/shelving-2-right.png", "/images/shelving-3-right.png"],
  },
  tv: {
    left: ["/images/tv-left-1.png"],
    right: ["/images/tv-right-1.png"],
  },
  closet: {
    left: ["/images/Closet-1-left.png", "/images/closet-2-left.png"],
    right: ["/images/Closet-1-right.png", "/images/closet-2-right.png"],
  },
  couch: {
    left: ["/images/couch-1-left.png"],
    right: ["/images/couch-1-right.png"],
  },
  books: {
    left: ["/images/Books-1-only-right.png"],
    right: ["/images/Books-1-only-right.png"],
  },
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

