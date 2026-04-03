Feature: Accelerator
    The Accelerator class provides access to all site utilities.

Scenario: Constructor initializes all properties
    Given I have a site configuration
    When I create an accelerator instance
    Then the properties should be initialized

Scenario: accelerator provides posts
    Given I have an accelerator instance
    Then I should have access to posts

Scenario: accelerator provides cache
    Given I have an accelerator instance
    Then I should have access to cache

Scenario: accelerator provides urlFormatter
    Given I have an accelerator instance
    Then I should have access to urlFormatter

Scenario: accelerator provides taxonomy
    Given I have an accelerator instance
    Then I should have access to taxonomy

Scenario: accelerator provides navigation
    Given I have an accelerator instance
    Then I should have access to navigation

Scenario: accelerator provides markdown
    Given I have an accelerator instance
    Then I should have access to markdown

Scenario: accelerator provides paging
    Given I have an accelerator instance
    Then I should have access to paging

Scenario: accelerator provides authors
    Given I have an accelerator instance
    Then I should have access to authors

Scenario: accelerator provides dateFormatter
    Given I have an accelerator instance
    Then I should have access to dateFormatter

Scenario: accelerator provides statistics with captureStatistics true
    Given I have an accelerator with statistics enabled
    Then I should have access to Statistics

Scenario: accelerator provides statistics stub with captureStatistics false
    Given I have an accelerator with statistics disabled
    Then I should have access to StatisticsStub
