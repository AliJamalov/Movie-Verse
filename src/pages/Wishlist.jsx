import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../stores/wishlistStore";
import axiosTmdbApi from "../utils/axios";
import Movie from "../components/common/Movie";
import { TMDB_IMAGE_URL } from "../../constants";
import { preventLinkNavigation } from "../utils/preventLinkNavigation";

const Wishlist = () => {
  const { fetchLoading, fetchWishlist, moviesId, deletMovieFromWishlist } = useWishlistStore();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (!moviesId || moviesId.length === 0) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const movieRequests = moviesId.map((id) => axiosTmdbApi.get(`/movie/${id}`));
        const responses = await Promise.all(movieRequests);
        const moviesData = responses.map((res) => res.data);
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching wishlist movies:", error);
      }
    };

    fetchMovies();
  }, [moviesId]);

  const handleDelete = async (id) => {
    try {
      await deletMovieFromWishlist(id);
      await fetchWishlist();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-[30px]">
        <h1 className="md:text-3xl md:font-medium mb-[25px]">Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fetchLoading ? (
            <p>loading...</p>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="p-2">
                <Link onClick={preventLinkNavigation} to={`/movie/${movie.id}`}>
                  <Movie
                    date={movie.release_date}
                    img={`${TMDB_IMAGE_URL}${movie.backdrop_path}`}
                    title={movie.original_title || movie.original_name}
                    rating={movie.vote_average}
                    handleDelete={handleDelete}
                    id={movie.id}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
