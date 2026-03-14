import assert from 'node:assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Taxonomy } from '../../lib/v1/taxonomy.mjs';

class MockCache {
    /** @type {Record<string, any>} */
    store = {};
    /**
     * @param {string} key
     * @param {() => any} getter
     */
    get(key, getter) {
        if (!this.store[key]) {
            this.store[key] = getter();
        }
        return this.store[key];
    }
}

class MockPosts {
    _all = [];
    all() {
        return this._all;
    }
}

class MockUrlFormatter {
    addSlashToAddress(address) {
        if (!address) return '/';
        return address.endsWith('/') ? address : address + '/';
    }
}

Given('I have a taxonomy instance with cached data', function () {
    this.cache = new MockCache();
    this.posts = new MockPosts();
    this.urlFormatter = new MockUrlFormatter();

    this.cache.store['v1_taxonomy.all'] = { tags: [{title: 'js', count: 1}], categories: [], topTags: [] };

    this.taxonomy = new Taxonomy(this.cache, this.posts, this.urlFormatter);
});

When('I request all taxonomy data', function () {
    this.result = this.taxonomy.all();
});

Then('the returned data should match the cached data', function () {
    assert.deepStrictEqual(this.result, { tags: [{title: 'js', count: 1}], categories: [], topTags: [] });
});

Given('I have a taxonomy instance with translations', function () {
    this.cache = new MockCache();
    this.posts = new MockPosts();
    this.urlFormatter = new MockUrlFormatter();
    this.taxonomy = new Taxonomy(this.cache, this.posts, this.urlFormatter);
    
    this.translations = {
        articles: {
            category: 'CategoryTranslationKey',
            tag: 'TagTranslationKey'
        }
    };
    this.lang = (key) => {
        if (key === 'CategoryTranslationKey') return 'categoria';
        if (key === 'TagTranslationKey') return 'insigne';
        return null;
    };
});

When('I generate links for subfolder {string} and lang function', function (subfolder) {
    this.result = this.taxonomy.links(this.translations, this.lang, subfolder);
});

When('I generate links with missing translations', function () {
    const emptyLang = () => null;
    this.result = this.taxonomy.links(this.translations, emptyLang, '/docs');
});

Then('the tag link should be formatted correctly', function () {
    const link = this.result.getTagLink('News And Updates');
    assert.strictEqual(link, '/docs/insigne/news-and-updates/1/');
});

Then('the category link should be formatted correctly', function () {
    const link = this.result.getCategoryLink('Tech Talk');
    assert.strictEqual(link, '/docs/categoria/tech-talk/1/');
});

Then('tag should be {string}', function (expectedTag) {
    assert.strictEqual(this.result.tag, expectedTag);
});

Then('category should be {string}', function (expectedCategory) {
    assert.strictEqual(this.result.category, expectedCategory);
});

Given('I have a taxonomy instance with a list of posts', function () {
    this.cache = new MockCache();
    this.posts = new MockPosts();
    this.urlFormatter = new MockUrlFormatter();
    
    // Using mock posts.
    // PostFiltering.isListable currently just needs to return true,
    // usually checks format/tags/etc, let's just mock minimal structure:
    this.posts._all = [
        { url: '/1', frontmatter: { layout: 'post', tags: ['js', 'web'], categories: ['tech'] } },
        { url: '/2', frontmatter: { layout: 'post', tags: ['js', 'css'], categories: ['tech', 'design'] } },
        { url: '/3', frontmatter: { layout: 'post', tags: ['web'], categories: ['tech'] } }
    ];

    this.taxonomy = new Taxonomy(this.cache, this.posts, this.urlFormatter);
});

When('I request to generate taxonomy', function () {
    this.result = this.taxonomy.getTaxonomy();
});

Then('the taxonomy should contain the aggregated tags and categories', function () {
    assert.strictEqual(this.result.tags.length, 3); // js, web, css
    let jsTag = this.result.tags.find((t) => t.title === 'js');
    assert.strictEqual(jsTag.count, 2);

    assert.strictEqual(this.result.categories.length, 2); // tech, design
    let techCategory = this.result.categories.find((c) => c.title === 'tech');
    assert.strictEqual(techCategory.count, 3);
});

Then('the tags should be sorted', function () {
    assert.strictEqual(this.result.tags[0].title, 'css');
    assert.strictEqual(this.result.tags[1].title, 'js');
    assert.strictEqual(this.result.tags[2].title, 'web');
});

Then('the categories should be sorted', function () {
    assert.strictEqual(this.result.categories[0].title, 'design');
    assert.strictEqual(this.result.categories[1].title, 'tech');
});

Then('the top tags should be sorted and limited', function () {
    // limited by Math.min(categories.length, tags.length) -> Math.min(2, 3) -> 2 top tags
    assert.strictEqual(this.result.topTags.length, 2);
    
    // Sorts top tags by count -> js (2), web (2), css (1)
    // Then limits to 2 tags
    // Then sorts them by title alphabetically -> js, web
    const titles = this.result.topTags.map((t) => t.title);
    assert.ok(titles.includes('js'));
    assert.ok(titles.includes('web'));
});

Given('I have a taxonomy instance', function () {
    this.cache = new MockCache();
    this.posts = new MockPosts();
    this.urlFormatter = new MockUrlFormatter();
    this.taxonomy = new Taxonomy(this.cache, this.posts, this.urlFormatter);
});

When('I sort a list of entries by title', function () {
    this.entries = [
        { title: 'zebra', count: 1 },
        { title: 'apple', count: 2 },
        { title: 'mango', count: 3 },
        { title: 'apple', count: 4 }
    ];
    this.sortedEntries = [...this.entries].sort(this.taxonomy.sortByTitle);
});

Then('the entries should be in alphabetical order', function () {
    assert.strictEqual(this.sortedEntries[0].title, 'apple');
    assert.strictEqual(this.sortedEntries[0].count, 2); // stable sort or just the first apple
    assert.strictEqual(this.sortedEntries[1].title, 'apple');
    assert.strictEqual(this.sortedEntries[2].title, 'mango');
    assert.strictEqual(this.sortedEntries[3].title, 'zebra');
});

When('I sort a list of entries by volume', function () {
    this.entries = [
        { title: 'zebra', count: 10 },
        { title: 'apple', count: 2 },
        { title: 'mango', count: 30 }
    ];
    this.sortedEntries = [...this.entries].sort(this.taxonomy.sortByVolume);
});

Then('the entries should be in descending order of count', function () {
    assert.strictEqual(this.sortedEntries[0].title, 'mango');
    assert.strictEqual(this.sortedEntries[1].title, 'zebra');
    assert.strictEqual(this.sortedEntries[2].title, 'apple');
});
