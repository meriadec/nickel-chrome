const chalk = require('chalk')

function genericLog(msg, type) {
  console.log(`${chalk.yellow(`[${new Date().toISOString()}]`)} ${type} ${msg}`) // eslint-disable-line no-console
}

exports.log = function log(text) {
  genericLog(text, chalk.blue('[INFO]'))
}

exports.error = function logError(err) {
  genericLog(err.stack || err, chalk.red('[ERROR]'))
}
