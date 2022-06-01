const { chromium } = require('playwright-chromium');

const printUsage = () => {
  console.log('Usage: node link.js [win10|win11]');
  process.exit(1)
}

(async () => {
  const args = process.argv.slice(2);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  if (args.length === 1) {
    if (args[0] === 'win10') {
      await page.goto('https://www.microsoft.com/en-us/software-download/windows10ISO');
      await page.selectOption('select#product-edition', { label: 'Windows 10 (multi-edition ISO)' } );
      await (await page.$('#submit-product-edition')).click();
      await page.selectOption('select#product-languages', { label: 'English International' } );
      await (await page.$('#submit-sku')).click();
    } else if (args[0] === 'win11') {
      await page.goto('https://www.microsoft.com/software-download/windows11');
      await page.selectOption('select#product-edition', { label: 'Windows 11 (multi-edition ISO)' } );
      await (await page.$('#submit-product-edition')).click();
      await page.selectOption('select#product-languages', { label: 'English International' } );
      await (await page.$('#submit-sku')).click();
    } else printUsage()
  } else printUsage()
  
  const button = await page.waitForSelector('#card-info-content a');
  const url = await button.getAttribute('href');
  console.log(url);
  await browser.close();
})();