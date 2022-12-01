import { Cache } from '../lib/v1/cache.mjs';
import { Posts } from '../lib/v1/posts.mjs';

import { fetchAll } from './data/featchAllMock.mjs';

describe('Posts.all', () => {

    // Zero-length cache
    const cache = new Cache(0);

    test('Gets all posts', () => {
        const posts = new Posts(cache, fetchAll);

        const result = posts.all();
        const homePage = result.filter(p => p.frontmatter.navTitle === 'Home')[0];
        
        expect(result.length).toBe(40);
        expect(homePage.file).toBe('C:/Users/steve/repos/astro-accelerator/src/pages/index.md')
    });
});