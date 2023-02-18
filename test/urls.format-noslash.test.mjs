import { Accelerator } from '../index.mjs';

describe('Url formatting', () =>{
    const site = {
        url: 'https://www.example.com',
        subfolder: '',
        useTrailingUrlSlash: false
    }

    // Supported format URL methods

    test('A slash is removed from string address', () => {
        const accelerator = new Accelerator(site);

        const formattedUrl = accelerator.urlFormatter.formatAddress('/test/address');

        expect(formattedUrl).toBe('/test/address')
    });
    
    test('An external address is not modified', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatAddress('https://www.external-site.com/test/address/');
        
        expect(formattedUrl).toBe('https://www.external-site.com/test/address/')
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
    
    test('A slash is removed from a URL address', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatUrl(new URL('https://www.example.com/test/address/')).pathname;
        
        expect(formattedUrl).toBe('/test/address')
    });

    test('An undefined URL is handled', () => {
        const accelerator = new Accelerator(site);
        
        const formattedUrl = accelerator.urlFormatter.formatUrl().pathname;
        
        expect(formattedUrl).toBe('/')
    });
});
