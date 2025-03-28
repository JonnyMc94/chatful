import React from "react";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    console.log(searchTerm);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit} className="w-full">
        <div className="relative">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            id="search-term"
            className="w-full placeholder:pl-6 h-14 p-4 pr-8 text-wrap text-gray-800 dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
            placeholder="Search here..."
            required
          />
          <span className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 cursor-pointer">
          <svg
              onClick={onSubmit}
              className="placeholder-gray-500 h-6 w-6 dark:text-teal-300"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
            </svg>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
