"use strict";
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var configJson, sequelize = require('../config/config');

require('dotenv').config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db = {};

if (env === 'production') {
  sequelize = new Sequelize(
    process.env.DB_URL,
    {
      dialectOptions: {
        ssl: true,
        native: true,
      },
    },
  );
} else {
  // let sequeliz;
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) &&
     (file !== basename) &&
     (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
