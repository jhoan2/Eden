"use client";

import { WagmiConfig, createClient } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  })
);

export default function ConnectKitWrapper({ children }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        {children}
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
