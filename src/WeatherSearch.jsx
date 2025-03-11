import React, { forwardRef } from "react";

const WeatherSearch = forwardRef(function WeatherSearch(props, ref) {
  return (
    <div className="flex items-center max-w-md mx-auto mt-10 overflow-hidden rounded-lg shadow-lg font-poppins bg-gradient-to-r from-blue-400 to-cyan-500">
      <input
        ref={ref}
        type="text"
        placeholder="Search City..."
        className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-200 bg-transparent outline-none focus:text-white"
        onKeyDown={(e) => {
          if (e.key === "Enter") props.handleSearch();
        }}
      />
      <button
        type="button"
        className="px-5 py-3 text-white bg-blue-500 hover:bg-blue-600"
        onClick={props.handleSearch}
      >
        Search
      </button>
    </div>
  );
});
export default WeatherSearch;
