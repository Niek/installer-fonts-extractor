const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.microsoft.com/en-us/software-download/vlacademicwindows10iso');
  await page.selectOption('select#product-languages', { label: 'English' } );
  await (await page.$('#submit-sku')).click();
  const button = await page.waitForSelector('#card-info-content a');
  const url = await button.getAttribute('href');
  console.log(url);
  await browser.close();
})();