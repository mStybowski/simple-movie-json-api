const jsonfile = require("jsonfile");
const { getRandomNum } = require("../lib");
const file = "./data/db.json";

const getAvailableGenres = async () => {
  try {
    const { genres } = await fetchDB();
    return genres;
  } catch (error) {
    throw Error();
  }
};

async function getDBObject(req) {
  try {
    const { genres, title, year, runtime, director, actors, plot, posterUrl } =
      req.body;
    const DBObject = await fetchDB();
    const { movies: oldMovies } = DBObject;
    const newId = oldMovies.length + 1;
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
    return DBObject;
  } catch (error) {
    throw new Error("Could not create DB Object.");
  }
}

async function saveToDb(data) {
  try {
    await jsonfile.writeFile(file, data);
    return true;
  } catch (error) {
    throw new Error("Could not save movie to DB.");
  }
}

async function fetchDB() {
  try {
    const moviesObject = await jsonfile.readFile(file);
    return moviesObject;
  } catch (error) {
    throw Error();
  }
}

async function getRandomMovie() {
  try {
    const { movies } = await fetchDB();
    const randomIndex = getRandomNum(movies.length);
    return movies[randomIndex];
  } catch (error) {
    throw new Error("Could not get random movie.");
  }
}

const getMovies = async (rawDuration, rawGenres) => {
  if (!rawDuration && !rawGenres) {
    return getRandomMovie();
  }

  const duration = rawDuration ? Number(rawDuration) : rawDuration;
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

  try {
    const { movies: allMovies } = await fetchDB();
    const genredMovies = filterByGenre(allMovies);
    const queriedMovies = filterByDuration(genredMovies);

    return queriedMovies;
  } catch (error) {
    throw new Error("Could not get queried movies.");
  }
};

module.exports = { getAvailableGenres, getDBObject, getMovies, saveToDb };
