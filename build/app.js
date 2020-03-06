"use strict";

require("@babel/polyfill");

var express = require("express");

var logger = require("morgan");

var bodyParser = require("body-parser");

var Routes = require("./routes/routes");

var sequelize = require("./db/db");

var fileUpload = require("express-fileupload");

var cors = require("cors");

var _require = require("dotenv"),
    config = _require.config;

var router = require("./routes/routes");

var _require2 = require("os"),
    userInfo = _require2.userInfo; //var swaggerDocument = require"./swagger.json";


config();
var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  res.send("Welcome to My Food_App..");
});
app.use(cors());
app.use(fileUpload());
app.use("/api/v1", Routes); //app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("App started and listening on port: ".concat(port));
});
sequelize.sync().then(function () {
  console.log("DB Connection has been established");
  app.listen(process.env.PORT, function () {
    app.emit("dbConnected");
  });
}).catch(function (err) {
  console.error("Unable to connect to the database:", err);
});
module.exports = app;
//# sourceMappingURL=app.js.map