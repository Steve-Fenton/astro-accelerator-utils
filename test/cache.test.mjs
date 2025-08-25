import { JestSpec } from 'jest-spec';
import * as Steps from './steps/cache.steps.mjs';

describe('Cache', () => {
    const spec = new JestSpec();
    spec.addSteps(Steps);

    test('Cache scenario', async () => {
        await spec.run('/specs/cache.feature');
    });
});