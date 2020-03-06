"use strict";

var _this = void 0;

module.exports = function (sequelize, DataTypes) {
  var Caterer = sequelize.define('Caterer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'Caterer'
  });

  Caterer.associate = function (models) {
    _this.hasMany(models.Meals, {
      foreignKey: "Meals",
      constraint: true,
      onDelete: "CASCADE"
    });

    _this.hasMany(models.Orders, {
      foreignKey: "Orders",
      constraint: true,
      onDelete: "CASCADE"
    });
  };

  return Caterer;
};
//# sourceMappingURL=caterer.js.map