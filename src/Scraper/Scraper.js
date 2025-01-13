// Scraper.js
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

class Scraper {
    // Private fields
    #baseURL;
    #useCaseClass;
    #useCaseTitleClass;
    #useCaseContentClass;
    #linkElementClass;
    #numberOfPages;
    #titleData;
    #userAgent;

    constructor(baseURL, useCaseClass, useCaseTitleClass, useCaseContentClass, linkElementClass, numberOfPages, titleData) {
        this.#baseURL = baseURL;
        this.#useCaseClass = useCaseClass;
        this.#useCaseTitleClass = useCaseTitleClass;
        this.#useCaseContentClass = useCaseContentClass;
        this.#linkElementClass = linkElementClass;
        this.#numberOfPages = numberOfPages;
        this.#titleData = titleData;
        this.#userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    }

    async scrape() {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--lang=en-US']
        });
        const page = await browser.newPage();
        await page.setUserAgent(this.#userAgent);

        let allData = [];
        for (let i = 1; i <= this.#numberOfPages; i++) {
            let url = `${this.#baseURL}${i}`;
            if (i === 1) {
                url = this.#baseURL;
            }
            console.log(`Navigating to page: ${url}`);
            await page.goto(url, { waitUntil: 'networkidle2' });

            console.log('Waiting for selector...');
            await page.waitForSelector(this.#useCaseClass, { visible: true, timeout: 60000 });
            console.log('Selector found!');

            // Extract data
            const data = await page.evaluate((useCaseClass, useCaseTitleClass, useCaseContentClass, linkElementClass) => {
                const cards = document.querySelectorAll(useCaseClass);

                return Array.from(cards).map(card => {
                    const titleElement = card.querySelector(useCaseTitleClass);
                    const contentElement = card.querySelector(useCaseContentClass);
                    const linkElement = card.querySelector(linkElementClass);

                    return {
                        title: titleElement ? titleElement.innerText : null,
                        content: contentElement ? contentElement.innerText : null,
                        href: linkElement ? linkElement.href : null
                    };
                });
            }, this.#useCaseClass, this.#useCaseTitleClass, this.#useCaseContentClass, this.#linkElementClass);

            allData = allData.concat(data);
            console.log(`Page ${i} extracted`);
        }

        await browser.close();
        this.saveData(this.addOnlyNewElement(this.#titleData, allData));
    }

    // Add only new element to the data, no duplicates

    addOnlyNewElement(title, data) {
        let sortData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].title === title) {
                break;
            }
            sortData.push(data[i]);
        }
        console.log("sortData: ", sortData);
        return sortData;
    }

    // Save data to a JSON file
    
    saveData(data) {
        const url = new URL(this.#baseURL);
        const websiteName = url.hostname.replace('www.', '').replace('.com', '');
        const filePath = `../../Results/${websiteName}_case_studies.json`;

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Data saved to ${filePath}`);
    }
}

export default Scraper;
