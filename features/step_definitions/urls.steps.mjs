import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { UrlFormatter } from '../../lib/v1/urls.mjs';

const SITE_URL = 'https://www.example.com/';

// Single mode-driven Given — 'enabled' or 'disabled'
Given('I am using a URL formatter with trailing slashes {word}', function (mode) {
    this.formatter = new UrlFormatter(SITE_URL, '', mode === 'enabled');
});

Given('I am using a URL formatter without a subfolder', function () {
    this.formatter = new UrlFormatter(SITE_URL, '', true);
});

Given('I am using a URL formatter with subfolder {string}', function (subfolder) {
    this.formatter = new UrlFormatter(SITE_URL, subfolder, true);
});

// formatAddress

When('I format the address {string}', function (address) {
    this.result = this.formatter.formatAddress(address);
});

When('I format an undefined address', function () {
    this.result = this.formatter.formatAddress(undefined);
});

Then('the formatted address should be {string}', function (expected) {
    assert.strictEqual(this.result, expected);
});

// formatUrl

When('I format the URL {string}', function (url) {
    this.result = this.formatter.formatUrl(new URL(url));
});

When('I format an undefined URL', function () {
    this.result = this.formatter.formatUrl(undefined);
});

Then('the formatted URL pathname should be {string}', function (expected) {
    assert.strictEqual(this.result.pathname, expected);
});

// addSlashToAddress

When('I add a slash to the address {string}', function (address) {
    this.result = this.formatter.addSlashToAddress(address);
});

When('I add a slash to an undefined address', function () {
    this.result = this.formatter.addSlashToAddress(undefined);
});

// addSlashToUrl

When('I add a slash to the URL {string}', function (url) {
    this.result = this.formatter.addSlashToUrl(new URL(url));
});

When('I add a slash to an undefined URL', function () {
    this.result = this.formatter.addSlashToUrl(undefined);
});

// getAuthorId

When('I get the author id from {string}', function (url) {
    this.result = this.formatter.getAuthorId(new URL(url));
});

Then('the author id should be {string}', function (expected) {
    assert.strictEqual(this.result, expected);
});
