import fs from "fs";
import path from "path";
import chai from "chai";
import chaiHTTP from "chai-http";
import jwt from "jsonwebtoken";
import app from "../app";
import secret from "../db/jwt_secret";
import Caterer from "../db/models/caterer";
import Meal from "../db/models/meals";

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = "/api/v1";


const catererPayload = {
  name: "Billy Newton",
  email: "em@gd.com",
  phone: "07075748392",
  catering_service: "Buy Food",
  password: "billions"
};

const caterer2Payload = {
  name: "Billy Newton",
  email: "deakueem@gdyeyw.com",
  phone: "07075748392",
  catering_service: "Buy Food",
  password: "billions"
};

const caterer3Payload = {
  name: "Billy Newton",
  email: "de@gdye.com",
  phone: "07075748392",
  catering_service: "Buy Food",
  password: "billions"
};

before(done => {
  Caterer.create(catererPayload).then(() => {
    done();
  });
});

describe("Caterer Get all Meals Endpoint Tests", () => {
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals (Unauthorized)`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/meals/`)
      .then(res => {
        expect(res).to.have.status(401);
        assert.equal(res.body.status, "error");
        done();
      })
      .catch(err => console.log("GET /meals/", err.message));
  });
  it(`GET ${API_PREFIX}/meals/ - Fetch All Meals - (Caterer Authorized)`, done => {
    Caterer.findOne({ where: { email: catererPayload.email } })
      .then(caterer => {
        const { id, name, email, } = caterer;
        const token = jwt.sign(
          {
            caterer: { id, name, email, },
            isCaterer: true
          },
          secret,
          {
            expiresIn: 86400
          }
        );
        chai
          .request(app)
          .get(`${API_PREFIX}/meals/`)
          .set("Authorization", `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(200);
            assert.equal(res.body.status, "success");
            done();
          })
          .catch(err => console.log("GET /meals/", err.message));
      })
      .catch(err => console.log(err.message));
  });
});
