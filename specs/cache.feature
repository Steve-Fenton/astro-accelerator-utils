Feature: Cache
    The cache feature wraps a function that stores the result
    and uses the result in further calls, rather than calling
    the function again - until the cache expires.

Scenario: Standard cache use
    Given I have a 10 second cache
    And I cache an item called "standard-item"
    When I retrieve an item called "standard-item"
    Then the cached item should be retrieved
    And the function should be called only once

Scenario: Clear cache
    Given I have a 10 second cache
    When I cache an item called "clearable-item"
    And I clear the cache
    Then the item called "clearable-item" should be null