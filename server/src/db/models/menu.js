'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    meals: DataTypes.JSON,
    catererId: DataTypes.INTEGER
  }, { tableName: "Menu"});
  Menu.associate = (models) => {
    this.hasMany(models.Meals,  {
      foreignKey: "Meals",
      constraint: true,
      onDelete: "CASCADE"
    });
  };
  return Menu;
};