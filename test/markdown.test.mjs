import { JestSpec } from 'jest-spec';
import * as Steps from './steps/markdown.steps.mjs';

describe('Markdown', () => {
    const spec = new JestSpec();
    spec.addSteps(Steps);

    test('Markdown scenario', async () => {
        await spec.run('/specs/markdown.feature');
    });
});