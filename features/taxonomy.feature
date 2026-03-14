Feature: Taxonomy Formatting
    Taxonomy extracts and formats tags and categories from posts.

Scenario: all returns cached taxonomy if available
    Given I have a taxonomy instance with cached data
    When I request all taxonomy data
    Then the returned data should match the cached data

Scenario: links generates correct taxonomy links
    Given I have a taxonomy instance with translations
    When I generate links for subfolder "/docs" and lang function
    Then the tag link should be formatted correctly
    And the category link should be formatted correctly
    And tag should be "insigne"
    And category should be "categoria"

Scenario: links generates correct taxonomy links with default fallbacks
    Given I have a taxonomy instance with translations
    When I generate links with missing translations
    Then tag should be "tag"
    And category should be "category"


Scenario: getTaxonomy correctly aggregates tags and categories
    Given I have a taxonomy instance with a list of posts
    When I request to generate taxonomy
    Then the taxonomy should contain the aggregated tags and categories
    And the tags should be sorted
    And the categories should be sorted
    And the top tags should be sorted and limited

Scenario: sortByTitle sorts entries by title
    Given I have a taxonomy instance
    When I sort a list of entries by title
    Then the entries should be in alphabetical order

Scenario: sortByVolume sorts entries by count
    Given I have a taxonomy instance
    When I sort a list of entries by volume
    Then the entries should be in descending order of count
