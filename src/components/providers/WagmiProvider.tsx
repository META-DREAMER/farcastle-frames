import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { frameConnector } from "~/lib/connector";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  connectors: [frameConnector()],
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
