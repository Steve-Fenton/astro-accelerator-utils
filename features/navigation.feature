Feature: Navigation
    The Navigation class handles breadcrumbs, menus, and footer navigation.

Scenario: isNavPage returns true for NavPage objects
    Given I have a basic navigation instance
    When I check if a NavPage object is a NavPage
    Then the isNavPage result should be true

Scenario: isNavPage returns false for 'auto'
    Given I have a basic navigation instance
    When I check if string "auto" is a NavPage
    Then the isNavPage result should be false

Scenario: isNavPage returns false for 'tags'
    Given I have a basic navigation instance
    When I check if string "tags" is a NavPage
    Then the isNavPage result should be false

Scenario: isNavPage returns false for 'toptags'
    Given I have a basic navigation instance
    When I check if string "toptags" is a NavPage
    Then the isNavPage result should be false

Scenario: isNavPage returns false for 'categories'
    Given I have a basic navigation instance
    When I check if string "categories" is a NavPage
    Then the isNavPage result should be false

Scenario: popMatchingPage finds and removes a page
    Given I have a list of pages with one matching
    When I pop the page with url "/page2"
    Then the matched page should have title "Page 2"
    And the remaining pages should have 2 items

Scenario: popMatchingPage returns null when no match
    Given I have a list of pages
    When I pop the page with url "/nonexistent"
    Then no page should be returned

Scenario: mapNavPage maps a page correctly
    Given I have a page with frontmatter
    When I map it to a NavPage
    Then the NavPage should have the correct title and url

Scenario: mapNavPage handles null url
    Given I have a page with null url for mapNavPage
    When I map it to a NavPage
    Then the url should be "/"

Scenario: mapNavPage handles paged pages
    Given I have a paged page
    When I map it to a NavPage
    Then the url should end with "/1/"

Scenario: mapNavPage handles redirect pages
    Given I have a redirect page for mapNavPage
    When I map it to a NavPage
    Then the url should be the redirect target

Scenario: mapCrumbNavPage uses crumbTitle when available
    Given I have a page with crumbTitle
    When I map it to a crumb NavPage
    Then the title should be the crumbTitle

Scenario: setCurrentPage marks current page
    Given I have pages for setCurrentPage
    When I set the current page to "/page2"
    Then the ariaCurrent should be "page"
    And the isOpen should be true for the matching page

Scenario: setCurrentPage sets isOpen for child pages
    Given I have nested pages for setCurrentPage
    When I set the current page to "/parent/child"
    Then the parent's isOpen should be true

Scenario: breadcrumbs creates breadcrumb trail
    Given I have pages at different paths
    When I get breadcrumbs for "/blog/post"
    Then I should have 2 breadcrumb items

Scenario: menu adds custom menu items
    Given I have a navigation instance for menu
    When I create a menu with custom items
    Then the menu should have the custom items

Scenario: autoMenu generates menu from pages
    Given I have pages with navMenu
    When I get the auto menu
    Then the auto menu should include those pages

Scenario: getChildren returns direct children
    Given I have a hierarchy of pages
    When I get children of "/parent"
    Then I should get only direct children

Scenario: addMenuItem adds children recursively
    Given I have a menu item with children
    When I add the menu item
    Then children should be added recursively

Scenario: footer builds footer with tags
    Given I have taxonomy with tags
    When I build the footer menu with tags
    Then the footer should have tag items

Scenario: footer builds footer with categories
    Given I have taxonomy with categories
    When I build the footer menu with categories
    Then the footer should have category items

Scenario: footer builds footer with top tags
    Given I have taxonomy with top tags
    When I build the footer menu with toptags
    Then the footer should have top tag items
