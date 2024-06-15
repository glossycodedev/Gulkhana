import React from 'react';

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <div className="flex justify-between items-center pb-3">
      <div className="flex gap-3 items-center">
        <h2 className="text-md text-[#5c5a5a]">Display</h2>
        <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
      >
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="100">100</option>
      </select>
      </div>
     
      <div className="flex gap-3 items-center">
        {/* <h2 className="text-md text-[#5c5a5a] ">Search</h2> */}
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
          type="text"
          placeholder="search"
        />
      </div>
    </div>
  );
};

export default Search;
