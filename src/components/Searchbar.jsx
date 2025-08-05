import { useState, useEffect } from "react";
import locationIcon from "../assets/Icons/location_icon.png";
import webIcon from "../assets/Icons/cloudy.png";
import searchIcon from "../assets/Icons/search_icon.png";
import { BsSun, BsMoon } from "react-icons/bs";

function Searchbar({ city, country, setCity, theme, setTheme }) {
  const [inputValue, setInputValue] = useState(city);


  const handleKeyPress = (e) => {
  if (e.key === "Enter" && inputValue.trim()) {
    setCity(inputValue.trim());
    setInputValue(""); 
  }
};

const handleSearchClick = () => {
  if (inputValue.trim()) {
    setCity(inputValue.trim());
    setInputValue(""); 
  }
};


  return (
    <div className="px-6 my-4 py-2 max-w-6xl mx-auto bg-white shadow-lg rounded-2xl flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img className="w-8 h-8" src={webIcon} alt="Web icon" />
        <h1 className={`text-2xl font-bold `}>
          Skycast
        </h1>
      </div>

      <div className="flex items-center gap-2 text-gray-600 text-base">
        <img className="w-5 h-5" src={locationIcon} alt="Location icon" />
        <span>{city}, {country}</span>
      </div>

      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md shadow-inner">
        <img className="w-4 h-4 text-gray-500" src={searchIcon} alt="Search icon" />
        <input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyDown={handleKeyPress}
  placeholder="Search City..."
  className="ml-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-40"
/>

        <button
          onClick={handleSearchClick}
          className="ml-2 px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
