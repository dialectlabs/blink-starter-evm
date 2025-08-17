import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { monadTestnet } from "viem/chains";

// Wagmi config for Monad Testnet
export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [monadTestnet.id]: http(),
  },
});