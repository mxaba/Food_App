'use strict';

var _this = void 0;

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'Users'
  });

  User.associate = function (models) {
    _this.hasMany(models.OrderItem, {
      foreignKey: "OrderItem",
      constraint: true,
      onDelete: "CASCADE"
    });

    _this.hasMany(models.Orders, {
      foreignKey: "Orders",
      constraint: true,
      onDelete: "CASCADE"
    });
  };

  return Users;
};
//# sourceMappingURL=users.js.map