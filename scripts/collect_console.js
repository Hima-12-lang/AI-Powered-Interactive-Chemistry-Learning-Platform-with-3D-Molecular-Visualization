const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2] || 'http://localhost:5173/';
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', (msg) => {
    console.log('[PAGE][console]', msg.type(), msg.text());
  });
  page.on('pageerror', (err) => {
    console.error('[PAGE][error]', err.message);
    console.error(err.stack);
  });

  try {
    const resp = await page.goto(url, { waitUntil: 'load', timeout: 10000 });
    console.log('[PAGE][response]', resp && resp.status());
    try {
      const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML);
      console.log('[PAGE][#root]', rootHTML ? rootHTML.substring(0, 1000) : '<empty>');
        const sheets = await page.evaluate(() => Array.from(document.styleSheets).map(s => ({href: s.href, rules: s.cssRules?.length})).slice(0,50));
        console.log('[PAGE][stylesheets]', JSON.stringify(sheets, null, 2));
    } catch (e) {
      console.error('[SCRIPT][eval-error]', e && e.message);
    }
    await page.waitForTimeout(1000);
    try {
      await page.screenshot({ path: 'scripts/page_shot.png', fullPage: true });
      console.log('[SCRIPT][screenshot] saved to scripts/page_shot.png');
    } catch (e) {
      console.error('[SCRIPT][screenshot-error]', e && e.message);
    }
  } catch (e) {
    console.error('[SCRIPT][error]', e && e.message);
  } finally {
    await browser.close();
  }
})();
