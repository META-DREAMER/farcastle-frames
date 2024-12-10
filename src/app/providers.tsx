"use client";

import WagmiProvider from "~/components/providers/WagmiProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider>{children}</WagmiProvider>;
}
