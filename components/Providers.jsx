'use client'
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { WagmiConfig, createClient, } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { polygonMumbai } from "wagmi/chains";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const chains = [polygonMumbai];
const client = createClient(
  getDefaultClient({
    appName: "icarus",
    alchemyId,
    chains,
  }),
);
export default function Providers({children}) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={client}>
          <ConnectKitProvider>
            {children}
          </ConnectKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </div>
  )
}
