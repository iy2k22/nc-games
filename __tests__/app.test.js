const app = require('../app');
const runSeed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const request = require('supertest');
beforeEach(() => runSeed(testData));
describe('GET non-existent endpoint', () => {
    test("returns 404", () => {
        return request(app)
        .get('/api/cagetories')
        .expect(404);
    });
    test("returns error message", () => {
        return request(app)
        .get('/api/test')
        .then((res) => {
            expect(res.body).toEqual({ msg: "error: invalid path" });
        })
    })
})
describe('GET /api/categories', () => {
    test("returns status code 200", () => {
        return request(app)
        .get('/api/categories')
        .expect(200);
    });
    test("returns array of objects", () => {
        return request(app)
        .get('/api/categories')
        .then((res) => {
            expect(Array.isArray(res.body.categories)).toBe(true);
        })
    })
    test("returns correct response", () => {
        return request(app)
        .get('/api/categories')
        .then((res) => {
            expect(res.body.categories).toMatchObject(testData.categoryData);
        })
    })
})