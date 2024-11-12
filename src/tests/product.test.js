const request = require('supertest');
const app = require('../app');

describe('Product API', () => {
    let productId;

    test('POST /v1/products - Create product', async () => {
        const res = await request(app)
            .post('/v1/products')
            .send({
                name: 'Test Product',
                price: 99.99,
                description: 'Test description'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        productId = res.body._id;
    });

    test('GET /v1/products - Get all products', async () => {
        const res = await request(app).get('/v1/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test('GET /v1/products/:id - Get product by ID', async () => {
        const res = await request(app).get(`/v1/products/${productId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(productId);
    });
});
