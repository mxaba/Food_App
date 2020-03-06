"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Joi = require('joi');

var MealMiddleware =
/*#__PURE__*/
function () {
  function MealMiddleware() {
    _classCallCheck(this, MealMiddleware);
  }

  _createClass(MealMiddleware, null, [{
    key: "validateAddMeal",
    value: function () {
      var _validateAddMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var schema, imageMimes, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                schema = {
                  name: Joi.string().required(),
                  price: Joi.number().min(1).required()
                };
                _context.next = 4;
                return Joi.validate(req.body, schema);

              case 4:
                if (!(req.files === null)) {
                  _context.next = 6;
                  break;
                }

                throw new Error('Meal Image Required');

              case 6:
                imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];

                if (imageMimes.includes(req.files.image.mimetype)) {
                  _context.next = 9;
                  break;
                }

                throw new Error('Only JPG, JPEG & PNG Images are allowed');

              case 9:
                next();
                return _context.abrupt("return", true);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);

                if (_context.t0.details !== undefined) {
                  message = String(_context.t0.details[0].message);
                } else {
                  message = String(_context.t0.message);
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: message,
                  type: 'validation'
                }));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      function validateAddMeal(_x, _x2, _x3) {
        return _validateAddMeal.apply(this, arguments);
      }

      return validateAddMeal;
    }()
  }, {
    key: "validateUpdateMeal",
    value: function () {
      var _validateUpdateMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var schema, imageMimes, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                schema = {
                  name: Joi.string(),
                  price: Joi.number().min(1)
                };
                _context2.next = 4;
                return Joi.validate(req.body, schema);

              case 4:
                if (!(req.files !== null)) {
                  _context2.next = 8;
                  break;
                }

                imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];

                if (imageMimes.includes(req.files.image.mimetype)) {
                  _context2.next = 8;
                  break;
                }

                throw new Error('Only JPG, JPEG & PNG Images are allowed');

              case 8:
                next();
                return _context2.abrupt("return", true);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);

                if (_context2.t0.details !== undefined) {
                  message = String(_context2.t0.details[0].message);
                } else {
                  message = String(_context2.t0.message);
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: message,
                  type: 'validation'
                }));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function validateUpdateMeal(_x4, _x5, _x6) {
        return _validateUpdateMeal.apply(this, arguments);
      }

      return validateUpdateMeal;
    }()
  }, {
    key: "validateAddMealToMenu",
    value: function () {
      var _validateAddMealToMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var schema, message;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                schema = {
                  mealId: Joi.number().required(),
                  quantity: Joi.number().min(1).required()
                };
                _context3.next = 4;
                return Joi.validate(req.body, schema);

              case 4:
                next();
                return _context3.abrupt("return", true);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);

                if (_context3.t0.details !== undefined) {
                  message = String(_context3.t0.details[0].message);
                } else {
                  message = String(_context3.t0.message);
                }

                return _context3.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: message,
                  type: 'validation'
                }));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function validateAddMealToMenu(_x7, _x8, _x9) {
        return _validateAddMealToMenu.apply(this, arguments);
      }

      return validateAddMealToMenu;
    }()
  }]);

  return MealMiddleware;
}();

module.exports = MealMiddleware;
//# sourceMappingURL=meal.js.map