import { ColorMode, Network, NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
// Set the network (Mainnet is default)
export const TEZOS_COLLECT_NETWORK: Network = {
  type:
    process.env.NODE_ENV === "development"
      ? NetworkType.GHOSTNET
      : NetworkType.MAINNET,
};

const MAINNET_RPC_URL: string = "https://mainnet.api.tez.ie";
const GHOSTNET_RPC_URL: string = "https://rpc.tzkt.io/ghostnet";

const TEZOS_COLLECT_RPC_URL =
  TEZOS_COLLECT_NETWORK.type === NetworkType.GHOSTNET
    ? GHOSTNET_RPC_URL
    : MAINNET_RPC_URL;
export const Tezos = new TezosToolkit(TEZOS_COLLECT_RPC_URL);
export const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxM2MwOGZEQjVCMDNGQWRkYzVEYWE1ODk5ZkY4NjY5YWE2ZGZBRDAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDUwODU3OTgwNCwibmFtZSI6IkdlbmVzeSJ9.ZTjxdK3K9Rr14USOXMCcrOkvBCuyVi6MKlI7Uhv4ufg";
// Create a new DAppClient instance
export const TEZOS_COLLECT_WALLET = new BeaconWallet({
  name: "Genesy",
  preferredNetwork: TEZOS_COLLECT_NETWORK.type,
  colorMode: ColorMode.LIGHT,
});

const MARKETPLACE_ADDRESSES = {
  ghostnet: "KT1NYiNGxNLN46HAsfBXebFziDWbKKuy2T5c",
  kathmandunet: "",
  mainnet: "",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

const NFT_ADDRESSES = {
  ghostnet: "KT1VLxr4LNMvwHs5TeEc2LzGapKFz5yuy1PW",
  kathmandunet: "",
  mainnet: "",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

export const VAULT_ADDRESS = "tz1VL5AfvZ3Cz6Bd2c2agcUQe7HKxje7ojNu";

export const MARKETPLACE_CONTRACT_ADDRESS =
  MARKETPLACE_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const NFT_CONTRACT_ADDRESS = NFT_ADDRESSES[TEZOS_COLLECT_NETWORK.type];
export const BSC_TEZOS_ADDRESS = "0x16939ef78684453bfdfb47825f8a5f714f12623a";
export const CONVALENT_KEY = "ckey_09503fb8f80d43a1b46a5b9da34";
export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://192.168.113.103:80"
    : "https://api.genesy.xyz";
