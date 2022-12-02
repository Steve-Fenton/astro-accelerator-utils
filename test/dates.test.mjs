import { Accelerator } from '../index.mjs';

describe('Dates', () => {
    /** @type {Intl.DateTimeFormatOptions} */
    const defaultDateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

    test('Dates are formatted correctly', () => {
        const site = { dateOptions: defaultDateOptions };
        const accelerator = new Accelerator(site);

        const formattedDate = accelerator.dateFormatter.formatDate(new Date(2022, 5, 30), 'en');

        expect(formattedDate).toBe('Thursday, June 30, 2022');
    });

    test('Dates are formatted correctly in another language', () => {
        const site = { dateOptions: defaultDateOptions };
        const accelerator = new Accelerator(site);

        const formattedDate = accelerator.dateFormatter.formatDate(new Date(2022, 5, 30), 'fr');

        expect(formattedDate).toBe('jeudi 30 juin 2022');
    });

    test('String dates are formatted correctly', () => {
        const site = { dateOptions: defaultDateOptions };
        const accelerator = new Accelerator(site);

        const formattedDate = accelerator.dateFormatter.formatDate('2022-06-30', 'en');

        expect(formattedDate).toBe('Thursday, June 30, 2022');
    });

    test('Null dates are handled', () => {
        const site = { dateOptions: defaultDateOptions };
        const accelerator = new Accelerator(site);

        const formattedDate = accelerator.dateFormatter.formatDate(null, 'en');

        expect(formattedDate).toBe('');
    });
});