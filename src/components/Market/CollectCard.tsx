import { I_NFT, I_PROFILE } from "../../utils/interface";
import { dateDifFromNow } from "../../utils/utils";
import LinkWithSearchParams from "../LinkWithSearchParams";
import { LazyLoadImage } from "react-lazy-load-image-component";

type ICollectProps = {
  nft?: I_NFT;
  profile?: I_PROFILE;
};
const CollectCard = ({ nft, profile }: ICollectProps) => {
  console.log("nft", nft);
  return (
    <div className="flex flex-col py-4 cursor-pointer w-full">
      <LinkWithSearchParams
        to={{
          pathname: `/profile/${profile?.wallet}/created`,
        }}
      >
        <div className="flex gap-4 items-center pt-2">
          <LazyLoadImage
            src={profile?.avatarLink}
            alt="avatar"
            className="w-6 h-6"
          />
          <div className="font-semibold">{profile?.username}</div>
        </div>
      </LinkWithSearchParams>
      <div className="flex text-sm w-full">
        <div className="itemNft">
          <div className="flex justify-between  my-3 gap-4">
            <div className="text-xs truncate">{nft?.name}</div>
            <div className="text-xs truncate">
              {dateDifFromNow(
                (nft?.lastSoldAmount == 0 ? nft?.mintedAt : nft?.lastSoldAt) ||
                  new Date()
              )}
            </div>
          </div>
          <LinkWithSearchParams
            to={{
              pathname: `/assets/${nft?.tokenId!}`,
            }}
            className="w-full"
          >
            <LazyLoadImage
              // src={nft?.imageLink}
              src={nft?.thumbnailLink}
              alt="test"
              className="primary-nft w-[400px] h-auto w-full"
            />
          </LinkWithSearchParams>
        </div>
        <div className="ml-1 nft-price text-end flex justify-end">
          <div className="border-l h-8 border-black ml-[7px] mb-2" />
          <div className="text-xs">
            {nft?.lastSoldAmount == 0 ? nft?.price : nft?.lastSoldAmount} TZ
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectCard;
