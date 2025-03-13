import React from "react";
import { Link } from "react-router-dom";
import Movie from "../../components/common/Movie.jsx";
import { sliderSettings } from "../../../constants.js";
import Slider from "react-slick";
import { TMDB_IMAGE_URL } from "../../../constants.js";

const SimilarMovies = ({ similarMovies }) => {
  return (
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
  );
};

export default SimilarMovies;
