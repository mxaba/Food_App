'use strict';

var _this = void 0;

module.exports = function (sequelize, DataTypes) {
  var Orders = sequelize.define('Orders', {
    order: DataTypes.JSON,
    total: DataTypes.INTEGER,
    catererId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    tableName: "Orders"
  });

  Orders.associate = function (models) {
    _this.hasMany(models.CatererId, {
      foreignKey: "CatererId",
      constraint: true,
      onDelete: "CASCADE"
    });
  };

  return Orders;
};
//# sourceMappingURL=orders.js.map