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
    url: 'https://www.example.com',
    subfolder: ''
};

test('getBreadcrumbs: Home > Page', async () => {
    const currentUrl = new URL('', 'https://www.example.com/');
    const breadcrumbs = await PostQuery.getBreadcrumbs(currentUrl, site);

    expect(breadcrumbs.length).toBe(1);
    expect(breadcrumbs[0].url).toBe('/');
});

test('getBreadcrumbs: Home > Page', async () => {
    const currentUrl = new URL('/test2', 'https://www.example.com/');
    const breadcrumbs = await PostQuery.getBreadcrumbs(currentUrl, site);

    expect(breadcrumbs.length).toBe(2);
    expect(breadcrumbs[0].url).toBe('/');
    expect(breadcrumbs[1].url).toBe('/test2/');
});

/** Test Data */

function testFetchAll() {
    console.log('testFetchAll');

    /** @type {import('../types/Astro.js').MarkdownInstance[]} */
    const testData = [{
        url: '',
        path: 'index.md',
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
        url: '/test',
        path: '/test.md',
        frontmatter: {
            layout: 'src/layouts/Redirect.astro',
            title: 'Test redirect',
            redirect: 'https://www.example.com/'
        }
    },{
        url: '/test2',
        path: '/test2.md',
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
    }];

    return testData;
}