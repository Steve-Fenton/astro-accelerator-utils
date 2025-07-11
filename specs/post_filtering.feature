Feature: Basic Filters
    It should be possible to filter lists of posts.

Scenario: isAuthor filter
    Given I have a list with an author and an article
    When I apply an isAuthor filter
    Then the only item returned should be "Test Author"

Scenario: notAuthor filter
    Given I have a list with an author and an article
    When I apply an notAuthor filter
    Then the only item returned should be "Test Article"

Scenario: isSearch filter
    Given I have a list with a search page and an article
    When I apply an isSearch filter
    Then the only item returned should be "Test Search"

Scenario: notAuthor filter
    Given I have a list with a search page and an article
    When I apply an notSearch filter
    Then the only item returned should be "Test Article"

