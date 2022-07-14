# StakeDAO mini locker

## Features

See balances for:

- crv 0xd533a949740bb3306d119cc777fa900ba034cd52
- sdCRV 0xD1b5651E55D4CeeD36251c61c50C889B36F6abB5
- sdCRV-Gauge 0x7f50786A0b15723D741727882ee99a0BF34e3466

Swap crv for sdCRV
Stake sdCRV and receive sdCRV Gauge

## Getting Started

```bash
# Install Dependencies
yarn

# Run the development server
yarn dev
```

### ENV

Set Infura project ID

```bash
# Copy ENV File
cp .env.example .env.local
```

### Configs

- `src/appConfig.ts`: app name, title, SEO etc.
- `src/pages/_app.tsx`: chains, providers, wallet connectors

### Scripts

**Next.js**

```bash
# Build
yarn build

# Start server with build files
yarn start
```

**Prettier**

```bash
# Use Prettier to do Format Check for files under ./src
yarn fc

# Use Prettier to do Format Fix for files under ./src
yarn ff
```

### Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/), by the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## More

Learn about components of this kit is using:

- [Next.js](https://nextjs.org/) - React Framework by Vercel
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [Ethers.js](https://github.com/ethers-io/ethers.js/) - Compact library for interacting with Ethereum.
- [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [RainbowKit](https://rainbowkit.com/) - React library for wallet connections with dApp.
- [Headless UI](https://headlessui.dev/) - Unstyled, fully accessible UI components

## License

This app is open-source and licensed under the MIT license. For more details, check the [License file](LICENSE).
