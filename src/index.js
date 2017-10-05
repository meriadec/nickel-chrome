require('./greetings')

const screenshot = require('./screenshot')
const log = require('./log')

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => {
      try {
        const body = JSON.parse(data)
        resolve(body)
      } catch (err) {
        reject(err)
      }
    })
  })
}

require('./createServer')(async (req, res) => {
  try {
    log.log('Receiving request')
    const now = Date.now()
    const payload = await parseBody(req)
    const base64 = await screenshot(payload)
    log.log(`Screenshot done in ${Date.now() - now}ms`)
    res.writeHead(200)
    res.end(base64)
  } catch (err) {
    log.error(err)
    res.writeHead(500)
    res.end('KO')
  }
})
