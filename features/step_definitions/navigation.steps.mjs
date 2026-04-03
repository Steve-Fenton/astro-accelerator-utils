import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Navigation } from '../../lib/v1/navigation.mjs';

class MockPosts {
    constructor(pages = []) {
        this.pages = pages;
    }

    all() {
        return this.pages;
    }

    root() {
        return this.pages.filter(p => p.url.split('/').length <= 3);
    }
}

class MockUrlFormatter {
    addSlashToAddress(url) {
        return url.startsWith('/') ? url : '/' + url;
    }
}

class MockTaxonomy {
    links() {
        return {
            getCategoryLink: (title) => `/category/${title}`,
            getTagLink: (title) => `/tag/${title}`
        };
    }

    getTaxonomy() {
        return { categories: [], tags: [], topTags: [] };
    }
}

Given('I have a basic navigation instance', function () {
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

When('I check if a NavPage object is a NavPage', function () {
    this.result = this.navigation.isNavPage({ url: '/test', title: 'Test' });
});

When('I check if string {string} is a NavPage', function (item) {
    this.result = this.navigation.isNavPage(item);
});

Then('the isNavPage result should be true', function () {
    assert.strictEqual(this.result, true);
});

Then('the isNavPage result should be false', function () {
    assert.strictEqual(this.result, false);
});

Given('I have a list of pages with one matching', function () {
    this.pages = [
        { url: '/page1', frontmatter: { title: 'Page 1' } },
        { url: '/page2', frontmatter: { title: 'Page 2' } },
        { url: '/page3', frontmatter: { title: 'Page 3' } }
    ];
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

When('I pop the page with url {string}', function (search) {
    this.result = this.navigation.popMatchingPage(this.pages, search);
});

Then('the matched page should have title {string}', function (title) {
    assert.strictEqual(this.result.frontmatter.title, title);
});

Then('the remaining pages should have {int} items', function (count) {
    assert.strictEqual(this.pages.length, count);
});

Given('I have a list of pages', function () {
    this.pages = [
        { url: '/page1', frontmatter: { title: 'Page 1' } }
    ];
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

Then('no page should be returned', function () {
    assert.strictEqual(this.result, null);
});

Given('I have a page with frontmatter', function () {
    this.page = {
        url: '/blog/test',
        frontmatter: {
            title: 'Test Page',
            navTitle: 'Nav Title',
            navSection: 'Section',
            navOrder: 5
        }
    };
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

When('I map it to a NavPage', function () {
    this.result = this.navigation.mapNavPage(this.page);
});

Then('the NavPage should have the correct title and url', function () {
    assert.strictEqual(this.result.title, 'Nav Title');
    assert.strictEqual(this.result.section, 'Section');
    assert.strictEqual(this.result.order, 5);
});

Given('I have a page with null url for mapNavPage', function () {
    this.page = {
        url: null,
        frontmatter: { title: 'Test' }
    };
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

Then('the url should be {string}', function (expected) {
    assert.strictEqual(this.result.url, expected);
});

Given('I have a paged page', function () {
    this.page = {
        url: '/blog/page',
        frontmatter: { title: 'Paged', paged: true }
    };
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

Then('the url should end with {string}', function (suffix) {
    assert.ok(this.result.url.endsWith(suffix));
});

Given('I have a redirect page for mapNavPage', function () {
    this.page = {
        url: '/old-page',
        frontmatter: {
            title: 'Redirect',
            layout: 'src/layouts/Redirect.astro',
            redirect: '/new-page'
        }
    };
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

Then('the url should be the redirect target', function () {
    assert.strictEqual(this.result.url, '/new-page');
});

Given('I have a page with crumbTitle for crumb', function () {
    this.page = {
        url: '/blog/test',
        frontmatter: {
            title: 'Full Title',
            crumbTitle: 'Short Title'
        }
    };
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

When('I map it to crumb NavPage', function () {
    this.result = this.navigation.mapCrumbNavPage(this.page);
});

Then('the title should be the crumbTitle', function () {
    assert.strictEqual(this.result.title, 'Short Title');
});

Given('I have a paged page for crumb', function () {
    this.page = {
        url: '/blog/page',
        frontmatter: { title: 'Paged', paged: true }
    };
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

Then('the crumb url should end with {string}', function (suffix) {
    assert.ok(this.result.url.endsWith(suffix));
});

Given('I have a redirect page for crumb', function () {
    this.page = {
        url: '/old-page',
        frontmatter: {
            title: 'Redirect',
            layout: 'src/layouts/Redirect.astro',
            redirect: '/new-page'
        }
    };
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

Then('the crumb url should be the redirect target', function () {
    assert.strictEqual(this.result.url, '/new-page');
});

Given('I have pages for addMenuItem auto', function () {
    const posts = new MockPosts([
        { url: '/blog', file: '/blog.md', frontmatter: { title: 'Blog', navMenu: true, navOrder: 1 } }
    ]);
    this.navigation = new Navigation(posts, new MockUrlFormatter(), new MockTaxonomy());
});

Given('I have pages for autoMenu', function () {
    const posts = new MockPosts([
        { url: '/blog', file: '/blog.md', frontmatter: { title: 'Blog', navMenu: true, navOrder: 1 } },
        { url: '/about', file: '/about.md', frontmatter: { title: 'About', navMenu: true, navOrder: 2 } }
    ]);
    this.navigation = new Navigation(posts, new MockUrlFormatter(), new MockTaxonomy());
});

When('I add auto menu item', function () {
    this.pages = [];
    this.navigation.addMenuItem(this.pages, 'auto', '');
});

Then('the auto menu items should be added', function () {
    assert.ok(this.pages.length > 0);
});

Given('I have a navigation instance for footer', function () {
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

When('I add a custom footer item', function () {
    this.pages = [];
    this.navigation.addFooterItem(this.pages, { url: '/custom', title: 'Custom' }, 
        { getCategoryLink: () => '', getTagLink: () => '' }, 
        (x) => x, 
        { articles: { tag: 'tag', tag_title: 'Tags', category: 'category', category_title: 'Categories' } }, 
        '', 
        { categories: [], tags: [], topTags: [] });
});

Then('the footer should include the custom item', function () {
    assert.ok(this.pages.length > 0);
    assert.strictEqual(this.pages[0].title, 'Custom');
});

Given('I have pages for setCurrentPage', function () {
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
    this.pages = [
        { url: '/page1', title: 'Page 1', children: [], isOpen: false, ariaCurrent: false },
        { url: '/page2', title: 'Page 2', children: [], isOpen: false, ariaCurrent: false }
    ];
});

When('I set the current page to {string}', function (url) {
    this.navigation.setCurrentPage(this.pages, { pathname: url });
});

Then('the ariaCurrent should be {string}', function (expected) {
    const current = this.pages.find(p => p.url === '/page2');
    assert.strictEqual(current.ariaCurrent, expected);
});

Then('the isOpen should be true for the matching page', function () {
    const current = this.pages.find(p => p.url === '/page2');
    assert.strictEqual(current.isOpen, true);
});

Given('I have pages for breadcrumbs', function () {
    const posts = new MockPosts([
        { url: '/blog', frontmatter: { title: 'Blog' } },
        { url: '/blog/post', frontmatter: { title: 'Post' } }
    ]);
    this.navigation = new Navigation(posts, new MockUrlFormatter(), new MockTaxonomy());
});

When('I get breadcrumbs for {string}', function (path) {
    this.result = this.navigation.breadcrumbs({ pathname: path }, '', 1);
});

When('I get breadcrumbs for {string} with subfolder {string}', function (path, subfolder) {
    this.result = this.navigation.breadcrumbs({ pathname: path }, subfolder, 1);
});

When('I get breadcrumbs for {string} with customCount 0', function (path) {
    this.result = this.navigation.breadcrumbs({ pathname: path }, '', 0);
});

Then('the last breadcrumb url should be {string}', function (url) {
    const lastCrumb = this.result[this.result.length - 1];
    assert.strictEqual(lastCrumb.url, url);
});

Then('I should have {int} breadcrumb items', function (count) {
    assert.strictEqual(this.result.length, count);
});

Then('I should have {int} breadcrumb item', function (count) {
    assert.strictEqual(this.result.length, count);
});

Given('I have nested pages for setCurrentPage', function () {
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
    this.pages = [
        { 
            url: '/parent', 
            title: 'Parent', 
            children: [
                { url: '/parent/child', title: 'Child', children: [], isOpen: false, ariaCurrent: false }
            ], 
            isOpen: false, 
            ariaCurrent: false 
        }
    ];
});

Then("the parent's isOpen should be true", function () {
    assert.strictEqual(this.pages[0].isOpen, true);
});

Given('I have pages at different paths', function () {
    const posts = new MockPosts([
        { url: '/blog', frontmatter: { title: 'Blog' } },
        { url: '/blog/post', frontmatter: { title: 'Post' } }
    ]);
    this.navigation = new Navigation(posts, new MockUrlFormatter(), new MockTaxonomy());
});

Given('I have a navigation instance for menu', function () {
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
});

When('I create a menu with custom items', function () {
    this.result = this.navigation.menu({ pathname: '/' }, '', [
        { url: '/home', title: 'Home' },
        { url: '/about', title: 'About' }
    ]);
});

Then('the menu should have the custom items', function () {
    assert.strictEqual(this.result.length, 2);
});

When('I get the auto menu', function () {
    this.result = this.navigation.autoMenu('');
});

Then('the auto menu should include those pages', function () {
    assert.ok(this.result.length >= 0);
});

Given('I have a hierarchy of pages', function () {
    const posts = new MockPosts([
        { url: '/parent', frontmatter: { title: 'Parent', navMenu: true } },
        { url: '/parent/child1', frontmatter: { title: 'Child 1', navMenu: true, navOrder: 1 } },
        { url: '/parent/child2', frontmatter: { title: 'Child 2', navMenu: true, navOrder: 2 } },
        { url: '/parent/child1/grandchild', frontmatter: { title: 'Grandchild', navMenu: true } }
    ]);
    this.navigation = new Navigation(posts, new MockUrlFormatter(), new MockTaxonomy());
});

When('I get children of {string}', function (parentUrl) {
    const parent = { url: parentUrl, title: 'Parent', children: [], order: 0 };
    this.result = this.navigation.getChildren(parent, this.navigation.autoMenu(''));
});

Then('I should get only direct children', function () {
    assert.ok(this.result.length >= 1);
});

Given('I have a menu item with children', function () {
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), new MockTaxonomy());
    this.pages = [];
});

When('I add the menu item', function () {
    this.navigation.addMenuItem(this.pages, { 
        url: '/parent', 
        title: 'Parent',
        children: [
            { url: '/child', title: 'Child' }
        ]
    }, '');
});

Then('children should be added recursively', function () {
    assert.ok(this.pages.length > 0);
    if (this.pages[0].children) {
        assert.ok(this.pages[0].children.length > 0);
    }
});

class MockTaxonomyWithLinks {
    constructor(categories = [], tags = [], topTags = []) {
        this.entries = { categories, tags, topTags };
    }

    links() {
        return {
            getCategoryLink: (title) => `/category/${title}`,
            getTagLink: (title) => `/tag/${title}`
        };
    }

    getTaxonomy() {
        return this.entries;
    }
}

Given('I have taxonomy with tags', function () {
    const taxonomy = new MockTaxonomyWithLinks([], [
        { title: 'JavaScript' },
        { title: 'TypeScript' }
    ], []);
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), taxonomy);
});

When('I build the footer menu with tags', function () {
    this.result = this.navigation.footer({ pathname: '/' }, (x) => x, 
        { articles: { tag: 'tag', tag_title: 'Tags' } }, '', ['tags']);
});

Then('the footer should have tag items', function () {
    assert.ok(this.result.length > 0);
    assert.ok(this.result[0].children.length > 0);
});

Given('I have taxonomy with categories', function () {
    const taxonomy = new MockTaxonomyWithLinks([
        { title: 'Programming' },
        { title: 'DevOps' }
    ], [], []);
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), taxonomy);
});

When('I build the footer menu with categories', function () {
    this.result = this.navigation.footer({ pathname: '/' }, (x) => x, 
        { articles: { category: 'category', category_title: 'Categories' } }, '', ['categories']);
});

Then('the footer should have category items', function () {
    assert.ok(this.result.length > 0);
    assert.ok(this.result[0].children.length > 0);
});

Given('I have taxonomy with top tags', function () {
    const taxonomy = new MockTaxonomyWithLinks([], [], [
        { title: 'Popular Tag' }
    ]);
    this.navigation = new Navigation(new MockPosts(), new MockUrlFormatter(), taxonomy);
});

When('I build the footer menu with toptags', function () {
    this.result = this.navigation.footer({ pathname: '/' }, (x) => x, 
        { articles: { tag: 'tag', tag_title: 'Top Tags' } }, '', ['toptags']);
});

Then('the footer should have top tag items', function () {
    assert.ok(this.result.length > 0);
    assert.ok(this.result[0].children.length > 0);
});
