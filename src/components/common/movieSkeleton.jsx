import React from "react";

const MovieSkeleton = () => {
  return (
    <div className="max-w-sm rounded-lg mx-auto md:mx-0 overflow-hidden shadow-lg animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-700"></div>

      {/* Content Placeholder */}
      <div className="p-4 bg-gray-800">
        <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2 mb-2"></div>
        <div className="h-5 bg-gray-600 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
