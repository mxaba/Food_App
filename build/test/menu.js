"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

var _jwt_secret = _interopRequireDefault(require("../db/jwt_secret"));

var _users = _interopRequireDefault(require("../db/models/users"));

var _caterer = _interopRequireDefault(require("../db/models/caterer"));

var _meals = _interopRequireDefault(require("../db/models/meals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assert = _chai.default.assert,
    expect = _chai.default.expect,
    use = _chai.default.use;
use(_chaiHttp.default);
var API_PREFIX = "/api/v1";
var userPayload = {
  name: "Jon Snow",
  email: "bastard@stark.com",
  password: "winterishere"
};
var catererPayload = {
  name: "Arya Stark",
  email: "agirl@hasnoface.com",
  password: "bellish:)"
};
var caterer2Payload = {
  name: "Arya Stark",
  email: "stark@short.com",
  password: "bellish:)"
};
describe("User Get all Menus Endpoint Tests", function () {
  it("GET ".concat(API_PREFIX, "/menu/ - Fetch All Menus (Unauthorized)"), function (done) {
    _chai.default.request(_app.default).get("".concat(API_PREFIX, "/menu/")).then(function (res) {
      expect(res).to.have.status(401);
      assert.equal(res.body.status, "error");
      done();
    }).catch(function (err) {
      return console.log("GET /menu/", err.message);
    });
  });
  it("GET ".concat(API_PREFIX, "/menu/ - Fetch All Menus - (User Authorized)"), function (done) {
    User.findOne({
      where: {
        email: userPayload.email
      }
    }).then(function (user) {
      var id = user.id,
          name = user.name,
          email = user.email;

      var token = _jsonwebtoken.default.sign({
        user: {
          id: id,
          name: name,
          email: email
        }
      }, _jwt_secret.default, {
        expiresIn: 86400
      });

      _chai.default.request(_app.default).get("".concat(API_PREFIX, "/menu/")).set("Authorization", "Bearer ".concat(token)).then(function (res) {
        expect(res).to.have.status(200);
        assert.equal(res.body.status, "success");
        done();
      }).catch(function (err) {
        return console.log("GET /menu/", err.message);
      });
    });
  });
});
describe("Caterer Can Get theit Menu Endpoint Tests", function () {
  it("GET ".concat(API_PREFIX, "/menu/caterer - Fetch Menu (Unauthorized)"), function (done) {
    _chai.default.request(_app.default).get("".concat(API_PREFIX, "/menu/caterer")).then(function (res) {
      expect(res).to.have.status(401);
      assert.equal(res.body.status, "error");
      done();
    }).catch(function (err) {
      return console.log("GET /menu/caterer", err.message);
    });
  });
  it("GET ".concat(API_PREFIX, "/menu/caterer - Fetch Menu - (Caterer Authorized)"), function (done) {
    _caterer.default.findOne({
      where: {
        email: catererPayload.email
      }
    }).then(function (caterer) {
      var id = caterer.id,
          name = caterer.name,
          email = caterer.email;

      var token = _jsonwebtoken.default.sign({
        caterer: {
          id: id,
          name: name,
          email: email
        },
        isCaterer: true
      }, _jwt_secret.default, {
        expiresIn: 86400
      });

      _chai.default.request(_app.default).get("".concat(API_PREFIX, "/menu/caterer")).set("Authorization", "Bearer ".concat(token)).then(function (res) {
        expect(res).to.have.status(200);
        assert.equal(res.body.status, "success");
        done();
      }).catch(function (err) {
        return console.log("GET /menu/caterer", err.message);
      });
    });
  });
});
describe("Caterer Add Meal To Menu Endpoint Tests", function () {
  _caterer.default.create(caterer2Payload).then(function (caterer) {
    return _meals.default.create({
      name: "Fake Food",
      price: 700,
      imageUrl: "img.png",
      catererId: 2
    });
  }).then(function (meal) {
    var mealId = meal.id;
    it("POST ".concat(API_PREFIX, "/menu/ - Add Meal Option To Menu(Unauthorized)"), function (done) {
      _chai.default.request(_app.default).post("".concat(API_PREFIX, "/menu/")).send({
        mealId: mealId,
        quantity: 2
      }).then(function (res) {
        expect(res).to.have.status(401);
        assert.equal(res.body.status, "error");
        done();
      }).catch(function (err) {
        return console.log("POST /menu/", err.message);
      });
    });
    it("POST ".concat(API_PREFIX, "/menu/ - Add Meal Option To Menu - (Validation Test)"), function (done) {
      _caterer.default.findOne({
        where: {
          email: caterer2Payload.email
        }
      }).then(function (caterer) {
        var token = _jsonwebtoken.default.sign({
          caterer: {
            id: caterer.id,
            name: caterer.name,
            email: caterer.email
          },
          isCaterer: true
        }, _jwt_secret.default, {
          expiresIn: 86400
        });

        _chai.default.request(_app.default).post("".concat(API_PREFIX, "/menu/")).set("Authorization", "Bearer ".concat(token)).send({
          mealId: mealId
        }).then(function (res) {
          expect(res).to.have.status(400);
          assert.equal(res.body.status, "error");
          done();
        }).catch(function (err) {
          return console.log("POST /menu/", err.message);
        });
      });
    });
    it("POST ".concat(API_PREFIX, "/menu/ - Add Meal Option To Menu - (Caterer Can Add Menu Meal)"), function (done) {
      _caterer.default.findOne({
        where: {
          email: caterer2Payload.email
        }
      }).then(function (caterer) {
        var token = _jsonwebtoken.default.sign({
          caterer: {
            id: caterer.id,
            name: caterer.name,
            email: caterer.email
          },
          isCaterer: true
        }, _jwt_secret.default, {
          expiresIn: 86400
        });

        _chai.default.request(_app.default).post("".concat(API_PREFIX, "/menu/")).set("Authorization", "Bearer ".concat(token)).send({
          mealId: mealId,
          quantity: 2
        }).then(function (res) {
          expect(res).to.have.status(200);
          assert.equal(res.body.status, "success");
          done();
        }).catch(function (err) {
          return console.log("POST /menu/", err.message);
        });
      }).catch(function (err) {
        return console.log(err.message);
      });
    });
    it("POST ".concat(API_PREFIX, "/menu/ - Add Meal Option To Menu - (Caterer Can Update Menu Meal)"), function (done) {
      _caterer.default.findOne({
        where: {
          email: caterer2Payload.email
        }
      }).then(function (caterer) {
        var token = _jsonwebtoken.default.sign({
          caterer: {
            id: caterer.id,
            name: caterer.name,
            email: caterer.email
          },
          isCaterer: true
        }, _jwt_secret.default, {
          expiresIn: 86400
        });

        _chai.default.request(_app.default).post("".concat(API_PREFIX, "/menu/")).set("Authorization", "Bearer ".concat(token)).send({
          mealId: mealId,
          quantity: 2
        }).then(function (res) {
          expect(res).to.have.status(200);
          assert.equal(res.body.status, "success");
          assert.equal(res.body.data[0].quantity, 4);

          _meals.default.destroy({
            where: {
              id: mealId
            }
          }).then(function () {
            done();
          });
        }).catch(function (err) {
          return console.log("POST /menu/", err.message);
        });
      });
    });
  }).catch(function (err) {
    return console.log(err.message);
  });
});
after(function (done) {
  User.destroy({
    where: {
      email: userPayload.email
    }
  }).then(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _caterer.default.destroy({
              where: {
                email: caterer2Payload.email
              }
            });

          case 2:
            return _context.abrupt("return", _caterer.default.destroy({
              where: {
                email: catererPayload.email
              }
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }))).then(function () {
    done();
  });
});
//# sourceMappingURL=menu.js.map