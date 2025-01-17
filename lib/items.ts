import { ItemType } from '@/types'

interface AvailableItem {
  type: ItemType
  cost: number
  image: {
    left: string
    right: string
  }
}

export const availableItems: AvailableItem[] = [
  {
    type: 'bed',
    cost: 5,
    image: {
      left: 'https://i.postimg.cc/P5FXXG7d/bed-1-left.png',
      right: 'https://i.postimg.cc/fyZZ2MVf/bed-1-right.png'
    }
  },
  {
    type: 'chair',
    cost: 3,
    image: {
      left: 'https://i.postimg.cc/FzZvwwc5/Chair-1-left.png',
      right: 'https://i.postimg.cc/1RcygVdC/Chair-1-right.png'
    }
  },
  {
    type: 'lamp',
    cost: 2,
    image: {
      left: 'https://i.postimg.cc/y6Pz64J2/Lamp.png',
      right: 'https://i.postimg.cc/y6Pz64J2/Lamp.png'
    }
  },
  {
    type: 'mirror',
    cost: 4,
    image: {
      left: 'https://i.postimg.cc/MK32R7mD/Mirror-1-left.png',
      right: 'https://i.postimg.cc/R0fjjj5s/Mirror-1-right.png'
    }
  },
  {
    type: 'shelving',
    cost: 6,
    image: {
      left: 'https://i.postimg.cc/1XR2VXg2/shelving-1-left.png',
      right: 'https://i.postimg.cc/90xSd2ZM/shelving-1-right.png'
    }
  },
  {
    type: 'tv',
    cost: 8,
    image: {
      left: 'https://i.postimg.cc/GmTNyZ2L/tv-left-1.png',
      right: 'https://i.postimg.cc/26rXgyxy/tv-right-1.png'
    }
  },
  {
    type: 'closet',
    cost: 7,
    image: {
      left: 'https://i.postimg.cc/VkTwyqS6/Closet-1-left.png',
      right: 'https://i.postimg.cc/8zsGnKz9/Closet-1-right.png'
    }
  },
  {
    type: 'couch',
    cost: 10,
    image: {
      left: 'https://i.postimg.cc/761rTjKG/couch-1-left.png',
      right: 'https://i.postimg.cc/GtcwPzfM/couch-1-right.png'
    }
  },
  {
    type: 'books',
    cost: 1,
    image: {
      left: 'https://i.postimg.cc/KYMZmVqj/Books-1-left.png',
      right: 'https://i.postimg.cc/vB7bVndd/Books-1-only-right.png'
    }
  }
]

export const itemUpgrades: Record<ItemType, { left: string[], right: string[] }> = {
  bed: {
    left: ['https://i.postimg.cc/P5FXXG7d/bed-1-left.png', 'https://i.postimg.cc/mrzbhXxC/bed-2-left.png'],
    right: ['https://i.postimg.cc/fyZZ2MVf/bed-1-right.png', 'https://i.postimg.cc/HLqTMwHK/bed-2-right.png']
  },
  chair: {
    left: ['https://i.postimg.cc/FzZvwwc5/Chair-1-left.png', 'https://i.postimg.cc/MK6q1K2W/chair-2-left.png'],
    right: ['https://i.postimg.cc/1RcygVdC/Chair-1-right.png', 'https://i.postimg.cc/3Jt715Y2/chair-2-right.png']
  },
  desk: {
    left: ['https://i.postimg.cc/KjJX0BSm/Desk-1-left.png'],
    right: ['https://i.postimg.cc/QxdZH41C/Desk-1-right.png']
  },
  lamp: {
    left: ['https://i.postimg.cc/y6Pz64J2/Lamp.png'],
    right: ['https://i.postimg.cc/y6Pz64J2/Lamp.png']
  },
  mirror: {
    left: ['https://i.postimg.cc/MK32R7mD/Mirror-1-left.png', 'https://i.postimg.cc/sgBFJMnR/mirror-2-left.png'],
    right: ['https://i.postimg.cc/R0fjjj5s/Mirror-1-right.png', 'https://i.postimg.cc/6pFkbBS4/mirror-2-right.png']
  },
  shelving: {
    left: ['https://i.postimg.cc/1XR2VXg2/shelving-1-left.png', 'https://i.postimg.cc/C1s9KkKb/shelving-2-left.png', 'https://i.postimg.cc/RVF2M3xn/shelving-3-left.png'],
    right: ['https://i.postimg.cc/90xSd2ZM/shelving-1-right.png', 'https://i.postimg.cc/wxFS8XZp/shelving-2-right.png', 'https://i.postimg.cc/DyMHm27p/shelving-3-right.png']
  },
  tv: {
    left: ['https://i.postimg.cc/GmTNyZ2L/tv-left-1.png'],
    right: ['https://i.postimg.cc/26rXgyxy/tv-right-1.png']
  },
  closet: {
    left: ['https://i.postimg.cc/VkTwyqS6/Closet-1-left.png', 'https://i.postimg.cc/3wvT3kpZ/closet-2-left.png'],
    right: ['https://i.postimg.cc/8zsGnKz9/Closet-1-right.png', 'https://i.postimg.cc/KzhyjmDh/closet-2-right.png']
  },
  couch: {
    left: ['https://i.postimg.cc/761rTjKG/couch-1-left.png'],
    right: ['https://i.postimg.cc/GtcwPzfM/couch-1-right.png']
  },
  books: {
    left: ['https://i.postimg.cc/KYMZmVqj/Books-1-left.png'],
    right: ['https://i.postimg.cc/vB7bVndd/Books-1-only-right.png']
  },
  'tv-stand': {
    left: ['https://i.postimg.cc/s2FL9wQp/tv-stand-1-left.png'],
    right: ['https://i.postimg.cc/YS1sXYYT/tv-stand-1-right.png']
  },
  'wall-shelving': {
    left: ['https://i.postimg.cc/gjBSw-DbL/wall-shelving-1-left.png'],
    right: ['https://i.postimg.cc/ryhYY8Ry/wall-shelving-1-right.png']
  }
}

