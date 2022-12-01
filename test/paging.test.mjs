import { Paging } from '../lib/v1/paging.mjs';

describe('Paging', () => {
    test('Page links', () => {
        const paging = new Paging();

        const result = paging.links(10, 5, 1, 'https://www.example.com/blog/1/');

        expect(result.length).toBe(5);

        expect(result[0].title).toBe('1');
        expect(result[0].url).toBe('https://www.example.com/blog/1/');
        expect(result[0].ariaCurrent).toBe('page');
        expect(result[0].class).toBe('');

        expect(result[1].title).toBe('2');
        expect(result[1].url).toBe('https://www.example.com/blog/2/');
        expect(result[1].ariaCurrent).toBe(false);
        expect(result[1].class).toBe('');

        expect(result[2].title).toBe('3');
        expect(result[2].url).toBe('https://www.example.com/blog/3/');
        expect(result[2].ariaCurrent).toBe(false);
        expect(result[2].class).toBe('');

        expect(result[3].title).toBe('4');
        expect(result[3].url).toBe('https://www.example.com/blog/4/');
        expect(result[3].ariaCurrent).toBe(false);
        expect(result[3].class).toBe('');

        expect(result[4].title).toBe('5');
        expect(result[4].url).toBe('https://www.example.com/blog/5/');
        expect(result[4].ariaCurrent).toBe(false);
        expect(result[4].class).toBe('');
    });

    test('Page links are limited (middle)', () => {
        const paging = new Paging();

        const result = paging.links(3, 10, 5, 'https://www.example.com/blog/5/');

        expect(result.length).toBe(5);

        expect(result[0].title).toBe('1');
        expect(result[0].url).toBe('https://www.example.com/blog/1/');
        expect(result[0].ariaCurrent).toBe(false);
        expect(result[0].class).toBe('paging-collapse-after');

        expect(result[1].title).toBe('4');
        expect(result[1].url).toBe('https://www.example.com/blog/4/');
        expect(result[1].ariaCurrent).toBe(false);
        expect(result[1].class).toBe('');

        expect(result[2].title).toBe('5');
        expect(result[2].url).toBe('https://www.example.com/blog/5/');
        expect(result[2].ariaCurrent).toBe('page');
        expect(result[2].class).toBe('');

        expect(result[3].title).toBe('6');
        expect(result[3].url).toBe('https://www.example.com/blog/6/');
        expect(result[3].ariaCurrent).toBe(false);
        expect(result[3].class).toBe('');

        expect(result[4].title).toBe('10');
        expect(result[4].url).toBe('https://www.example.com/blog/10/');
        expect(result[4].ariaCurrent).toBe(false);
        expect(result[4].class).toBe('paging-collapse-before');
    });

    test('Page links are limited (start)', () => {
        const paging = new Paging();

        const result = paging.links(3, 10, 2, 'https://www.example.com/blog/2/');

        expect(result.length).toBe(4);

        expect(result[0].title).toBe('1');
        expect(result[0].url).toBe('https://www.example.com/blog/1/');
        expect(result[0].ariaCurrent).toBe(false);
        expect(result[0].class).toBe('');

        expect(result[1].title).toBe('2');
        expect(result[1].url).toBe('https://www.example.com/blog/2/');
        expect(result[1].ariaCurrent).toBe('page');
        expect(result[1].class).toBe('');

        expect(result[2].title).toBe('3');
        expect(result[2].url).toBe('https://www.example.com/blog/3/');
        expect(result[2].ariaCurrent).toBe(false);
        expect(result[2].class).toBe('');

        expect(result[3].title).toBe('10');
        expect(result[3].url).toBe('https://www.example.com/blog/10/');
        expect(result[3].ariaCurrent).toBe(false);
        expect(result[3].class).toBe('paging-collapse-before');
    });

    test('Page links are limited (end)', () => {
        const paging = new Paging();

        const result = paging.links(3, 10, 9, 'https://www.example.com/blog/9/');

        expect(result.length).toBe(4);

        expect(result[0].title).toBe('1');
        expect(result[0].url).toBe('https://www.example.com/blog/1/');
        expect(result[0].ariaCurrent).toBe(false);
        expect(result[0].class).toBe('paging-collapse-after');

        expect(result[1].title).toBe('8');
        expect(result[1].url).toBe('https://www.example.com/blog/8/');
        expect(result[1].ariaCurrent).toBe(false);
        expect(result[1].class).toBe('');

        expect(result[2].title).toBe('9');
        expect(result[2].url).toBe('https://www.example.com/blog/9/');
        expect(result[2].ariaCurrent).toBe('page');
        expect(result[2].class).toBe('');

        expect(result[3].title).toBe('10');
        expect(result[3].url).toBe('https://www.example.com/blog/10/');
        expect(result[3].ariaCurrent).toBe(false);
        expect(result[3].class).toBe('');
    });
});