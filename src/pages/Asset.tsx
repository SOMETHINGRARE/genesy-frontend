import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTezosCollectStore } from "../store";
import { IoLink } from "react-icons/io5";
import user from "../assets/user.svg";
import { dateFormat } from "../utils/utils";
import { useParams } from "react-router-dom";
import { I_NFT, I_Log, I_PROFILE } from "../utils/interface";
import { API_ENDPOINT, NFT_CONTRACT_ADDRESS } from "../utils/constants";
import axios from "axios";
import { getTezosPrice } from "../utils/price";
import spinner from "../assets/spinner.svg";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
const PeersBoard = ({ peers }: any) => {
  return (
    <div className="absolute top-20 bg-white  w-60 left-0 menu-shadow py-6 px-10 ">
      <div className="overflow-y-auto max-h-52">
        {peers?.map((item: any, index: any) => (
          <div key={index}>
            <LinkWithSearchParams
              to={{
                pathname: `/profile/${item?.wallet}`,
              }}
              className="flex items-center gap-4 my-2"
            >
              <img src={item?.avatarLink} alt="avatar" className="w-6 h-6" />
              <div className="text-ellipsis">{item?.username}</div>
            </LinkWithSearchParams>
          </div>
        ))}
      </div>
    </div>
  );
};

const Asset = () => {
  const { tokenId } = useParams();
  const {
    buyForSale,
    cancelForSale,
    listForSale,
    activeAddress,
    fetchProfile,
  } = useTezosCollectStore();
  const [profile, setProfile] = useState<I_PROFILE | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<I_Log[]>([]);
  const [isPeers, setIsPeers] = useState<boolean>(false);
  const [peers, setPeers] = useState<any>(null);
  const [marketState, setMarketState] = useState<boolean>(false);
  const [salePrice, setSalePrice] = useState<string>("");
  const [nftItem, setNftItem] = useState<I_NFT>({
    artist: "",
    description: "",
    imageLink: "",
    name: "",
    owner: "",
  });
  const onBuyForSale = async () => {
    let log: any = {
      timestamp: new Date(),
      content: [
        {
          text: `${profile?.username}`,
          link: `${profile?.wallet}`,
        },
        {
          text: "bought from",
          link: "",
        },
        {
          text: `${nftItem.ownerObj?.username}`,
          link: `${nftItem.ownerObj?.wallet}`,
        },
        {
          text: "for",
          link: "",
        },
        {
          text: `${nftItem.price} XTZ`,
          link: "",
        },
      ],
    };
    try {
      setMarketState(true);
      await buyForSale(parseFloat(tokenId!), nftItem?.price!);
      await axios.put(`${API_ENDPOINT}/nfts/${tokenId}`, {
        owner: activeAddress,
        price: 0,
        lastSoldAt: new Date(),
        lastSoldAmount: nftItem?.price!,
      });
      await axios.put(
        `${API_ENDPOINT}/profiles/itemSale/${
          nftItem.artistObj?.wallet
        }/${nftItem?.price!}`
      );
      await axios.post(`${API_ENDPOINT}/nfts/log/${tokenId}`, log);
      setMarketState(false);
    } catch (error) {
      console.log(error);
      setMarketState(false);
    }
  };

  const onCancelForSale = async () => {
    let log: any = {
      timestamp: new Date(),
      content: [
        {
          text: `${nftItem.ownerObj?.username}`,
          link: `${nftItem.ownerObj?.wallet}`,
        },
        {
          text: "canceled",
          link: "",
        },
        {
          text: `${nftItem.name}`,
          link: "",
        },
      ],
    };
    try {
      setMarketState(true);
      await cancelForSale(parseFloat(tokenId!));
      await axios.put(`${API_ENDPOINT}/nfts/${tokenId}`, {
        price: 0,
      });
      await axios.post(`${API_ENDPOINT}/nfts/log/${tokenId}`, log);
      setMarketState(false);
    } catch (error) {
      setMarketState(false);
      console.log(error);
    }
  };

  const onListForSale = async () => {
    let log: any = {
      timestamp: new Date(),
      content: [
        {
          text: `${nftItem.ownerObj?.username}`,
          link: `${nftItem.ownerObj?.wallet}`,
        },
        {
          text: "listed",
          link: "",
        },
        {
          text: `${nftItem.name}`,
          link: "",
        },
        {
          text: "for",
          link: "",
        },
        {
          text: `${salePrice} XTZ`,
          link: "",
        },
      ],
    };
    let includingOperator = false;
    if (parseFloat(salePrice) > 0) {
      try {
        setMarketState(true);
        await listForSale(
          parseFloat(tokenId!),
          includingOperator,
          parseFloat(salePrice)
        );
        await axios.put(`${API_ENDPOINT}/nfts/${tokenId}`, {
          price: salePrice,
        });
        await axios.post(`${API_ENDPOINT}/nfts/log/${tokenId}`, log);
        setMarketState(false);
      } catch (error) {
        setMarketState(false);
        console.log(error);
      }
    } else {
      console.log("Error");
    }
  };
  useState(() => {
    const fetchUser = async () => {
      let res = await fetchProfile(activeAddress);
      setProfile(res);
    };
    fetchUser();
  });

  useEffect(() => {
    const loadNftItem = async () => {
      setLoading(true);
      const { data: _nftItems }: { data: I_NFT } = await axios.get(
        `${API_ENDPOINT}/nfts/${tokenId}`
      );
      console.log("_nftItems", _nftItems);
      if(activeAddress) {
        let peer = await axios.get(
          `${API_ENDPOINT}/nfts/peers/${_nftItems?.artist}/${activeAddress}`
        );
        setPeers(peer.data);
      }
      let res = await axios.get(`${API_ENDPOINT}/nfts/log/${tokenId}`);
      setLogs(res.data?.reverse());
      let _price = await getTezosPrice();
      // setPrice((_nftItems.price || 0) * _price);
      setNftItem(_nftItems);
      setLoading(false);
    };
    loadNftItem();
  }, [tokenId, marketState]);
  return loading ? (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex justify-between gap-24">
        <div className="w-1/2">
          <Skeleton height={460} />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <Skeleton height={35} />
          <div className="my-4">
            <Skeleton height={35} width={150} />
            <Skeleton height={35} />
          </div>
          <div className="my-4">
            <Skeleton height={35} width={150} />
            <Skeleton height={35} />
          </div>
          <div className="my-4">
            <Skeleton height={35} width={150} />
            <Skeleton height={35} />
          </div>
          <div className="my-8">
            <Skeleton height={50} width={200} />
          </div>
        </div>
      </div>
      <div>
        <Skeleton height={40} width={200} />
        <div className="pt-4">
          <Skeleton count={3} height={20} width={350} />
        </div>
        <div className="pt-4">
          <Skeleton height={30} width={350} />
        </div>
        <div className="pt-4">
          <Skeleton height={30} width={350} />
        </div>
        <div className="pt-4">
          <Skeleton height={30} width={250} />
        </div>
      </div>
      <div className="pt-8">
        <Skeleton height={40} width={200} />
        <div className="pt-4">
          <Skeleton count={3} height={20} width={350} />
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex gap-24 max-h-[545px]">
        <img src={nftItem.imageLink} alt="test" className="max-h-full w-1/2" />
        <div className="w-1/2 flex flex-col gap-4 justify-between">
          <div className="text-4xl font-semibold">{nftItem.name}</div>
          <div className="mt-16">
            <div className="flex gap-2">
              <div className="border-b-2 border-black w-5"></div>
              <div className="text-xs text-gray-400">CREATED BY</div>
            </div>
            <div className="flex gap-2 items-center my-4 mb-2">
              <img
                src={nftItem.artistObj?.avatarLink}
                alt="user"
                className="w-6 h-6"
              />
              <div className="text-xl font-semibold">
                <LinkWithSearchParams
                  to={{
                    pathname: `/profile/${nftItem?.artistObj?.wallet}`,
                  }}
                  className="text-xl"
                >
                  {nftItem.artistObj?.username}
                </LinkWithSearchParams>
              </div>
            </div>
            <div className="relative">
            <div className="text-sm">Friends Supporters</div>
            {peers?.length! > 0 && (
              <div className="flex gap-2 mt-2 my-4 items-center hover:cursor-pointer">
                {peers?.slice(0, 3)?.map((item: any, index: any) => (
                  <div key={index}>
                    <LinkWithSearchParams
                      to={{
                        pathname: `/profile/${item?.wallet}`,
                      }}
                    >
                      <img src={item?.avatarLink} alt="avatar" className="w-6 h-6" />
                    </LinkWithSearchParams>
                  </div>
                ))}
                {peers?.length! > 3 && (
                  <div className="font-semibold text-2xl " onClick={() => setIsPeers(!isPeers)}>
                    + {peers?.length! - 3} others
                  </div>
                )}
              </div>
            )}
            {isPeers && <PeersBoard peers={peers} />}
          </div>
            {(!peers || !peers?.length) && (
              <div className="relative min-w-0 min-h-[60px]">
              </div>
            )}
          </div>
          
          <div>
            <div className="flex gap-2">
              <div className="border-b-2 border-black w-5"></div>
              <div className="text-xs text-gray-400">COLLECTED BY</div>
            </div>
            <div className="flex gap-2 items-center  my-4">
              <img
                src={nftItem.ownerObj?.avatarLink}
                alt="user"
                className="w-6 h-6"
              />
              <div className="font-normal">
                <LinkWithSearchParams
                  to={{
                    pathname: `/profile/${nftItem?.ownerObj?.wallet}`,
                  }}
                  className="text-xl font-semibold"
                >
                  {nftItem.ownerObj?.username}
                </LinkWithSearchParams>
              </div>
            </div>
          </div>
          {activeAddress === nftItem.owner ? (
            nftItem.price === 0 || nftItem.price === null ? (
              <div>
                <div>
                  <div>
                    <input
                      type="text"
                      name="price"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="outline-none border-b border-black text-center my-4"
                      placeholder="Enter Price(XTZ)"
                    />
                    {/* <div>__ PRICE</div>
                    <div className="flex gap-2 items-center  my-4">
                      <div className="">
                        <span className="text-2xl font-bold">
                          {nftItem.price} XTZ
                        </span>
                        USD {String(price).slice(0, 5)}
                      </div>
                    </div> */}
                  </div>
                  <button
                    className="w-48 bg-black text-white py-2 hover:bg-gray-500"
                    onClick={() => onListForSale()}
                    disabled={marketState}
                  >
                    {marketState ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={spinner}
                          alt="spinner"
                          className="inline mr-3 w-4 h-4 text-white animate-spin"
                        />
                        LIST FOR SALE...
                      </div>
                    ) : (
                      <div>LIST FOR SALE</div>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-[40px]">
                <div>
                  <div>
                    <div className="flex gap-2">
                      <div className="border-b-2 border-black w-5"></div>
                      <div className="text-xs text-gray-400">PRICE</div>
                    </div>
                    <div className="flex gap-2 items-center  my-4">
                      <div className="">
                        <span className="text-2xl font-bold">
                          {nftItem.price} XTZ
                        </span>
                        {/* USD {String(price).slice(0, 5)} */}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-48 bg-black text-white py-2 hover:bg-gray-500"
                    onClick={() => onCancelForSale()}
                    disabled={marketState}
                  >
                    {marketState ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={spinner}
                          alt="spinner"
                          className="inline mr-3 w-4 h-4 text-white animate-spin"
                        />
                        CANCEL SALE...
                      </div>
                    ) : (
                      <div>CANCEL SALE</div>
                    )}
                  </button>
                </div>
              </div>
            )
          ) : nftItem.price === 0 ? (
            <div className="min-w-0 min-h-[120px]"></div>
          ) : (
            <div className="mt-[40px]">
              <div>
                <div className="flex gap-2">
                  <div className="border-b-2 border-black w-5"></div>
                  <div className="text-xs text-gray-400">PRICE</div>
                </div>

                <div className="flex gap-2 items-center  my-4">
                  <div className="">
                    <span className="text-xl font-semibold">
                      {nftItem.price} XTZ
                    </span>
                    {/* USD {String(price).slice(0, 5)} */}
                  </div>
                </div>
              </div>
              <button
                className="w-32 bg-black text-white py-2 hover:bg-gray-500"
                onClick={() => onBuyForSale()}
              >
                BUY NOW
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-2 text-2xl font-normal py-8 pb-4">
          <div className="border-b-2 border-black w-5"></div>
          <div className="text-[24px] font-semibold">Description</div>
        </div>
        <div className="py-4 text-[15px]">{nftItem.description}</div>
        <div className="flex gap-4 py-2">
          <div className="text-xs text-gray-400">ROYALTIES</div>
          <div className="text-xs">{nftItem?.royalty}%</div>
        </div>
        <div className="flex gap-4 py-2">
          <div className="text-xs text-gray-400">ADDRESS</div>
          <div className="text-xs">{NFT_CONTRACT_ADDRESS}</div>
        </div>
        <div className="flex gap-4 font-bold py-4">
          <div className="flex items-center gap-4">
            <IoLink />
            <a
              href={`https://ghostnet.tzkt.io/${NFT_CONTRACT_ADDRESS}/operations/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
            >
              TzKT
            </a>
          </div>
          <div className="flex items-center gap-4">
            <IoLink />
            <a
              href={nftItem.imageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
            >
              IPFS
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 text-2xl font-normal py-8">
          <div className="border-b-2 border-black w-5"></div>
          <div className="text-[20px] font-semibold">History</div>
        </div>
        <div className="flex flex-col gap-4">
  {logs?.map((item, index) => (
    <div key={index} className="grid grid-cols-5 gap-8">
      <div className="text-xs text-gray-400" style={{ gridColumn: "span 1" }}>{dateFormat(item?.timestamp)}</div>
      <div className="flex gap-2" style={{ gridColumn: "span 4" }}>
        {item.content?.map((content, index) => (
          <div key={index} className="text-xs">
            {content.link.length > 0 ? (
              <LinkWithSearchParams
                to={{
                  pathname: `/profile/${content?.link}`,
                }}
                className="font-bold"
              >
                {content?.text}
              </LinkWithSearchParams>
            ) : (
              <span className={content?.text.includes("XTZ") ? "font-semibold" : ""}>
                {content?.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Asset;
