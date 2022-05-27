const jsonfile = require("jsonfile");
const file = "./data/db.json";

async function addMovie(req) {
  const DBObject = await fetchDB();
  const { movies: oldMovies } = DBObject;
  const newId = oldMovies.length + 1;

  console.dir(req.body);

  const { genres, title, year, runtime, director } = req.body;

  const actors = req.body.actors;
  const plot = req.body.plot;
  const posterUrl = req.body.posterUrl;

  const newMovieObject = {
    id: newId,
    title,
    year,
    runtime,
    genres,
    director,
    ...(actors && { actors }),
    ...(plot && { plot }),
    ...(posterUrl && { posterUrl }),
  };

  const newMovies = oldMovies.concat(newMovieObject);
  DBObject.movies = newMovies;
  try {
    await jsonfile.writeFile(file, DBObject);
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchDB() {
  try {
    const moviesObject = await jsonfile.readFile(file);
    return moviesObject;
  } catch (error) {
    console.error(error);
  }
}

const getMovies = async (duration, genres) => {
  // TODO: provide handler when neither duration nor genres given

  const getGenreScore = (movie) => {
    let score = 0;
    genres.forEach((requestedGenre) => {
      if (movie.genres.includes(requestedGenre)) {
        score++;
      }
    });
    return score;
  };

  const removeDuplicates = (movies) => movies; // TODO

  const filterByGenre = (movies) => {
    if (typeof genres === "undefined") {
      return movies;
    } else {
      const genreScoreMap = {};
      const moviesArray = [];

      movies.forEach((movie) => {
        const genreScore = getGenreScore(movie);
        if (genreScore > 0) {
          genreScoreMap[movie.id] = genreScore;
          moviesArray.push(movie);
        }
      });

      const sortedMoviesArray = moviesArray.sort((movieA, movieB) => {
        return genreScoreMap[movieB.id] - genreScoreMap[movieA.id];
      });

      return sortedMoviesArray;
    }
  };

  const filterByDuration = (movies) => {
    if (typeof duration === "undefined") {
      return movies;
    } else {
      return movies.filter((movie) => {
        const movieRuntime = movie.runtime;
        return movieRuntime >= duration - 10 && movieRuntime <= duration + 10;
      });
    }
  };

  const { movies: allMovies } = await fetchDB();
  const genredMovies = filterByGenre(allMovies);
  const durationFiltered = filterByDuration(genredMovies);
  const returningMovies = removeDuplicates(durationFiltered);

  return returningMovies;
};

module.exports = { addMovie, getMovies };
