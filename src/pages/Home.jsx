import React from "react";
import HeroSection from "../components/home/HeroSection";
import MoviesSection from "../components/home/MoviesSection ";
import bgUpcoming from "../assets/images/bg.jpg";
import bgTopRated from "../assets/images/bg-3.jpg";
import bgNowPlaying from "../assets/images/bg2.jpg";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <MoviesSection title="Upcoming Movies" endpoint="/movie/upcoming" bgImg={bgUpcoming} />
      <MoviesSection title="Top Rated Movies" endpoint="/movie/top_rated" bgImg={bgTopRated} />
      <MoviesSection title="Now Playing Movies" endpoint="/movie/now_playing" bgImg={bgNowPlaying} />
    </div>
  );
};

export default Home;
