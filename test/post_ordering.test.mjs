import { JestSpec } from 'jest-spec';
import * as Steps from './steps/post_ordering.steps.mjs';

describe('Post Ordering', () => {
    const spec = new JestSpec();
    spec.addSteps(Steps);

    test('Post Ordering Scenario', async () => {
        await spec.run('/specs/post_ordering.feature');
    });
});