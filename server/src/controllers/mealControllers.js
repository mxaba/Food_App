var fs = require("fs");
//import Meal from "../models/meals";

class MealControllers {
  static async getMeal(req, res) {
    try {
      const meals = await Meal.findAll({
        where: { catererId: 2 }
      });
      return res.status(200).json({
        status: "success",
        message: "Meals Retrieved",
        data: meals
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Failed to Retrieve Meals"
      });
    }
  }

  static async postMeal(req, res) {
    try {
      const { name, price } = req.body;
      const { image } = req.files;
      const imageUrl = `/src/images/${image.name}`;
      const meal = await Meal.create({
        name,
        price,
        imageUrl,
        catererId: 2
      });
      await image.mv(`.${imageUrl}`);
      return res.status(201).json({
        status: "success",
        message: "Meal Option Added",
        data: meal
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    }
  }

  static async updateMealName(req, res) {
    try {
      const meal = await Meal.findOne({ where: { id: req.params.id } });
      if (!meal) {
        throw new Error(`Meal With ID ${req.params.id} does not exist`);
      }
      const mealUpdate = {
        name: req.body.name ? req.body.name : meal.name,
        price: req.body.price ? req.body.price : meal.price
      };
      if (req.files !== null) {
        const { image } = req.files;
        const imageUrl = `/src/images/${image.name}`;
        fs.unlink(`.${meal.imageUrl}`, err => {
          if (err) throw new Error(err.message);
        });
        mealUpdate.imageUrl = imageUrl;
        await image.mv(`.${imageUrl}`);
      } else {
        mealUpdate.imageUrl = meal.imageUrl;
      }
      const { name, price, imageUrl } = mealUpdate;
      await Meal.update(
        { name, price, imageUrl },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({
        status: "success",
        message: "Meal Option Updated"
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    }
  }

  static async deleteMeal(req, res) {
    try {
      const { id } = req.params;
      const meal = await Meal.findOne({ where: { id } });
      fs.unlink(`.${meal.imageUrl}`, err => {
        if (err) throw new Error(err.message);
      });
      await meal.destroy();
      return res.status(200).json({
        status: "success",
        message: "Meal Option Deleted"
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    }
  }

  
}


module.exports = MealControllers;
