import React from "react";
import { TMDB_IMAGE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import notExist from "../../assets/images/not-exist.jfif";

const SearchResults = ({ movies, resetSearch }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <Link onClick={resetSearch} key={movie.id} to={`/movie/${movie.id}`}>
              <li className="flex items-center space-x-4 p-2 border-b">
                <img
                  src={movie.poster_path ? `${TMDB_IMAGE_URL}${movie.poster_path}` : notExist}
                  alt={movie.title}
                  className="w-15 h-20 object-cover rounded"
                />
                <span className="text-lg font-medium">{movie.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
