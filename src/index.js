require('./greetings')

const scheduler = require('./scheduler')
const parseBody = require('./parseBody')
const log = require('./log')

scheduler.launchWorkers(5)

require('./createServer')(async (req, res) => {
  try {
    log.log('Receiving request')
    const now = Date.now()
    const payload = await parseBody(req)
    const base64 = await scheduler.screenshot(payload)
    log.log(`Screenshot done in ${Date.now() - now}ms`)
    res.writeHead(200)
    res.end(base64)
  } catch (err) {
    log.error(err)
    res.writeHead(500)
    res.end('KO')
  }
})

async function onExit() {
  try {
    await scheduler.stopWorkers()
  } catch (err) {
    log.error('Cant stop workers')
    log.error(err)
  }
  process.exit()
}

process.on('exit', onExit)
process.on('SIGINT', onExit)
