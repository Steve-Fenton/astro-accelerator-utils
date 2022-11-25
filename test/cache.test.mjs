import * as Cache from '../lib/cache.mjs';

test('Cache: Store and retrieve', async () => {
    const original = [1, 2, 3, 5, 7];
    
    await Cache.setItem('test_cache_store_and_retrieve', original);

    const retrieved = await Cache.getItem('test_cache_store_and_retrieve');

    expect(retrieved[0]).toBe(original[0]);
    expect(retrieved[1]).toBe(original[1]);
    expect(retrieved[2]).toBe(original[2]);
    expect(retrieved[3]).toBe(original[3]);
    expect(retrieved[4]).toBe(original[4]);

    // Clean up!
    await Cache.clear();
});

test('Cache: Cleared', async () => {
    const original = [1, 2, 3, 5, 7];
    
    await Cache.setItem('test_cache_store_and_retrieve', original);
    await Cache.clear();

    const retrieved = await Cache.getItem('test_cache_store_and_retrieve');

    expect(retrieved).toBe(null);
});

test('Cache: Expired item', async () => {
    const original = [1, 2, 3, 5, 7];
    
    await Cache.setItem('test_cache_store_and_retrieve', original);

    await sleep(1000);

    await Cache.getItem('test_cache_store_and_retrieve', 1);

    // Clean up!
    await Cache.clear();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }