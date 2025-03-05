export const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/";

export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
      },
    },
  ],
};
