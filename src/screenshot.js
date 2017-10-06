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

function getClip(page, selector) {
  return page.$eval(selector, el => {
    const rect = el.getBoundingClientRect()
    return { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
  })
}

module.exports = async function screenshot(browser, options) {
  const {
    html = '',
    viewportSize = {},
    selector,
    styles,
    resize,
    // can be ['jpg', 'png']
    format,
    formatOptions = {},
  } = options

  const { width: pageWidth = 650, height: pageHeight = 650, fullPage = false } = viewportSize

  const page = await browser.newPage()
  await page.setViewport({ width: pageWidth, height: pageHeight })
  await page.setContent(html)

  const clip = selector ? await getClip(page, selector) : null

  // eventually inject custom styles
  await injectStyles(page, styles)

  let buffer = await page.screenshot({
    fullPage: fullPage && !clip,
    ...(clip ? { clip } : {}),
  })
  await page.close()

  // sharp operations
  const shouldSharp = !!resize || !!format
  if (shouldSharp) {
    let img = sharp(buffer)

    // resize image
    if (resize) {
      const { width, height } = resize
      img = img.resize(width, height)
    }

    // image format
    if (format) {
      if (format === 'jpg') {
        img = img.jpeg(formatOptions)
      } else if (format === 'png') {
        img = img.png(formatOptions)
      }
    }
    buffer = await img.toBuffer()
  }

  return buffer.toString('base64')
}
