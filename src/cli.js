#!/bin/env node

// Usage:
//
// nickel-chrome [nb-workers]
//
// The default nb workers is 5.

const NB_WORKERS = parseInt(process.argv[2], 10) || 5
const PORT = process.env.NICKEL_CHROME_PORT || 3010

require('./nickel-chrome')(PORT, NB_WORKERS)
