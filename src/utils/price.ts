import axios from "axios";
import { TOKEN_CONTRACT_ADDRESS, TEZOS_COLLECT_NETWORK } from "./constants"

export const getTezosPrice = async (): Promise<number> => {
  try {
    const response = await axios.get("https://api.tzkt.io/v1/quotes/last");
    return parseFloat(response.data?.usd);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getUnitBalance = async (account:string): Promise<number> => {
  try {
    console.log()
    const res =  await axios.get(`https://api.${TEZOS_COLLECT_NETWORK.type}.tzkt.io/v1/tokens/balances?account=${account}&token.contract=${TOKEN_CONTRACT_ADDRESS}&token.tokenId=0&select=balance`);
    return res.data && res.data.length ? res.data[0] : {};
  } catch (error) {
    console.log(error);
    return 0;
  }
};
