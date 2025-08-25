import { JestSpec } from 'jest-spec';
import * as Steps from './steps/post_filtering.steps.mjs';

describe('Post Filtering', () => {
    const spec = new JestSpec();
    spec.addSteps(Steps);

    test('Post Filtering Scenario', async () => {
        await spec.run('/specs/post_filtering.feature');
    });
});