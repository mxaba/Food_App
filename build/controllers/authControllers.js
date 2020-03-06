"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt = require('jsonwebtoken');

var secret = require("../db/jwt_secret");

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "verifyUserToken",
    value: function () {
      var _verifyUserToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, jwtToken, decoded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers.authorization;

                if (token) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: 'No Token Provided'
                }));

              case 3:
                jwtToken = token.split(' ')[1];
                _context.prev = 4;
                _context.next = 7;
                return jwt.verify(jwtToken, secret);

              case 7:
                decoded = _context.sent;
                req.user = decoded.user;
                next();
                return _context.abrupt("return", true);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: 'Invalid Auth Token'
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 13]]);
      }));

      function verifyUserToken(_x, _x2, _x3) {
        return _verifyUserToken.apply(this, arguments);
      }

      return verifyUserToken;
    }()
  }, {
    key: "verifyAdminToken",
    value: function () {
      var _verifyAdminToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var token, jwtToken, decoded;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers.authorization;

                if (token) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: 'No Token Provided'
                }));

              case 3:
                jwtToken = token.split(' ')[1];
                _context2.prev = 4;
                _context2.next = 7;
                return jwt.verify(jwtToken, secret);

              case 7:
                decoded = _context2.sent;

                if (decoded.isCaterer) {
                  _context2.next = 10;
                  break;
                }

                throw new Error('Unauthorized');

              case 10:
                req.caterer = decoded.caterer;
                next();
                return _context2.abrupt("return", true);

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](4);
                return _context2.abrupt("return", res.status(401).json({
                  status: 'error',
                  message: 'Unauthorized'
                }));

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 15]]);
      }));

      function verifyAdminToken(_x4, _x5, _x6) {
        return _verifyAdminToken.apply(this, arguments);
      }

      return verifyAdminToken;
    }()
  }]);

  return AuthController;
}();

module.exports = AuthController;
//# sourceMappingURL=authControllers.js.map