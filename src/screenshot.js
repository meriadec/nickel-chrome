const sharp = require('sharp')

function assignStyle(e, styles) {
  for (const i in styles) {
    if (!styles.hasOwnProperty(i)) {
      continue
    }
    e.style[i] = styles[i]
  }
}

async function injectStyles(page, styles) {
  for (const i in styles) {
    if (!styles.hasOwnProperty(i)) {
      continue
    }
    await page.$eval('body', assignStyle, styles[i])
  }
}

module.exports = async function screenshot(browser, options) {
  const {
    html = '',
    viewportSize = {},
    selector,
    styles,
    resize,
    format = 'jpeg',
    formatOptions = {},
  } = options
  const { width: pageWidth = 650, height: pageHeight = 650, fullPage = false } = viewportSize

  const page = await browser.newPage()
  await page.setViewport({ width: pageWidth, height: pageHeight })
  await page.setContent(html)

  // eventually inject custom styles
  await injectStyles(page, styles)

  let buffer = await page.screenshot({ fullPage })
  await page.close()

  if (resize) {
    const { width, height } = resize
    buffer = await sharp(buffer)
      .resize(width, height)
      .toBuffer()
  }

  return buffer.toString('base64')
}
