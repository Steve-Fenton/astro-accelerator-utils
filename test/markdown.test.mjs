import { Accelerator } from '../index.mjs';

describe('Markdown', () => {
    
    const accelerator = new Accelerator({});

    test('Markdown processed', async () => {
        const input = `Test _some_ markdown`;

        const output = await accelerator.markdown.getHtmlFrom(input);

        expect(output).toBe('<p>Test <em>some</em> markdown</p>');
    });

    test('Inline markdown processed without wrapping element', async () => {
        const input = `Test _some_ markdown`;

        const output = await accelerator.markdown.getInlineHtmlFrom(input);

        expect(output).toBe('Test <em>some</em> markdown');
    });

    test('Inline markdown with quote not impacted by inline-ness', async () => {
        const input = `> Test _some_ markdown`;

        const output = await accelerator.markdown.getInlineHtmlFrom(input);

        expect(output).toBe('<blockquote>\n<p>Test <em>some</em> markdown</p>\n</blockquote>');
    });

    test('Text processed', async () => {
        const input = `Test _some_ markdown`;

        const output = await accelerator.markdown.getTextFrom(input);

        expect(output).toBe('Test some markdown');
    });

});