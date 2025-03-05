export const getRandomMovie = (movies) => {
  let randomIndex = Math.floor(Math.random() * movies.length);
  let movie = movies[randomIndex];

  return movie.id;
};
