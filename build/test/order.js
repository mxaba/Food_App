"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

describe("Orders", function () {
  describe("GET Order", function () {
    it("should get all orders for the day", function (done) {
      _chai.default.request(_app.default).get("/api/v1/orders").end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");

        _chai.assert.equal(res.body.data.name);

        _chai.assert.equal(res.body.data.price);

        done();
      });
    });
    it("should GET a single order", function (done) {
      var id = 1;

      _chai.default.request(_app.default).get("/api/v1/orders/".concat(id)).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
    });
  });
  describe("POST an order", function () {
    it("it should be able to POST an order from the users", function (done) {
      _chai.default.request(_app.default).post("/api/v1/orders").end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property("status");
        done();
      });
    });
    it("should POST an Order for the day", function (done) {
      _chai.default.request(_app.default).post("/api/v1/orders").end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a("object");

        _chai.assert.equal(res.body.data.name);

        _chai.assert.equal(res.body.data.price);

        done();
      });
    });
  });
  describe("PUT an Order", function () {
    it("should EDIT an order ", function (done) {
      var id = 1;

      _chai.default.request(_app.default).put("/api/v1/orders/".concat(id)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");

        _chai.assert.equal(res.body.data.name);

        _chai.assert.equal(res.body.data.price);

        done();
      });
    });
  });
});
//# sourceMappingURL=order.js.map