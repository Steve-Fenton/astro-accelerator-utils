Feature: Paging Navigation
    Pagination links should be generated correctly with appropriate collapsing logic depending on limit, total pages, and current page.

Scenario: Number of pages is less than the limit
    Given I have a paging instance
    When I generate links with limit 5, total 3, current 1, and URL "/page/1/"
    Then 3 links should be generated
    And the first link should be for page 1
    And the last link should be for page 3
    And none of the links should have a collapse class

Scenario: Current page is at the start, total pages exceeds limit
    Given I have a paging instance
    When I generate links with limit 3, total 10, current 1, and URL "/page/1/"
    Then 4 links should be generated
    And the first link should be for page 1
    And the second link should be for page 2
    And the third link should be for page 3
    And the last link should be for page 10
    And the last link should have the "paging-collapse-before" class

Scenario: Current page is in the middle, total pages exceeds limit
    Given I have a paging instance
    When I generate links with limit 3, total 10, current 5, and URL "/page/5/"
    Then 5 links should be generated
    And the first link should be for page 1
    And the first link should have the "paging-collapse-after" class
    And the second link should be for page 4
    And the third link should be for page 5
    And the fourth link should be for page 6
    And the last link should be for page 10
    And the last link should have the "paging-collapse-before" class

Scenario: Current page is at the end, total pages exceeds limit
    Given I have a paging instance
    When I generate links with limit 3, total 10, current 10, and URL "/page/10/"
    Then 4 links should be generated
    And the first link should be for page 1
    And the first link should have the "paging-collapse-after" class
    And the second link should be for page 8
    And the third link should be for page 9
    And the last link should be for page 10
    And the last link should not have a collapse class

Scenario: Current page makes start exactly 1
    Given I have a paging instance
    When I generate links with limit 3, total 10, current 3, and URL "/page/3/"
    Then 5 links should be generated
    And the first link should be for page 1
    And the first link should not have a collapse class
    And the second link should be for page 2
    And the third link should be for page 3
    And the fourth link should be for page 4
    And the last link should be for page 10
    And the last link should have the "paging-collapse-before" class

Scenario: Current page makes end exactly numberOfPages - 1
    Given I have a paging instance
    When I generate links with limit 3, total 10, current 8, and URL "/page/8/"
    Then 5 links should be generated
    And the first link should be for page 1
    And the first link should have the "paging-collapse-after" class
    And the second link should be for page 7
    And the third link should be for page 8
    And the fourth link should be for page 9
    And the last link should be for page 10
    And the last link should not have a collapse class

