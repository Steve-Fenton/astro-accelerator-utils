export class Statistics {
    /**
     * Clears the stats file
     */
    static purge(): void;
    /**
     * Get's the path of the log files
     * @returns {string}
     */
    static getLogPath(): string;
    /**
     * Gets the file path for a log item
     * @returns {string}
     */
    static getItemPath(): string;
    /**
     * Creates a new stats instance - all instances append to the stats file
     * Use Statistics.purge() to reset the file
     * After creating a timer, use start() and stop() to record an event
     * @param {string} operation
     */
    constructor(operation: string);
    operation: string;
    /**
     * Gets high resolution time in ms
     * @returns number
     */
    getMilliseconds(): number;
    /**
     * Start the timer
     */
    start(): void;
    /**
     * Stop the timer (logs to .logs/statistics.csv)
     */
    stop(): void;
    end: number;
    duration: number;
}
