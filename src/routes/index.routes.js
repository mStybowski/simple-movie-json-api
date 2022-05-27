const express = require("express");
const { validateData } = require("../middleware/index.js");
const {
  addMovieController,
  getMoviesController,
} = require("../controllers/index.controller");

const router = express.Router();

router.post("/add", validateData, addMovieController);
router.get("/get", getMoviesController);

module.exports = router;
