import fs from 'fs';
import path from 'path';
import process from 'process';
import { EOL } from 'os';

export class Statistics {
    /**
     * Creates a new stats instance - all instances append to the stats file
     * Use Statistics.purge() to reset the file
     * After creating a timer, use start() and stop() to record an event
     * @param {string} operation 
     */
    constructor(operation) {
        this.operation = operation.replace(/"/g, '');
    }

    /**
     * Clears the stats file
     */
    static purge() {
        const path = this.getItemPath();
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }

        fs.writeFileSync(path, `Operation,Date,Duration${EOL}`);
    }

    /**
     * Gets high resolution time in ms
     * @returns number
     */
    getMilliseconds() {
        const hrtime = process.hrtime();
        return (hrtime[0] * 1000) + (hrtime[1] / 1000000);
    }

    /**
     * Start the timer
     */
    start() {
        this.start = this.getMilliseconds();
    }

    /**
     * Stop the timer (logs to .logs/statistics.csv)
     */
    stop() {
        this.end = this.getMilliseconds();
        this.duration = this.end - this.start;

        const path = Statistics.getItemPath();

        if (!fs.existsSync(path)) {
            Statistics.purge();
        }

        fs.appendFileSync(path, `"${this.operation}",${new Date().toJSON()},${this.duration}${EOL}`);
    }

    /**
     * Get's the path of the log files
     * @returns {string}
     */
    static getLogPath () {
        const logPath = path.join(process.cwd(), '.log/');
        fs.mkdirSync(logPath, { recursive: true })
        return logPath;
    }

    /**
     * Gets the file path for a log item
     * @returns {string}
     */
    static getItemPath () {
        const cachePath = this.getLogPath();
        return path.join(cachePath, 'statistics.csv');
    }
}