import { useState, useEffect, useRef } from "react";
import LinkWithSearchParams from "./LinkWithSearchParams";
import SearchArtistCard from "./Market/SearchArtistCard";
import { API_ENDPOINT } from "../utils/constants";
import searchIcon from '../assets/search_icon.jpg';

const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchResultsRef = useRef<HTMLDivElement | null>(null);

    const handleSearch = async () => {
        try {
          const response = await fetch(`${API_ENDPOINT}/profiles/search/${searchInput}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
    
      const handleInputChange = (e:any) => {
        setSearchInput(e.target.value);
      };
      
      const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        // Prevent the click event from propagating to the parent container
        e.stopPropagation();
      };
      
      useEffect(() => {
        if (searchInput && isExpanded) {
          handleSearch();
        } else {
          setSearchResults([]);
        }
      }, [searchInput]);

      useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (
            // searchResultsRef.current &&
            // !searchResultsRef.current.contains(e.target as Node) &&
            e.target &&
            e.target instanceof Element && // Ensure e.target is an Element
            !e.target.closest(".search-input") // Check if the click is not on the input field or its descendants
          ) {
            setIsExpanded(false);
          }
        };
      
        document.addEventListener("mousedown", handleClickOutside);
      
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
      <div className={`search-input relative flex ${isExpanded ? "w-80" : "w-8"}`}>
        <button
          className="mt-2 h-[34px] w-[34px] bg-black text-white p-2 cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span role="img" aria-label="Search by Users" className="text-xl">
            <img src={searchIcon}  alt="Search Icon"/>
          </span>
        </button>
        <input
          type="text"
          className={`mt-2 h-[34px]  bg-black text-white p-2 transform-gpu transition-width ${
            isExpanded ? "w-72 outline-none" : "w-0"
          }`}
          placeholder="Search by User..."
          style={{ display: isExpanded ? "block" : "none" }}
          value={searchInput}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        {(searchResults.length > 0 && isExpanded) && (
        <div ref={searchResultsRef} className="w-80 bg-gray-200 absolute top-[42px] right-0 z-50" style={{backgroundColor: "rgba(229, 231, 235, 0.7)"}}>
          {searchResults.map((item: any, index: number) => (
            <div key={index}>
            <LinkWithSearchParams
              to={{
                pathname: `/profile/${item?.wallet}`,
              }}
            >
              <SearchArtistCard profile={item} index={index} />
            </LinkWithSearchParams>
          </div>
          ))}
        </div>
      )}
      </div>
    );
  };
  
  export default SearchBar;