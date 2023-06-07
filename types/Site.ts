export type Site = { 
    url: string;
    useTrailingUrlSlash?: boolean;
    dateOptions: Intl.DateTimeFormatOptions;
    subfolder: string;
    feedUrl: string;
    title: string;
    description: string;
    defaultLanguage: string;
    themeColor: string;
    owner: string;
    default: {
      lang: string;
      locale: string;
      dir: string;
    },
    search: {
      fallbackUrl: 'https://www.google.com/search' | string;
      fallbackSite: 'q' | string;
      fallbackQuery: 'q' | string;
    },
    pageSize: number;
    pageLinks: number;
    rssLimit: number;
    cacheMaxAge: number;
    featureFlags: {
      stickyNav: { top: number },
      codeBlocks: 'copy'[],
      figures: 'enlarge'[],
      youTubeLinks: 'embed'[],
      headers: 'link'[],
      details: 'tabs'[],
    },
    images: {
      contentSize: string;
      listerSize: string;
      authorSize: string;
    }
  };