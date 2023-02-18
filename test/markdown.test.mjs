import { JestSpec } from 'jest-spec';
import * as MarkdownSteps from './steps/markdown.steps.mjs';

describe('Markdown', () => {
    const spec = new JestSpec();
    spec.addSteps(MarkdownSteps);

    test('Markdown scenario', async () => {
        await spec.run('/specs/markdown.feature');
    });
});