import React, { useEffect, useState, useMemo } from "react";
import { TbMinusVertical, TbMinus } from "react-icons/tb";
import { FaSort } from "react-icons/fa";
import PrimaryFeed from "../components/Market/PrimaryFeed";
import SeconddaryFeed from "../components/Market/SeconddaryFeed";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
import LandTabs from "../components/Market/LandTabs";
const SortBoard = () => {
  return (
    <div className="absolute top-8 bg-white  w-32 right-0 menu-shadow">
      <div className="px-4 py-2 hover:bg-gray-200">Chronogical</div>
      <div className="px-4 py-2 hover:bg-gray-200">Curated</div>
    </div>
  );
};
const Home = () => {
  const [isControl, setIsControl] = useState<boolean>(false);
  const TAB_LIST = [
    {
      path: `/home/primary`,
      text: (
        <button className="w-6 h-6 flex justify-center items-center">
          <TbMinusVertical className="text-3xl" />
        </button>
      ),
    },
    {
      path: `/home/secondary`,
      text: (
        <button className="w-6 h-6  flex justify-center items-center">
          <TbMinus className="text-3xl " />
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="w-3/5 flex flex-col gap-5">
        <div className="uppercase font-bold text-2xl">sommething rare</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
      <div className=" pb-2 mt-24">
        <div className="flex border-b-2 border-black">
          {TAB_LIST.map((link, index) => (
            <LinkWithSearchParams
              key={index}
              className={({ isActive }: { isActive: boolean }) =>
                `flex flex-col font-medium ${
                  isActive ? "active-dot market-tap-active" : "market-tap"
                }`
              }
              to={{
                pathname: link.path,
              }}
            >
              <div className="text-center m-2">{link.text}</div>
            </LinkWithSearchParams>
          ))}
        </div>
        <div className="flex justify-end relative">
          <FaSort onClick={() => setIsControl(!isControl)} />
          {isControl && <SortBoard />}
        </div>
        <LandTabs />
      </div>
    </div>
  );
};

export default Home;
