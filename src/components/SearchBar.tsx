import { useState, useEffect } from "react";
import LinkWithSearchParams from "./LinkWithSearchParams";
import SearchArtistCard from "./Market/SearchArtistCard";
import { API_ENDPOINT } from "../utils/constants";


const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
          const response = await fetch(`${API_ENDPOINT}/profiles/search/${searchInput}`);
          console.log(response)
          const data = await response.json();
          console.log( data)
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
    
      const handleInputChange = (e:any) => {
        setSearchInput(e.target.value);
      };
    
      useEffect(() => {
        if (searchInput && isExpanded) {
          handleSearch();
        } else {
          setSearchResults([]);
        }
      }, [searchInput]);

    return (
      <div className={`relative flex items-center ${isExpanded ? "w-72" : "w-12"}`}>
        <button
          className="h-[40px] bg-black text-white p-2 cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span role="img" aria-label="Search by Users" className="text-xl">
            🔍
          </span>
        </button>
        <input
          type="text"
          className={`bg-black text-white p-2 w-0 transform-gpu transition-width ${
            isExpanded ? "w-64 outline-none" : ""
          }`}
          placeholder="Search..."
          style={{ display: isExpanded ? "block" : "none" }}
          value={searchInput}
          onChange={handleInputChange}
        />
        {(searchResults.length > 0 && isExpanded) && (
        <div className="w-72 bg-gray-200 absolute top-[49px] right-0 z-50">
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