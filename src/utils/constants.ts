import { ColorMode, Network, NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
// Set the network (Mainnet is default)
// export const TEZOS_COLLECT_NETWORK: Network = {
//   type:
//     process.env.NODE_ENV === "development"
//       ? NetworkType.GHOSTNET
//       : NetworkType.MAINNET,
// };

export const TEZOS_COLLECT_NETWORK: Network = {
  type: NetworkType.GHOSTNET,
};

const MAINNET_RPC_URL: string = "https://mainnet.api.tez.ie";
const GHOSTNET_RPC_URL: string = "https://rpc.tzkt.io/ghostnet";

export const PROFILES_API_URL : string = "https://api.tzprofiles.com/";
export const PROFILES_URL : string = "https://tzprofiles.com/";

const TEZOS_COLLECT_RPC_URL =
  TEZOS_COLLECT_NETWORK.type === NetworkType.GHOSTNET
    ? GHOSTNET_RPC_URL
    : MAINNET_RPC_URL;
export const Tezos = new TezosToolkit(TEZOS_COLLECT_RPC_URL);

// Create a new DAppClient instance
export const TEZOS_COLLECT_WALLET = new BeaconWallet({
  name: "SomethingRare",
  preferredNetwork: TEZOS_COLLECT_NETWORK.type,
  colorMode: ColorMode.LIGHT,
});

const MARKETPLACE_ADDRESSES = {
  ghostnet: "KT1NoQx1risQWgaFjKwSoei6bcrYNH5e4TLZ",
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
  ghostnet: "KT18cqtfxocYRLjk7QLioodVHXNmMYLVHEfW",
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

const TOKEN_ADDRESSES = {
  ghostnet: "KT1NmECCf7Pv4qkSPJ1RqRyfEPYfENswLN7e",
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
}

export const VAULT_ADDRESS = "tz1cVm8jzr5MN6oH21p54HuWCi69qYzjo7MN";

export const MARKETPLACE_CONTRACT_ADDRESS =
  MARKETPLACE_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const NFT_CONTRACT_ADDRESS = NFT_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const TOKEN_CONTRACT_ADDRESS = TOKEN_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

// export const API_ENDPOINT =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:80"
//     : "https://api.somethingrare.xyz";

export const API_ENDPOINT = "https://api-staging.somethingrare.xyz";
