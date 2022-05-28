const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mountRoutes = require("./routes/index.js");

const PORT = 3003;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const server = express();
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("combined", { stream: accessLogStream }));
server.use(cors());

mountRoutes(server);

function startServer() {
  return new Promise((resolve) =>
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      resolve();
    })
  );
}

function stopServer() {
  return new Promise((resolve) =>
    server.close(() => {
      console.log("Server stopped");
      resolve();
    })
  );
}

module.exports = { server, startServer, stopServer };
