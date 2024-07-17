export interface Frontmatter {
    layout: string;
    title: string;
    titleAdditional?: string;
    subtitle?: string;
    pubDate: Date;
    modDate?: Date;
    tags?: string[];
    id?: string;
    authors?: string[];
    keywords?: string;
    description?: string;
    summary?: string;
    categories?: string[];
    navTitle?: string;
    navSection?: string;
    navOrder?: number;
    bannerImage?: {
        src: string;
        alt: string;
    };
    dir?: 'ltr' | 'rtl';
    lang?: string;
    paged?: boolean;
    navSearch?: boolean;
    navSitemap?: boolean;
    navMenu?: boolean;
    robots?: string;
    redirect?: string;
    links: {
        text: string;
        url: string;
        rel: string;
    }[];
}
