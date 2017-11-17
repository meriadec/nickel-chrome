const debug = require('debug')('nickel-chrome')
const { version } = require('../package.json')
const scheduler = require('./scheduler')
const parseBody = require('./parseBody')
const log = require('./log')
const createServer = require('./createServer')

module.exports = function nickelChrome(port, nbWorkers) {
  debug(`
     ╔═══════════════════╗
     ║                   ║
     ║   NICKEL-CHROME   ║
     ║                   ║
     ╟───────────────────╢
     ║ ${version}             ║
     ╚═══════════════════╝
  `)

  scheduler.launchWorkers(nbWorkers)

  createServer(port, async (req, res) => {
    try {
      if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200)
        res.end('OK')
        return
      }
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
}

async function onExit() {
  await scheduler.stopWorkers()
  process.exit()
}

process.on('exit', onExit)
process.on('SIGINT', onExit)
