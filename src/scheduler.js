const puppeteer = require('puppeteer')

const log = require('./log')
const screenshot = require('./screenshot')

const workers = []

async function launchWorker() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  workers.push({ browser, isAvailable: true })
  log.log(`Launched worker (total: ${workers.length})`)
}

function wait(ms = 200) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getAvailableWorker(maxRetry = 10) {
  if (!maxRetry) {
    throw new Error('No available browsers.')
  }
  const browser = workers.find(w => w.isAvailable)
  if (browser) {
    return browser
  }
  await wait()
  return getAvailableWorker(maxRetry - 1)
}

exports.launchWorkers = async function(nb = 5) {
  log.log('Launching workers')
  for (let i = 0; i < nb; i++) {
    await launchWorker()
  }
}

exports.stopWorkers = async function() {
  for (let i = 0; i < workers.length; i++) {
    try {
      // for some reason, sometimes close fail (but no zombie process)
      await workers[i].browser.close()
    } catch (err) {} // eslint-disable-line no-empty
  }
}

exports.screenshot = async function(payload) {
  const worker = await getAvailableWorker()
  worker.isAvailable = false
  const buffer = await screenshot(worker.browser, payload)
  worker.isAvailable = true
  return buffer
}
