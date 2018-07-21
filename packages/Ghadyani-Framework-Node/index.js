#!/usr/bin/env node
require('app-module-path/register')

const chalk = require('chalk')
const simpleMap = require('scripts/utils/rxjs/simpleMap')
const { fromEvent } = require('rxjs')
const { pluck } = require('rxjs/operators')

// Configure local directories
require('./config')
require('./scripts')

fromEvent(
	process,
	'uncaughtException',
)
.pipe(
	pluck('stack'),
	simpleMap(chalk.red),
	simpleMap(console.error),
)
.subscribe()
