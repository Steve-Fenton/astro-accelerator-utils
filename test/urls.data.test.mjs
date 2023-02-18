import { Accelerator } from '../index.mjs';

describe('Url formatting', () =>{

    // Get author id

    test('Author id is retrieved', () => {
        const testSite = {
            url: 'https://www.example.com',
            subfolder: ''
        }

        const accelerator = new Accelerator(testSite);

        const id = accelerator.urlFormatter.getAuthorId(new URL('https://www.example.com/author/steve-fenton/'));

        expect(id).toBe('steve-fenton');
    });

    test('Author id is retrieved with subfolder', () => {
        const testSite = {
            url: 'https://www.example.com',
            subfolder: 'example'
        }

        const accelerator = new Accelerator(testSite);

        const id = accelerator.urlFormatter.getAuthorId(new URL('https://www.example.com/example/author/steve-fenton/'));

        expect(id).toBe('steve-fenton');
    });
});
