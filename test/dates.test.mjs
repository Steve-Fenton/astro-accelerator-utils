import { JestSpec } from 'jest-spec';
import * as DateSteps from './steps/dates.steps.mjs';

describe('Dates', () => {
    const spec = new JestSpec();
    spec.addSteps(DateSteps);

    test('Date scenario', async () => {
        await spec.run('/specs/dates.feature');
    });
});