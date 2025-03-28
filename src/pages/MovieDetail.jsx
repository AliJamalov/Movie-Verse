import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axiosTmdbApi from "../utils/axios";
import { axiosInstance } from "../utils/axios";
import { TMDB_IMAGE_URL } from "../../constants.js";
import { YOUTUBE_EMBED_URL } from "../../constants.js";
import { IoCalendarNumber } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleScroll } from "../utils/handleScrol.js";
import notExist from "../assets/images/not-exist.jfif";
import { useWishlistStore } from "../stores/wishlistStore.js";
import SimilarMovies from "../components/movieDetail/SimilarMovies.jsx";
import AddCommentInput from "../components/movieDetail/AddCommentInput.jsx";
import Comments from "../components/movieDetail/Comments.jsx";
import { useAuthStore } from "../stores/authStore.js";

const MovieDetail = () => {
  const { user } = useAuthStore();
  const { id } = useParams();
  const { addToWishlist, addLoading } = useWishlistStore();
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentOwner, setCommentOwner] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieById = async () => {
    setIsLoading(true);
    try {
      // Выполняем оба запроса параллельно
      const [movieResponse, videoResponse] = await Promise.all([
        axiosTmdbApi.get(`/movie/${id}`),
        axiosTmdbApi.get(`/movie/${id}/videos`),
      ]);

      setMovie(movieResponse.data);

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
    try {
      const response = await axiosTmdbApi.get(`/movie/${id}/similar`);
      setSimilarMovies(response.data?.results.slice(0, 8));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleAddToWishlist = (id) => {
    addToWishlist(id);
  };

  useEffect(() => {
    fetchMovieById();
    fetchSimilarMovies();
    fetchComments();
    handleScroll();
    setComments([]);
  }, [id]);

  useEffect(() => {
    if (user && comments.length > 0) {
      setCommentOwner(comments.some((comment) => comment?.userId?._id === user?._id));
    } else {
      setCommentOwner(false);
    }
  }, [user, comments]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <section className="py-8 md:py-16 relative">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            {/* Image */}
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto mb-6 lg:mb-0">
              {isLoading ? (
                <div className="md:w-[450px] h-[250px] animate-pulse bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-lg shadow-lg"></div>
              ) : (
                <img
                  src={movie?.backdrop_path ? `${TMDB_IMAGE_URL}${movie.backdrop_path}` : notExist}
                  alt={movie?.original_title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              )}
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
                <button
                  onClick={() => handleAddToWishlist(movie.id)}
                  disabled={addLoading}
                  className="flex cursor-pointer min-w-[150px] items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 transition-all duration-300"
                >
                  <AiOutlineHeart className="w-5 h-5 -ms-2 me-2 text-gray-900" />

                  {addLoading ? <CgSpinner size={20} className="animate-spin" /> : "Add to favorites"}
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
          <AddCommentInput fetchComments={fetchComments} id={id} />
          <Comments
            loading={loading}
            showComments={showComments}
            setShowComments={setShowComments}
            comments={comments}
            fetchComments={fetchComments}
            commentOwner={commentOwner}
          />

          {/* Similar Movies Section */}
          <SimilarMovies similarMovies={similarMovies} />
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
