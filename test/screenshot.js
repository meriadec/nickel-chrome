const { expect } = require('chai')

const log = require('../src/log')
const scheduler = require('../src/scheduler')

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
  })
})
