const { version } = require('../package.json')
const scheduler = require('./scheduler')
const parseBody = require('./parseBody')
const log = require('./log')

console.log(`
   ╔═══════════════════╗
   ║                   ║
   ║   NICKEL-CHROME   ║
   ║                   ║
   ╟───────────────────╢
   ║ ${version}             ║
   ╚═══════════════════╝
`)

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
  await scheduler.stopWorkers()
  process.exit()
}

process.on('exit', onExit)
process.on('SIGINT', onExit)
