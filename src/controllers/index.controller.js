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
  console.dir(req.query);
  const { duration, genres } = req.query;

  const genresParsed = JSON.parse(genres);
  const durationParsed = Number(duration);

  const returningArray = await getMovies(durationParsed, genresParsed);

  res.send(returningArray);
};

module.exports = { addMovieController, getMoviesController };
