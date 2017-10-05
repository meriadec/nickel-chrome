const http = require('http')
const log = require('./log')

const PORT = process.env.NICKEL_CHROME_PORT || 3000

module.exports = function createServer(handler) {
  const server = http.createServer(handler)
  server.listen(PORT, err => {
    if (err) {
      log.error(err) // eslint-disable-line no-console
      process.exit(1)
    }
    log.log(`Server listening on port ${PORT}`) // eslint-disable-line no-console
  })
}
