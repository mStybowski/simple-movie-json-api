const jsonfile = require("jsonfile");
const file = "./data/db.json";

async function addNewMovie() {}

async function getMovies() {
  try {
    const readObject = await jsonfile.readFile(file);
    return readObject;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { addNewMovie, getMovies };
