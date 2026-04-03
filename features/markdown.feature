Feature: Markdown
    Strings with markdown should be converted correctly

Scenario Outline: Markdown to HTML formatting
    Given I am using the markdown parser
    When I parse the text "<Text>"
    Then the HTML should be "<Output>"

Examples:
    | Text                   | Output                                     |
    | Test *some* markdown   | <p>Test <em>some</em> markdown</p>         |
    | Test **some** markdown | <p>Test <strong>some</strong> markdown</p> |
    | Test \*some\* markdown | <p>Test *some* markdown</p>                |

Scenario Outline: Markdown to inline HTML formatting
    Given I am using the markdown parser
    When I parse the text "<Text>"
    Then the inline HTML should be "<Output>"

Examples:
    | Text                   | Output                                                          |
    | Test *some* markdown   | Test <em>some</em> markdown                                     |
    | > Test *some* markdown | <blockquote><p>Test <em>some</em> markdown</p></blockquote> |

Scenario Outline: Markdown to text formatting
    Given I am using the markdown parser
    When I parse the text "<Text>"
    Then the plain text should be "<Output>"

Examples:
    | Text                   | Output                            |
    | Test *some* markdown   | Test some markdown                |
    | > Test *some* markdown | Test some markdown                |
    | Test ~some~ markdown   | Test some markdown                |
    | Test some\ markdown    | Test some markdown                |

Scenario: getTextFrom handles null input
    Given I am using the markdown parser
    When I get plain text from null
    Then the text result should be empty

Scenario: titleCase converts string to title case
    Given I am using the markdown parser
    When I convert "hello world" to title case
    Then the title case result should be "Hello World"

Scenario: titleCase handles null input
    Given I am using the markdown parser
    When I convert null to title case
    Then the title case result should be empty

Scenario: titleCase preserves existing uppercase words
    Given I am using the markdown parser
    When I convert "API and JSON" to title case
    Then the title case result should be "API And JSON"

Scenario: titleCase handles words with special characters
    Given I am using the markdown parser
    When I convert "it's a test" to title case
    Then the title case result should be "It's A Test"

Scenario: hasUpperCase detects uppercase letters
    Given I am using the markdown parser
    When I check if "Hello World" has uppercase
    Then the uppercase check should be true

Scenario: hasUpperCase returns false for lowercase only
    Given I am using the markdown parser
    When I check if "hello world" has uppercase
    Then the uppercase check should be false

Scenario: hasUpperCase handles empty string
    Given I am using the markdown parser
    When I check if "" has uppercase
    Then the uppercase check should be false

Scenario: isLetter identifies letters correctly
    Given I am using the markdown parser
    When I check if "a" is a letter
    Then the letter check should be true

Scenario: isLetter identifies non-letters correctly
    Given I am using the markdown parser
    When I check if "1" is a letter
    Then the letter check should be false

