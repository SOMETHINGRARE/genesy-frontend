import React, { useEffect } from "react";
import { FiTwitter } from "react-icons/fi";
import LinkWithSearchParams from "../LinkWithSearchParams";
import footerLogo from "../../assets/footer_logo.svg";
const Footer = () => {
  return (
    <div className=" bg-black">
      <div className=" text-white flex justify-between py-12 h-60 max-w-[1024px] mx-auto sm:px-8 lg:px-0">
        <div className="flex flex-col justify-between">
          <LinkWithSearchParams
            className="w-[200px] h-[100px]"
            to={{
              pathname: "/",
            }}
          >
            {/* <div className="text-xl border-r-8 border-white pr-4 w-24">
              GENESY
            </div> */}
            <img src={footerLogo} alt="Somethingrare Logo"></img>
          </LinkWithSearchParams>
          <div className="ml-[8px]"><a href="https://docs.google.com/forms/d/1OnkPdYiERITcu_95VaD-jAp-IDzHvGtEBcAeTusTDYM/edit" target="_blank" rel="noopener noreferrer">ARTISTS APPLICATION</a></div>
        </div>
        <div className="flex flex-col justify-between">
          <div  className="text-[14px] font-semibold">We are experimenting...</div>
        </div>
        <div className="flex flex-col justify-between text-right text-sm">

            <LinkWithSearchParams
            className="text-[12px]"
              to={{
                pathname: "/faq",
              }}
            >
              About
            </LinkWithSearchParams>
            <LinkWithSearchParams
            className="text-[12px]"
              to={{
                pathname: "/term",
              }}
            >
              Terms and conditions
            </LinkWithSearchParams>
            <a className="text-[12px]" href="mailto: GM@somethingrare.xyz">GM@somethingrare.xyz</a>
          
            <div className="text-[12px]">FOLLOW US</div>
            <a
              href="https://twitter.com/_somethingrare"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] flex justify-end"
            >
              <FiTwitter />
            </a>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
