"use client";

import { WagmiConfig, createClient } from "wagmi";
import {
  ConnectKitProvider,
  getDefaultClient,
} from "connectkit";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;


const client = createClient(
  getDefaultClient({
    appName: "Eden",
    alchemyId,
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
