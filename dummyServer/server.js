var express = require('express');
var logger = require('volleyball');
var bodyParser = require('body-parser');
var routes = require('./routes');


const port = process.env.PORT || 8000;
const app = express();

// log every request to
app.use(logger);

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


routes(app);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

