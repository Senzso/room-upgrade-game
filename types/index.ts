export type ItemType = 'bed' | 'chair' | 'desk' | 'lamp' | 'mirror' | 'shelving' | 'tv' | 'closet' | 'couch' | 'books'
export type TradeType = 'safe' | 'moderate' | 'risky' | 'yolo'
export type Side = 'left' | 'right'

export interface RoomItem {
  type: ItemType
  image: string
  level: number
  position: {
    x: number
    y: number
  }
  side: Side
  cost: number
}

export interface TradeHistory {
  id: string
  type: TradeType
  amount: number
  timestamp: number
}

