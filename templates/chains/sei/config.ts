import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { seiTestnet } from "viem/chains";

// Wagmi config for Sei Testnet
export const config = createConfig({
  chains: [seiTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [seiTestnet.id]: http(),
  },
});