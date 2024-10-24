Feature: Create Product API
  As an API client
  I want to create new products
  So that I can add items to the product catalog

  Scenario: Successfully create a new product
    Given the API is available
    When I send a POST request to "/v1/products" with the following data:
      | name              | price | description                        |
      | Wireless Headphones | 129.99 | High-quality wireless headphones |
    Then the response status code should be 201
    And the response should contain the created product details

  Scenario: Attempt to create a product with missing required fields
    Given the API is available
    When I send a POST request to "/v1/products" with the following data:
      | name | price |
      |      | 29.99 |
    Then the response status code should be 400
    And the response should contain an error message

  Scenario: Attempt to create a product with invalid price
    Given the API is available
    When I send a POST request to "/v1/products" with the following data:
      | name          | price   | description          |
      | Test Product  | invalid | Test product description |
    Then the response status code should be 400
    And the response should contain an error message
