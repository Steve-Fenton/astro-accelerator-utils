import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { PostFiltering } from '../../index.mjs';

Given('I have a list with an author and an article', function () {
    this.postList = [
        { frontmatter: { title: 'Test Author', layout: 'src/Layouts/Author.astro' } },
        { frontmatter: { title: 'Test Article', layout: 'src/Layouts/Default.astro' } }
    ];
});

Given('I have a list with a search page and an article', function () {
    this.postList = [
        { frontmatter: { title: 'Test Search', layout: 'src/Layouts/Search.astro' } },
        { frontmatter: { title: 'Test Article', layout: 'src/Layouts/Default.astro' } }
    ];
});

Given('I have a page with navSitemap set to false', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro', navSitemap: false } }];
});

Given('I have a listable page with navSitemap set to true', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro', navSitemap: true } }];
});

Given('I have a page with navSearch set to false', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro', navSearch: false } }];
});

Given('I have a listable page with navSearch set to true', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro', navSearch: true } }];
});

Given('I have a page with navMenu set to false', function () {
    this.postList = [{ frontmatter: { title: 'Test Page', navMenu: false } }];
});

Given('I have a page with null url', function () {
    this.postList = [{ url: null, frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro' } }];
});

Given('I have a page with empty url', function () {
    this.postList = [{ url: '', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro' } }];
});

Given('I have a page with null frontmatter', function () {
    this.postList = [{ url: '/test', frontmatter: null }];
});

Given('I have a page with null layout', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: null } }];
});

Given('I have a redirect page', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Redirect.astro' } }];
});

Given('I have a page with listable set to false', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro', listable: false } }];
});

Given('I have a draft page', function () {
    this.postList = [{ url: '/test', frontmatter: { title: 'Test Page', layout: 'src/Layouts/Default.astro', draft: true } }];
});

Given('I have a future-dated page', function () {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    this.postList = [{ url: '/future-test', frontmatter: { title: 'Future Test Page', layout: 'src/Layouts/Default.astro', pubDate: futureDate.toISOString() } }];
});

Given('I have a page with modDate', function () {
    this.postList = [{ frontmatter: { title: 'Test Page', modDate: '2023-01-01' } }];
});

Given('I have a page with pubDate', function () {
    this.postList = [{ frontmatter: { title: 'Test Page', pubDate: '2023-01-01' } }];
});

Given('I have a page without dates', function () {
    this.postList = [{ frontmatter: { title: 'Test Page' } }];
});

Given('I have a page without modDate', function () {
    this.postList = [{ frontmatter: { title: 'Test Page', pubDate: '2023-01-01' } }];
});

When('I apply an isAuthor filter', function () {
    this.result = this.postList.filter(PostFiltering.isAuthor);
});

When('I apply an notAuthor filter', function () {
    this.result = this.postList.filter(PostFiltering.notAuthor);
});

When('I apply an isSearch filter', function () {
    this.result = this.postList.filter(PostFiltering.isSearch);
});

When('I apply an notSearch filter', function () {
    this.result = this.postList.filter(PostFiltering.notSearch);
});

When('I apply a showInSitemap filter', function () {
    this.result = this.postList.filter(PostFiltering.showInSitemap);
});

When('I apply a showInSearch filter', function () {
    this.result = this.postList.filter(PostFiltering.showInSearch);
});

When('I apply a showInMenu filter', function () {
    this.result = this.postList.filter(PostFiltering.showInMenu);
});

When('I apply an isListable filter', function () {
    this.result = this.postList.filter(PostFiltering.isListable);
});

When('I apply an forTaxonomy filter', function () {
    this.result = this.postList.filter(PostFiltering.forTaxonomy);
});

When('I apply a hasDate filter', function () {
    this.result = this.postList.filter(PostFiltering.hasDate);
});

When('I apply a hasModDate filter', function () {
    this.result = this.postList.filter(PostFiltering.hasModDate);
});

Then('the only item returned should be {string}', function (title) {
    assert.strictEqual(this.result.length, 1);
    assert.strictEqual(this.result[0].frontmatter.title, title);
});

Then('no items should be returned', function () {
    assert.strictEqual(this.result.length, 0);
});

Then('the item should be returned', function () {
    assert.strictEqual(this.result.length, 1);
});
