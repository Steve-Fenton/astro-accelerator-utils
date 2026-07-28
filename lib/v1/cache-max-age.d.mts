export declare const DEV_CACHE_MAX_AGE = 30;
export declare const BUILD_CACHE_MAX_AGE = 300;
/**
 * Resolves cache TTL from the environment and optional site config.
 * Astro dev (`pnpm dev`) sets NODE_ENV to "development" → 30 seconds.
 * Production builds use the configured value, or 5 minutes by default.
 * @param {number | undefined} configuredMaxAge
 * @returns {number}
 */
export declare function resolveCacheMaxAge(configuredMaxAge: number | undefined): number;
