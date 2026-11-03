// Report characters per line for body text, and contrast of every text colour pair used.
// Usage: node qa/measure.mjs <url> [width]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const [url = 'http://localhost:4321/', width = '1440'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
const res = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('main p, main li')) {
    if (el.querySelector('p, li')) continue;
    const text = el.textContent.trim();
    if (text.length < 80) continue;
    // Wrap words to find line breaks
    const clone = el.cloneNode(true);
    el.parentNode.insertBefore(clone, el);
    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const n of nodes) {
      const frag = document.createDocumentFragment();
      for (const part of n.textContent.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) frag.append(part);
        else { const s = document.createElement('span'); s.textContent = part; s.dataset.w = '1'; frag.append(s); }
      }
      n.replaceWith(frag);
    }
    const lines = new Map();
    for (const s of clone.querySelectorAll('[data-w]')) {
      const top = Math.round(s.getBoundingClientRect().top);
      lines.set(top, (lines.get(top) ?? '') + s.textContent + ' ');
    }
    clone.remove();
    const lens = [...lines.values()].map((l) => l.trim().length);
    out.push({ start: text.slice(0, 40), font: getComputedStyle(el).fontSize, lines: lens.length, max: Math.max(...lens), lens: lens.slice(0, -1).join(',') });
  }
  return out;
});
for (const r of res) console.log(`${r.font} max ${r.max} [${r.lens}] ${r.start}`);
await browser.close();
