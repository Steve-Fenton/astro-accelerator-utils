import type { Site } from '../types/Site';

export function addSlashToUrl (url: URL) {
    url.pathname += url.pathname.endsWith('/') ? '' : '/';
    return url;
  }
  
  export function addSlashToAddress (address: string | undefined, site: Site) {
    if (!address) {
        address = '/';
    }
  
    if (address.indexOf('://') > -1) {
        return address;
    }
  
    const url = addSlashToUrl(new URL(address, site.url));
    return url.pathname + url.search;
  }