/**
 * @typedef { import("../../types/Link").Link } Link
 */

export class Paging {
  /**
   * Provides a list of paging links, 1 ... 3 4 5 ... 7
   * @param {number} limit 
   * @param {number} numberOfPages 
   * @param {number} currentPage 
   * @param {string} url 
   * @returns {Link[]}
   */
  links (limit, numberOfPages, currentPage, url) {
      /** @type {Link[]} */
      const pageLinks = [];
    
      let start = 0;
      let end = numberOfPages;
    
      if (numberOfPages > limit) {
        start = (currentPage - (limit - 1) / 2) - 1;
        if (start < 0) {
          start = 0;
        }
    
        end = (start + limit);
        if (end > numberOfPages) {
          end = numberOfPages;
          start = numberOfPages - limit;
        }
      }
    
      if (start == 1) {
        pageLinks.push({
          title: '1',
          url: url.replace('/' + currentPage, '/' + 1),
          ariaCurrent: false,
          class: ''
        });
      } else if (start > 1) {
        pageLinks.push({
          title: '1',
          url: url.replace('/' + currentPage, '/' + 1),
          ariaCurrent: false,
          class: 'paging-collapse-after'
        });
      }
    
      for (let i = start; i < end; i++) {
        const userPage = i + 1;
        pageLinks.push({
          title: userPage.toString(),
          url: url.replace('/' + currentPage, '/' + userPage),
          ariaCurrent: userPage == currentPage ? 'page' : false,
          class: ''
        });
      }
    
      if (end < (numberOfPages - 1)) {
        pageLinks.push({
          title: numberOfPages.toString(),
          url: url.replace('/' + currentPage, '/' + numberOfPages),
          ariaCurrent: false,
          class: 'paging-collapse-before'
        });
      } else if (end < numberOfPages) {
        pageLinks.push({
          title: numberOfPages.toString(),
          url: url.replace('/' + currentPage, '/' + numberOfPages),
          ariaCurrent: false,
          class: ''
        });
      }
    
      return pageLinks;
  }
}