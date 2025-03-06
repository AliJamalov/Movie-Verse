import React from "react";
import search from "../../assets/icons/search.svg";

const SearchInput = ({ value, onChange, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <img src={search} className="w-5 h-5" alt="Search icon" />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
