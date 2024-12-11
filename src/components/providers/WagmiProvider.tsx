import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { frameConnector } from "@/lib/connector";
// import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  connectors: [frameConnector()],
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}
