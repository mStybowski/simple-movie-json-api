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

router.post("/add", validatePostData, addMovieController);
router.get("/get", validateGetData, getMoviesController);

module.exports = router;
