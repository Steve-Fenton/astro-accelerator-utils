import { Accelerator } from '../index.mjs';

describe('Url formatting', () =>{
    const site = {
        url: 'https://www.example.com',
        subfolder: '',
        useTrailingUrlSlash: true
    }

    // Supported format URL methods

    test('A slash is added to string address', () => {
        const accelerator = new Accelerator(site);

        const formattedUrl = accelerator.urlFormatter.formatAddress('/test/address');

        expect(formattedUrl).toBe('/test/address/')
    });
    
    test('An external address is not modified', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatAddress('https://www.external-site.com/test/address');
        
        expect(formattedUrl).toBe('https://www.external-site.com/test/address')
    });
    
    test('An empty address is handled', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatAddress('');

        expect(formattedUrl).toBe('/')
    });

    test('An undefined address is handled', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatAddress();

        expect(formattedUrl).toBe('/')
    });
    
    test('A slash is added to a URL address', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatUrl(new URL('https://www.example.com/test/address')).pathname;
        
        expect(formattedUrl).toBe('/test/address/')
    });

    test('An undefined URL is handled', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatUrl().pathname;
        
        expect(formattedUrl).toBe('/')
    });


    // Deprecated (but supported) addSlash methods

    test('A slash is added to string address', () => {
        const accelerator = new Accelerator(site);

        const formattedUrl = accelerator.urlFormatter.addSlashToAddress('/test/address');

        expect(formattedUrl).toBe('/test/address/')
    });
    
    test('An external address is not modified', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.addSlashToAddress('https://www.external-site.com/test/address');
        
        expect(formattedUrl).toBe('https://www.external-site.com/test/address')
    });
    
    test('An empty address is handled', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.addSlashToAddress('');

        expect(formattedUrl).toBe('/')
    });

    test('An undefined address is handled', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.addSlashToAddress();

        expect(formattedUrl).toBe('/')
    });
    
    test('A slash is added to a URL address', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.addSlashToUrl(new URL('https://www.example.com/test/address')).pathname;
        
        expect(formattedUrl).toBe('/test/address/')
    });

    test('An undefined URL is handled', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.addSlashToUrl().pathname;
        
        expect(formattedUrl).toBe('/')
    });

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
