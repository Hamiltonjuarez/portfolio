// Usage: node tools/capture.mjs <baseUrl> <outDir> <slug> [route ...]
// Captures full-page desktop (1440x900) per route + one mobile (390x844) home shot.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const [, , baseUrl, outDir, slug, ...routes] = process.argv;
if (!baseUrl || !outDir) { console.error('need baseUrl + outDir'); process.exit(2); }
const paths = routes.length ? routes : ['/'];
const slug2 = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-') || 'home');

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const shoot = async (route, file, mobile = false) => {
  const ctx = await browser.newContext(
    mobile
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }
  );
  const page = await ctx.newPage();
  try {
    // 'load' (not 'networkidle') — SPA/Inertia apps with polling/websockets
    // never reach networkidle and would burn the full timeout every route.
    await page.goto(baseUrl + route, { waitUntil: 'load', timeout: 30000 });
  } catch { /* settle anyway */ }
  // trigger lazy-loaded content, then return to top for the hero shot
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 600); y += 600;
        if (y >= document.body.scrollHeight) { clearInterval(t); r(); }
      }, 100);
    });
    window.scrollTo(0, 0);
  }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: file, fullPage: true });
  await ctx.close();
  console.log('captured', file);
};
try {
  let i = 1;
  for (const r of paths) {
    await shoot(r, `${outDir}/${String(i).padStart(2, '0')}-${slug2(r)}.png`);
    i++;
  }
  await shoot(paths[0], `${outDir}/${String(i).padStart(2, '0')}-mobile.png`, true);
} finally {
  await browser.close();
}
