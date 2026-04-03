import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Accelerator } from '../../index.mjs';

Given('I am using default date options', function () {
    const site = {
        dateOptions: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },
        shortDateOptions: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }
    };
    this.dateFormatter = new Accelerator(site).dateFormatter;
});

When('I format the date {string} with the culture {string}', function (date, culture) {
    this.result = this.dateFormatter.formatDate(date, culture);
});

When('I format a null date', function () {
    this.result = this.dateFormatter.formatDate(null, 'en');
});

When('I format the short date {string} with the culture {string}', function (date, culture) {
    this.result = this.dateFormatter.formatShortDate(date, culture);
});

When('I format a null short date', function () {
    this.result = this.dateFormatter.formatShortDate(null, 'en');
});

When('I format the date {string} without day with the culture {string}', function (date, culture) {
    this.result = this.dateFormatter.formatDateWithoutDay(date, culture);
});

When('I format the short date {string} without day with the culture {string}', function (date, culture) {
    this.result = this.dateFormatter.formatShortDateWithoutDay(date, culture);
});

Then('the result should be {string}', function (expected) {
    assert.strictEqual(this.result, expected);
});

Then('the result should be an empty string', function () {
    assert.strictEqual(this.result, '');
});

When('I format a null date without day', function () {
    this.result = this.dateFormatter.formatDateWithoutDay(null, 'en');
});

When('I format a null short date without day', function () {
    this.result = this.dateFormatter.formatShortDateWithoutDay(null, 'en');
});
