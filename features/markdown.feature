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
    | Text                   | Output             |
    | Test *some* markdown   | Test some markdown |
    | > Test *some* markdown | Test some markdown |
    | Test ~some~ markdown   | Test some markdown |
    | Test some\ markdown    | Test some markdown |
    | [null]                 |                    |

Scenario Outline: titleCase conversion
    Given I am using the markdown parser
    When I convert "<Input>" to title case
    Then the title case result should be "<Output>"

Examples:
    | Input        | Output       |
    | hello world  | Hello World  |
    | [null]       |              |
    | API and JSON | API And JSON |
    | it's a test  | It's A Test  |
    | hello  world | Hello World  |

Scenario Outline: hasUpperCase check
    Given I am using the markdown parser
    When I check if "<Input>" has uppercase
    Then the uppercase check should be <Result>

Examples:
    | Input       | Result |
    | Hello World | true   |
    | hello world | false  |
    |             | false  |

Scenario Outline: isLetter check
    Given I am using the markdown parser
    When I check if "<Char>" is a letter
    Then the letter check should be <Result>

Examples:
    | Char | Result |
    | a    | true   |
    | 1    | false  |
