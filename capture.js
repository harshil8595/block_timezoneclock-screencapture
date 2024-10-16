// capture.js
const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necessary for Puppeteer on GitHub Actions
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the target URL
  const url = 'https://moodle.org/plugins/block_timezoneclock'; // Replace with the URL you want to capture
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Take a screenshot and save it
  await page.screenshot({ path: `screenshots/example.com.png`, fullPage: true });

  // Close the browser
  await browser.close();
})();
