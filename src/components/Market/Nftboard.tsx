import CollectCard from "./CollectCard";
import { useTezosCollectStore } from "../../store";
import LinkWithSearchParams from "../LinkWithSearchParams";
const Nftboard = ({ items }: any) => {
  const ratio = "1";
  const { findProfileById } = useTezosCollectStore();
  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {items?.slice(0, 8)?.map((item: any, index: number) => (
          <div key={index}>
            <LinkWithSearchParams
              to={{
                pathname: `/assets/${item.tokenId}`,
              }}
            >
              <CollectCard nft={item} profile={findProfileById(item.artist)} ratio={ratio} />
            </LinkWithSearchParams>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nftboard;
