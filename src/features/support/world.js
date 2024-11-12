const { setWorldConstructor } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Product = require('../../src/models/product.model');

class CustomWorld {
    constructor() {
        this.app = app;
        this.request = null;
        this.response = null;
        this.productId = null;
    }

    async cleanDatabase() {
        await Product.deleteMany({});
    }
}

setWorldConstructor(CustomWorld);
