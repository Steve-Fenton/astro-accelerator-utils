import { Accelerator } from '../../index.mjs';

export function steps(map) {

    map(/Given I am using default date options$/i, (context) => {
        const site = {
            dateOptions: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
            shortDateOptions: {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }
        };

        context.dateFormatter = new Accelerator(site).dateFormatter;
        return context;
    });

    map(/When I format the date "(.*)" with the culture "(.*)"$/i, (context, date, culture) => {
        context.result = context.dateFormatter.formatDate(date, culture);
        return context;
    });
   
    map(/When I format a null date$/i, (context) => {
        context.result = context.dateFormatter.formatDate(null, 'en');
        return context;
    });

    map(/When I format the short date "(.*)" with the culture "(.*)"$/i, (context, date, culture) => {
        context.result = context.dateFormatter.formatShortDate(date, culture);
        return context;
    });
   
    map(/When I format a null short date$/i, (context) => {
        context.result = context.dateFormatter.formatShortDate(null, 'en');
        return context;
    });

    map(/Then the result should be "(.*)"$/i, (context, dateString) => {
        expect(context.result).toBe(dateString);
        return context;
    });

    map(/Then the result should be an empty string$/i, (context) => {
        expect(context.result).toBe('');
        return context;
    });
}