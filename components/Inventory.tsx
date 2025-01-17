import { RoomItem, ItemType } from '../types'

interface InventoryProps {
  items: RoomItem[]
  onUpgrade: (itemType: ItemType) => void
  onDowngrade: (itemType: ItemType) => void
  onItemPlace: (item: RoomItem, position: { x: number, y: number }) => void
}

export default function Inventory({ items, onUpgrade, onDowngrade, onItemPlace }: InventoryProps) {
  const handleDragStart = (e: React.DragEvent, item: RoomItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
  }

  return (
    <div className="inventory-container">
      {items.map((item, index) => (
        <div key={index} className="item-container">
          <img 
            src={item.image} 
            alt={item.type} 
            draggable 
            onDragStart={(e) => handleDragStart(e, item)}
          />
          <button onClick={() => onUpgrade(item.type)}>Upgrade</button>
          <button onClick={() => onDowngrade(item.type)}>Downgrade</button>
        </div>
      ))}
    </div>
  )
}

