export interface TaxonomyEntry {
    title: string;
    count: number;
}
export interface Taxonomy {
    tags: TaxonomyEntry[];
    topTags: TaxonomyEntry[];
    categories: TaxonomyEntry[];
}
export interface TaxonomyLinks {
    tag: string;
    category: string;
    getCategoryLink: (category: string) => string;
    getTagLink: (tag: string) => string;
}
