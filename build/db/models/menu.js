'use strict';

var _this = void 0;

module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    meals: DataTypes.JSON,
    catererId: DataTypes.INTEGER
  }, {
    tableName: "Menu"
  });

  Menu.associate = function (models) {
    _this.hasMany(models.Meals, {
      foreignKey: "Meals",
      constraint: true,
      onDelete: "CASCADE"
    });
  };

  return Menu;
};
//# sourceMappingURL=menu.js.map