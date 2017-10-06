const { expect } = require('chai')

const log = require('../src/log')
const scheduler = require('../src/scheduler')
const h = require('./__helpers')

log.setSilent()

describe('screenshot', () => {
  before(() => {
    return scheduler.launchWorkers(1)
  })

  after(() => {
    return scheduler.stopWorkers()
  })

  it('should take a simple screenshot', async () => {
    const base64 = await scheduler.screenshot({ html: 'hello world' })
    expect(base64).to.be.a('string')
    const imgInfos = await h.getImgInfos(base64)
    expect(imgInfos.width).to.eq(650)
    expect(imgInfos.height).to.eq(650)
  })

  it('should control page width / height', async () => {
    const base64 = await scheduler.screenshot({
      html: 'hello world',
      viewportSize: {
        width: 200,
        height: 100,
      },
    })
    const imgInfos = await h.getImgInfos(base64)
    expect(imgInfos.width).to.eq(200)
    expect(imgInfos.height).to.eq(100)
  })

  it('should resize image', async () => {
    const base64 = await scheduler.screenshot({
      html: '<div style="font-size: 40px">hello world</div>',
      resize: {
        width: 200,
        height: 100,
      },
    })
    const imgInfos = await h.getImgInfos(base64)
    expect(imgInfos.width).to.eq(200)
    expect(imgInfos.height).to.eq(100)
  })

  it('should inject style into page', async () => {
    const base64 = await scheduler.screenshot({
      html: 'hello world',
      viewportSize: {
        fullPage: true,
      },
      styles: {
        body: {
          height: 1000,
          margin: 0,
          backgroundColor: 'blue',
        },
      },
    })
    const imgInfos = await h.getImgInfos(base64)
    expect(imgInfos.height).to.eq(1000)
  })

  it('should generate to desired format', async () => {
    let base64
    const options = { html: 'hello world' }
    base64 = await scheduler.screenshot(options)
    const sizeWithoutCompress = base64.length
    base64 = await scheduler.screenshot({
      ...options,
      format: 'jpg',
      formatOptions: {
        quality: 10,
      },
    })
    const sizeWithCompress = base64.length
    expect(sizeWithCompress).to.be.below(sizeWithoutCompress)
  })
})
