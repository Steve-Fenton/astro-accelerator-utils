import * as Urls from '../lib/urls.mjs';

const site = {
    url: 'https://www.example.com'
};

test('addSlashToAddress: Add slash to string address', () => {
    expect(Urls.addSlashToAddress('/test/address', site))
        .toBe('/test/address/')
});

test('addSlashToAddress: External address not modified', () => {
    expect(Urls.addSlashToAddress('https://www.external-site.com/test/address', site))
        .toBe('https://www.external-site.com/test/address')
});

test('addSlashToUrl: Add slash to URL address', () => {
    expect(Urls.addSlashToUrl(new URL('https://www.example.com/test/address'), site).pathname)
        .toBe('/test/address/')
});
