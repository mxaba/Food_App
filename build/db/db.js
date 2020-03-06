"use strict";

var Sequelize = require('sequelize');

var _require = require('dotenv'),
    config = _require.config;

config();
var sequelize = new Sequelize("postgres://postgres:1@Samuel@localhost:5432/postgres", {
  logging: false
});
module.exports = sequelize;
//# sourceMappingURL=db.js.map