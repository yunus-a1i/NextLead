// components/SearchBar.jsx
import React, { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ location, keyword });
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <form 
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-xl rounded-xl -mt-10 z-20 relative"
      >
        <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-300">
          <FiMapPin className="text-gray-400 mr-2 text-xl" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 focus:outline-none"
          />
        </div>
        
        <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-300">
          <FiSearch className="text-gray-400 mr-2 text-xl" />
          <input
            type="text"
            placeholder="Job Title or Company"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 focus:outline-none"
          />
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md"
        >
          <FiSearch className="text-xl" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
