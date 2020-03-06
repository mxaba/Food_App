'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    order: DataTypes.JSON,
    total: DataTypes.INTEGER,
    catererId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, { tableName: "Orders"});
  Orders.associate = (models) => {
    this.hasMany(models.CatererId, {
      foreignKey: "CatererId",
      constraint: true,
      onDelete: "CASCADE"
    });
  };
  return Orders;
};