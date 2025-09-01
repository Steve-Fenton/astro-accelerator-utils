Feature: Dates
    Dates should be formatted correctly according to format and culture.

Scenario Outline: Date formatting
    Given I am using default date options
    When I format the short date "<Date>" with the culture "<Culture>"
    Then the result should be "<Output>"

Examples:
    | Culture | Date       | Output                  |
    |---------|------------|-------------------------|
    | en      | 2022-06-30 | Jun 30, 2022            |
    | fr      | 2022-06-30 | 30 juin 2022            |

Scenario: Null Dates
    Given I am using default date options
    When I format a null short date
    Then the result should be an empty string