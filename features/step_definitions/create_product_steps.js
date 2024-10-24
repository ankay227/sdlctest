const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let apiResponse;
const baseURL = 'http://localhost:3000'; // Adjust this to your API's base URL

Given('the API is available', async function () {
  try {
    await axios.get(`${baseURL}/v1/products`);
  } catch (error) {
    throw new Error('API is not available');
  }
});

When('I send a POST request to {string} with the following data:', async function (endpoint, dataTable) {
  const requestData = dataTable.hashes()[0];
  try {
    apiResponse = await axios.post(`${baseURL}${endpoint}`, requestData);
  } catch (error) {
    apiResponse = error.response;
  }
});

Then('the response status code should be {int}', function (statusCode) {
  expect(apiResponse.status).to.equal(statusCode);
});

Then('the response should contain the created product details', function () {
  expect(apiResponse.data).to.have.property('id');
  expect(apiResponse.data).to.have.property('name');
  expect(apiResponse.data).to.have.property('price');
  expect(apiResponse.data).to.have.property('description');
});

Then('the response should contain an error message', function () {
  expect(apiResponse.data).to.have.property('message');
});
