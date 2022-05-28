const jsonfile = require("jsonfile");
const { getRandomNum } = require("../lib");
const file = "./data/db.json";

const getAvailableGenres = async () => {
  const { genres } = await fetchDB();
  return genres;
};

async function addMovie(req) {
  const DBObject = await fetchDB();
  const { movies: oldMovies } = DBObject;
  const newId = oldMovies.length + 1;

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

async function getRandomMovie() {
  const { movies } = await fetchDB();
  const randomIndex = getRandomNum(movies.length);
  return movies[randomIndex];
}

const getMovies = async (rawDuration, rawGenres) => {
  if (!rawDuration && !rawGenres) {
    return getRandomMovie();
  }

  const duration = rawDuration ? JSON.parse(rawDuration) : rawDuration;
  const genres = rawGenres ? rawGenres.split(",") : rawGenres;

  const getGenreScore = (movie) => {
    let score = 0;
    genres.forEach((requestedGenre) => {
      if (movie.genres.includes(requestedGenre)) {
        score++;
      }
    });
    return score;
  };

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
  const queriedMovies = filterByDuration(genredMovies);

  return queriedMovies;
};

module.exports = { getAvailableGenres, addMovie, getMovies };
