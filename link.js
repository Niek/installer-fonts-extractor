const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.microsoft.com/en-us/software-download/windows10ISO');
  await page.selectOption('select#product-edition', { label: 'Windows 10 (multi-edition ISO)' } );
  await (await page.$('#submit-product-edition')).click();
  await page.selectOption('select#product-languages', { label: 'English International' } );
  await (await page.$('#submit-sku')).click();
  const button = await page.waitForSelector('#card-info-content a');
  const url = await button.getAttribute('href');
  console.log(url);
  await browser.close();
})();