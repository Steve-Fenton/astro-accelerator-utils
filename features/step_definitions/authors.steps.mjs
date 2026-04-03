import assert from 'node:assert';
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Authors } from '../../lib/v1/authors.mjs';

let consoleWarnCalled = false;
let originalWarn;

class MockPosts {
    constructor(authors) {
        this.authors = authors;
    }

    all() {
        return this.authors;
    }
}

Before(function() {
    consoleWarnCalled = false;
    originalWarn = console.warn;
    console.warn = () => { consoleWarnCalled = true; };
});

After(function() {
    console.warn = originalWarn;
});

Given('I have authors with different ids', function () {
    this.mockPosts = new MockPosts([
        { url: '/authors/john-smith', frontmatter: { id: 'john-smith', title: 'John Smith', layout: 'src/Layouts/Author.astro', bannerImage: '/img/john.jpg' } },
        { url: '/authors/jane-doe', frontmatter: { id: 'jane-doe', title: 'Jane Doe', layout: 'src/Layouts/Author.astro', bannerImage: '/img/jane.jpg' } }
    ]);
    this.authors = new Authors(this.mockPosts);
});

When('I get author info for {string}', function (slug) {
    this.result = this.authors.info(slug);
});

Then('I should get the author with name {string}', function (name) {
    assert.strictEqual(this.result.frontmatter.title, name);
});

Then('no author should be returned', function () {
    assert.strictEqual(this.result, undefined);
});

Given('I have authors and a post with multiple authors', function () {
    this.mockPosts = new MockPosts([
        { url: '/authors/john-smith', frontmatter: { id: 'john-smith', title: 'John Smith', layout: 'src/Layouts/Author.astro', bannerImage: '/img/john.jpg' } },
        { url: '/authors/jane-doe', frontmatter: { id: 'jane-doe', title: 'Jane Doe', layout: 'src/Layouts/Author.astro', bannerImage: '/img/jane.jpg' } }
    ]);
    this.authors = new Authors(this.mockPosts);
    this.postFrontmatter = { authors: ['john-smith', 'jane-doe'] };
});

When('I process the post frontmatter for authors', function () {
    this.result = this.authors.forPost(this.postFrontmatter);
});

Then('the main author should be {string}', function (name) {
    assert.strictEqual(this.result.mainAuthor.frontmatter.title, name);
});

Then('the contributors should include {string}', function (name) {
    assert.strictEqual(this.result.contributors.length, 1);
    assert.strictEqual(this.result.contributors[0].frontmatter.title, name);
});

Given('I have authors in the system', function () {
    this.mockPosts = new MockPosts([
        { url: '/authors/john-smith', frontmatter: { id: 'john-smith', title: 'John Smith', layout: 'src/Layouts/Author.astro' } }
    ]);
    this.authors = new Authors(this.mockPosts);
});

When('I process the post frontmatter with no authors', function () {
    this.result = this.authors.forPost({});
});

Then('the result should have no main author', function () {
    assert.strictEqual(this.result.mainAuthor, undefined);
});

Then('the result should have no contributors', function () {
    assert.strictEqual(this.result.contributors.length, 0);
    assert.strictEqual(this.result.writers.length, 0);
});

Given('I have authors and a post with unknown author', function () {
    this.mockPosts = new MockPosts([
        { url: '/authors/john-smith', frontmatter: { id: 'john-smith', title: 'John Smith', layout: 'src/Layouts/Author.astro' } }
    ]);
    this.authors = new Authors(this.mockPosts);
    this.postFrontmatter = { authors: ['unknown-author'] };
});

When('I process the post frontmatter with unknown author', function () {
    this.result = this.authors.forPost(this.postFrontmatter);
});

Then('a warning should be logged for unknown author', function () {
    assert.ok(consoleWarnCalled);
});

Given('I have duplicate author entries', function () {
    this.mockPosts = new MockPosts([
        { url: '/authors/john-smith', frontmatter: { id: 'john', title: 'John Smith', layout: 'src/Layouts/Author.astro' } },
        { url: '/authors/john-smith-2', frontmatter: { id: 'john', title: 'John Smith 2', layout: 'src/Layouts/Author.astro' } }
    ]);
    this.authors = new Authors(this.mockPosts);
    this.postFrontmatter = { authors: ['john'] };
});

Then('a warning should be logged for duplicate authors', function () {
    assert.ok(consoleWarnCalled);
});
