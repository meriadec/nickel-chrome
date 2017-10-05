module.exports = async function screenshot(browser, payload) {
  const { html = '', width = 650, height = 650 } = payload
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.setContent(html)
  const buffer = await page.screenshot()
  return buffer.toString('base64')
}
