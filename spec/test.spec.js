process.env.NODE_ENV = "test";
const app = require("../server");
const request = require("supertest")(app);
const { expect } = require("chai");
const seedTestDb = require("../seed/test.seed");
const mongoose = require("mongoose");

describe("Northcoders News API Tests\n", () => {
  let testData;

  beforeEach(() => {
    return mongoose.connection
      .dropDatabase()
      .then(() => {
        return seedTestDb();
      })
      .then(data => {
        testData = data[0];
      });
  });

  after(() => {
    return mongoose.connection.db
      .dropDatabase()
      .then(() => {
        return mongoose.disconnect();
      })
      .catch(err => {
        throw new Error(`Test database seeding ERROR: \n${err}`);
      });
  });

  describe("/api", () => {
    it("Get, Status 200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(() => {});
    });

    describe("/topics", () => {
      it("GET, status 200", () => {
        return request
          .get("/api/topics/")
          .expect(200)
          .then(res => {
            expect(res.body.topics).to.be.an("array");
            expect(res.body.topics).to.eql(testData.topics);
          });
      });
      describe("/:topic_id/articles", () => {
        it("GET, status 200", () => {
          return request
            .get(`/api/topics/${testData.topics[0]._id}/articles`)
            .expect(200)
            .then(res => {
              expect(res.body.articles[0]).to.be.an("object");
              expect(res.body.articles[0]).to.eql(testData.articles[0]);
            });
        });
      });
    });

    describe("/articles", () => {
      it("GET, status 200", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an("array");
            expect(res.body.articles).to.eql(testData.articles.sort());
          });
      });
      describe("/:article_id", () => {
        it("GET, status 200", () => {
          return request
            .get(`/api/articles/${testData.articles[1]._id}`)
            .expect(200)
            .then(res => {
              expect(res.body.article).to.be.an("object");
              expect(res.body.article.title).to.equal(
                testData.articles[1].title
              );
            });
        });
        it("PUT, status 204, increment", () => {
          return request
            .put(`/api/articles/${testData.articles[0]._id}?vote=up`)
            .expect(204)
            .then(() => {
              request.get("/api/articles").then(res => {
                expect(res.body.articles[0].votes).to.equal(1);
              });
            });
        });
        it("PUT, status 204, decrement", () => {
          return request
            .put(`/api/articles/${testData.articles[0]._id}?vote=down`)
            .expect(204)
            .then(() => {
              return request.get("/api/articles").then(res => {
                expect(res.body.articles[0].votes).to.equal(0);
              });
            });
        });
      });

      describe("/:article_id/comments", () => {
        it("GET, status 200", () => {
          return request
            .get(`/api/articles/${testData.articles[0]._id}/comments`)
            .expect(200)
            .then(res => {
              expect(res.body.article).to.be.an("object");
              expect(res.body.article.comments).to.eql([testData.comments[0]]);
            });
        });
        it("POST, status 201", () => {
          const newCommentBody = {
            comment: "new test comment"
          };
          return request
            .post(`/api/articles/${testData.articles[1]._id}/comments`)
            .send(newCommentBody)
            .expect(201)
            .then(res => {
              expect(res.body.commentDoc).to.be.an("object");
              expect(res.body.commentDoc.body).to.equal(newCommentBody.comment);
            });
        });
      });
    });

    describe("/comments", () => {
      describe("/:comment_id", () => {
        it("GET, status 200", () => {
          return request
            .get(`/api/comments/${testData.comments[1]._id}`)
            .expect(200)
            .then(res => {
              expect(res.body.comment).to.be.an("object");
              expect(res.body.comment.body).to.equal(testData.comments[1].body);
            });
        });
        it("PUT, status 204, increment", () => {
          return request
            .put(`/api/comments/${testData.comments[0]._id}?vote=up`)
            .expect(204)
            .then(() => {
              request
                .get(`/api/comments/${testData.comments[0]._id}`)
                .then(res => {
                  expect(res.body.comment.votes).to.equal(1);
                });
            });
        });
        it("PUT, status 204, decrement", () => {
          return request
            .put(`/api/comments/${testData.comments[0]._id}?vote=down`)
            .expect(204)
            .then(() => {
              request
                .get(`/api/comments/${testData.comments[0]._id}`)
                .then(res => {
                  expect(res.body.comment.votes).to.equal(0);
                });
            });
        });
        it("DELETE, status 200", () => {
          return request
            .delete(`/api/comments/${testData.comments[0]._id}`)
            .expect(200)
            .then(res => {
              expect(res.body.msg).to.equal("Comment Deleted");
            });
        });
      });
    });

    describe("/users", () => {
      describe("/:user_name", () => {
        it("GET, status 200", () => {
          return request
            .get(`/api/users/${testData.users[0].username}`)
            .expect(200)
            .then(res => {
              expect(res.body.user).to.be.an("object");
              expect(res.body.user.name).to.equal(testData.users[0].name);
            });
        });
      });
    });
  });
});
