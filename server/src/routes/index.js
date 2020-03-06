var UserController = require('../controllers/UserController');
var MealController = require('../controllers/MealController');
var MenuController = require('../controllers/MenuController');
var OrderController = require('../controllers/OrderController');
var validate = require('../middlewares/validator');
var checkLogin, validateId, checkSignUp = require('../middlewares/validate');
var verifyToken = require('../middlewares/verifyToken');
var checkUser = require('../middlewares/checkUser');


const routes = (app) => {
  app.get('/', (request, response) => {
    response.status(200)
      .send('Welcome to Food_App');
  });
  app.post('/api/v1/auth/signup', checkSignUp, UserController.signUp);
  app.post('/api/v1/auth/login', checkLogin, UserController.login);
  app.get('/api/v1/auth/users', UserController.getAllUsers);
  app.post('/api/v1/meals', validate.mealFields, verifyToken, checkUser, MealController.addMeals);
  app.delete('/api/v1/meals/:mealId', validateId, verifyToken, checkUser, MealController.deleteMeal);
  app.put('/api/v1/meals/:mealId', validateId, verifyToken, checkUser, MealController.updateMeal);
  app.get('/api/v1/meals', verifyToken, checkUser, MealController.getAllMeals);
  app.post('/api/v1/menu', verifyToken, checkUser, MenuController.addMenu);
  app.get('/api/v1/menu', verifyToken, MenuController.getMenu);
  app.post('/api/v1/orders', verifyToken, OrderController.makeOrder);
  app.put('/api/v1/orders/:orderId', verifyToken, validateId, OrderController.updateOrder);
  app.get('/api/v1/orders', verifyToken, checkUser, OrderController.getOrders);
};

module.exports = routes;

