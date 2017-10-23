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

  it('should capture a given selector', async () => {
    const base64 = await scheduler.screenshot({
      selector: '.block-2',
      html: `
        <div>
          <div class="block-1" style="width: 200px; height: 300px">
            THIS IS BLOCK 1
          </div>
          <div class="block-2" style="width: 400px; height: 600px">
            THIS IS BLOCK 2
          </div>
        </div>
      `,
    })
    const imgInfos = await h.getImgInfos(base64)
    expect(imgInfos.width).to.eq(400)
    expect(imgInfos.height).to.eq(600)
  })

  it('should capture all the images on a real world template', async () => {
    const html = await h.readFixture('real-world-1.html')
    const base64 = await scheduler.screenshot({
      html,
      viewportSize: {
        fullPage: true,
      },
    })
    await h.writeImage(base64, 'toto')
  })
})
