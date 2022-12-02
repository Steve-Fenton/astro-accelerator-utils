import { Accelerator } from '../index.mjs'

describe('Cache', () => {

    test('Recommended cache use', () => {
        const site = { cacheMaxAge: 10 };
        const accelerator = new Accelerator(site);

        const item = accelerator.cache.get('test-1', () => {
            return { value: 7 };
        });

        expect(item.value).toBe(7);
    });

    test('Recommended use only calls function once', () => {
        const site = { cacheMaxAge: 10 };
        const accelerator = new Accelerator(site);

        const calls = 0;
        const fetchAllMock = function() {
            if (calls === 0) {
                return [{}];
            } else {
                throw new Error('fetchAllMock called twice');
            }
        }

        const item1 = accelerator.cache.get('mock-test', fetchAllMock);
        const item2 = accelerator.cache.get('mock-test', fetchAllMock);

        expect(item1.length).toBe(1);
        expect(item2.length).toBe(1);
    });

    test('Items set and retrieved', () => {
        const site = { cacheMaxAge: 10 };
        const accelerator = new Accelerator(site);

        accelerator.cache.setItem('test-1', { value: 2 });

        const item = accelerator.cache.getItem('test-1');

        expect(item.value).toBe(2);
    });

    test('Cache clears', () => {
        const site = { cacheMaxAge: 10 };
        const accelerator = new Accelerator(site);

        accelerator.cache.setItem('test-2', { value: 2 });
        accelerator.cache.clear();

        const item = accelerator.cache.getItem('test-2');

        expect(item).toBe(null);
    });
});