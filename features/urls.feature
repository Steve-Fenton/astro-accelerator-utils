Feature: URL Formatting
    URLs should be formatted correctly with or without trailing slashes.

Scenario Outline: formatAddress adds a trailing slash
    Given I am using a URL formatter with trailing slashes enabled
    When I format the address "<Address>"
    Then the formatted address should be "<Output>"

Examples:
    | Address                                            | Output                                             |
    | /test/address                                      | /test/address/                                     |
    | /test/address/                                     | /test/address/                                     |
    | https://www.external-site.com/test/address         | https://www.external-site.com/test/address         |

Scenario: formatAddress handles an empty address with trailing slashes
    Given I am using a URL formatter with trailing slashes enabled
    When I format the address ""
    Then the formatted address should be "/"

Scenario: formatAddress handles an undefined address with trailing slashes
    Given I am using a URL formatter with trailing slashes enabled
    When I format an undefined address
    Then the formatted address should be "/"

Scenario Outline: formatAddress removes a trailing slash
    Given I am using a URL formatter with trailing slashes disabled
    When I format the address "<Address>"
    Then the formatted address should be "<Output>"

Examples:
    | Address                                            | Output                                             |
    | /test/address                                      | /test/address                                      |
    | /test/address/                                     | /test/address                                      |
    | https://www.external-site.com/test/address/        | https://www.external-site.com/test/address/        |

Scenario: formatAddress handles an empty address with no trailing slashes
    Given I am using a URL formatter with trailing slashes disabled
    When I format the address ""
    Then the formatted address should be "/"

Scenario: formatAddress handles an undefined address with no trailing slashes
    Given I am using a URL formatter with trailing slashes disabled
    When I format an undefined address
    Then the formatted address should be "/"

Scenario Outline: formatUrl adds or removes trailing slash on a URL object
    Given I am using a URL formatter with trailing slashes <Mode>
    When I format the URL "<Url>"
    Then the formatted URL pathname should be "<Output>"

Examples:
    | Mode     | Url                                        | Output          |
    | enabled  | https://www.example.com/test/address       | /test/address/  |
    | enabled  | https://www.example.com/test/address/      | /test/address/  |
    | disabled | https://www.example.com/test/address/      | /test/address   |
    | disabled | https://www.example.com/test/address       | /test/address   |

Scenario: formatUrl handles undefined URL with trailing slashes enabled
    Given I am using a URL formatter with trailing slashes enabled
    When I format an undefined URL
    Then the formatted URL pathname should be "/"

Scenario: formatUrl handles undefined URL with no trailing slashes
    Given I am using a URL formatter with trailing slashes disabled
    When I format an undefined URL
    Then the formatted URL pathname should be "/"

Scenario Outline: addSlashToAddress always adds a trailing slash
    Given I am using a URL formatter with trailing slashes enabled
    When I add a slash to the address "<Address>"
    Then the formatted address should be "<Output>"

Examples:
    | Address                                            | Output                                             |
    | /test/address                                      | /test/address/                                     |
    | /test/address/                                     | /test/address/                                     |
    | https://www.external-site.com/test/address         | https://www.external-site.com/test/address         |

Scenario: addSlashToAddress handles an empty address
    Given I am using a URL formatter with trailing slashes enabled
    When I add a slash to the address ""
    Then the formatted address should be "/"

Scenario: addSlashToAddress handles an undefined address
    Given I am using a URL formatter with trailing slashes enabled
    When I add a slash to an undefined address
    Then the formatted address should be "/"

Scenario Outline: addSlashToUrl always adds a trailing slash to a URL object
    Given I am using a URL formatter with trailing slashes enabled
    When I add a slash to the URL "<Url>"
    Then the formatted URL pathname should be "<Output>"

Examples:
    | Url                                          | Output         |
    | https://www.example.com/test/address         | /test/address/ |
    | https://www.example.com/test/address/        | /test/address/ |

Scenario: addSlashToUrl handles undefined URL
    Given I am using a URL formatter with trailing slashes enabled
    When I add a slash to an undefined URL
    Then the formatted URL pathname should be "/"

Scenario: getAuthorId retrieves author id without subfolder
    Given I am using a URL formatter without a subfolder
    When I get the author id from "https://www.example.com/authors/steve-fenton/"
    Then the author id should be "steve-fenton"

Scenario: getAuthorId retrieves author id with subfolder
    Given I am using a URL formatter with subfolder "docs"
    When I get the author id from "https://www.example.com/docs/authors/steve-fenton/"
    Then the author id should be "steve-fenton"
