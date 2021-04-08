"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes.js");

var _env = require("./config/env.js");

var _db = require("./config/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 3000;
(0, _env.setEnviroment)(app);
(0, _db.connectToDB)();
(0, _routes.registerRoutes)(app);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Trivia Game listening at http://localhost:${port}`);
});