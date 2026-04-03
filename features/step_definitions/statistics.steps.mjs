import assert from 'node:assert';
import { Given, When, Then, Before } from '@cucumber/cucumber';
import { Statistics } from '../../lib/v1/statistics.mjs';
import fs from 'fs';
import path from 'path';

Before(function() {
    try {
        Statistics.purge();
    } catch (e) {
        // ignore
    }
});

Given('I have a statistics instance with quoted operation', function () {
    this.stats = new Statistics('test "operation" name');
});

Then('the operation name should not contain quotes', function () {
    assert.strictEqual(this.stats.operation, 'test operation name');
});

Given('I have a statistics instance', function () {
    this.stats = new Statistics('test');
});

When('I get milliseconds', function () {
    this.result = this.stats.getMilliseconds();
});

Then('the result should be a positive number', function () {
    assert.ok(this.result > 0);
});

When('I start timing', function () {
    this.stats.start();
});

Then('the start property should be set', function () {
    assert.ok(typeof this.stats.start === 'number');
});

When('I start and stop timing', function () {
    this.stats.start();
    this.stats.stop();
});

Then('the duration should be calculated', function () {
    assert.ok(this.stats.duration >= 0);
});

Given('the log file does not exist', function () {
    const filePath = Statistics.getItemPath();
    try {
        fs.unlinkSync(filePath);
    } catch (e) {
        // ignore if doesn't exist
    }
});

When('I stop timing', function () {
    this.stats = new Statistics('test-log-file');
    this.stats.start();
    this.stats.stop();
});

Then('the log file should be created', function () {
    const filePath = Statistics.getItemPath();
    assert.ok(fs.existsSync(filePath));
});

Given('the log file exists', function () {
    const stats = new Statistics('setup');
    stats.start();
    stats.stop();
});

When('I purge statistics', function () {
    Statistics.purge();
});

Then('the log file should be recreated with headers', function () {
    const filePath = Statistics.getItemPath();
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(content.startsWith('Operation,Date,Duration'));
});

Then('the log path should be in the .log directory', function () {
    const logPath = Statistics.getLogPath();
    assert.ok(logPath.endsWith('.log/') || logPath.endsWith('.log'));
});

Then('the item path should end with statistics.csv', function () {
    const itemPath = Statistics.getItemPath();
    assert.ok(itemPath.endsWith('statistics.csv'));
});
