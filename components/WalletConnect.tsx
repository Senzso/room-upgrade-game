'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { connectWallet } from '@/lib/wallet'
import { useGameStore } from '@/lib/store'
import { titleFont, textFont } from '@/lib/fonts'

export default function WalletConnect() {
  const router = useRouter()
  const setWallet = useGameStore((state) => state.setWallet)
  const address = useGameStore((state) => state.address)

  useEffect(() => {
    if (address) {
      router.push('/setup')
    }
  }, [address, router])

  const handleConnect = async () => {
    const address = await connectWallet()
    if (address) {
      setWallet(address)
      router.push('/setup')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
      <Card className="w-[400px] bg-[#1a1625]/90 border-none">
        <CardHeader className="text-center space-y-2">
          <CardTitle className={`${titleFont.className} text-4xl text-yellow-400`}>
            Welcome to SOLife
          </CardTitle>
          <p className={`${textFont.className} text-lg text-gray-300`}>
            Solana Trading Life Simulator
          </p>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleConnect}
            className={`
              w-full bg-yellow-400 hover:bg-yellow-500 text-black 
              ${textFont.className} font-medium py-6 text-lg
            `}
          >
            Connect Phantom Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

