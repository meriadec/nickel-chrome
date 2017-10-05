require('./greetings')
const log = require('./log')

require('./createServer')((req, res) => {
  log(req)
  res.end('ok ')
})
