'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Orders",
      [
        {
          order: '{"name":" chicken chops" }',
          catererId: 2,
          total: 60000,
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { tableName: "Orders" }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Orders", null, {});
  }
};
