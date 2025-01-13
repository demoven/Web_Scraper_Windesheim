// main.js
import RobotsChecker from './RobotsChecker.js';
import Scraper from './Scraper.js';

const request = {
    url: 'https://www.mckinsey.com/about-us/case-studies',
    useCaseClass: '.GenericItem_mck-c-generic-item--with-hover-effect__hmVy2',
    useCaseTitleClass: 'h5',
    useCaseContentClass: '.mck-c-generic-item__description',
    linkElementClass: 'a',
    numberOfPages: 1,
    titleData: "Helping Starbucks design stores that are inclusive for all"
}

const url = new URL(request.url);
const websiteName = url.hostname;
const robotsTxtUrl = `https://${websiteName}/robots.txt`;

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';

const main = async () => {
    const robotsChecker = new RobotsChecker(robotsTxtUrl, userAgent);
    
    // Check if scraping is allowed
    const isAllowed = await robotsChecker.isAllowed(request.url);
    if (!isAllowed) {
        console.log(`Scraping not allowed for ${request.url}`);
        return;
    }

    // If scraping is allowed, start scraping
    const scraper = new Scraper(request.url, request.useCaseClass, request.useCaseTitleClass, request.useCaseContentClass, request.linkElementClass, request.numberOfPages, request.titleData);
    await scraper.scrape();
};

main();
