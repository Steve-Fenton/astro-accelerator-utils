import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Accelerator } from '../../index.mjs';

Given('I have a {int} second cache', function (seconds) {
    const site = { cacheMaxAge: seconds };
    const accelerator = new Accelerator(site);
    this.cache = accelerator.cache;
    this.calls = 0;
    this.func = () => {
        this.calls++;
        return this.calls;
    };
});

When('I cache an item called {string}', function (key) {
    this.cache.get(key, this.func);
});

When('I retrieve an item called {string}', function (key) {
    this.result = this.cache.get(key, this.func);
});

When('I clear the cache', function () {
    this.cache.clear();
});

Then('the cached item should be retrieved', function () {
    assert.strictEqual(this.result, 1);
});

Then('the item called {string} should be null', function (key) {
    assert.strictEqual(this.cache.getItem(key), null);
});

Then('the function should be called only once', function () {
    assert.strictEqual(this.calls, 1);
});
