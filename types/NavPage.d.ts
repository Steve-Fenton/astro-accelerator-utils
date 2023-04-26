export interface NavPage {
    section?: string;
    fullTitle: string;
    title: string;
    url: string;
    order: number;
    isOpen: boolean;
    ariaCurrent: 'page' | false;
    children: NavPage[];
    rel?: string;
}
