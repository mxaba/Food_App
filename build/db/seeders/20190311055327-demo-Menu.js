'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Menus", [{
      meals: '{"name":" chicken chops" }',
      catererId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      tableName: "Menus"
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Menus", null, {});
  }
};
//# sourceMappingURL=20190311055327-demo-Menu.js.map