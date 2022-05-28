const { check, validationResult } = require("express-validator");
const { getAvailableGenres } = require("../jsonHandler/index.js");

const validatePostData = async (req, res, next) => {
  const availableGenres = await getAvailableGenres();
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

      console.log(genres);
      console.log(availableGenres);
      genres.forEach((genre) => {
        if (!availableGenres.includes(genre)) {
          isInputLegit = false;
        }
      });

      return isInputLegit;
    })
    .withMessage(`You can only choose these genres: ${availableGenres}`)
    .run(req);
  await check("title")
    .exists({ checkFalsy: true })
    .withMessage("No title field")
    .bail()
    .isString()
    .withMessage("Title should be string")
    .notEmpty()
    .run(req);
  await check("year")
    .exists({ checkFalsy: true })
    .withMessage("No year field")
    .bail()
    .isNumeric()
    .withMessage("Year needs to be numeric")
    .notEmpty()
    .run(req);
  await check("runtime")
    .exists({ checkFalsy: true })
    .withMessage("No runtime field")
    .bail()
    .isNumeric()
    .withMessage("Runtime needs to be numeric")
    .notEmpty()
    .run(req);
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
  await check("actors")
    .optional()
    .isString()
    .withMessage("Actors should be string")
    .notEmpty()
    .run(req);
  await check("plot")
    .optional()
    .isString()
    .withMessage("Plot should be string")
    .notEmpty()
    .run(req);
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
};

const validateGetData = async (req, res, next) => {
  await check("duration")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Duration cannot be empty")
    .run(req);
  await check("genres")
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
};

module.exports = { validatePostData, validateGetData };
