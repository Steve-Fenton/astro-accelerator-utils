export const DEV_CACHE_MAX_AGE = 30;
export const BUILD_CACHE_MAX_AGE = 300;

/**
 * Resolves cache TTL from the environment and optional site config.
 * Astro dev (`pnpm dev`) sets NODE_ENV to "development" → 30 seconds.
 * Production builds use the configured value, or 5 minutes by default.
 * @param {number | undefined} configuredMaxAge
 * @returns {number}
 */
export function resolveCacheMaxAge(configuredMaxAge) {
    if (process.env.NODE_ENV === 'development') {
        return DEV_CACHE_MAX_AGE;
    }

    return configuredMaxAge ?? BUILD_CACHE_MAX_AGE;
}
