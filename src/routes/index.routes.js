const express = require("express");
const {
  validatePostData,
  validateGetData,
} = require("../middleware/validator.js");
const {
  addMovieController,
  getMoviesController,
} = require("../controllers/index.controller");

const router = express.Router();

router.post("/movies", validatePostData, addMovieController);
router.get("/movies", validateGetData, getMoviesController);

module.exports = router;
