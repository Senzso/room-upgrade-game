'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGameStore } from '@/lib/store'
import { titleFont, textFont } from '@/lib/fonts'

export default function UserSetup() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const setGameUsername = useGameStore((state) => state.setUsername)
  const address = useGameStore((state) => state.address)

  useEffect(() => {
    if (!address) {
      router.push('/')
    }
  }, [address, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setGameUsername(username)
      router.push('/game')
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`${textFont.className} text-sm text-gray-300`}>
                Trader Name
              </label>
              <Input
                type="text"
                placeholder="Enter your trader name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`
                  ${textFont.className} bg-[#2a2435] border-gray-700 
                  text-white mt-1 h-12 text-lg
                `}
                required
              />
            </div>
            <Button 
              type="submit"
              disabled={!username.trim()}
              className={`
                w-full bg-emerald-500 hover:bg-emerald-600 text-white 
                ${textFont.className} font-medium py-6 text-lg
              `}
            >
              Start Trading
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

