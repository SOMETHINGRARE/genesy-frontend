import keyLogo from "../assets/key_icon_black.jpg";
import code from "../assets/code.png";
import Frame from "../assets/Frame.png";
import React, { useState } from 'react';
import LinkWithSearchParams from "../components/LinkWithSearchParams";

const Earn = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
      <div className="relative font-special pb-[80px] flex flex-col justify-between items-center h-screen bg-black text-white">
        <LinkWithSearchParams
                to={{
                  pathname: "/",
                }}
              >
            <div
                className="absolute left-[40px] top-[40px] w-[17px] h-[17px] border-white border-solid border cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                >
                {isHovered ? (
                    <img src={Frame} alt="Box" />
                ) : null}
            </div>
        </LinkWithSearchParams>
        
        <div className="">
        <img
          height="160"
          width="160"
          src={keyLogo}
          alt="KEYS token logo"
        />
        </div>
        <div className="font-semibold text-[30px]">EARN UNI</div>
        <div className="mt-[60px] text-[65px]">THE GAME HAS BEGUN</div>
        <div className="mt-[60px]">
            <img height="80" width="160" src={code} alt="KEYS token logo"></img>
        </div>
        <div className="mt-[80px] font-semibold text-[20px]">**EACH ARTWORK YOU COLLECT GET 10% OF THE VALUE IN KEYS</div>
      </div>
    );
  };
  
  export default Earn;
  