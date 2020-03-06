'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Meals", [{
      name: "Chicken Chops",
      price: 5000,
      quantity: 7,
      imageUrl: "https://whereismyspoon.co/wp-content/uploads/2018/07/jollof-rice-3.jpg",
      catererId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      tableName: "Meals"
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Meals", null, {});
  }
};
//# sourceMappingURL=20190311054016-demo-Meal.js.map