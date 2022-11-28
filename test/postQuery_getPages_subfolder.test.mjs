import * as PostQuery from '../lib/postQueries.mjs';
import * as Cache from '../lib/cache.mjs';

beforeEach(async () => {
    await Cache.clear();
    PostQuery.injectFetchAll(testFetchAll);
});

afterAll(async () => {
    await Cache.clear();
});

const site = {
    subfolder: '/subfolder'
};

test('getTopLevelPages: Top level pages are obtained from subfolder', async () => {
    const pages = await PostQuery.getTopLevelPages(site);

    expect(pages.length).toBe(2);
    expect(pages[0].frontmatter.title).toBe('Test markdown');
    expect(pages[1].frontmatter.title).toBe('Second markdown');
});

/** Test Data */

function testFetchAll() {
    console.log('testFetchAll');

    /** @type {import('../types/Astro.js').MarkdownInstance[]} */
    const testData = [{
        url: '/subfolder/test',
        file: '/subfolder/test.md',
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
        url: '/subfolder/test/redirect',
        file: '/subfolder/test/redirect.md',
        frontmatter: {
            layout: 'src/layouts/Redirect.astro',
            title: 'Test redirect',
            redirect: 'https://www.example.com/'
        }
    },{
        url: '/subfolder/test2',
        file: '/subfolder/test2.md',
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
    },{
        url: '/test3',
        file: '/test3.md',
        frontmatter: {
            layout: 'src/layouts/Test.astro',
            title: 'NOT IN THE SUBFOLDER',
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
    }];

    return testData;
}