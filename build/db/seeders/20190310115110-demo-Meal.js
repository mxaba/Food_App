"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Meals", [{
      name: "Fried rice",
      price: 4000,
      quantity: 10,
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
//# sourceMappingURL=20190310115110-demo-Meal.js.map