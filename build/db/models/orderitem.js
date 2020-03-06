'use strict';

var _this = void 0;

module.exports = function (sequelize, DataTypes) {
  var OrderItem = sequelize.define('OrderItem', {
    mealId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    tableName: "OderItem"
  });

  OrderItem.associate = function (models) {
    _this.hasMany(models.Meals, {
      foreignKey: "Meals",
      constraint: true,
      onDelete: "CASCADE"
    });
  };

  return OrderItem;
};
//# sourceMappingURL=orderitem.js.map