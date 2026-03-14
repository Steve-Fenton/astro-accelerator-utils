import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Paging } from '../../lib/v1/paging.mjs';

Given('I have a paging instance', function () {
    this.paging = new Paging();
});

When('I generate links with limit {int}, total {int}, current {int}, and URL {string}', function (limit, total, current, url) {
    this.result = this.paging.links(limit, total, current, url);
});

Then('{int} links should be generated', function (expectedLength) {
    assert.strictEqual(this.result.length, expectedLength);
});

Then('the first link should be for page {int}', function (pageNumber) {
    assert.strictEqual(this.result[0].title, pageNumber.toString());
});

Then('the second link should be for page {int}', function (pageNumber) {
    assert.strictEqual(this.result[1].title, pageNumber.toString());
});

Then('the third link should be for page {int}', function (pageNumber) {
    assert.strictEqual(this.result[2].title, pageNumber.toString());
});

Then('the fourth link should be for page {int}', function (pageNumber) {
    assert.strictEqual(this.result[3].title, pageNumber.toString());
});

Then('the last link should be for page {int}', function (pageNumber) {
    assert.strictEqual(this.result[this.result.length - 1].title, pageNumber.toString());
});

Then('the first link should have the {string} class', function (expectedClass) {
    assert.strictEqual(this.result[0].class, expectedClass);
});

Then('the first link should not have a collapse class', function () {
    assert.strictEqual(this.result[0].class, '');
});

Then('the last link should have the {string} class', function (expectedClass) {
    assert.strictEqual(this.result[this.result.length - 1].class, expectedClass);
});

Then('the last link should not have a collapse class', function () {
    assert.strictEqual(this.result[this.result.length - 1].class, '');
});

Then('none of the links should have a collapse class', function () {
    const hasCollapseClass = this.result.some(link => link.class.includes('paging-collapse'));
    assert.strictEqual(hasCollapseClass, false);
});
