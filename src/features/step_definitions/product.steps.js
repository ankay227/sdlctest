const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const request = require('supertest');

Before(async function() {
    await this.cleanDatabase();
});

After(async function() {
    await this.cleanDatabase();
});

Given('the product API is available', function() {
    // The API is already available through the world object
});

Given('a product exists with details:', async function(dataTable) {
    const productData = dataTable.hashes()[0];
    const response = await request(this.app)
        .post('/v1/products')
        .send(productData);
    
    this.productId = response.body._id;
    expect(response.status).to.equal(201);
});

When('I send a GET request to {string}', async function(path) {
    path = path.replace('{id}', this.productId || 'nonexistent-id');
    this.response = await request(this.app)
        .get(`/v1${path}`);
});

When('I send a POST request to {string} with body:', async function(path, dataTable) {
    const requestBody = dataTable.hashes()[0];
    this.response = await request(this.app)
        .post(`/v1${path}`)
        .send(requestBody);
});

When('I send a PUT request to {string} with body:', async function(path, dataTable) {
    path = path.replace('{id}', this.productId);
    const requestBody = dataTable.hashes()[0];
    this.response = await request(this.app)
        .put(`/v1${path}`)
        .send(requestBody);
});

When('I send a DELETE request to {string}', async function(path) {
    path = path.replace('{id}', this.productId || 'nonexistent-id');
    this.response = await request(this.app)
        .delete(`/v1${path}`);
});

Then('the response status code should be {int}', function(statusCode) {
    expect(this.response.status).to.equal(statusCode);
});

Then('the response should be an empty array', function() {
    expect(this.response.body).to.be.an('array').that.is.empty;
});

Then('the response should contain a product with:', function(dataTable) {
    const expectedData = dataTable.hashes()[0];
    const responseBody = this.response.body;

    expect(responseBody).to.have.property('name', expectedData.name);
    expect(responseBody).to.have.property('price', Number(expectedData.price));
    expect(responseBody).to.have.property('description', expectedData.description);
});

Then('the response should contain error:', function(dataTable) {
    const expectedError = dataTable.hashes()[0];
    const responseBody = this.response.body;

    expect(responseBody).to.have.property('code', expectedError.code);
    expect(responseBody).to.have.property('message');
    expect(responseBody.message).to.include(expectedError.message);
});
