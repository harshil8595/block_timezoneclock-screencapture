// capture.js
const puppeteer = require('puppeteer');

// Helper function to format the date for the filename
function getFormattedTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necessary for Puppeteer on GitHub Actions
  });

  // Open a new page
  const page = await browser.newPage();

  await page.setCookie({
    domain: '.moodle.org',
    name: 'OptanonAlertBoxClosed',
    value: new Date().toISOString(),    
  });

  // Navigate to the target URL
  const url = 'https://moodle.org/plugins/block_timezoneclock'; // Replace with the URL you want to capture
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Get current timestamp for the screenshot filename
  const timestamp = getFormattedTimestamp();

  // Take a screenshot and save it with a timestamp in the filename
  const screenshotPath = `screenshots/block_timezoneclock_${timestamp}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot saved as ${screenshotPath}`);

  // Close the browser
  await browser.close();
})();
