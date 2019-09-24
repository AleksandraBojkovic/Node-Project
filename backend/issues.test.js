var assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();
const Issue = require("./models/Issue");


chai.use(chaiHttp);

/**
 * Set up DB
 */
 describe('Issue', () => {
  beforeEach((done) => { 
      Issue.remove({}, (err) => { 
         const newIssue = new Issue ({
           description: "novi issue"
         });
         newIssue.save();
        done();           
      });        
  });

/** 
  * Test the /GET route
*/

describe('/GET Issue', () => {
  it('it should get all the issues', (done) => {
    chai.request(server)
        .get('/issues')
        .end((err, res) => {
              res.body.should.be.a('Array');
          done();
        });
  });
});

});

