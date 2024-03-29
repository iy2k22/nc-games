const app = require("../app");
const runSeed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const request = require("supertest");
beforeEach(() => runSeed(testData));
describe("GET non-existent endpoint", () => {
  test("returns 404", () => {
    return request(app).get("/api/cagetories").expect(404);
  });
  test("returns error message", () => {
    return request(app)
      .get("/api/test")
      .then((res) => {
        expect(res.body).toEqual({ msg: "error: endpoint not found" });
      });
  });
});
describe("GET /api/categories", () => {
  test("returns status code 200", () => {
    return request(app).get("/api/categories").expect(200);
  });
  test("returns array of objects", () => {
    return request(app)
      .get("/api/categories")
      .then((res) => {
        expect(Array.isArray(res.body.categories)).toBe(true);
      });
  });
  test("returns correct response", () => {
    return request(app)
      .get("/api/categories")
      .then((res) => {
        expect(res.body.categories).toMatchObject(testData.categoryData);
      });
  });
});
describe("GET /api/reviews", () => {
  test("returns status code 200", () => {
    return request(app).get("/api/reviews").expect(200);
  });
  test("returns an array", () => {
    return request(app)
      .get("/api/reviews")
      .then((res) => {
        expect(Array.isArray(res.body.reviews)).toBe(true);
      });
  });
  test("returns array of correct length", () => {
    return request(app)
      .get("/api/reviews")
      .then((res) => {
        expect(res.body.reviews.length).toBe(testData.reviewData.length);
      });
  });
  test("returns objects with expected properties", () => {
    return request(app)
      .get("/api/reviews")
      .then((res) => {
        const props = [
          "title",
          "owner",
          "category",
          "review_img_url",
          "designer",
          "review_id",
          "votes",
          "comment_count",
          "created_at",
        ];
        for (let review of res.body.reviews) {
          for (let prop of props)
            expect(review.hasOwnProperty(prop)).toBe(true);
        }
      });
  });
  test("returns objects with expected types of values", () => {
    return request(app)
      .get("/api/reviews")
      .then((res) => {
        for (let review of res.body.reviews) {
          expect(typeof review.title).toBe("string");
          expect(typeof review.owner).toBe("string");
          expect(typeof review.category).toBe("string");
          expect(typeof review.review_img_url).toBe("string");
          expect(typeof review.designer).toBe("string");
          expect(typeof review.review_id).toBe("number");
          expect(typeof review.votes).toBe("number");
          expect(typeof review.comment_count).toBe("number");
          expect(typeof review.created_at).toBe("string");
        }
      });
  });
  test("contains 2 entries that have 3 comments", () => {
    const expected = [
      {
        owner: "bainesface",
        title: "Ultimate Werewolf",
        review_id: 3,
        category: "social deduction",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
        designer: "Akihisa Okui",
        comment_count: 3,
      },
      {
        owner: "philippaclaire9",
        title: "Jenga",
        review_id: 2,
        category: "dexterity",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        created_at: "2021-01-18T10:01:41.251Z",
        votes: 5,
        designer: "Leslie Scott",
        comment_count: 3,
      },
    ];
    return request(app)
      .get("/api/reviews")
      .then((result) => {
        expect(result.body.reviews).toEqual(expect.arrayContaining(expected));
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("returns status code 200", () => {
    return request(app).get("/api/reviews/1").expect(200);
  });
  test("responds with object with appropriate properties", () => {
    return request(app)
      .get("/api/reviews/1")
      .then(({ body }) => {
        expect(body.review).toMatchObject({
          review_id: expect.any(Number),
          title: expect.any(String),
          designer: expect.any(String),
          owner: expect.any(String),
          review_img_url: expect.any(String),
          review_body: expect.any(String),
          category: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
  test("responds with object with appropriate properties", () => {
    return request(app)
    .get('/api/reviews/1')
    .then(({ body }) => {
      expect(body.review).toMatchObject({
        review_id: expect.any(Number),
        title: expect.any(String),
        designer: expect.any(String),
        owner: expect.any(String),
        review_img_url: expect.any(String),
        review_body: expect.any(String),
        category: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number)
      })
    })
  })
  test("responds with 404 upon being given a valid but non-existent id", () => {
    return request(app)
      .get("/api/reviews/26")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("error: review id not found");
      });
  });
  test("responds with 400 when given an invalid id", () => {
    return request(app)
      .get("/api/reviews/a")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("error: invalid input");
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("returns status code 200", () => {
    return request(app).get("/api/reviews/2/comments").expect(200);
  });
  test("responds with an object with a key of comments containing an array", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
      });
  });
  test("array from response contains comments with appropriate properties", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            review_id: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });
  test("if given a valid review id that doesn't have any comments, respond with 200 and empty array", () => {
    return request(app)
    .get('/api/reviews/1/comments')
    .expect(200)
    .then(({ body }) => {
      expect(body.comments).toEqual([]);
    })
  });
  test("if given an id that is valid but doesn't exist, return 404", () => {
    return request(app).get('/api/reviews/384/comments').expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("error: review id not found")
    })
  })
  test("if given invalid id, respond with 400", () => {
    return request(app)
      .get("/api/reviews/a/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("error: invalid input");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  const comment = {
    username: "mallionaire",
    body: "b"
  };
  test("responds with status code 201", () => {
    return request(app)
    .post("/api/reviews/1/comments")
    .send(comment)
    .expect(201);
  })
  test("responds with an object, key of comment and the created object", () => {
    return request(app)
    .post("/api/reviews/1/comments")
    .send(comment)
    .then(({ body }) => {
      expect(body.comment).toMatchObject({
        body: comment.body,
        review_id: 1,
        author: comment.username,
        votes: 0
      });
    })
  })
  test("responds with 404 upon being given a review id that doesn't exist", () => {
    return request(app)
    .post("/api/reviews/38/comments")
    .send(comment)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("error: review id not found");
    })
  });
  test("responds with 400 upon being given an invalid review id", () => {
    return request(app)
    .post("/api/reviews/a/comments")
    .send(comment)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("error: invalid input");
    })
  })
  test("responds with 500 upon being given a username that doesn't exist", () => {
    return request(app)
    .post("/api/reviews/2/comments")
    .send({
      username: "a",
      body: "b"
    })
    .expect(500);
  })
})

describe("patchComments", () => {
  test("responds with status code 200", () => {
    return request(app)
    .patch("/api/reviews/6")
    .send({ inc_votes: 20 })
    .expect(200);
  })
  test("responds with updated comment", () => {
    return request(app)
    .patch("/api/reviews/2")
    .send({ inc_votes: 2 })
    .then(({ body }) => {
      expect(body.review).toMatchObject({
        review_id: 2,
        votes: 7
      })
    })
  })
  test("responds with 400 when given invalid request", () => {
    return request(app)
    .patch("/api/reviews/1")
    .send({ a: "b" })
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request");
    })
  })
})

describe.only("getUsers", () => {
  test("responds with 200", () => {
    return request(app)
    .get("/api/users")
    .expect(200);
  })
  test("responds with array of objects containing username, name, avatar_url", () => {
    return request(app)
    .get("/api/users")
    .then(({ body }) => {
      body.users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String)
        });
      })
    })
  })
})