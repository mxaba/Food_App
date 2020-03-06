"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _caterer = _interopRequireDefault(require("../db/models/caterer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai.default.assert,
    expect = _chai.default.expect,
    use = _chai.default.use;
use(_chaiHttp.default);
var API_PREFIX = '/api/v1';
before(function (done) {
  _app.default.on('dbConnected', function () {
    done();
  });
});
beforeEach(function (done) {
  done();
});
describe('Caterer Auth Signup Endpoint Tests', function () {
  it('POST /auth/caterer/signup - Caterer SignUp Validation Test', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/caterer/signup")).send({
      name: 'Roger Test',
      email: 'roger@test.com',
      phone: '08028372825'
    }).then(function (res) {
      expect(res).to.have.status(400);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.type, 'validation');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/caterer/signup', err.message);
    });
  });
  it('POST /auth/caterer/signup - Caterer Can Sign Up', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/caterer/signup")).send({
      name: 'Roger Test',
      email: 'roger@test.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(201);
      assert.equal(res.body.status, 'success');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/caterer/signup', err.message);
    });
  });
  it("POST /auth/caterer/signup - Caterer Can't signup again with the same email", function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/caterer/signup")).send({
      name: 'Roger Test',
      email: 'roger@test.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(500);
      assert.equal(res.body.status, 'error');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/caterer/signup', err.message);
    });
  });
});
describe('Caterer Login Endpoint Tests', function () {
  it('POST /auth/caterer/login - Caterer Login Validation Test(Required)', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/caterer/login")).send({
      email: 'roger@test.com'
    }).then(function (res) {
      expect(res).to.have.status(400);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.type, 'validation');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/caterer/login', err.message);
    });
  });
  it('POST /auth/caterer/login - Caterer Cannot Login without being registered', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/caterer/login")).send({
      email: 'thesis@science.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(500);
      assert.equal(res.body.status, 'error');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/caterer/login', err.message);
    });
  });
  it('POST /auth/caterer/login - Caterer Can Login', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/caterer/login")).send({
      email: 'roger@test.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(200);
      assert.equal(res.body.status, 'success');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/caterer/login', err.message);
    });
  });
  it("POST /auth/caterer/login - Caterer Can't login with incorrect password", function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/caterer/login")).send({
      email: 'roger@test.com',
      password: 'password111'
    }).then(function (res) {
      expect(res).to.have.status(500);
      assert.equal(res.body.status, 'error');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/caterer/login', err.message);
    });
  });
});
after(function (done) {
  _caterer.default.destroy({
    where: {
      email: 'roger@test.com'
    }
  }).then(function () {
    done();
  });
});
//# sourceMappingURL=caterer.js.map