import { I_PROFILE } from "../../utils/interface";
type ICollectProps = {
  profile?: I_PROFILE;
  index?: number;
};
const ArtistCard = ({ profile, index }: ICollectProps) => {
  return (
    <div className="flex flex-col py-4 cursor-pointer w-full">
      <div className="flex text-sm w-full">
        <div className="w-full">
          <div className="flex justify-between  my-3">
            <div className="font-semibold">{profile?.username}</div>
          </div>
          <img
            src={profile?.avatarLink}
            alt="test"
            className="primary-nft w-full"
          />
        </div>
        <div className="nft-price text-end">
        |
          <span className="text-xs tracking-widest"  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}> TOP {index! + 1}</span>
          </div>
      </div>
    </div>
  );
};

export default ArtistCard;
