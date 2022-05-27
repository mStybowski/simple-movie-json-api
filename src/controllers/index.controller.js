const { getMovies, addMovie } = require("../jsonHandler/index.js");

const addMovieController = async (req, res) => {
  await addMovie(req);
  res.send("Movie added");
};

const getMoviesController = async (req, res) => {
  console.dir(req.query);
  const { duration, genres } = req.query;

  const genresParsed = JSON.parse(genres);
  const durationParsed = Number(duration);

  const returningArray = await getMovies(durationParsed, genresParsed);

  res.send(returningArray);
};

module.exports = { addMovieController, getMoviesController };
