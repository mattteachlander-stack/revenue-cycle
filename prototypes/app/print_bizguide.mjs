import { chromium } from 'playwright'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.goto('file:///workspace/revenue-cycle/docs/business-setup-onepager.html')
await page.waitForTimeout(400)
// check it fits one A4 page
const h = await page.evaluate(() => document.querySelector('.page').getBoundingClientRect().height)
const mm = h / (96 / 25.4)
console.log('page height:', mm.toFixed(1), 'mm (A4 = 297)')
await page.pdf({ path: '/workspace/revenue-cycle/docs/business-setup-guide.pdf', format: 'A4', printBackground: true })
console.log('pdf written')
await browser.close()
