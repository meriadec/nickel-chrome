exports.log = function log(...args) {
  args.forEach(t => {
    console.log(`[${new Date().toISOString()}] [INFO] ${t}`) // eslint-disable-line no-console
  })
}

exports.error = function logError(...args) {
  args.forEach(t => {
    console.log(`[${new Date().toISOString()}] [ERROR] ${t}`) // eslint-disable-line no-console
  })
}
