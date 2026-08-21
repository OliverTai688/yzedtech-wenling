// PLN-002 第四層（視覺驗收）輔助工具 — 非必要相依套件，需要時才手動安裝／執行：
//   pnpm add -D playwright && npx playwright install chromium
//   pnpm dev（另開一個終端機，確保 http://localhost:3000 在跑）
//   node scripts/visual-qa.mjs
// 會走訪 routes 陣列列出的所有頁面，記錄 console error／網路請求失敗（含 404），
// 並將全頁截圖存到 /tmp/qa-screenshots，方便快速肉眼複查排版與連結是否正常。
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.QA_BASE_URL || 'http://localhost:3000';
const OUT_DIR = process.env.QA_OUT_DIR || '/tmp/qa-screenshots';
fs.mkdirSync(OUT_DIR, { recursive: true });

const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/story', name: 'story' },
  { path: '/services', name: 'services' },
  { path: '/services?tab=theta-training', name: 'services-theta-training' },
  { path: '/testimonials', name: 'testimonials' },
  { path: '/resources', name: 'resources' },
  { path: '/blog', name: 'blog' },
  { path: '/faq', name: 'faq' },
  { path: '/legal', name: 'legal' },
  { path: '/contact', name: 'contact' },
  { path: '/does-not-exist-check-404', name: 'not-found-page' },
];

const results = [];

// executablePath 只在本沙盒環境需要（Chromium 安裝在非預設路徑）；一般本機安裝
// playwright 後留空即可，playwright 會自動找到 `npx playwright install` 裝好的瀏覽器。
const launchOptions = process.env.QA_CHROMIUM_PATH ? { executablePath: process.env.QA_CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOptions);

for (const viewport of [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();

  for (const route of routes) {
    const consoleErrors = [];
    const failedRequests = [];
    const pageErrors = [];

    const onConsole = (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    };
    const onResponse = (res) => {
      if (res.status() >= 400) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    };
    const onPageError = (err) => pageErrors.push(String(err));

    page.on('console', onConsole);
    page.on('response', onResponse);
    page.on('pageerror', onPageError);

    let httpStatus = null;
    let navError = null;
    try {
      const resp = await page.goto(BASE + route.path, { waitUntil: 'networkidle', timeout: 20000 });
      httpStatus = resp ? resp.status() : null;
      await page.waitForTimeout(500);
    } catch (e) {
      navError = String(e);
    }

    const shotPath = path.join(OUT_DIR, `${viewport.label}-${route.name}.png`);
    try {
      await page.screenshot({ path: shotPath, fullPage: true });
    } catch (e) {
      navError = (navError ? navError + ' | ' : '') + 'screenshot failed: ' + String(e);
    }

    results.push({
      viewport: viewport.label,
      route: route.path,
      httpStatus,
      navError,
      consoleErrors,
      failedRequests,
      pageErrors,
      screenshot: shotPath,
    });

    page.off('console', onConsole);
    page.off('response', onResponse);
    page.off('pageerror', onPageError);
  }

  await context.close();
}

await browser.close();

fs.writeFileSync('/tmp/qa-screenshots/results.json', JSON.stringify(results, null, 2));

// Print a compact summary
for (const r of results) {
  const issues = [];
  if (r.navError) issues.push(`NAV_ERROR: ${r.navError}`);
  if (r.httpStatus && r.httpStatus >= 400) issues.push(`HTTP ${r.httpStatus}`);
  if (r.consoleErrors.length) issues.push(`console.error x${r.consoleErrors.length}: ${r.consoleErrors.slice(0,3).join(' || ')}`);
  if (r.failedRequests.length) issues.push(`failed reqs: ${r.failedRequests.slice(0,5).join(' || ')}`);
  if (r.pageErrors.length) issues.push(`pageerror: ${r.pageErrors.slice(0,2).join(' || ')}`);
  console.log(`[${r.viewport}] ${r.route} -> HTTP ${r.httpStatus}${issues.length ? '  ⚠ ' + issues.join(' ; ') : '  ✅'}`);
}
