import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Posts } from '../../lib/v1/posts.mjs';

class MockCache {
    constructor() {
        this.store = new Map();
    }

    get(key, func) {
        if (this.store.has(key)) {
            return this.store.get(key);
        }
        const result = func();
        this.store.set(key, result);
        return result;
    }

    clear() {
        this.store.clear();
    }
}

Given('I have a posts instance with mock data', function () {
    this.fetchCount = 0;
    this.mockData = [
        { url: '/page1', file: '/src/pages/page1.md', frontmatter: { title: 'Page 1' } },
        { url: '/page2', file: '/src/pages/page2.md', frontmatter: { title: 'Page 2' } },
        { url: '/page3', file: '/src/pages/page3.md', frontmatter: { title: 'Page 3' } }
    ];
    this.cache = new MockCache();
    this.posts = new Posts(this.cache, () => {
        this.fetchCount++;
        return this.mockData;
    });
});

When('I get all posts', function () {
    this.result = this.posts.all();
});

When('I get all posts multiple times', function () {
    this.posts.all();
    this.posts.all();
    this.result = this.posts.all();
});

Then('I should have 3 posts', function () {
    assert.strictEqual(this.result.length, 3);
});

Then('the data should only be fetched once', function () {
    assert.strictEqual(this.fetchCount, 1);
});

Given('I have posts at different depths', function () {
    this.cache = new MockCache();
    this.mockData = [
        { url: '/blog', file: '/src/pages/blog/index.md', frontmatter: { title: 'Blog' } },
        { url: '/blog/post1', file: '/src/pages/blog/post1.md', frontmatter: { title: 'Post 1' } },
        { url: '/blog/post2', file: '/src/pages/blog/post2.md', frontmatter: { title: 'Post 2' } }
    ];
    this.posts = new Posts(this.cache, () => this.mockData);
});

When('I get root posts with empty subfolder', function () {
    this.result = this.posts.root('');
});

Then('I should have 1 post at depth 1', function () {
    assert.strictEqual(this.result.length, 1);
    assert.strictEqual(this.result[0].url, '/blog');
});

Given('I have posts in different subfolders', function () {
    this.cache = new MockCache();
    this.mockData = [
        { url: '/blog', file: '/src/pages/blog.md', frontmatter: { title: 'Blog Root' } },
        { url: '/blog/post1', file: '/src/pages/blog/post1.md', frontmatter: { title: 'Blog Post 1' } },
        { url: '/news', file: '/src/pages/news.md', frontmatter: { title: 'News Root' } }
    ];
    this.posts = new Posts(this.cache, () => this.mockData);
});

When('I get root posts for the {string} subfolder', function (subfolder) {
    this.result = this.posts.root(subfolder);
});

Then('I should have 2 posts from the blog area', function () {
    assert.strictEqual(this.result.length, 2);
    const titles = this.result.map(p => p.frontmatter.title).sort();
    assert.deepStrictEqual(titles, ['Blog Post 1', 'Blog Root']);
});

Given('I have posts with missing urls', function () {
    this.cache = new MockCache();
    this.mockData = [
        { url: null, file: '/src/pages/page1.md', frontmatter: { title: 'No URL' } },
        { url: '/valid', file: '/src/pages/page2.md', frontmatter: { title: 'Valid' } },
        { url: '/deep/post', file: '/src/pages/deep/post.md', frontmatter: { title: 'Deep' } }
    ];
    this.posts = new Posts(this.cache, () => this.mockData);
});

When('I get root posts without a subfolder', function () {
    this.result = this.posts.root('');
});

Then('I should handle the missing urls gracefully', function () {
    const titles = this.result.map(p => p.frontmatter.title).sort();
    assert.deepStrictEqual(titles, ['No URL', 'Valid']);
});

Given('I have a posts instance without custom fetchAll', function () {
    this.cache = new MockCache();
    this.posts = new Posts(this.cache);
});

Then('the posts instance should be initialized', function () {
    assert.ok(this.posts instanceof Posts);
    assert.ok(typeof this.posts.fetchAll === 'function');
});
