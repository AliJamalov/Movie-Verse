import React, { useEffect, useState } from "react";
import axiosTmdbApi from "../../utils/axios";
import { PiSpinnerBallThin } from "react-icons/pi";
import { IoCalendarNumber } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { YOUTUBE_EMBED_URL } from "../../../constants";
import {
  AnimatedTitleHeroSection,
  containerVariantsHeroSection,
  itemVariantsHeroSection,
} from "../../animations/Animations";
import { AnimatedButtonHeroSection } from "../../animations/Animations";
import { AnimatedButtonHeroSection2 } from "../../animations/Animations";
import { motion } from "framer-motion";
import { getRandomMovie } from "../../utils/getRandomMovie";
import { movies } from "../../../constants";

const HeroSection = () => {
  const [movieData, setMovieData] = useState({});
  const [movieId, setMovieId] = useState(27205);
  const [videoKey, setVideoKey] = useState(null);
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowTrailer = () => {
    setIsOpenTrailer((prev) => !prev);
  };

  const fetchMovieData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosTmdbApi.get(`/movie/${movieId}`);
      setMovieData(response.data);
      const videoResponse = await axiosTmdbApi.get(`/movie/${movieId}/videos`);
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

  const handleGetMovie = () => {
    const randomId = getRandomMovie(movies);
    setMovieId(randomId);
  };

  useEffect(() => {
    fetchMovieData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PiSpinnerBallThin className="animate-spin" color="yellow" size={50} />
      </div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 1.5, ease: "easeOut" },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="w-full h-[500px] md:min-h-screen relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isOpenTrailer && (
        <div className="flex justify-center items-center absolute w-full mt-[40px]">
          <div className="relative w-full max-w-[900px] z-50 px-[20px] md:px-0">
            <iframe
              className="w-full h-[calc(100vw*0.5625)] md:h-[500px]"
              src={`${YOUTUBE_EMBED_URL}${videoKey}`}
              title="Trailer"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <span onClick={handleShowTrailer} className="cursor-pointer absolute top-[-30px] right-[30px]">
              <IoMdClose color="yellow" size={30} />
            </span>
          </div>
        </div>
      )}
      <div className="max-w-screen-xl mx-auto px-[30px] xl:px-0 pt-[120px] lg:text-2xl">
        <AnimatedTitleHeroSection />
        <motion.div
          variants={containerVariantsHeroSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex items-center gap-4 mt-[20px]"
        >
          <motion.div variants={itemVariantsHeroSection} className="hidden md:flex items-center gap-2">
            <IoCalendarNumber color="yellow" size={20} />
            <p className="text-white font-medium">{movieData?.release_date}</p>
          </motion.div>

          <motion.p variants={itemVariantsHeroSection} className="text-white font-medium truncate">
            {movieData?.title}
          </motion.p>

          <motion.div variants={itemVariantsHeroSection} className="hidden md:flex items-center gap-2">
            {movieData?.genres?.map((genre, index) => (
              <motion.span key={genre.id} variants={itemVariantsHeroSection} className="text-white">
                <p className="text-white font-medium inline">{genre?.name}</p>
                {index < movieData?.genres.length - 1 && ", "}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={itemVariantsHeroSection} className="flex items-center gap-2">
            <MdOutlineAccessTime color="yellow" size={20} />
            <p className="text-white font-medium">{movieData?.runtime} min</p>
          </motion.div>
        </motion.div>
        <div className="flex flex-col gap-1 w-[200px]">
          <AnimatedButtonHeroSection handleShowTrailer={handleShowTrailer} />
          <AnimatedButtonHeroSection2 handleGetMovie={handleGetMovie} />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
