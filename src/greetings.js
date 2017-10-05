const { version } = require('../package.json')

const greetings = [
  '',
  ' ╔═══════════════════╗',
  ' ║                   ║',
  ' ║   NICKEL-CHROME   ║',
  ' ║                   ║',
  ' ╟───────────────────╢',
  ` ║ ${version}             ║`,
  ' ╚═══════════════════╝',
  '',
]

console.log(greetings.join('\n')) // eslint-disable-line no-console
