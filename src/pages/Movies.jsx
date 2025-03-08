import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosTmdbApi from "../utils/axios";
import Movie from "../components/common/Movie";
import { TMDB_IMAGE_URL } from "../../constants.js";
import Pagination from "../components/common/Pagination.jsx";
import { handleScroll } from "../utils/handleScrol.js";
import MovieSkeleton from "../components/common/movieSkeleton.jsx";

const Movies = () => {
  const { endpoint, subEndpoint } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState([]);
  const [filter, setFilter] = useState("movie?media_type=movie");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);
  const [title, setTitle] = useState("Movies");
  const totalPages = 500;

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      let url = "";

      if (filterChanged) {
        url = `/discover/${filter}&page=${page}`;
      } else if (endpoint && subEndpoint) {
        url = `/${endpoint}/${subEndpoint}?page=${page}`;
        getTitleFromUrl(url);
      } else {
        url = `/discover/${filter}&page=${page}`;
      }

      const response = await axiosTmdbApi.get(url);
      setMovieData(response.data.results);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCategory = (category) => {
    setFilter(category);
    setFilterChanged(true);
    setPage(1);

    navigate("/movies");
  };

  useEffect(() => {
    fetchMovies();
    handleScroll();

    return () => {
      setFilterChanged(false);
    };
  }, [filter, page, endpoint, subEndpoint]);

  const getTitleFromUrl = (url) => {
    let splitedUrl = url.split("/").slice(2, 3).toString();
    const movieType = splitedUrl.split("?").slice(0, 1);
    setTitle(movieType + " movies");
  };

  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] min-h-screen">
      <div className="max-w-screen-xl mx-auto pb-[60px]">
        <div className="px-[30px] py-[30px]">
          <div className="flex justify-center md:justify-start">
            <div className="md:flex justify-between items-center w-full">
              <h1 className="font-medium text-3xl text-center text-white mb-2">{title}</h1>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    handleChangeCategory("movie?media_type=movie");
                    setTitle("movies");
                  }}
                  className={`${
                    filter === "movie?media_type=movie" ? "border-3 border-black" : ""
                  } text-white cursor-pointer bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-2 md:px-5 md:py-3`}
                >
                  Movies
                </button>
                <button
                  onClick={() => {
                    handleChangeCategory("movie?with_genres=16");
                    setTitle("cartoon");
                  }}
                  className={`${
                    filter === "movie?with_genres=16" ? "border-3 border-black" : ""
                  } text-white cursor-pointer bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-2 md:px-5 md:py-3`}
                >
                  Cartoon
                </button>
                <button
                  onClick={() => {
                    handleChangeCategory("tv?media_type=tv");
                    setTitle("tv series");
                  }}
                  className={`${
                    filter === "tv?media_type=tv" ? "border-3 border-black" : ""
                  } text-white cursor-pointer bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-2 md:px-5 md:py-3`}
                >
                  Tv series
                </button>
              </div>
            </div>
          </div>
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {isLoading
              ? Array.from({ length: 20 }).map((_, index) => <MovieSkeleton key={index} />)
              : movieData?.map((movie) => (
                  <Link to={`/movie/${movie.id}`} key={movie.id} className="p-2">
                    <Movie
                      date={movie.release_date}
                      img={`${TMDB_IMAGE_URL}${movie.backdrop_path}`}
                      title={filter === "tv?media_type=tv" ? movie.original_name : movie.original_title}
                      rating={movie.vote_average}
                    />
                  </Link>
                ))}
          </div>
        </div>
        <div className="flex justify-center md:block md:ml-[33px]">
          <Pagination isLoading={isLoading} setPage={setPage} page={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Movies;
