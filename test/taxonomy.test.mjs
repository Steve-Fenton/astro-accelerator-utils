import { Cache } from '../lib/v1/cache.mjs';
import { Posts } from '../lib/v1/posts.mjs';
import { Taxonomy } from '../lib/v1/taxonomy.mjs';
import { UrlFormatter } from '../lib/v1/urls.mjs';

import { fetchAll } from './data/featchAllMock.mjs';

describe('Taxonomy', () => {

    // Zero-length cache
    const cache = new Cache(0);
    const posts = new Posts(cache, fetchAll);
    const urlFormatter = new UrlFormatter('https://www.example.com/');
    const taxonomy = new Taxonomy(cache, posts, urlFormatter);

    const translations = {
        articles: {
            tag: { en: 'tag' },
            category: { en: 'category' }
        }
    }

    test('Taxonomy obtained', () => {
        const result = taxonomy.all();

        // Check items come back in the right order
        expect(result).toMatchObject({
            tags: [
                { title: 'Other', count: 1 },
                { title: 'Technology', count: 2 },
                { title: 'Test', count: 1 },
                { title: 'Test Tag', count: 1 }
            ],
            topTags: [
                { title: 'Other', count: 1 },
                { title: 'Technology', count: 2 },
                { title: 'Test', count: 1 }
            ],
            categories: [
                { title: 'Example', count: 13 },
                { title: 'Sample', count: 13 },
                { title: 'Test Category', count: 1 }
            ]
        });
    });

    test('Taxonomy links obtained', () => {
        const lang = (entry) => entry.en;
        const subfolder = 'test-folder';

        const result = taxonomy.links(translations, lang, subfolder);

        expect(result.tag).toBe('tag');
        expect(result.category).toBe('category');
        expect(result.getCategoryLink('test-cat')).toBe('/test-folder/category/test-cat/1/');
        expect(result.getTagLink('test-tag')).toBe('/test-folder/tag/test-tag/1/');
    });
});