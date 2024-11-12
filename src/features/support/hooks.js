const { Before, After, AfterAll } = require('@cucumber/cucumber');
const mongoose = require('mongoose');

// Disconnect from MongoDB after all tests
AfterAll(async function() {
    await mongoose.disconnect();
});

// Clean up database before each scenario
Before(async function() {
    await this.cleanDatabase();
});

// Clean up database after each scenario
After(async function() {
    await this.cleanDatabase();
});
