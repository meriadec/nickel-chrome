const http = require('http')
const log = require('./log')

module.exports = function createServer(port, handler) {
  const server = http.createServer(handler)
  server.listen(port, err => {
    if (err) {
      log.error(err) // eslint-disable-line no-console
      process.exit(1)
    }
    log.log(`Server listening on port ${port}`) // eslint-disable-line no-console
  })
}
