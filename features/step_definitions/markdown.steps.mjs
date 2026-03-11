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
    this.input = text;
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
    assert.strictEqual(stripLineBreaks(result), expected);
});
