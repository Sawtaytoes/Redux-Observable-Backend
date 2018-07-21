#!/usr/bin/env node
// import 'app-module-path/register'

// const runScript = require('scripts/utils/runScript')

// const runMode = process.argv[2]

// runScript(runMode)

import childProcess from 'child_process'

const revision = (
	childProcess
	.execSync('git log -1 --pretty=format:"%h"')
	.toString()
)

console.log(revision);
