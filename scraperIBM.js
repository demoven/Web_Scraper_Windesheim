import puppeteer from 'puppeteer';
import fs from 'fs';

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'; // User-Agent Chrome Windows
const baseURL = "https://www.ibm.com/case-studies/search?sort=dcdate_desc&p=";
const useCaseClass = '.bx--card-group__cards__col';
const useCaseTitleClass = '.bx--card__heading';
const useCaseContentClass = '.bx--card__copy';

const main = async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--lang=en-US' 
        ]
    });
    const page = await browser.newPage();

    await page.setUserAgent(ua); 

    let allData = []; 
    
    for (let i = 1; i <= 32; i++) {
        const url = `${baseURL}${i}`;
        await page.goto(url);
        
        await page.waitForSelector('.bx--card-group__cards__col');
        
        const data = await page.evaluate(() => {
            const cards = document.querySelectorAll('.bx--card-group__cards__col');
            
            return Array.from(cards).map(card => {
                const titleElement = card.querySelector('.bx--card__heading');
                const contentElement = card.querySelector('.bx--card__copy');
                const linkElement = card.querySelector('a'); 
                
                return {
                    title: titleElement ? titleElement.innerText : null,
                    content: contentElement ? contentElement.innerText : null,
                    href: linkElement ? linkElement.href : null
                };
            });
        });
        
        allData = allData.concat(data);
        console.log(`Page ${i} extracted`);
    }
    
    console.log(allData);
    await browser.close();
    fs.writeFileSync('ibm_case_studies.json', JSON.stringify(allData, null, 2));
}

main();
