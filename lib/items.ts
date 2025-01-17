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
    cost: 75,
    image: {
      left: '/bed 1 left.png',
      right: '/bed 1 right.png'
    }
  },
  {
    type: 'chair',
    cost: 45,
    image: {
      left: '/Chair 1 left.png',
      right: '/Chair 1 right.png'
    }
  },
  {
    type: 'lamp',
    cost: 30,
    image: {
      left: '/Lamp.png',
      right: '/Lamp.png'
    }
  },
  {
    type: 'mirror',
    cost: 60,
    image: {
      left: '/Mirror 1 left.png',
      right: '/Mirror 1 right.png'
    }
  },
  {
    type: 'shelving',
    cost: 90,
    image: {
      left: '/shelving 1 left.png',
      right: '/shelving 1 right.png'
    }
  },
  {
    type: 'tv',
    cost: 120,
    image: {
      left: '/tv left 1.png',
      right: '/tv right 1.png'
    }
  },
  {
    type: 'closet',
    cost: 105,
    image: {
      left: '/Closet 1 left.png',
      right: '/Closet 1 right.png'
    }
  },
  {
    type: 'couch',
    cost: 150,
    image: {
      left: '/couch 1 left.png',
      right: '/couch 1 right.png'
    }
  },
  {
    type: 'books',
    cost: 15,
    image: {
      left: '/Books 1 left.png',
      right: '/Books 1 only right.png'
    }
  },
  {
    type: 'tv-stand',
    cost: 75,
    image: {
      left: '/tv-stand 1 left.png',
      right: '/tv-stand 1 right.png'
    }
  },
  {
    type: 'wall-shelving',
    cost: 60,
    image: {
      left: '/wall-shelving 1 left.png',
      right: '/wall-shelving 1 right.png'
    }
  }
]

export const itemUpgrades: Record<ItemType, { left: string[], right: string[] }> = {
  bed: {
    left: ['/bed 1 left.png', '/bed 2 left.png'],
    right: ['/bed 1 right.png', '/bed 2 right.png']
  },
  chair: {
    left: ['/Chair 1 left.png', '/chair 2 left.png'],
    right: ['/Chair 1 right.png', '/chair 2 right.png']
  },
  desk: {
    left: ['/Desk 1 left.png'],
    right: ['/Desk 1 right.png']
  },
  lamp: {
    left: ['/Lamp.png'],
    right: ['/Lamp.png']
  },
  mirror: {
    left: ['/Mirror 1 left.png', '/mirror 2 left.png'],
    right: ['/Mirror 1 right.png', '/mirror 2 right.png']
  },
  shelving: {
    left: ['/shelving 1 left.png', '/shelving 2 left.png', '/shelving 3 left.png'],
    right: ['/shelving 1 right.png', '/shelving 2 right.png', '/shelving 3 right.png']
  },
  tv: {
    left: ['/tv left 1.png'],
    right: ['/tv right 1.png']
  },
  closet: {
    left: ['/Closet 1 left.png', '/closet 2 left.png'],
    right: ['/Closet 1 right.png', '/closet 2 right.png']
  },
  couch: {
    left: ['/couch 1 left.png'],
    right: ['/couch 1 right.png']
  },
  books: {
    left: ['/Books 1 left.png'],
    right: ['/Books 1 only right.png']
  },
  'tv-stand': {
    left: ['/tv-stand 1 left.png'],
    right: ['/tv-stand 1 right.png']
  },
  'wall-shelving': {
    left: ['/wall-shelving 1 left.png'],
    right: ['/wall-shelving 1 right.png']
  }
}

