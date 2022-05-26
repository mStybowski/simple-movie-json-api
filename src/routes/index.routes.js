const express = require("express");
const {
  addMovieController,
  getMoviesController,
} = require("../controllers/index.controller");

const router = express.Router();

router.post("/add", addMovieController);
router.get("/get", getMoviesController);

module.exports = router;
