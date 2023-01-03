import { Accelerator } from '../../index.mjs';

function stripLineBreaks(input) {
    return input.replace(/(\r\n|\n|\r)/gm, '');
}

export function steps(map) {

    map(/I am using the markdown parser$/i, (context) => {
        context.markdown = new Accelerator({}).markdown;
        return context;
    });

    map(/I parse the text "(.*)"$/i, (context, text) => {
        context.input = text;
        return context;
    });

    map(/the HTML should be "(.*)"$/i, async (context, expected) => {
        const result = await context.markdown.getHtmlFrom(context.input);
        expect(stripLineBreaks(result)).toBe(expected);
        return context;
    });

    map(/the inline HTML should be "(.*)"$/i, async (context, expected) => {
        const result = await context.markdown.getInlineHtmlFrom(context.input);
        expect(stripLineBreaks(result)).toBe(expected);
        return context;
    });

    map(/the plain text should be "(.*)"$/i, async (context, expected) => {
        const result = await context.markdown.getTextFrom(context.input);
        expect(stripLineBreaks(result)).toBe(expected);
        return context;
    });
}