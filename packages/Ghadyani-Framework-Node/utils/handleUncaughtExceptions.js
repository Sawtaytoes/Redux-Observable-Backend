const chalk = require('chalk')
const simpleMap = require('@utils/rxjs/simpleMap')
const { fromEvent } = require('rxjs')
const { pluck } = require('rxjs/operators')

const handleUncaughtExceptions = (
	fromEvent(
		process,
		'uncaughtException',
	)
	.pipe(
		pluck('stack'),
		simpleMap(chalk.red),
		simpleMap(console.error),
	)
)

module.exports = handleUncaughtExceptions
