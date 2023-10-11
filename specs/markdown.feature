Feature: Markdown
    Strings with markdown should be converted correctly

Scenario Outline: Markdown to HTML formatting
    Given I am using the markdown parser
    When I parse the text "<Text>"
    Then the HTML should be "<Output>"

Examples:
    | Text                   | Output                                     |
    |------------------------|--------------------------------------------|
    | Test *some* markdown   | <p>Test <em>some</em> markdown</p>         |
    | Test **some** markdown | <p>Test <strong>some</strong> markdown</p> |
    | Test \*some\* markdown | <p>Test *some* markdown</p>                |

Scenario Outline: Markdown to inline HTML formatting
    Given I am using the markdown parser
    When I parse the text "<Text>"
    Then the inline HTML should be "<Output>"

Examples:
    | Text                   | Output                                                          |
    |------------------------|-----------------------------------------------------------------|
    | Test *some* markdown   | Test <em>some</em> markdown                                     |
    | > Test *some* markdown | <blockquote><p>Test <em>some</em> markdown</p></blockquote> |

Scenario Outline: Markdown to text formatting
    Given I am using the markdown parser
    When I parse the text "<Text>"
    Then the plain text should be "<Output>"

Examples:
    | Text                   | Output                            |
    |------------------------|-----------------------------------|
    | Test *some* markdown   | Test some markdown                |
    | > Test *some* markdown | Test some markdown                |