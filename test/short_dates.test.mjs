import { JestSpec } from 'jest-spec';
import * as Steps from './steps/dates.steps.mjs';

describe('Dates', () => {
    const spec = new JestSpec();
    spec.addSteps(Steps);

    test('Date scenario', async () => {
        await spec.run('/specs/short_dates.feature');
    });
});