const { hash } = require("../../utils/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'mxaba',
      email: 'mxaba.d@gmail.com',
      password: hash('esther96'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], { tableName: 'Users'});
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
