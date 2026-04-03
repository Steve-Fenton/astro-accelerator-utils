Feature: Statistics
    The Statistics class tracks operation timing and logs to CSV.

Scenario: Constructor strips quotes from operation name
    Given I have a statistics instance with quoted operation
    Then the operation name should not contain quotes

Scenario: getMilliseconds returns high resolution time
    Given I have a statistics instance
    When I get milliseconds
    Then the result should be a positive number

Scenario: start sets start time
    Given I have a statistics instance
    When I start timing
    Then the start property should be set

Scenario: stop calculates duration and logs
    Given I have a statistics instance
    When I start and stop timing
    Then the duration should be calculated

Scenario: stop creates log file if it doesn't exist
    Given the log file does not exist
    When I stop timing
    Then the log file should be created

Scenario: purge clears the stats file
    Given the log file exists
    When I purge statistics
    Then the log file should be recreated with headers

Scenario: getLogPath returns correct path
    Given I have a statistics instance
    Then the log path should be in the .log directory

Scenario: getItemPath returns correct file path
    Given I have a statistics instance
    Then the item path should end with statistics.csv
