"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _users = _interopRequireDefault(require("../db/models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai.default.assert,
    expect = _chai.default.expect,
    use = _chai.default.use;
use(_chaiHttp.default);
var API_PREFIX = '/api/v1';
before(function (done) {
  done();
});
describe('User Auth Signup Endpoint Tests', function () {
  it('POST /auth/signup - User SignUp Validation Test(Required)', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/signup")).send({
      name: 'Roger Test',
      email: 'roger@test.com',
      phone: '08028372825'
    }).then(function (res) {
      expect(res).to.have.status(400);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.type, 'validation');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/signup', err.message);
    });
  });
  it('POST /auth/signup - User SignUp Validation Test(Email)', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/signup")).send({
      name: 'Roger Test',
      email: 'roger',
      password: 'pass'
    }).then(function (res) {
      expect(res).to.have.status(400);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.type, 'validation');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/signup', err.message);
    });
  });
  it('POST /auth/signup - User Can Sign Up', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/signup")).send({
      name: 'Roger Test',
      email: 'roger@test.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(201);
      assert.equal(res.body.status, 'success');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/signup', err.message);
    });
  });
  it("POST /auth/signup - User Can't signup again with the same email", function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/signup")).send({
      name: 'Roger Test',
      email: 'roger@test.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(500);
      assert.equal(res.body.status, 'error');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/signup', err.message);
    });
  });
});
describe('User Auth Login Endpoint Tests', function () {
  it('POST /auth/login - User Login Validation Test(Required)', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/login")).send({
      email: 'roger@test.com'
    }).then(function (res) {
      expect(res).to.have.status(400);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.type, 'validation');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/login', err.message);
    });
  });
  it('POST /auth/login - User Login Validation Test(Email)', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/login")).send({
      email: 'roger',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(400);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.type, 'validation');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/login', err.message);
    });
  });
  it('POST /auth/login - User Cannot Login without being registered', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/login")).send({
      email: 'thesis@science.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(500);
      assert.equal(res.body.status, 'error');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/login', err.message);
    });
  });
  it('POST /auth/login - User Can Login', function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/login")).send({
      email: 'roger@test.com',
      password: 'password'
    }).then(function (res) {
      expect(res).to.have.status(200);
      assert.equal(res.body.status, 'success');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/login', err.message);
    });
  });
  it("POST /auth/login - User Can't login with incorrect password", function (done) {
    _chai.default.request(_app.default).post("".concat(API_PREFIX, "/auth/login")).send({
      email: 'roger@test.com',
      password: 'password111'
    }).then(function (res) {
      expect(res).to.have.status(500);
      assert.equal(res.body.status, 'error');
      done();
    }).catch(function (err) {
      return console.log('POST /auth/login', err.message);
    });
  });
});
after(function (done) {
  _users.default.destroy({
    where: {
      email: 'roger@test.com'
    }
  }).then(function () {
    done();
  });
});
//# sourceMappingURL=user.js.map