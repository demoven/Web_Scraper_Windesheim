// RobotsChecker.js
import fetch from 'node-fetch';
import robotsParser from 'robots-parser';

class RobotsChecker {
    constructor(robotsTxtUrl, userAgent) {
        this.robotsTxtUrl = robotsTxtUrl;
        this.userAgent = userAgent;
        this.robots = null;
    }

    async fetchRobotsTxt() {
        try {
            console.log(`Fetching robots.txt from: ${this.robotsTxtUrl}`);
            const response = await fetch(this.robotsTxtUrl);
            const robotsTxt = await response.text();
            console.log('Robots.txt content:\n', robotsTxt);
            this.robots = robotsParser(this.robotsTxtUrl, robotsTxt);
        } catch (error) {
            console.error('Error fetching robots.txt:', error);
        }
    }

    async isAllowed(url) {
        if (!this.robots) {
            await this.fetchRobotsTxt();
        }
        const isAllowed = this.robots.isAllowed(url, this.userAgent);
        console.log(`Can crawl ${url}?`, isAllowed);
        return isAllowed;
    }
}

export default RobotsChecker;
