export interface Entry {
    [key: string]: string;
}
export interface TranslationProvider {
    (entry: Entry): string;
}
