import fetch from 'node-fetch';
import robotsParser from 'robots-parser';

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
const robotsTxtUrl = "https://www.mckinsey.com/robots.txt";
const testURL = "https://www.mckinsey.com/layouts/";  // URL interdite par Disallow: /sitecore/

// Fonction pour récupérer et analyser le robots.txt
const checkRobotsTxt = async () => {
    console.log(`Fetching robots.txt from: ${robotsTxtUrl}`);
    const response = await fetch(robotsTxtUrl);
    const robotsTxt = await response.text();
    
    console.log('Robots.txt content:\n', robotsTxt);
    
    // Parser le contenu du robots.txt
    const robots = robotsParser(robotsTxtUrl, robotsTxt);
    
    // Vérifie si l'URL de base est autorisée pour un user-agent spécifique
    const canCrawl = robots.isAllowed(testURL, ua);
    console.log(`Can crawl ${testURL}?`, canCrawl);
    
    return canCrawl;
};

// Fonction principale pour tester
const testRobots = async () => {
    const result = await checkRobotsTxt();
    
    if (result) {
        console.log('Scraping is allowed for this URL.');
    } else {
        console.log('Scraping is NOT allowed for this URL.');
    }
}

testRobots();
