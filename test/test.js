process.env.NODE_ENV = "test"; // set process env to test
const chai = require("chai"); // import chai, assert & should methods
const assert = require("chai").assert;
const should = chai.should();
const chaiHttp = require("chai-http"); // import chai http
const server = require("../index"); // import backend app
const session = require("../routes/session")
const item = require("./testItem.json"); // import test object

// token to allow user ot access backend routes
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXJub2xkIEFkbWluIiwidXNlcm5hbWUiOiJhZG1pbkBjbGluaWMuY29tIiwicGFzc3dvcmQiOiJhZG1pbjEiLCJwb3NpdGlvbiI6IkFkbWluIiwiaWF0IjoxNjg4ODI0NjE5fQ.nVNMSPswU3QmELHJWNzgc1-t5kcIQ8-EnlDuttJgYSE";


/* Tested backend using mocha and chai frameworks, 
two tests were conducted, 
1. test to connect to the backend and see if the response 
message was as expected, 
2. post an item to the backend using post method, the id of the test item should match the response id,
*/

chai.use(chaiHttp);

describe("Test Backend API", () => {
  describe("Connected to the server", () => {
    it("test welcome route", (done) => {
      chai
        .request(server)
        .get("/welcome")
        .end((err, resp) => {
          resp.should.have.status(200);
          resp.body.should.be.a("object");
          const message = resp.body.message;
          assert.equal(
            message,
            "Welcome to the server!",
            "Not connected to server!"
          );
          done();
        });
    });

    describe("Post new object to appointments controller", () => {
      it("test post route", (done) => {
        chai
          .request(server)
          .post("/clinic/appointment/new",)
          .set("token",token).set("Content-Type","application/json").set("test",true)
          .send(item)
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a("object");
            const id = resp.body._id;
            assert.equal(id, item._id, "Items don't match");
          });
        // testing post method for new appointments
        done();
      });
    });
  });
});

