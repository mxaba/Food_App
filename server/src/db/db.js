var Sequelize = require('sequelize');
var { config } = require('dotenv');

config();

const sequelize = new Sequelize("postgres://postgres:1@Samuel@localhost:5432/postgres", {
    logging: false,

    
});

module.exports = sequelize;
