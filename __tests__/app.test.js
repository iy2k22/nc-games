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
        const props = ["title", "owner", "category", "review_img_url", "designer", "review_id", "votes", "comment_count", "created_at"]
        for (let review of res.body.reviews) {
            for (let prop of props) expect(review.hasOwnProperty(prop)).toBe(true);
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
      }
    ];
      return request(app)
      .get('/api/reviews')
      .then((result) => {
        expect(result.body.reviews).toEqual(expect.arrayContaining(expected));
      })
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("returns status code 200", () => {
    return request(app)
    .get("/api/reviews/1")
    .expect(200);
  })
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
    .get('/api/reviews/26')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("error: review id not found");
    })
  })
  test("responds with 400 when given an invalid id", () => {
    return request(app)
    .get('/api/reviews/a')
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("error: invalid input");
    })
  })
})