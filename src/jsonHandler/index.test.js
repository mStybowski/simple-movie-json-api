/* eslint-env jest */
const { getMovies, getDBObject } = require("./index.js");

test("returns movie with duration +/- 10", async () => {
  const duration = 100;

  const returnedMovies = await getMovies(duration);

  returnedMovies.forEach((movie) => {
    const runtime = Number(movie.runtime);
    expect(runtime).toBeLessThanOrEqual(duration + 10);
    expect(runtime).toBeGreaterThanOrEqual(duration - 10);
  });
});

test("returns movies with proper genre", async () => {
  const duration = "120";
  const genre = "Action";

  const returnedMovies = await getMovies(duration, genre);

  returnedMovies.forEach((movie) => {
    expect(movie.genres.includes(genre)).toBe(true);
  });
});

test("Creates proper DB object", async () => {
  const mockRequest = {
    body: {
      duration: 120,
      genres: "Action, Comedy",
      title: "someTitle",
      director: "someDirector",
      runtime: "120",
      year: "1999",
    },
  };

  const objectToSave = await getDBObject(mockRequest);

  const newMovies = objectToSave.movies;
  const lastMovie = newMovies[newMovies.length - 1];

  expect(lastMovie.title).toBe(mockRequest.body.title);
  expect(lastMovie.year).toBe(mockRequest.body.year);
  expect(lastMovie.runtime).toBe(mockRequest.body.runtime);
  expect(lastMovie.genres).toBe(mockRequest.body.genres);
  expect(lastMovie.director).toBe(mockRequest.body.director);
});
