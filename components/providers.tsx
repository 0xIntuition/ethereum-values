'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { baseSepolia } from 'viem/chains';

import type { PrivyClientConfig } from '@privy-io/react-auth';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig } from '@privy-io/wagmi';

const client = new ApolloClient({
  uri: 'https://api.i7n.dev/v1/graphql',
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email', 'sms'],
  appearance: {
    showWalletLoginFirst: true,
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      apiUrl={process.env.NEXT_PUBLIC_PRIVY_AUTH_URL as string}
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={privyConfig}
    >
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
            {children}
          </WagmiProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </PrivyProvider>
  );
}
