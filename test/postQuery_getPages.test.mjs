import * as PostQuery from '../lib/postQueries.mjs';
import * as Cache from '../lib/cache.mjs';

beforeEach(async () => {
    await Cache.clear();
});

afterAll(async () => {
    await Cache.clear();
});

PostQuery.injectFetchAll(testFetchAll);

const site = {
    subfolder: ''
};

test('getPages: Pages are obtained', async () => {
    const pages = await PostQuery.getPages();

    expect(pages[0].frontmatter.title).toBe('Test markdown');
    expect(pages[1].frontmatter.title).toBe('Test redirect');
    expect(pages[2].frontmatter.title).toBe('Second markdown');
});

test('getPages: Pages are filtered', async () => {
    const pages = await PostQuery.getPages((p) => p.frontmatter.title === 'Test markdown');

    expect(pages.length).toBe(1);
    expect(pages[0].frontmatter.title).toBe('Test markdown');
});

test('getTopLevelPages: Top level pages are obtained', async () => {
    const pages = await PostQuery.getTopLevelPages(site);

    expect(pages.length).toBe(2);
    expect(pages[0].frontmatter.title).toBe('Test markdown');
    expect(pages[1].frontmatter.title).toBe('Second markdown');
});

test('getTopLevelPages: Pages are filtered', async () => {
    const pages = await PostQuery.getTopLevelPages(site, (p) => p.frontmatter.title === 'Second markdown');

    expect(pages.length).toBe(1);
    expect(pages[0].frontmatter.title).toBe('Second markdown');
});

/** Test Data */

function testFetchAll() {
    console.log('testFetchAll');

    /** @type {import('../types/Astro.js').MarkdownInstance[]} */
    const testData = [{
        url: '/test',
        frontmatter: {
            layout: 'src/layouts/Test.astro',
            title: 'Test markdown',
            pubDate: new Date(2022, 8, 1),
            keywords: 'test,keyword',
            description: 'Test description',
            bannerImage: {
                src: '/img/surface-accessories.png',
                alt: 'Dummy image'
            },
            authors: ['steve-fenton'],
            categories: ['Test Category 1', 'Test Category 2'],
            tags: ['Test Tag 1', 'Test Tag 2']
        }
    },{
        url: '/test/redirect',
        frontmatter: {
            layout: 'src/layouts/Redirect.astro',
            title: 'Test redirect',
            location: 'https://www.example.com/'
        }
    },{
        url: '/test2',
        frontmatter: {
            layout: 'src/layouts/Test.astro',
            title: 'Second markdown',
            pubDate: new Date(2022, 8, 1),
            keywords: 'test,keyword',
            description: 'Test description',
            bannerImage: {
                src: '/img/surface-accessories.png',
                alt: 'Dummy image'
            },
            authors: ['steve-fenton'],
            categories: ['Test Category 1', 'Test Category 2'],
            tags: ['Test Tag 1', 'Test Tag 2']
        }
    },];

    return testData;
}