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

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to add support for new chains and wallet providers.

## Supported Chains

- **Monad Testnet** (Chain ID: 10143)
- **Sei Testnet** (Chain ID: 1328)
- **Ethereum Sepolia** (Chain ID: 11155111)

## Supported Wallet Providers

- **Wagmi + ConnectKit** - Popular React hooks for Ethereum
- **Dynamic Labs** - Multi-chain wallet provider

## License

MIT