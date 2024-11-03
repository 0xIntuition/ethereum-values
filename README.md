# Community Values Experiment

## Overview

The **Community Values Experiment** is a collaborative project aimed at co-creating a **living, crowdsourced constitution** for the Ethereum community. Inspired by the concept of a "moral innovation," this experiment seeks to capture and continuously refine the core values that define the Ethereum ecosystem. Leveraging the **Intuition protocol**, community members can propose, vote on, and refine values, creating a shared framework that evolves alongside Ethereum.

## Background

Ethereum is more than a blockchain—it represents a set of shared values such as decentralization, autonomy, and transparency. However, as Ethereum grows, interpretations of these values can become fragmented. This experiment aims to preserve the integrity of Ethereum’s core values while allowing them to adapt to the changing landscape. By creating a dynamic constitution, we ensure that Ethereum remains aligned, resilient, and cohesive.

## Objectives

This experiment provides Ethereum community members with a platform to:
- **Propose Values**: Anyone can propose a value for the Ethereum community, defining its meaning and importance.
- **Vote and Stake on Values**: Community members can stake "for" or "against" specific values, contributing to a ranked list of values based on collective input.
- **Foster Discussion**: Each value links to a discussion thread, allowing community members to debate and refine value definitions.
- **Visualize Consensus**: The platform provides visualizations to show areas of agreement and divergence, helping members see where their views align with the broader community.

## Key Components

- **Value Definitions**: Values are proposed as individual "Atoms" with a clear description that aims to reduce ambiguity. Descriptions can be linked to external forum discussions for deeper engagement.
- **Claims**: Values are attached to Ethereum via claims (e.g., “Ethereum hasValue Decentralization”). Complex values may form a “value tree,” where specific values contain sub-values.
- **Voting and Staking**: Participants can stake on values to support or oppose them. Staking signals the community’s sentiment, with highly supported values rising to prominence.
- **Visualization**: Aggregated data enables visualization of voting patterns and community alignment, helping members understand community consensus and identify factions within the ecosystem.

## Getting Started

To participate in the Community Values Experiment, follow these steps:

1. **Install Dependencies**:
   ```shell
   pnpm i
2. Initialize your environment variables by copying the `.env.example` file to an `.env.local` file. Then, in `.env.local`, paste your **Privy App ID** from the [Privy console](https://console.privy.io) and an [**Alchemy API Key**](https://www.alchemy.com/). 
```sh
# In your terminal, create .env.local from .env.local.example
cp .env.local.example .env.local

# Add your Privy App ID to .env.local
NEXT_PUBLIC_PRIVY_APP_ID=<your-privy-app-id>
```

## Building locally

In your project directory, run `npm run dev`. You can now visit http://localhost:4000 to see your app and login with Privy!

## Check out:
- `app/page.tsx` for how to connect external wallets and create embedded wallets using Privy
- `components/providers.tsx` for how to wrap your app with the `PrivyProvider`, `WagmiProvider`, and `QueryClientProvider`
- `components/*.tsx` for examples of calling `wagmi` hooks. The components are named after hook they call; for example, `components/SignMessage.tsx` calls the `useSignMessage` hook. 

## Contributing

We welcome contributions from the Ethereum community! Here's how you can help:

1. **Submit Issues**: Report bugs or suggest features through GitHub issues
2. **Propose Values**: Create thoughtful proposals for new community values
3. **Code Contributions**: 
   - Fork the repository
   - Create a new branch for your feature
   - Submit a pull request with a clear description of your changes
   - Ensure your code follows existing style conventions
4. **Documentation**: Help improve our documentation and value descriptions
5. **Community Engagement**: Participate in discussions and help refine value definitions

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. This means you can:
- Use the code commercially
- Modify the code
- Distribute the code
- Use the code privately
- Sublicense the code

The only requirement is that you include the original copyright and license notice in any copy of the software/source.
