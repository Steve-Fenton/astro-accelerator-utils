import * as PostQuery from '../lib/postQueries.mjs';
import * as Cache from '../lib/cache.mjs';

/**
 * @typedef { import("../types/Astro").MarkdownInstance } MarkdownInstance
 */

beforeEach(() => {
    Cache.clear();
    PostQuery.injectFetchAll(testFetchAll);
});

afterAll(() => {
    Cache.clear();
});

test('getAuthors: Authors are obtained', async () => {
    const frontmatter = { authors: ['steve-fenton'] };
    const authors = await PostQuery.getAuthors(frontmatter);

    expect(authors.writers[0].frontmatter.title).toBe('Steve Fenton');
    expect(authors.mainAuthor.frontmatter.title).toBe('Steve Fenton');
});

test('getAuthorInfo: Author is obtained', async () => {
    const author = await PostQuery.getAuthorInfo('steve-fenton');

    expect(author.frontmatter.title).toBe('Steve Fenton');
});

/** Test Data */

function testFetchAll() {
    console.log('testFetchAll');

    /** @type {MarkdownInstance[]} */
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
        url: '/authors/steve-fenton',
        frontmatter: {
            layout: 'src/layouts/Author.astro',
            id: 'steve-fenton',
            title: 'Steve Fenton',
            pubDate: new Date(2022, 8, 1)
        }
    },];

    return testData;
}