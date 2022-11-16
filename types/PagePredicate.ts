import { Markdown } from "./Markdown";

export type PagePredicate = (value: Markdown<Record<string, any>>, index: number, array: Markdown<Record<string, any>>[]) => boolean;