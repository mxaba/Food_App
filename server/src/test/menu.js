import chai from "chai";
import chaiHTTP from "chai-http";
import jwt from "jsonwebtoken";
import app from "../app";
import secret from "../db/jwt_secret";
import Users from "../db/models/users";
import Caterer from "../db/models/caterer";
import Meal from "../db/models/meals";

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = "/api/v1";

const userPayload = {
  name: "Jon Snow",
  email: "bastard@stark.com",
  password: "winterishere"
};

const catererPayload = {
  name: "Arya Stark",
  email: "agirl@hasnoface.com",
  password: "bellish:)"
};

const caterer2Payload = {
  name: "Arya Stark",
  email: "stark@short.com",
  password: "bellish:)"
};



describe("User Get all Menus Endpoint Tests", () => {
  it(`GET ${API_PREFIX}/menu/ - Fetch All Menus (Unauthorized)`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/menu/`)
      .then(res => {
        expect(res).to.have.status(401);
        assert.equal(res.body.status, "error");
        done();
      })
      .catch(err => console.log("GET /menu/", err.message));
  });
  it(`GET ${API_PREFIX}/menu/ - Fetch All Menus - (User Authorized)`, done => {
    User.findOne({ where: { email: userPayload.email } }).then(user => {
      const { id, name, email, } = user;
      const token = jwt.sign(
        {
          user: { id, name, email, }
        },
        secret,
        {
          expiresIn: 86400
        }
      );
      chai
        .request(app)
        .get(`${API_PREFIX}/menu/`)
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          assert.equal(res.body.status, "success");
          done();
        })
        .catch(err => console.log("GET /menu/", err.message));
    });
  });
});

describe("Caterer Can Get theit Menu Endpoint Tests", () => {
  it(`GET ${API_PREFIX}/menu/caterer - Fetch Menu (Unauthorized)`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/menu/caterer`)
      .then(res => {
        expect(res).to.have.status(401);
        assert.equal(res.body.status, "error");
        done();
      })
      .catch(err => console.log("GET /menu/caterer", err.message));
  });
  it(`GET ${API_PREFIX}/menu/caterer - Fetch Menu - (Caterer Authorized)`, done => {
    Caterer.findOne({ where: { email: catererPayload.email } }).then(
      caterer => {
        const { id, name, email,} = caterer;
        const token = jwt.sign(
          {
            caterer: { id, name, email,},
            isCaterer: true
          },
          secret,
          {
            expiresIn: 86400
          }
        );
        chai
          .request(app)
          .get(`${API_PREFIX}/menu/caterer`)
          .set("Authorization", `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, "success");
            done();
          })
          .catch(err => console.log("GET /menu/caterer", err.message));
      }
    );
  });
});

describe("Caterer Add Meal To Menu Endpoint Tests", () => {
  Caterer.create(caterer2Payload)
    .then(caterer => {
      return Meal.create({
        name: "Fake Food",
        price: 700,
        imageUrl: "img.png",
        catererId: 2
      });
    })
    .then(meal => {
      const mealId = meal.id;
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu(Unauthorized)`, done => {
        chai
          .request(app)
          .post(`${API_PREFIX}/menu/`)
          .send({
            mealId,
            quantity: 2
          })
          .then(res => {
            expect(res).to.have.status(401);
            assert.equal(res.body.status, "error");
            done();
          })
          .catch(err => console.log("POST /menu/", err.message));
      });
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu - (Validation Test)`, done => {
        Caterer.findOne({ where: { email: caterer2Payload.email } }).then(
          caterer => {
            const token = jwt.sign(
              {
                caterer: {
                  id: caterer.id,
                  name: caterer.name,
                  email: caterer.email
                },
                isCaterer: true
              },
              secret,
              {
                expiresIn: 86400
              }
            );
            chai
              .request(app)
              .post(`${API_PREFIX}/menu/`)
              .set("Authorization", `Bearer ${token}`)
              .send({
                mealId
              })
              .then(res => {
                expect(res).to.have.status(400);
                assert.equal(res.body.status, "error");
                done();
              })
              .catch(err => console.log("POST /menu/", err.message));
          }
        );
      });
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu - (Caterer Can Add Menu Meal)`, done => {
        Caterer.findOne({ where: { email: caterer2Payload.email } })
          .then(caterer => {
            const token = jwt.sign(
              {
                caterer: {
                  id: caterer.id,
                  name: caterer.name,
                  email: caterer.email,
                },
                isCaterer: true
              },
              secret,
              {
                expiresIn: 86400
              }
            );
            chai
              .request(app)
              .post(`${API_PREFIX}/menu/`)
              .set("Authorization", `Bearer ${token}`)
              .send({
                mealId,
                quantity: 2
              })
              .then(res => {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, "success");
                done();
              })
              .catch(err => console.log("POST /menu/", err.message));
          })
          .catch(err => console.log(err.message));
      });
      it(`POST ${API_PREFIX}/menu/ - Add Meal Option To Menu - (Caterer Can Update Menu Meal)`, done => {
        Caterer.findOne({ where: { email: caterer2Payload.email } }).then(
          caterer => {
            const token = jwt.sign(
              {
                caterer: {
                  id: caterer.id,
                  name: caterer.name,
                  email: caterer.email,
                },
                isCaterer: true
              },
              secret,
              {
                expiresIn: 86400
              }
            );
            chai
              .request(app)
              .post(`${API_PREFIX}/menu/`)
              .set("Authorization", `Bearer ${token}`)
              .send({
                mealId,
                quantity: 2
              })
              .then(res => {
                expect(res).to.have.status(200);
                assert.equal(res.body.status, "success");
                assert.equal(res.body.data[0].quantity, 4);
                Meal.destroy({ where: { id: mealId } }).then(() => {
                  done();
                });
              })
              .catch(err => console.log("POST /menu/", err.message));
          }
        );
      });
    })
    .catch(err => console.log(err.message));
});

after(done => {
  User.destroy({ where: { email: userPayload.email } })
    .then(async () => {
      await Caterer.destroy({ where: { email: caterer2Payload.email } });
      return Caterer.destroy({ where: { email: catererPayload.email } });
    })
    .then(() => {
      done();
    });
});
