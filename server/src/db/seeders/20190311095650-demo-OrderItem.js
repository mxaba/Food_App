'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "OrderItems",
      [
        {
          mealId: 2,
          quantity: 3,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { tableName: "OrderItems" }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("OrderItems", null, {});
  }
};
