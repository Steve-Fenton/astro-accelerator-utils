import { DateFormatter } from '../lib/v1/dates.mjs';

describe('Dates', () => {
    /** @type {Intl.DateTimeFormatOptions} */
    const defaultDateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

    test('Dates are formatted correctly', () => {
        const dateFormatter = new DateFormatter(defaultDateOptions);

        const formattedDate = dateFormatter.formatDate(new Date(2022, 5, 30), 'en');

        expect(formattedDate).toBe('Thursday, June 30, 2022');
    });

    test('Dates are formatted correctly', () => {
        const dateFormatter = new DateFormatter(defaultDateOptions);

        const formattedDate = dateFormatter.formatDate(new Date(2022, 5, 30), 'fr');

        expect(formattedDate).toBe('jeudi 30 juin 2022');
    });

    test('Null dates are handled', () => {
        const dateFormatter = new DateFormatter(defaultDateOptions);

        const formattedDate = dateFormatter.formatDate(null, 'en');

        expect(formattedDate).toBe('');
    });
});