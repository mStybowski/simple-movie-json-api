// - a list of genres (only predefined ones from db file) (required, array of predefined strings)
// - title (required, string, max 255 characters)
// - year (required, number)
// - runtime (required, number)
// - director (required, string, max 255 characters)

const { getMovies } = require("../jsonHandler/index.js");

const addMovieController = async (req, res) => {
  res.send("Add");
};

const getMoviesController = async (req, res) => {
  const { duration, genres } = req.params;
  let random = false;

  if (typeof duration === "undefined" && typeof genres === "undefined") {
    random = true;
  }

  const movies = await getMovies(duration, genres, random);
  res.send(movies);
};

module.exports = { addMovieController, getMoviesController };
