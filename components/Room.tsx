import Image from 'next/image'
import { RoomItem } from '../types'

interface RoomProps {
  items: RoomItem[]
}

export default function Room({ items }: RoomProps) {
  return (
    <div className="relative w-full h-[600px]">
     <Image src="Room estructure.png" alt="Room" layout="fill" objectFit="contain" />
      {items.map((item, index) => (
        <div key={index} style={{ position: 'absolute', left: item.position.x, top: item.position.y }}>
          <Image src={item.image} alt={item.type} width={100} height={100} />
        </div>
      ))}
    </div>
  )
}

