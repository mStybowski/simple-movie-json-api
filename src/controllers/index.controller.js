const { getMovies, getDBObject, saveToDb } = require("../jsonHandler/index.js");
const STATUS_CODES = require("./statusCodes.js");

const addMovieController = async (req, res) => {
  try {
    const newMovieObject = await getDBObject(req);
    try {
      saveToDb(newMovieObject);
      res.status(STATUS_CODES.CREATED).send("Success: Movie added");
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_ERROR)
        .send(`${error.name}: ${error.message}`);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .send(`${error.name}: ${error.message}`);
  }
};

const getMoviesController = async (req, res) => {
  const { duration, genres } = req.query;

  try {
    const returningArray = await getMovies(duration, genres);
    res.status(STATUS_CODES.OK).send(returningArray);
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).send(error);
  }
};

module.exports = { addMovieController, getMoviesController };
