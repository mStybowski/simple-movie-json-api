const { getMovies, addMovie } = require("../jsonHandler/index.js");

const addMovieController = async (req, res) => {
  await addMovie(req);
  res.send("Movie added");
};

const getMoviesController = async (req, res) => {
  const { duration, genres } = req.query;

  const returningArray = await getMovies(duration, genres);
  res.send(returningArray);
};

module.exports = { addMovieController, getMoviesController };
