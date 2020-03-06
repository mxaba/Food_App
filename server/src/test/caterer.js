import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import Caterer from '../db/models/caterer';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

before(done => {
    app.on('dbConnected', () => {
        done();
    });
});

beforeEach(done => {
    done();
});

describe('Caterer Auth Signup Endpoint Tests', () => {
    it('POST /auth/caterer/signup - Caterer SignUp Validation Test', done => {
        chai
            .request(app)
            .post(`${API_PREFIX}/auth/caterer/signup`)
            .send({
                name: 'Roger Test',
                email: 'roger@test.com',
                phone: '08028372825',
            })
            .then(res => {
                expect(res).to.have.status(400);
                assert.equal(res.body.status, 'error');
                assert.equal(res.body.type, 'validation');
                done();
            })
            .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
    it('POST /auth/caterer/signup - Caterer Can Sign Up', done => {
        chai
            .request(app)
            .post(`${API_PREFIX}/auth/caterer/signup`)
            .send({
                name: 'Roger Test',
                email: 'roger@test.com',
                password: 'password'
            })
            .then(res => {
                expect(res).to.have.status(201);
                assert.equal(res.body.status, 'success');
                done();
            })
            .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
    it("POST /auth/caterer/signup - Caterer Can't signup again with the same email", done => {
        chai
            .request(app)
            .post(`${API_PREFIX}/auth/caterer/signup`)
            .send({
                name: 'Roger Test',
                email: 'roger@test.com',
                password: 'password'
            })
            .then(res => {
                expect(res).to.have.status(500);
                assert.equal(res.body.status, 'error');
                done();
            })
            .catch(err => console.log('POST /auth/caterer/signup', err.message));
    });
});

describe('Caterer Login Endpoint Tests', () => {
    it('POST /auth/caterer/login - Caterer Login Validation Test(Required)', done => {
        chai
            .request(app)
            .post(`${API_PREFIX}/auth/caterer/login`)
            .send({
                email: 'roger@test.com'
            })
            .then(res => {
                expect(res).to.have.status(400);
                assert.equal(res.body.status, 'error');
                assert.equal(res.body.type, 'validation');
                done();
            })
            .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
    it('POST /auth/caterer/login - Caterer Cannot Login without being registered', done => {
        chai
            .request(app)
            .post(`${API_PREFIX}/auth/caterer/login`)
            .send({
                email: 'thesis@science.com',
                password: 'password'
            })
            .then(res => {
                expect(res).to.have.status(500);
                assert.equal(res.body.status, 'error');
                done();
            })
            .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
    it('POST /auth/caterer/login - Caterer Can Login', done => {
        chai
            .request(app)
            .post(`${API_PREFIX}/auth/caterer/login`)
            .send({
                email: 'roger@test.com',
                password: 'password'
            })
            .then(res => {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, 'success');
                done();
            })
            .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
    it("POST /auth/caterer/login - Caterer Can't login with incorrect password", done => {
        chai
            .request(app)
            .post(`${API_PREFIX}/auth/caterer/login`)
            .send({
                email: 'roger@test.com',
                password: 'password111'
            })
            .then(res => {
                expect(res).to.have.status(500);
                assert.equal(res.body.status, 'error');
                done();
            })
            .catch(err => console.log('POST /auth/caterer/login', err.message));
    });
});

after(done => {
    Caterer.destroy({ where: { email: 'roger@test.com' } }).then(() => {
        done();
    });
});
