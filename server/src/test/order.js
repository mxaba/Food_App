import chai, { expect, assert, use } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);
chai.should();

describe("Orders", () => {
  describe("GET Order", () => {
    it("should get all orders for the day", done => {
      chai
        .request(app)
        .get("/api/v1/orders")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.equal(res.body.data.name);
          assert.equal(res.body.data.price);
          done();
        });
    });

    it("should GET a single order", done => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/orders/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("POST an order", () => {
    it("it should be able to POST an order from the users", done => {
      chai
        .request(app)
        .post("/api/v1/orders")

        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status");
          done();
        });
    });
    it("should POST an Order for the day", done => {
      chai
        .request(app)
        .post("/api/v1/orders")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          assert.equal(res.body.data.name,);
          assert.equal(res.body.data.price,);
          done();
        });
    });
  });

  describe("PUT an Order", () => {
    it("should EDIT an order ", done => {
      const id = 1;
      chai
        .request(app)
        .put(`/api/v1/orders/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.equal(res.body.data.name,);
          assert.equal(res.body.data.price,);
          done();
        });
    });
  });
});
