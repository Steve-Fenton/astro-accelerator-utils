import { UrlFormatter } from '../lib/v1/urls.mjs';

describe('Url formatting', () =>{
    const testSiteUrl = 'https://www.example.com';
    const urlFormatter = new UrlFormatter(testSiteUrl);

    test('A slash is added to string address', () => {
        const formattedUrl = urlFormatter.addSlashToAddress('/test/address');

        expect(formattedUrl).toBe('/test/address/')
    });
    
    test('An external address is not modified', () => {
        const formattedUrl = urlFormatter.addSlashToAddress('https://www.external-site.com/test/address');
        
        expect(formattedUrl).toBe('https://www.external-site.com/test/address')
    });
    
    test('An empty address is handled', () => {
        const formattedUrl = urlFormatter.addSlashToAddress('');

        expect(formattedUrl).toBe('/')
    });

    test('An undefined address is handled', () => {
        const formattedUrl = urlFormatter.addSlashToAddress();

        expect(formattedUrl).toBe('/')
    });
    
    test('A slash is added to a URL address', () => {
        const formattedUrl = urlFormatter.addSlashToUrl(new URL('https://www.example.com/test/address')).pathname;
        
        expect(formattedUrl).toBe('/test/address/')
    });

    test('An undefined URL is handled', () => {
        const formattedUrl = urlFormatter.addSlashToUrl().pathname;
        
        expect(formattedUrl).toBe('/')
    });
});
