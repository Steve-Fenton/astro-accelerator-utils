import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Accelerator } from '../../index.mjs';
import { Posts } from '../../lib/v1/posts.mjs';
import { Cache } from '../../lib/v1/cache.mjs';
import { UrlFormatter } from '../../lib/v1/urls.mjs';
import { Taxonomy } from '../../lib/v1/taxonomy.mjs';
import { Navigation } from '../../lib/v1/navigation.mjs';
import { Markdown } from '../../lib/v1/markdown.mjs';
import { Paging } from '../../lib/v1/paging.mjs';
import { Authors } from '../../lib/v1/authors.mjs';
import { DateFormatter } from '../../lib/v1/dates.mjs';
import { Statistics } from '../../lib/v1/statistics.mjs';
import { StatisticsStub } from '../../lib/v1/statistics-stub.mjs';

Given('I have a site configuration', function () {
    this.site = {
        cacheMaxAge: 10,
        dateOptions: { weekday: 'long' },
        shortDateOptions: { month: 'short' },
        url: 'https://example.com',
        subfolder: '',
        useTrailingUrlSlash: true,
        captureStatistics: false
    };
});

When('I create an accelerator instance', function () {
    this.accelerator = new Accelerator(this.site);
});

Then('the properties should be initialized', function () {
    assert.strictEqual(this.accelerator.cacheMaxAge, 10);
    assert.strictEqual(this.accelerator.siteUrl, 'https://example.com');
    assert.strictEqual(this.accelerator.subfolder, '');
});

Given('I have an accelerator instance', function () {
    this.site = {
        cacheMaxAge: 10,
        dateOptions: { weekday: 'long' },
        shortDateOptions: { month: 'short' },
        url: 'https://example.com',
        subfolder: '',
        useTrailingUrlSlash: true,
        captureStatistics: false
    };
    this.accelerator = new Accelerator(this.site);
});

Then('I should have access to posts', function () {
    const posts = this.accelerator.posts;
    assert.ok(posts instanceof Posts);
});

Then('I should have access to cache', function () {
    const cache = this.accelerator.cache;
    assert.ok(cache instanceof Cache);
});

Then('I should have access to urlFormatter', function () {
    const urlFormatter = this.accelerator.urlFormatter;
    assert.ok(urlFormatter instanceof UrlFormatter);
});

Then('I should have access to taxonomy', function () {
    const taxonomy = this.accelerator.taxonomy;
    assert.ok(taxonomy instanceof Taxonomy);
});

Then('I should have access to navigation', function () {
    const navigation = this.accelerator.navigation;
    assert.ok(navigation instanceof Navigation);
});

Then('I should have access to markdown', function () {
    const markdown = this.accelerator.markdown;
    assert.ok(markdown instanceof Markdown);
});

Then('I should have access to paging', function () {
    const paging = this.accelerator.paging;
    assert.ok(paging instanceof Paging);
});

Then('I should have access to authors', function () {
    const authors = this.accelerator.authors;
    assert.ok(authors instanceof Authors);
});

Then('I should have access to dateFormatter', function () {
    const dateFormatter = this.accelerator.dateFormatter;
    assert.ok(dateFormatter instanceof DateFormatter);
});

Given('I have an accelerator with statistics enabled', function () {
    this.site = {
        cacheMaxAge: 10,
        dateOptions: {},
        shortDateOptions: {},
        url: 'https://example.com',
        subfolder: '',
        useTrailingUrlSlash: true,
        captureStatistics: true
    };
    this.accelerator = new Accelerator(this.site);
});

Then('I should have access to Statistics', function () {
    assert.strictEqual(this.accelerator.statistics, Statistics);
});

Given('I have an accelerator with statistics disabled', function () {
    this.site = {
        cacheMaxAge: 10,
        dateOptions: {},
        shortDateOptions: {},
        url: 'https://example.com',
        subfolder: '',
        useTrailingUrlSlash: true,
        captureStatistics: false
    };
    this.accelerator = new Accelerator(this.site);
});

Then('I should have access to StatisticsStub', function () {
    assert.strictEqual(this.accelerator.statistics, StatisticsStub);
});
