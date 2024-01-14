import React, { useEffect, useState, useMemo } from "react";
import { TbMinusVertical, TbMinus } from "react-icons/tb";
import PrimaryFeed from "../components/Market/PrimaryFeed";
import SeconddaryFeed from "../components/Market/SeconddaryFeed";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
import LandTabs from "../components/Market/LandTabs";
import SearchBar from "../components/SearchBar";
import axios from "axios";

const Home = () => {
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
    <div className="max-w-[1024px] mx-auto pb-16 sm:px-8 lg:px-0">
      <div className="w-3/5 flex flex-col gap-5">
        <div className="font-special text-[18px]">A GAME OF SINGULARITIES</div>
      </div>
      <div className=" pb-2 mt-24">
        <div className="flex justify-between border-b-2 border-black">
          <div className="flex">
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
          <SearchBar></SearchBar>
        </div>
        
        <LandTabs />
      </div>
    </div>
  );
};

export default Home;
