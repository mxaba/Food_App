var express = require('express');
var config = require('dotenv');
var logger = require('volleyball');
var bodyParser = require('body-parser');
var db = require('./src/models/index');
var routes = require('./src/routes');

config.config();

const port = process.env.PORT;

const app = express();

app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.all('/api*', (request, response) => {
  response.status(404).send('The API route you requested does not exist');
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`App Listening on port ${port}`);
  });
});

module.exports = app;
