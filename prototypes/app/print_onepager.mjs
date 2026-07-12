import { chromium } from 'playwright'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.goto('file:///workspace/revenue-cycle/deck/onepager.html')
await page.waitForTimeout(500)
await page.pdf({ path: '/workspace/revenue-cycle/deck/core-onepager.pdf', format: 'A4', printBackground: true })
console.log('pdf written')
await browser.close()
