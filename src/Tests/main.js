// main.js
import RobotsChecker from './RobotsChecker.js';
import Scraper from './Scraper.js';

const baseURL = "https://www.mckinsey.com/about-us/case-studies";
const useCaseClass = '.GenericItem_mck-c-generic-item--with-hover-effect__hmVy2';
const useCaseTitleClass = 'h5';
const useCaseContentClass = '.mck-c-generic-item__description';
const linkElementClass = 'a';
const numberOfPages = 1;

const url = new URL(baseURL);
const websiteName = url.hostname;
const robotsTxtUrl = `https://${websiteName}/robots.txt`;

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';

const main = async () => {
    const robotsChecker = new RobotsChecker(robotsTxtUrl, userAgent);
    
    // Vérifie si le scraping est autorisé pour l'URL de base
    const isAllowed = await robotsChecker.isAllowed(baseURL);
    if (!isAllowed) {
        console.log(`Scraping not allowed for ${baseURL}`);
        return;
    }

    // Si le scraping est autorisé, on lance le scraper
    const scraper = new Scraper(baseURL, useCaseClass, useCaseTitleClass, useCaseContentClass, linkElementClass, numberOfPages);
    await scraper.scrape();
};

main();
