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
  ghostnet: "KT1GHZGXy15DcqBYJKi3xu3X5KiHmjH4Py23",
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
  ghostnet: "KT1GQukuGjr9bk3kC5R1vJkofwLFti7NK5Pm",
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

export const VAULT_ADDRESS = "tz1cVm8jzr5MN6oH21p54HuWCi69qYzjo7MN";

export const MARKETPLACE_CONTRACT_ADDRESS =
  MARKETPLACE_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const NFT_CONTRACT_ADDRESS = NFT_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

// export const API_ENDPOINT =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:80"
//     : "https://api.genesy.xyz";

export const API_ENDPOINT = "https://api-staging.somethingrare.xyz";
