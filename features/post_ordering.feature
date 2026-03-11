Feature: Post Ordering
    It should be possible to sort lists of posts by publication and modification dates.

Scenario: sortByPubDate sorts posts in ascending order by publication date
    Given I have a list of posts with different publication dates
    When I apply sortByPubDate
    Then the posts should be ordered from oldest to newest by publication date

Scenario: sortByPubDate handles missing pubDate with default fallback
    Given I have posts with and without publication dates
    When I apply sortByPubDate
    Then posts without pubDate should be treated as 1970-01-01

Scenario: sortByPubDateDesc sorts posts in descending order by publication date
    Given I have a list of posts with different publication dates
    When I apply sortByPubDateDesc
    Then the posts should be ordered from newest to oldest by publication date

Scenario: sortByPubDateDesc handles missing pubDate with default fallback
    Given I have posts with and without publication dates
    When I apply sortByPubDateDesc
    Then posts without pubDate should be treated as 1970-01-01 and sorted last

Scenario: sortByModDate sorts posts in ascending order by modification date
    Given I have a list of posts with different modification dates
    When I apply sortByModDate
    Then the posts should be ordered from oldest to newest by modification date

Scenario: sortByModDate handles missing both dates with default fallback
    Given I have posts without modDate or pubDate
    When I apply sortByModDate
    Then posts without dates should be treated as 1970-01-01

Scenario: sortByModDateDesc sorts posts in descending order by modification date
    Given I have a list of posts with different modification dates
    When I apply sortByModDateDesc
    Then the posts should be ordered from newest to oldest by modification date

Scenario: sortByModDateDesc handles missing both dates with default fallback
    Given I have posts without modDate or pubDate
    When I apply sortByModDateDesc
    Then posts without dates should be treated as 1970-01-01 and sorted last