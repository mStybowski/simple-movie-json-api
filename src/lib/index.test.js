/* eslint-disable no-undef */
const { getRandomNum } = require("./index.js");

test("returns random number within 0 to max", () => {
  const results = [];
  for (let i = 0; i < 500; i++) {
    results.push(getRandomNum(500));
  }
  results.forEach((value) => {
    expect(value).toBeLessThanOrEqual(500);
    expect(value).toBeGreaterThanOrEqual(0);
  });
});
