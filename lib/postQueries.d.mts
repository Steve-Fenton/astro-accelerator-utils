/**
 * Fetches pages
 * @param {import("../types/PageFunction.js").PageFunction} fetchPages
 * @param {import("../types/PagePredicate.js").PagePredicate} filter
 * @returns {import("../types/Markdown").Markdown<Record<string, any>[]}
 */
export function getPages(fetchPages: import("../types/PageFunction.js").PageFunction, filter: import("../types/PagePredicate.js").PagePredicate): import("../types/Markdown").Markdown<Record<string, any>[]>;
