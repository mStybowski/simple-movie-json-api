const jsonfile = require("jsonfile");
const file = "./data/db.json";

const getMovies = async (duration, genres) => {
  // TODO: provide handler when neither duration nor genres given
  const fetchMovies = async () => {
    try {
      const moviesObject = await jsonfile.readFile(file);
      return moviesObject.movies;
    } catch (error) {
      console.error(error);
    }
  };

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

  const allMovies = await fetchMovies();
  const genredMovies = filterByGenre(allMovies);
  const durationFiltered = filterByDuration(genredMovies);
  const returningMovies = removeDuplicates(durationFiltered);

  return returningMovies;
};

async function addNewMovie() {}

module.exports = { addNewMovie, getMovies };
