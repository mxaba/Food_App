"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt'); //var Caterer = require'../models/caterer';


var secret = require("../db/jwt_secret");

var CatererController =
/*#__PURE__*/
function () {
  function CatererController() {
    _classCallCheck(this, CatererController);
  }

  _createClass(CatererController, null, [{
    key: "registerCaterer",
    value: function () {
      var _registerCaterer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, email, password, hash, caterer, safeCaterer, jwtToken;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
                _context.next = 4;
                return bcrypt.hash(password, 10);

              case 4:
                hash = _context.sent;
                _context.next = 7;
                return Caterer.create({
                  name: name,
                  email: email,
                  password: hash
                });

              case 7:
                caterer = _context.sent;
                safeCaterer = {
                  id: 2,
                  name: caterer.name,
                  email: caterer.email
                };
                jwtToken = jwt.sign({
                  caterer: safeCaterer,
                  isCaterer: true
                }, secret, {
                  expiresIn: 86400
                });
                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  message: 'Caterer Registered',
                  token: "Bearer ".concat(jwtToken),
                  caterer: safeCaterer
                }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context.t0.message
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      function registerCaterer(_x, _x2) {
        return _registerCaterer.apply(this, arguments);
      }

      return registerCaterer;
    }()
  }, {
    key: "loginCaterer",
    value: function () {
      var _loginCaterer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, caterer, result, safeCaterer, jwtToken;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return Caterer.findOne({
                  where: {
                    email: email
                  }
                });

              case 4:
                caterer = _context2.sent;

                if (caterer) {
                  _context2.next = 7;
                  break;
                }

                throw new Error('Caterer with that email does not exist');

              case 7:
                _context2.next = 9;
                return bcrypt.compare(password, caterer.password);

              case 9:
                result = _context2.sent;

                if (result) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("Password doesn't match our records");

              case 12:
                safeCaterer = {
                  id: caterer.id,
                  name: caterer.name,
                  email: caterer.email
                };
                jwtToken = jwt.sign({
                  caterer: safeCaterer,
                  isCaterer: true
                }, secret, {
                  expiresIn: 86400
                });
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  message: 'Caterer Logged In',
                  token: "Bearer ".concat(jwtToken),
                  user: safeCaterer
                }));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 'error',
                  message: _context2.t0.message
                }));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 17]]);
      }));

      function loginCaterer(_x3, _x4) {
        return _loginCaterer.apply(this, arguments);
      }

      return loginCaterer;
    }()
  }]);

  return CatererController;
}();

module.exports = CatererController;
//# sourceMappingURL=catererControllers.js.map