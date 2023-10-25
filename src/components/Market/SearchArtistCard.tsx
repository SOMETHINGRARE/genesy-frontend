import { I_PROFILE } from "../../utils/interface";
type ICollectProps = {
  profile?: I_PROFILE;
  index?: number;
};
const SearchArtistCard = ({ profile, index }: ICollectProps) => {
  return (
    <div className="flex flex-col pl-4 py-4 cursor-pointer w-full hover:bg-gray-400">
      <div className="flex text-sm w-full">
        <div className="w-full flex">
          <img
            src={profile?.avatarLink}
            alt="test"
            className="w-[50px] h-[50px] primary-nft"
          />
          <div className="flex justify-between ml-1.5 my-3">
            <div>{profile?.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArtistCard;
