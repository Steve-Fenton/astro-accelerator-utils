import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Accelerator } from '../../index.mjs';

function stripLineBreaks(input) {
    return input.replace(/(\r\n|\n|\r)/gm, '');
}

Given('I am using the markdown parser', function () {
    this.markdown = new Accelerator({}).markdown;
});

When('I parse the text {string}', function (text) {
    this.input = text === '[null]' ? null : text;
});

Then('the HTML should be {string}', async function (expected) {
    const result = await this.markdown.getHtmlFrom(this.input);
    assert.strictEqual(stripLineBreaks(result), expected);
});

Then('the inline HTML should be {string}', async function (expected) {
    const result = await this.markdown.getInlineHtmlFrom(this.input);
    assert.strictEqual(stripLineBreaks(result), expected);
});

Then('the plain text should be {string}', async function (expected) {
    const result = await this.markdown.getTextFrom(this.input);
    const expectedValue = expected === '[null]' ? null : expected;
    assert.strictEqual(stripLineBreaks(result), stripLineBreaks(expectedValue ?? ''));
});


When('I convert {string} to title case', function (input) {
    const value = input === '[null]' ? null : input;
    this.titleResult = this.markdown.titleCase(value);
});

Then('the title case result should be {string}', function (expected) {
    assert.strictEqual(this.titleResult, expected);
});


When('I check if {string} has uppercase', function (input) {
    const value = input === '[null]' ? null : input;
    this.upperResult = this.markdown.hasUpperCase(value);
});

Then('the uppercase check should be true', function () {
    assert.strictEqual(this.upperResult, true);
});

Then('the uppercase check should be false', function () {
    assert.strictEqual(this.upperResult, false);
});

When('I check if {string} is a letter', function (char) {
    const value = char === '[null]' ? null : char;
    this.letterResult = this.markdown.isLetter(value);
});

Then('the letter check should be true', function () {
    assert.ok(this.letterResult);
});

Then('the letter check should be false', function () {
    assert.ok(!this.letterResult);
});
