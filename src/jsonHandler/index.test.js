/* eslint-disable no-undef */
const { getMovies } = require("./index.js");

test("returns movie with duration +/- 10", async () => {
  const duration = 100;

  const returnedMovies = await getMovies(duration);

  returnedMovies.forEach((movie) => {
    const runtime = Number(movie.runtime);
    expect(runtime).toBeLessThanOrEqual(duration + 10);
    expect(runtime).toBeGreaterThanOrEqual(duration - 10);
  });
});
