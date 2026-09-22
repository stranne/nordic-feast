// Run against the local preview. Optional audit dependencies live in .cache.
// npm install --prefix .cache/a11y-tools --no-audit --no-fund playwright axe-core
// node scripts/check_accessibility.cjs
const { chromium } = require('../.cache/a11y-tools/node_modules/playwright');
const axePath = require.resolve('../.cache/a11y-tools/node_modules/axe-core/axe.min.js');
const assert = require('node:assert/strict');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:1111';

(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const results = [];
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.waitForURL('**/sverige/**');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Till råvarorna');
    assert(await page.locator('.skip-link').evaluateAll(links => links.every(link => {
      const bounds = link.getBoundingClientRect();
      return bounds.top >= 0 && bounds.bottom <= innerHeight;
    })));
    await page.keyboard.press('Enter');
    assert(await page.locator(':focus').evaluate(el => !!el.closest('.ingredient-card')));

    for (const [path, searchTabs] of [['/sverige/september/', 10], ['/ravaror/', 7]]) {
      await page.goto(base + path);
      // Verify the ordinary sequence as well as the shortcut, without focus().
      for (let i = 0; i < searchTabs; i++) await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'ingredient-search');
      for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').textContent(), 'Bär');
      const links = await page.locator('.ingredient-card a').allTextContents();
      for (const name of links) {
        await page.keyboard.press('Tab');
        assert.equal((await page.locator(':focus h2').textContent()).trim(), name.trim().split('\n')[0]);
        assert(await page.locator(':focus').evaluate(el => el.matches(':focus-visible') && getComputedStyle(el).outlineStyle === 'solid'));
      }
      const detailUrl = await page.locator(':focus').getAttribute('href');
      await page.keyboard.press('Enter');
      await page.waitForURL(detailUrl);
      assert(await page.locator('.ingredient-detail').isVisible());
      // This is a fresh-entry check, separate from intentional return-focus tests.
      await page.evaluate(() => sessionStorage.clear());
      await page.goto(base + path);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      assert(await page.locator(':focus').evaluate(el => !!el.closest('.ingredient-card')));
      results.push(`${path}: search in ${searchTabs} Tabs; first food via Tab, Enter; all ${links.length} food links visibly focusable`);
    }

    await page.goto(`${base}/sverige/september/?q=morot`);
    for (let i = 0; i < 9; i++) await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Välj månad');
    await page.keyboard.press('Enter');
    assert(await page.locator('.month-picker').evaluate(el => el.open));
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('aria-label'), 'Januari');
    await page.keyboard.press('Enter');
    await page.waitForURL(/\/sverige\/januari\/?\?q=morot$/);
    assert.equal(await page.getByRole('searchbox').inputValue(), 'morot');
    await page.goto(`${base}/sverige/september/?q=zzzz`);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').textContent(), 'Rensa filter');
    results.push('Month disclosure opens with Enter and preserves filters; empty-result shortcut focuses reset');

    await page.goto(`${base}/sverige/september/`);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Till sök och filter');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'ingredient-search');
    await page.keyboard.type('morot');
    await page.waitForFunction(() => document.querySelector('.filter-status').textContent.includes('morot'));
    assert.equal(await page.locator('.ingredient-card:visible').count(), 1);
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('searchbox').inputValue(), '');
    await page.keyboard.type('zzzz');
    for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Rensa filter');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'ingredient-search');
    for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Frukt');
    await page.keyboard.press('Space');
    assert.equal(await page.locator(':focus').getAttribute('aria-pressed'), 'true');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const ingredient = await page.locator(':focus').getAttribute('aria-labelledby');
    assert(ingredient, 'Tab must skip hidden cards and reach a visible ingredient');
    await page.keyboard.press('Enter');
    await page.waitForURL('**/ravaror/**');
    await page.getByRole('link', { name: 'September', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(id => document.activeElement.getAttribute('aria-labelledby') === id, ingredient);
    assert(new URL(page.url()).searchParams.get('category') === 'frukt');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Bär');
    results.push('Keyboard skip links, search, Escape, empty/reset, Space, hidden cards, detail return and reverse Tab');

    for (const path of ['/sverige/september/', '/ravaror/', '/ravaror/hallon/']) {
      await page.goto(base + path);
      await page.addScriptTag({ path: axePath });
      const audit = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
      assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
      results.push(`axe: ${path}, ${audit.incomplete.length} checks requiring further assessment`);
    }
    for (const width of [320, 390, 760, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`${base}/sverige/september/`);
      await page.locator('.month-picker summary').press('Space');
      for (const size of ['100%', '200%']) {
        await page.evaluate(size => document.documentElement.style.fontSize = size, size);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        assert(await page.locator('.month-nav a').evaluateAll(links => links.every(link => link.scrollWidth <= link.clientWidth)));
      }
    }
    await page.evaluate(() => document.documentElement.style.fontSize = '100%');
    await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
    await page.getByRole('searchbox').focus();
    assert.equal(await page.locator(':focus').evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
    assert.equal(await page.locator('main').evaluate(el => getComputedStyle(el).viewTransitionName), 'none');
    results.push('320/390/760/1280px with normal and 200% text; forced-colour focus; reduced motion');
    await context.close();

    const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
    const fallback = await plain.newPage();
    await fallback.goto(base);
    assert.equal(await fallback.locator('.year-grid a').count(), 12);
    await fallback.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert(await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await fallback.locator('[data-month="9"]').focus();
    await fallback.keyboard.press('Enter');
    await fallback.waitForURL(/\/sverige\/september\/?$/);
    assert.equal(await fallback.locator('.skip-filters').isVisible(), false);
    assert.equal(await fallback.getByRole('searchbox').isVisible(), false);
    await fallback.keyboard.press('Tab');
    await fallback.keyboard.press('Enter');
    assert.equal(await fallback.locator(':focus').getAttribute('id'), 'results');
    await fallback.keyboard.press('Tab');
    assert(await fallback.locator(':focus').evaluate(el => !!el.closest('.ingredient-card')));
    await fallback.keyboard.press('Enter');
    await fallback.waitForURL('**/ravaror/**');
    assert(await fallback.locator('.ingredient-detail').isVisible());
    results.push('No-JavaScript month chooser at 200% text and keyboard month-to-detail navigation');
    await plain.close();
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ passed: results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
