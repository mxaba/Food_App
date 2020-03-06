"use strict";

var _require = require("../../utils/bcrypt"),
    hash = _require.hash;

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'davidfrank96',
      email: 'davidfrank96.d@gmail.com',
      password: hash('esther96'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      tableName: 'Users'
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
//# sourceMappingURL=20190310081244-demo-Users.js.map