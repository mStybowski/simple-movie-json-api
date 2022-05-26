const jsonfile = require("jsonfile");
const { getRandomNum } = require("../lib");
const file = "./data/db.json";

async function addNewMovie() {}

async function getMovies(duration, genres, random) {
  try {
    const returningArray = [];
    const readObject = await jsonfile.readFile(file);
    if (random) {
      const numberOfMovies = readObject.movies.length;
      const randomIndex = getRandomNum(numberOfMovies);
      returningArray.push(readObject.movies[randomIndex]);
    }

    return returningArray;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { addNewMovie, getMovies };
