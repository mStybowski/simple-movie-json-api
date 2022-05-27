const { check, validationResult } = require("express-validator");

const validateData = async (req, res, next) => {
  await check("genres")
    .isArray({ min: 1 })
    .withMessage("Needs to be array with at least 1 item")
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
    .run(req);
  await check("title")
    .exists({ checkFalsy: true })
    .isString()
    .notEmpty()
    .run(req);
  await check("year")
    .exists({ checkFalsy: true })
    .isNumeric()
    .notEmpty()
    .run(req);
  await check("runtime")
    .exists({ checkFalsy: true })
    .isNumeric()
    .notEmpty()
    .run(req);
  await check("director")
    .exists({ checkFalsy: true })
    .isString()
    .notEmpty()
    .custom((value) => value.length <= 255)
    .run(req);
  await check("actors").optional().isString().notEmpty().run(req);
  await check("plot").optional().isString().notEmpty().run(req);
  await check("posterUrl").optional().isString().notEmpty().run(req);

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  } else {
    next();
  }
};

module.exports = { validateData };
