const { check, query, validationResult } = require("express-validator");
const { getAvailableGenres } = require("../jsonHandler/index.js");

const validatePostData = async (req, res, next) => {
  try {
    const availableGenres = await getAvailableGenres();
    try {
      // Body validation

      // genres
      await check("genres")
        .isArray({ min: 1 })
        .withMessage("Needs to be an array with at least 1 item")
        .bail()
        .custom((value) => {
          let isStringArray = true;

          value.forEach((el) => {
            if (typeof el !== "string") {
              isStringArray = false;
            }
          });

          return isStringArray;
        })
        .withMessage("Use strings in genres array")
        .custom((genres) => {
          let isInputLegit = true;

          genres.forEach((genre) => {
            if (!availableGenres.includes(genre)) {
              isInputLegit = false;
            }
          });

          return isInputLegit;
        })
        .withMessage(`You can only choose these genres: ${availableGenres}`)
        .run(req);

      // title
      await check("title")
        .exists({ checkFalsy: true })
        .withMessage("No title field")
        .bail()
        .isString()
        .withMessage("Title should be string")
        .notEmpty()
        .run(req);

      // year
      await check("year")
        .exists({ checkFalsy: true })
        .withMessage("No year field")
        .bail()
        .isNumeric()
        .withMessage("Year needs to be numeric")
        .notEmpty()
        .run(req);

      // runtime
      await check("runtime")
        .exists({ checkFalsy: true })
        .withMessage("No runtime field")
        .bail()
        .isNumeric()
        .withMessage("Runtime needs to be numeric")
        .notEmpty()
        .run(req);

      // director
      await check("director")
        .exists({ checkFalsy: true })
        .withMessage("No director field")
        .bail()
        .isString()
        .withMessage("Director should be string")
        .notEmpty()
        .custom((value) => value.length <= 255)
        .withMessage("Max length is 255 chars")
        .run(req);

      // actors
      await check("actors")
        .optional()
        .isString()
        .withMessage("Actors should be string")
        .notEmpty()
        .run(req);

      // plot
      await check("plot")
        .optional()
        .isString()
        .withMessage("Plot should be string")
        .notEmpty()
        .run(req);

      // posterUrl
      await check("posterUrl")
        .optional()
        .isString()
        .withMessage("posterUrl should be string")
        .notEmpty()
        .run(req);

      const result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      } else {
        next();
      }
    } catch (error) {
      throw new Error("Could not verify request body.");
    }
  } catch (error) {
    throw new Error("Could not connect to DB.");
  }
};

const validateGetData = async (req, res, next) => {
  try {
    // Params validation

    // duration
    await query("duration")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Duration cannot be empty")
      .run(req);

    // genres
    await query("genres")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("genres cannot be empty")
      .run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    } else {
      next();
    }
  } catch (error) {
    throw new error("Could not verify get params.");
  }
};

module.exports = { validatePostData, validateGetData };
