'use client'

import { PublicKey } from '@solana/web3.js'

export async function connectWallet(): Promise<string | null> {
  try {
    const { solana } = window as any
    
    if (!solana?.isPhantom) {
      throw new Error('Phantom wallet not found')
    }

    const response = await solana.connect()
    return response.publicKey.toString()
  } catch (error) {
    console.error('Error connecting wallet:', error)
    return null
  }
}

export async function disconnectWallet() {
  const { solana } = window as any
  if (solana?.isPhantom) {
    await solana.disconnect()
  }
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

