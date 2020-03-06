'use strict';
module.exports = (sequelize, DataTypes) => {
    const Meal = sequelize.define('Meals', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            default: null
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        catererId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, { tableName: "Meals" });
    meal.associate = (models) => {
        this.hasMany(models.Menu,  {
          foreignKey: "Menu",
          constraint: true,
          onDelete: "CASCADE"
        });
        this.hasMany(models.Orders, {
            foreignKey: "Orders",
            constraint: true,
            onDelete: "CASCADE"
        });
        this.hasMany(models.CatererId, {
            foreignKey: "CatererId",
          constraint: true,
          onDelete: "CASCADE"
        });
    };
    return Meal;
};

