import { Cache } from '../lib/v1/cache.mjs';

describe('Cache', () => {

    test('Recommended cache use', () => {
        const cache = new Cache(10);

        const item = cache.get('test-1', () => {
            return { value: 7 };
        });

        expect(item.value).toBe(7);
    });

    test('Recommended use only calls function once', () => {
        const cache = new Cache(10);

        const calls = 0;
        const fetchAllMock = function() {
            if (calls === 0) {
                return [{}];
            } else {
                throw new Error('fetchAllMock called twice');
            }
        }

        const item1 = cache.get('mock-test', fetchAllMock);
        const item2 = cache.get('mock-test', fetchAllMock);

        expect(item1.length).toBe(1);
        expect(item2.length).toBe(1);
    });

    test('Items set and retrieved', () => {
        const cache = new Cache(10);

        cache.setItem('test-1', { value: 2 });

        const item = cache.getItem('test-1');

        expect(item.value).toBe(2);
    });

    test('Cache clears', () => {
        const cache = new Cache(10);

        cache.setItem('test-2', { value: 2 });
        cache.clear();

        const item = cache.getItem('test-2');

        expect(item).toBe(null);
    });
});