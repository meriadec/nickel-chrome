const puppeteer = require('puppeteer')

module.exports = async function screenshot(payload) {
  const { html = '', width = 650, height = 650 } = payload
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setContent(html)
  const buffer = await page.screenshot()
  return buffer.toString('base64')
}
