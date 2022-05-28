const { getMovies, getDBObject, saveToDb } = require("../jsonHandler/index.js");

const addMovieController = async (req, res) => {
  const newMovieObject = await getDBObject(req);
  saveToDb(newMovieObject);
  res.send("Movie added");
};

const getMoviesController = async (req, res) => {
  const { duration, genres } = req.query;

  const returningArray = await getMovies(duration, genres);
  res.send(returningArray);
};

module.exports = { addMovieController, getMoviesController };
