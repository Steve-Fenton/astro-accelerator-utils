import {jest} from '@jest/globals';
import * as Dates from '../lib/dates.mjs';

const frontmatter = { pubDate: new Date(2022, 5, 30) };
const lang = 'en';
const site = {
    dateOptions: {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
}

test('Date test', () => {
    expect(Dates.formatDate(frontmatter, lang, site))
        .toBe('Thursday, June 30, 2022')
})