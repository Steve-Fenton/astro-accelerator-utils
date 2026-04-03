Feature: Authors
    The Authors class retrieves author information from posts.

Scenario: info returns author by slug
    Given I have authors with different ids
    When I get author info for "jane-doe"
    Then I should get the author with name "Jane Doe"

Scenario: info returns undefined for unknown slug
    Given I have authors with different ids
    When I get author info for "unknown"
    Then no author should be returned

Scenario: forPost returns main author and contributors
    Given I have authors and a post with multiple authors
    When I process the post frontmatter for authors
    Then the main author should be "John Smith"
    And the contributors should include "Jane Doe"

Scenario: forPost returns empty result when no authors specified
    Given I have authors in the system
    When I process the post frontmatter with no authors
    Then the result should have no main author
    And the result should have no contributors

Scenario: forPost handles unknown author id
    Given I have authors and a post with unknown author
    When I process the post frontmatter with unknown author
    Then a warning should be logged for unknown author

Scenario: forPost handles multiple authors with same id
    Given I have duplicate author entries
    When I process the post frontmatter for authors
    Then a warning should be logged for duplicate authors
