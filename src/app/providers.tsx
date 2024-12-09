"use client";

import WagmiProvider from '~/components/providers/WagmiProvider'
import { DrawerCSSProvider } from '~/components/providers/DrawerProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
        {children}
    </WagmiProvider>
  )
}
