import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { TMDB_IMAGE_URL } from "../../constants.js";
import { YOUTUBE_EMBED_URL } from "../../constants.js";
import { IoCalendarNumber } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import Movie from "../components/common/Movie.jsx";
import { sliderSettings } from "../../constants.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleScroll } from "../utils/handleScrol.js";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieById = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/movie/${id}`);
      setMovie(response.data);
      const videoResponse = await axiosInstance.get(`/movie/${id}/videos`);
      const trailer = videoResponse.data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
      if (trailer) {
        setVideoKey(trailer.key);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSimilarMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/movie/${id}/similar`);
      setSimilarMovies(response.data?.results.slice(0, 8));
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieById();
    fetchSimilarMovies();
    handleScroll();
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <section className="py-8 md:py-16 relative">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            {/* Image */}
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto mb-6 lg:mb-0">
              <img
                src={`${TMDB_IMAGE_URL}${movie?.backdrop_path}`}
                alt={movie?.original_title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              {/* Movie title */}
              <h1 className="text-xl font-semibold text-white sm:text-2xl">{movie?.original_title}</h1>

              {/* Movie details */}
              <div className="space-y-3 mt-4">
                {/* Run time */}
                <div className="flex items-center gap-2">
                  <MdOutlineAccessTime color="yellow" size={20} />
                  <p className="text-sm font-medium text-white">{movie?.runtime} min</p>
                </div>

                {/* Release date */}
                <div className="flex items-center gap-2">
                  <IoCalendarNumber color="yellow" size={20} />
                  <p className="text-sm font-medium text-white">{movie?.release_date}</p>
                </div>

                {/* Budget */}
                <div className="text-sm font-medium text-white">
                  Budget: ${movie?.budget?.toLocaleString() || "N/A"}
                </div>

                {/* Genres */}
                <div className="text-sm font-medium text-white">
                  Genres:{" "}
                  {movie?.genres?.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < movie?.genres.length - 1 && ", "}
                    </span>
                  ))}
                </div>

                {/* Tagline */}
                {movie?.tagline && (
                  <div className="text-sm font-medium text-white italic">Tagline: {movie?.tagline}</div>
                )}
              </div>

              <div className="mt-6 sm:mt-8">
                <button className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 transition-all duration-300">
                  <AiOutlineHeart className="w-5 h-5 -ms-2 me-2 text-gray-900" />
                  Add to favorites
                </button>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-700" />
              <p className="mb-6 text-white">{movie?.overview}</p>
            </div>
          </div>

          {/* Trailer Section */}
          {videoKey && (
            <div className="flex justify-center items-center w-full mt-12">
              <div className="w-full max-w-[900px] px-4 md:px-0">
                <iframe
                  className="w-full aspect-video rounded-lg shadow-lg"
                  src={`${YOUTUBE_EMBED_URL}${videoKey}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Similar Movies Section */}
          <div className="mt-12 px-4 2xl:px-0">
            <h2 className="text-white font-bold text-2xl mb-6">Similar Movies</h2>
            {similarMovies?.length > 0 ? (
              <Slider {...sliderSettings}>
                {similarMovies.map((movie) => (
                  <Link to={`/movie/${movie.id}`} key={movie.id} className="p-2">
                    <Movie
                      date={movie?.release_date}
                      img={`${TMDB_IMAGE_URL}${movie?.backdrop_path}`}
                      title={movie?.original_title}
                      rating={movie?.vote_average}
                    />
                  </Link>
                ))}
              </Slider>
            ) : (
              <p className="text-white text-center">No similar movies found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
