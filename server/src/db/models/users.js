'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { tableName: 'Users' });
  User.associate = (models) => {
    this.hasMany(models.OrderItem, {
      foreignKey: "OrderItem",
      constraint: true,
      onDelete: "CASCADE"
    });
    this.hasMany(models.Orders, {
      foreignKey: "Orders",
      constraint: true,
      onDelete: "CASCADE"
    });
  };
  return Users;
};