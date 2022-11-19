export type Site = {
    url: string;
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
    };
    search: {
        fallbackUrl: 'https://www.google.com/search' | string;
        fallbackSite: 'q' | string;
        fallbackQuery: 'q' | string;
    };
    pageSize: number;
    pageLinks: number;
    rssLimit: number;
    featureFlags: {
        codeBlocks: 'copy'[];
        figures: 'enlarge'[];
        youTubeLinks: 'embed'[];
    };
    images: {
        contentSize: string;
        listerSize: string;
        authorSize: string;
    };
};
