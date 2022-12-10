"use client";

import { WagmiConfig, createClient, chain } from "wagmi";
import {
  ConnectKitProvider,
  getDefaultClient,
} from "connectkit";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const chains = [chain.localhost, chain.goerli];

const client = createClient(
  getDefaultClient({
    appName: "Eden",
    alchemyId,
    chains,
  })
);

export default function ConnectKitWrapper({ children }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
