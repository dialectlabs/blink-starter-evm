# EVM Blink Starter Template

A template repository for creating [Blinks](https://docs.dialect.to/blinks/) on EVM-compatible blockchains. This template supports multiple chains and wallet providers through a two-dimensional template system.

> ⚠️ **This repository is a template - do not clone or run directly!**  
> Use `npx create-blinks-app` to generate a project from this template.

## Quick Start

To create a new Blink project:

```bash
npx create-blinks-app
```

Follow the prompts to select:
- **Wallet Provider**: Wagmi + ConnectKit or Dynamic Labs
- **Blockchain**: Monad Testnet, Sei Testnet, or Ethereum Sepolia

## Architecture

This template uses a **two-dimensional system** that separates wallet-specific code from chain-specific configuration:

```
templates/
├── wallets/
│   ├── wagmi/          # Wagmi + ConnectKit integration
│   │   ├── page.tsx
│   │   ├── provider.tsx
│   │   ├── navbar.tsx
│   │   ├── layout.tsx
│   │   └── env-additions
│   └── dynamic/        # Dynamic Labs integration
│       ├── page.tsx
│       ├── provider.tsx
│       ├── navbar.tsx
│       ├── layout.tsx
│       └── env-additions
└── chains/
    ├── monad/          # Monad Testnet
    │   ├── config.ts
    │   ├── env-additions
    │   ├── logo.png
    │   └── blink-image.png
    ├── sei/            # Sei Testnet
    └── sepolia/        # Ethereum Sepolia
```

### Template System Benefits

- **Modular**: Wallet and chain concerns are completely separated
- **Extensible**: Add new chains or wallets without touching existing code
- **Environment-driven**: Chain-specific branding and configuration via environment variables
- **Type-safe**: Each chain uses official viem/wagmi chain definitions

## Contributing

### Adding a New Chain

To add support for a new blockchain:

1. Create a new folder: `templates/chains/your-chain/`

2. Add required files:
   ```
   your-chain/
   ├── config.ts           # Wagmi configuration
   ├── env-additions       # Environment variables
   ├── logo.png           # Chain logo
   └── blink-image.png    # Blink preview image
   ```

3. **config.ts** - Use viem/wagmi chain definitions:
   ```typescript
   import { http, createConfig } from "wagmi";
   import { injected } from "wagmi/connectors";
   import { yourChain } from "viem/chains";

   export const config = createConfig({
     chains: [yourChain],
     connectors: [injected()],
     transports: {
       [yourChain.id]: http(),
     },
   });
   ```

4. **env-additions** - Environment variables for branding:
   ```bash
   NEXT_PUBLIC_CHAIN_ID=12345
   NEXT_PUBLIC_CHAIN_NAME="Your Chain"
   NEXT_PUBLIC_CHAIN_DISPLAY_NAME="Your Chain Testnet"
   NEXT_PUBLIC_TOKEN_SYMBOL="YOUR"
   NEXT_PUBLIC_RPC_URL="https://rpc.yourchain.xyz"
   DONATION_WALLET="0x..."
   ```

5. Open a PR - We will then test and update the CLI script to include your chain in the options.

### Adding a New Wallet Provider

To add support for a new wallet provider:

1. Create a new folder: `templates/wallets/your-wallet/`

2. Add required files:
   ```
   your-wallet/
   ├── page.tsx           # Main page with wallet integration
   ├── provider.tsx       # Wallet provider setup
   ├── navbar.tsx         # Navigation with wallet widget
   ├── layout.tsx         # App layout
   └── env-additions      # Wallet-specific env vars (optional)
   ```

3. Ensure your provider includes **both** your wallet provider and **WagmiProvider** (required for Blinks):
   ```typescript
   export const Providers = ({ children }: PropsWithChildren) => {
     return (
       <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
           <YourWalletProvider>
             {children}
           </YourWalletProvider>
         </QueryClientProvider>
       </WagmiProvider>
     );
   };
   ```

4. Open a PR - We will then test and update the CLI script to include your chain in the options.

## Supported Chains

- **Monad Testnet** (Chain ID: 10143)
- **Sei Testnet** (Chain ID: 1328)
- **Ethereum Sepolia** (Chain ID: 11155111)

## Supported Wallet Providers

- **Wagmi + ConnectKit** - Popular React hooks for Ethereum
- **Dynamic Labs** - Multi-chain wallet provider

## License

MIT