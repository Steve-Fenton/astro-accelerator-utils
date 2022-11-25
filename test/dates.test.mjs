import * as Dates from '../lib/dates.mjs';

const frontmatter = { pubDate: new Date(2022, 5, 30), modDate: new Date(2023, 0, 31) };
const lang = 'en';
const site = {
    dateOptions: {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
}

test('formatDate: Date formatted', () => {
    expect(Dates.formatDate(frontmatter, lang, site))
        .toBe('Thursday, June 30, 2022')
});

test('formatDate: Null date handled', () => {
    expect(Dates.formatDate({}, lang, site))
        .toBe('')
});

test('formatModifiedDate: Date formatted', () => {
    expect(Dates.formatModifiedDate(frontmatter, lang, site))
        .toBe('Tuesday, January 31, 2023')
});

test('formatModifiedDate: Null date handled', () => {
    expect(Dates.formatModifiedDate({}, lang, site))
        .toBe('')
});