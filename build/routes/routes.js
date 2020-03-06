"use strict";

var express = require("express");

var trimRequest = require("trim-request");

var UserMiddleware = require("../middleware/user");

var CatererMiddleware = require("../middleware/caterer");

var MealMiddleware = require("../middleware/meal");

var OrderMiddleware = require("../middleware/order");

var OrderControllers = require("../controllers/orderControllers");

var menuControllers = require("../controllers/menuControllers");

var mealControllers = require("../controllers/mealControllers");

var CatererController = require("../controllers/catererControllers");

var AuthController = require("../controllers/authControllers");

var UserController = require("../controllers/userControllers");

var router = express.Router(); //Orders routes

router.get("/orders", AuthController.verifyAdminToken, OrderControllers.getOrder);
router.post("/orders", trimRequest.body, AuthController.verifyAdminToken, OrderMiddleware.validateModifyOrder, OrderControllers.postOrder);
router.put("/orders/:id", trimRequest.body, AuthController.verifyAdminToken, OrderControllers.updateOrderName);
router.post("/orders/checkout", trimRequest.body, AuthController.verifyAdminToken, OrderControllers.checkoutOrders);
router.get("/orders/user", AuthController.verifyAdminToken, OrderControllers.getOrderItems); // Menu routes

router.get("/menu", AuthController.verifyAdminToken, menuControllers.getMenu);
router.post("/menu", trimRequest.body, MealMiddleware.validateAddMealToMenu, AuthController.verifyAdminToken, menuControllers.postMenu);
router.post("/menu/caterer", trimRequest.body, MealMiddleware.validateAddMealToMenu, AuthController.verifyAdminToken, menuControllers.getSingleMenu); //Meals routes

router.get("/meals", AuthController.verifyAdminToken, mealControllers.getMeal);
router.post("/meals", trimRequest.body, AuthController.verifyAdminToken, MealMiddleware.validateUpdateMeal, mealControllers.postMeal);
router.put("/meals/:id", trimRequest.body, MealMiddleware.validateUpdateMeal, AuthController.verifyAdminToken, mealControllers.updateMealName);
router.delete("/meals/:id", AuthController.verifyAdminToken, mealControllers.deleteMeal); // caterer routes

router.post("auth/caterer/signup", trimRequest.body, AuthController.verifyAdminToken, CatererController.registerCaterer); // auth routes

router.post("/auth/signup", trimRequest.body, UserMiddleware.validateRegister, UserController.registerUser);
router.post("/auth/login", trimRequest.body, UserMiddleware.validateLogin, UserController.loginUser);
router.post('/auth/caterer/signup', trimRequest.body, CatererMiddleware.validateRegister, CatererController.registerCaterer);
router.post('/auth/caterer/login', trimRequest.body, CatererMiddleware.validateLogin, CatererController.loginCaterer);
module.exports = router;
//# sourceMappingURL=routes.js.map