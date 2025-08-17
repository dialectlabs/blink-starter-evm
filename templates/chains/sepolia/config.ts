import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { sepolia } from "wagmi/chains";

// Wagmi config for Ethereum Sepolia
export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});