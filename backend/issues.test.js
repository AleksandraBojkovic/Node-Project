process.env.NODE_ENV = "test";

var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./server");
let should = chai.should();
const Issue = require("./models/Issue");

chai.use(chaiHttp);

/**
 * Set up DB
 */
describe("Issue", () => {
  beforeEach(done => {
    Issue.remove({}, err => {
      const newIssue = new Issue({
        description: "Ab initio"
      });
      newIssue.save();
      done();
    });
  });

  /**
   * Test the /GET route
   */

  describe("/GET Issue", () => {
    it("it should get all the issues", done => {
      chai
        .request(server)
        .get("/issues")
        .end((err, res) => {
          res.body.should.be.a("Array");
          res.body.length.should.be.eql(1);
          res.body[0].description.should.be.eql("Ab initio");
          done();
        });
    });
  });
  /**
   * Test the /POST route
   */
  describe("/POST Issue", () => {
    it("it should not post an issue without description", done => {
      let Issue = {
        date: Date.now
      };
      chai
        .request(server)
        .post("/issues")
        .send(Issue)
        .end((err, res) => {
          res.text.should.be.eql("Incorect post input.");
          done();
        });
    });

    it("it should POST an Issue ", done => {
      let Issue = {
        date: Date.now,
        description:
          "There’s some good in this world, Mr. Frodo… and it’s worth fighting for."
      };
      chai
        .request(server)
        .post("/issues")
        .send(Issue)
        .end((err, res) => {
          res.body.should.be.eql(true);
          done();
        });
    });
  });

  //   /*
  //    * Test the /GET/:issueId
  //    */
  describe("/GET/:issueId", () => {
    it("it should get all the issues", done => {
      let issueId;
      chai
        .request(server)
        .get("/issues")
        .end((err, res) => {
          res.body.should.be.a("Array");
          res.body.length.should.be.eql(1);
          res.body[0].description.should.be.eql("Ab initio");
          issueId = res.body[0]._id;

          chai
            .request(server)
            .get("/issues/" + issueId)
            .end((err, res) => {
              res.body.should.be.a("Object");
              res.body.description.should.be.eql("Ab initio");
              res.body._id.should.be.eql(issueId);
              done();
            });
        });
    });
  });

  //   /**
  //    * Test the /PATCH/:issueId
  //    */
  describe("/PATCH/:issueId", () => {
    it("it should update an issue given the id", done => {
      let issueId;

      chai
        .request(server)
        .get("/issues")
        .end((err, res) => {
          issueId = res.body[0]._id;

          let newIssue = new Issue({
            description: "The Chronicles of Narnia",
            status: "pending"
          });

          chai
            .request(server)
            .patch("/issues/" + issueId)
            .send(newIssue)
            .end((err, res) => {
              res.body.nModified.should.be.eql(1);

              chai
                .request(server)
                .patch("/issues/" + issueId)
                .send(null)
                .end((err, res) => {
                  res.text.should.be.eql("Incorect update input.");
                  done();
                });
            });
        });
    });
  });

  //   /**
  //    * Test the /DELETE/:issueId
  //    */
  describe("/DELETE/:issueId", () => {
    it("it should delete a issue given the id", done => {
      let issueId;
      chai
        .request(server)
        .get("/issues")
        .end((err, res) => {
          issueId = res.body[0]._id;

          chai
            .request(server)
            .delete("/issues/" + issueId)
            .end((err, res) => {
              res.body.should.be.eql(true);
              done();
            });
        });
    });
  });

  //   /**
  //    * Test the GET and POST/:issueId/comment
  //    */
  describe("/GET and POST/:issueId/comment", () => {
    it("it should get an comment given the id", done => {
      let issueId;
      chai
        .request(server)
        .get("/issues")
        .end((err, res) => {
          issueId = res.body[0]._id;

          let Comment = {
            comment: "Hobit"
          };
          chai
            .request(server)
            .post("/issues/" + issueId + "/comment")
            .send(Comment)
            .end((err, res) => {
              res.body.nModified.should.be.eql(1);

              chai
                .request(server)
                .get("/issues/" + issueId)
                .end((err, res) => {
                  res.body.comments[0].text.should.be.eql("Hobit");
                      done();
                    });
                });
            });
        });
    });
  });
