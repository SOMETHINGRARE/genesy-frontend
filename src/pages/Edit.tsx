import spinner from "../assets/spinner.svg";
import { useState, useEffect } from "react";
import ImageDropZone from "../components/ImageDropZone";
import { pinToIpfs } from "../utils/utils";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useTezosCollectStore } from "../store";
import { BsBookmark, BsTwitter } from "react-icons/bs";
import { PROFILES_API_URL, PROFILES_URL } from "../utils/constants"

const Edit = () => {
  const navigate = useNavigate();
  const orderType = ["Chronological", `Curate your own page with Flags`];
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [feed, setFeed] = useState<number>(0);
  const [avatar, setAvatar] = useState<string>("");
  const [base64image, setBase64image] = useState("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [imageObject, setImageObject] = useState<File | null>(null);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);

  const handleChange = (i: number) => {
    setFeed(i);
  };
  const { activeAddress, fetchProfile, fetchProfiles } = useTezosCollectStore();
  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${API_ENDPOINT}/profiles/${activeAddress}`);
        setDescription(res.data?.description);
        setTwitter(res.data?.twitter);
        setName(res.data?.username);
        setFeed(res.data?.feedOrder);
        setProfile(res.data?.avatarLink);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function getTwitter(activeAddress: string) {
    setIsTwitterLoading(true);

    try {
      const metadata = await axios.get(`${PROFILES_API_URL}${activeAddress}`)
      console.log(metadata)
      if (metadata.data && Array.isArray(metadata.data) && metadata.data.length > 0) {
        const jsonData = JSON.parse(metadata.data[0][1]);
        const twitterHandle = jsonData.credentialSubject.sameAs;
        setTwitter(twitterHandle);
      } else {
        // Redirect the user to https://tzprofiles.com/
        window.open(`${PROFILES_URL}`, "_blank");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTwitterLoading(false);
    }
  }

  const updateProfile = async () => {
    if (imageObject) {
      try {
        setIsLoad(true);
        const cid = await pinToIpfs(imageObject);
        setProfile(`https://${cid}.ipfs.nftstorage.link`);
        let payload = {
          username: name,
          description: description,
          feedOrder: feed,
          avatarLink: `https://${cid}.ipfs.nftstorage.link`,
          twitter: twitter,
        };
        let res = await axios.put(
          `${API_ENDPOINT}/profiles/${activeAddress}`,
          payload
        );
        await fetchProfile(activeAddress);
        fetchProfiles();
        navigate(`/profile/${activeAddress}/owned`);
        setIsLoad(false);
      } catch (error) {
        console.log(error);
        setIsLoad(false);
      }
    } else {
      try {
        setIsLoad(true);
        let payload = {
          username: name,
          description: description,
          feedOrder: feed,
          avatarLink: profile,
          twitter: twitter,
        };
        let res = await axios.put(
          `${API_ENDPOINT}/profiles/${activeAddress}`,
          payload
        );
        await fetchProfile(activeAddress);
        fetchProfiles();
        navigate(`/profile/${activeAddress}/owned`);
        setIsLoad(false);
      } catch (error) {
        console.log(error);
        setIsLoad(false);
      }
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="w-96 flex flex-col">
        <div className="text-3xl">Edit Profile</div>

        <div className="flex flex-col py-4">
          <div className="text-sm py-2">USERNAME*</div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none border-b border-black text-xs"
            placeholder="Choose the username that will appear on your profile"
          />
        </div>
        <div className="flex flex-col py-4">
          <div className="text-sm py-2">DESCRIPTION*</div>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none border-b border-black text-xs"
            placeholder="Write a few words about who you are"
          />
        </div>
        <div className="flex flex-col py-4">
          <div className="text-sm py-2">TWITTER ACCOUNT*</div>
          <input
            type="text"
            name="twitter"
            value={twitter}
            // onChange={(e) => setTwitter(e.target.value)}
            className="outline-none border-b border-black text-xs"
            placeholder="Authorize with Twitter account from TzProfiles"
            disabled 
          />
        </div>
        <div className="py-4">
          <div className="text-sm py-2">FEED ORDER*</div>
          <div>
            {orderType.map((item, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="feed"
                  id={item}
                  value={feed}
                  checked={feed === i}
                  onChange={() => handleChange(i)}
                />
                <label htmlFor={item} className={`pl-1 ${i === 1 ? "inline-block" : ""}`}>
                  {i === 1 ? (
                    <span className="flex items-center">
                      {item}
                      <BsBookmark className="ml-[5px] font-bold" />
                    </span>
                  ) : (
                    item
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col py-4 gap-2 pr-16">
            <div className="text-sm py-2">UPLOAD IMAGE</div>
            <div className="flex">
              <ImageDropZone
                imageObject={imageObject}
                setImageObject={setImageObject}
              />
            </div>
          </div>
          <div className="flex flex-col py-4 gap-2">
            <div className="text-sm py-2">TWITTER ACCOUNT</div>
            <div className="flex">

              <button className="border border-black text-3xl flex items-center justify-center p-8"
             onClick={(event) => getTwitter(activeAddress)}
            >
              <BsTwitter className="hover:opacity-70"/>
            </button>
        
            
            </div>
          </div>
        </div>
        
        <button
          className="py-2 bg-black text-white w-32  my-4 hover:bg-gray-600"
          onClick={() => updateProfile()}
        >
          {isLoad ? (
            <div className="flex items-center justify-center">
              <img
                src={spinner}
                alt="spinner"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
              />
              UPDATING...
            </div>
          ) : isTwitterLoading ? (
            <div className="flex items-center justify-center">
              <img
                src={spinner}
                alt="spinner"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
              />
              FETCHING...
            </div>
          ) : (
            <div>UPDATE</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Edit;
