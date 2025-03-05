import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movie from "../common/Movie";
import { TMDB_IMAGE_URL } from "../../../constants";
import { sliderSettings } from "../../../constants";
import { motion } from "framer-motion";
import { AnimatedButtonShowAll } from "../../animations/Animations";
import { Link } from "react-router-dom";

const MoviesSection = ({ title, endpoint, bgImg }) => {
  const [moviesData, setMoviesData] = useState([]);

  const fetchMoviesData = async () => {
    try {
      const response = await axiosInstance.get(endpoint);
      setMoviesData(response.data?.results.slice(0, 8));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);

  return (
    <div
      className="w-screen max-w-full overflow-x-hidden relative"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-[30px] md:px-0 py-[50px]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white font-bold text-2xl md:text-5xl">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.05, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <Link to={"/movies"}>
            <AnimatedButtonShowAll />
          </Link>
        </div>
        <div>
          <Slider {...sliderSettings}>
            {moviesData?.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="p-2">
                <Movie
                  date={movie.release_date}
                  img={`${TMDB_IMAGE_URL}${movie.backdrop_path}`}
                  title={movie.original_title}
                  rating={movie.vote_average}
                />
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MoviesSection;
