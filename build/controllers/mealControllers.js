"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require("fs"); //import Meal from "../models/meals";


var MealControllers =
/*#__PURE__*/
function () {
  function MealControllers() {
    _classCallCheck(this, MealControllers);
  }

  _createClass(MealControllers, null, [{
    key: "getMeal",
    value: function () {
      var _getMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var meals;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Meal.findAll({
                  where: {
                    catererId: 2
                  }
                });

              case 3:
                meals = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Meals Retrieved",
                  data: meals
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: "error",
                  message: "Failed to Retrieve Meals"
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function getMeal(_x, _x2) {
        return _getMeal.apply(this, arguments);
      }

      return getMeal;
    }()
  }, {
    key: "postMeal",
    value: function () {
      var _postMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, name, price, image, imageUrl, meal;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, name = _req$body.name, price = _req$body.price;
                image = req.files.image;
                imageUrl = "/src/images/".concat(image.name);
                _context2.next = 6;
                return Meal.create({
                  name: name,
                  price: price,
                  imageUrl: imageUrl,
                  catererId: 2
                });

              case 6:
                meal = _context2.sent;
                _context2.next = 9;
                return image.mv(".".concat(imageUrl));

              case 9:
                return _context2.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Meal Option Added",
                  data: meal
                }));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function postMeal(_x3, _x4) {
        return _postMeal.apply(this, arguments);
      }

      return postMeal;
    }()
  }, {
    key: "updateMealName",
    value: function () {
      var _updateMealName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var meal, mealUpdate, image, _imageUrl, name, price, imageUrl;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Meal.findOne({
                  where: {
                    id: req.params.id
                  }
                });

              case 3:
                meal = _context3.sent;

                if (meal) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("Meal With ID ".concat(req.params.id, " does not exist"));

              case 6:
                mealUpdate = {
                  name: req.body.name ? req.body.name : meal.name,
                  price: req.body.price ? req.body.price : meal.price
                };

                if (!(req.files !== null)) {
                  _context3.next = 16;
                  break;
                }

                image = req.files.image;
                _imageUrl = "/src/images/".concat(image.name);
                fs.unlink(".".concat(meal.imageUrl), function (err) {
                  if (err) throw new Error(err.message);
                });
                mealUpdate.imageUrl = _imageUrl;
                _context3.next = 14;
                return image.mv(".".concat(_imageUrl));

              case 14:
                _context3.next = 17;
                break;

              case 16:
                mealUpdate.imageUrl = meal.imageUrl;

              case 17:
                name = mealUpdate.name, price = mealUpdate.price, imageUrl = mealUpdate.imageUrl;
                _context3.next = 20;
                return Meal.update({
                  name: name,
                  price: price,
                  imageUrl: imageUrl
                }, {
                  where: {
                    id: req.params.id
                  }
                });

              case 20:
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Meal Option Updated"
                }));

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: "error",
                  message: _context3.t0.message
                }));

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 23]]);
      }));

      function updateMealName(_x5, _x6) {
        return _updateMealName.apply(this, arguments);
      }

      return updateMealName;
    }()
  }, {
    key: "deleteMeal",
    value: function () {
      var _deleteMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, meal;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                _context4.next = 4;
                return Meal.findOne({
                  where: {
                    id: id
                  }
                });

              case 4:
                meal = _context4.sent;
                fs.unlink(".".concat(meal.imageUrl), function (err) {
                  if (err) throw new Error(err.message);
                });
                _context4.next = 8;
                return meal.destroy();

              case 8:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Meal Option Deleted"
                }));

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  status: "error",
                  message: _context4.t0.message
                }));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function deleteMeal(_x7, _x8) {
        return _deleteMeal.apply(this, arguments);
      }

      return deleteMeal;
    }()
  }]);

  return MealControllers;
}();

module.exports = MealControllers;
//# sourceMappingURL=mealControllers.js.map