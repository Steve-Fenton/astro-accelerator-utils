import { JestSpec } from 'jest-spec';
import * as CacheSteps from './steps/cache.steps.mjs';

describe('Cache', () => {
    const spec = new JestSpec();
    spec.addSteps(CacheSteps);

    test('Cache scenario', async () => {
        await spec.run('/specs/cache.feature');
    });
});