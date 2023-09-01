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

export interface MenuItem {
    title: string;
    order: number;
    isOpen?: boolean;
    ariaCurrent?: 'page' | false;
    fullTitle?: string;
    children?: NavPage[];
    section?: string;
    url?: string;
    rel?: string;
}