"use client";

import WagmiProvider from "@/components/providers/WagmiProvider";
import { getQueryClient } from "@/app/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <WagmiProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
