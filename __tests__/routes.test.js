const request = require('supertest');
const app = require('../server');

describe("Ping Route", function() {

    test('Server responds to /api/ping request', async () => {
        const res = await request(app).get('/api/ping');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
    })
})

describe("Posts Route ", function() {

    test('Sending /api/posts request with no query parameters', async() => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Tags parameter is required');
    })

    test('Sending /api/posts request with empty tags query parameters', async() => {
        const res = await request(app).get('/api/posts?tags=');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Tags parameter is required');
    })

    test('Sending /api/posts request with valid tags query parameters', async() => {
        const res = await request(app).get('/api/posts?tags=health');
        expect(res.statusCode).toBe(200);
    })

    test('Sending /api/posts request with valid tags but invalid sortBy field', async() => {
        const res = await request(app).get('/api/posts?tags=health&sortBy=favorites');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'sortBy parameter is invalid');
    })

    test('Sending /api/posts request with valid tags & valid sortBy field', async() => {
        const res = await request(app).get('/api/posts?tags=health&sortBy=reads');
        expect(res.statusCode).toBe(200);
    })

    test('Sending /api/posts request with valid tags but invalid direction field', async() => {
        const res = await request(app).get('/api/posts?tags=health&direction=up');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'direction parameter is invalid');
    })

    test('Sending /api/posts request with valid tags & valid direction field', async() => {
        const res = await request(app).get('/api/posts?tags=health&direction=desc');
        expect(res.statusCode).toBe(200);
    })

    test('Sending /api/posts request with no valid query parameters', async() => {
        const res = await request(app).get('/api/posts?name=harry');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Tags parameter is required');
    })

})