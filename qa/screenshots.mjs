// Screenshot every page at phone, tablet and desktop width, first screen and full page.
// Usage: node qa/screenshots.mjs <baseUrl> <outDir> [scale]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdir } from 'node:fs/promises';

const [base = 'http://localhost:4321', out = 'qa/screenshots', scale = '1'] = process.argv.slice(2);
const widths = [{ w: 390, h: 844, name: 'phone' }, { w: 834, h: 1112, name: 'tablet' }, { w: 1440, h: 900, name: 'desktop' }];
const pages = (process.env.PAGES ?? '/,/privacy/,/404.html').split(',');

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const { w, h, name } of widths.concat([{ w: 320, h: 640, name: 'narrow' }])) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: Number(scale) });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2200);
    const slug = p === '/' ? 'home' : p.replace(/[\/.]+/g, '-').replace(/^-|-$/g, '');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    report.push(`${name} ${w}px ${p}: horizontal overflow ${overflow}px`);
    if (name === 'narrow') continue;
    // animations: 'disabled' shows the hero in its final state (full-page capture restarts CSS animations)
    await page.screenshot({ path: `${out}/${slug}-${name}-first-screen.png`, animations: 'disabled' });
    await page.screenshot({ path: `${out}/${slug}-${name}-full.png`, fullPage: true, animations: 'disabled' });
  }
  await ctx.close();
}
await browser.close();
console.log(report.join('\n'));
