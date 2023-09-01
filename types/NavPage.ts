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
    children?: MenuItem[];
    section?: string;
    url?: string;
    rel?: string;
}