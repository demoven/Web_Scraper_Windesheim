import puppeteer from 'puppeteer';
import fs from 'fs';

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
const baseURL = "https://www.mckinsey.com/about-us/case-studies";
const useCaseClass = '.GenericItem_mck-c-generic-item--with-hover-effect__hmVy2';
const useCaseTitleClass = 'h5';
const useCaseContentClass = '.mck-c-generic-item__description';
const numberOfPages = 1;
const linkElementClass = 'a';

const url = new URL(baseURL);
const websiteName = url.hostname;
const websiteNameWithoutWWW = websiteName.replace('www.', '').replace('.com', '');

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

    for (let i = 1; i <= numberOfPages; i++) {
        let url = `${baseURL}${i}`;
        if (i === 1) {
            url = baseURL;
        }
        console.log(`Navigating to page: ${url}`);

        await page.goto(url, { waitUntil: 'networkidle2' });

        console.log('Waiting for selector...');
        await page.waitForSelector(useCaseClass, { visible: true, timeout: 60000 });
        console.log('Selector found!');

        const data = await page.evaluate((useCaseClass, useCaseTitleClass, useCaseContentClass, linkElementClass) => {
            const cards = document.querySelectorAll(useCaseClass);

            return Array.from(cards).map(card => {
                let titleElement = null;
                let contentElement = null;
                let linkElement = null;
                if (useCaseTitleClass) {
                    titleElement = card.querySelector(useCaseTitleClass);
                }
                if ( useCaseContentClass) {
                    contentElement = card.querySelector(useCaseContentClass);
                }
                if (linkElementClass) {
                    linkElement = card.querySelector(linkElementClass);
                }

                return {
                    title: titleElement ? titleElement.innerText : null,
                    content: contentElement ? contentElement.innerText : null,
                    href: linkElement ? linkElement.href : null
                };
            });
        }, useCaseClass, useCaseTitleClass, useCaseContentClass, linkElementClass);

        allData = allData.concat(data);
        console.log(`Page ${i} extracted`);
    }

    console.log(allData);
    await browser.close();
    fs.writeFileSync(websiteNameWithoutWWW + "_case_studies.json", JSON.stringify(allData, null, 2));
}

main();
