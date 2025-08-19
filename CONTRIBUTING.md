# Contributing to EVM Blink Starter

Thank you for your interest in contributing! We welcome contributions that help expand support for new chains and wallet providers.

## How to Contribute

### Adding a New Chain

To add support for a new blockchain:

1. **Create a new folder**: `templates/chains/your-chain/`

2. **Add required files**:
   ```
   your-chain/
   ├── config.ts           # Wagmi configuration
   ├── env-additions       # Environment variables
   ├── logo.png           # Chain logo (256x256 PNG recommended)
   └── blink-image.png    # Blink preview image (1200x630 PNG recommended)
   ```

3. **config.ts** - Use official viem/wagmi chain definitions:
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

5. **Open a Pull Request** - We will test your implementation and update the CLI script to include your chain in the selection options.

### Adding a New Wallet Provider

To add support for a new wallet provider:

1. **Create a new folder**: `templates/wallets/your-wallet/`

2. **Add required files**:
   ```
   your-wallet/
   ├── page.tsx           # Main page with wallet integration
   ├── provider.tsx       # Wallet provider setup
   ├── navbar.tsx         # Navigation with wallet widget
   ├── layout.tsx         # App layout
   └── env-additions      # Wallet-specific env vars (optional)
   ```

3. **Open a Pull Request** - We will test your implementation and update the CLI script to include your wallet provider in the selection options.

## Pull Request Guidelines

- Ensure your code follows the existing patterns and conventions
- Test your implementation thoroughly before submitting
- Provide clear documentation for any new features or configurations
- Include appropriate images (logos, preview images) with proper dimensions
- Make sure your changes don't break existing functionality

## Questions?

If you have questions about contributing, please open an issue for discussion before starting work on major changes.