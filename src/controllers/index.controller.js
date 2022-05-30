const { getMovies, getDBObject, saveToDb } = require("../jsonHandler/index.js");
const STATUS_CODES = require("./statusCodes.js");

const addMovieController = async (req, res) => {
  try {
    const newMovieObject = await getDBObject(req);
    try {
      saveToDb(newMovieObject);
      res.status(STATUS_CODES.CREATED).json({ success: "Movie added" });
    } catch (error) {
      res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: error.message });
    }
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

const getMoviesController = async (req, res) => {
  const { duration, genres } = req.query;

  try {
    const returningArray = await getMovies(duration, genres);
    res.status(STATUS_CODES.OK).send(returningArray);
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { addMovieController, getMoviesController };
