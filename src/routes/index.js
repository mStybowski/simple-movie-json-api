const index = require("./index.routes.js");

module.exports = (app) => {
  app.use("/", index);
};
