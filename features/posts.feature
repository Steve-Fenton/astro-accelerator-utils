Feature: Posts
    The Posts class retrieves and filters markdown posts from the site.

Scenario: all returns all posts
    Given I have a posts instance with mock data
    When I get all posts
    Then I should have 3 posts

Scenario: all caches results
    Given I have a posts instance with mock data
    When I get all posts multiple times
    Then the data should only be fetched once

Scenario: root returns top-level posts when no subfolder specified
    Given I have posts at different depths
    When I get root posts without a subfolder
    Then I should have 1 post at depth 1

Scenario: root returns posts in specified subfolder
    Given I have posts in different subfolders
    When I get root posts for the "blog" subfolder
    Then I should have 2 posts from the blog area

Scenario: root handles missing url with fallback
    Given I have posts with missing urls
    When I get root posts without a subfolder
    Then I should handle the missing urls gracefully

Scenario: root handles empty subfolder parameter
    Given I have posts at different depths
    When I get root posts with empty subfolder
    Then I should have 1 post at depth 1

Scenario: posts uses default fetchAll when not provided
    Given I have a posts instance without custom fetchAll
    Then the posts instance should be initialized
