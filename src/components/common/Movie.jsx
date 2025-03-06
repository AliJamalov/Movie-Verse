import React, { useState } from "react";

const Movie = ({ date, rating, img, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="max-w-sm rounded-lg mx-auto md:mx-0 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <img
        className={`w-full h-64 object-cover transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        src={img}
        alt={title}
        onLoad={() => setIsLoading(false)}
      />
      <div className="p-4 bg-gray-800 text-white">
        <p className="text-[22px] font-medium mb-2 truncate">{title}</p>
        <p className="text-gray-400 text-sm mb-2">{date}</p>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-2">⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
