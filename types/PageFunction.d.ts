import { Markdown } from "./Markdown";
export type PageFunction = () => Markdown<Record<string, any>>[];
