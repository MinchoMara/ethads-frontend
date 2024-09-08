import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";

const clientId = "BOlXuYr5Axh4KEIDZr1j7M0F2UP7Fnza51qIKuN8gjkW24OQzroiCso2MPDjB1uTDaCDIoBhewHG9Z3KuzM-S00"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x66eee",
  rpcTarget: process.env.NEXT_PUBLIC_RPC_URL ?? "",
  displayName: "Arbitrum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.arbiscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdERaTvc4qtd3Oj98EbPvuI5diq9sKRuM2fw&s",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  chainConfig: { ...chainConfig, chainNamespace: CHAIN_NAMESPACES.EIP155 },
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
};

export const web3auth = new Web3Auth({
  ...web3AuthOptions,
});

const metamaskAdapter = new MetamaskAdapter({
  ...web3AuthOptions,
});

web3auth.configureAdapter(metamaskAdapter);
