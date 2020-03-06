"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

var _jwt_secret = _interopRequireDefault(require("../db/jwt_secret"));

var _caterer = _interopRequireDefault(require("../db/models/caterer"));

var _meals = _interopRequireDefault(require("../db/models/meals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai.default.assert,
    expect = _chai.default.expect,
    use = _chai.default.use;
use(_chaiHttp.default);
var API_PREFIX = "/api/v1";
var catererPayload = {
  name: "Billy Newton",
  email: "em@gd.com",
  phone: "07075748392",
  catering_service: "Buy Food",
  password: "billions"
};
var caterer2Payload = {
  name: "Billy Newton",
  email: "deakueem@gdyeyw.com",
  phone: "07075748392",
  catering_service: "Buy Food",
  password: "billions"
};
var caterer3Payload = {
  name: "Billy Newton",
  email: "de@gdye.com",
  phone: "07075748392",
  catering_service: "Buy Food",
  password: "billions"
};
before(function (done) {
  _caterer.default.create(catererPayload).then(function () {
    done();
  });
});
describe("Caterer Get all Meals Endpoint Tests", function () {
  it("GET ".concat(API_PREFIX, "/meals/ - Fetch All Meals (Unauthorized)"), function (done) {
    _chai.default.request(_app.default).get("".concat(API_PREFIX, "/meals/")).then(function (res) {
      expect(res).to.have.status(401);
      assert.equal(res.body.status, "error");
      done();
    }).catch(function (err) {
      return console.log("GET /meals/", err.message);
    });
  });
  it("GET ".concat(API_PREFIX, "/meals/ - Fetch All Meals - (Caterer Authorized)"), function (done) {
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

      _chai.default.request(_app.default).get("".concat(API_PREFIX, "/meals/")).set("Authorization", "Bearer ".concat(token)).then(function (res) {
        expect(res).to.have.status(200);
        assert.equal(res.body.status, "success");
        done();
      }).catch(function (err) {
        return console.log("GET /meals/", err.message);
      });
    }).catch(function (err) {
      return console.log(err.message);
    });
  });
});
//# sourceMappingURL=meal.js.map