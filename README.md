# Web_Scraper_Windesheim

This project demonstrates a web scraper implemented using Node.js, Puppeteer, and robots-parser. The scraper ensures compliance with the robots.txt file of the target website before proceeding with scraping operations. It is designed to extract case studies from a specified website and save the data into a JSON file.

## Project Structure

### RobotsChecker.js

Handles fetching and parsing the robots.txt file to verify if the scraper is allowed to crawl specific URLs.

Key Functions:

- ```fetchRobotsTxt()```: Fetches and parses the robots.txt file.

- ```isAllowed(url)```: Checks if the specified URL is allowed to be scraped based on the robots.txt rules.

### Scraper.js

Implements the web scraper using Puppeteer. It extracts case study information from the specified website and saves the results to a JSON file.

Constructor Parameters:

- ```baseURL```: The base URL of the website to scrape.

- ```useCaseClass```: The CSS class for the use case container.

- ```useCaseTitleClass```: The CSS class for the use case title.

- ```useCaseContentClass```: The CSS class for the use case content.

- ```linkElementClass```: The CSS class for the use case link.

- ```numberOfPages```: The total number of pages to scrape.

- ```titleData```: The title of the last scraped case study to avoid duplication.

Key Functions:

- ```scrape()```: Performs the web scraping operations.

- ```addOnlyNewElement(title, data)```: Filters out duplicate case studies based on the title.

- ```saveData(data)```: Saves the extracted data to a JSON file in the Results directory.

### main.js

The entry point of the application. Combines RobotsChecker and Scraper to ensure compliance and then performs scraping.

## Installation

### Prerequisites

- Node.js (v16 or above)

- npm or yarn

### Steps 

Install dependencies 

``` 
npm install
```
## Usage

### Update ```main.js``` with your scraping parameters:

- ```url```: The base URL of the website to scrape.

- ```useCaseClass```: The CSS class of the use case container.

- ```useCaseTitleClass```: The CSS class of the use case title.

- ```useCaseContentClass```: The CSS class of the use case content.

- ```linkElementClass```: The CSS class of the link element.

- ```numberOfPages```: Total pages to scrape.

- ```titleData```: Title of the last scraped case study to avoid duplication.

### Run the scraper:

```
node main.js
```

### Output:

The extracted data will be saved in the Results directory as a JSON file. The filename will be based on the hostname of the base URL.

## Example

### Input Parameters in ```main.js```:

``` 
const request = {
    url: 'https://www.mckinsey.com/about-us/case-studies',
    useCaseClass: '.GenericItem_mck-c-generic-item--with-hover-effect__hmVy2',
    useCaseTitleClass: 'h5',
    useCaseContentClass: '.mck-c-generic-item__description',
    linkElementClass: 'a',
    numberOfPages: 1,
    titleData: "Helping Starbucks design stores that are inclusive for all"
};
```
### Console Output:

```
Fetching robots.txt from: https://www.mckinsey.com/robots.txt
Robots.txt content:
 ...
Can crawl https://www.mckinsey.com/about-us/case-studies? true
Navigating to page: https://www.mckinsey.com/about-us/case-studies
Waiting for selector...
Selector found!
Page 1 extracted
Data saved to ../../Results/mckinsey_case_studies.json
```
## Features:

- Compliance with robots.txt: Ensures ethical scraping by respecting website rules.

- Dynamic Parameters: Allows customization for scraping different websites.

- Data Deduplication: Prevents saving duplicate case studies.

- JSON Export: Saves results in an easy-to-use JSON format.

## Dependencies

- Node.js: JavaScript runtime.

- Puppeteer: Headless browser automation.

- node-fetch: Fetch API for Node.js.

- robots-parser: Parser for robots.txt files.