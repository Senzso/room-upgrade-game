import { ItemType, RoomItem } from '../types'

export const initialItems: RoomItem[] = [
  { type: 'bed', image: '/bed-1-left.png', level: 1, position: { x: 50, y: 300 } },
  { type: 'chair', image: '/Chair-1-left.png', level: 1, position: { x: 200, y: 400 } },
  { type: 'desk', image: '/Desk-1-left.png', level: 1, position: { x: 300, y: 400 } },
  // Add more initial items here
]

export const itemUpgrades: Record<ItemType, { left: string[]; right: string[] }> = {
  bed: {
    left: ["/bed-1-left.png", "/bed-2-left.png"],
    right: ["/bed-1-right.png", "/bed-2-right.png"],
  },
  chair: {
    left: ["/Chair-1-left.png", "/chair-2-left.png"],
    right: ["/Chair-1-right.png", "/chair-2-right.png"],
  },
  desk: {
    left: ["/Desk-1-left.png"],
    right: ["/Desk-1-right.png"],
  },
  lamp: {
    left: ["/Lamp.png"],
    right: ["/Lamp.png"],
  },
  mirror: {
    left: ["/Mirror-1-left.png", "/mirror-2-left.png"],
    right: ["/Mirror-1-right.png", "/mirror-2-right.png"],
  },
  shelving: {
    left: ["/shelving-1-left.png", "/shelving-2-left.png", "/shelving-3-left.png"],
    right: ["/shelving-1-right.png", "/shelving-2-right.png", "/shelving-3-right.png"],
  },
  tv: {
    left: ["/tv-left-1.png"],
    right: ["/tv-right-1.png"],
  },
  closet: {
    left: ["/Closet-1-left.png", "/closet-2-left.png"],
    right: ["/Closet-1-right.png", "/closet-2-right.png"],
  },
  couch: {
    left: ["/couch-1-left.png"],
    right: ["/couch-1-right.png"],
  },
  books: {
    left: ["/Books-1-only-right.png"],
    right: ["/Books-1-only-right.png"],
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

