import { Markdown } from '../lib/v1/markdown.mjs';

describe('Markdown.titleCase', () => {
    var markdown = new Markdown();

    test('Title cases a sentence', () => {
        expect(markdown.titleCase('This sentence has no title casing')).toBe('This Sentence Has No Title Casing');
    });

    test('Preserves existing oddities', () => {
        expect(markdown.titleCase('The new Apple iPhone is launched')).toBe('The New Apple iPhone Is Launched');
    });
});