'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Meals",
      [
        {
          name: "Chicken Chops",
          price: 5000,
          quantity: 7,
          imageUrl:
            "https://whereismyspoon.co/wp-content/uploads/2018/07/jollof-rice-3.jpg",
          catererId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { tableName: "Meals" }
    );
  },

  

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Meals", null, {});
  }
};
