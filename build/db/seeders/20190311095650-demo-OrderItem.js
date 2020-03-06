'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("OrderItems", [{
      mealId: 2,
      quantity: 3,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      tableName: "OrderItems"
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("OrderItems", null, {});
  }
};
//# sourceMappingURL=20190311095650-demo-OrderItem.js.map