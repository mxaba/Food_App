


module.exports = (sequelize, DataTypes) => {
  const Caterer = sequelize.define('Caterer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { tableName: 'Caterer'});
  Caterer.associate = (models) => {
    this.hasMany(models.Meals, {
      foreignKey: "Meals",
      constraint: true,
      onDelete: "CASCADE"
    });
    this.hasMany(models.Orders, {
      foreignKey: "Orders",
      constraint: true,
      onDelete: "CASCADE"
    });
  };
  return Caterer;
};

