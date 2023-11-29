import ConnectWallet from "./ConnectWallet";
// import { useTheme } from "../../context";
import LinkWithSearchParams from "../LinkWithSearchParams";
import navBarLogo from "../../assets/navbar_logo.svg";
const Navbar = () => {
  // const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center py-12 max-w-[1024px] mx-auto sm:px-8 lg:px-0">
      <LinkWithSearchParams
        to={{
          pathname: "/",
        }}
      >
       <img width="220" height="100" src={navBarLogo} alt="Somethingrare Logo"></img>
      </LinkWithSearchParams>

        <div className="flex">
        <LinkWithSearchParams
          to={{
            pathname: "/earn",
          }}
        >
          <div className="font-special mr-[30px] hover:opacity-50 cursor-pointer">
            EARN<br></br>KEYS
          </div>
        </LinkWithSearchParams>
          
        {/* <button className="rounded-full text-3xl h-12 w-12 hover:bg-gray-200 flex justify-center items-center">
          <SiMarketo />
        </button> */}
        {/* <button
          className="rounded-full text-3xl h-12 w-12 hover:bg-gray-200 flex justify-center items-center"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <AiOutlineSetting /> : <FaMoon />}
        </button> */}
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
