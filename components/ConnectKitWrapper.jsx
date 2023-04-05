'use client'
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

export default function ConnectKitWrapper({ children }) {
    return (
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    );
  }