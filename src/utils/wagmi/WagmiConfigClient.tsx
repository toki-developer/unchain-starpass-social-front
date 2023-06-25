"use client";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

const chains = [sepolia, localhost];
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export const WagmiConfigClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children} </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        // themeVariables={{
        //   "--w3m-accent-color": "#6E56CF", //TODO: 変数から取ってくるように修正したい
        // }}
      />
    </>
  );
};
