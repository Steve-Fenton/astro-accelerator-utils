export function addSlashToUrl (url) {
    url.pathname += url.pathname.endsWith('/') ? '' : '/';
    return url;
  }
  
  export function addSlashToAddress (address, site) {
    if (!address) {
        address = '/';
    }
  
    if (address.indexOf('://') > -1) {
        return address;
    }
  
    const url = addSlashToUrl(new URL(address, site.url));
    return url.pathname + url.search;
  }