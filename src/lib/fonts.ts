import { Inter, JetBrains_Mono, Lora } from 'next/font/google'

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const fontHeading = Lora({
  subsets: ['latin'],
  variable: '--font-heading',
}) 