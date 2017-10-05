const { version } = require('../package.json')

const greetings = `
   ╔═══════════════════╗
   ║                   ║
   ║   NICKEL-CHROME   ║
   ║                   ║
   ╟───────────────────╢
   ║ ${version}             ║
   ╚═══════════════════╝
`

console.log(greetings) // eslint-disable-line no-console
