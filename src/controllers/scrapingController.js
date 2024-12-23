const puppeteer = require('puppeteer');
const fs = require('fs');


exports.scrapeWebsite = async (req,res) => {
    const {scrapeURL} = req.body;
    const url = scrapeURL; 
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
  
    try {
      // Navigate to the website
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
      await autoScroll(page);
  
      // Example: Extract article titles (adjust selector based on the target website)
     
      const data = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt || 'No alt text'
      }));  

      const headings = Array.from(document.querySelectorAll('h3')).map(h3 => ({
        text: h3.innerText || 'No text',
      }));
      return { images, headings };
      });  
  
      console.log('Scraped Data:', data);

      saveToFile('data.json', data);
  
      // Optionally, take a screenshot of the page
      await page.screenshot({ path: 'screenshot.png' });
    } catch (error) {
      console.error('Error occurred while scraping:', error);
    } finally {
      // Close the browser
      await browser.close();
    }
  }

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100; // Scroll distance in pixels
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
  
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  function saveToFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(`Error saving data to ${filename}:`, err);
      } else {
        console.log(`Data successfully saved to ${filename}`);
      }
    });
  }