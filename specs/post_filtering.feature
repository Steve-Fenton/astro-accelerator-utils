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

Scenario: notSearch filter
    Given I have a list with a search page and an article
    When I apply an notSearch filter
    Then the only item returned should be "Test Article"

Scenario: showInSitemap excludes pages with navSitemap set to false
    Given I have a page with navSitemap set to false
    When I apply a showInSitemap filter
    Then no items should be returned

Scenario: showInSitemap includes pages with navSitemap set to true
    Given I have a listable page with navSitemap set to true
    When I apply a showInSitemap filter
    Then the item should be returned

Scenario: showInSearch excludes pages with navSearch set to false
    Given I have a page with navSearch set to false
    When I apply a showInSearch filter
    Then no items should be returned

Scenario: showInSearch includes pages with navSearch set to true
    Given I have a listable page with navSearch set to true
    When I apply a showInSearch filter
    Then the item should be returned

Scenario: showInMenu excludes pages with navMenu set to false
    Given I have a page with navMenu set to false
    When I apply a showInMenu filter
    Then no items should be returned

Scenario: isListable excludes pages with null url
    Given I have a page with null url
    When I apply an isListable filter
    Then no items should be returned

Scenario: isListable excludes pages with empty url
    Given I have a page with empty url
    When I apply an isListable filter
    Then no items should be returned

Scenario: isListable excludes pages with null frontmatter
    Given I have a page with null frontmatter
    When I apply an isListable filter
    Then no items should be returned

Scenario: isListable excludes pages with null layout
    Given I have a page with null layout
    When I apply an isListable filter
    Then no items should be returned

Scenario: isListable excludes redirect pages
    Given I have a redirect page
    When I apply an isListable filter
    Then no items should be returned

Scenario: isListable excludes pages with listable set to false
    Given I have a page with listable set to false
    When I apply an isListable filter
    Then no items should be returned

Scenario: isListable excludes draft pages
    Given I have a draft page
    When I apply an isListable filter
    Then no items should be returned

Scenario: isListable excludes future-dated pages
    Given I have a future-dated page
    When I apply an isListable filter
    Then no items should be returned

Scenario: hasDate returns true for pages with modDate
    Given I have a page with modDate
    When I apply a hasDate filter
    Then the item should be returned

Scenario: hasDate returns true for pages with pubDate
    Given I have a page with pubDate
    When I apply a hasDate filter
    Then the item should be returned

Scenario: hasDate returns false for pages without dates
    Given I have a page without dates
    When I apply a hasDate filter
    Then no items should be returned

Scenario: hasModDate returns true for pages with modDate
    Given I have a page with modDate
    When I apply a hasModDate filter
    Then the item should be returned

Scenario: hasModDate returns false for pages without modDate
    Given I have a page without modDate
    When I apply a hasModDate filter
    Then no items should be returned