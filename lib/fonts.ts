import { Press_Start_2P, Pixelify_Sans } from 'next/font/google'

export const titleFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})

export const textFont = Pixelify_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-pixelify'
})

