import { Accelerator } from '../../index.mjs';

export function steps(map) {

    let calls = 0;

    function func() {
        calls++;
        return calls;
    }

    map(/I have a (\d+) second cache$/i, (context, seconds) => {
        const site = { cacheMaxAge: parseInt(seconds, 10) };
        const accelerator = new Accelerator(site);
        context.cache = accelerator.cache;
        calls = 0;
        return context;
    });

    map(/I cache an item called "(.*)"$/i, (context, key) => {
        context.cache.get(key, func);
        return context;
    });

    map(/I retrieve an item called "(.*)"$/i, (context, key) => {
        context.result = context.cache.get(key, func);
        return context;
    });

    map(/I clear the cache$/i, (context) => {
        context.cache.clear();
        return context;
    });

    map(/the cached item should be retrieved$/i, (context) => {
        expect(context.result).toBe(1);
        return context;
    });

    map(/the item called "(.*)" should be null$/i, (context, key) => {
        expect(context.cache.getItem(key)).toBeNull();
        return context;
    });

    map(/the function should be called only once$/i, (context) => {
        expect(calls).toBe(1);
        return context;
    });
}