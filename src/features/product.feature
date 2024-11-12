Feature: Product API
  As an API user
  I want to manage products
  So that I can maintain product information

  Background:
    Given the product API is available

  Scenario: Get all products when no products exist
    When I send a GET request to "/products"
    Then the response status code should be 200
    And the response should be an empty array

  Scenario: Create a new product with valid data
    When I send a POST request to "/products" with body:
      | name           | price | description          |
      | Test Product  | 99.99 | Test description     |
    Then the response status code should be 201
    And the response should contain a product with:
      | name           | price | description          |
      | Test Product  | 99.99 | Test description     |

  Scenario: Create a product with missing required fields
    When I send a POST request to "/products" with body:
      | description          |
      | Test description     |
    Then the response status code should be 400
    And the response should contain error:
      | code             | message                    |
      | VALIDATION_ERROR | "name" is required        |

  Scenario: Get a product by valid ID
    Given a product exists with details:
      | name           | price | description          |
      | Test Product  | 99.99 | Test description     |
    When I send a GET request to "/products/{id}"
    Then the response status code should be 200
    And the response should contain a product with:
      | name           | price | description          |
      | Test Product  | 99.99 | Test description     |

  Scenario: Get a product with invalid ID
    When I send a GET request to "/products/invalid-id"
    Then the response status code should be 400
    And the response should contain error:
      | code        | message           |
      | INVALID_ID  | Invalid ID format |

  Scenario: Update a product with valid data
    Given a product exists with details:
      | name           | price | description          |
      | Test Product  | 99.99 | Test description     |
    When I send a PUT request to "/products/{id}" with body:
      | name              | price  | description              |
      | Updated Product   | 149.99 | Updated description      |
    Then the response status code should be 200
    And the response should contain a product with:
      | name              | price  | description              |
      | Updated Product   | 149.99 | Updated description      |

  Scenario: Delete an existing product
    Given a product exists with details:
      | name           | price | description          |
      | Test Product  | 99.99 | Test description     |
    When I send a DELETE request to "/products/{id}"
    Then the response status code should be 204

  Scenario: Delete a non-existing product
    When I send a DELETE request to "/products/nonexistent-id"
    Then the response status code should be 404
    And the response should contain error:
      | code      | message           |
      | NOT_FOUND | Product not found |
