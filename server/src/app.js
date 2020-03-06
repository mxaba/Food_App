require("@babel/polyfill");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var Routes = require("./routes/routes");
var sequelize = require("./db/db");
var fileUpload = require("express-fileupload");
var cors = require("cors");
var { config } = require("dotenv");
var router = require("./routes/routes");
var { userInfo } = require("os");
//var swaggerDocument = require"./swagger.json";

config();
const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to My Food_App..");
});

app.use(cors());
app.use(fileUpload());
app.use("/api/v1", Routes);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const port = process.env.PORT || 8000;
 app.listen(port, () => {
 console.log(`App started and listening on port: ${port}`);
});

sequelize
  .sync()
  .then(() => {
    console.log("DB Connection has been established");
    app.listen(process.env.PORT, () => {
      app.emit("dbConnected");
    }); 
   

  })
  
  
  .catch(err => {
    console.error("Unable to connect to the database:", err);    
  });

module.exports = app;
