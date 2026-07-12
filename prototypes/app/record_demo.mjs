import { chromium } from 'playwright'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: '/workspace/revenue-cycle/deck/video-tmp', size: { width: 1280, height: 800 } },
})
const page = await ctx.newPage()
const f = 'file:///workspace/revenue-cycle/prototypes/core-demo.html'
const dwell = 3500
async function visit(h, ms = dwell) {
  await page.goto(f + h); await page.reload(); await page.waitForTimeout(ms)
}
async function scrollTour(ms = 2200) {
  await page.mouse.wheel(0, 500); await page.waitForTimeout(ms / 2)
  await page.mouse.wheel(0, 700); await page.waitForTimeout(ms / 2)
}

// 1. Platform home
await visit('#/', 4000); await scrollTour()
// 2. Dashboard
await visit('#/dashboard'); await scrollTour()
// 3. Analyse — let the streamed paper run a while, then Skip if present
await visit('#/analyse', 1500)
const analyse = page.getByRole('button', { name: /Analyse|Generate/i }).first()
if (await analyse.count()) { await analyse.click(); await page.waitForTimeout(6000) }
const skip = page.getByRole('button', { name: /Skip/i }).first()
if (await skip.count()) { await skip.click(); await page.waitForTimeout(1200) }
await scrollTour()
// 4. Fund intelligence + switcher
await visit('#/fund-intel'); await scrollTour()
await page.getByRole('button', { name: /Federation Health/ }).first().click().catch(() => {})
await page.waitForTimeout(2500)
await page.getByRole('button', { name: /AusCare Health/ }).first().click().catch(() => {})
await page.waitForTimeout(1500)
// 5. Clause intelligence — register, open a clause, levers, packages, dashboard
await visit('#/clauses'); await scrollTour(1800)
const row = page.getByText('AC-12.3').first()
if (await row.count()) { await row.click(); await page.waitForTimeout(3000); await page.keyboard.press('Escape'); await page.waitForTimeout(600) }
for (const t of ['Levers', 'Packages', 'Dashboard']) {
  const tab = page.getByRole('button', { name: new RegExp(t, 'i') }).first()
  if (await tab.count()) { await tab.click(); await page.waitForTimeout(2800) }
}
// 6. Change intelligence
await visit('#/changes'); await scrollTour(1800)
for (const t of ['Register', 'Scenario']) {
  const tab = page.getByRole('button', { name: new RegExp(t, 'i') }).first()
  if (await tab.count()) { await tab.click(); await page.waitForTimeout(2600) }
}
// 7. Oracle
await visit('#/oracle', 2000)
const q = page.getByRole('button', { name: /termination/i }).first()
if (await q.count()) { await q.click(); await page.waitForTimeout(7000) }
// 8. Revenue integrity dashboard
await visit('#/integrity'); await scrollTour()
// 9. Platform home close
await visit('#/', 2500)

await ctx.close()
await browser.close()
console.log('recorded')
