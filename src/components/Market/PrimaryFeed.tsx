import { useEffect, useState, useRef } from "react";
import CollectCard from "./CollectCard";
import { FaSort } from "react-icons/fa";
import { API_ENDPOINT } from "../../utils/constants";
import { I_NFT } from "../../utils/interface";
import axios from "axios";
import { useTezosCollectStore } from "../../store";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../../assets/spinner.svg";
interface propsType {
  setIsControl: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderBy: React.Dispatch<React.SetStateAction<number>>;
  orderBy: number;
}

const SortBoard = (props: propsType) => {
  const { activeAddress } = useTezosCollectStore();
  return (
    <div className="absolute top-8 bg-white  w-36 right-0 menu-shadow ">
      <div
        className={`${
          props.orderBy == 0 ? "bg-gray-200" : ""
        } px-4 py-2 hover:bg-gray-300`}
        onClick={() => {
          props.setOrderBy(0);
          props.setIsControl(false);
        }}
      >
        Chronogical
      </div>
      {activeAddress && (
        <div
          className={`${
            props.orderBy === 1 ? "bg-gray-200" : ""
          } px-4 py-2 hover:bg-gray-300`}
          onClick={() => {
            props.setOrderBy(1);
            props.setIsControl(false);
          }}
        >
          Under Radar
        </div>
      )}
    </div>
  );
};

const PrimaryFeed = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { activeAddress, findProfileById, profile, profileReady } = useTezosCollectStore();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsControl(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const [orderBy, setOrderBy] = useState<number>(profile.feedOrder);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      let _nftItems: I_NFT[] = []; 
      if(orderBy === 0) {
        _nftItems = await (await axios.get(
          `${API_ENDPOINT}/nfts/primary/${orderBy}/0/5`
        )).data;
        console.log(_nftItems)
      } else {
        _nftItems = await (await axios.get(
          `${API_ENDPOINT}/nfts/primary/${orderBy}/0/5/${activeAddress}`
        )).data;
      }

      setNftItems(_nftItems);
      setCurrentPage(0);
      if (_nftItems.length == 0) {
        setHasMoreItems(false);
      } else {
        setHasMoreItems(true);
      }
      setLoading(false);
    };
    if (profileReady) {
      console.log("profileReady", profileReady);
      fetchItem();
    }
  }, [orderBy, profileReady]);

  const fetchMoreData = async () => {
    if (profileReady) {
      console.log("profileReady", profileReady);
      setCurrentPage(currentPage! + 1);
      let _nftItems: I_NFT[] = []; 
      if(orderBy === 0) {
        _nftItems = (await axios.get(
            `${API_ENDPOINT}/nfts/primary/${orderBy}/${currentPage! + 1}/5`
          )).data;
      } else {
        _nftItems = (await axios.get(
            `${API_ENDPOINT}/nfts/primary/${orderBy}/${currentPage! + 1}/5/${activeAddress}`
          )).data;
      }
      if (_nftItems.length == 0) {
        setHasMoreItems(false);
      }
      setNftItems([...nftItems, ..._nftItems]);
    }
  };

  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  const [isControl, setIsControl] = useState<boolean>(false);
  const [friends, setFriends] = useState<string[]>([]);

  return (
    <div>
      <div className="flex justify-end relative mt-2" ref={ref}>
        <button
          className="hover:cursor-pointer"
          onClick={() => {
            setIsControl(!isControl);
            console.log("profile", profile);
          }}
        >
          <FaSort />
        </button>
        {isControl && (
          <SortBoard
            setIsControl={setIsControl}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          />
        )}
      </div>
      {!loading && nftItems.length ? 
      <InfiniteScroll
        dataLength={nftItems.length}
        next={fetchMoreData}
        hasMore={hasMoreItems}
        loader={
        <>
          <img
            src={spinner}
            alt="spinner"
            className="inline mr-3 w-4 h-4 text-white animate-spin"
          /> 
          <h4>Loading...</h4>
        </>
      }
      >
        <div className="flex gap-36">
          <div className="flex flex-col w-1/2 gap-10">
            {nftItems
              ?.filter((word, index) => index % 2 == 0)
              ?.map((item, index) => (
                <div className="flex w-full" key={index}>
                  <CollectCard
                    nft={item}
                    profile={findProfileById(item.artist)}
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-col w-1/2 items-end mt-[25%] gap-10">
            {nftItems
              ?.filter((word, index) => index % 2 == 1)
              ?.map((item, index) => (
                <div className="flex w-full" key={index}>
                  <CollectCard
                    nft={item}
                    profile={findProfileById(item.artist)}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
      :
      !loading && !nftItems.length ?
      <div className="flex flex-col items-center space-y-4 py-16">
        <span className="text-black">You have not flagged any users yet!</span>
        <div className="text-black">Flag other users to build your “Under Radar” curated feed based on what other users have already collected.  </div>
      </div>
      :
      <img
        src={spinner}
        alt="spinner"
        className="inline mr-3 w-4 h-4 text-white animate-spin"
      />
      }
    </div>
  );
};

export default PrimaryFeed;
