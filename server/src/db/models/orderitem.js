'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    mealId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, { tableName: "OderItem"});
  OrderItem.associate = (models) => {
    this.hasMany(models.Meals, {
      foreignKey: "Meals",
      constraint: true,
      onDelete: "CASCADE"
    });
  };
  return OrderItem;
};